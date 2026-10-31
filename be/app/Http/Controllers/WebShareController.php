<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

/**
 * Share pages for the «بكام» website.
 * WhatsApp / Facebook / Telegram don't run JavaScript and ignore "#unit-…",
 * so a shared link points here (/bekam/u/{id}). This page carries the
 * preview tags (title, price, first photo) and forwards people to the site.
 */
class WebShareController extends Controller
{
    const TYPE_AR = [
        'Apartment' => 'شقة', 'Chalet' => 'شاليه', 'Ground Floor' => 'دور أرضي بجاردن', 'Stand Alone' => 'فيلا مستقلة',
        'Twin House' => 'توين هاوس', 'Penthouse' => 'بنتهاوس', 'Town house middle' => 'تاون هاوس', 'Town house corner' => 'تاون هاوس كورنر',
        'Studio' => 'استوديو', 'I Villa Garden' => 'آي فيلا جاردن', 'I Villa Roof' => 'آي فيلا روف', 'Loft' => 'لوفت', 'Duplex' => 'دوبلكس',
        'Cabin' => 'كابينة', 'Sky House' => 'سكاي هاوس', 'Beach House' => 'بيتش هاوس', 'Office' => 'مكتب', 'Upper Duplex' => 'دوبلكس علوي',
        'Clinic' => 'عيادة', 'Stand Alone Chalet' => 'شاليه مستقل', 'Ground Duplex' => 'دوبلكس أرضي', 'Service Apartment' => 'شقة فندقية',
        'Service Chalet' => 'شاليه فندقي',
    ];
    const CITY_AR = [
        '6 October' => '6 أكتوبر', 'North Coast' => 'الساحل الشمالي', 'El Sheikh Zayed' => 'الشيخ زايد', 'New Zayed' => 'زايد الجديدة',
        'New Cairo' => 'القاهرة الجديدة', 'Ras El Hikma' => 'رأس الحكمة', 'Sokhna' => 'السخنة', 'Ain Sokhna' => 'العين السخنة',
        'Mostakbal city' => 'مدينة المستقبل', 'New Capital' => 'العاصمة الإدارية',
    ];

    private function web() { return app(WebController::class); }

    private function base(Request $r)
    {
        return \App\Support\PublicUrl::base($r); // the website address, also when opened through tapegypt.com
    }

    private function money($v)
    {
        if (!$v) return null;
        if ($v >= 1000000) return rtrim(rtrim(number_format($v / 1000000, 2), '0'), '.') . ' مليون ج.م';
        return number_format($v) . ' ج.م';
    }

    /** GET /bekam/u/{id} */
    public function unit(Request $request, $id)
    {
        $res = $this->web()->unit((int) $id);
        if ($res->getStatusCode() !== 200) {
            return $this->page($request, 'بكام؟ — دليلك لأسعار العقارات', 'وحدات ريسيل وإيجار بأسعار حقيقية في كل مشروعات مصر.', null, '../');
        }
        $u = $res->getData(true);
        $type = self::TYPE_AR[$u['type']] ?? ($u['type'] ?: 'وحدة');
        $title = $type . ($u['bedrooms'] ? ' ' . $u['bedrooms'] . ' غرف' : '') . ($u['project'] ? ' في ' . $u['project'] : '');
        $price = $u['price'] ? ($u['category'] === 'Rent' ? number_format($u['price']) . ' ج / شهر' : $this->money($u['price'])) : 'السعر عند الطلب';
        $desc = implode(' · ', array_filter([
            $price,
            $u['size'] ? $u['size'] . ' م²' : null,
            $u['category'] === 'Rent' ? 'للإيجار' : 'للبيع',
            $u['developer'] ?? null,
            self::CITY_AR[$u['city']] ?? $u['city'],
        ]));
        $photo = ($u['photos'][0] ?? null) ?: ($u['photo'] ?? null);
        $img = $photo ? $this->base($request) . \App\Support\PublicUrl::prefix() . '/og/u/' . (int) $id . '.jpg' : null;
        return $this->page($request, $title . ' — ' . $price, $desc, $img, '../#unit-' . (int) $id);
    }

