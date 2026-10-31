<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

/**
 * «بكام» website: developers, projects, offers, videos, ratings and views — the app's browse features.
 */
class WebCatalogController extends Controller
{
    private function web()
    {
        return app(WebController::class);
    }

    /** project_id => most common city among its live units */
    private function projectCities()
    {
        static $m = null;
        if ($m === null) {
            $m = [];
            $rows = $this->liveUnits()->whereNotNull('u.project_id')->whereNotNull('u.city')
                ->select('u.project_id', 'u.city', DB::raw('COUNT(*) as c'))->groupBy('u.project_id', 'u.city')->orderByDesc('c')->get();
            foreach ($rows as $r) if (!isset($m[$r->project_id])) $m[$r->project_id] = $r->city;
        }
        return $m;
    }

    private function minResale()
    {
        return DB::raw("MIN(CASE WHEN u.category='Resale' AND u.price>=100000 THEN u.price END) as minp");
    }

    private function liveUnits()
    {
        return DB::table('units as u')->whereNull('u.deleted_at')->where('u.state', 'approved')->where('u.price', '>=', 1);
    }

    /** GET /api/web/developers?q= */
    public function developers(Request $request)
    {
        $q = trim((string) $request->query('q', ''));
        $key = 'web.devs.' . md5($q);
        return response()->json(Cache::remember($key, 600, function () use ($q) {
            $counts = $this->liveUnits()->join('projects as p', 'p.id', '=', 'u.project_id')
                ->select('p.developer_id', DB::raw('COUNT(*) as c'))->groupBy('p.developer_id')->pluck('c', 'p.developer_id');
            $pc = DB::table('projects')->select('developer_id', DB::raw('COUNT(*) as c'))->groupBy('developer_id')->pluck('c', 'developer_id');
            $rows = DB::table('developers')->select('id', 'name', 'photo_link', 'developer_rank')
                ->when($q !== '', function ($w) use ($q) { $w->where('name', 'like', '%' . $q . '%'); })
                ->get()->map(function ($d) use ($counts, $pc) {
                    return [
                        'id' => (int) $d->id, 'name' => $d->name,
                        'photo' => $d->photo_link ? $this->web()->publicPhoto('developers-photos/' . $d->photo_link) : null,
                        'units' => (int) ($counts[$d->id] ?? 0), 'projects' => (int) ($pc[$d->id] ?? 0),
                    ];
                })->sortByDesc('units')->values();
            return $rows;
        }));
    }

