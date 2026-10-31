<?php

namespace App\Http\Controllers;

use App\Http\Middleware\StaffMiddleware;
use App\Models\AdminService;
use App\Models\Service;
use App\Models\Unit;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/**
 * «بكام» website: logged-in users list their own units.
 * Same rules and storage as the TAP Egypt app:
 *  - Normal users  → state "pending" (hidden) until an admin approves it in the CRM.
 *  - CRM staff     → published immediately.
 *  - Photos go to the same "public" disk folder the app uses, so the app shows them too.
 */
class WebListingController extends Controller
{
    private const MAX_PHOTOS = 15;

    /** GET /api/web/listing-options */
    public function options()
    {
        return response()->json(Cache::remember('web.listing-options', 1800, function () {
            return [
                'types' => DB::table('propert_types')->orderBy('id')->pluck('name')->unique()->values(),
                'cities' => DB::table('areas')->orderBy('id')->pluck('name')->unique()->values(),
                'finishings' => DB::table('finishings')->orderBy('id')->pluck('name')->unique()->values(),
                'delivery' => ['Ready To Move', 'up to 1 year', 'up to 2 year', 'up to 3 year', 'up to 4 year'],
                'services' => DB::table('admin_services')->select('id', 'name')->orderBy('id')->get()->unique('name')->values(),
                'developers' => DB::table('developers')->select('id', 'name')->orderBy('name')->get(),
                'projects' => DB::table('projects')->select('id', 'name', 'developer_id')->orderBy('name')->get(),
            ];
        }));
    }

    /** Owner phone as entered by staff: keep digits and a leading + only */
    private static function cleanPhone($p)
    {
        $p = trim((string) $p);
        return (substr($p, 0, 1) === '+' ? '+' : '') . preg_replace('/\D/', '', $p);
    }

    private function storeFile($folder, $file, $name)
    {
        $root = config('filesystems.disks.public.root');
        if ($root && is_dir($root)) {
            Storage::disk('public')->putFileAs($folder, $file, $name);
        } else {
            $file->move(public_path($folder), $name);
        }
    }

