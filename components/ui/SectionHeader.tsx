import React from 'react';

export interface SectionHeaderProps {
  /** Texto del badge opcional */
  badge?: string;
  /** Variante de color del badge */
  badgeVariant?: 'blue' | 'teal' | 'purple' | 'yellow';
  /** Título principal */
  title: string;
  /** Descripción opcional */
  description?: string;
  /** Alineación del contenido */
  align?: 'left' | 'center';
  /** Clase adicional para el contenedor */
  className?: string;
}

/**
 * Componente reutilizable para encabezados de sección
 * Usado en Services, Delivery, CorporatePartnerships, Quality, Contact, etc.
 */
export default function SectionHeader({
  badge,
  badgeVariant = 'blue',
  title,
  description,
  align = 'center',
  className = '',
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left';

  const badgeColors = {
    blue: 'bg-blue-100 text-blue-700',
    teal: 'bg-accent-teal text-white',
    purple: 'bg-accent-purple text-white',
    yellow: 'bg-accent-yellow text-brand-navy',
  };

  return (
    <div className={`${alignClass} mb-12 md:mb-20 ${className}`}>
      {badge && (
        <span
          className={`inline-block px-4 py-2 rounded-full ${badgeColors[badgeVariant]} font-bold text-sm mb-4 shadow-md`}
        >
          {badge}
        </span>
      )}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
        {title}
      </h2>
      {description && (
        <p className={`text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed ${align === 'center' ? 'max-w-3xl mx-auto' : 'max-w-3xl'}`}>
          {description}
        </p>
      )}
    </div>
  );
}
