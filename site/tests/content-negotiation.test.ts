import { describe, it, expect } from "bun:test";

// Extract the pure negotiation functions by re-implementing them identically
// to src/worker.ts so they can be unit-tested without the Cloudflare runtime.

function parseAccept(accept: string): { type: string; q: number }[] {
  return accept
    .split(",")
    .map((part) => {
      const [type, ...params] = part.split(";");
      let q = 1.0;
      for (const p of params) {
        const [k, v] = p.trim().split("=");
        if (k?.trim() === "q") {
          const parsed = parseFloat(v);
          if (!Number.isNaN(parsed)) q = parsed;
        }
      }
      return { type: type.trim().toLowerCase(), q };
    })
    .filter((entry) => entry.type.length > 0)
    .sort((a, b) => b.q - a.q);
}

function shouldServeMarkdown(accept: string): boolean {
  if (!accept) return false;
  const entries = parseAccept(accept);
  const markdown = entries.find(
    (e) => e.type === "text/markdown" || e.type === "application/markdown",
  );
  if (!markdown || markdown.q <= 0) return false;
  const html = entries.find((e) => e.type === "text/html" || e.type === "*/*" || e.type === "*");
  if (!html) return true;
  return markdown.q >= html.q;
}

describe("content negotiation (Markdown vs HTML)", () => {
  it("serves Markdown when only text/markdown is accepted", () => {
    expect(shouldServeMarkdown("text/markdown")).toBe(true);
  });

  it("serves HTML when only text/html is accepted", () => {
    expect(shouldServeMarkdown("text/html")).toBe(false);
  });

  it("serves HTML for an empty Accept header", () => {
    expect(shouldServeMarkdown("")).toBe(false);
  });

  it("serves Markdown when both are accepted with equal quality", () => {
    expect(shouldServeMarkdown("text/html, text/markdown")).toBe(true);
  });

  it("prefers HTML when HTML has higher quality than Markdown", () => {
    expect(shouldServeMarkdown("text/html; q=1.0, text/markdown; q=0.5")).toBe(false);
  });

  it("prefers Markdown when Markdown has higher quality than HTML", () => {
    expect(shouldServeMarkdown("text/markdown; q=1.0, text/html; q=0.5")).toBe(true);
  });

  it("serves Markdown for text/markdown, */*", () => {
    expect(shouldServeMarkdown("text/markdown, */*")).toBe(true);
  });

  it("does not serve Markdown for */* alone", () => {
    expect(shouldServeMarkdown("*/*")).toBe(false);
  });

  it("does not serve Markdown when q=0", () => {
    expect(shouldServeMarkdown("text/markdown; q=0")).toBe(false);
  });

  it("parseAccept sorts by quality descending", () => {
    const entries = parseAccept("text/html; q=0.5, text/markdown; q=1.0, text/plain; q=0.8");
    expect(entries[0].type).toBe("text/markdown");
    expect(entries[1].type).toBe("text/plain");
    expect(entries[2].type).toBe("text/html");
  });
});
