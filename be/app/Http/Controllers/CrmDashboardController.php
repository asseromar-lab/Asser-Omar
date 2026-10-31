<?php

namespace App\Http\Controllers;

use App\Models\Unit;
use App\Models\User;
use App\Support\CrmSchema;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

/**
 * Dashboard (dashboard.tapegypt.com) helpers added in the CRM fixes:
 * unit photos (add / delete / re-order), inventory counters, system lists, requests follow-up.
 * All routes: auth:api + staff.
 */
class CrmDashboardController extends Controller
{
    const MAX_PHOTOS = 30;

    /* ===================== who sees which units ===================== */

    /** null = everything (Admin / Authorize); otherwise the allowed owner ids. */
    public static function visibleUserIds($user)
    {
        if (!$user) return [0];
        if (in_array($user->account_type, ['Admin', 'Authorize'], true) || (int) $user->role_id === 3) return null;
        if ((int) $user->role_id === 4 && $user->team_id) {
            $ids = User::where('team_id', $user->team_id)->pluck('id')->all();
            $ids[] = $user->id;
            return array_values(array_unique($ids));
        }
        return [$user->id];
    }

    public static function canEditUnit($user, $unit)
    {
        $ids = self::visibleUserIds($user);
        return $ids === null || in_array((int) $unit->user_id, array_map('intval', $ids), true);
    }

    /* ===================== inventory counters ===================== */

    /** GET /api/crm/units-stats */
    public function unitsStats(Request $request)
    {
        $ids = self::visibleUserIds(Auth::user());
        $q = DB::table('units');
        if ($ids !== null) $q->whereIn('user_id', $ids);
        if ($request->filled('user_id')) $q->where('user_id', (int) $request->user_id);
        $days = max(1, (int) $request->input('days', 30));
        $active = (clone $q)->whereNull('deleted_at');
        return response()->json([
            'total' => (clone $q)->count(),
            'active' => (clone $active)->count(),
            'added_today' => (clone $q)->where('created_at', '>=', now()->startOfDay())->count(),
            'added_this_month' => (clone $q)->where('created_at', '>=', now()->startOfMonth())->count(),
            'not_updated' => (clone $active)->where('updated_at', '<', now()->subDays($days))->count(),
            'not_updated_days' => $days,
            'total_prices' => (int) (clone $active)->sum('price'),
            'on_hold' => CrmSchema::has('units', 'availability') ? (clone $q)->where('availability', 'On hold')->count() : 0,
            'sold_out' => CrmSchema::has('units', 'availability') ? (clone $q)->where('availability', 'Sold out')->count() : 0,
            'sold_this_month' => CrmSchema::has('units', 'availability') ? (clone $q)->where('availability', 'Sold out')->where('sold_at', '>=', now()->startOfMonth())->count() : 0,
            'salesmen' => $this->staffList($ids),
        ]);
    }

    /** staff people the current user may filter by / assign units to */
    private function staffList($ids)
    {
        $q = User::select('id', 'first_name', 'last_name', 'role_id', 'account_type')

            ->whereIn('account_type', \App\Support\LeadScope::ACTIVE);
        if ($ids !== null) $q->whereIn('id', $ids);
        return $q->orderBy('first_name')->get()->map(function ($u) {
            return ['id' => $u->id, 'name' => trim($u->first_name . ' ' . $u->last_name)];
        });
    }

    /* ===================== unit photos ===================== */

    private function web() { return app(WebController::class); }

    private function unitOr404($id)
    {
        $unit = Unit::withTrashed()->find((int) $id);
        if (!$unit) abort(response()->json(['message' => 'Not found'], 404));
        if (!self::canEditUnit(Auth::user(), $unit)) abort(response()->json(['message' => 'Forbidden'], 403));
        return $unit;
    }

    private function folderDir($folder)
    {
        $folder = trim(str_replace(['..', '\\'], '', (string) $folder), '/');
        foreach ($this->web()->photoRootsPublic() as $root) {
            if (is_dir($root . '/' . $folder)) return $root . '/' . $folder;
        }
        $roots = $this->web()->photoRootsPublic();
        $root = config('filesystems.disks.public.root');
        $root = ($root && is_dir($root)) ? realpath($root) : ($roots[0] ?? public_path());
        @mkdir($root . '/' . $folder, 0755, true);
        return $root . '/' . $folder;
    }

    private function photosOf($unit)
    {
        return $unit->folder_name ? $this->web()->folderImages($unit->folder_name) : [];
    }

    private function syncCover($unit)
    {
        $photos = $this->photosOf($unit);
        if ($photos) {
            $unit->image_link = ltrim(rawurldecode($photos[0]), '/');
            $unit->save();
        }
        return $photos;
    }

    /** GET /api/crm/units/{id}/photos */
    public function photos($id)
    {
        $unit = $this->unitOr404($id);
        return response()->json(['photos' => $this->photosOf($unit)]);
    }

    /** POST /api/crm/units/{id}/photos  images[] */
    public function addPhotos(Request $request, $id)
    {
        $unit = $this->unitOr404($id);
        $request->validate(['images' => 'required|array|max:' . self::MAX_PHOTOS, 'images.*' => 'file|mimes:jpg,jpeg,png,webp|max:10240']);
        if (!$unit->folder_name) {
            $unit->folder_name = Str::random(20);
            $unit->save();
        }
        $existing = $this->photosOf($unit);
        if (count($existing) + count($request->file('images')) > self::MAX_PHOTOS) {
            return response()->json(['message' => 'Max ' . self::MAX_PHOTOS . ' photos'], 422);
        }
        $dir = $this->folderDir($unit->folder_name);
        $n = count($existing);
        foreach (array_values($request->file('images')) as $file) {
            $n++;
            $ext = strtolower($file->getClientOriginalExtension() ?: 'jpg');
            if (!in_array($ext, ['jpg', 'jpeg', 'png', 'webp'], true)) $ext = 'jpg';
            $file->move($dir, sprintf('%02d_%s.%s', $n, Str::random(6), $ext));
        }
        $photos = $this->syncCover($unit);
        $this->touchUnit($unit);
        return response()->json(['photos' => $photos]);
    }

