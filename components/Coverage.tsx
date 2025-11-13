const zones = [
  { name: "Centro", eta: "Entrega en 6 h", description: "Zonas Centro Histórico, Juárez y Condesa." },
  { name: "Norte", eta: "Entrega en 12 h", description: "Lindavista, Satélite, Vallejo y alrededores." },
  { name: "Poniente", eta: "Entrega en 24 h", description: "Polanco, Santa Fe, Bosques de las Lomas." },
  { name: "Sur", eta: "Entrega en 24 h", description: "Coyoacán, Del Valle, Xochimilco y Pedregal." }
];

const logistics = [
  {
    title: "Horarios de recolección",
    items: ["Lunes a viernes: 9:00 - 19:00", "Sábado: 9:00 - 14:00", "Domingo: bajo cita previa"]
  },
  {
    title: "Métodos de pago",
    items: ["Tarjeta en punto de entrega", "Transferencia bancaria", "Pago en efectivo"]
  },
  {
    title: "Notificaciones",
    items: ["Confirmación inmediata", "Seguimiento por WhatsApp", "Aviso de salida a entrega"]
  }
];

export default function Coverage() {
  return (
    <section id="cobertura" className="py-16 md:py-24 bg-white" aria-labelledby="cobertura-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <span className="inline-flex items-center px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold mb-4">
              Llegamos a ti
            </span>
            <h2 id="cobertura-heading" className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Cobertura en Los Ángeles y Región del Bío Bío
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Servicio de lavandería con delivery en Los Ángeles, Chile. Operamos con rutas diarias para garantizar recolecciones puntuales y entregas sin retrasos. Si tu zona no aparece, contáctanos y buscamos una solución.
            </p>

            <div className="space-y-4" role="list" aria-label="Zonas de cobertura">
              {zones.map((zone) => (
                <article key={zone.name} className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 shadow-md" role="listitem">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Zona {zone.name}</h3>
                      <p className="text-gray-600">{zone.description}</p>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow" aria-label={`Tiempo de entrega: ${zone.eta}`}>
                      {zone.eta}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="overflow-hidden rounded-3xl border border-blue-100 shadow-xl">
              <iframe
                title="Ubicación de Lavandería Lavoplus en Los Ángeles, Región del Bío Bío"
                className="h-72 w-full border-0"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.8!2d-72.331502!3d-37.4476508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x966bdd24e598205d%3A0x390e95e226f8de81!2sLavander%C3%ADa%20Lavoplus!5e0!3m2!1ses!2scl!4v1234567890!5m2!1ses!2scl"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                aria-label="Mapa de ubicación de Lavandería Lavoplus"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {logistics.map((logistic) => (
                <div key={logistic.title} className="rounded-2xl border border-blue-100 bg-white p-6 shadow">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">{logistic.title}</h4>
                  <ul className="space-y-2 text-gray-600">
                    {logistic.items.map((item) => (
                      <li key={item} className="flex items-start">
                        <svg className="w-4 h-4 text-blue-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 18a8 8 0 100-16 8 8 0 000 16z" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-2">¿No encuentras tu colonia?</h3>
              <p className="mb-6 text-blue-100">
                Escríbenos y revisamos disponibilidad especial o rutas bajo demanda.
              </p>
              <a
                href="#contacto"
                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 hover:bg-blue-50 transition"
              >
                Solicitar cobertura
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
