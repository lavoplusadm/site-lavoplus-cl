import servicesData from '@/data/services.json';
import SectionHeader from '@/components/ui/SectionHeader';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { Icons, serviceIconMap } from '@/components/ui/Icons';

export default function Services() {
  // Mapear servicios con sus iconos del sistema centralizado
  const services = servicesData.services.map(service => {
    const IconComponent = Icons[serviceIconMap[service.id]];
    return {
      ...service,
      icon: IconComponent ? <IconComponent className="text-blue-600" size="lg" /> : null
    };
  });

  return (
    <section id="servicios" className="py-20 md:py-32 bg-gradient-to-b from-white to-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Servicios Profesionales"
          badgeVariant="yellow"
          title="Nuestros Servicios"
          description="Ofrecemos una amplia gama de servicios de lavandería para satisfacer todas tus necesidades"
        />

        <div className="flex flex-wrap justify-center gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-neutral-100 hover:border-accent-yellow flex flex-col hover:-translate-y-1 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-md"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold text-brand-navy mb-3">
                {service.title}
              </h3>
              <div className="mb-4">
                <span className="text-sm text-neutral-500 mr-2">desde</span>
                <span className="text-3xl font-bold text-accent-orange">
                  ${service.price}
                </span>
                <span className="text-sm text-neutral-500 ml-2">
                  {service.priceUnit}
                </span>
              </div>
              <p className="text-neutral-600 mb-4 flex-grow">
                {service.description}
              </p>
              <div className="border-t border-accent-yellow/30 my-4"></div>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg
                      className={`w-5 h-5 mt-0.5 mr-2 flex-shrink-0 ${
                        feature.includes('opcional') ? 'text-accent-yellow' : 'text-accent-teal'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-neutral-700">{feature}</span>
                  </li>
                ))}
              </ul>
              {service.note && (
                <p className="text-xs text-neutral-500 italic mb-4">
                  {service.note}
                </p>
              )}
              <WhatsAppButton
                message={`Hola, me interesa el servicio de ${service.title}`}
                label="Consultar por WhatsApp"
                size="lg"
                className="w-full"
              />
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-gradient-to-r from-accent-orange to-accent-coral px-8 py-10 text-center text-white shadow-xl">
          <h3 className="text-2xl font-bold mb-3">
            {servicesData.specialServices.title}
          </h3>
          <p className="text-white/90 mb-6">
            {servicesData.specialServices.description}
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center rounded-xl bg-accent-yellow px-6 py-3 text-brand-navy font-bold hover:bg-white transition shadow-lg"
          >
            {servicesData.specialServices.ctaText}
          </a>
        </div>
      </div>
    </section>
  );
}