    /** POST /api/web/my-units  (multipart) */
    public function store(Request $request)
    {
        $user = Auth::user();
        $data = $request->validate([
            'category' => 'required|in:Resale,Rent',
            'type' => 'required|string|max:60',
            'city' => 'required|string|max:80',
            'project_id' => 'nullable|integer|exists:projects,id',
            'size' => 'required|integer|min:15|max:100000',
            'bedrooms' => 'nullable|integer|min:0|max:20',
            'bathrooms' => 'nullable|integer|min:0|max:20',
            'level' => 'nullable|string|max:30',
            'finishing' => 'nullable|string|max:60',
            'delivery_date' => 'nullable|string|max:40',
            'price' => 'required|integer|min:1000|max:2000000000',
            'down_payment' => 'nullable|integer|min:0|max:2000000000',
            'quarter_installment' => 'nullable|integer|min:0|max:2000000000',
            'description' => 'nullable|string|max:2000',
            'note' => 'nullable|string|max:1000',
            'services' => 'nullable|array|max:30',
            'services.*' => 'integer',
            'images' => 'required|array|min:1|max:' . self::MAX_PHOTOS,
            'images.*' => 'file|mimes:jpg,jpeg,png,webp|max:10240',
            'owner_name' => 'nullable|string|max:80',
            'owner_phone' => 'nullable|string|max:20',
        ], [
            'images.required' => 'ارفع صورة واحدة على الأقل',
            'images.max' => 'أقصى عدد ' . self::MAX_PHOTOS . ' صورة',
            'images.*.mimes' => 'الصور لازم تكون JPG أو PNG',
            'images.*.max' => 'كل صورة لازم تكون أقل من 10 ميجا',
        ]);

        $staff = StaffMiddleware::isStaff($user);

        // Same naming as the app: "Developer - Project"
        $name = trim(($data['type'] ?? 'Unit') . ' - ' . $data['city']);
        if (!empty($data['project_id'])) {
            $p = DB::table('projects as p')->leftJoin('developers as d', 'd.id', '=', 'p.developer_id')
                ->where('p.id', $data['project_id'])->select('p.name as pn', 'd.name as dn')->first();
            if ($p) {
                $name = trim(($p->dn ? $p->dn . ' - ' : '') . $p->pn);
            }
        }

        $folder = Str::random(20);
        $first = null;
        foreach (array_values($request->file('images')) as $i => $file) {
            $ext = strtolower($file->getClientOriginalExtension() ?: 'jpg');
            if (!in_array($ext, ['jpg', 'jpeg', 'png', 'webp'], true)) $ext = 'jpg';
            $fname = ($i + 1) . '.' . $ext;
            $this->storeFile($folder, $file, $fname);
            if ($first === null) $first = $folder . '/' . $fname;
        }

        $unit = Unit::create([
            'name' => $name,
            'description' => $data['description'] ?? ' ',
            'location' => $data['city'],
            'city' => $data['city'],
            'add_date' => Carbon::now(),
            'size' => $data['size'],
            'bedrooms' => $data['bedrooms'] ?? null,
            'bathrooms' => $data['bathrooms'] ?? null,
            'category' => $data['category'],
            'type' => $data['type'],
            'project_id' => $data['project_id'] ?? null,
            'price' => $data['price'],
            'down_payment' => $data['down_payment'] ?? null,
            'quarter_installment' => $data['quarter_installment'] ?? null,
            'finishing' => $data['finishing'] ?? null,
            'delivery_date' => $data['delivery_date'] ?? null,
            'level' => $data['level'] ?? '0',
            'land' => '0',
            'license' => 'Basic',
            'image_link' => $first,
            'folder_name' => $folder,
            'user_id' => $user->id,
            'state' => $staff ? 'approved' : 'pending',
            'deleted_at' => $staff ? null : Carbon::now(),
            'Notes' => trim('من موقع بكام. ' . ($data['note'] ?? '')),
            'clientName' => ($staff && !empty($data['owner_phone'])) ? trim((string) ($data['owner_name'] ?? '')) : trim($user->first_name . ' ' . $user->last_name),
            'clientNumber' => ($staff && !empty($data['owner_phone'])) ? substr(self::cleanPhone($data['owner_phone']), 0, 15) : substr((string) $user->phone, 0, 15),
        ]);

        if (!empty($data['services'])) {
            foreach (AdminService::whereIn('id', $data['services'])->get() as $ser) {
                $s = new Service();
                $s->unit_id = $unit->id;
                $s->name = $ser->name;
                $s->icon = $ser->icon;
                $s->save();
            }
        }

        if (!$staff) {
            try {
                $n = ['title' => 'Pending unit (Website)', 'description' => 'Pending unit #' . $unit->id . ' from ' . $user->first_name . ' — بكام', 'unit_id' => $unit->id, 'notification_type' => 'Broadcast'];
                foreach (User::whereIn('account_type', ['Admin', 'Authorize'])->get() as $admin) {
                    $admin->pushNotification($n);
                }
            } catch (\Throwable $e) {
                Log::warning('web.listing notify: ' . $e->getMessage());
            }
        }
        Cache::forget('web.home.v2');

        return response()->json(['ok' => true, 'id' => $unit->id, 'state' => $unit->state], 201);
    }

    /** GET /api/web/my-units */
    public function mine()
    {
        $me = Auth::user();
        $staff = StaffMiddleware::isStaff($me);
        $mine = preg_replace('/\D/', '', (string) $me->phone);
        $rows = Unit::withTrashed()->where('user_id', Auth::id())
            ->leftJoin('projects as p', 'p.id', '=', 'units.project_id')
            ->orderByDesc('units.id')->limit(3000)
            ->get(['units.id', 'units.name', 'units.type', 'units.city', 'units.size', 'units.bedrooms', 'units.price', 'units.category',
                   'units.state', 'units.reason', 'units.image_link', 'units.deleted_at', 'units.created_at', 'p.name as project',
                   'units.clientName', 'units.clientNumber', 'units.down_payment', 'units.quarter_installment']);
        $web = app(WebController::class);
        return response()->json($rows->map(function ($u) use ($web, $staff, $mine) {
            $op = preg_replace('/\D/', '', (string) $u->clientNumber);
            $owner = ($staff && strlen($op) >= 10 && substr($op, -10) !== substr($mine, -10)) ? ['name' => trim((string) $u->clientName), 'phone' => $op] : null;
            return [
                'id' => $u->id, 'title' => $u->name, 'type' => $u->type, 'city' => $u->city, 'size' => $u->size,
                'bedrooms' => $u->bedrooms, 'price' => (int) $u->price, 'category' => $u->category, 'project' => $u->project,
                'state' => $u->state === 'approved' && !$u->deleted_at ? 'approved' : ($u->state === 'rejected' ? 'rejected' : ($u->state === 'approved' ? 'removed' : 'pending')),
                'reason' => $u->reason,
                'photo' => $web->publicPhoto($u->image_link),
                'created_at' => (string) $u->created_at,
                'owner' => $owner,
                'down_payment' => $owner && $u->down_payment ? (int) $u->down_payment : null,
                'quarter_installment' => $owner && $u->quarter_installment ? (int) $u->quarter_installment : null,
            ];
        }));
    }

