// Tipos compartidos para toda la aplicación

/**
 * Item de pricing (usado en FeaturedItems y PricingCarousel)
 */
export interface PricingItem {
  id: string;
  name: string;
  price: string;
  priceX2?: string;
  image?: string;
  note?: string;
}

/**
 * Categoría de pricing
 */
export interface PricingCategory {
  id: string;
  name: string;
  items: PricingItem[];
}

/**
 * Datos de pricing completos
 */
export interface PricingData {
  categories: PricingCategory[];
}

/**
 * Item con icono (servicios, beneficios, etc)
 */
export interface ItemWithIcon<T = any> {
  id: string;
  icon?: React.ReactNode;
  [key: string]: any;
}

/**
 * Configuración de carrusel
 */
export interface CarouselConfig {
  mobile?: number;
  md?: number;
  lg?: number;
  initialVisible?: number;
}

/**
 * Props comunes para secciones
 */
export interface SectionProps {
  className?: string;
  children: React.ReactNode;
}
