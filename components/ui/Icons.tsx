import React from 'react';

export interface IconProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
};

/**
 * Sistema centralizado de iconos para toda la aplicación
 * Uso: <Icons.WashingMachine className="text-blue-600" />
 */
export const Icons = {
  // Servicios
  WashingMachine: ({ className = '', size = 'lg' }: IconProps) => (
    <svg className={`${sizeClasses[size]} ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path d="M 4 4 L 20 4 L 20 20 L 4 20 Z" strokeLinejoin="round" />
      <circle cx="12" cy="13" r="5" />
      <path d="M 9 13 Q 12 10, 15 13" fill="none" strokeLinecap="round" />
    </svg>
  ),

  DryCleaning: ({ className = '', size = 'lg' }: IconProps) => (
    <svg className={`${sizeClasses[size]} ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <circle cx="12" cy="12" r="8" />
      <text x="12" y="16" fontSize="10" fill="currentColor" textAnchor="middle" fontWeight="bold" fontFamily="Arial">P</text>
    </svg>
  ),

  Iron: ({ className = '', size = 'lg' }: IconProps) => (
    <svg className={`${sizeClasses[size]} ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path d="M 6 8 L 18 8 L 20 12 L 20 18 C 20 19 19 20 18 20 L 6 20 C 5 20 4 19 4 18 L 4 12 Z" strokeLinejoin="round" fill="currentColor" fillOpacity="0.1" />
      <path d="M 8 4 L 16 4 L 18 8 L 6 8 Z" strokeLinejoin="round" />
      <circle cx="10" cy="14" r="0.5" fill="currentColor" />
      <circle cx="12" cy="14" r="0.5" fill="currentColor" />
      <circle cx="14" cy="14" r="0.5" fill="currentColor" />
      <circle cx="10" cy="16" r="0.5" fill="currentColor" />
      <circle cx="12" cy="16" r="0.5" fill="currentColor" />
      <circle cx="14" cy="16" r="0.5" fill="currentColor" />
    </svg>
  ),

  Bedding: ({ className = '', size = 'lg' }: IconProps) => (
    <svg className={`${sizeClasses[size]} ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <rect x="6" y="6" width="12" height="12" rx="1" />
      <path d="M 9 9 L 9 15 M 12 9 L 12 15 M 15 9 L 15 15" strokeLinecap="round" />
      <path d="M 9 12 L 15 12" strokeLinecap="round" />
    </svg>
  ),

  Express: ({ className = '', size = 'lg' }: IconProps) => (
    <svg className={`${sizeClasses[size]} ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <circle cx="12" cy="12" r="8" />
      <path d="M 12 7 L 12 12 L 16 14" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 17 5 L 19 3 M 19 7 L 21 5" strokeLinecap="round" />
    </svg>
  ),

  // Beneficios corporativos
  Money: ({ className = '', size = 'md' }: IconProps) => (
    <svg className={`${sizeClasses[size]} ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),

  Invoice: ({ className = '', size = 'md' }: IconProps) => (
    <svg className={`${sizeClasses[size]} ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),

  Calendar: ({ className = '', size = 'md' }: IconProps) => (
    <svg className={`${sizeClasses[size]} ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),

  User: ({ className = '', size = 'md' }: IconProps) => (
    <svg className={`${sizeClasses[size]} ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),

  Uniform: ({ className = '', size = 'md' }: IconProps) => (
    <svg className={`${sizeClasses[size]} ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),

  Chart: ({ className = '', size = 'md' }: IconProps) => (
    <svg className={`${sizeClasses[size]} ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),

  // Iconos de calidad
  Shield: ({ className = '', size = 'md' }: IconProps) => (
    <svg className={`${sizeClasses[size]} ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),

  Leaf: ({ className = '', size = 'md' }: IconProps) => (
    <svg className={`${sizeClasses[size]} ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  ),

  Award: ({ className = '', size = 'md' }: IconProps) => (
    <svg className={`${sizeClasses[size]} ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  ),

  // WhatsApp
  WhatsApp: ({ className = '', size = 'md' }: IconProps) => (
    <svg className={`${sizeClasses[size]} ${className}`} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  ),

  // Iconos de precios
  Check: ({ className = '', size = 'md' }: IconProps) => (
    <svg className={`${sizeClasses[size]} ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),

  Info: ({ className = '', size = 'md' }: IconProps) => (
    <svg className={`${sizeClasses[size]} ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),

  // Navegación
  ChevronLeft: ({ className = '', size = 'md' }: IconProps) => (
    <svg className={`${sizeClasses[size]} ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  ),

  ChevronRight: ({ className = '', size = 'md' }: IconProps) => (
    <svg className={`${sizeClasses[size]} ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  ),
};

/**
 * Mapa de iconos por ID para servicios
 */
export const serviceIconMap: Record<string, keyof typeof Icons> = {
  'lavado-kilo': 'WashingMachine',
  'lavado-seco': 'DryCleaning',
  'planchado': 'Iron',
  'lavado-ropa-cama': 'Bedding',
  'servicio-express': 'Express',
};

/**
 * Mapa de iconos por ID para beneficios corporativos
 */
export const benefitIconMap: Record<string, keyof typeof Icons> = {
  'tarifas': 'Money',
  'facturacion': 'Invoice',
  'recogida': 'Calendar',
  'servicio-dedicado': 'User',
  'uniformes': 'Uniform',
  'reportes': 'Chart',
};

/**
 * Mapa de iconos por ID para calidad
 */
export const qualityIconMap: Record<string, keyof typeof Icons> = {
  'productos-premium': 'Award',
  'procesos-certificados': 'Shield',
  'cuidado-ambiental': 'Leaf',
};