    /** DELETE /api/web/my-units/{id} — owner removes own listing (soft delete) */
    public function destroy($id)
    {
        $unit = Unit::withTrashed()->where('id', (int) $id)->where('user_id', Auth::id())->first();
        if (!$unit) {
            return response()->json(['message' => 'Not found'], 404);
        }
        if ($unit->state !== 'approved') {
            $unit->forceDelete();            // never published — remove completely
        } elseif (!$unit->trashed()) {
            $unit->delete();                 // published — hide (soft delete), CRM keeps history
        }
        Cache::forget('web.home.v2');
        return response()->json(['ok' => true]);
    }
    /** GET /api/web/my-units/{id} — data for the edit form (owner only) */
    public function show($id)
    {
        $u = Unit::withTrashed()->where('id', (int) $id)->where('user_id', Auth::id())->first();
        if (!$u) return response()->json(['message' => 'Not found'], 404);
        $web = app(WebController::class);
        $folder = $u->folder_name ?: dirname((string) $u->image_link);
        $p = $u->project_id ? DB::table('projects')->where('id', $u->project_id)->first() : null;
        return response()->json([
            'id' => $u->id, 'category' => $u->category, 'type' => $u->type, 'city' => $u->city, 'project_id' => $u->project_id,
            'developer_id' => $p ? (int) $p->developer_id : null, 'size' => $u->size, 'bedrooms' => $u->bedrooms, 'bathrooms' => $u->bathrooms,
            'level' => $u->level, 'finishing' => $u->finishing, 'delivery_date' => $u->delivery_date, 'price' => (int) $u->price,
            'down_payment' => $u->down_payment ? (int) $u->down_payment : null, 'quarter_installment' => $u->quarter_installment ? (int) $u->quarter_installment : null,
            'description' => trim((string) $u->description), 'state' => $u->state,
            'services' => DB::table('services as s')->join('admin_services as a', 'a.name', '=', 's.name')->where('s.unit_id', $u->id)->pluck('a.id')->unique()->values(),
            'photos' => $web->folderImages($folder),
            'owner' => StaffMiddleware::isStaff(Auth::user()) ? ['name' => (string) $u->clientName, 'phone' => (string) $u->clientNumber] : null,
        ]);
    }

