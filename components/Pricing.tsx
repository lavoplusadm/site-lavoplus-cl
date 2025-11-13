import { getWhatsAppLink } from '@/config/site';

const plans = [
  {
    name: "Básico",
    price: "$65",
    unit: "por carga de 6 kg",
    description: "Ideal para ropa semanal de uso diario.",
    highlights: ["Lavado y secado", "Suavizante premium", "Entrega en 48 h", "Seguimiento por WhatsApp"]
  },
  {
    name: "Express",
    price: "$95",
    unit: "por carga de 6 kg",
    description: "Elige prioridad y recibe tus prendas el mismo día.",
    highlights: ["Lavado, secado y doblado", "Procesos acelerados", "Entrega en 8 h", "Notificaciones en tiempo real"],
    featured: true,
    badge: "Más elegido"
  },
  {
    name: "Empresarial",
    price: "Desde $180",
    unit: "servicio mensual",
    description: "Paquetes a la medida para oficinas, spas y restaurantes.",
    highlights: ["Recolecciones programadas", "Inventario por prenda", "Tratamiento especializado", "Facturación electrónica"]
  }
];

export default function Pricing() {
  return (
    <section id="precios" className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold mb-4">
            Transparencia total
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Planes para cada necesidad
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Precios claros y sin sorpresas. Elige la opción que se adapta a tu ritmo y mantén tu ropa impecable todo el año.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-3xl border border-blue-100 bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                plan.featured ? "ring-2 ring-blue-500" : ""
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold text-white shadow-lg">
                  {plan.badge}
                </span>
              )}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-extrabold text-blue-600">{plan.price}</span>
                <span className="text-gray-500">/ {plan.unit}</span>
              </div>
              <p className="text-gray-600 mb-6">{plan.description}</p>
              <ul className="space-y-3 mb-8">
                {plan.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start text-gray-700">
                    <svg className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contacto"
                className={`mt-auto inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold transition ${
                  plan.featured
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                }`}
              >
                Quiero este plan
              </a>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-blue-100 bg-white p-6 md:p-10 shadow-md flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              ¿Necesitas un paquete personalizado?
            </h3>
            <p className="text-gray-600">
              Diseñamos soluciones para hoteles, clínicas, gimnasios y familias numerosas. Solo dinos cuántas recolecciones necesitas.
            </p>
          </div>
          <a
            href={getWhatsAppLink("Hola, quiero una cotización personalizada")}
            className="inline-flex items-center justify-center rounded-xl bg-green-500 px-6 py-3 font-semibold text-white shadow-lg hover:bg-green-600 transition"
          >
            Cotiza por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
