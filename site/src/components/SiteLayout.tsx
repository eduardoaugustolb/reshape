import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { translate, type Locale } from "@/i18n";
import "@/app/globals.css";

const sans = Inter({ variable: "--font-sans", subsets: ["latin"] });
const serif = Instrument_Serif({ variable: "--font-serif", subsets: ["latin"], weight: "400", style: "italic" });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });

const siteUrl = process.env.SITE_URL;
export function siteMetadata(locale: Locale): Metadata {
  const t = translate(locale);
  const title = t("ReShape · Modelagem e escultura no Blender", "ReShape · Modeling and sculpting in Blender");
  const description = t("Modele, compare vistas e valide a malha de ativos 3D no Blender com a ReShape.", "Model, compare views, and validate 3D meshes in Blender with ReShape.");
  const path = t("/pt-br/", "/");
  return {
    metadataBase: siteUrl ? new URL(siteUrl) : undefined,
    title,
    description,
    icons: { icon: "/reshape/icon.svg" },
    alternates: {
      canonical: siteUrl ? path : undefined,
      languages: { "pt-BR": "/pt-br/", "en-US": "/", "x-default": "/" },
    },
    openGraph: {
      title,
      description,
      url: siteUrl ? path : undefined,
      locale: t("pt_BR", "en_US"),
      siteName: "ReShape",
      type: "website",
      images: siteUrl ? [{ url: "/reshape/surface-three-quarter.webp", width: 720, height: 580, alt: t("Vaso de terracota esculpido", "Sculpted terracotta vase") }] : undefined,
    },
    twitter: { card: "summary_large_image", title, description, images: siteUrl ? ["/reshape/surface-three-quarter.webp"] : undefined },
  };
}

export const viewportTheme: Viewport = { themeColor: "#faf7f2" };

export function SiteLayout({ children, locale }: { children: React.ReactNode; locale: Locale }) {
  return (
    <html lang={locale} className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
