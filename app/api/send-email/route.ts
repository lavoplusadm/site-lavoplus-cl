import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { validateContactForm } from '@/lib/security';
import { rateLimit, rateLimitConfigs } from '@/lib/rate-limit';
import { createSign } from 'crypto';

const resend = new Resend(process.env.RESEND_API_KEY);

// Servicios permitidos (debe coincidir con el frontend)
const ALLOWED_SERVICES = [
  'lavado-kilo',
  'lavado-seco',
  'planchado',
  'ropa-cama',
  'express',
  'otro'
];

// Configurar rate limiting
const rateLimiter = rateLimit(rateLimitConfigs.strict);

const GOOGLE_OAUTH_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_SCOPE = 'https://www.googleapis.com/auth/cloud-platform';

type CachedToken = {
  token: string;
  expiresAt: number;
};

let cachedAccessToken: CachedToken | null = null;

function buildJwtAssertion(serviceAccountEmail: string, privateKey: string) {
  const header = {
    alg: 'RS256',
    typ: 'JWT',
  };

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: serviceAccountEmail,
    scope: GOOGLE_SCOPE,
    aud: GOOGLE_OAUTH_TOKEN_URL,
    iat: now,
    exp: now + 3600, // 1 hora
  };

  const encode = (obj: unknown) =>
    Buffer.from(JSON.stringify(obj)).toString('base64url');

  const unsignedToken = `${encode(header)}.${encode(payload)}`;
  const signer = createSign('RSA-SHA256');
  signer.update(unsignedToken);
  signer.end();

  const sanitizedKey = privateKey.replace(/\\n/g, '\n');
  const signature = signer.sign(sanitizedKey, 'base64url');

  return `${unsignedToken}.${signature}`;
}

async function getServiceAccountAccessToken() {
  const serviceAccountEmail = process.env.RECAPTCHA_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.RECAPTCHA_SERVICE_ACCOUNT_KEY;

  if (!serviceAccountEmail || !privateKey) {
    return null;
  }

  if (cachedAccessToken && cachedAccessToken.expiresAt > Date.now()) {
    return cachedAccessToken.token;
  }

  const assertion = buildJwtAssertion(serviceAccountEmail, privateKey);
  const body = new URLSearchParams({
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    assertion,
  });

  const response = await fetch(GOOGLE_OAUTH_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error('Failed to obtain Google access token', errorBody);
    return null;
  }

  const data = await response.json();
  const expiresInMs = (data.expires_in ?? 3600) * 1000;
  cachedAccessToken = {
    token: data.access_token,
    // Refrescar un minuto antes de que expire
    expiresAt: Date.now() + expiresInMs - 60 * 1000,
  };

  return data.access_token as string;
}

// Función para verificar reCAPTCHA Enterprise
async function verifyRecaptchaEnterprise(token: string, action: string) {
  const projectId = process.env.RECAPTCHA_PROJECT_ID;
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!projectId || !siteKey) {
    console.warn('reCAPTCHA Enterprise not configured, skipping verification');
    return { success: true, score: 1.0, reason: 'not_configured' };
  }

  if (!token) {
    return { success: false, score: 0, reason: 'no_token' };
  }

  try {
    const accessToken = await getServiceAccountAccessToken();
    const endpoint = `https://recaptchaenterprise.googleapis.com/v1/projects/${projectId}/assessments`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken
          ? { Authorization: `Bearer ${accessToken}` }
          : { 'x-goog-api-key': process.env.RECAPTCHA_API_KEY ?? '' }),
      },
      body: JSON.stringify({
        event: {
          token,
          expectedAction: action,
          siteKey,
        },
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('reCAPTCHA verification failed:', result);
      return { success: false, score: 0, reason: 'api_error' };
    }

    // Verificar que el token es válido y la acción coincide
    const isValid = result.tokenProperties?.valid === true;
    const actionMatches = result.tokenProperties?.action === action;
    const score = result.riskAnalysis?.score || 0;

    return {
      success: isValid && actionMatches && score >= 0.5,
      score,
      reason: result.riskAnalysis?.reasons || [],
    };
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    return { success: false, score: 0, reason: 'exception' };
  }
}

