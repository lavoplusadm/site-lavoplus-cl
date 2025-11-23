'use client';

import { useState, useEffect, useCallback, useRef, useLayoutEffect } from 'react';
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
  gradient?: string;
  highlightColor?: string;
};

type HeroCTA = {
  primary: { text: string; link: string };
  secondary: { text: string; link: string };
};

const slides = (heroData.slides ?? []) as Slide[];
const defaultCTA: HeroCTA = {
  primary: { text: 'Ver Servicios', link: '#servicios' },
  secondary: { text: 'Contáctanos', link: '#contacto' },
};
const cta: HeroCTA = (heroData.cta as HeroCTA | undefined) ?? defaultCTA;

const HERO_GRADIENT = 'from-slate-900/85 via-slate-800/70 to-slate-900/90';

/**
 * Carousel toggle component - loaded dynamically after initial render
 * Automatically cycles through all slides including the first one
 */
type IdleEnhancerWindow = Window &
  typeof globalThis & {
    requestIdleCallback?: (callback: () => void) => number;
    cancelIdleCallback?: (handle: number) => void;
  };

export default function HeroCarouselToggle() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isEnhanced, setIsEnhanced] = useState(false);
  const [stableHeight, setStableHeight] = useState<number | null>(null);
  const measurementRefs = useRef<(HTMLDivElement | null)[]>([]);

  const measureHeights = useCallback(() => {
    if (typeof window === 'undefined') return;

    const heights = measurementRefs.current.map((ref) => ref?.offsetHeight ?? 0);
    const maxHeight = heights.length ? Math.max(...heights) : 0;
    setStableHeight(maxHeight > 0 ? maxHeight : null);
  }, []);

  useLayoutEffect(() => {
    if (!isEnhanced) return;
    measureHeights();
  }, [measureHeights, isEnhanced]);

  useEffect(() => {
    if (!isEnhanced) return;
    const handleResize = () => measureHeights();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [measureHeights, isEnhanced]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isEnhanced) return;

    const idleWindow = window as IdleEnhancerWindow;
    let idleHandle: number | undefined;
    let timeoutHandle: number | undefined;

    const enable = () => setIsEnhanced(true);

    const interactionHandler = () => {
      enable();
      window.removeEventListener('pointerdown', interactionHandler);
      window.removeEventListener('keydown', interactionHandler);
      window.removeEventListener('touchstart', interactionHandler);
    };

    window.addEventListener('pointerdown', interactionHandler, { once: true });
    window.addEventListener('touchstart', interactionHandler, { once: true });
    window.addEventListener('keydown', interactionHandler, { once: true });

    if (idleWindow.requestIdleCallback) {
      idleHandle = idleWindow.requestIdleCallback(enable);
    } else {
      timeoutHandle = window.setTimeout(enable, 1000);
    }

    return () => {
      window.removeEventListener('pointerdown', interactionHandler);
      window.removeEventListener('touchstart', interactionHandler);
      window.removeEventListener('keydown', interactionHandler);
      if (idleHandle) {
        idleWindow.cancelIdleCallback?.(idleHandle);
      }
      if (timeoutHandle) {
        window.clearTimeout(timeoutHandle);
      }
    };
  }, [isEnhanced]);

  useEffect(() => {
    if (!isEnhanced || isPaused || slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, isEnhanced]);

  if (slides.length <= 1) return null;

  measurementRefs.current = measurementRefs.current.slice(0, slides.length);

  return (
    <>
      {/* Slide images - positioned absolutely to cover HeroImage */}
      <div className="absolute inset-0 z-[5]">
        {slides.map((slide, index) => {
          // Skip first slide (index 0) as it's rendered by HeroImage
          if (index === 0 || (!isEnhanced && index > 0)) return null;

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
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
                  className={`absolute inset-0 bg-gradient-to-br ${HERO_GRADIENT} mix-blend-multiply opacity-90`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/35 to-transparent" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Text content that changes with slides */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 z-10">
        <div
          className="relative text-white text-center md:text-left flex flex-col gap-8 max-w-4xl lg:max-w-5xl mx-auto md:mx-0 justify-center min-h-[460px] sm:min-h-[420px] md:min-h-[360px]"
          style={stableHeight ? { height: `${stableHeight}px` } : undefined}
        >
          {isEnhanced && slides.length > 1 && (
            <div className="flex items-center gap-4 justify-center md:justify-start text-white mb-6">
              <div className="flex gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`transition-all duration-300 rounded-full ${
                      currentSlide === index
                        ? 'w-10 h-3 bg-white shadow-lg'
                        : 'w-3 h-3 bg-white/50 hover:bg-white/70'
                    }`}
                    aria-label={`Ir al slide ${index + 1}`}
                  />
                ))}
              </div>
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
            </div>
          )}
          {slides.map((slide, index) => {
            if (!isEnhanced && index > 0) return null;
            const highlightTextClass = slide.highlightColor ?? 'text-blue-200';
            return (
              <div
                key={slide.id}
                className={`transition-opacity duration-1000 flex flex-col gap-8 ${
                  index === currentSlide
                    ? 'opacity-100 relative'
                    : 'opacity-0 absolute inset-0 pointer-events-none'
                }`}
              >
                <SlideCopy slide={slide} highlightClass={highlightTextClass} cta={cta} />
              </div>
            );
          })}
          {isEnhanced && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0"
              style={{ visibility: 'hidden' }}
            >
              {slides.map((slide, index) => {
                const highlightTextClass = slide.highlightColor ?? 'text-blue-200';
                return (
                  <div
                    key={`measure-${slide.id}`}
                    ref={(el) => {
                      measurementRefs.current[index] = el;
                    }}
                    className="flex flex-col gap-8"
                  >
                    <SlideCopy slide={slide} highlightClass={highlightTextClass} cta={cta} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

type SlideCopyProps = {
  slide: Slide;
  highlightClass: string;
  cta: HeroCTA;
};

function SlideCopy({ slide, highlightClass, cta }: SlideCopyProps) {
  return (
    <>
      <div>
        <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm font-semibold tracking-wide text-blue-100 backdrop-blur">
          {slide.badge}
        </p>
        <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-xl">
          {slide.title.line1}
          <br />
          <span
            className={`${highlightClass} bg-white/10 backdrop-blur-sm px-6 py-2 rounded-lg inline-block mt-4 border border-white/20`}
          >
            {slide.title.line2}
          </span>
        </h1>
      </div>

      <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl lg:max-w-4xl">
        {slide.description}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
        <a
          href={cta.primary.link}
          className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-700 rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-2xl text-lg font-semibold focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          {cta.primary.text}
        </a>
        <a
          href={cta.secondary.link}
          className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white border-2 border-white/70 rounded-xl hover:bg-white/10 transition-all duration-300 text-lg font-semibold focus:outline-none focus:ring-4 focus:ring-white/40"
        >
          {cta.secondary.text}
        </a>
      </div>
    </>
  );
}
