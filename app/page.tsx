import dynamic from 'next/dynamic';
import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import HeroImage from '@/components/HeroImage';
import Services from '@/components/Services';
import StructuredData from '@/components/StructuredData';
import { siteConfig } from '@/config/site';

// Metadata optimizada para SEO local - Homepage
export const metadata: Metadata = {
  title: 'Lavandería en Los Ángeles | Lavoplus Delivery',
  description: 'Lavandería Lavoplus en Los Ángeles: lavado por kilo, lavado en seco y delivery a domicilio. Más de 5 años de experiencia. ¡Cotiza gratis!',
  keywords: [
    'lavandería Los Ángeles',
    'lavandería en Los Ángeles Chile',
    'lavado por kilo Los Ángeles',
    'lavandería a domicilio Los Ángeles',
    'lavandería delivery Los Ángeles',
    'lavado en seco Los Ángeles',
    'lavado de plumones Los Ángeles',
    'lavandería express Los Ángeles',
    'lavado ropa de cama Los Ángeles',
    'lavandería cerca de mí',
    'convenios lavandería empresas',
    'lavado uniformes Los Ángeles',
    ...siteConfig.keywords,
  ],
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: 'Lavandería Profesional en Los Ángeles | Lavoplus',
    description: `Servicio de lavandería para familias y empresas en Los Ángeles, Bío-Bío. Lavado por kilo, lavado en seco, planchado profesional y delivery a domicilio. Convenios corporativos disponibles.`,
    url: siteConfig.url,
    type: 'website',
  },
};

// Lazy load components below the fold
const Delivery = dynamic(() => import('@/components/Delivery'), {
  loading: () => <div className="h-96 animate-pulse bg-gray-100" />
});

const CorporatePartnerships = dynamic(() => import('@/components/CorporatePartnerships'), {
  loading: () => <div className="h-96 animate-pulse bg-gray-100" />
});

const Quality = dynamic(() => import('@/components/Quality'), {
  loading: () => <div className="h-96 animate-pulse bg-gray-100" />
});

const Testimonials = dynamic(() => import('@/components/Testimonials'), {
  loading: () => <div className="h-80 animate-pulse bg-gray-100" />
});

const Contact = dynamic(() => import('@/components/Contact'), {
  loading: () => <div className="h-screen animate-pulse bg-gray-100" />
});

const Footer = dynamic(() => import('@/components/Footer'));

const HeroCarouselToggle = dynamic(() => import('@/components/HeroCarouselToggle'));

export default function Home() {
  return (
    <>
      <StructuredData />
      <div className="min-h-screen">
        <Navigation />
        <main>
          {/* Hero section with server-rendered LCP image for faster paint */}
          <section
            id="inicio"
            className="relative mt-24 md:mt-28 overflow-hidden min-h-[600px] sm:min-h-[650px] md:min-h-[700px]"
          >
            <HeroImage />
            <HeroCarouselToggle />
          </section>
          <Services />
          <CorporatePartnerships />
          <Delivery />
          <Quality />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