    /** DELETE /api/crm/units/{id}/photos?file=... */
    public function deletePhoto(Request $request, $id)
    {
        $unit = $this->unitOr404($id);
        $photos = $this->photosOf($unit);
        if (count($photos) <= 1) return response()->json(['message' => 'The unit must keep at least one photo'], 422);
        $base = basename(rawurldecode((string) $request->input('file')));
        if (!preg_match('/^[^\/\\\\]+\.(jpe?g|png|webp)$/i', $base)) return response()->json(['message' => 'Bad file'], 422);
        $dir = $this->folderDir($unit->folder_name);
        if (is_file($dir . '/' . $base)) {
            // keep a copy instead of deleting for real (can be restored by hand)
            @mkdir($dir . '/.deleted', 0755, true);
            @rename($dir . '/' . $base, $dir . '/.deleted/' . time() . '_' . $base);
        }
        $photos = $this->syncCover($unit);
        $this->touchUnit($unit);
        return response()->json(['photos' => $photos]);
    }

    /** POST /api/crm/units/{id}/photos/order  files[] in the new order (first = cover) */
    public function orderPhotos(Request $request, $id)
    {
        $unit = $this->unitOr404($id);
        $order = array_map(function ($f) { return basename(rawurldecode((string) $f)); }, (array) $request->input('files', []));
        $dir = $this->folderDir($unit->folder_name);
        $current = array_map(function ($p) { return basename(rawurldecode($p)); }, $this->photosOf($unit));
        $final = array_values(array_unique(array_merge(array_values(array_intersect($order, $current)), $current)));
        // two steps (temp names first) so names never collide
        $tmp = [];
        foreach ($final as $i => $f) {
            $t = '.tmp_' . $i . '_' . Str::random(4);
            if (@rename($dir . '/' . $f, $dir . '/' . $t)) $tmp[] = [$t, $f];
        }
        foreach ($tmp as $i => [$t, $orig]) {
            $ext = strtolower(pathinfo($orig, PATHINFO_EXTENSION)) ?: 'jpg';
            @rename($dir . '/' . $t, $dir . '/' . sprintf('%02d_%s.%s', $i + 1, Str::random(6), $ext));
        }
        $photos = $this->syncCover($unit);
        $this->touchUnit($unit);
        return response()->json(['photos' => $photos]);
    }

    private function touchUnit($unit)
    {
        try {
            $set = ['updated_at' => now()];
            if (CrmSchema::has('units', 'updated_by')) $set['updated_by'] = Auth::id();
            DB::table('units')->where('id', $unit->id)->update($set);
        } catch (\Throwable $e) {}
    }

    /* ===================== system lists ===================== */

    /** list key => [table, [table.column that store the NAME as text] used for rename / in-use checks] */
    private const LISTS = [
        'areas' => ['areas', [['leads', 'area'], ['units', 'city']]],
        'types' => ['propert_types', [['units', 'type']]],
        'finishings' => ['finishings', [['units', 'finishing']]],
        'levels' => ['levels', [['units', 'level']]],
        'services' => ['admin_services', [['services', 'name']]],
        'channels' => ['channels', [['leads', 'channel']]],
        'stages' => ['stages', [['leads', 'stage']]],
        'statuses' => ['status', [['leads', 'status']]],
    ];

    private function listDef($list)
    {
        if (!isset(self::LISTS[$list])) abort(response()->json(['message' => 'Unknown list'], 404));
        return self::LISTS[$list];
    }

    private function adminOnly()
    {
        $u = Auth::user();
        if (!($u && ((int) $u->role_id === 3 || $u->account_type === 'Admin'))) {
            abort(response()->json(['message' => 'Admins only'], 403));
        }
    }

    /** GET /api/crm/lists/{list}?q= */
    public function listIndex(Request $request, $list)
    {
        [$table, $refs] = $this->listDef($list);
        $q = DB::table($table)->select('id', 'name');
        if ($request->filled('q')) $q->where('name', 'like', '%' . $request->q . '%');
        $rows = $q->orderBy('name')->get();
        if ($request->boolean('usage')) {
            foreach ($rows as $r) $r->used = $this->usage($refs, $r->name);
        }
        return response()->json(['list' => $list, 'items' => $rows]);
    }

    private function usage($refs, $name)
    {
        $n = 0;
        foreach ($refs as [$t, $c]) {
            try { $n += DB::table($t)->where($c, $name)->count(); } catch (\Throwable $e) {}
        }
        return $n;
    }

    /** POST /api/crm/lists/{list}  {name} */
    public function listStore(Request $request, $list)
    {
        $this->adminOnly();
        [$table] = $this->listDef($list);
        $name = trim((string) $request->input('name'));
        if ($name === '' || mb_strlen($name) > 150) return response()->json(['message' => 'Name is required'], 422);
        if (DB::table($table)->where('name', $name)->exists()) return response()->json(['message' => 'Already exists'], 422);
        $id = DB::table($table)->insertGetId(['name' => $name, 'created_at' => now(), 'updated_at' => now()]);
        $this->forgetListCaches();
        return response()->json(['id' => $id, 'name' => $name], 201);
    }

    /** PUT /api/crm/lists/{list}/{id}  {name} — renames everywhere it is used, so nothing gets orphaned */
    public function listUpdate(Request $request, $list, $id)
    {
        $this->adminOnly();
        [$table, $refs] = $this->listDef($list);
        $row = DB::table($table)->where('id', (int) $id)->first();
        if (!$row) return response()->json(['message' => 'Not found'], 404);
        $name = trim((string) $request->input('name'));
        if ($name === '' || mb_strlen($name) > 150) return response()->json(['message' => 'Name is required'], 422);
        if ($name === $row->name) return response()->json(['id' => $row->id, 'name' => $name, 'renamed_in' => 0]);
        if (DB::table($table)->where('name', $name)->where('id', '!=', $row->id)->exists()) return response()->json(['message' => 'Already exists'], 422);
        $moved = 0;
        DB::transaction(function () use ($table, $refs, $row, $name, &$moved) {
            DB::table($table)->where('id', $row->id)->update(['name' => $name, 'updated_at' => now()]);
            foreach ($refs as [$t, $c]) {
                try { $moved += DB::table($t)->where($c, $row->name)->update([$c => $name]); } catch (\Throwable $e) {}
            }
        });
        $this->forgetListCaches();
        return response()->json(['id' => $row->id, 'name' => $name, 'renamed_in' => $moved]);
    }

