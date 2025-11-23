import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import BackToTop from "@/components/BackToTop";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ReCaptchaProvider from "@/components/ReCaptchaProvider";
import WebVitals from "@/components/WebVitals";
import { generateAllSchemas } from "@/lib/seo";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Solo pesos usados para reducir tamaño
  display: "swap", // Optimización: mostrar fuente de fallback mientras carga
  preload: true,
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true, // Ajustar métricas de fuente fallback
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.url;

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} Los Ángeles | Delivery & Convenios Empresariales`,
    template: `%s | ${siteConfig.name} Los Ángeles`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-144x144.png", sizes: "144x144", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon-32x32.png",
  },
  alternates: {
    canonical: "/",
    languages: {
      "es-CL": "/",
    },
  },
  category: "business",
  classification: "Servicios de Lavandería",
  openGraph: {
    title: `${siteConfig.name} Los Ángeles | Delivery & Convenios Empresariales`,
    description: `Lavandería profesional en ${siteConfig.address.city}, ${siteConfig.address.region} con +${siteConfig.business.yearsOfExperience} años de experiencia. Servicio de delivery a domicilio y convenios corporativos. Lavado por kilo, lavado en seco, planchado.`,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "es_CL",
    type: "website",
    phoneNumbers: siteConfig.contact.phones.map((p) => p.number),
    emails: [siteConfig.contact.email],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} Los Ángeles | Delivery & Convenios Empresariales`,
    description: `Lavandería profesional en Los Ángeles con servicio de delivery a domicilio y convenios corporativos. +${siteConfig.business.yearsOfExperience} años de experiencia.`,
    creator: siteConfig.social.twitter,
    site: siteConfig.social.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // TODO: Reemplazar con el código real de Google Search Console
    // Obtenerlo en: https://search.google.com/search-console
    // Ir a Configuración > Verificación de propiedad > Etiqueta HTML
    google: "tu-codigo-de-verificacion-google",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemas = generateAllSchemas();

  return (
    <html lang="es">
      <head>
        {/* Preconnect to external origins for faster resource loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* JSON-LD Structured Data for SEO */}
        {schemas.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body className={`${inter.variable} antialiased`}>
        <WebVitals />
        <ReCaptchaProvider>
          {children}
          <BackToTop />
          <FloatingWhatsApp />
        </ReCaptchaProvider>
      </body>
    </html>
  );
}
