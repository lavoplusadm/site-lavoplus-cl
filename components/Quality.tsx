import Image from 'next/image';
import qualityData from '@/data/quality.json';
import { getWhatsAppLink } from '@/config/site';

const qualityIcons: Record<string, JSX.Element> = {
  "detergentes": (
    <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  "suavizantes": (
    <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  "equipos": (
    <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  "agua": (
    <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
    </svg>
  )
};

export default function Quality() {
  const qualities = qualityData.qualities.map(quality => ({
    ...quality,
    icon: qualityIcons[quality.id]
  }));

  return (
    <section id="calidad" className="py-20 md:py-32 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm mb-4">
            {qualityData.subtitle}
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {qualityData.title}
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {qualityData.description}
          </p>
        </div>

        {/* Quality Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {qualities.map((quality, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="flex-shrink-0">{quality.icon}</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {quality.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {quality.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Why Choose Us */}
        <div className="mt-16 text-center bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-xl p-8 md:p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">
            {qualityData.whyChooseUs.title}
          </h3>
          <p className="text-lg md:text-xl mb-6 max-w-3xl mx-auto">
            {qualityData.whyChooseUs.description}
          </p>
          <a
            href="#contacto"
            className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition shadow-lg text-lg font-semibold"
          >
            {qualityData.whyChooseUs.ctaText}
          </a>
        </div>

        {qualityData.detergentPromo && (
          <div className="mt-12 md:mt-16 bg-white rounded-3xl border border-blue-100/70 shadow-xl overflow-hidden">
            <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] items-center">
              <div className="p-8 md:p-12">
                <span className="inline-flex items-center rounded-full bg-accent-yellow/30 text-brand-navy px-4 py-2 text-xs font-semibold uppercase tracking-wide mb-4">
                  Producto Exclusivo
                </span>
                <h4 className="text-2xl md:text-3xl font-bold text-brand-navy leading-snug mb-4">
                  {qualityData.detergentPromo.headline}
                </h4>
                <p className="text-neutral-600 text-lg leading-relaxed mb-6">
                  {qualityData.detergentPromo.description}
                </p>
                <a
                  href={
                    qualityData.detergentPromo.ctaLink === 'whatsapp'
                      ? getWhatsAppLink('Hola, quiero comprar el detergente premium de Lavoplus')
                      : qualityData.detergentPromo.ctaLink
                  }
                  target={qualityData.detergentPromo.ctaLink === 'whatsapp' ? '_blank' : undefined}
                  rel={qualityData.detergentPromo.ctaLink === 'whatsapp' ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-2 bg-accent-yellow text-brand-navy px-6 py-3 rounded-xl font-semibold text-base shadow-lg hover:bg-white transition-colors duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l2-8H5.4M7 13l-1.2 6H19m-12 0a1 1 0 102 0 1 1 0 00-2 0zm10 0a1 1 0 102 0 1 1 0 00-2 0z" />
                  </svg>
                  {qualityData.detergentPromo.ctaText}
                </a>
              </div>
              <div className="relative flex justify-center items-center py-8 md:py-12">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-yellow/30 via-transparent to-white pointer-events-none" />
                <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-accent-yellow/50 shadow-2xl bg-white/80 aspect-square">
                  <Image
                    src={qualityData.detergentPromo.image.src}
                    alt={qualityData.detergentPromo.image.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover scale-110"
                    priority={false}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
