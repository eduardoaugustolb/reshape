import { describe, it, expect } from "bun:test";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

const OUT = join(import.meta.dir, "..", "out");
const built = existsSync(OUT);

function readBuilt(path: string): string | null {
  if (!built) return null;
  try {
    return readFileSync(join(OUT, path), "utf8");
  } catch {
    return null;
  }
}

const stripTags = (html: string) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

describe("built output (run after `bun run build`)", () => {
  it.skipIf(!built)("homepage serves HTML with agent-ready metadata", () => {
    const html = readBuilt("index.html")!;
    expect(html).toMatch(/<html lang="en-US"/);
    expect(html).toContain('<link rel="canonical" href="https://reshape.eduardoaugusto.work/"/>');
    expect(html).toContain('<meta property="og:type" content="website"/>');
    expect(html).toContain('<meta property="og:image" content="https://reshape.eduardoaugusto.work/reshape/og.jpg"/>');
    expect(html).toContain('application/ld+json');
    expect(html).toContain('"@type":"SoftwareApplication"');
    expect(html).toContain('"@type":"Organization"');
    expect(html).toContain("contactPoint");
  });

  it.skipIf(!built)("developer resource pages have product + API in title", () => {
    const docs = readBuilt("docs/index.html")!;
    const mcp = readBuilt("mcp/index.html")!;
    expect(docs).toContain("<title>ReShape API Documentation</title>");
    expect(mcp).toContain("<title>ReShape MCP Server</title>");
  });

  it.skipIf(!built)("trust anchor pages exist with canonical URLs", () => {
    for (const [page, canonical] of [
      ["about", "https://reshape.eduardoaugusto.work/about/"],
      ["contact", "https://reshape.eduardoaugusto.work/contact/"],
      ["privacy", "https://reshape.eduardoaugusto.work/privacy/"],
    ] as const) {
      const html = readBuilt(`${page}/index.html`)!;
      expect(html).toContain(`<link rel="canonical" href="${canonical}"/>`);
      const visible = stripTags(html);
      expect(visible.length).toBeGreaterThan(500, `${page} visible content > 500 chars`);
    }
  });

  it.skipIf(!built)("404 page explains the error and links to docs/sitemap/llms", () => {
    const html = readBuilt("404/index.html")!;
    expect(html).toContain("404 · Page not found");
    expect(html).toContain("could not be found");
    expect(html).toContain('href="/docs/"');
    expect(html).toContain('href="/sitemap.xml"');
    expect(html).toContain('href="/llms.txt"');
  });

  it.skipIf(!built)("sitemap.xml and robots.txt are copied to output root", () => {
    expect(readBuilt("sitemap.xml")).toContain("<urlset");
    expect(readBuilt("robots.txt")).toContain("Sitemap: https://reshape.eduardoaugusto.work/sitemap.xml");
  });
});
