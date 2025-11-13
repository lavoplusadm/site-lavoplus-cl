import { getWhatsAppLink } from '@/config/site';

export default function Delivery() {
  const deliveryFeatures = [
    {
      title: "Recogida a Domicilio",
      description: "Pasamos a recoger tu ropa directamente en tu hogar u oficina en el horario que prefieras.",
      icon: (
        <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      title: "Entrega Programada",
      description: "Recibe tu ropa limpia en la fecha y hora que mejor te acomode. Confirmamos el día anterior.",
      icon: (
        <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 11h6v6H9z" />
        </svg>
      )
    },
    {
      title: "Seguimiento en Tiempo Real",
      description: "Notificaciones por WhatsApp del estado de tu pedido: recogida, proceso y entrega.",
      icon: (
        <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      )
    },
    {
      title: "Cobertura Amplia",
      description: "Servicio disponible en Los Ángeles y comunas cercanas. Consulta si llegamos a tu sector.",
      icon: (
        <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ];

  const deliveryProcess = [
    {
      step: "1",
      title: "Agenda tu Recogida",
      description: "Contáctanos por WhatsApp o teléfono y programa el día y hora de recogida."
    },
    {
      step: "2",
      title: "Preparamos tu Pedido",
      description: "Recogemos tu ropa, la pesamos y te enviamos el presupuesto al instante."
    },
    {
      step: "3",
      title: "Lavado Profesional",
      description: "Tu ropa es procesada con nuestros estándares de calidad premium."
    },
    {
      step: "4",
      title: "Entrega a Domicilio",
      description: "Llevamos tu ropa limpia, doblada y lista para usar cuando la necesites."
    }
  ];

  return (
    <section id="delivery" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 rounded-full bg-accent-teal text-white font-bold text-sm mb-4 shadow-md">
            Servicio de Delivery
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-brand-navy mb-6">
            Llevamos tu Ropa Limpia a Casa
          </h2>
          <p className="text-xl md:text-2xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Ahorra tiempo con nuestro servicio de recogida y entrega a domicilio.
            Sin salir de casa, tu ropa estará impecable.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {deliveryFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-accent-yellow/10 to-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-accent-yellow/30 hover:border-accent-yellow hover:-translate-y-1"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-brand-navy mb-3">
                {feature.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Delivery Process */}
        <div className="mb-20">
          <h3 className="text-3xl md:text-4xl font-bold text-center text-brand-navy mb-12">
            ¿Cómo Funciona?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliveryProcess.map((item, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-yellow to-accent-orange text-brand-navy flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">
                    {item.step}
                  </div>
                  <h4 className="text-xl font-bold text-brand-navy mb-2">
                    {item.title}
                  </h4>
                  <p className="text-neutral-600">
                    {item.description}
                  </p>
                </div>
                {index < deliveryProcess.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-accent-yellow to-accent-orange">
                    <div className="absolute right-0 -top-1 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-accent-orange"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-accent-teal to-brand-blue rounded-2xl p-10 md:p-16 text-center text-white shadow-2xl">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              ¡Programa tu Primer Delivery Gratis!
            </h3>
            <p className="text-xl text-white/90 mb-8">
              Sin cargo adicional en tu primera recogida y entrega.
              Solo pagas el servicio de lavandería.
            </p>
            <a
              href={getWhatsAppLink("Hola, quiero programar mi primer delivery gratis")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-accent-yellow text-brand-navy px-8 py-4 rounded-xl font-bold text-lg hover:bg-white transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Solicitar Delivery Ahora
            </a>
            <p className="text-sm text-green-200 mt-4">
              Disponible de lunes a Viernes de 9:00 a 19:00 hrs
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
