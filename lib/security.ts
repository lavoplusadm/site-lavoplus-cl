import validator from 'validator';

/**
 * Utilidades de seguridad para validación y sanitización de datos
 */

// Configuración de validación
const VALIDATION_CONFIG = {
  name: {
    minLength: 2,
    maxLength: 100,
  },
  email: {
    maxLength: 254, // RFC 5321
  },
  phone: {
    minLength: 8,
    maxLength: 20,
  },
  message: {
    maxLength: 2000,
  },
};

/**
 * Sanitiza una cadena de texto eliminando HTML y caracteres peligrosos
 */
export function sanitizeString(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }

  return validator.escape(
    input
      .trim()
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Eliminar scripts
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '') // Eliminar iframes
      .replace(/javascript:/gi, '') // Eliminar javascript: URLs
      .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '') // Eliminar event handlers
  );
}

/**
 * Valida y sanitiza un nombre
 */
export function validateName(name: unknown): { valid: boolean; sanitized: string; error?: string } {
  if (typeof name !== 'string') {
    return { valid: false, sanitized: '', error: 'El nombre debe ser una cadena de texto' };
  }

  const sanitized = sanitizeString(name);

  if (sanitized.length < VALIDATION_CONFIG.name.minLength) {
    return {
      valid: false,
      sanitized,
      error: `El nombre debe tener al menos ${VALIDATION_CONFIG.name.minLength} caracteres`,
    };
  }

  if (sanitized.length > VALIDATION_CONFIG.name.maxLength) {
    return {
      valid: false,
      sanitized,
      error: `El nombre no puede exceder ${VALIDATION_CONFIG.name.maxLength} caracteres`,
    };
  }

  // Validar que contenga solo letras, espacios y caracteres válidos
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]+$/.test(sanitized)) {
    return {
      valid: false,
      sanitized,
      error: 'El nombre contiene caracteres no válidos',
    };
  }

  return { valid: true, sanitized };
}

/**
 * Valida y sanitiza un email
 */
export function validateEmail(email: unknown): { valid: boolean; sanitized: string; error?: string } {
  if (typeof email !== 'string') {
    return { valid: false, sanitized: '', error: 'El email debe ser una cadena de texto' };
  }

  const sanitized = validator.normalizeEmail(email.trim().toLowerCase()) || email.trim().toLowerCase();

  if (!validator.isEmail(sanitized)) {
    return {
      valid: false,
      sanitized,
      error: 'El email no es válido',
    };
  }

  if (sanitized.length > VALIDATION_CONFIG.email.maxLength) {
    return {
      valid: false,
      sanitized,
      error: `El email no puede exceder ${VALIDATION_CONFIG.email.maxLength} caracteres`,
    };
  }

  // Verificar dominio sospechoso (opcional)
  const suspiciousDomains = ['tempmail.com', 'throwaway.email', '10minutemail.com'];
  const domain = sanitized.split('@')[1];
  if (domain && suspiciousDomains.includes(domain)) {
    return {
      valid: false,
      sanitized,
      error: 'Por favor, usa un email válido',
    };
  }

  return { valid: true, sanitized };
}

/**
 * Valida y sanitiza un teléfono
 */
export function validatePhone(phone: unknown): { valid: boolean; sanitized: string; error?: string } {
  if (typeof phone !== 'string') {
    return { valid: false, sanitized: '', error: 'El teléfono debe ser una cadena de texto' };
  }

  // Eliminar caracteres no numéricos excepto + al inicio
  const sanitized = phone.trim().replace(/[^\d+]/g, '');

  if (sanitized.length < VALIDATION_CONFIG.phone.minLength) {
    return {
      valid: false,
      sanitized,
      error: `El teléfono debe tener al menos ${VALIDATION_CONFIG.phone.minLength} dígitos`,
    };
  }

  if (sanitized.length > VALIDATION_CONFIG.phone.maxLength) {
    return {
      valid: false,
      sanitized,
      error: `El teléfono no puede exceder ${VALIDATION_CONFIG.phone.maxLength} caracteres`,
    };
  }

  // Validar formato básico
  if (!/^\+?[\d\s-()]+$/.test(phone.trim())) {
    return {
      valid: false,
      sanitized,
      error: 'El teléfono contiene caracteres no válidos',
    };
  }

  return { valid: true, sanitized };
}

