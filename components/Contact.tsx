'use client';

import { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import Select from './Select';
import { siteConfig, getPrimaryPhone } from '@/config/site';

export default function Contact() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const primaryPhone = getPrimaryPhone();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const serviceOptions = [
    { value: 'lavado-kilo', label: 'Lavado por Kilo' },
    { value: 'lavado-seco', label: 'Lavado en Seco' },
    { value: 'planchado', label: 'Planchado' },
    { value: 'ropa-cama', label: 'Lavado de Ropa de Cama' },
    { value: 'express', label: 'Servicio Express' },
    { value: 'otro', label: 'Otro servicio' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Ejecutar reCAPTCHA si está disponible
      let recaptchaToken = '';
      if (executeRecaptcha) {
        try {
          recaptchaToken = await executeRecaptcha('contact_form');
        } catch (recaptchaError) {
          console.error('reCAPTCHA error:', recaptchaError);
          // Continuar sin reCAPTCHA si hay un error
        }
      }

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar el mensaje');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });

      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al enviar el mensaje. Por favor, intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contacto" className="py-20 md:py-32 bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm mb-4">
            Hablemos
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Contáctanos
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Estamos listos para atender tus necesidades de lavandería
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Solicita Información
            </h3>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h4 className="text-xl font-bold text-green-800 mb-2">¡Mensaje Enviado!</h4>
                <p className="text-green-600">Nos pondremos en contacto contigo pronto.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-400"
                    placeholder="Ingresa tu nombre completo"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-400"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-400"
                    placeholder="+56 9 1234 5678"
                  />
                </div>

                <Select
                  id="service"
                  name="service"
                  label="Servicio de Interés"
                  value={formData.service}
                  onChange={handleChange}
                  options={serviceOptions}
                  required
                  placeholder="Selecciona un servicio"
                />

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-400 resize-none"
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                  ></textarea>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300 font-semibold text-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </span>
                  ) : (
                    'Enviar Mensaje'
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center leading-relaxed mt-3">
                  Este sitio está protegido por reCAPTCHA y se aplican la{' '}
                  <a
                    href="https://policies.google.com/privacy?hl=es"
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-2 hover:text-blue-600 transition"
                  >
                    Política de Privacidad
                  </a>{' '}
                  y los{' '}
                  <a
                    href="https://policies.google.com/terms?hl=es"
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-2 hover:text-blue-600 transition"
                  >
                    Términos de Servicio
                  </a>{' '}
                  de Google.
                </p>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Información de Contacto
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">Dirección</h4>
                    <p className="text-gray-600">{siteConfig.address.street}<br />{siteConfig.address.city}, {siteConfig.address.region}, {siteConfig.address.country}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">Teléfono</h4>
                    {siteConfig.contact.phones.map((phone, index) => (
                      <p key={index} className="text-gray-600">
                        <a href={`tel:${phone.number}`} className="hover:text-blue-600 transition">{phone.display}</a>
                      </p>
                    ))}
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">
                      <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-blue-600 transition">{siteConfig.contact.email}</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">Horario</h4>
                    <p className="text-gray-600">{siteConfig.hours.weekdays.days}: {siteConfig.hours.weekdays.display}</p>
                    <p className="text-gray-600">{siteConfig.hours.saturday.days}: {siteConfig.hours.saturday.display}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Horario de Atención
              </h3>
              <p className="mb-6">
                Visítanos o llámanos durante nuestro horario de atención. Ofrecemos servicio express para tus emergencias.
              </p>
              <a
                href={`tel:${primaryPhone.number}`}
                className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition font-semibold"
              >
                Llamar Ahora
              </a>
            </div>
          </div>
        </div>

        {/* Mapa */}
        <div className="mt-16">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="relative h-96 w-full">
              <iframe
                title={`Ubicación de ${siteConfig.name}`}
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.8!2d${siteConfig.geo.longitude}!3d${siteConfig.geo.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x966bdd24e598205d%3A0x390e95e226f8de81!2s${encodeURIComponent(siteConfig.name)}!5e0!3m2!1ses!2scl!4v1234567890!5m2!1ses!2scl`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
