<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

/**
 * Search-engine pages for the «بكام» website.
 *
 * The site itself is one page that switches views with "#unit-…" — Google
 * can't index that. These routes give every unit / project / developer a
 * real address (/bekam/unit/14778 …) whose HTML already carries the title,
 * description, photos, price and links, plus preview tags and structured
 * data. People who open the address get the normal site (the page hands
 * over to "#unit-…" before the app starts).
 */
class WebSeoController extends Controller
{
    const SITE = 'بكام؟';

    private function web() { return app(WebController::class); }
    private function cat() { return app(WebCatalogController::class); }
    private function share() { return app(WebShareController::class); }

    private function base(Request $r)
    {
        return \App\Support\PublicUrl::base($r); // the website address, also when opened through tapegypt.com
    }

    private function e($s) { return htmlspecialchars((string) $s, ENT_QUOTES, 'UTF-8'); }

    private function money($v)
    {
        if (!$v) return null;
        if ($v >= 1000000) return rtrim(rtrim(number_format($v / 1000000, 2), '0'), '.') . ' مليون ج.م';
        return number_format($v) . ' ج.م';
    }

    private function typeAr($t) { return WebShareController::TYPE_AR[$t] ?? ($t ?: 'وحدة'); }
    private function cityAr($c) { return WebShareController::CITY_AR[$c] ?? $c; }

    private function abs(Request $r, $path)
    {
        if (!$path) return null;
        if (preg_match('#^https?://#', $path)) return $path;
        return $this->base($r) . '/' . ltrim($path, '/');
    }

    /* ------------------------------------------------------------------ units */

