<?php

namespace App\Support;

/**
 * The «بكام» website address used in every link we send (units, picks, offers, share cards, sitemap).
 * Set BEKAM_PUBLIC_URL in .env (e.g. https://www.bekameg.com) to move the links to a new domain;
 * the old addresses keep working. Without it: https://bekam.tapegypt.com.
 * Never the main tapegypt.com host: the app claims those links on phones. Local test hosts keep their own address.
 */
class PublicUrl
{
    /** BEKAM_PUBLIC_URL from .env — read from the file itself too, so it works even when the config is cached */
    public static function configured()
    {
        static $v = null;
        if ($v !== null) return $v;
        $v = (string) env('BEKAM_PUBLIC_URL', '');
        if ($v === '') {
            try {
                $f = base_path('.env');
                if (is_readable($f) && preg_match('/^\s*BEKAM_PUBLIC_URL\s*=\s*"?([^"\r\n#]+)"?/m', (string) file_get_contents($f), $m)) $v = trim($m[1]);
            } catch (\Throwable $e) {}
        }
        $v = rtrim($v, '/');
        return $v;
    }

    /** BEKAM_SITE_ROOT=1 in .env: the website lives at the root of its domain (www.bekameg.com/unit/…) instead of /bekam/ */
    public static function rootMode()
    {
        static $v = null;
        if ($v !== null) return $v;
        $raw = (string) env('BEKAM_SITE_ROOT', '');
        if ($raw === '') {
            try {
                $f = base_path('.env');
                if (is_readable($f) && preg_match('/^\s*BEKAM_SITE_ROOT\s*=\s*"?([^"\r\n#]+)"?/m', (string) file_get_contents($f), $m)) $raw = trim($m[1]);
            } catch (\Throwable $e) {}
        }
        $v = in_array(strtolower(trim($raw)), ['1', 'true', 'yes', 'on'], true);
        return $v;
    }

    /** the website's path on its domain: '' at the root, '/bekam' before the move */
    public static function prefix()
    {
        return self::rootMode() ? '' : '/bekam';
    }

    /** the website address with its path, without the closing slash (https://www.bekameg.com or …/bekam) */
    public static function site($request = null)
    {
        return self::base($request) . self::prefix();
    }

    public static function base($request = null)
    {
        $req = $request ?: request();
        $host = $req ? $req->getHost() : '';
        if (in_array($host, ['127.0.0.1', 'localhost'], true)) return $req->getSchemeAndHttpHost();
        return self::configured() ?: 'https://bekam.tapegypt.com';
    }

    /** a host that should open the website on "/" (bekam.tapegypt.com, bekameg.com, www.bekameg.com, the BEKAM_PUBLIC_URL host) */
    public static function isWebsiteHost($host)
    {
        $host = strtolower((string) $host);
        $pub = strtolower((string) parse_url(self::configured(), PHP_URL_HOST));
        return strpos($host, 'bekam.') === 0 || preg_match('/(^|\.)bekameg\.com$/', $host) || ($pub !== '' && $host === $pub);
    }
}
