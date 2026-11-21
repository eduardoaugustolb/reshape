import { SiteLayout, siteMetadata, viewportTheme } from "@/components/SiteLayout";

export const metadata = siteMetadata("en-US");
export const viewport = viewportTheme;

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteLayout locale="en-US">{children}</SiteLayout>;
}
