import { useState, useEffect, useCallback } from 'react';

export interface CarouselConfig {
  mobile?: number;
  md?: number;
  lg?: number;
  initialVisible?: number;
}

export interface UseCarouselReturn {
  currentIndex: number;
  visibleItems: number;
  totalPages: number;
  canGoNext: boolean;
  canGoPrev: boolean;
  nextSlide: () => void;
  prevSlide: () => void;
  goToSlide: (index: number) => void;
}

/**
 * Hook reutilizable para implementar carruseles responsivos
 * @param itemsCount - Número total de items en el carrusel
 * @param config - Configuración de items visibles por breakpoint
 */
export function useCarousel(
  itemsCount: number,
  config: CarouselConfig = {}
): UseCarouselReturn {
  const {
    mobile = 1,
    md = 3,
    lg = 4,
    initialVisible = 4
  } = config;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(initialVisible);

  const getVisibleItems = useCallback(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return lg;
      if (window.innerWidth >= 768) return md;
      return mobile;
    }
    return initialVisible;
  }, [lg, md, mobile, initialVisible]);

  useEffect(() => {
    const handleResize = () => {
      const newVisibleItems = getVisibleItems();
      setVisibleItems(newVisibleItems);

      // Ajustar índice si está fuera de rango
      const maxIndex = Math.max(0, itemsCount - newVisibleItems);
      if (currentIndex > maxIndex) {
        setCurrentIndex(maxIndex);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentIndex, itemsCount, getVisibleItems]);

  const totalPages = Math.max(1, Math.ceil(itemsCount / visibleItems));
  const canGoNext = currentIndex < itemsCount - visibleItems;
  const canGoPrev = currentIndex > 0;

  const nextSlide = useCallback(() => {
    if (canGoNext) {
      setCurrentIndex(prev => Math.min(prev + 1, itemsCount - visibleItems));
    }
  }, [canGoNext, itemsCount, visibleItems]);

  const prevSlide = useCallback(() => {
    if (canGoPrev) {
      setCurrentIndex(prev => Math.max(prev - 1, 0));
    }
  }, [canGoPrev]);

  const goToSlide = useCallback((index: number) => {
    const maxIndex = Math.max(0, itemsCount - visibleItems);
    setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
  }, [itemsCount, visibleItems]);

  return {
    currentIndex,
    visibleItems,
    totalPages,
    canGoNext,
    canGoPrev,
    nextSlide,
    prevSlide,
    goToSlide,
  };
}
