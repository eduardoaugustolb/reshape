import { notFound } from "next/navigation";
import { markdownNotFound } from "@/lib/markdown";

// Catch-all for paths no page or route handler claims. Vercel serves the
// static 404 page from the CDN without invoking middleware, so Markdown
// negotiation for 404s must happen here, in a dynamic route that is
// always executed.
export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  const markdown = markdownNotFound(request);
  if (markdown) return markdown;
  notFound();
}
