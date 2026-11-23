import { describe, it, expect } from "bun:test";
import {
  NOT_FOUND_MARKDOWN,
  HOMEPAGE_MARKDOWN,
  wantsMarkdown,
  markdownNotFound,
  markdownResponse,
  htmlNotFound,
} from "../src/lib/markdown";

function req(accept: string): Request {
  return new Request("https://reshape.eduardoaugusto.work/__probe", {
    headers: { Accept: accept },
  });
}

describe("Markdown 404 negotiation (catch-all route logic)", () => {
  it("wantsMarkdown detects text/markdown in the Accept header", () => {
    expect(wantsMarkdown("text/markdown")).toBe(true);
    expect(wantsMarkdown("text/html, text/markdown")).toBe(true);
    expect(wantsMarkdown("text/html")).toBe(false);
    expect(wantsMarkdown("")).toBe(false);
  });

  it("returns a Markdown 404 for agents asking for text/markdown", async () => {
    const res = markdownNotFound(req("text/markdown"));
    expect(res).not.toBeNull();
    expect(res!.status).toBe(404);
    expect(res!.headers.get("content-type")).toBe("text/markdown; charset=utf-8");
    expect(res!.headers.get("vary")).toBe("Accept");
    const body = await res!.text();
    expect(body.length).toBeGreaterThanOrEqual(20);
    expect(body).toContain("# 404");
    expect(body).toContain("/docs");
    expect(body).toContain("/sitemap.xml");
    expect(body).toContain("/llms.txt");
  });

  it("returns null for browsers so the HTML 404 page is rendered", () => {
    expect(markdownNotFound(req("text/html"))).toBeNull();
    expect(markdownNotFound(req("*/*"))).toBeNull();
  });

  it("markdownResponse sets content type, vary and status", () => {
    const res = markdownResponse("# hi", 200);
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toBe("text/markdown; charset=utf-8");
    expect(res.headers.get("vary")).toBe("Accept");
  });

  it("homepage Markdown document links agent entry points", () => {
    expect(HOMEPAGE_MARKDOWN).toContain("/mcp");
    expect(HOMEPAGE_MARKDOWN).toContain("/openapi.json");
    expect(HOMEPAGE_MARKDOWN).toContain("/.well-known/mcp.json");
    expect(HOMEPAGE_MARKDOWN).toContain("/docs");
    expect(HOMEPAGE_MARKDOWN).toContain("/llms-full.txt");
  });

  it("404 Markdown links match live (no trailing slash) URLs", () => {
    for (const link of ["/docs", "/sitemap.xml", "/llms.txt", "/about", "/contact", "/privacy", "/mcp", "/openapi.json"]) {
      expect(NOT_FOUND_MARKDOWN).toContain(link);
    }
  });

  it("HTML 404 fallback is a branded page with the same links", async () => {
    const res = htmlNotFound();
    expect(res.status).toBe(404);
    expect(res.headers.get("content-type")).toBe("text/html; charset=utf-8");
    expect(res.headers.get("vary")).toBe("Accept");
    const body = await res.text();
    expect(body).toContain("404 · Page not found");
    expect(body).toContain('href="/docs"');
    expect(body).toContain('href="/sitemap.xml"');
    expect(body).toContain('href="/llms.txt"');
  });
});
