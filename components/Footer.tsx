import Link from 'next/link';
import Image from 'next/image';
import { siteConfig, getPrimaryPhone } from '@/config/site';

export default function Footer() {
  const primaryPhone = getPrimaryPhone();
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="mb-2">
              <Image
                src="/img/logo-lavaplus-original-blanco-200.webp"
                alt={siteConfig.name}
                width={200}
                height={200}
                className="h-auto w-40 object-contain scale-125"
              />
            </div>
            <p className="text-gray-400 mt-2">
              Tu lavandería de confianza con más de {siteConfig.business.yearsOfExperience} años de experiencia brindando servicios de calidad.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-lg font-semibold mb-4">Enlaces Rápidos</p>
            <ul className="space-y-2">
              <li>
                <Link href="/#servicios" className="text-gray-400 hover:text-white transition">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="/#delivery" className="text-gray-400 hover:text-white transition">
                  Delivery
                </Link>
              </li>
              <li>
                <Link href="/#empresas" className="text-gray-400 hover:text-white transition">
                  Convenios Empresariales
                </Link>
              </li>
              <li>
                <Link href="/#calidad" className="text-gray-400 hover:text-white transition">
                  Calidad
                </Link>
              </li>
              <li>
                <Link href="/#testimonios" className="text-gray-400 hover:text-white transition">
                  Testimonios
                </Link>
              </li>
              <li>
                <Link href="/#contacto" className="text-gray-400 hover:text-white transition">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="text-lg font-semibold mb-4">Servicios</p>
            <ul className="space-y-2 text-gray-400">
              {siteConfig.services.slice(0, 6).map((service, index) => (
                <li key={index}>
                  <Link
                    href="/#servicios"
                    className="hover:text-white transition"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-lg font-semibold mb-4">Contacto</p>
            <address className="space-y-2 text-gray-400 not-italic">
              <p>{siteConfig.address.street}</p>
              <p>{siteConfig.address.city}, {siteConfig.address.region}</p>
              <p>{siteConfig.address.country}</p>
              <p className="pt-2">Tel: <a href={`tel:${primaryPhone.number}`} className="hover:text-white transition">{primaryPhone.display}</a></p>
              <p>Email: <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition">{siteConfig.contact.email}</a></p>
            </address>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 flex flex-col items-center gap-2 md:mb-0 md:items-start">
              <p className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados.
              </p>
              <div className="flex flex-col items-center gap-1 text-gray-500 sm:flex-row sm:gap-3">
                <span className="whitespace-nowrap text-[12px]">Diseñado y creado por</span>
                <a
                  href="mailto:lau.alcealab@gmail.com"
                  aria-label="Enviar correo a ALCEA LAB"
                  title="Contactar a ALCEA LAB"
                  className="rounded-sm transition-opacity duration-200 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  <svg
                    width="240"
                    height="50"
                    viewBox="0 0 240 50"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="ALCEA LAB"
                    className="h-auto w-[80px]"
                  >
                    <defs>
                      <linearGradient id="alceaBrandGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#00C2FF" />
                        <stop offset="100%" stopColor="#FF4FD8" />
                      </linearGradient>
                    </defs>

                    <g transform="translate(0,3)">
                      <path
                        d="M8 22 H28 L20 14 L26 8 L40 22 L26 36 L20 30 L28 22"
                        fill="#16C5E8"
                      />
                    </g>

                    <text
                      x="52"
                      y="38"
                      fontFamily="Inter, Arial, sans-serif"
                      fontSize="34"
                      fontWeight="800"
                      fill="#FFFFFF"
                    >
                      ALCEA
                    </text>
                    <text
                      x="174"
                      y="38"
                      fontFamily="Inter, Arial, sans-serif"
                      fontSize="34"
                      fontWeight="800"
                      fill="url(#alceaBrandGradient)"
                    >
                      LAB
                    </text>
                  </svg>
                </a>
              </div>
            </div>
            <div className="flex space-x-6">
              <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition" aria-label="Facebook" title="Síguenos en Facebook">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition" aria-label="Instagram" title="Síguenos en Instagram">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/\+/g, "")}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition" aria-label="WhatsApp" title="Escríbenos por WhatsApp">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