    /** GET /bekam/unit/{id} */
    public function unit(Request $request, $id)
    {
        $res = $this->web()->unit((int) $id);
        if ($res->getStatusCode() !== 200) return $this->gone($request);
        $u = $res->getData(true);
        $base = $this->base($request);
        $type = $this->typeAr($u['type']);
        $city = $this->cityAr($u['city']);
        $rent = $u['category'] === 'Rent';
        $price = $u['price'] ? ($rent ? number_format($u['price']) . ' ج.م / شهر' : $this->money($u['price'])) : 'السعر عند الطلب';
        $where = trim(($u['project'] ? $u['project'] : '') . ($city ? ($u['project'] ? ' ' : '') . $city : ''));
        $h1 = $type . ($u['bedrooms'] ? ' ' . $u['bedrooms'] . ' غرف' : '') . ($rent ? ' للإيجار' : ' للبيع') . ($where ? ' في ' . $where : '');
        $title = $h1 . ' — ' . $price . ' | ' . self::SITE;
        $desc = implode(' · ', array_filter([
            $h1, $price, $u['size'] ? $u['size'] . ' م²' : null,
            $u['bathrooms'] ? $u['bathrooms'] . ' حمام' : null,
            $u['developer'] ? 'من ' . $u['developer'] : null,
            $u['down_payment'] && !$rent ? 'مقدم ' . $this->money($u['down_payment']) : null,
        ])) . '. أسعار حقيقية ومستشار بكام معاك لحد التعاقد.';
        $photos = array_values(array_filter(array_slice($u['photos'] ?: ($u['photo'] ? [$u['photo']] : []), 0, 6)));
        $og = $photos ? $base . '/bekam/og/u/' . (int) $id . '.jpg' : $base . '/bekam/assets/og-home.jpg?v=3';
        $url = $base . '/bekam/unit/' . (int) $id;

        $specs = array_filter([
            'المساحة' => $u['size'] ? $u['size'] . ' م²' : null,
            'غرف النوم' => $u['bedrooms'] ?: null,
            'الحمامات' => $u['bathrooms'] ?: null,
            'الدور' => $u['level'] ?: null,
            'التشطيب' => $u['finishing'] ?: null,
            'الاستلام' => $u['delivery'] ?: null,
            'المطور' => $u['developer'] ?: null,
            'المنطقة' => $city ?: null,
            'المقدم / المدفوع' => !$rent && $u['down_payment'] ? $this->money($u['down_payment']) : null,
            'القسط ربع السنوي' => !$rent && $u['quarter_installment'] ? number_format($u['quarter_installment']) . ' ج.م' : null,
        ]);
        $descLines = array_slice(array_values(array_filter(array_map('trim', preg_split('/\r?\n/', (string) $u['description'])))), 0, 25);

        $crumbs = [['بكام', $base . '/bekam/']];
        if ($u['developer'] && $u['developer_id']) $crumbs[] = [$u['developer'], $base . '/bekam/developer/' . (int) $u['developer_id']];
        if ($u['project'] && $u['project_id']) $crumbs[] = [$u['project'], $base . '/bekam/project/' . (int) $u['project_id']];
        $crumbs[] = [$h1, $url];

        $body = $this->crumbsHtml($crumbs)
            . '<h1>' . $this->e($h1) . '</h1>'
            . '<p class="seo-price"><b>' . $this->e($price) . '</b>' . ($u['price'] && $u['size'] && !$rent ? ' · ' . number_format(round($u['price'] / $u['size'])) . ' ج.م للمتر' : '') . '</p>'
            . ($photos ? '<div class="seo-ph" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:8px">' . implode('', array_map(function ($p, $i) use ($request, $h1) {
                return '<img src="' . $this->e($this->abs($request, $p)) . '" alt="' . $this->e($h1 . ' — صورة ' . ($i + 1)) . '" loading="lazy" width="320" height="240" style="width:100%;height:auto;border-radius:12px">';
            }, $photos, array_keys($photos))) . '</div>' : '')
            . '<h2>المواصفات</h2><ul>' . implode('', array_map(function ($k, $v) { return '<li>' . $this->e($k) . ': ' . $this->e($v) . '</li>'; }, array_keys($specs), $specs)) . '</ul>'
            . ($descLines ? '<h2>عن الوحدة</h2>' . implode('', array_map(function ($l) { return '<p>' . $this->e($l) . '</p>'; }, $descLines)) : '')
            . (!empty($u['similar']) ? '<h2>وحدات مشابهة</h2><ul>' . implode('', array_map(function ($s) use ($base) {
                $t = $this->typeAr($s['type']) . ($s['bedrooms'] ? ' ' . $s['bedrooms'] . ' غرف' : '') . ($s['project'] ? ' في ' . $s['project'] : '');
                return '<li><a href="' . $this->e($base . '/bekam/unit/' . (int) $s['id']) . '">' . $this->e($t) . '</a>' . ($s['price'] ? ' — ' . $this->e($this->money($s['price'])) : '') . '</li>';
            }, array_slice($u['similar'], 0, 8))) . '</ul>' : '')
            . $this->contactHtml();

        $ld = [[
            '@context' => 'https://schema.org', '@type' => 'RealEstateListing',
            'name' => $h1, 'url' => $url, 'description' => $desc,
            'image' => array_map(function ($p) use ($request) { return $this->abs($request, $p); }, $photos),
            'dateModified' => $u['updated_at'] ? date('c', strtotime($u['updated_at'])) : null,
            'offers' => $u['price'] ? ['@type' => 'Offer', 'price' => (int) $u['price'], 'priceCurrency' => 'EGP',
                'availability' => ($u['availability'] ?? '') === 'sold' ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock',
                'businessFunction' => $rent ? 'http://purl.org/goodrelations/v1#LeaseOut' : 'http://purl.org/goodrelations/v1#Sell'] : null,
            'about' => array_filter([
                '@type' => 'Accommodation', 'name' => $type,
                'floorSize' => $u['size'] ? ['@type' => 'QuantitativeValue', 'value' => (float) $u['size'], 'unitCode' => 'MTK'] : null,
                'numberOfRooms' => $u['bedrooms'] ? (int) $u['bedrooms'] : null,
                'numberOfBathroomsTotal' => $u['bathrooms'] ? (int) $u['bathrooms'] : null,
                'address' => ['@type' => 'PostalAddress', 'addressLocality' => $city, 'addressCountry' => 'EG'],
            ]),
        ], $this->crumbsLd($crumbs)];

        return $this->render($request, $title, $desc, $url, $og, $body, $ld, '#unit-' . (int) $id);
    }

