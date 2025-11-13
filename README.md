# Lavandería Lavoplus – Sitio Web

Landing page corporativa para **Lavandería Lavoplus** (Los Ángeles, Chile) construida con **Next.js 14**, **TypeScript** y **Tailwind CSS**. Incluye formulario protegido con **reCAPTCHA Enterprise**, envío de correos mediante **Resend**, contenido SEO y módulos pensados para delivery y convenios empresariales.

## Stack Principal
- **Next.js 14 (App Router)** con componentes cliente/servidor, `dynamic()` para secciones pesadas y `metadata` SEO.
- **React 18 + TypeScript** para tipado estricto y hooks personalizados.
- **Tailwind CSS** con paleta propia (`brand-*`, `accent-*`) y gradientes utilizados en todas las secciones.
- **Resend API** para entregar los leads del formulario (`app/api/send-email/route.ts`).
- **reCAPTCHA Enterprise** con verificación server-side y soporte para service accounts o API Key.
- **Middleware de seguridad** (CSP, HSTS, headers anti-XSS) y rate limiting de formularios (`lib/rate-limit.ts`).

## Secciones del Sitio
- **Navegación fija + Footer** – enlaces ancla, CTA a WhatsApp y datos de contacto desde `config/site.ts`.
- **Hero dinámico** – slider configurable vía `data/hero.json`, badges, CTA dual (servicios / contacto) y overlay responsivo.
- **Servicios** – tarjetas con precios, beneficios y botón de WhatsApp (`components/Services.tsx` + `data/services.json`).
- **Convenios con Empresas** – beneficios, industrias ideales y CTA mixto WhatsApp/email (`data/corporate.json`).
- **Delivery** – características operativas, pasos del proceso y promoción “primer delivery gratis”.
- **Calidad & Detergente Premium** – argumentos de valor, llamada a la acción y promo editable en `data/quality.json`.
- **Testimonios + Métricas** – reseñas y estadísticas del negocio (`data/testimonials.json`, `data/business.json`).
- **Contacto** – formulario con validaciones/rate limit, mapa de Google Maps embebido y avisos legales de reCAPTCHA.

## Datos y Personalización

| Archivo | Uso |
| --- | --- |
| `config/site.ts` | Nombre comercial, descripción SEO, teléfonos, WhatsApp, horarios, redes, metadatos e imágenes OG. |
| `data/hero.json` | Slides del hero (imágenes desktop/mobile, gradientes, copy y CTAs). |
| `data/services.json` | Catálogo, precios, características y copy del bloque “Servicios”. |
| `data/corporate.json` | Texto, beneficios e industrias del módulo de convenios empresariales. |
| `data/quality.json` | Mensajes de calidad, lista de garantías y promo de detergente premium. |
| `data/testimonials.json` & `data/business.json` | Testimonios, métricas y textos utilitarios usados por estadísticas y navegación. |
| `public/img/` | Logos, fotos del hero y recursos de marketing (actualiza rutas si cambias nombres). |

La mayoría de los componentes leen directamente estos JSON/TS, por lo que no es necesario tocar JSX para actualizar copy o precios.

## Instalación y Scripts

```bash
# Requisitos: Node.js >= 18.17.0 y npm
git clone <repo>
cd site-lavoplus-cl
npm install

# Desarrollo
npm run dev

# Build + preview producción
npm run build
npm start
```

Scripts adicionales:
- `npm run lint` – ESLint con configuración Next.js/TypeScript.

## Variables de Entorno

El proyecto incluye `.env.example`. Copia sus valores a `.env.local` antes de ejecutar:

| Variable | Descripción |
| --- | --- |
| `RESEND_API_KEY` | API key de Resend (https://resend.com). |
| `RESEND_FROM_EMAIL` | Remitente verificado en Resend (usa `onboarding@resend.dev` solo para pruebas). |
| `RESEND_TO_EMAIL` | Casilla donde se recibirán los formularios. |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Site Key pública de reCAPTCHA Enterprise (visible en el cliente). |
| `RECAPTCHA_PROJECT_ID` | ID del proyecto de Google Cloud que aloja reCAPTCHA. |
| `RECAPTCHA_API_KEY` | (Opcional) API Key con permisos de reCAPTCHA Enterprise si no usas service account. |
| `RECAPTCHA_SERVICE_ACCOUNT_EMAIL` | (Opcional) Email del service account para generar tokens OAuth server-to-server. |
| `RECAPTCHA_SERVICE_ACCOUNT_KEY` | (Opcional) Clave privada asociada al service account (usa formato multiline con `\n`). |

> Si no configuras reCAPTCHA, el formulario seguirá funcionando pero registrará una advertencia y no estará protegido contra spam.

## Flujo del Formulario de Contacto
1. `components/Contact.tsx` usa `react-google-recaptcha-v3` (`ReCaptchaProvider`) para obtener un token y envía los datos a `/api/send-email`.
2. `app/api/send-email/route.ts` valida/sanitiza con `lib/security.ts`, aplica rate limiting (`lib/rate-limit.ts`) y verifica reCAPTCHA con el Project ID + Site Key configurados.
3. Al pasar las validaciones, se envía un correo formateado mediante **Resend** al destinatario definido y se retorna una respuesta JSON al cliente.

La lista de servicios aceptados en backend se declara en `ALLOWED_SERVICES`; si agregas nuevos IDs en el frontend, recuerda sincronizarlos allí.

## Seguridad y SEO
- `middleware.ts` añade CSP estricta, HSTS (en producción), Referrer Policy, Permissions Policy y cabeceras anti-XSS.
- `lib/seo.ts` centraliza metadatos, Open Graph y JSON-LD (`components/StructuredData.tsx`).
- El mapa de Google y el script de reCAPTCHA se limitan en la CSP (`connect-src`, `frame-src`, etc.).

## Estructura del Proyecto

```
site-lavoplus-cl/
├── app/
│   ├── api/send-email/route.ts    # Endpoint del formulario
│   ├── layout.tsx                 # Layout raíz con proveedores
│   └── page.tsx                   # Página principal
├── components/                    # UI modular (Hero, Services, Delivery, etc.)
├── components/ui/                 # Elementos reutilizables (icons, botones, headers)
├── config/site.ts                 # Datos del negocio y helpers
├── data/                          # JSON de contenido editable
├── hooks/                         # Hooks utilitarios (por ejemplo, visibilidad, sliders)
├── lib/                           # Seguridad, SEO y rate limiting
├── public/                        # Assets estáticos e imágenes
├── middleware.ts                  # Cabeceras de seguridad globales
└── tailwind.config.js / tsconfig.json / eslint.config.mjs
```

## Próximos Pasos Sugeridos
- Cargar fotografías reales de la lavandería en `public/img` y actualizar referencias en `data/hero.json`.
- Ajustar horarios, teléfonos y enlaces a redes sociales reales dentro de `config/site.ts`.
- Configurar Resend + reCAPTCHA Enterprise antes de desplegar en producción.
- Conectar analytics (GA4, Plausible, etc.) si necesitas métricas de tráfico.

---
Desarrollado con ❤️ usando Next.js y TypeScript.
