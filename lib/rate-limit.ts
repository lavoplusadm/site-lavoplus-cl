import { NextRequest, NextResponse } from 'next/server';

/**
 * Rate Limiter simple basado en memoria
 * Para producción, considera usar Redis o una solución distribuida
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// Almacén en memoria de rate limits
const rateLimitStore = new Map<string, RateLimitEntry>();

// Limpiar entradas antiguas cada 10 minutos
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, 10 * 60 * 1000);

export interface RateLimitConfig {
  /** Número máximo de solicitudes permitidas */
  max: number;
  /** Ventana de tiempo en milisegundos */
  windowMs: number;
  /** Mensaje personalizado cuando se excede el límite */
  message?: string;
}

/**
 * Obtiene el identificador del cliente basado en IP
 */
function getClientIdentifier(request: NextRequest): string {
  // Intentar obtener la IP real del cliente
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');

  let ip = forwarded?.split(',')[0] || realIp || 'unknown';

  // Normalizar IPv6
  if (ip.includes('::ffff:')) {
    ip = ip.split('::ffff:')[1];
  }

  return ip;
}

/**
 * Middleware de rate limiting
 */
export function rateLimit(config: RateLimitConfig) {
  const { max, windowMs, message = 'Demasiadas solicitudes. Por favor, intenta de nuevo más tarde.' } = config;

  return async function rateLimitMiddleware(
    request: NextRequest
  ): Promise<NextResponse | null> {
    const identifier = getClientIdentifier(request);
    const now = Date.now();
    const key = `${identifier}:${request.nextUrl.pathname}`;

    // Obtener o crear entrada de rate limit
    let entry = rateLimitStore.get(key);

    if (!entry || now > entry.resetTime) {
      // Nueva ventana de tiempo
      entry = {
        count: 0,
        resetTime: now + windowMs,
      };
      rateLimitStore.set(key, entry);
    }

    // Incrementar contador
    entry.count++;

    // Verificar si se excedió el límite
    if (entry.count > max) {
      const resetInSeconds = Math.ceil((entry.resetTime - now) / 1000);

      return NextResponse.json(
        {
          error: message,
          retryAfter: resetInSeconds,
        },
        {
          status: 429,
          headers: {
            'Retry-After': resetInSeconds.toString(),
            'X-RateLimit-Limit': max.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(entry.resetTime).toISOString(),
          },
        }
      );
    }

    // Actualizar headers de rate limit (opcional)
    const remaining = Math.max(0, max - entry.count);

    return null; // Continuar con la solicitud
  };
}

/**
 * Configuraciones predefinidas de rate limit
 */
export const rateLimitConfigs = {
  // Límite estricto para APIs sensibles como envío de emails
  strict: {
    max: 3,
    windowMs: 60 * 60 * 1000, // 3 solicitudes por hora
    message: 'Has excedido el límite de envíos. Por favor, intenta de nuevo en una hora.',
  },

  // Límite moderado para formularios
  moderate: {
    max: 5,
    windowMs: 15 * 60 * 1000, // 5 solicitudes cada 15 minutos
    message: 'Has enviado demasiadas solicitudes. Por favor, espera unos minutos.',
  },

  // Límite permisivo para consultas generales
  permissive: {
    max: 100,
    windowMs: 60 * 1000, // 100 solicitudes por minuto
    message: 'Demasiadas solicitudes. Por favor, espera un momento.',
  },
};