    /* --------------------------------------------------------------- projects */

    /** GET /bekam/project/{id} */
    public function project(Request $request, $id)
    {
        $res = $this->cat()->project((int) $id);
        if ($res->getStatusCode() !== 200) return $this->gone($request);
        $p = $res->getData(true);
        $base = $this->base($request);
        $city = $this->cityAr($p['city'] ?? '');
        $url = $base . '/bekam/project/' . (int) $id;
        $h1 = 'مشروع ' . $p['name'] . ($city ? ' — ' . $city : '');
        $range = $p['min_price'] ? 'من ' . $this->money($p['min_price']) . ($p['max_price'] && $p['max_price'] != $p['min_price'] ? ' لحد ' . $this->money($p['max_price']) : '') : null;
        $title = 'وحدات ريسيل وإيجار في ' . $p['name'] . ($city ? ' ' . $city : '') . ($range ? ' — ' . $range : '') . ' | ' . self::SITE;
        $desc = implode(' · ', array_filter([
            $p['units'] ? $p['units'] . ' وحدة متاحة في ' . $p['name'] : null,
            $p['developer'] ? 'من ' . $p['developer'] : null, $city, $range,
        ])) . '. أسعار حقيقية من بكام.';
        $og = !empty($p['photo']) ? $base . '/bekam/og/p/' . (int) $id . '.jpg' : $base . '/bekam/assets/og-home.jpg?v=3';

        $units = $this->web()->listQuery()->where('p.id', (int) $id)->orderByDesc('u.updated_at')->limit(60)->get()
            ->map(function ($u) { return $this->web()->shapePublic($u); })->all();

        $crumbs = [['بكام', $base . '/bekam/']];
        if (!empty($p['developer_id'])) $crumbs[] = [$p['developer'], $base . '/bekam/developer/' . (int) $p['developer_id']];
        $crumbs[] = [$p['name'], $url];

        $body = $this->crumbsHtml($crumbs)
            . '<h1>' . $this->e($h1) . '</h1>'
            . ($range ? '<p class="seo-price"><b>' . $this->e($range) . '</b></p>' : '')
            . (!empty($p['description']) ? '<p>' . $this->e($p['description']) . '</p>' : '')
            . '<ul>' . (!empty($p['developer']) ? '<li>المطور: ' . (!empty($p['developer_id']) ? '<a href="' . $this->e($base . '/bekam/developer/' . (int) $p['developer_id']) . '">' . $this->e($p['developer']) . '</a>' : $this->e($p['developer'])) . '</li>' : '')
            . ($city ? '<li>المنطقة: ' . $this->e($city) . '</li>' : '') . '<li>الوحدات المتاحة: ' . (int) $p['units'] . '</li></ul>'
            . ($units ? '<h2>الوحدات المتاحة في ' . $this->e($p['name']) . '</h2><ul>' . implode('', array_map(function ($u) use ($base) {
                $t = $this->typeAr($u['type']) . ($u['bedrooms'] ? ' ' . $u['bedrooms'] . ' غرف' : '') . ($u['size'] ? ' · ' . $u['size'] . ' م²' : '') . ($u['category'] === 'Rent' ? ' · إيجار' : '');
                return '<li><a href="' . $this->e($base . '/bekam/unit/' . (int) $u['id']) . '">' . $this->e($t) . '</a>' . ($u['price'] ? ' — ' . $this->e($this->money($u['price'])) : '') . '</li>';
            }, $units)) . '</ul>' : '')
            . $this->contactHtml();

        $ld = [array_filter([
            '@context' => 'https://schema.org', '@type' => 'Place', 'name' => $p['name'], 'url' => $url, 'description' => $desc,
            'address' => ['@type' => 'PostalAddress', 'addressLocality' => $city, 'addressCountry' => 'EG'],
            'geo' => !empty($p['lat']) && !empty($p['lng']) ? ['@type' => 'GeoCoordinates', 'latitude' => (float) $p['lat'], 'longitude' => (float) $p['lng']] : null,
        ]), $this->crumbsLd($crumbs)];

        return $this->render($request, $title, $desc, $url, $og, $body, $ld, '#project-' . (int) $id);
    }