export async function POST(request: NextRequest) {
  try {
    // Aplicar rate limiting
    const rateLimitResult = await rateLimiter(request);
    if (rateLimitResult) {
      return rateLimitResult;
    }

    // Parsear body con límite de tamaño
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: 'Datos del formulario no válidos' },
        { status: 400 }
      );
    }

    // Validar y sanitizar datos del formulario
    const validation = validateContactForm(body, ALLOWED_SERVICES);

    if (!validation.valid) {
      return NextResponse.json(
        {
          error: 'Error de validación',
          errors: validation.errors
        },
        { status: 400 }
      );
    }

    const { name, email, phone, service, message } = validation.data!;
    const { recaptchaToken } = body;

    // Verificar reCAPTCHA Enterprise
    const recaptchaResult = await verifyRecaptchaEnterprise(recaptchaToken, 'contact_form');

    if (!recaptchaResult.success) {
      console.error('reCAPTCHA verification failed:', recaptchaResult);
      return NextResponse.json(
        { error: 'Verificación de seguridad fallida. Por favor, intenta de nuevo.' },
        { status: 403 }
      );
    }

    console.log('reCAPTCHA verification successful. Score:', recaptchaResult.score);

    // Mapeo de servicios para mostrar nombres más legibles
    const serviceLabels: Record<string, string> = {
      'lavado-kilo': 'Lavado por Kilo',
      'lavado-seco': 'Lavado en Seco',
      'planchado': 'Planchado',
      'ropa-cama': 'Lavado de Ropa de Cama',
      'express': 'Servicio Express',
      'otro': 'Otro servicio'
    };

    const serviceName = serviceLabels[service] || service;

    // Enviar email al negocio
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.RESEND_TO_EMAIL || 'info@lavoplus.cl',
      subject: `Nuevo contacto de ${name} - ${serviceName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Nuevo Contacto</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
            <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; background-color: #f3f4f6;">
              <tr>
                <td style="padding: 40px 20px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <!-- Header -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 32px 24px; text-align: center;">
                        <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                          Nuevo Contacto
                        </h1>
                        <p style="margin: 8px 0 0; color: #e0e7ff; font-size: 16px;">
                          Lavandería Lavoplus
                        </p>
                      </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                      <td style="padding: 32px 24px;">
                        <p style="margin: 0 0 24px; color: #374151; font-size: 16px; line-height: 1.5;">
                          Has recibido un nuevo mensaje de contacto desde tu sitio web:
                        </p>

                        <!-- Contact Details -->
                        <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">
                          <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                              <strong style="color: #1f2937; font-size: 14px;">Nombre:</strong>
                            </td>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
                              <span style="color: #374151; font-size: 14px;">${name}</span>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                              <strong style="color: #1f2937; font-size: 14px;">Email:</strong>
                            </td>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
                              <a href="mailto:${email}" style="color: #2563eb; font-size: 14px; text-decoration: none;">${email}</a>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                              <strong style="color: #1f2937; font-size: 14px;">Teléfono:</strong>
                            </td>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
                              <a href="tel:${phone}" style="color: #2563eb; font-size: 14px; text-decoration: none;">${phone}</a>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                              <strong style="color: #1f2937; font-size: 14px;">Servicio:</strong>
                            </td>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
                              <span style="display: inline-block; background-color: #dbeafe; color: #1e40af; padding: 4px 12px; border-radius: 6px; font-size: 13px; font-weight: 600;">${serviceName}</span>
                            </td>
                          </tr>
                        </table>

                        ${message ? `
                        <div style="margin-top: 24px;">
                          <strong style="color: #1f2937; font-size: 14px; display: block; margin-bottom: 8px;">Mensaje:</strong>
                          <div style="background-color: #f9fafb; border-left: 4px solid #2563eb; padding: 16px; border-radius: 6px;">
                            <p style="margin: 0; color: #374151; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                          </div>
                        </div>
                        ` : ''}

                        <!-- CTA Button -->
                        <div style="margin-top: 32px; text-align: center;">
                          <a href="mailto:${email}" style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 15px;">
                            Responder por Email
                          </a>
                        </div>
                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="background-color: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb;">
                        <p style="margin: 0; color: #6b7280; font-size: 13px; line-height: 1.5;">
                          Este correo fue enviado automáticamente desde el formulario de contacto de <strong>Lavandería Lavoplus</strong>
                        </p>
                        <p style="margin: 8px 0 0; color: #9ca3af; font-size: 12px;">
                          Los Ángeles, Región del Bío Bío, Chile
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Error sending email:', error);
      return NextResponse.json(
        { error: 'Error al enviar el correo' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Correo enviado exitosamente',
      data
    });

  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}