    /** DELETE /api/crm/lists/{list}/{id} — only when nothing uses it */
    public function listDestroy($list, $id)
    {
        $this->adminOnly();
        [$table, $refs] = $this->listDef($list);
        $row = DB::table($table)->where('id', (int) $id)->first();
        if (!$row) return response()->json(['message' => 'Not found'], 404);
        $used = $this->usage($refs, $row->name);
        if ($used > 0) return response()->json(['message' => "Used by $used records — rename it instead of deleting"], 422);
        DB::table($table)->where('id', $row->id)->delete();
        $this->forgetListCaches();
        return response()->json(['ok' => true]);
    }

    private function forgetListCaches()
    {
        foreach (['web.listing-options', 'web.meta', 'web.areas'] as $k) { try { \Cache::forget($k); } catch (\Throwable $e) {} }
    }

    /* ===================== requests (contact_us) ===================== */

    const REQUEST_STATUSES = ['Open', 'In progress', 'Done', 'Cancelled'];
    const CANCEL_REASONS = ['Not valid', 'Low budget', 'Available from broker'];

    /** GET /api/crm/requests?page=&status=&cancel_reason=&q= */
    public function requests(Request $request)
    {
        $q = DB::table('contact_us')->whereNull('deleted_at');
        $hasStatus = CrmSchema::has('contact_us', 'status');
        if ($hasStatus && $request->filled('status')) {
            $request->status === 'Open'
                ? $q->where(function ($w) { $w->whereNull('status')->orWhere('status', 'Open'); })
                : $q->where('status', $request->status);
        }
        if ($hasStatus && $request->filled('cancel_reason')) $q->where('cancel_reason', $request->cancel_reason);
        if ($request->filled('q')) {
            $k = '%' . $request->q . '%';
            $q->where(function ($w) use ($k, $request) {
                $w->where('project_name', 'like', $k)->orWhere('developer_name', 'like', $k)->orWhere('user_name', 'like', $k)
                  ->orWhere('user_phone', 'like', $k)->orWhere('city', 'like', $k)->orWhere('type', 'like', $k)->orWhere('Notes', 'like', $k)->orWhere('description', 'like', $k);
                if (ctype_digit((string) $request->q)) $w->orWhere('id', (int) $request->q);
            });
        }
        $counts = [];
        if ($hasStatus) {
            $base = DB::table('contact_us')->whereNull('deleted_at');
            foreach (self::REQUEST_STATUSES as $s) {
                $counts[$s] = $s === 'Open'
                    ? (clone $base)->where(function ($w) { $w->whereNull('status')->orWhere('status', 'Open'); })->count()
                    : (clone $base)->where('status', $s)->count();
            }
        }
        $page = $q->orderByDesc('created_at')->orderByDesc('id')->paginate(10);
        return response()->json([
            'requests' => $page,
            'counts' => $counts,
            'statuses' => self::REQUEST_STATUSES,
            'cancel_reasons' => self::CANCEL_REASONS,
            'can_edit' => $this->isAdmin(),
        ]);
    }

    /**
     * GET /api/crm/web-leads?form=contact|unit|request&state=new|all&q=&page=
     * Leads that came from the website («مستشار بكام هيكلمك», ask about a unit, special request).
     * Admins see all; a team leader his team; a salesman his own.
     */
    public function webLeads(Request $request)
    {
        CrmSchema::ensure();
        if (!CrmSchema::has('leads', 'web_form')) return response()->json(['leads' => ['data' => [], 'total' => 0], 'counts' => []]);
        $me = Auth::user();
        $ids = \App\Support\LeadScope::userIds($me);
        $base = function () use ($ids) {
            $q = DB::table('leads as l')->whereNotNull('l.web_form');
            if ($ids !== null) $q->whereIn('l.user_id', $ids);
            return $q;
        };
        $q = $base()->leftJoin('users as u', 'u.id', '=', 'l.user_id')->leftJoin('projects as p', 'p.id', '=', 'l.project_id');
        if (in_array($request->input('form'), ['contact', 'unit', 'request'], true)) $q->where('l.web_form', $request->input('form'));
        if ($request->input('state', 'new') === 'new') $q->where('l.stage', 'Fresh lead');
        if ($request->filled('q')) {
            $k = '%' . $request->q . '%';
            $q->where(function ($w) use ($k, $request) {
                $w->where('l.client_name', 'like', $k)->orWhere('l.client_number', 'like', $k)->orWhere('l.area', 'like', $k);
                if (ctype_digit((string) $request->q)) $w->orWhere('l.id', (int) $request->q);
            });
        }
        $page = $q->orderByDesc('l.id')->select('l.id', 'l.client_name', 'l.client_number', 'l.area', 'l.stage', 'l.status', 'l.unit_link',
            'l.web_form', 'l.created_at', 'l.updated_at', 'l.user_id', 'l.routed_at', 'p.name as project',
            DB::raw("TRIM(CONCAT(IFNULL(u.first_name,''),' ',IFNULL(u.last_name,''))) as salesman"))->paginate(15);
        $notes = DB::table('actions')->whereIn('lead_id', collect($page->items())->pluck('id'))->where('action_type', 'create lead')
            ->orderBy('id')->get(['lead_id', 'details'])->groupBy('lead_id')->map(function ($g) { return $g->first()->details; });
        foreach ($page->items() as $r) $r->note = $notes[$r->id] ?? null;
        $counts = [
            'new' => $base()->where('l.stage', 'Fresh lead')->count(),
            'all' => $base()->count(),
            'contact' => $base()->where('l.web_form', 'contact')->where('l.stage', 'Fresh lead')->count(),
            'unit' => $base()->where('l.web_form', 'unit')->where('l.stage', 'Fresh lead')->count(),
            'request' => $base()->where('l.web_form', 'request')->where('l.stage', 'Fresh lead')->count(),
        ];
        return response()->json(['leads' => $page, 'counts' => $counts]);
    }

    private function isAdmin()
    {
        $u = Auth::user();
        return $u && ((int) $u->role_id === 3 || $u->account_type === 'Admin');
    }