    /* ------------------------------------------------------------- developers */

    /** GET /bekam/developer/{id} */
    public function developer(Request $request, $id)
    {
        $res = $this->cat()->developer((int) $id);
        if ($res->getStatusCode() !== 200) return $this->gone($request);
        $d = $res->getData(true);
        $base = $this->base($request);
        $url = $base . '/bekam/developer/' . (int) $id;
        $projects = array_values(array_filter($d['projects'] ?? [], function ($p) { return !empty($p['units']); }));
        $h1 = 'وحدات ' . $d['name'] . ' للبيع والإيجار';
        $title = $h1 . ' — ' . (int) $d['units'] . ' وحدة في ' . count($projects) . ' مشروع | ' . self::SITE;
        $desc = (int) $d['units'] . ' وحدة ريسيل وإيجار من ' . $d['name'] . ' في ' . count($projects) . ' مشروع'
            . ($projects ? ': ' . implode('، ', array_slice(array_map(function ($p) { return $p['name']; }, $projects), 0, 6)) : '') . '. أسعار حقيقية من بكام.';

        $crumbs = [['بكام', $base . '/bekam/'], [$d['name'], $url]];
        $body = $this->crumbsHtml($crumbs)
            . '<h1>' . $this->e($h1) . '</h1>'
            . '<p>' . $this->e($desc) . '</p>'
            . ($projects ? '<h2>مشروعات ' . $this->e($d['name']) . '</h2><ul>' . implode('', array_map(function ($p) use ($base) {
                return '<li><a href="' . $this->e($base . '/bekam/project/' . (int) $p['id']) . '">' . $this->e($p['name']) . '</a> — ' . (int) $p['units'] . ' وحدة</li>';
            }, $projects)) . '</ul>' : '')
            . $this->contactHtml();

        $ld = [['@context' => 'https://schema.org', '@type' => 'Organization', 'name' => $d['name'], 'url' => $url], $this->crumbsLd($crumbs)];
        return $this->render($request, $title, $desc, $url, $base . '/bekam/assets/og-home.jpg?v=3', $body, $ld, '#dev-' . (int) $id);
    }

    /* ------------------------------------------------------------ collections */

    /** GET /bekam/c/{token} — units a salesman picked for a client (preview card for WhatsApp; not indexed) */
    public function collection(Request $request, $token)
    {
        $cc = app(UnitCollectionController::class);
        $c = $cc->find($token);
        if (!$c) return $this->gone($request);
        $d = json_decode($cc->show($token)->getContent(), true);
        DB::table('unit_collections')->where('id', $c->id)->decrement('views'); // the preview fetch isn't a visit
        $base = $this->base($request);
        $units = $d['units'] ?? [];
        $n = count($units);
        $who = $d['sales']['name'] ?? 'فريق بكام';
        $title = ($d['title'] ?: $n . ' وحدات مختارة ليك') . ' — من ' . $who . ' | ' . self::SITE;
        $prices = array_filter(array_map(function ($u) { return (int) $u['price']; }, $units));
        $desc = implode(' · ', array_filter([
            implode('، ', array_slice(array_values(array_unique(array_filter(array_map(function ($u) { return $u['project'] ?: null; }, $units)))), 0, 4)),
            $prices ? 'من ' . $this->money(min($prices)) . (count($prices) > 1 ? ' لحد ' . $this->money(max($prices)) : '') : null,
        ])) ?: 'وحدات مختارة ليك على بكام';
        $first = null;
        foreach ($units as $u) if (!empty($u['photo'])) { $first = $u; break; }
        $img = $first ? $base . '/bekam/og/c/' . $c->token . '.jpg?v=' . substr(md5($c->unit_ids), 0, 6) : $base . '/bekam/assets/og-home.jpg?v=3';
        $url = $base . '/bekam/c/' . $c->token;
        $body = '<h1>' . $this->e($d['title'] ?: $n . ' وحدات مختارة ليك') . '</h1><p>من ' . $this->e($who) . '</p><ul>' . implode('', array_map(function ($u) use ($base) {
            return '<li><a href="' . $this->e($base . '/bekam/unit/' . (int) $u['id']) . '">' . $this->e($this->typeAr($u['type']) . ($u['project'] ? ' في ' . $u['project'] : '')) . '</a>' . ($u['price'] ? ' — ' . $this->e($this->money($u['price'])) : '') . '</li>';
        }, $units)) . '</ul>';
        $res = $this->render($request, $title, $desc, $url, $img, $body, [], '#c-' . $c->token);
        $res->headers->set('X-Robots-Tag', 'noindex');
        return $res;
    }

