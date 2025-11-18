import type { Metadata } from "next";
import { headers } from "next/headers";
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
  display: "swap", // Optimización: mostrar fuente de fallback mientras carga
  preload: true,
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true, // Ajustar métricas de fuente fallback
});

export async function generateMetadata(): Promise<Metadata> {
  const headersList = headers();
  const forwardedHost = headersList.get("x-forwarded-host");
  const host =
    forwardedHost ?? headersList.get("host") ?? new URL(siteConfig.url).host;
  const forwardedProto = headersList.get("x-forwarded-proto");
  const protocol =
    forwardedProto ??
    (host?.includes("localhost") || host?.includes("127.0.0.1")
      ? "http"
      : "https");
  const baseUrl = `${protocol}://${host}`;

  const metadataBase = new URL(baseUrl);

  return {
    title: {
      default: `${siteConfig.name} Los Ángeles | Delivery & Convenios Empresariales`,
      template: `%s | ${siteConfig.name} Los Ángeles`,
    },
    description: siteConfig.description,
    keywords: [...siteConfig.keywords],
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    metadataBase,
    icons: {
      icon: [
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon.ico", sizes: "32x32" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
      shortcut: "/favicon.ico",
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
      google: "tu-codigo-de-verificacion-google",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemas = generateAllSchemas();

  return (
    <html lang="es">
      <head>
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
