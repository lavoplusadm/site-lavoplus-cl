'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import heroData from '@/data/hero.json';

type Slide = {
  id: string;
  image: string;
  imageMobile?: string;
  alt: string;
  badge: string;
  title: {
    line1: string;
    line2: string;
  };
  description: string;
  gradient: string;
  highlightColor?: string;
};

const slides = (heroData.slides ?? []) as Slide[];
const GRADIENT_SAFELIST = [
  'from-blue-900/85 via-blue-800/75 to-blue-900/90',
  'from-emerald-900/85 via-emerald-800/75 to-emerald-900/90',
  'from-slate-900/85 via-slate-800/70 to-slate-900/90',
] as const;

type HeroCTA = {
  primary: {
    text: string;
    link: string;
  };
  secondary: {
    text: string;
    link: string;
  };
};

const defaultCTA: HeroCTA = {
  primary: {
    text: 'Ver Servicios',
    link: '#servicios',
  },
  secondary: {
    text: 'Contáctanos',
    link: '#contacto',
  },
};

const heroCTA: HeroCTA = (heroData.cta as HeroCTA | undefined) ?? defaultCTA;

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [stableHeight, setStableHeight] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const measurementRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hasMultipleSlides = slides.length > 1;
  const activeSlide = slides[currentSlide] ?? slides[0];

  const measureHeights = useCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.requestAnimationFrame(() => {
      const heights = measurementRefs.current.map((ref) => ref?.offsetHeight ?? 0);
      const maxHeight = heights.length ? Math.max(...heights) : 0;
      setStableHeight(maxHeight > 0 ? maxHeight : null);
    });
  }, [slides.length]);

  useEffect(() => {
    if (!hasMultipleSlides || isPaused) {
      return;
    }

    // Slide 0: 5 segundos, Slide 1 (delivery): 10 segundos, Slide 2: 5 segundos
    const duration = currentSlide === 1 ? 10000 : 5000;

    const timer = window.setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, duration);

    return () => window.clearTimeout(timer);
  }, [hasMultipleSlides, currentSlide, isPaused]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const updateMatch = (event: MediaQueryList | MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    updateMatch(mediaQuery);

    const listener = (event: MediaQueryListEvent) => updateMatch(event);

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }

    mediaQuery.addListener(listener);
    return () => mediaQuery.removeListener(listener);
  }, []);

  useLayoutEffect(() => {
    measureHeights();
  }, [measureHeights]);

  useEffect(() => {
    measureHeights();
  }, [currentSlide, measureHeights]);

  useEffect(() => {
    const handleResize = () => {
      measureHeights();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [measureHeights]);

  if (!activeSlide) {
    return null;
  }

  measurementRefs.current = measurementRefs.current.slice(0, slides.length);

  const goToSlide = (index: number) => {
    if (!hasMultipleSlides) return;
    if (index < 0 || index >= slides.length) return;
    setCurrentSlide(index);
  };
  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  return (
    <section
      id="inicio"
      className="relative mt-24 md:mt-28 overflow-hidden min-h-[600px] sm:min-h-[650px] md:min-h-[700px]"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 -z-10">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-[1200ms] ease-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0'
            }`}
          >
            <Image
              src={isMobile && slide.imageMobile ? slide.imageMobile : slide.image}
              alt={slide.alt}
              fill
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              className="object-cover object-center"
              sizes="100vw"
              quality={90}
            />
            <div className="absolute inset-0 pointer-events-none">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${
                  slide.gradient ?? GRADIENT_SAFELIST[0]
                } mix-blend-multiply opacity-90`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/35 to-transparent" />
              <div className="absolute inset-0 bg-white/15 mix-blend-screen" />
            </div>
          </div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        {/* Dots + Botón de Pausa - Arriba del contenido */}
        {hasMultipleSlides && (
          <div className="mb-8 text-white/80">
            <div className="flex items-center justify-center md:justify-start gap-4 max-w-4xl lg:max-w-5xl mx-auto md:mx-0">
              {/* Dots indicadores */}
              <div className="flex gap-2 md:gap-3">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentSlide
                        ? 'w-10 h-3 md:w-14 md:h-3 bg-white shadow-lg'
                        : 'w-3 h-3 bg-white/50 hover:bg-white/70 active:bg-white/80'
                    }`}
                    aria-label={`Ir al slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Botón de Pausa/Play */}
              <button
                onClick={togglePause}
                className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white transition-all duration-300 hover:bg-white/20 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-white/30"
                aria-label={isPaused ? 'Reanudar' : 'Pausar'}
              >
                {isPaused ? (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Contenido del slide */}
        <div
          className="text-white text-center md:text-left flex flex-col gap-8 max-w-4xl lg:max-w-5xl mx-auto md:mx-0 justify-center min-h-[460px] sm:min-h-[420px] md:min-h-0"
          style={stableHeight ? { minHeight: `${stableHeight}px` } : undefined}
        >
          <SlideCopy slide={activeSlide} cta={heroCTA} />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 opacity-0 -z-10"
        style={{ visibility: 'hidden' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          {slides.map((slide, index) => (
            <div
              key={`measure-${slide.id}`}
              ref={(el) => {
                measurementRefs.current[index] = el;
              }}
              className="text-white text-center md:text-left flex flex-col gap-8 max-w-4xl lg:max-w-5xl mx-auto md:mx-0"
            >
              <SlideCopy slide={slide} cta={heroCTA} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type SlideCopyProps = {
  slide: Slide;
  cta: HeroCTA;
};

function SlideCopy({ slide, cta }: SlideCopyProps) {
  const highlightTextClass = slide.highlightColor ?? 'text-blue-200';

  return (
    <>
      <div>
        <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm font-semibold tracking-wide text-blue-100 backdrop-blur">
          {slide.badge}
        </p>
        <h1 id="hero-heading" className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-xl">
          {slide.title.line1}
          <br />
          <span
            className={`${highlightTextClass} bg-white/10 backdrop-blur-sm px-6 py-2 rounded-lg inline-block mt-4 border border-white/20`}
          >
            {slide.title.line2}
          </span>
        </h1>
      </div>

      <p className="text-base sm:text-lg md:text-xl text-white/90 mx-auto md:mx-0 leading-relaxed max-w-3xl lg:max-w-4xl">
        {slide.description}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
        <a
          href={cta.primary.link}
          className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-700 rounded-xl hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-2xl text-lg font-semibold focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          {cta.primary.text}
        </a>
        <a
          href={cta.secondary.link}
          className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white border-2 border-white/70 rounded-xl hover:bg-white/10 hover:scale-105 transition-all duration-300 text-lg font-semibold focus:outline-none focus:ring-4 focus:ring-white/40"
        >
          {cta.secondary.text}
        </a>
      </div>
    </>
  );
}