/**
 * Valida un servicio contra una lista permitida
 */
export function validateService(service: unknown, allowedServices: string[]): { valid: boolean; sanitized: string; error?: string } {
  if (typeof service !== 'string') {
    return { valid: false, sanitized: '', error: 'El servicio debe ser una cadena de texto' };
  }

  const sanitized = service.trim().toLowerCase();

  if (!allowedServices.includes(sanitized)) {
    return {
      valid: false,
      sanitized,
      error: 'El servicio seleccionado no es válido',
    };
  }

  return { valid: true, sanitized };
}

/**
 * Valida y sanitiza un mensaje
 */
export function validateMessage(message: unknown): { valid: boolean; sanitized: string; error?: string } {
  if (typeof message !== 'string') {
    // El mensaje es opcional, pero si se proporciona debe ser string
    if (message === undefined || message === null) {
      return { valid: true, sanitized: '' };
    }
    return { valid: false, sanitized: '', error: 'El mensaje debe ser una cadena de texto' };
  }

  const sanitized = sanitizeString(message);

  if (sanitized.length > VALIDATION_CONFIG.message.maxLength) {
    return {
      valid: false,
      sanitized,
      error: `El mensaje no puede exceder ${VALIDATION_CONFIG.message.maxLength} caracteres`,
    };
  }

  return { valid: true, sanitized };
}

/**
 * Detecta patrones de spam en el contenido
 */
export function detectSpamPatterns(content: string): boolean {
  const spamPatterns = [
    /\b(viagra|cialis|casino|lottery|winner|congratulations)\b/i,
    /\b(click here|buy now|limited time|act now)\b/i,
    /(http|https):\/\/[^\s]{50,}/gi, // URLs muy largas
    /(.)\1{10,}/i, // Caracteres repetidos
    /[A-Z]{20,}/,  // Muchas mayúsculas seguidas
  ];

  return spamPatterns.some(pattern => pattern.test(content));
}

/**
 * Validación completa del formulario de contacto
 */
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message?: string;
}

export interface ValidationResult {
  valid: boolean;
  data?: ContactFormData;
  errors: Record<string, string>;
}

export function validateContactForm(
  formData: unknown,
  allowedServices: string[]
): ValidationResult {
  const errors: Record<string, string> = {};

  if (!formData || typeof formData !== 'object') {
    return {
      valid: false,
      errors: { form: 'Datos del formulario no válidos' },
    };
  }

  const data = formData as Record<string, unknown>;

  // Validar nombre
  const nameResult = validateName(data.name);
  if (!nameResult.valid) {
    errors.name = nameResult.error || 'Nombre no válido';
  }

  // Validar email
  const emailResult = validateEmail(data.email);
  if (!emailResult.valid) {
    errors.email = emailResult.error || 'Email no válido';
  }

  // Validar teléfono
  const phoneResult = validatePhone(data.phone);
  if (!phoneResult.valid) {
    errors.phone = phoneResult.error || 'Teléfono no válido';
  }

  // Validar servicio
  const serviceResult = validateService(data.service, allowedServices);
  if (!serviceResult.valid) {
    errors.service = serviceResult.error || 'Servicio no válido';
  }

  // Validar mensaje (opcional)
  const messageResult = validateMessage(data.message);
  if (!messageResult.valid) {
    errors.message = messageResult.error || 'Mensaje no válido';
  }

  // Detectar spam si hay mensaje
  if (messageResult.valid && messageResult.sanitized) {
    const isSpam = detectSpamPatterns(messageResult.sanitized);
    if (isSpam) {
      errors.message = 'El mensaje contiene contenido no permitido';
    }
  }

  // Detectar spam en el nombre
  if (nameResult.valid && detectSpamPatterns(nameResult.sanitized)) {
    errors.name = 'El nombre contiene contenido no permitido';
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    data: {
      name: nameResult.sanitized,
      email: emailResult.sanitized,
      phone: phoneResult.sanitized,
      service: serviceResult.sanitized,
      message: messageResult.sanitized,
    },
    errors: {},
  };
}
