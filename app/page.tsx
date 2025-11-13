import dynamic from 'next/dynamic';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import StructuredData from '@/components/StructuredData';

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
