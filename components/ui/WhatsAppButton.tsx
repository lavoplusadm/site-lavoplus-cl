import React from 'react';
import { Icons } from './Icons';

export interface WhatsAppButtonProps {
  /** Mensaje a enviar por WhatsApp */
  message: string;
  /** Etiqueta del botón */
  label?: string;
  /** Tamaño del botón */
  size?: 'sm' | 'md' | 'lg';
  /** Variante visual del botón */
  variant?: 'primary' | 'compact';
  /** Clase adicional */
  className?: string;
}

/**
 * Obtiene el link de WhatsApp con el mensaje
 */
function getWhatsAppLink(message: string): string {
  const phoneNumber = '56987654321'; // Número de teléfono de la empresa
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

/**
 * Componente reutilizable para botones de WhatsApp
 * Usado en Services, CorporatePartnerships, Delivery, FeaturedItems, PricingCarousel
 */
export default function WhatsAppButton({
  message,
  label = 'Consultar por WhatsApp',
  size = 'md',
  variant = 'primary',
  className = '',
}: WhatsAppButtonProps) {
  const sizeClasses = {
    sm: 'py-2 px-3 text-xs gap-1',
    md: 'py-2.5 px-4 text-sm gap-2',
    lg: 'py-3 px-6 text-base gap-2',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const baseClasses = 'flex items-center justify-center bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300';

  return (
    <a
      href={getWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClasses} ${sizeClasses[size]} ${className}`}
      aria-label={label}
    >
      <Icons.WhatsApp className={iconSizes[size]} size="sm" />
      {variant === 'primary' && <span>{label}</span>}
    </a>
  );
}