    /** PUT /api/crm/requests/{id} — admin: edit fields + status/feedback; others: status + feedback only */
    public function updateRequest(Request $request, $id)
    {
        $row = DB::table('contact_us')->where('id', (int) $id)->first();
        if (!$row) return response()->json(['message' => 'Not found'], 404);
        $data = $request->validate([
            'status' => 'nullable|in:' . implode(',', self::REQUEST_STATUSES),
            'cancel_reason' => 'nullable|in:' . implode(',', self::CANCEL_REASONS),
            'feedback' => 'nullable|string|max:2000',
            'category' => 'nullable|string|max:60', 'type' => 'nullable|string|max:60', 'city' => 'nullable|string|max:120',
            'location' => 'nullable|string|max:190', 'project_name' => 'nullable|string|max:190', 'developer_name' => 'nullable|string|max:190',
            'size' => 'nullable|integer|min:0', 'bedrooms' => 'nullable|string|max:20', 'bathrooms' => 'nullable|string|max:20',
            'price' => 'nullable|integer|min:0', 'down_payment' => 'nullable|numeric|min:0', 'quarter_installment' => 'nullable|numeric|min:0',
            'finishing' => 'nullable|string|max:120', 'delivery_date' => 'nullable|string|max:60', 'Notes' => 'nullable|string|max:2000',
            'user_name' => 'nullable|string|max:255', 'user_phone' => 'nullable|string|max:60',
        ]);
        if (($data['status'] ?? null) === 'Cancelled' && empty($data['cancel_reason']) && empty($row->cancel_reason ?? null)) {
            return response()->json(['message' => 'Choose a cancel reason'], 422);
        }
        $statusKeys = ['status', 'cancel_reason', 'feedback'];
        $set = [];
        foreach ($data as $k => $v) {
            if (in_array($k, $statusKeys, true)) {
                if (CrmSchema::has('contact_us', $k)) $set[$k] = $v;
            } elseif ($this->isAdmin()) {
                $set[$k] = $k === 'user_phone' ? (\App\Support\Phone::normalize($v) ?: $v) : $v;
            }
        }
        if (isset($set['status']) && $set['status'] !== 'Cancelled') $set['cancel_reason'] = null;
        if (CrmSchema::has('contact_us', 'handled_by') && array_intersect(array_keys($set), $statusKeys)) $set['handled_by'] = Auth::id();
        if (!$set) return response()->json(['message' => 'Nothing to update'], 422);
        $set['updated_at'] = now();
        DB::table('contact_us')->where('id', $row->id)->update($set);
        return response()->json(['request' => DB::table('contact_us')->where('id', $row->id)->first()]);
    }

    /** POST /api/crm/requests — add a buyer request from the dashboard */
    public function storeRequest(Request $request)
    {
        $data = $request->validate([
            'user_name' => 'required|string|max:255', 'user_phone' => 'required|string|max:60',
            'category' => 'nullable|string|max:60', 'type' => 'nullable|string|max:60', 'city' => 'nullable|string|max:120',
            'project_name' => 'nullable|string|max:190', 'developer_name' => 'nullable|string|max:190',
            'size' => 'nullable|integer|min:0', 'bedrooms' => 'nullable|string|max:20', 'bathrooms' => 'nullable|string|max:20',
            'price' => 'nullable|integer|min:0', 'down_payment' => 'nullable|numeric|min:0', 'quarter_installment' => 'nullable|numeric|min:0',
            'finishing' => 'nullable|string|max:120', 'delivery_date' => 'nullable|string|max:60', 'Notes' => 'nullable|string|max:2000',
        ]);
        $me = Auth::user();
        $row = $data + [
            'name' => trim(($data['type'] ?? 'Request') . ' - ' . ($data['city'] ?? '')),
            'description' => $data['Notes'] ?? ' ', 'location' => $data['city'] ?? '', 'state' => 'approved',
            'user_id' => $me->id, 'created_at' => now(), 'updated_at' => now(),
        ];
        $row['user_phone'] = \App\Support\Phone::normalize($row['user_phone']) ?: $row['user_phone'];
        if (CrmSchema::has('contact_us', 'status')) { $row['status'] = 'Open'; $row['handled_by'] = $me->id; }
        try {
            $id = DB::table('contact_us')->insertGetId($row);
        } catch (\Throwable $e) {
            // older table: drop the optional columns it does not have
            $cols = \Illuminate\Support\Facades\Schema::getColumnListing('contact_us');
            $id = DB::table('contact_us')->insertGetId(array_intersect_key($row, array_flip($cols)));
        }
        return response()->json(['request' => DB::table('contact_us')->where('id', $id)->first()], 201);
    }

    /** DELETE /api/crm/requests/{id} — admins only; soft delete */
    public function deleteRequest($id)
    {
        if (!$this->isAdmin()) return response()->json(['message' => 'Admins only'], 403);
        DB::table('contact_us')->where('id', (int) $id)->update(['deleted_at' => now()]);
        return response()->json(['ok' => true]);
    }

    /* ===================== lead tasks ===================== */

    private function leadOr403($leadId)
    {
        $lead = \App\Models\Lead::find((int) $leadId);
        if (!$lead) abort(response()->json(['message' => 'Not found'], 404));
        $me = Auth::user();
        $ids = \App\Support\LeadScope::userIds($me);
        $ok = $ids === null || in_array((int) $lead->user_id, $ids, true);
        if (!$ok) abort(response()->json(['message' => 'Forbidden'], 403));
        return $lead;
    }

    /** GET /api/crm/leads/{id}/tasks */
    public function tasks($leadId)
    {
        $this->leadOr403($leadId);
        $rows = DB::table('lead_tasks as t')->leftJoin('users as u', 'u.id', '=', 't.user_id')
            ->where('t.lead_id', (int) $leadId)
            ->select('t.*', DB::raw("TRIM(CONCAT(IFNULL(u.first_name,''),' ',IFNULL(u.last_name,''))) as user_name"))
            ->orderByRaw('t.done_at IS NOT NULL')->orderBy('t.due_at')->orderBy('t.id')->get();
        return response()->json(['tasks' => $rows]);
    }

    /** POST /api/crm/leads/{id}/tasks {title, due_at} */
    public function addTask(Request $request, $leadId)
    {
        $lead = $this->leadOr403($leadId);
        $d = $request->validate(['title' => 'required|string|max:255', 'due_at' => 'nullable|date']);
        $id = DB::table('lead_tasks')->insertGetId([
            'lead_id' => $lead->id, 'user_id' => Auth::id(), 'title' => $d['title'],
            'due_at' => !empty($d['due_at']) ? \Carbon\Carbon::parse($d['due_at']) : null, 'created_at' => now(), 'updated_at' => now(),
        ]);
        \App\Models\Action::create(['user_id' => Auth::id(), 'action_type' => 'add task', 'lead_id' => $lead->id,
            'details' => Auth::user()->first_name . ' ' . Auth::user()->last_name . ' added a task: ' . $d['title']]);
        return $this->tasks($lead->id);
    }

