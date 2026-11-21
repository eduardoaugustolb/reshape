import { SiteLayout, siteMetadata, viewportTheme } from "@/components/SiteLayout";

export const metadata = siteMetadata("pt-BR");
export const viewport = viewportTheme;

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteLayout locale="pt-BR">{children}</SiteLayout>;
}
