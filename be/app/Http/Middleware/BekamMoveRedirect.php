<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

/**
 * After the website moved (BEKAM_PUBLIC_URL set, e.g. https://www.bekameg.com) every old website link
 * — bekam.tapegypt.com/… and tapegypt.com/bekam/… — answers with a permanent redirect to the same page
 * on the new domain. The CRM, the app and the API (/api/…) are not touched. The website home page
 * (/bekam/ = a static file) does the same in its first line of script, so #unit-… links keep their place.
 */
class BekamMoveRedirect
{
    public function handle(Request $request, Closure $next)
    {
        $pub = \App\Support\PublicUrl::configured();
        if ($pub === '' || !in_array($request->method(), ['GET', 'HEAD'], true)) return $next($request);
        $newHost = strtolower((string) parse_url($pub, PHP_URL_HOST));
        $host = strtolower($request->getHost());
        if ($newHost === '') return $next($request);
        // the address as typed (request->path() drops a leading folder that exists on disk, e.g. /bekam)
        $path = '/' . ltrim(rawurldecode((string) parse_url((string) $request->server('REQUEST_URI', '/'), PHP_URL_PATH)), '/');
        if ($path !== '/') $path = rtrim($path, '/');
        if (strpos($path, '/api/') === 0 || $path === '/api') return $next($request);
        $root = \App\Support\PublicUrl::rootMode();
        $sitePath = $path === '/bekam' || strpos($path, '/bekam/') === 0;
        // the website moved from /bekam/… to the root of its domain: /bekam/unit/5 → /unit/5
        $toRoot = function ($p) { $p = (string) preg_replace('#^/bekam(?=/|$)#', '', $p); return $p === '' ? '/' : $p; };
        $qs = $request->getQueryString();
        if ($host === $newHost) {
            if ($root && $sitePath) return redirect()->away(rtrim($pub, '/') . $toRoot($path) . ($qs ? '?' . $qs : ''), 301);
            return $next($request);
        }

        $oldSite = strpos($host, 'bekam.') === 0 || preg_match('/(^|\.)bekameg\.com$/', $host);          // bekam.tapegypt.com, bekameg.com (no www)
        $mainHost = preg_match('/(^|\.)tapegypt\.com$/', $host) && !$oldSite;                            // tapegypt.com / www.tapegypt.com
        if (!$oldSite && !($mainHost && $sitePath)) return $next($request);

        $target = $root ? $toRoot($path) : ($path === '/' ? '/bekam/' : $path);
        return redirect()->away(rtrim($pub, '/') . $target . ($qs ? '?' . $qs : ''), 301);
    }
}