    /** GET /api/web/developers/{id} */
    public function developer($id)
    {
        $d = DB::table('developers')->where('id', (int) $id)->first();
        if (!$d) return response()->json(['message' => 'Not found'], 404);
        $counts = $this->liveUnits()->where('p.developer_id', $d->id)->join('projects as p', 'p.id', '=', 'u.project_id')
            ->select('p.id', DB::raw('COUNT(*) as c'), $this->minResale())->groupBy('p.id')->get()->keyBy('id');
        $projects = DB::table('projects')->where('developer_id', $d->id)->orderBy('name')->get()->map(function ($p) use ($counts) {
            $c = $counts[$p->id] ?? null;
            return [
                'id' => (int) $p->id, 'name' => $p->name, 'description' => $p->description,
                'photo' => $p->photo_link ? $this->web()->publicPhoto('projects-photos/' . $p->photo_link) : null,
                'units' => $c ? (int) $c->c : 0, 'min_price' => $c && $c->minp ? (int) $c->minp : null, 'city' => $this->projectCities()[$p->id] ?? null,
            ];
        })->sortByDesc('units')->values();
        // what a client wants to know: numbers from our listings + the researched profile
        $geo = \App\Support\WebSchema::hasProjectGeo();
        if ($geo) {
            $ll = DB::table('projects')->where('developer_id', $d->id)->whereNotNull('latitude')->pluck('longitude', 'id');
            $la = DB::table('projects')->where('developer_id', $d->id)->whereNotNull('latitude')->pluck('latitude', 'id');
            $projects = $projects->map(function ($p) use ($ll, $la) { if (isset($la[$p['id']])) { $p['lat'] = (float) $la[$p['id']]; $p['lng'] = (float) $ll[$p['id']]; } return $p; });
        }
        $u = $this->liveUnits()->join('projects as p', 'p.id', '=', 'u.project_id')->where('p.developer_id', $d->id);
        $stats = (clone $u)->selectRaw("COUNT(*) as units, SUM(u.category='Rent') as rent, SUM(u.delivery_date='Ready To Move') as ready,
            MIN(CASE WHEN u.category='Resale' AND u.price>=100000 THEN u.price END) as min_price,
            MAX(CASE WHEN u.category='Resale' THEN u.price END) as max_price,
            ROUND(AVG(CASE WHEN u.category='Resale' AND u.size>20 AND u.price>=100000 THEN u.price/u.size END)) as price_m2,
            MIN(CASE WHEN u.category='Resale' AND u.down_payment>0 THEN u.down_payment END) as min_down")->first();
        $cities = (clone $u)->whereNotNull('u.city')->select('u.city', DB::raw('COUNT(*) as c'))->groupBy('u.city')->orderByDesc('c')->limit(8)->pluck('c', 'city');
        $types = (clone $u)->whereNotNull('u.type')->select('u.type', DB::raw('COUNT(*) as c'))->groupBy('u.type')->orderByDesc('c')->limit(6)->pluck('c', 'type');
        return response()->json([
            'id' => (int) $d->id, 'name' => $d->name,
            'photo' => $d->photo_link ? $this->web()->publicPhoto('developers-photos/' . $d->photo_link) : null,
            'units' => $projects->sum('units'), 'projects' => $projects,
            'stats' => [
                'units' => (int) ($stats->units ?? 0), 'rent' => (int) ($stats->rent ?? 0), 'ready' => (int) ($stats->ready ?? 0),
                'min_price' => $stats->min_price ? (int) $stats->min_price : null, 'max_price' => $stats->max_price ? (int) $stats->max_price : null,
                'price_m2' => $stats->price_m2 ? (int) $stats->price_m2 : null, 'min_down' => $stats->min_down ? (int) $stats->min_down : null,
                'projects_live' => $projects->where('units', '>', 0)->count(), 'projects_all' => $projects->count(),
                'cities' => $cities, 'types' => $types,
            ],
            'profile' => \App\Support\DevProfile::get($d->id),
        ]);
    }

    /** GET /api/web/projects?q=&developer_id= */
    public function projects(Request $request)
    {
        $q = trim((string) $request->query('q', ''));
        $dev = (int) $request->query('developer_id', 0);
        $only = $request->query('with_units', '1') === '1';
        $geo = \App\Support\WebSchema::hasProjectGeo();
        $key = 'web.projs.' . Cache::get('web.projs.ver', 0) . '.' . md5($q . '|' . $dev . '|' . $only);
        return response()->json(Cache::remember($key, 600, function () use ($q, $dev, $only, $geo) {
            $counts = $this->liveUnits()->select('u.project_id', DB::raw('COUNT(*) as c'), $this->minResale())
                ->whereNotNull('u.project_id')->groupBy('u.project_id')->get()->keyBy('project_id');
            return DB::table('projects as p')->leftJoin('developers as d', 'd.id', '=', 'p.developer_id')
                ->select(array_merge(['p.id', 'p.name', 'p.photo_link', 'p.developer_id', 'd.name as developer'], $geo ? ['p.latitude', 'p.longitude'] : []))
                ->when($q !== '', function ($w) use ($q) { $w->where(function ($x) use ($q) { $x->where('p.name', 'like', '%' . $q . '%')->orWhere('d.name', 'like', '%' . $q . '%'); }); })
                ->when($dev, function ($w) use ($dev) { $w->where('p.developer_id', $dev); })
                ->get()->map(function ($p) use ($counts) {
                    $c = $counts[$p->id] ?? null;
                    return [
                        'id' => (int) $p->id, 'name' => $p->name, 'developer' => $p->developer, 'developer_id' => (int) $p->developer_id,
                        'photo' => $p->photo_link ? $this->web()->publicPhoto('projects-photos/' . $p->photo_link) : null,
                        'units' => $c ? (int) $c->c : 0, 'min_price' => $c && $c->minp ? (int) $c->minp : null, 'city' => $this->projectCities()[$p->id] ?? null,
                        'lat' => isset($p->latitude) && $p->latitude !== null ? (float) $p->latitude : null,
                        'lng' => isset($p->longitude) && $p->longitude !== null ? (float) $p->longitude : null,
                    ];
                })->filter(function ($p) use ($only) { return !$only || $p['units'] > 0; })->sortByDesc('units')->values();
        }));
    }

    /** GET /api/web/projects/{id} */
    public function project($id)
    {
        $p = DB::table('projects as p')->leftJoin('developers as d', 'd.id', '=', 'p.developer_id')
            ->select('p.*', 'd.name as developer', 'd.photo_link as dev_photo')->where('p.id', (int) $id)->first();
        if (!$p) return response()->json(['message' => 'Not found'], 404);
        $stats = $this->liveUnits()->where('u.project_id', $p->id)
            ->select(DB::raw('COUNT(*) as c'), $this->minResale(), DB::raw("MAX(CASE WHEN u.category='Resale' THEN u.price END) as maxp"))->first();
        return response()->json([
            'id' => (int) $p->id, 'name' => $p->name, 'description' => $p->description,
            'developer' => $p->developer, 'developer_id' => (int) $p->developer_id,
            'photo' => $p->photo_link ? $this->web()->publicPhoto('projects-photos/' . $p->photo_link) : null,
            'developer_photo' => $p->dev_photo ? $this->web()->publicPhoto('developers-photos/' . $p->dev_photo) : null,
            'units' => (int) $stats->c, 'min_price' => $stats->minp ? (int) $stats->minp : null,
            'max_price' => $stats->maxp ? (int) $stats->maxp : null, 'city' => $this->projectCities()[$p->id] ?? null,
            'lat' => isset($p->latitude) && $p->latitude !== null ? (float) $p->latitude : null,
            'lng' => isset($p->longitude) && $p->longitude !== null ? (float) $p->longitude : null,
        ]);
    }

    /** GET /api/web/projects-compare?ids=1,2,3 — up to 3 projects side by side */
    public function compareProjects(Request $request)
    {
        $ids = array_slice(array_values(array_unique(array_filter(array_map('intval', explode(',', (string) $request->input('ids')))))), 0, 3);
        $out = [];
        $TYPES = ['Apartment' => 'شقة', 'Villa' => 'فيلا', 'Chalet' => 'شاليه', 'Duplex' => 'دوبلكس', 'Townhouse' => 'تاون هاوس', 'Twin House' => 'توين هاوس',
            'Studio' => 'استوديو', 'Penthouse' => 'بنتهاوس', 'Ground Floor' => 'دور أرضي'];
        foreach ($ids as $id) {
            $p = DB::table('projects as p')->leftJoin('developers as d', 'd.id', '=', 'p.developer_id')
                ->select('p.id', 'p.name', 'p.photo_link', 'p.developer_id', 'd.name as developer')->where('p.id', $id)->first();
            if (!$p) continue;
            $base = $this->liveUnits()->where('u.project_id', $id);
            $sale = (clone $base)->where('u.category', 'Resale');
            $st = (clone $sale)->selectRaw('COUNT(*) c, MIN(u.price) minp, MAX(u.price) maxp, AVG(CASE WHEN u.size > 0 THEN u.price / u.size END) ppm,
                MIN(CASE WHEN u.down_payment > 0 THEN u.down_payment END) mind, MIN(CASE WHEN u.quarter_installment > 0 THEN u.quarter_installment END) minq,
                MIN(CASE WHEN u.size > 0 THEN u.size END) mins, MAX(u.size) maxs')->first();
            $rent = (clone $base)->where('u.category', 'Rent')->selectRaw('COUNT(*) c, MIN(u.price) minp')->first();
            $types = (clone $base)->whereNotNull('u.type')->groupBy('u.type')->orderByRaw('COUNT(*) DESC')->pluck('u.type')->map(function ($t) use ($TYPES) { return $TYPES[$t] ?? $t; })->take(5)->values();
            $del = (clone $sale)->whereNotNull('u.delivery_date')->groupBy('u.delivery_date')->selectRaw('u.delivery_date d, COUNT(*) c')->pluck('c', 'd');
            $out[] = [
                'id' => (int) $p->id, 'name' => $p->name, 'developer' => $p->developer, 'developer_id' => (int) $p->developer_id,
                'photo' => $p->photo_link ? $this->web()->publicPhoto('projects-photos/' . $p->photo_link) : null,
                'city' => $this->projectCities()[$p->id] ?? null,
                'units' => (int) $st->c + (int) $rent->c, 'sale' => (int) $st->c, 'rent' => (int) $rent->c,
                'min_price' => $st->minp ? (int) $st->minp : null, 'max_price' => $st->maxp ? (int) $st->maxp : null,
                'price_m2' => $st->ppm ? (int) round($st->ppm) : null, 'min_down' => $st->mind ? (int) $st->mind : null,
                'min_monthly' => $st->minq ? (int) round($st->minq / 3) : null, 'min_rent' => $rent->minp ? (int) $rent->minp : null,
                'size' => $st->mins ? [(int) $st->mins, (int) $st->maxs] : null, 'types' => $types,
                'ready' => (int) ($del['Ready To Move'] ?? 0), 'delivery' => $del,
            ];
        }
        return response()->json(['rows' => $out]);
    }

    /** POST /api/web/projects/{id}/location {lat,lng} — staff only (sales team pins projects on the map); null clears */
    public function setLocation(Request $request, $id)
    {
        if (!\App\Http\Middleware\StaffMiddleware::isStaff(Auth::user())) return response()->json(['message' => 'Forbidden'], 403);
        if (!\App\Support\WebSchema::hasProjectGeo()) return response()->json(['message' => 'DB not ready'], 500);
        $d = $request->validate(['lat' => 'nullable|numeric|between:21,32.5', 'lng' => 'nullable|numeric|between:24,37']);
        if (!DB::table('projects')->where('id', (int) $id)->exists()) return response()->json(['message' => 'Not found'], 404);
        $lat = $d['lat'] ?? null; $lng = $d['lng'] ?? null;
        if (($lat === null) !== ($lng === null)) return response()->json(['message' => 'lat و lng مع بعض'], 422);
        DB::table('projects')->where('id', (int) $id)->update(['latitude' => $lat, 'longitude' => $lng]);
        Cache::forever('web.projs.ver', (int) Cache::get('web.projs.ver', 0) + 1);
        return response()->json(['ok' => true, 'lat' => $lat !== null ? (float) $lat : null, 'lng' => $lng !== null ? (float) $lng : null]);
    }

    /** GET /api/web/offers — "عروض اليوم" + app video */
    public function offers()
    {
        return response()->json(Cache::remember('web.offers', 600, function () {
            $units = DB::table('units as u')->leftJoin('projects as p', 'p.id', '=', 'u.project_id')->leftJoin('developers as d', 'd.id', '=', 'p.developer_id')
                ->whereNull('u.deleted_at')->where('u.state', 'approved')->whereNotNull('u.offer_photo')
                ->select('u.id', 'u.offer_photo', 'u.price', 'u.type', 'u.city', 'u.category', 'p.name as project', 'd.name as developer')->get()
                ->map(function ($u) {
                    return ['kind' => 'unit', 'id' => (int) $u->id, 'project' => $u->project, 'developer' => $u->developer, 'type' => $u->type,
                        'city' => $u->city, 'price' => (int) $u->price, 'category' => $u->category,
                        'photo' => $this->web()->publicPhoto('offers-photos/' . $u->offer_photo)];
                });
            $projects = DB::table('projects as p')->leftJoin('developers as d', 'd.id', '=', 'p.developer_id')->whereNotNull('p.offer_photo')
                ->select('p.id', 'p.name', 'p.offer_photo', 'd.name as developer')->get()
                ->map(function ($p) {
                    return ['kind' => 'project', 'id' => (int) $p->id, 'project' => $p->name, 'developer' => $p->developer,
                        'photo' => $this->web()->publicPhoto('offers-photos/' . $p->offer_photo)];
                });
            $video = DB::table('videos')->orderByDesc('id')->first();
            return [
                'offers' => $projects->concat($units)->filter(function ($o) { return $o['photo']; })->values(),
                'video' => $video ? $this->web()->publicPhoto('units-videos/' . $video->video_link) : null,
            ];
        }));
    }

    /** POST /api/web/units/{id}/rate {value:1..5} */
    public function rate(Request $request, $id)
    {
        $v = (int) $request->validate(['value' => 'required|integer|min:1|max:5'])['value'];
        $uid = Auth::id();
        $unit = (int) $id;
        if (!DB::table('units')->where('id', $unit)->whereNull('deleted_at')->exists()) {
            return response()->json(['message' => 'Not found'], 404);
        }
        $row = DB::table('rates')->where('user_id', $uid)->where('unit_id', $unit)->first();
        if ($row) {
            DB::table('rates')->where('id', $row->id)->update(['value' => $v, 'updated_at' => now()]);
        } else {
            DB::table('rates')->insert(['user_id' => $uid, 'unit_id' => $unit, 'value' => $v, 'created_at' => now(), 'updated_at' => now()]);
        }
        $agg = DB::table('rates')->where('unit_id', $unit)->select(DB::raw('AVG(value) as a'), DB::raw('COUNT(*) as c'))->first();
        return response()->json(['mine' => $v, 'avg' => round((float) $agg->a, 1), 'count' => (int) $agg->c]);
    }

    /** POST /api/web/units/{id}/visit — same "views" the app counts */
    public function visit($id)
    {
        $uid = Auth::id();
        $unit = (int) $id;
        if (DB::table('units')->where('id', $unit)->exists()
            && !DB::table('visited_units')->where('user_id', $uid)->where('unit_id', $unit)->where('created_at', '>', now()->subDay())->exists()) {
            DB::table('visited_units')->insert(['user_id' => $uid, 'unit_id' => $unit, 'created_at' => now(), 'updated_at' => now()]);
        }
        try { \App\Support\Interest::fromView($unit, Auth::user()); } catch (\Throwable $e) {}
        return response()->json(['ok' => true]);
    }

    /** POST /api/web/units/{id}/pdf — login required. Name + number of whoever listed the unit (for the PDF header),
     *  and counts the export (shown in the CRM). No lead and no notification, unlike /contact. */
    public function pdfInfo(Request $request, $id)
    {
        $u = DB::table('units')->whereNull('deleted_at')->where('state', 'approved')->where('id', (int) $id)->first();
        if (!$u) return response()->json(['message' => 'Not found'], 404);
        // The PDF / image carries the contact of whoever downloads it (the logged-in user), not of who listed the unit.
        $poster = \Illuminate\Support\Facades\Auth::guard('api')->user() ?: \Illuminate\Support\Facades\Auth::user();
        $d = preg_replace('/\D+/', '', (string) ($poster->phone ?? ''));
        if ($d !== '') {
            if (strpos($d, '0020') === 0) $d = substr($d, 2);
            if ($d[0] === '0') $d = '2' . $d;
            if (strpos($d, '20') !== 0 && strlen($d) === 10) $d = '20' . $d;
            if (strlen($d) < 11) $d = '';
        }
        try {
            if (\App\Support\CrmSchema::has('units', 'pdf_count')) DB::table('units')->where('id', $u->id)->increment('pdf_count');
        } catch (\Throwable $e) {}
        return response()->json([
            'name' => $poster ? trim($poster->first_name . ' ' . $poster->last_name) : '',
            'phone' => $d ?: '201113555557',
            'direct' => $d !== '',
            'staff' => $poster ? \App\Http\Middleware\StaffMiddleware::isStaff($poster) : false,
        ]);
    }

    /**
     * GET /api/web/units/{id}/pdf-photo/{n} — small JPEG of the unit's n-th photo for the PDF
     * (cover 1280px wide, others 720px). Made once with GD and kept in storage/app/pdfcache.
     */
    public function pdfPhoto($id, $n)
    {
        $n = max(0, min(14, (int) $n));
        $u = DB::table('units')->whereNull('deleted_at')->where('state', 'approved')->where('id', (int) $id)->first(['id', 'image_link', 'folder_name', 'updated_at']);
        if (!$u) abort(404);
        $web = app(\App\Http\Controllers\WebController::class);
        $list = $web->folderImages($u->folder_name ?: dirname((string) $u->image_link));
        if (!$list && $u->image_link && ($one = $web->publicPhoto($u->image_link))) $list = [$one];
        if (!isset($list[$n])) abort(404);
        $rel = rawurldecode(ltrim($list[$n], '/'));
        $src = null;
        foreach ($web->photoRootsPublic() as $root) { if (is_file($root . '/' . $rel)) { $src = $root . '/' . $rel; break; } }
        if (!$src) abort(404);
        $w = $n === 0 ? 1280 : 720;
        $dir = storage_path('app/pdfcache');
        if (!is_dir($dir)) @mkdir($dir, 0755, true);
        $out = $dir . '/u' . $u->id . '_' . $n . '_' . $w . '_' . substr(md5($rel . filemtime($src)), 0, 8) . '.jpg';
        $headers = ['Content-Type' => 'image/jpeg', 'Cache-Control' => 'public, max-age=604800'];
        if (is_file($out)) return response()->file($out, $headers);
        if (!function_exists('imagecreatetruecolor')) return response()->file($src, ['Cache-Control' => 'public, max-age=86400']);
        @ini_set('memory_limit', '512M');
        $info = @getimagesize($src);
        if (!$info) abort(404);
        switch ($info[2]) {
            case IMAGETYPE_JPEG: $im = @imagecreatefromjpeg($src); break;
            case IMAGETYPE_PNG: $im = @imagecreatefrompng($src); break;
            case IMAGETYPE_WEBP: $im = function_exists('imagecreatefromwebp') ? @imagecreatefromwebp($src) : null; break;
            default: $im = null;
        }
        if (!$im) return response()->file($src, ['Cache-Control' => 'public, max-age=86400']);
        if ($info[2] === IMAGETYPE_JPEG && function_exists('exif_read_data')) {
            $o = (int) (@exif_read_data($src)['Orientation'] ?? 1);
            if ($o === 3) $im = imagerotate($im, 180, 0); elseif ($o === 6) $im = imagerotate($im, -90, 0); elseif ($o === 8) $im = imagerotate($im, 90, 0);
        }
        $sw = imagesx($im); $sh = imagesy($im);
        if ($sw > $w) {
            $h = (int) round($sh * $w / $sw);
            $dst = imagecreatetruecolor($w, $h);
            imagefill($dst, 0, 0, imagecolorallocate($dst, 255, 255, 255));
            imagecopyresampled($dst, $im, 0, 0, 0, 0, $w, $h, $sw, $sh);
            imagedestroy($im); $im = $dst;
        }
        imageinterlace($im, true);
        imagejpeg($im, $out, 80);
        imagedestroy($im);
        return response()->file($out, $headers);
    }

    /** POST /api/web/units/{id}/contact {way: call|whatsapp} — login required (same as the app).
     *  Returns the lister's number. If the lister is a Sales/Admin user, a CRM lead is created for them
     *  with the visitor as the client; the lister also gets a push/notification either way. */
    public function contact(Request $request, $id)
    {
        $way = $request->input('way') === 'whatsapp' ? 'Whatsapp' : 'Call';
        $me = Auth::user();
        $u = DB::table('units')->whereNull('deleted_at')->where('state', 'approved')->where('id', (int) $id)->first();
        if (!$u) return response()->json(['message' => 'Not found'], 404);
        $poster = $u->user_id ? \App\Models\User::find($u->user_id) : null;
        $company = '201113555557';
        $digits = function ($p) {
            $d = preg_replace('/\D+/', '', (string) $p);
            if ($d === '') return null;
            if (strpos($d, '0020') === 0) $d = substr($d, 2);
            if ($d[0] === '0') $d = '2' . $d;           // 01x... -> 201x...
            if (strpos($d, '20') !== 0 && strlen($d) === 10) $d = '20' . $d;
            return strlen($d) >= 11 ? $d : null;
        };
        $phone = $poster ? $digits($poster->phone) : null;
        $isStaff = $poster && \App\Http\Middleware\StaffMiddleware::isStaff($poster);
        $title = trim(($u->type ?: 'Unit') . ' #' . $u->id . ($u->name ? ' — ' . $u->name : ''));
        $link = \App\Support\PublicUrl::site($request) . '/u/' . $u->id;
        $visitor = trim($me->first_name . ' ' . $me->last_name);
        $vPhone = \App\Support\Phone::normalize($me->phone) ?: (string) $me->phone;

        try {
            if ($isStaff) {
                $existing = \App\Models\Lead::findDuplicate([$vPhone]);
                $lead = \App\Models\Lead::create([
                    'client_name' => $visitor, 'client_number' => $vPhone, 'user_id' => $poster->id,
                    'action_type' => $way, 'channel' => 'Website', 'area' => $u->city ?: 'Other',
                    'stage' => 'Fresh lead', 'status' => 'In progress', 'isduplicate' => $existing ? true : false,
                ]);
                if (\App\Support\CrmSchema::has('leads', 'web_form')) \App\Models\Lead::where('id', $lead->id)->toBase()->update(['web_form' => 'unit']);
                \App\Models\Action::create(['user_id' => $poster->id, 'action_type' => 'create lead', 'lead_id' => $lead->id,
                    'details' => 'عميل من موقع بكام ضغط ' . ($way === 'Call' ? 'اتصال' : 'واتساب') . ' على ' . $title . ' | ' . $link]);
            }
            if ($poster) {
                $poster->pushNotification(['notification_type' => 'unit', 'id' => $u->id,
                    'title' => $way === 'Call' ? 'حد بيتصل بيك من موقع بكام' : 'حد هيكلمك واتساب من موقع بكام',
                    'description' => mb_substr($visitor . ' (' . $vPhone . ') سأل على ' . $title, 0, 180)]);
            }
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::warning('web.contact: ' . $e->getMessage());
        }
        return response()->json([
            'name' => $poster ? $poster->first_name : 'بكام',
            'phone' => $phone ?: $company,
            'direct' => (bool) $phone,
            'staff' => $isStaff,
        ]);
    }
}
