/**
 * Configuración centralizada del sitio
 * Todos los datos de contacto, redes sociales y metadata del sitio
 */

export const siteConfig = {
  // Información básica
  name: "Lavandería Lavoplus",
  alternateName: "Lavoplus Los Ángeles",
  description: "Lavandería profesional en Los Ángeles, Región del Bío Bío. Lavado por kilo, en seco, planchado y delivery a domicilio para familias y empresas con más de 5 años de experiencia.",

  // URLs
  url: "https://lavoplus.cl",
  domain: "lavoplus.cl",

  // Contacto
  contact: {
    phones: [
      {
        number: "+56979876294",
        display: "(56) 9 7987 6294",
        primary: true,
      },
    ],
    email: "lavanderia@lavoplus.cl",
    whatsapp: "+56979876294",
  },

  // Dirección física
  address: {
    street: "C. Monte Perdido 1496",
    city: "Los Ángeles",
    region: "Región del Bío Bío",
    postalCode: "4440000",
    country: "Chile",
    countryCode: "CL",
    full: "C. Monte Perdido 1496, Los Ángeles, Región del Bío Bío, Chile",
  },

  // Coordenadas geográficas
  geo: {
    latitude: -37.4476508,
    longitude: -72.331502,
  },

  // Redes sociales
  social: {
    facebook: "https://www.facebook.com/lavopluscl",
    instagram: "https://www.instagram.com/lavopluscl",
    twitter: "@lavopluscl",
  },

  // Horarios de atención
  hours: {
    weekdays: {
      days: "Lunes a Viernes",
      open: "09:00",
      close: "19:30",
      display: "9:00 AM - 7:30 PM",
    },
    saturday: {
      days: "Sábado",
      open: "09:00",
      close: "14:00",
      display: "9:00 AM - 2:00 PM",
    }
  },

  // Información del negocio
  business: {
    foundingYear: "2020",
    yearsOfExperience: "5",
    priceRange: "$$",
    currency: "CLP",
    paymentMethods: ["Efectivo", "Tarjeta", "Transferencia"],
    rating: {
      value: "4.9",
      count: "127",
      maxRating: "5",
    },
  },

  // Imágenes
  images: {
    logo: "/img/logo-lavaplus-original.webp",
    logoBlue: "/img/logo-lavoplus-azul.png",
    logoGoogle: "/img/logo-lavaplus-google.webp",
    ogImage: {
      url: "/opengraph-image.png",
      width: 1200,
      height: 630,
      alt: "Lavandería Lavoplus Los Ángeles - Servicio Profesional de Lavandería",
    },
  },

  // SEO Keywords - Optimizadas para búsquedas locales
  keywords: [
    // Keywords principales transaccionales
    "lavandería Los Ángeles",
    "lavanderia Los Angeles",
    "lavandería en Los Ángeles Chile",
    "lavanderia en Los Angeles Chile",
    "lavado por kilo Los Ángeles",
    "lavado por kilo Los Angeles",
    "lavandería a domicilio Los Ángeles",
    "lavanderia a domicilio Los Angeles",
    "lavandería delivery Los Ángeles",
    "lavanderia delivery Los Angeles",
    "lavado en seco Los Ángeles",
    // Keywords secundarias
    "lavado de plumones Los Ángeles",
    "lavado de plumones Los Angeles",
    "lavandería express Los Ángeles",
    "lavanderia express Los Angeles",
    "lavandería Bío Bío",
    "planchado profesional Los Ángeles",
    "planchado profesional Los Angeles",
    "lavandería Lavoplus",
    "lavanderia Lavoplus",
    "servicio de lavandería",
    "servicio de lavanderia",
    "lavado por kilo",
    "delivery lavandería",
    "delivery lavanderia",
    "recogida domicilio",
    // Keywords comerciales/empresariales
    "convenios empresariales lavandería",
    "convenios empresariales lavanderia",
    "lavado uniformes Los Ángeles",
    "lavado uniformes Los Angeles",
    "lavandería corporativa",
    "lavanderia corporativa",
    "lavandería hoteles Los Ángeles",
    "lavanderia hoteles Los Angeles",
    "lavandería clínicas",
    "lavanderia clinicas",
    // Keywords de intención local
    "lavandería cerca de mí",
    "lavanderia cerca de mi",
    "lavado Ropa Cama",
    "servicio express lavandería",
    "servicio express lavanderia",
    "lavandería ropa delicada",
    "lavanderia ropa delicada Los Angeles",
    "lavado ropa delicada Los Ángeles",
    "precios lavandería Los Ángeles",
    "precios lavanderia Los Angeles",
  ],

  // Servicios principales
  services: [
    {
      name: "Lavado por Kilo",
      description: "Ideal para ropa de uso diario. Lavamos, secamos y doblamos tu ropa con detergentes premium que cuidan los tejidos",
    },
    {
      name: "Lavado en Seco",
      description: "Para prendas delicadas, trajes, vestidos y ropa que requiere cuidado especial sin agua",
    },
    {
      name: "Planchado Profesional",
      description: "Camisas, blusas y ropa formal lista para usar con acabado impecable",
    },
    {
      name: "Lavado de Plumones y Edredones",
      description: "Limpieza profunda de ropa de cama, frazadas y cobertores con secado especializado",
    },
    {
      name: "Delivery a Domicilio",
      description: "Recogemos y entregamos tu ropa en tu hogar u oficina en Los Ángeles con horarios flexibles",
    },
  ],

  // Área de servicio
  serviceArea: {
    city: "Los Ángeles",
    region: "Región del Bío Bío",
    country: "Chile",
  },
} as const;

// Helper functions
export const getSiteUrl = (path: string = "") => {
  return `${siteConfig.url}${path}`;
};

export const getPrimaryPhone = () => {
  return siteConfig.contact.phones.find(p => p.primary) || siteConfig.contact.phones[0];
};

export const getWhatsAppLink = (message: string = "") => {
  const encodedMessage = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${siteConfig.contact.whatsapp.replace(/\+/g, "")}${encodedMessage}`;
};

export const getGoogleMapsLink = () => {
  return `https://www.google.com/maps/search/?api=1&query=${siteConfig.geo.latitude},${siteConfig.geo.longitude}`;
};
