import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Crear respuesta
  const response = NextResponse.next();

  // Security Headers
  const headers = response.headers;

  // Protección contra clickjacking
  headers.set('X-Frame-Options', 'DENY');

  // Prevenir MIME type sniffing
  headers.set('X-Content-Type-Options', 'nosniff');

  // Habilitar XSS protection en navegadores antiguos
  headers.set('X-XSS-Protection', '1; mode=block');

  // Referrer Policy - controla qué información se envía en el header Referer
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Content Security Policy
  const isDevelopment = process.env.NODE_ENV === 'development';

  const csp = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-eval' ${isDevelopment ? "'unsafe-inline'" : ''} https://www.google.com https://www.gstatic.com https://www.googletagmanager.com`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https://www.google.com https://recaptchaenterprise.googleapis.com https://api.resend.com",
    "frame-src 'self' https://www.google.com https://www.google.com.mx https://maps.google.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join('; ');

  headers.set('Content-Security-Policy', csp);

  // Permissions Policy (anteriormente Feature Policy)
  const permissionsPolicy = [
    'camera=()',
    'microphone=()',
    'geolocation=()',
    'interest-cohort=()', // Desactivar FLoC
    'payment=()',
    'usb=()',
  ].join(', ');

  headers.set('Permissions-Policy', permissionsPolicy);

  // Strict-Transport-Security (HSTS) - Solo en producción con HTTPS
  if (process.env.NODE_ENV === 'production') {
    headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    );
  }

  return response;
}

// Configurar para qué rutas aplicar el middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
