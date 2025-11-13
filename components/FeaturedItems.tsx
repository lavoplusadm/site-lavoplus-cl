'use client';

import Image from 'next/image';
import pricingData from '@/data/pricing.json';
import { useCarousel } from '@/hooks/useCarousel';
import SectionHeader from '@/components/ui/SectionHeader';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { Icons } from '@/components/ui/Icons';
import type { PricingItem } from '@/types';

export default function FeaturedItems() {
  // Combinar items de ropa-casual y ropa-outdoor
  const ropaCasual = pricingData.categories.find(cat => cat.id === 'ropa-casual');
  const ropaOutdoor = pricingData.categories.find(cat => cat.id === 'ropa-outdoor');

  const items: PricingItem[] = [
    ...(ropaCasual?.items || []),
    ...(ropaOutdoor?.items || [])
  ];

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
    md: 3,
    lg: 4,
    initialVisible: 4
  });

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header usando componente reutilizable */}
        <SectionHeader
          badge="Precios Destacados"
          badgeVariant="teal"
          title="Nuestros Lavados Recurrentes"
          description="Precio por prenda individual"
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
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 w-full md:w-1/3 lg:w-1/4 px-2 md:px-3"
                >
                  <div className="bg-gradient-to-br from-white to-neutral-50 p-4 md:p-8 rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-300 border-2 border-neutral-100 hover:border-accent-teal h-full flex flex-col min-h-[380px] md:min-h-[420px]">
                    {/* Item media */}
                    <div className="mb-4 md:mb-6 flex justify-center">
                      {typeof item.image === 'string' && item.image.startsWith('/') ? (
                        <div className="w-28 h-28 md:w-40 md:h-40 rounded-2xl bg-white shadow-inner relative overflow-hidden border border-neutral-100">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="(max-width: 768px) 112px, 160px"
                            className="object-contain p-2 md:p-3"
                          />
                        </div>
                      ) : (
                        <div className="text-5xl md:text-7xl">{item.image}</div>
                      )}
                    </div>

                    {/* Item Name */}
                    <h3 className="text-base md:text-xl font-bold text-brand-navy mb-2 text-center">
                      {item.name}
                    </h3>

                    {/* Price */}
                    <div className="text-center mb-3 md:mb-4">
                      <span className="text-2xl md:text-3xl font-bold text-accent-orange">
                        ${item.price}
                      </span>
                      {item.note && (
                        <p className="text-xs text-neutral-500 italic mt-1 md:mt-2">
                          {item.note}
                        </p>
                      )}
                    </div>

                    {/* WhatsApp Button usando componente reutilizable */}
                    <div className="mt-auto w-full">
                      <WhatsAppButton
                        message={`Hola, quiero cotizar el lavado de ${item.name}`}
                        label="Cotizar"
                        size="sm"
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
                    ? 'w-2 bg-accent-teal'
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
