import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Inter({ variable: "--font-sans", subsets: ["latin"] });
const serif = Instrument_Serif({ variable: "--font-serif", subsets: ["latin"], weight: "400", style: "italic" });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });

const siteUrl = process.env.SITE_URL;
const title = "ReShape · Modelagem e escultura no Blender";
const description = "Modele, compare vistas e valide a malha de ativos 3D no Blender com a ReShape.";

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title,
  description,
  alternates: siteUrl ? { canonical: "/" } : undefined,
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "ReShape",
    type: "website",
    images: siteUrl ? [{ url: "/reshape/surface-three-quarter.webp", width: 720, height: 580, alt: "Vaso de terracota esculpido" }] : undefined,
  },
  twitter: { card: "summary_large_image", title, description, images: siteUrl ? ["/reshape/surface-three-quarter.webp"] : undefined },
};

export const viewport: Viewport = { themeColor: "#faf7f2" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
