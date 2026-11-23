import { describe, it, expect } from "bun:test";
import { readFileSync } from "fs";
import { join } from "path";

// Source-level guarantees for the server-rendered (Vercel) build.
// The old static `out/` export no longer exists; these checks run against
// the page sources that Next.js renders.
const SITE = join(import.meta.dir, "..");

function read(path: string): string {
  return readFileSync(join(SITE, path), "utf8");
}

describe("server-rendered pages (source-level)", () => {
  it("trust anchor pages declare canonical URLs without trailing slashes", () => {
    for (const [page, canonical] of [
      ["about", "https://reshape.eduardoaugusto.work/about"],
      ["contact", "https://reshape.eduardoaugusto.work/contact"],
      ["privacy", "https://reshape.eduardoaugusto.work/privacy"],
      ["docs", "https://reshape.eduardoaugusto.work/docs"],
    ] as const) {
      const src = read(`src/app/(en)/${page}/page.tsx`);
      expect(src).toContain(`canonical: "${canonical}"`);
      expect(src).toContain(`url: "${canonical}"`);
    }
  });

  it("homepage layout emits agent-ready metadata (JSON-LD, canonical, og)", () => {
    const layout = read("src/components/SiteLayout.tsx");
    expect(layout).toContain('"@type": "SoftwareApplication"');
    expect(layout).toContain('"@type": "Organization"');
    expect(layout).toContain("contactPoint");
    expect(layout).toContain("canonical");
  });

  it("404 page explains the error and links to docs/sitemap/llms", () => {
    const src = read("src/app/not-found.tsx");
    expect(src).toContain("404 · Page not found");
    expect(src).toContain("could not be found");
    expect(src).toContain('href="/docs"');
    expect(src).toContain('href="/sitemap.xml"');
    expect(src).toContain('href="/llms.txt"');
  });

  it("catch-all route handler exists for Markdown 404 negotiation", () => {
    const route = read("src/app/[...slug]/route.ts");
    expect(route).toContain("markdownNotFound");
    expect(route).toContain("notFound()");
  });

  it("sitemap.xml and robots.txt are served from public root", () => {
    expect(read("public/sitemap.xml")).toContain("<urlset");
    expect(read("public/robots.txt")).toContain("Sitemap: https://reshape.eduardoaugusto.work/sitemap.xml");
  });
});