    /** PUT /api/crm/tasks/{id} {title?, due_at?, done?} */
    public function updateTask(Request $request, $id)
    {
        $t = DB::table('lead_tasks')->where('id', (int) $id)->first();
        if (!$t) return response()->json(['message' => 'Not found'], 404);
        $this->leadOr403($t->lead_id);
        $d = $request->validate(['title' => 'nullable|string|max:255', 'due_at' => 'nullable|date', 'done' => 'nullable|boolean']);
        $set = ['updated_at' => now()];
        if (array_key_exists('title', $d) && $d['title']) $set['title'] = $d['title'];
        if ($request->has('due_at')) $set['due_at'] = $d['due_at'] ? \Carbon\Carbon::parse($d['due_at']) : null;
        if ($request->has('done')) { $set['done_at'] = $d['done'] ? now() : null; $set['done_by'] = $d['done'] ? Auth::id() : null; }
        DB::table('lead_tasks')->where('id', $t->id)->update($set);
        return $this->tasks($t->lead_id);
    }

    /** DELETE /api/crm/tasks/{id} */
    public function deleteTask($id)
    {
        $t = DB::table('lead_tasks')->where('id', (int) $id)->first();
        if (!$t) return response()->json(['message' => 'Not found'], 404);
        $this->leadOr403($t->lead_id);
        DB::table('lead_tasks')->where('id', $t->id)->delete();
        return $this->tasks($t->lead_id);
    }

    /* ===================== unit picker for leads ===================== */

    /** GET /api/crm/units-lookup?q=  or ?ids=1,2 */
    public function unitsLookup(Request $request)
    {
        $q = DB::table('units as u')->leftJoin('projects as p', 'p.id', '=', 'u.project_id')
            ->select('u.id', 'u.name', 'u.type', 'u.city', 'u.price', 'u.category', 'p.name as project_name');
        if ($request->filled('ids')) {
            $q->whereIn('u.id', array_filter(array_map('intval', explode(',', $request->ids))));
        } else {
            $v = trim((string) $request->input('q', ''));
            $q->whereNull('u.deleted_at');
            if ($v !== '') {
                $q->where(function ($w) use ($v) {
                    if (ctype_digit($v)) $w->orWhere('u.id', (int) $v);
                    $w->orWhere('u.name', 'like', "%$v%")->orWhere('p.name', 'like', "%$v%")->orWhere('u.city', 'like', "%$v%");
                });
            }
            $q->orderByDesc('u.id')->limit(30);
        }
        return response()->json(['units' => $q->get()]);
    }

    /* ===================== unit availability ===================== */

    const AVAILABILITY = ['Available', 'On hold', 'Sold out'];

    /** PUT /api/crm/units/{id}/availability {availability, sold_by?, buyer_name?, buyer_phone?} */
    public function setAvailability(Request $request, $id)
    {
        $unit = $this->unitOr404($id);
        if (!CrmSchema::has('units', 'availability')) return response()->json(['message' => 'DB not ready'], 500);
        $d = $request->validate([
            'availability' => 'required|in:' . implode(',', self::AVAILABILITY),
            'sold_by' => 'nullable|in:Sales,Owner',
            'buyer_name' => 'nullable|string|max:190',
            'buyer_phone' => 'nullable|string|max:40',
        ]);
        $set = ['availability' => $d['availability'], 'updated_at' => now(), 'updated_by' => Auth::id()];
        if ($d['availability'] === 'Sold out') {
            if (empty($d['sold_by'])) return response()->json(['message' => 'Choose who sold it (Sales or Owner)'], 422);
            if ($d['sold_by'] === 'Sales' && (empty($d['buyer_name']) || empty($d['buyer_phone']))) {
                return response()->json(['message' => 'Sold by sales: buyer name and number are required'], 422);
            }
            $set += [
                'sold_by' => $d['sold_by'],
                'buyer_name' => $d['sold_by'] === 'Sales' ? $d['buyer_name'] : ($d['buyer_name'] ?? null),
                'buyer_phone' => !empty($d['buyer_phone']) ? (\App\Support\Phone::normalize($d['buyer_phone']) ?: $d['buyer_phone']) : null,
                'sold_at' => $unit->availability === 'Sold out' && $unit->sold_at ? $unit->sold_at : now(),
                'sold_by_user' => Auth::id(),
            ];
        } else {
            $set += ['sold_by' => null, 'buyer_name' => null, 'buyer_phone' => null, 'sold_at' => null, 'sold_by_user' => null];
        }
        if (!CrmSchema::has('units', 'updated_by')) unset($set['updated_by']);
        DB::table('units')->where('id', $unit->id)->update($set);
        try {
            $me = Auth::user();
            if (($unit->availability ?: 'Available') !== $d['availability']) \App\Models\Action::create(['user_id' => $me->id, 'action_type' => 'unit status',
                'details' => trim($me->first_name . ' ' . $me->last_name) . ' changed unit #' . $unit->id . ' from ' . ($unit->availability ?: 'Available') . ' to ' . $d['availability']]);
        } catch (\Throwable $e) {}
        try {
            \App\Models\Unit::withTrashed()->find($unit->id); // keep caches in sync
            \Cache::forget('web.home');
        } catch (\Throwable $e) {}
        return response()->json(['unit' => DB::table('units')->where('id', $unit->id)->select('id', 'availability', 'sold_by', 'buyer_name', 'buyer_phone', 'sold_at')->first()]);
    }

