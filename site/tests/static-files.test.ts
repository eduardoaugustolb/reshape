import { describe, it, expect } from "bun:test";
import { readFileSync } from "fs";
import { join } from "path";

const SITE = join(import.meta.dir, "..");

function read(path: string): string {
  return readFileSync(join(SITE, path), "utf8");
}

describe("agent-ready static files", () => {
  it("sitemap.xml is valid and lists all indexable URLs", () => {
    const xml = read("public/sitemap.xml");
    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    for (const url of [
      "https://reshape.eduardoaugusto.work/",
      "https://reshape.eduardoaugusto.work/pt-br/",
      "https://reshape.eduardoaugusto.work/docs/",
      "https://reshape.eduardoaugusto.work/mcp/",
      "https://reshape.eduardoaugusto.work/about/",
      "https://reshape.eduardoaugusto.work/contact/",
      "https://reshape.eduardoaugusto.work/privacy/",
    ]) {
      expect(xml).toContain(`<loc>${url}</loc>`);
      expect(xml).toContain("<lastmod>");
    }
  });

  it("robots.txt allows crawling and declares the sitemap", () => {
    const robots = read("public/robots.txt");
    expect(robots).toContain("User-agent: *");
    expect(robots).toContain("Allow: /");
    expect(robots).toContain("Sitemap: https://reshape.eduardoaugusto.work/sitemap.xml");
  });

  it("llms.txt has a when-to-use section and key links", () => {
    const llms = read("public/llms.txt");
    expect(llms).toMatch(/## When to use this/);
    expect(llms).toContain("https://reshape.eduardoaugusto.work/docs/");
    expect(llms).toContain("https://reshape.eduardoaugusto.work/mcp/");
    expect(llms).toContain("https://reshape.eduardoaugusto.work/sitemap.xml");
    expect(llms).toContain("https://github.com/eduardoaugustolb/reshape");
  });

  it("agent-instructions.txt exists with when-to-use guidance", () => {
    const ai = read("public/agent-instructions.txt");
    expect(ai).toMatch(/## When to Use This Tool/);
    expect(ai).toContain("https://reshape.eduardoaugusto.work/mcp");
  });

  it("MCP manifest declares Streamable HTTP transport and tools", () => {
    const manifest = JSON.parse(read("public/.well-known/mcp.json"));
    expect(manifest.transport.type).toBe("streamable-http");
    expect(manifest.transport.endpoint).toBe("https://reshape.eduardoaugusto.work/mcp");
    expect(Array.isArray(manifest.tools)).toBe(true);
    expect(manifest.tools.length).toBeGreaterThan(0);
    expect(manifest.homepage).toBe("https://reshape.eduardoaugusto.work/mcp/");
    expect(manifest.documentation).toBe("https://reshape.eduardoaugusto.work/docs/");
  });

  it("MCP manifest is also exposed at /mcp/manifest.json", () => {
    const manifest = JSON.parse(read("public/mcp/manifest.json"));
    expect(manifest.name).toBe("reshape-mcp-server");
    expect(manifest.transport.type).toBe("streamable-http");
  });

  it("source pages exist for trust anchors and developer resources", () => {
    for (const page of [
      "src/app/(en)/about/page.tsx",
      "src/app/(en)/contact/page.tsx",
      "src/app/(en)/privacy/page.tsx",
      "src/app/(en)/docs/page.tsx",
      "src/app/(en)/mcp/page.tsx",
      "src/app/not-found.tsx",
    ]) {
      expect(read(page).length).toBeGreaterThan(0);
    }
  });

  it("trust anchor pages have substantive content (>500 visible chars)", () => {
    const stripTags = (html: string) =>
      html
        .replace(/<script[\s\S]*?<\/script>/g, " ")
        .replace(/<style[\s\S]*?<\/style>/g, " ")
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    for (const page of ["about", "contact", "privacy"]) {
      const visible = stripTags(read(`src/app/(en)/${page}/page.tsx`));
      expect(visible.length).toBeGreaterThan(500, `${page} should have >500 chars of content`);
    }
  });
});