    /** POST /api/web/my-units/{id}  (multipart) — owner edits; regular users go back to review */
    public function update(Request $request, $id)
    {
        $user = Auth::user();
        $unit = Unit::withTrashed()->where('id', (int) $id)->where('user_id', $user->id)->first();
        if (!$unit) return response()->json(['message' => 'Not found'], 404);
        $data = $request->validate([
            'category' => 'required|in:Resale,Rent',
            'type' => 'required|string|max:60',
            'city' => 'required|string|max:80',
            'project_id' => 'nullable|integer|exists:projects,id',
            'size' => 'required|integer|min:15|max:100000',
            'bedrooms' => 'nullable|integer|min:0|max:20',
            'bathrooms' => 'nullable|integer|min:0|max:20',
            'level' => 'nullable|string|max:30',
            'finishing' => 'nullable|string|max:60',
            'delivery_date' => 'nullable|string|max:40',
            'price' => 'required|integer|min:1000|max:2000000000',
            'down_payment' => 'nullable|integer|min:0|max:2000000000',
            'quarter_installment' => 'nullable|integer|min:0|max:2000000000',
            'description' => 'nullable|string|max:2000',
            'services' => 'nullable|array|max:30',
            'services.*' => 'integer',
            'remove' => 'nullable|array|max:30',
            'remove.*' => 'string|max:120',
            'images' => 'nullable|array|max:' . self::MAX_PHOTOS,
            'images.*' => 'file|mimes:jpg,jpeg,png,webp|max:10240',
            'owner_name' => 'nullable|string|max:80',
            'owner_phone' => 'nullable|string|max:20',
        ]);
        $staff = StaffMiddleware::isStaff($user);
        $folder = $unit->folder_name ?: Str::random(20);
        $web = app(WebController::class);

        // remove photos (only files inside this unit's folder)
        foreach (($data['remove'] ?? []) as $name) {
            $base = basename(rawurldecode($name));
            if (!preg_match('/^[\w.-]+\.(jpe?g|png|webp)$/i', $base)) continue;
            foreach ($web->photoRootsPublic() as $root) {
                $f = $root . '/' . $folder . '/' . $base;
                if (is_file($f)) @unlink($f);
            }
        }
        // add photos (next free numbers)
        if ($request->hasFile('images')) {
            $existing = count($web->folderImages($folder));
            if ($existing + count($request->file('images')) > self::MAX_PHOTOS) {
                return response()->json(['message' => 'أقصى عدد ' . self::MAX_PHOTOS . ' صورة'], 422);
            }
            $n = time();
            foreach (array_values($request->file('images')) as $i => $file) {
                $ext = strtolower($file->getClientOriginalExtension() ?: 'jpg');
                if (!in_array($ext, ['jpg', 'jpeg', 'png', 'webp'], true)) $ext = 'jpg';
                $this->storeFile($folder, $file, $n . '_' . ($i + 1) . '.' . $ext);
            }
        }
        $photos = $web->folderImages($folder);
        if (!$photos) return response()->json(['message' => 'لازم يفضل صورة واحدة على الأقل'], 422);

        $name = trim($data['type'] . ' - ' . $data['city']);
        if (!empty($data['project_id'])) {
            $p = DB::table('projects as p')->leftJoin('developers as d', 'd.id', '=', 'p.developer_id')
                ->where('p.id', $data['project_id'])->select('p.name as pn', 'd.name as dn')->first();
            if ($p) $name = trim(($p->dn ? $p->dn . ' - ' : '') . $p->pn);
        }
        $unit->fill([
            'name' => $name, 'description' => $data['description'] ?? ' ', 'location' => $data['city'], 'city' => $data['city'],
            'size' => $data['size'], 'bedrooms' => $data['bedrooms'] ?? null, 'bathrooms' => $data['bathrooms'] ?? null,
            'category' => $data['category'], 'type' => $data['type'], 'project_id' => $data['project_id'] ?? null,
            'price' => $data['price'], 'down_payment' => $data['down_payment'] ?? null, 'quarter_installment' => $data['quarter_installment'] ?? null,
            'finishing' => $data['finishing'] ?? null, 'delivery_date' => $data['delivery_date'] ?? null, 'level' => $data['level'] ?? '0',
            'folder_name' => $folder, 'image_link' => ltrim(rawurldecode($photos[0]), '/'),
        ]);
        if ($staff && !empty($data['owner_phone'])) {
            $unit->clientNumber = substr(self::cleanPhone($data['owner_phone'] ?? ''), 0, 15);
            $unit->clientName = trim((string) ($data['owner_name'] ?? ''));
        }
        if (!$staff) {
            $unit->state = 'pending';
            $unit->deleted_at = now();
        }
        $unit->save();

        DB::table('services')->where('unit_id', $unit->id)->delete();
        if (!empty($data['services'])) {
            foreach (AdminService::whereIn('id', $data['services'])->get() as $ser) {
                $s = new Service(); $s->unit_id = $unit->id; $s->name = $ser->name; $s->icon = $ser->icon; $s->save();
            }
        }
        if (!$staff) {
            try {
                $n = ['title' => 'Edited unit needs review (Website)', 'description' => 'Unit #' . $unit->id . ' edited by ' . $user->first_name . ' — بكام', 'unit_id' => $unit->id, 'notification_type' => 'Broadcast'];
                foreach (User::whereIn('account_type', ['Admin', 'Authorize'])->get() as $admin) $admin->pushNotification($n);
            } catch (\Throwable $e) {}
        }
        Cache::forget('web.home.v2');
        return response()->json(['ok' => true, 'id' => $unit->id, 'state' => $unit->state]);
    }

}
