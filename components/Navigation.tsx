'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 transition-all duration-300 ${
      scrolled ? 'shadow-md' : 'shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24 md:h-28 lg:h-28">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/img/logo-lavaplus-original.png"
                alt="Lavandería Lavoplus"
                width={600}
                height={200}
                className="h-24 md:h-28 lg:h-28 w-auto object-contain scale-125 transition-all duration-300"
                priority
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link href="/nosotros" className="text-gray-700 hover:text-blue-600 transition font-medium">
              Nosotros
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button className="text-gray-700 hover:text-blue-600 transition font-medium flex items-center gap-1">
                Servicios
                <svg className={`w-4 h-4 transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                    <Link
                      href="/#servicios"
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                    >
                      Nuestros Servicios
                    </Link>
                    <Link
                      href="/precios"
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                    >
                      Precios por Prenda
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/#delivery" className="text-gray-700 hover:text-blue-600 transition font-medium">
              Delivery
            </Link>
            <Link href="/#empresas" className="text-gray-700 hover:text-blue-600 transition font-medium">
              Convenios
            </Link>
            <Link href="/#calidad" className="text-gray-700 hover:text-blue-600 transition font-medium">
              Calidad
            </Link>
            <Link href="/#testimonios" className="text-gray-700 hover:text-blue-600 transition font-medium">
              Testimonios
            </Link>
            <Link href="/#contacto" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium">
              Contacto
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-white border-t overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link href="/nosotros" className="block px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium" onClick={() => setIsOpen(false)}>
            Nosotros
          </Link>

          {/* Mobile Services Submenu */}
          <div>
            <button
              onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
              className="w-full flex items-center justify-between px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
            >
              Servicios
              <svg className={`w-4 h-4 transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {servicesDropdownOpen && (
              <div className="ml-4 mt-1 space-y-1">
                <Link href="/#servicios" className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" onClick={() => { setIsOpen(false); setServicesDropdownOpen(false); }}>
                  Nuestros Servicios
                </Link>
                <Link href="/precios" className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" onClick={() => { setIsOpen(false); setServicesDropdownOpen(false); }}>
                  Precios por Prenda
                </Link>
              </div>
            )}
          </div>

          <Link href="/#delivery" className="block px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium" onClick={() => setIsOpen(false)}>
            Delivery
          </Link>
          <Link href="/#empresas" className="block px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium" onClick={() => setIsOpen(false)}>
            Convenios Empresariales
          </Link>
          <Link href="/#calidad" className="block px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium" onClick={() => setIsOpen(false)}>
            Calidad
          </Link>
          <Link href="/#testimonios" className="block px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium" onClick={() => setIsOpen(false)}>
            Testimonios
          </Link>
          <Link href="/#contacto" className="block px-3 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors font-medium text-center" onClick={() => setIsOpen(false)}>
            Contacto
          </Link>
        </div>
      </div>
    </nav>
  );
}