    /* ---------------------------------------------------------------- sitemap */

    /** GET /bekam/sitemap.xml */
    public function sitemap(Request $request)
    {
        $base = $this->base($request);
        $xml = Cache::remember('web.sitemap.v1.' . md5($base), 3600, function () use ($base) {
            $units = $this->web()->listQuery()->reorder()->orderByDesc('u.id')->limit(45000)->get()
                ->map(function ($u) { return [(int) $u->id, $u->updated_at ?? null]; });
            $projects = $this->web()->listQuery()->reorder()->whereNotNull('p.id')->select('p.id', DB::raw('MAX(u.updated_at) as lm'))->groupBy('p.id')->get();
            $devs = $this->web()->listQuery()->reorder()->whereNotNull('d.id')->select('d.id', DB::raw('MAX(u.updated_at) as lm'))->groupBy('d.id')->get();
            $row = function ($loc, $lm, $pr) {
                return '<url><loc>' . htmlspecialchars($loc, ENT_XML1) . '</loc>' . ($lm ? '<lastmod>' . date('Y-m-d', strtotime($lm)) . '</lastmod>' : '') . '<priority>' . $pr . '</priority></url>';
            };
            $out = '<?xml version="1.0" encoding="UTF-8"?>' . "\n" . '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
            $out .= $row($base . '/bekam/', date('Y-m-d'), '1.0');
            foreach ($devs as $d) $out .= $row($base . '/bekam/developer/' . (int) $d->id, $d->lm, '0.6');
            foreach ($projects as $p) $out .= $row($base . '/bekam/project/' . (int) $p->id, $p->lm, '0.8');
            foreach ($units as $u) $out .= $row($base . '/bekam/unit/' . $u[0], $u[1], '0.7');
            return $out . '</urlset>';
        });
        return response($xml, 200, ['Content-Type' => 'application/xml; charset=UTF-8', 'Cache-Control' => 'public, max-age=3600']);
    }

    /** GET /robots.txt (only when the server has no robots.txt file of its own) */
    public function robots(Request $request)
    {
        $base = $this->base($request);
        $txt = "User-agent: *\nAllow: /bekam/\nDisallow: /api/\nDisallow: /dashboard/\n\nSitemap: {$base}/bekam/sitemap.xml\n";
        return response($txt, 200, ['Content-Type' => 'text/plain; charset=UTF-8', 'Cache-Control' => 'public, max-age=86400']);
    }

    /* ---------------------------------------------------------------- helpers */

    private function crumbsHtml(array $c)
    {
        return '<nav class="seo-bc" aria-label="مسار الصفحة">' . implode(' &rlm;‹&rlm; ', array_map(function ($x, $i) use ($c) {
            return $i === count($c) - 1 ? '<span>' . $this->e($x[0]) . '</span>' : '<a href="' . $this->e($x[1]) . '">' . $this->e($x[0]) . '</a>';
        }, $c, array_keys($c))) . '</nav>';
    }

