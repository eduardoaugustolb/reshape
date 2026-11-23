import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { translate, type Locale } from "@/i18n";
import "@/app/globals.css";

const sans = Inter({ variable: "--font-sans", subsets: ["latin"] });
const serif = Instrument_Serif({ variable: "--font-serif", subsets: ["latin"], weight: "400", style: "italic" });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });

const siteUrl = process.env.SITE_URL || "https://reshape.eduardoaugusto.work";

export function siteMetadata(locale: Locale): Metadata {
  const t = translate(locale);
  const title = t(
    "ReShape · Modelagem 3D e escultura no Blender",
    "ReShape · 3D Modeling and Sculpting in Blender",
  );
  const description = t(
    "Modele, compare vistas e valide a malha de ativos 3D no Blender com a ReShape.",
    "Model, compare views, and validate 3D meshes in Blender with ReShape.",
  );
  const path = t("/pt-br", "/");
  const canonicalUrl = path === "/" ? siteUrl : `${siteUrl}${path}`;
  const sharingImage = {
    url: `${siteUrl}/reshape/og.jpg`,
    width: 1200,
    height: 630,
    alt: t(
      "ReShape para Blender, com um vaso de terracota e sua malha 3D",
      "ReShape for Blender, with a terracotta vase and its 3D wireframe",
    ),
  };

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords: [
      "ReShape",
      "Blender 3D modeling",
      "Blender MCP",
      "3D sculpting",
      "mesh validation",
      "Codex skill",
      "3D assets",
    ],
    icons: { icon: "/reshape/icon.svg" },
    alternates: {
      canonical: canonicalUrl,
      languages: { "pt-BR": "/pt-br", "en-US": "/", "x-default": "/" },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      locale: t("pt_BR", "en_US"),
      siteName: "ReShape",
      type: "website",
      images: [sharingImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [sharingImage],
    },
  };
}

export const viewportTheme: Viewport = { themeColor: "#faf7f2" };

export function SiteLayout({ children, locale }: { children: React.ReactNode; locale: Locale }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": `${siteUrl}/#software`,
        name: "ReShape",
        applicationCategory: "DesignApplication",
        operatingSystem: "Blender 4.x, Linux, macOS, Windows",
        description:
          "Model, sculpt, and review 3D assets in Blender with Codex and Blender MCP. Compare matching views each round to decide what to correct.",
        url: `${siteUrl}/`,
        image: `${siteUrl}/reshape/og.jpg`,
        keywords: "ReShape, Blender 3D modeling, Blender MCP, 3D sculpting, mesh validation, 3D assets",
        knowsAbout: [
          "3D Modeling",
          "Blender",
          "Model Context Protocol",
          "Mesh Sculpting",
          "Computer Graphics",
          "3D Mesh Validation",
        ],
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        author: {
          "@id": `${siteUrl}/#organization`,
        },
        sameAs: ["https://github.com/eduardoaugustolb/reshape"],
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "ReShape",
        url: `${siteUrl}/`,
        logo: `${siteUrl}/reshape/icon.svg`,
        description:
          "Developer of ReShape, an agentic 3D modeling, sculpting, and mesh validation system for Blender.",
        sameAs: ["https://github.com/eduardoaugustolb/reshape"],
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: "contact@eduardoaugusto.work",
            url: `${siteUrl}/contact`,
          },
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: "Av. Paulista",
          addressLocality: "São Paulo",
          addressRegion: "SP",
          postalCode: "01310-100",
          addressCountry: "BR",
        },
      },
    ],
  };

  return (
    <html lang={locale} className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
