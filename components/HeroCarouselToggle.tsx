'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import heroData from '@/data/hero.json';

const slides = heroData.slides ?? [];

/**
 * Carousel toggle component - loaded dynamically after initial render
 * Shows additional slides beyond the first one
 */
export default function HeroCarouselToggle() {
  const [currentSlide, setCurrentSlide] = useState(1); // Start at slide 1 (slide 0 is shown by HeroImage)
  const [isPaused, setIsPaused] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // Only show slides after the first one
  const additionalSlides = slides.slice(1);

  useEffect(() => {
    if (!isActive || isPaused || additionalSlides.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = prev + 1;
        return next >= slides.length ? 1 : next;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [isActive, isPaused, additionalSlides.length]);

  if (additionalSlides.length === 0) return null;

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="flex items-center gap-4">
      {/* Dots for all slides */}
      <div className="flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsActive(true);
              goToSlide(index);
            }}
            className={`transition-all duration-300 rounded-full ${
              (isActive ? currentSlide : 0) === index
                ? 'w-10 h-3 bg-white shadow-lg'
                : 'w-3 h-3 bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Play/Pause button */}
      {isActive && (
        <button
          onClick={() => setIsPaused((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white transition-all hover:bg-white/20"
          aria-label={isPaused ? 'Reanudar' : 'Pausar'}
        >
          {isPaused ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          )}
        </button>
      )}

      {/* Slide images overlay - only show when carousel is active and not on slide 0 */}
      {isActive && currentSlide > 0 && (
        <div className="fixed inset-0 -z-20 transition-opacity duration-1000">
          {additionalSlides.map((slide, index) => {
            const slideIndex = index + 1;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  slideIndex === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  loading="lazy"
                  className="object-cover object-center"
                  sizes="100vw"
                  quality={75}
                />
                <div className="absolute inset-0 pointer-events-none">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${
                      slide.gradient ?? 'from-blue-900/85 via-blue-800/75 to-blue-900/90'
                    } mix-blend-multiply opacity-90`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/35 to-transparent" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