    private function crumbsLd(array $c)
    {
        return ['@context' => 'https://schema.org', '@type' => 'BreadcrumbList', 'itemListElement' => array_map(function ($x, $i) {
            return ['@type' => 'ListItem', 'position' => $i + 1, 'name' => $x[0], 'item' => $x[1]];
        }, $c, array_keys($c))];
    }

    private function contactHtml()
    {
        return '<p class="seo-contact">عايز تفاصيل أو معاينة؟ كلّم مستشار بكام: <a href="tel:+201113555557" dir="ltr">0111 355 5557</a> — مول العرب، بوابة 5، 6 أكتوبر.</p>';
    }

    private function gone(Request $request)
    {
        // unit sold / removed: tell Google it's gone, send people to the home page
        $html = '<!DOCTYPE html><html lang="ar"><head><meta charset="utf-8"><meta name="robots" content="noindex">'
            . '<title>الوحدة دي مش متاحة — بكام؟</title><meta http-equiv="refresh" content="0;url=/bekam/"></head>'
            . '<body><a href="/bekam/">شوف الوحدات المتاحة على بكام</a></body></html>';
        return response($html, 410, ['Content-Type' => 'text/html; charset=UTF-8']);
    }

    private function render(Request $request, $title, $desc, $url, $img, $body, array $ld, $hash)
    {
        $file = public_path('bekam/index.html');
        $html = is_file($file) ? file_get_contents($file) : '<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title></title></head><body></body></html>';
        $e = function ($s) { return $this->e($s); };
        $desc = mb_substr($desc, 0, 300);

        $head = '<base href="/bekam/">'
            . '<link rel="canonical" href="' . $e($url) . '">'
            . '<meta property="og:type" content="website"><meta property="og:site_name" content="بكام؟"><meta property="og:locale" content="ar_EG">'
            . '<meta property="og:title" content="' . $e($title) . '"><meta property="og:description" content="' . $e($desc) . '">'
            . '<meta property="og:url" content="' . $e($url) . '"><meta property="og:image" content="' . $e($img) . '">'
            . '<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="' . $e($title) . '">'
            . '<meta name="twitter:description" content="' . $e($desc) . '"><meta name="twitter:image" content="' . $e($img) . '">';
        foreach ($ld as $block) {
            $head .= '<script type="application/ld+json">' . json_encode($this->clean($block), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG) . '</script>';
        }

        // drop the home page's own preview tags / canonical / structured data first
        $html = preg_replace('#<!--home-meta-->.*?<!--/home-meta-->#s', '', $html);
        $html = preg_replace('/<meta charset="utf-8">/i', '<meta charset="utf-8">' . $head, $html, 1);
        $html = preg_replace('#<title>.*?</title>#s', '<title>' . $e($title) . '</title>', $html, 1);
        $html = preg_replace('#<meta name="description" content="[^"]*">#', '<meta name="description" content="' . $e($desc) . '">', $html, 1);

        $pre = '<div id="seoPre" class="wrap" style="padding:24px 32px;line-height:1.8">' . $body . '</div>';
        $html = preg_replace('#<body>#', '<body>' . $pre, $html, 1);
        // hand over to the app view before it starts; address bar shows the normal site link
        $boot = '<script>(function(){var p=document.getElementById("seoPre");if(p)p.parentNode.removeChild(p);'
            . 'try{history.replaceState(null,"","/bekam/' . $hash . '")}catch(e){location.hash=' . json_encode($hash) . '}})();</script>';
        $html = preg_replace('#<script src="app\.#', $boot . '<script src="app.', $html, 1);

        return response($html, 200, ['Content-Type' => 'text/html; charset=UTF-8', 'Cache-Control' => 'public, max-age=600', 'X-Robots-Tag' => 'index, follow']);
    }

    private function clean($a)
    {
        if (!is_array($a)) return $a;
        $out = [];
        foreach ($a as $k => $v) {
            if ($v === null || $v === [] || $v === '') continue;
            $out[$k] = $this->clean($v);
        }
        return $out;
    }
}