    /** GET /bekam/p/{id} */
    public function project(Request $request, $id)
    {
        $res = app(WebCatalogController::class)->project((int) $id);
        if ($res->getStatusCode() !== 200) {
            return $this->page($request, 'بكام؟ — دليلك لأسعار العقارات', 'وحدات ريسيل وإيجار بأسعار حقيقية في كل مشروعات مصر.', null, '../');
        }
        $p = $res->getData(true);
        $desc = implode(' · ', array_filter([
            $p['developer'] ?? null, self::CITY_AR[$p['city'] ?? ''] ?? ($p['city'] ?? null),
            $p['units'] ? $p['units'] . ' وحدة متاحة' : null,
            $p['min_price'] ? 'يبدأ من ' . $this->money($p['min_price']) : null,
        ]));
        $img = !empty($p['photo']) ? $this->base($request) . \App\Support\PublicUrl::prefix() . '/og/p/' . (int) $id . '.jpg' : null;
        return $this->page($request, 'مشروع ' . $p['name'] . ' — بكام؟', $desc, $img, '../#project-' . (int) $id);
    }

    /** GET /bekam/og/{kind}/{id}.jpg — preview image, resized to ≤1200px so WhatsApp accepts it */
    public function image($kind, $id)
    {
        $id = (int) $id;
        if ($kind === 'u') {
            $res = $this->web()->unit($id);
            $d = $res->getStatusCode() === 200 ? $res->getData(true) : null;
            $rel = $d ? (($d['photos'][0] ?? null) ?: ($d['photo'] ?? null)) : null;
        } else {
            $res = app(WebCatalogController::class)->project($id);
            $rel = $res->getStatusCode() === 200 ? ($res->getData(true)['photo'] ?? null) : null;
        }
        $src = $rel ? $this->localFile($rel) : null;
        if (!$src) abort(404);

        $cacheDir = storage_path('app/og');
        $cache = $cacheDir . '/' . $kind . $id . '-' . substr(md5($src . filemtime($src)), 0, 10) . '.jpg';
        if (!is_file($cache)) {
            try {
                if (!is_dir($cacheDir)) @mkdir($cacheDir, 0755, true);
                foreach (glob($cacheDir . '/' . $kind . $id . '-*.jpg') ?: [] as $old) @unlink($old);
                if (!$this->resize($src, $cache)) $cache = $src;
            } catch (\Throwable $e) {
                Log::warning('og image: ' . $e->getMessage());
                $cache = $src;
            }
        }
        $mime = preg_match('/\.png$/i', $cache) ? 'image/png' : (preg_match('/\.webp$/i', $cache) ? 'image/webp' : 'image/jpeg');
        return response()->file($cache, ['Content-Type' => $mime, 'Cache-Control' => 'public, max-age=86400']);
    }

