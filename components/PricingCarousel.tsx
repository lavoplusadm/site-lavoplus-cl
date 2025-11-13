'use client';

import { useCarousel } from '@/hooks/useCarousel';
import SectionHeader from '@/components/ui/SectionHeader';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { Icons } from '@/components/ui/Icons';
import type { PricingItem } from '@/types';

interface PricingCarouselProps {
  title: string;
  subtitle?: string;
  items: PricingItem[];
}

export default function PricingCarousel({ title, subtitle, items }: PricingCarouselProps) {
  // Usar el hook de carousel reutilizable
  const {
    currentIndex,
    visibleItems,
    canGoNext,
    canGoPrev,
    nextSlide,
    prevSlide,
    goToSlide
  } = useCarousel(items.length, {
    mobile: 1,
    md: 2,
    lg: 3,
    initialVisible: 3
  });

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header usando componente reutilizable */}
        <SectionHeader
          badge={subtitle}
          badgeVariant="blue"
          title={title}
        />

        {/* Carousel Container */}
        <div className="relative">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!canGoPrev}
            aria-label="Anterior"
          >
            <Icons.ChevronLeft className="text-brand-navy" />
          </button>

          {/* Items Grid */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
              }}
            >
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-3"
                >
                  <div className="bg-gradient-to-br from-white to-neutral-50 p-6 rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-300 border-2 border-neutral-100 hover:border-blue-600 h-full flex flex-col">
                    {/* Item Name */}
                    <h3 className="text-lg font-bold text-brand-navy mb-4 text-center min-h-[3rem] flex items-center justify-center">
                      {item.name}
                    </h3>

                    {/* Prices */}
                    <div className="flex-grow">
                      <div className="mb-3">
                        <p className="text-sm text-gray-600 mb-1">Precio Normal</p>
                        <p className="text-3xl font-bold text-blue-600">
                          ${item.price}
                        </p>
                      </div>

                      {item.priceX2 && (
                        <div className="mb-3">
                          <p className="text-sm text-gray-600 mb-1">Lavado x2</p>
                          <p className="text-2xl font-bold text-green-600">
                            ${item.priceX2}
                          </p>
                        </div>
                      )}

                      {item.note && (
                        <p className="text-xs text-neutral-500 italic mt-2">
                          {item.note}
                        </p>
                      )}
                    </div>

                    {/* WhatsApp Button usando componente reutilizable */}
                    <div className="mt-4 w-full">
                      <WhatsAppButton
                        message={`Hola, quiero cotizar el lavado de ${item.name}`}
                        label="Cotizar"
                        size="md"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!canGoNext}
            aria-label="Siguiente"
          >
            <Icons.ChevronRight className="text-brand-navy" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {items.map((_, index) => {
            const isActive = index >= currentIndex && index < currentIndex + visibleItems;
            return (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-2 bg-blue-600'
                    : 'w-2 bg-neutral-300 hover:bg-neutral-400'
                }`}
                aria-label={`Ir al item ${index + 1}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
