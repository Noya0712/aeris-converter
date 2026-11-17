<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Middleware Keamanan HTTP Headers (OWASP Top 10 Mitigation)
 * Melindungi aplikasi dari injeksi skrip/iklan pihak ketiga (XSS),
 * Clickjacking, MIME-Sniffing, dan kebocoran informasi server.
 */
class SecurityHeaders
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        $isLocalDev = app()->isLocal() && file_exists(public_path('hot'));

        $scriptSrc = $isLocalDev
            ? "'self' 'unsafe-inline' 'wasm-unsafe-eval' blob: http://127.0.0.1:5173 http://localhost:5173"
            : "'self' 'wasm-unsafe-eval' blob:";

        $connectSrc = $isLocalDev
            ? "'self' blob: http://127.0.0.1:5173 http://localhost:5173 ws://127.0.0.1:5173 ws://localhost:5173"
            : "'self' blob:";

        $cspDirectives = [
            "default-src 'self'",
            "script-src {$scriptSrc}",
            "worker-src 'self' blob:",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com data:",
            "img-src 'self' data: blob:",
            "media-src 'self' blob:",
            "connect-src {$connectSrc}",
            "frame-src 'none'",
            "frame-ancestors 'none'",
            "object-src 'none'",
            "base-uri 'self'",
            "form-action 'self'",
        ];

        $response->headers->set('Content-Security-Policy', implode('; ', $cspDirectives));
        $response->headers->set('X-Frame-Options', 'DENY');
        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');
        $response->headers->set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=()');
        $response->headers->set('X-XSS-Protection', '0');

        if ($request->isSecure()) {
            $response->headers->set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
        }

        $response->headers->remove('X-Powered-By');
        if (function_exists('header_remove') && !headers_sent()) {
            @header_remove('X-Powered-By');
        }

        return $response;
    }
}
