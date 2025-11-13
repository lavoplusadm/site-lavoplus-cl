/**
 * Configuración centralizada del sitio
 * Todos los datos de contacto, redes sociales y metadata del sitio
 */

export const siteConfig = {
  // Información básica
  name: "Lavandería Lavoplus",
  alternateName: "Lavoplus Los Ángeles",
  description: "Lavandería profesional en Los Ángeles, Región del Bío Bío con más de 5 años de experiencia. Ofrecemos lavado por kilo, lavado en seco, planchado y servicio express con productos premium.",

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
      close: "19:00",
      display: "9:00 AM - 7:30 PM",
    },
    saturday: {
      days: "Sábado",
      open: "08:00",
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
    logo: "/img/logo-lavaplus-original.png",
    logoBlue: "/img/logo-lavoplus-azul.png",
    ogImage: {
      url: "/img/logo-lavaplus-original.png",
      width: 1200,
      height: 630,
      alt: "Lavandería Lavoplus - Logo oficial",
    },
  },

  // SEO Keywords
  keywords: [
    "lavandería Los Ángeles",
    "lavandería Bío Bío",
    "lavandería Chile",
    "lavado en seco Los Ángeles",
    "planchado profesional",
    "lavandería Lavoplus",
    "servicio de lavandería",
    "lavado por kilo",
    "delivery lavandería",
    "recogida domicilio",
    "convenios empresariales",
    "lavado uniformes",
    "lavandería corporativa",
    "lavandería cerca de mí",
    "lavandería 24 horas",
    "lavado Ropa Cama",
    "servicio express lavandería",
  ],

  // Servicios principales
  services: [
    {
      name: "Lavado por Kilo",
      description: "Lavado tradicional de ropa por kilogramo con detergentes premium",
    },
    {
      name: "Lavado en Seco",
      description: "Servicio especializado para prendas delicadas",
    },
    {
      name: "Planchado Profesional",
      description: "Servicio de planchado profesional con equipos de última generación",
    },
    {
      name: "Servicio Express",
      description: "Lavado y entrega el mismo día para emergencias",
    },
    {
      name: "Delivery a Domicilio",
      description: "Servicio de recolección y entrega a domicilio en Los Ángeles",
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