    /** PUT /api/crm/units/{id}/owner {user_id} — admins: move a unit to another salesman */
    public function setOwner(Request $request, $id)
    {
        $me = Auth::user();
        if (!\App\Support\LeadScope::isAdmin($me)) return response()->json(['message' => 'Only admins can move units'], 403);
        $unit = $this->unitOr404($id);
        $to = (int) $request->input('user_id');
        $target = User::find($to);
        if (!$target) return response()->json(['message' => 'Pick a salesman'], 422);
        if (!in_array($target->account_type, \App\Support\LeadScope::ACTIVE, true)) return response()->json(['message' => 'This person is not an active Sales / Authorize / Admin account'], 422);
        $from = $unit->user_id;
        $set = ['user_id' => $to, 'updated_at' => now()];
        if (CrmSchema::has('units', 'updated_by')) $set['updated_by'] = $me->id;
        DB::table('units')->where('id', $unit->id)->update($set);
        try {
            \App\Models\Action::create(['user_id' => $me->id, 'action_type' => 'move unit',
                'details' => trim($me->first_name . ' ' . $me->last_name) . ' moved unit #' . $unit->id . ' from #' . $from . ' to ' . trim($target->first_name . ' ' . $target->last_name)]);
        } catch (\Throwable $e) {}
        try { \Cache::forget('web.home'); } catch (\Throwable $e) {}
        return response()->json(['unit' => ['id' => $unit->id, 'user_id' => $to], 'owner' => trim($target->first_name . ' ' . $target->last_name)]);
    }

    /* ===================== reports ===================== */

    private function reportRange(Request $request)
    {
        $tz = config('app.timezone');
        if ($request->filled('month')) {
            $from = \Carbon\Carbon::createFromFormat('Y-m', $request->month, $tz)->startOfMonth();
            $to = $from->copy()->endOfMonth();
        } else {
            $from = \Carbon\Carbon::parse($request->input('from', now()->toDateString()), $tz)->startOfDay();
            $to = \Carbon\Carbon::parse($request->input('to', $from->toDateString()), $tz)->endOfDay();
        }
        return [$from, $to];
    }

    /** people the viewer may see in reports: admin all staff, team leader his team, sales himself */
    private function reportPeople()
    {
        $me = Auth::user();
        $ids = \App\Support\LeadScope::userIds($me);
        $q = User::select('id', 'first_name', 'last_name', 'role_id', 'team_id', 'account_type')
            ->whereIn('account_type', \App\Support\LeadScope::ACTIVE);
        if ($ids !== null) $q->whereIn('id', $ids);
        return $q->get();
    }

    /**
     * GET /api/crm/reports/sales?from=&to=  or ?month=YYYY-MM  [&lead_type=Primary|Resale|Rent]
     * Per agent: new leads, contacted (follow-up done = comment or update in the period), delayed now,
     * meetings done, reservations, deals closed, cancelled (not interested / cancelled) — plus team and company totals.
     */
    public function salesReport(Request $request)
    {
        [$from, $to] = $this->reportRange($request);
        $people = $this->reportPeople();
        $ids = $people->pluck('id')->all();
        $lt = $request->input('lead_type');
        $leadScope = function ($q) use ($lt) {
            if ($lt && CrmSchema::has('leads', 'lead_type')) $q->where('leads.lead_type', $lt);
            return $q;
        };
        $count = function ($q) { return $q->groupBy('uid')->pluck('c', 'uid')->toArray(); };

        $new = $count($leadScope(DB::table('leads'))->whereIn('user_id', $ids)->whereBetween('created_at', [$from, $to])
            ->selectRaw('user_id as uid, COUNT(*) c'));
        // contacted = distinct leads that got a comment or an update by the agent in the period (comment counts as follow-up)
        $contacted = [];
        $touch = DB::table('comments')->whereBetween('created_at', [$from, $to])->whereIn('user_id', $ids)->select('user_id', 'lead_id')
            ->union(DB::table('actions')->whereIn('action_type', ['update lead', 'add task'])->whereBetween('created_at', [$from, $to])->whereIn('user_id', $ids)->select('user_id', 'lead_id'));
        foreach (DB::query()->fromSub($touch, 't')->join('leads', 'leads.id', '=', 't.lead_id')
                     ->when($lt && CrmSchema::has('leads', 'lead_type'), function ($q) use ($lt) { $q->where('leads.lead_type', $lt); })
                     ->groupBy('t.user_id')->selectRaw('t.user_id uid, COUNT(DISTINCT t.lead_id) c')->get() as $r) {
            $contacted[$r->uid] = $r->c;
        }
        $delayed = $count($leadScope(\App\Models\Lead::delayed()->toBase())->whereIn('user_id', $ids)->selectRaw('user_id as uid, COUNT(*) c'));
        $stage = function ($names) use ($ids, $from, $to, $lt) {
            if (!CrmSchema::has('lead_stage_history')) return [];
            $q = DB::table('lead_stage_history as h')->join('leads', 'leads.id', '=', 'h.lead_id')
                ->whereIn('h.stage', (array) $names)->whereBetween('h.reached_at', [$from, $to])->whereIn('leads.user_id', $ids);
            if ($lt && CrmSchema::has('leads', 'lead_type')) $q->where('leads.lead_type', $lt);
            return $q->groupBy('leads.user_id')->selectRaw('leads.user_id uid, COUNT(DISTINCT h.lead_id) c')->pluck('c', 'uid')->toArray();
        };
        $meetings = $stage('Done Meeting/Showing');
        $generated = $stage('Generated Meeting/showing');
        $potential = $stage('Interested');
        // chosen stage (any stage name): leads that reached it in the period
        $pick = trim((string) $request->input('stage'));
        $picked = $pick !== '' ? $stage($pick) : [];
        // inventory: units each person added in the period
        $unitsAdded = DB::table('units')->whereNull('deleted_at')->whereIn('user_id', $ids)->whereBetween('created_at', [$from, $to])
            ->groupBy('user_id')->selectRaw('user_id uid, COUNT(*) c')->pluck('c', 'uid')->toArray();
        $reservations = $stage('Reservation');
        $deals = $stage('Done deal');
        $cancelled = $stage(['not interested']);
        $teams = \App\Models\Team::pluck('name', 'id')->toArray();
        $leaders = \App\Models\Team::pluck('leader_id', 'id')->toArray();

        $rows = [];
        foreach ($people as $p) {
            $r = [
                'user_id' => $p->id, 'name' => trim($p->first_name . ' ' . $p->last_name),
                'role' => [1 => 'Normal', 2 => 'Sales', 3 => 'Admin', 4 => 'Team Leader'][(int) $p->role_id] ?? '',
                'team' => $p->team_id ? ($teams[$p->team_id] ?? '') : '', 'team_id' => $p->team_id,
                'new_leads' => (int) ($new[$p->id] ?? 0), 'contacted' => (int) ($contacted[$p->id] ?? 0),
                'delayed' => (int) ($delayed[$p->id] ?? 0), 'meetings' => (int) ($meetings[$p->id] ?? 0),
                'reservations' => (int) ($reservations[$p->id] ?? 0), 'deals' => (int) ($deals[$p->id] ?? 0),
                'cancelled' => (int) ($cancelled[$p->id] ?? 0),
                'generated' => (int) ($generated[$p->id] ?? 0), 'potential' => (int) ($potential[$p->id] ?? 0),
                'units_added' => (int) ($unitsAdded[$p->id] ?? 0), 'stage_hits' => (int) ($picked[$p->id] ?? 0),
            ];
            $r['activity'] = $r['new_leads'] + $r['contacted'] + $r['meetings'] + $r['reservations'] + $r['deals'] + $r['delayed']
                + $r['generated'] + $r['potential'] + $r['units_added'] + $r['stage_hits'];
            if ($r['activity'] > 0 || $request->boolean('all')) $rows[] = $r;
        }
        usort($rows, function ($a, $b) { return [$a['team'], $b['deals'], $b['contacted']] <=> [$b['team'], $a['deals'], $a['contacted']]; });
        $keys = ['new_leads', 'contacted', 'delayed', 'generated', 'meetings', 'potential', 'reservations', 'deals', 'cancelled', 'units_added', 'stage_hits'];
        $sum = function ($list) use ($keys) { $t = array_fill_keys($keys, 0); foreach ($list as $r) foreach ($keys as $k) $t[$k] += $r[$k]; return $t; };
        $byTeam = [];
        foreach ($rows as $r) { $byTeam[$r['team'] ?: 'No team'][] = $r; }
        $teamTotals = [];
        foreach ($byTeam as $name => $list) $teamTotals[] = ['team' => $name] + $sum($list);
        return response()->json([
            'from' => $from->toDateString(), 'to' => $to->toDateString(), 'lead_type' => $lt, 'stage' => $pick ?: null,
            'stages' => ['Fresh lead', 'Follow Up', 'no answer', 'Interested', 'Generated Meeting/showing', 'Done Meeting/Showing', 'Reservation', 'Done deal', 'not interested', 'owner'],
            'rows' => $rows, 'teams' => $teamTotals, 'total' => $sum($rows),
            'inventory_total' => DB::table('units')->whereNull('deleted_at')->whereBetween('created_at', [$from, $to])->count(),
        ]);
    }

