import { Metadata } from 'next';
import { siteConfig, getSiteUrl } from '@/config/site';

/**
 * Utilidades SEO para Next.js
 */

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
  noindex?: boolean;
  nofollow?: boolean;
}

/**
 * Genera metadata optimizada para SEO
 */
export function generateMetadata({
  title,
  description = siteConfig.description,
  keywords = [],
  canonical,
  ogImage,
  noindex = false,
  nofollow = false,
}: SEOProps = {}): Metadata {
  const pageTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} Los Ángeles | Delivery & Convenios Empresariales`;

  const ogImageData = ogImage || {
    url: getSiteUrl(siteConfig.images.ogImage.url),
    width: siteConfig.images.ogImage.width,
    height: siteConfig.images.ogImage.height,
    alt: siteConfig.images.ogImage.alt,
  };

  return {
    title: pageTitle,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    alternates: {
      canonical: canonical || '/',
      languages: {
        'es-CL': canonical || '/',
      },
    },
    openGraph: {
      title: pageTitle,
      description,
      url: getSiteUrl(canonical || '/'),
      siteName: siteConfig.name,
      locale: 'es_CL',
      type: 'website',
      images: [
        {
          url: ogImageData.url,
          width: ogImageData.width,
          height: ogImageData.height,
          alt: ogImageData.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      images: [ogImageData.url],
      creator: siteConfig.social.twitter,
      site: siteConfig.social.twitter,
    },
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/**
 * Genera JSON-LD para LocalBusiness
 */
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': getSiteUrl('/#organization'),
    name: siteConfig.name,
    alternateName: siteConfig.alternateName,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: getSiteUrl(siteConfig.images.logo),
    image: getSiteUrl(siteConfig.images.ogImage.url),
    priceRange: siteConfig.business.priceRange,
    telephone: siteConfig.contact.phones[0].number,
    email: siteConfig.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: siteConfig.hours.weekdays.open,
        closes: siteConfig.hours.weekdays.close,
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: siteConfig.hours.saturday.open,
        closes: siteConfig.hours.saturday.close,
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: siteConfig.business.rating.value,
      reviewCount: siteConfig.business.rating.count,
      bestRating: siteConfig.business.rating.maxRating,
    },
    paymentAccepted: siteConfig.business.paymentMethods.join(', '),
    currenciesAccepted: siteConfig.business.currency,
    areaServed: {
      '@type': 'City',
      name: siteConfig.serviceArea.city,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: siteConfig.serviceArea.region,
      },
    },
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.instagram,
    ],
  };
}

/**
 * Genera JSON-LD para FAQ
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Genera JSON-LD para Service
 */
export function generateServiceSchema(service: {
  name: string;
  description: string;
  price?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.name,
    description: service.description,
    provider: {
      '@type': 'LocalBusiness',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: {
      '@type': 'City',
      name: siteConfig.serviceArea.city,
    },
    ...(service.price && {
      offers: {
        '@type': 'Offer',
        price: service.price,
        priceCurrency: siteConfig.business.currency,
      },
    }),
  };
}

/**
 * Genera JSON-LD para Breadcrumb
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: getSiteUrl(item.url),
    })),
  };
}

/**
 * Genera JSON-LD para Product (para items de lavandería)
 */
export function generateProductSchema(product: {
  name: string;
  description?: string;
  price: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description || `Servicio de ${product.name}`,
    image: product.image ? getSiteUrl(product.image) : getSiteUrl(siteConfig.images.logo),
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: siteConfig.business.currency,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: siteConfig.name,
      },
    },
    brand: {
      '@type': 'Brand',
      name: siteConfig.name,
    },
  };
}

/**
 * Genera JSON-LD para WebSite con SearchAction
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': getSiteUrl('/#website'),
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: {
      '@id': getSiteUrl('/#organization'),
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/precios?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Genera todas las etiquetas meta para SEO
 */
export function generateAllSchemas() {
  return [
    generateLocalBusinessSchema(),
    generateWebSiteSchema(),
  ];
}
