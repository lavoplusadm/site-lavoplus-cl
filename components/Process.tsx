export default function Process() {
  const steps = [
    {
      title: "Agenda tu recolección",
      description: "Elige el día y hora que mejor te acomode. Confirmamos por WhatsApp o llamada en minutos.",
      icon: (
        <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3M16 7V3M5 11h14M5 19h14M5 11a2 2 0 012-2h10a2 2 0 012 2M5 19a2 2 0 002 2h10a2 2 0 002-2" />
        </svg>
      )
    },
    {
      title: "Recogemos tus prendas",
      description: "Nuestro personal pasa por tu ropa puntualmente y revisa cada prenda para escoger el proceso ideal.",
      icon: (
        <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7l1.664 10.653A2 2 0 006.64 19h10.72a2 2 0 001.977-1.347L21 7M5 7h14M10 11v4M14 11v4" />
        </svg>
      )
    },
    {
      title: "Lavamos y entregamos",
      description: "Procesos premium, control de calidad y entrega en la franja horaria acordada. Tus prendas listas para usar.",
      icon: (
        <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7a4 4 0 014-4h8a4 4 0 014 4v10a4 4 0 01-4 4H8a4 4 0 01-4-4V7z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11l2 2 6-6" />
        </svg>
      )
    }
  ];

  return (
    <section id="proceso" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold mb-4">
            Así de fácil
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Servicio sin complicaciones
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Todo el proceso está pensado para que no tengas que preocuparte por nada. Nosotros nos encargamos de principio a fin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-blue-100"
            >
              <span className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold shadow-lg">
                {index + 1}
              </span>
              <div className="pt-6">
                <div className="mb-6">{step.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
