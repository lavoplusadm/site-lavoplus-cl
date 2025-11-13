import testimonialsData from '@/data/testimonials.json';
import businessData from '@/data/business.json';

export default function Testimonials() {
  return (
    <section id="testimonios" className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm mb-4">
            {testimonialsData.subtitle}
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {testimonialsData.title}
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {testimonialsData.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonialsData.testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-blue-100"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 text-lg mb-6 italic">
                "{testimonial.text}"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{businessData.stats.yearsExperience}</div>
            <p className="text-gray-600 font-medium">Años de Experiencia</p>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{businessData.stats.satisfiedClients}</div>
            <p className="text-gray-600 font-medium">Clientes Satisfechos</p>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{businessData.stats.satisfactionRate}</div>
            <p className="text-gray-600 font-medium">Tasa de Satisfacción</p>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{businessData.stats.customerSupport}</div>
            <p className="text-gray-600 font-medium">Atención al Cliente</p>
          </div>
        </div>
      </div>
    </section>
  );
}
