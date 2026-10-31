<?php

namespace App\Http\Controllers;

use App\Models\Action;
use App\Support\CrmSchema;
use App\Support\LeadScope;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

/**
 * "ابعت وحدات للعميل": a salesman picks units (his own or any) and sends them to
 * the clients he chooses. One link per pick (/bekam/c/{token}) opens a page on
 * «بكام» with those units and the salesman's name + WhatsApp.
 *
 *  GET  /api/crm/units-pick?mine=1&q=&city=&category=&min=&max=   units to pick from
 *  POST /api/crm/collections {unit_ids[], title?}                  → {id, token, url}
 *  POST /api/crm/collections/{id}/sent {lead_id}                   logged on the lead
 *  GET  /api/crm/collections                                       my latest links + views
 *  GET  /api/web/collections/{token}                               public: the units + the salesman
 */
class UnitCollectionController extends Controller
{
    const MAX_UNITS = 30;

    private function web() { return app(WebController::class); }

    public function pick(Request $request)
    {
        $me = Auth::user();
        $q = $this->web()->listQuery()->addSelect('u.user_id');
        if ($request->boolean('mine')) $q->where('u.user_id', $me->id);
        $p = $request->only(['category', 'city', 'type', 'min_price', 'max_price', 'project_id', 'developer_id', 'bedrooms', 'q']);
        $term = trim((string) ($p['q'] ?? ''));
        if ($term !== '' && ctype_digit($term)) { unset($p['q']); $q->where('u.id', (int) $term); }
        $this->web()->applyFilters($q, $p);
        $rows = $q->orderByDesc('u.updated_at')->limit(60)->get();
        return response()->json(['units' => $rows->map(function ($u) use ($me) {
            $s = $this->web()->shapePublic($u);
            $s['mine'] = (int) ($u->user_id ?? 0) === (int) $me->id;
            return $s;
        })->values()]);
    }

    /** GET /api/crm/collections-leads?q= — the clients this person may send to (his / his team's / all for admins) */
    public function leads(Request $request)
    {
        $me = Auth::user();
        $q = LeadScope::apply(\App\Models\Lead::query(), $me)->select('id', 'client_name', 'client_number', 'stage', 'area', 'project_id', 'updated_at');
        $v = trim((string) $request->input('q', ''));
        if ($v !== '') {
            $digits = preg_replace('/\D+/', '', $v);
            $q->where(function ($w) use ($v, $digits) {
                $w->where('client_name', 'like', '%' . $v . '%');
                if (strlen($digits) >= 4) $w->orWhere('client_number', 'like', '%' . substr($digits, -9) . '%');
                if (ctype_digit($v)) $w->orWhere('id', (int) $v);
            });
        }
        if ($request->filled('ids')) $q->whereIn('id', array_filter(array_map('intval', explode(',', $request->ids))));
        $rows = $q->whereNotIn('status', \App\Models\Lead::CLOSED_STATUSES)->orderByDesc('updated_at')->limit(40)->get();
        $rows = \App\Support\PhoneMask::apply($rows, $me);
        return response()->json(['leads' => $rows]);
    }

    public function store(Request $request)
    {
        CrmSchema::ensure();
        $d = $request->validate([
            'unit_ids' => 'required|array|min:1|max:' . self::MAX_UNITS,
            'unit_ids.*' => 'integer',
            'title' => 'nullable|string|max:120',
        ]);
        $ids = $this->web()->listQuery()->whereIn('u.id', array_map('intval', $d['unit_ids']))->pluck('u.id')->map(function ($v) { return (int) $v; })->all();
        // keep the order the salesman picked
        $ids = array_values(array_filter(array_map('intval', $d['unit_ids']), function ($i) use ($ids) { return in_array($i, $ids, true); }));
        $ids = array_values(array_unique($ids));
        if (!$ids) return response()->json(['message' => 'None of these units is on the website now'], 422);
        $me = Auth::user();
        // the same pick again → the same link
        $same = DB::table('unit_collections')->where('user_id', $me->id)->where('unit_ids', implode(',', $ids))
            ->where('created_at', '>=', now()->subDays(30))->orderByDesc('id')->first();
        if ($same) {
            if (!empty($d['title']) && $d['title'] !== $same->title) DB::table('unit_collections')->where('id', $same->id)->update(['title' => $d['title'], 'updated_at' => now()]);
            return response()->json($this->out($request, $same->id, $same->token, count($ids)));
        }
        $token = Str::lower(Str::random(10));
        $id = DB::table('unit_collections')->insertGetId([
            'token' => $token, 'user_id' => $me->id, 'title' => $d['title'] ?? null,
            'unit_ids' => implode(',', $ids), 'created_at' => now(), 'updated_at' => now(),
        ]);
        return response()->json($this->out($request, $id, $token, count($ids)), 201);
    }