    /** GET /bekam/og/c/{token}.jpg — link preview for units a salesman sent: up to 4 photos with their prices */
    public function collectionImage($token)
    {
        $cc = app(UnitCollectionController::class);
        $c = $cc->find($token);
        if (!$c || !function_exists('imagecreatetruecolor')) abort(404);
        $ids = array_map('intval', explode(',', $c->unit_ids));
        $rows = $this->web()->listQuery()->whereIn('u.id', $ids)->get()->keyBy('id');
        $units = [];
        foreach ($ids as $i) {
            if (!isset($rows[$i])) continue;
            $u = $this->web()->shapePublic($rows[$i]);
            $rel = $u['photo'] ?? null;
            $src = $rel ? $this->localFile($rel) : null;
            if ($src && ($t = @getimagesize($src)) && $t[0] > 50) $units[] = ['src' => $src, 'price' => (int) $u['price'], 'rent' => $u['category'] === 'Rent'];
            if (count($units) >= 4) break;
        }
        if (!$units) abort(404);
        $dir = storage_path('app/og');
        if (!is_dir($dir)) @mkdir($dir, 0755, true);
        $cache = $dir . '/c' . $c->token . '-' . substr(md5(json_encode($units) . implode('', array_map(function ($u) { return @filemtime($u['src']); }, $units))), 0, 10) . '.jpg';
        if (!is_file($cache)) {
            foreach (glob($dir . '/c' . $c->token . '-*.jpg') ?: [] as $old) @unlink($old);
            $W = 1200; $H = 630; $g = 6;
            $out = imagecreatetruecolor($W, $H);
            imagefill($out, 0, 0, imagecolorallocate($out, 6, 85, 92));
            $n = count($units);
            // layout: 1 → full; 2 → two columns; 3 → big left + two right; 4 → 2x2
            $cells = [
                1 => [[0, 0, $W, $H]],
                2 => [[0, 0, $W / 2 - $g / 2, $H], [$W / 2 + $g / 2, 0, $W / 2 - $g / 2, $H]],
                3 => [[0, 0, $W * 0.6 - $g / 2, $H], [$W * 0.6 + $g / 2, 0, $W * 0.4 - $g / 2, $H / 2 - $g / 2], [$W * 0.6 + $g / 2, $H / 2 + $g / 2, $W * 0.4 - $g / 2, $H / 2 - $g / 2]],
                4 => [[0, 0, $W / 2 - $g / 2, $H / 2 - $g / 2], [$W / 2 + $g / 2, 0, $W / 2 - $g / 2, $H / 2 - $g / 2], [0, $H / 2 + $g / 2, $W / 2 - $g / 2, $H / 2 - $g / 2], [$W / 2 + $g / 2, $H / 2 + $g / 2, $W / 2 - $g / 2, $H / 2 - $g / 2]],
            ][$n];
            $font = storage_path('app/fonts/DejaVuSans-Bold.ttf');
            $white = imagecolorallocate($out, 255, 255, 255);
            $ink = imagecolorallocate($out, 11, 59, 92);
            foreach ($units as $k => $u) {
                list($x, $y, $w, $h) = array_map('intval', $cells[$k]);
                $im = $this->open($u['src']);
                if ($im) {
                    $iw = imagesx($im); $ih = imagesy($im);
                    $scale = max($w / $iw, $h / $ih);
                    $cw = (int) round($w / $scale); $ch = (int) round($h / $scale);
                    imagecopyresampled($out, $im, $x, $y, (int) (($iw - $cw) / 2), (int) (($ih - $ch) / 2), $w, $h, $cw, $ch);
                    imagedestroy($im);
                }
                if ($u['price'] && is_file($font) && function_exists('imagettftext')) {
                    $t = 'EGP ' . ($u['price'] >= 1000000 ? rtrim(rtrim(number_format($u['price'] / 1000000, 2), '0'), '.') . 'M' : number_format($u['price'])) . ($u['rent'] ? ' /mo' : '');
                    $size = $n === 1 ? 34 : 26;
                    $bb = imagettfbbox($size, 0, $font, $t);
                    $tw = $bb[2] - $bb[0]; $th = $bb[1] - $bb[7];
                    $px = $x + 18; $py = $y + $h - $th - 36;
                    imagefilledrectangle($out, $px, $py, $px + $tw + 32, $py + $th + 22, $white);
                    imagettftext($out, $size, 0, $px + 16, $py + $th + 10, $ink, $font, $t);
                }
            }
            if ($n > 1 || count($ids) > $n) {
                $more = count($ids) . ' units';
                if (is_file($font) && function_exists('imagettftext')) {
                    $bb = imagettfbbox(24, 0, $font, $more); $tw = $bb[2] - $bb[0];
                    $teal = imagecolorallocate($out, 6, 85, 92);
                    imagefilledrectangle($out, $W - $tw - 56, 18, $W - 18, 68, $teal);
                    imagettftext($out, 24, 0, $W - $tw - 38, 55, $white, $font, $more);
                }
            }
            imagejpeg($out, $cache, 82);
            imagedestroy($out);
        }
        return response()->file($cache, ['Content-Type' => 'image/jpeg', 'Cache-Control' => 'public, max-age=3600']);
    }

