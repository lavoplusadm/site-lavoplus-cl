import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FeaturedItems from '@/components/FeaturedItems';
import PricingCarousel from '@/components/PricingCarousel';
import Link from 'next/link';
import preciosPageData from '@/data/precios-page.json';
import pricingData from '@/data/pricing.json';
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateProductSchema, generateFAQSchema } from '@/lib/seo';

export const metadata: Metadata = genMeta({
  title: 'Precios',
  description: 'Consulta nuestros precios transparentes para lavado de prendas individuales. Servicio de lavandería profesional en Los Ángeles con descuentos por volumen.',
  keywords: [
    'precios lavandería',
    'tarifas lavandería',
    'costo lavado',
    'precios lavado en seco',
    'cuánto cuesta lavandería',
    'lista de precios lavandería',
  ],
  canonical: '/precios',
});

const featureIcons: Record<string, JSX.Element> = {
  "transparencia": (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  "descuentos": (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  "express": (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  )
};

export default function PreciosPage() {
  const features = preciosPageData.features.map(feature => ({
    ...feature,
    icon: featureIcons[feature.id]
  }));

  // Obtener la categoría de Ropa de Cama y Baño
  const ropaCamaBano = pricingData.categories.find(cat => cat.id === 'ropa-cama-bano');

  // Breadcrumb schema for SEO
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Inicio', url: '/' },
    { name: 'Precios', url: '/precios' },
  ]);

  // FAQ Schema for SEO
  const faqSchema = generateFAQSchema([
    {
      question: '¿Cuánto cuesta el servicio de lavandería?',
      answer: 'Nuestros precios varían según el tipo de prenda. Por ejemplo, una camisa cuesta desde $1,500 y un pantalón desde $2,000. Ofrecemos descuentos por volumen.'
    },
    {
      question: '¿Tienen descuentos por volumen?',
      answer: 'Sí, ofrecemos descuentos especiales para grandes volúmenes y convenios empresariales. Contáctanos para más información.'
    },
    {
      question: '¿Ofrecen servicio express?',
      answer: 'Sí, contamos con servicio express con entrega el mismo día para casos de urgencia.'
    }
  ]);

  return (
    <>
      {/* JSON-LD Schemas for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen">
        <Navigation />
        <main className="pt-32">
          {/* Featured Items Component */}
          <FeaturedItems />

          {/* Pricing Carousel - Ropa de Cama y Baño */}
          {ropaCamaBano && (
            <PricingCarousel
              title={ropaCamaBano.name}
              subtitle="Categoría Especial"
              items={ropaCamaBano.items}
            />
          )}

          {/* Additional Info Section */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                    <div className="text-blue-600 mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <p className="text-gray-600 mb-6">
                  {preciosPageData.cta.question}
                </p>
                <Link
                  href={preciosPageData.cta.buttonLink}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {preciosPageData.cta.buttonText}
                </Link>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