    private function out(Request $request, $id, $token, $count)
    {
        $me = Auth::user();
        return ['id' => $id, 'token' => $token, 'count' => $count, 'url' => \App\Support\PublicUrl::site($request) . '/c/' . $token,
            'sales' => ['name' => trim($me->first_name . ' ' . $me->last_name), 'phone' => self::waNumber($me->phone)]];
    }

    public function sent(Request $request, $id)
    {
        $me = Auth::user();
        $c = DB::table('unit_collections')->where('id', (int) $id)->where('user_id', $me->id)->first();
        if (!$c) return response()->json(['message' => 'Not found'], 404);
        $leadId = (int) $request->input('lead_id');
        $lead = \App\Models\Lead::find($leadId);
        if (!$lead || !LeadScope::canSeeUser($me, \App\Models\User::find($lead->user_id))) return response()->json(['message' => 'Forbidden'], 403);
        DB::table('unit_collections')->where('id', $c->id)->increment('sent');
        Action::create([
            'user_id' => $me->id, 'lead_id' => $lead->id, 'action_type' => 'whatsapp',
            'details' => trim($me->first_name . ' ' . $me->last_name) . ' sent ' . count(explode(',', $c->unit_ids)) . ' units on WhatsApp (units ' . $c->unit_ids . ') — /bekam/c/' . $c->token,
        ]);
        return response()->json(['ok' => true]);
    }

    public function mine(Request $request)
    {
        CrmSchema::ensure();
        $me = Auth::user();
        $rows = DB::table('unit_collections')->where('user_id', $me->id)->orderByDesc('id')->limit(20)->get()->map(function ($c) use ($request) {
            return ['id' => $c->id, 'title' => $c->title, 'count' => count(explode(',', $c->unit_ids)), 'views' => (int) $c->views, 'sent' => (int) $c->sent,
                'url' => \App\Support\PublicUrl::site($request) . '/c/' . $c->token, 'created_at' => (string) $c->created_at];
        });
        return response()->json(['items' => $rows]);
    }

    /** public */
    public function show($token)
    {
        $c = $this->find($token);
        if (!$c) return response()->json(['message' => 'Not found'], 404);
        if (!request()->boolean('preview')) {
            DB::table('unit_collections')->where('id', $c->id)->increment('views');
            // tell the salesman the client is looking now (only the page itself asking, not the WhatsApp preview card)
            if (request()->is('api/*')) \App\Support\ClientNotify::collectionOpened($c);
        }
        $ids = array_map('intval', explode(',', $c->unit_ids));
        $rows = $this->web()->listQuery()->whereIn('u.id', $ids)->get()->keyBy('id');
        $units = [];
        foreach ($ids as $i) if (isset($rows[$i])) $units[] = $this->web()->shapePublic($rows[$i]);
        $u = \App\Models\User::find($c->user_id);
        return response()->json([
            'title' => $c->title,
            'sales' => $u ? ['name' => trim($u->first_name . ' ' . $u->last_name), 'first_name' => $u->first_name, 'wa' => self::waNumber($u->phone)] : null,
            'units' => $units,
            'gone' => count($ids) - count($units),
        ]);
    }

    public function find($token)
    {
        if (!preg_match('/^[a-z0-9]{6,16}$/i', (string) $token) || !CrmSchema::has('unit_collections', 'token')) return null;
        return DB::table('unit_collections')->where('token', strtolower($token))->first();
    }

    public static function waNumber($raw)
    {
        $d = preg_replace('/\D+/', '', (string) $raw);
        if ($d === '') return '201113555557';
        if (strpos($d, '0020') === 0) $d = substr($d, 2);
        if ($d[0] === '0') $d = '2' . $d;
        if (strpos($d, '20') !== 0 && strlen($d) === 10) $d = '20' . $d;
        return strlen($d) >= 11 ? $d : '201113555557';
    }
}
