import { siteConfig, getSiteUrl } from "@/config/site";

export default function StructuredData() {
  // LocalBusiness Schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LaundryService",
    "@id": `${siteConfig.url}/#business`,
    "name": siteConfig.name,
    "alternateName": siteConfig.alternateName,
    "image": [
      getSiteUrl(siteConfig.images.logoGoogle),
      getSiteUrl(siteConfig.images.logo),
      getSiteUrl(siteConfig.images.logoBlue)
    ],
    "logo": getSiteUrl(siteConfig.images.logoGoogle),
    "url": siteConfig.url,
    "telephone": siteConfig.contact.phones.map(p => p.number),
    "email": siteConfig.contact.email,
    "priceRange": siteConfig.business.priceRange,
    "currenciesAccepted": siteConfig.business.currency,
    "paymentAccepted": siteConfig.business.paymentMethods,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.address.street,
      "addressLocality": siteConfig.address.city,
      "addressRegion": siteConfig.address.region,
      "postalCode": siteConfig.address.postalCode,
      "addressCountry": siteConfig.address.countryCode
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": siteConfig.geo.latitude,
      "longitude": siteConfig.geo.longitude
    },
    "areaServed": [
      {
        "@type": "City",
        "name": siteConfig.serviceArea.city,
        "containedIn": {
          "@type": "State",
          "name": siteConfig.serviceArea.region
        }
      }
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": siteConfig.hours.weekdays.open,
        "closes": siteConfig.hours.weekdays.close
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": siteConfig.hours.saturday.open,
        "closes": siteConfig.hours.saturday.close
      }
    ],
    "sameAs": [
      siteConfig.social.facebook,
      siteConfig.social.instagram
    ],
    "description": siteConfig.description,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": siteConfig.business.rating.value,
      "bestRating": siteConfig.business.rating.maxRating,
      "worstRating": "1",
      "reviewCount": siteConfig.business.rating.count
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios de Lavandería",
      "itemListElement": siteConfig.services.map(service => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service.name,
          "description": service.description,
          "provider": {
            "@id": `${siteConfig.url}/#business`
          }
        }
      }))
    }
  };

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    "name": siteConfig.name,
    "url": siteConfig.url,
    "logo": getSiteUrl(siteConfig.images.logoGoogle),
    "foundingDate": siteConfig.business.foundingYear,
    "description": siteConfig.description,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": siteConfig.contact.phones[0].number,
      "contactType": "customer service",
      "areaServed": siteConfig.address.countryCode,
      "availableLanguage": ["Spanish"]
    }
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Qué servicios de lavandería ofrecen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ofrecemos lavado por kilo, lavado en seco, planchado profesional, servicio express y delivery a domicilio. Todos nuestros servicios utilizan productos premium y equipos de última generación."
        }
      },
      {
        "@type": "Question",
        "name": `¿Hacen delivery en ${siteConfig.address.city}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Sí, ofrecemos servicio de recolección y entrega a domicilio en ${siteConfig.address.city} y ${siteConfig.address.region}. Contamos con rutas diarias para garantizar entregas puntuales.`
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuál es el horario de atención?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Atendemos de ${siteConfig.hours.weekdays.days} de ${siteConfig.hours.weekdays.display} y ${siteConfig.hours.saturday.days} de ${siteConfig.hours.saturday.display}}.`
        }
      },
      {
        "@type": "Question",
        "name": "¿Ofrecen servicio express?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, contamos con servicio express para lavado y entrega el mismo día. Ideal para emergencias y necesidades urgentes."
        }
      },
      {
        "@type": "Question",
        "name": "¿Tienen convenios empresariales?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, ofrecemos convenios corporativos con tarifas preferenciales para empresas, incluyendo lavado de uniformes y ropa de trabajo."
        }
      }
    ]
  };

  // WebSite Schema for search
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    "url": siteConfig.url,
    "name": `${siteConfig.name} ${siteConfig.address.city}`,
    "description": `Lavandería profesional con delivery en ${siteConfig.address.city}, ${siteConfig.address.region}`,
    "publisher": {
      "@id": `${siteConfig.url}/#organization`
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteConfig.url}/#servicios?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
