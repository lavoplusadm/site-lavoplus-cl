import type { Metadata } from 'next';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import aboutData from '@/data/about.json';
import { siteConfig } from '@/config/site';
import { generateMetadata as genMeta, generateBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = genMeta({
  title: 'Nosotros',
  description: aboutData.description,
  keywords: [
    'sobre nosotros',
    'historia lavandería',
    'equipo lavandería',
    'experiencia lavandería Los Ángeles',
  ],
  canonical: '/nosotros',
});

export default function NosotrosPage() {
  // Breadcrumb schema for SEO
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Inicio', url: '/' },
    { name: 'Nosotros', url: '/nosotros' },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white">
      {/* JSON-LD Breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navigation />
      <main className="pt-24 md:pt-28 lg:pt-32">
        <section className="py-10 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12">
            <div className="max-w-3xl mx-auto text-center">
              <p className="inline-flex items-center rounded-full bg-blue-100/70 text-blue-700 px-4 py-2 text-sm font-semibold">
                {aboutData.title}
              </p>
              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                {aboutData.subtitle}
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed">
                {aboutData.description}
              </p>
              <dl className="mt-10 grid gap-6 sm:grid-cols-3 text-left">
                {aboutData.highlights.map((highlight) => (
                  <div
                    key={highlight.id}
                    className="rounded-2xl bg-white/80 backdrop-blur shadow-lg border border-blue-100/60 p-6"
                  >
                    <dt className="text-sm font-semibold uppercase tracking-wide text-blue-600 mb-2">
                      {highlight.title}
                    </dt>
                    <dd className="text-sm text-gray-600 leading-relaxed">
                      {highlight.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <article className="rounded-3xl border border-blue-100 bg-blue-50/60 p-8 shadow-lg text-center">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">{aboutData.mission.title}</h2>
              <p className="text-gray-700 leading-relaxed">
                {aboutData.mission.description}
              </p>
            </article>
            <article className="rounded-3xl border border-blue-100 bg-blue-50/30 p-8 shadow-lg text-center">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">{aboutData.vision.title}</h2>
              <p className="text-gray-700 leading-relaxed">
                {aboutData.vision.description}
              </p>
            </article>
          </div>
        </div>
        </section>

        <section className="py-10 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl overflow-hidden border border-blue-100 shadow-2xl">
            <Image
              src={aboutData.storePhoto?.src ?? aboutData.photo.src}
              alt={aboutData.storePhoto?.alt ?? aboutData.photo.alt}
              width={1600}
              height={900}
              priority
              className="object-cover w-full h-[320px] sm:h-[420px] md:h-[520px]"
            />
          </div>
        </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