    private function open($src)
    {
        $info = @getimagesize($src);
        if (!$info) return null;
        switch ($info[2]) {
            case IMAGETYPE_JPEG: return @imagecreatefromjpeg($src);
            case IMAGETYPE_PNG: return @imagecreatefrompng($src);
            case IMAGETYPE_WEBP: return function_exists('imagecreatefromwebp') ? @imagecreatefromwebp($src) : null;
        }
        return null;
    }

    private function localFile($url)
    {
        $rel = ltrim(rawurldecode(parse_url($url, PHP_URL_PATH) ?: ''), '/');
        if ($rel === '' || strpos($rel, '..') !== false) return null;
        foreach ($this->web()->photoRootsPublic() as $root) {
            $f = $root . '/' . $rel;
            if (is_file($f)) return $f;
        }
        return null;
    }

    private function resize($src, $dst)
    {
        if (!function_exists('imagecreatetruecolor')) return false;
        $info = @getimagesize($src);
        if (!$info) return false;
        switch ($info[2]) {
            case IMAGETYPE_JPEG: $im = @imagecreatefromjpeg($src); break;
            case IMAGETYPE_PNG: $im = @imagecreatefrompng($src); break;
            case IMAGETYPE_WEBP: $im = function_exists('imagecreatefromwebp') ? @imagecreatefromwebp($src) : null; break;
            default: $im = null;
        }
        if (!$im) return false;
        $w = imagesx($im); $h = imagesy($im);
        $k = min(1, 1200 / max($w, $h));
        $nw = max(1, (int) round($w * $k)); $nh = max(1, (int) round($h * $k));
        $out = imagecreatetruecolor($nw, $nh);
        imagefill($out, 0, 0, imagecolorallocate($out, 255, 255, 255));
        imagecopyresampled($out, $im, 0, 0, 0, 0, $nw, $nh, $w, $h);
        $ok = imagejpeg($out, $dst, 80);
        imagedestroy($im); imagedestroy($out);
        return $ok;
    }

    private function page(Request $request, $title, $desc, $img, $target)
    {
        $e = function ($s) { return htmlspecialchars((string) $s, ENT_QUOTES, 'UTF-8'); };
        $url = $this->base($request) . '/' . ltrim($request->path(), '/');
        $html = '<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8">'
            . '<meta name="viewport" content="width=device-width, initial-scale=1">'
            . '<title>' . $e($title) . '</title>'
            . '<meta name="description" content="' . $e($desc) . '">'
            . '<meta property="og:type" content="website"><meta property="og:site_name" content="بكام؟">'
            . '<meta property="og:locale" content="ar_EG">'
            . '<meta property="og:title" content="' . $e($title) . '">'
            . '<meta property="og:description" content="' . $e($desc) . '">'
            . '<meta property="og:url" content="' . $e($url) . '">'
            . ($img ? '<meta property="og:image" content="' . $e($img) . '"><meta property="og:image:secure_url" content="' . $e($img) . '"><meta property="og:image:type" content="image/jpeg"><meta name="twitter:image" content="' . $e($img) . '">' : '')
            . '<meta name="twitter:card" content="' . ($img ? 'summary_large_image' : 'summary') . '">'
            . '<meta name="twitter:title" content="' . $e($title) . '"><meta name="twitter:description" content="' . $e($desc) . '">'
            . '<meta http-equiv="refresh" content="0;url=' . $e($target) . '">'
            . '<script>location.replace(' . json_encode($target) . ');</script>'
            . '</head><body style="font-family:sans-serif;padding:24px"><a href="' . $e($target) . '">افتح على بكام</a></body></html>';
        return response($html, 200, ['Content-Type' => 'text/html; charset=UTF-8', 'Cache-Control' => 'public, max-age=600']);
    }
}
