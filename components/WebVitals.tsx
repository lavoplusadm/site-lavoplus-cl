'use client';

import { useReportWebVitals } from 'next/web-vitals';

/**
 * Componente para monitorear Core Web Vitals
 * Los datos se pueden enviar a servicios de analytics
 */
export default function WebVitals() {
  useReportWebVitals((metric) => {
    // Log en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Web Vital:', {
        name: metric.name,
        value: Math.round(metric.value),
        rating: metric.rating,
        id: metric.id,
      });
    }

    // En producción, enviar a analytics
    if (process.env.NODE_ENV === 'production') {
      // Ejemplo: Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', metric.name, {
          event_category: 'Web Vitals',
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          event_label: metric.id,
          non_interaction: true,
        });
      }

      // Ejemplo: Custom endpoint
      /*
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          metric: metric.name,
          value: metric.value,
          rating: metric.rating,
          id: metric.id,
          timestamp: Date.now(),
        }),
      }).catch(console.error);
      */
    }

    // Thresholds según Google
    const thresholds = {
      FCP: { good: 1800, poor: 3000 }, // First Contentful Paint
      LCP: { good: 2500, poor: 4000 }, // Largest Contentful Paint
      FID: { good: 100, poor: 300 },   // First Input Delay
      CLS: { good: 0.1, poor: 0.25 },  // Cumulative Layout Shift
      TTFB: { good: 800, poor: 1800 }, // Time to First Byte
      INP: { good: 200, poor: 500 },   // Interaction to Next Paint
    };

    // Alertas en desarrollo para métricas pobres
    if (process.env.NODE_ENV === 'development') {
      const threshold = thresholds[metric.name as keyof typeof thresholds];
      if (threshold && metric.value > threshold.poor) {
        console.warn(
          `⚠️ Poor ${metric.name}: ${Math.round(metric.value)} (should be < ${threshold.good})`
        );
      }
    }
  });

  return null; // Este componente no renderiza nada
}

/**
 * Guía de Core Web Vitals:
 *
 * LCP (Largest Contentful Paint):
 * - Good: < 2.5s
 * - Needs Improvement: 2.5s - 4s
 * - Poor: > 4s
 * Mide: Tiempo hasta que el elemento más grande es visible
 * Mejoras: Optimizar imágenes, lazy loading, cache, CDN
 *
 * FID (First Input Delay):
 * - Good: < 100ms
 * - Needs Improvement: 100ms - 300ms
 * - Poor: > 300ms
 * Mide: Tiempo hasta que el sitio responde a la primera interacción
 * Mejoras: Reducir JS, code splitting, web workers
 *
 * CLS (Cumulative Layout Shift):
 * - Good: < 0.1
 * - Needs Improvement: 0.1 - 0.25
 * - Poor: > 0.25
 * Mide: Estabilidad visual durante la carga
 * Mejoras: Dimensiones fijas en imágenes/videos, no insertar contenido dinámico
 *
 * FCP (First Contentful Paint):
 * - Good: < 1.8s
 * - Needs Improvement: 1.8s - 3s
 * - Poor: > 3s
 * Mide: Tiempo hasta el primer contenido visible
 * Mejoras: Reducir CSS/JS blocking, server-side rendering
 *
 * TTFB (Time to First Byte):
 * - Good: < 800ms
 * - Needs Improvement: 800ms - 1800ms
 * - Poor: > 1800ms
 * Mide: Tiempo hasta recibir el primer byte del servidor
 * Mejoras: CDN, cache, optimización de servidor
 *
 * INP (Interaction to Next Paint):
 * - Good: < 200ms
 * - Needs Improvement: 200ms - 500ms
 * - Poor: > 500ms
 * Mide: Responsividad general durante la sesión
 * Mejoras: Reducir JS, optimizar event handlers
 */