    /**
     * GET /api/crm/reports/daily?date=YYYY-MM-DD (or from/to)
     * Sales daily report per team + operations daily report.
     */
    public function dailyReport(Request $request)
    {
        if ($request->filled('date')) $request->merge(['from' => $request->date, 'to' => $request->date]);
        [$from, $to] = $this->reportRange($request);
        $people = $this->reportPeople()->filter(function ($p) {
            return in_array((int) $p->role_id, [2, 4]) || $p->account_type === 'Sales' || $p->team_id;
        })->values();
        $ids = $people->pluck('id')->all();
        $between = [$from, $to];
        $pluck = function ($q) { return $q->groupBy('uid')->pluck('c', 'uid')->toArray(); };

        $inventory = $pluck(DB::table('units')->whereIn('user_id', $ids)->whereBetween('created_at', $between)->selectRaw('user_id uid, COUNT(*) c'));
        $leads = $pluck(DB::table('leads')->whereIn('user_id', $ids)->whereBetween('created_at', $between)->selectRaw('user_id uid, COUNT(*) c'));
        $follow = $pluck(DB::table('comments')->whereIn('user_id', $ids)->whereBetween('created_at', $between)->selectRaw('user_id uid, COUNT(*) c'));
        $hasWho = CrmSchema::has('lead_stage_history', 'user_id');
        $stage = function ($names) use ($ids, $between, $hasWho) {
            if (!CrmSchema::has('lead_stage_history')) return [];
            $who = $hasWho ? 'COALESCE(h.user_id, leads.user_id)' : 'leads.user_id';
            return DB::table('lead_stage_history as h')->join('leads', 'leads.id', '=', 'h.lead_id')
                ->whereIn('h.stage', (array) $names)->whereBetween('h.reached_at', $between)
                ->whereRaw("$who IN (" . (count($ids) ? implode(',', array_map('intval', $ids)) : '0') . ')')
                ->groupBy(DB::raw($who))->selectRaw("$who uid, COUNT(DISTINCT h.lead_id) c")->pluck('c', 'uid')->toArray();
        };
        $gen = $stage('Generated Meeting/showing');
        $done = $stage('Done Meeting/Showing');
        $pot = $stage('Interested');
        $res = $stage('Reservation');
        $deal = $stage('Done deal');
        $keys = ['inventory', 'leads', 'followups', 'generated', 'meetings', 'potential', 'reservations', 'deals'];
        $row = function ($p, $isLeader) use ($inventory, $leads, $follow, $gen, $done, $pot, $res, $deal) {
            $i = $p->id;
            return ['user_id' => $i, 'name' => trim($p->first_name . ' ' . $p->last_name), 'leader' => $isLeader,
                'inventory' => (int) ($inventory[$i] ?? 0), 'leads' => (int) ($leads[$i] ?? 0), 'followups' => (int) ($follow[$i] ?? 0),
                'generated' => (int) ($gen[$i] ?? 0), 'meetings' => (int) ($done[$i] ?? 0), 'potential' => (int) ($pot[$i] ?? 0),
                'reservations' => (int) ($res[$i] ?? 0), 'deals' => (int) ($deal[$i] ?? 0)];
        };
        $sum = function ($rows) use ($keys) { $t = array_fill_keys($keys, 0); foreach ($rows as $r) foreach ($keys as $k) $t[$k] += $r[$k]; return $t; };

        $byId = $people->keyBy('id');
        $teams = [];
        $used = [];
        foreach (\App\Models\Team::orderBy('id')->get() as $t) {
            $rows = [];
            if ($t->leader_id && isset($byId[$t->leader_id])) { $rows[] = $row($byId[$t->leader_id], true); $used[$t->leader_id] = 1; }
            foreach ($people as $p) {
                if ((int) $p->team_id === (int) $t->id && !isset($used[$p->id])) { $rows[] = $row($p, false); $used[$p->id] = 1; }
            }
            if ($rows) $teams[] = ['team' => $t->name, 'rows' => $rows, 'total' => $sum($rows)];
        }
        $rest = [];
        foreach ($people as $p) if (!isset($used[$p->id])) $rest[] = $row($p, false);
        $rest = array_values(array_filter($rest, function ($r) use ($keys) { foreach ($keys as $k) if ($r[$k]) return true; return false; }));
        if ($rest) $teams[] = ['team' => 'No team', 'rows' => $rest, 'total' => $sum($rest)];
        $all = [];
        foreach ($teams as $t) foreach ($t['rows'] as $r) $all[] = $r;

        $out = ['from' => $from->toDateString(), 'to' => $to->toDateString(), 'teams' => $teams, 'total' => $sum($all)];

        if (\App\Support\LeadScope::isAdmin(Auth::user())) {
            $u = DB::table('units as un')->leftJoin('users as c', 'c.id', '=', 'un.user_id')->whereBetween('un.created_at', $between);
            $src = (clone $u)->selectRaw("SUM(CASE WHEN c.role_id IN (2,4) OR c.account_type='Sales' THEN 1 ELSE 0 END) sales,
                SUM(CASE WHEN (c.role_id IS NULL OR c.role_id NOT IN (2,4)) AND COALESCE(c.account_type,'') IN ('Admin','Authorize') THEN 1 ELSE 0 END) ops,
                COUNT(*) total")->first();
            $sales = (int) $src->sales; $ops = (int) $src->ops; $tot = (int) $src->total;
            $nu = DB::table('users')->where('account_type', 'Normal')->whereBetween('created_at', $between)
                ->selectRaw("SUM(CASE WHEN registeration_type IN ('Business','Broker') THEN 1 ELSE 0 END) b, COUNT(*) t")->first();
            $updated = DB::table('units')->whereBetween('updated_at', $between)->where('created_at', '<', $from)->whereNull('deleted_at')->count();
            $deleted = CrmSchema::has('units', 'deleted_at') ? DB::table('units')->whereBetween('deleted_at', $between)->count() : 0;
            $out['operations'] = [
                'inventory' => ['total' => $tot, 'sales' => $sales, 'operations' => $ops, 'business' => $tot - $sales - $ops],
                'users' => ['total' => (int) $nu->t, 'business' => (int) $nu->b, 'client' => (int) $nu->t - (int) $nu->b],
                'updates' => ['total' => $updated + $deleted, 'updated' => $updated, 'deleted' => $deleted],
            ];
        }
        return response()->json($out);
    }

    /**
     * GET /api/crm/reports/units?month=YYYY-MM (or from/to)
     * Units added and units sold (sold by sales only) per person.
     */
    public function unitsReport(Request $request)
    {
        [$from, $to] = $this->reportRange($request);
        $ids = self::visibleUserIds(Auth::user());
        $added = DB::table('units')->whereBetween('created_at', [$from, $to]);
        if ($ids !== null) $added->whereIn('user_id', $ids);
        $added = $added->groupBy('user_id')->selectRaw('user_id uid, COUNT(*) c')->pluck('c', 'uid')->toArray();
        $sold = [];
        $soldTotal = 0; $soldValue = 0;
        if (CrmSchema::has('units', 'availability')) {
            $s = DB::table('units')->where('availability', 'Sold out')->where('sold_by', 'Sales')->whereBetween('sold_at', [$from, $to]);
            if ($ids !== null) $s->whereIn('sold_by_user', $ids);
            foreach ($s->groupBy('sold_by_user')->selectRaw('sold_by_user uid, COUNT(*) c, SUM(price) v')->get() as $r) {
                $sold[$r->uid] = ['c' => (int) $r->c, 'v' => (int) $r->v]; $soldTotal += $r->c; $soldValue += $r->v;
            }
        }
        $uids = array_unique(array_merge(array_keys($added), array_keys($sold)));
        $names = User::whereIn('id', $uids)->get()->mapWithKeys(function ($u) { return [$u->id => trim($u->first_name . ' ' . $u->last_name)]; });
        $rows = [];
        foreach ($uids as $uid) {
            $rows[] = ['user_id' => $uid, 'name' => $names[$uid] ?? ('#' . $uid), 'added' => (int) ($added[$uid] ?? 0),
                'sold' => $sold[$uid]['c'] ?? 0, 'sold_value' => $sold[$uid]['v'] ?? 0];
        }
        usort($rows, function ($a, $b) { return [$b['sold'], $b['added']] <=> [$a['sold'], $a['added']]; });
        return response()->json(['from' => $from->toDateString(), 'to' => $to->toDateString(), 'rows' => $rows,
            'total' => ['added' => array_sum($added), 'sold' => $soldTotal, 'sold_value' => $soldValue]]);
    }

    /* ===================== duplicate check while typing ===================== */

    /** GET /api/crm/leads/check-phone?phone=&phone2=&except= — existing leads with the same number (any format) */
    public function checkPhone(Request $request)
    {
        $nums = array_filter([$request->input('phone'), $request->input('phone2')]);
        $tails = array_values(array_unique(array_filter(array_map([\App\Support\Phone::class, 'tail'], $nums))));
        if (!$tails) return response()->json(['duplicates' => []]);
        $q = DB::table('leads as l')->leftJoin('users as u', 'u.id', '=', 'l.user_id')
            ->where(function ($w) use ($tails) {
                foreach ($tails as $t) $w->orWhere('l.client_number', 'like', '%' . $t)->orWhere('l.client_sec_number', 'like', '%' . $t);
            });
        if ($request->filled('except')) $q->where('l.id', '!=', (int) $request->except);
        $rows = $q->orderBy('l.id')->limit(5)->get(['l.id', 'l.client_name', 'l.stage', 'l.created_at', 'l.user_id',
            DB::raw("TRIM(CONCAT(IFNULL(u.first_name,''),' ',IFNULL(u.last_name,''))) as salesman")]);
        // non-admins only learn THAT it exists — not whose lead it is
        if (!\App\Support\LeadScope::isAdmin(\Illuminate\Support\Facades\Auth::user())) {
            return response()->json(['duplicates' => $rows->isEmpty() ? [] : [['id' => null, 'client_name' => null, 'stage' => null, 'salesman' => null]], 'hidden' => true]);
        }
        return response()->json(['duplicates' => $rows]);
    }
}
