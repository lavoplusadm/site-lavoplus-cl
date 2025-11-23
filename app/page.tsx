import dynamic from 'next/dynamic';
import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import StructuredData from '@/components/StructuredData';
import { siteConfig } from '@/config/site';

// Metadata optimizada para SEO local - Homepage
export const metadata: Metadata = {
  title: 'Lavandería en Los Ángeles | Lavoplus | Lavado por Kilo, Seco y Delivery',
  description: `Lavandería Lavoplus en Los Ángeles, Bío-Bío. Lavado por kilo, lavado en seco, planchado, ropa de cama y delivery a domicilio. Más de ${siteConfig.business.yearsOfExperience} años de experiencia cuidando tus prendas.`,
  keywords: [
    'lavandería Los Ángeles',
    'lavandería en Los Ángeles Chile',
    'lavado por kilo Los Ángeles',
    'lavandería a domicilio Los Ángeles',
    'lavandería delivery Los Ángeles',
    'lavado en seco Los Ángeles',
    'lavado de plumones Los Ángeles',
    'lavandería express Los Ángeles',
    ...siteConfig.keywords,
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Lavandería en Los Ángeles | Lavoplus | Lavado por Kilo, Seco y Delivery',
    description: `Lavandería profesional en Los Ángeles, Región del Bío Bío con más de ${siteConfig.business.yearsOfExperience} años de experiencia. Servicio de delivery a domicilio y convenios corporativos.`,
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

export default function Home() {
  return (
    <>
      <StructuredData />
      <div className="min-h-screen">
        <Navigation />
        <main>
          <Hero />
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
