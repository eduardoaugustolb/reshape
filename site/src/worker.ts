/**
 * Cloudflare Worker fronting the Next.js static export.
 *
 * Serves static assets from `env.ASSETS` and performs agent-friendly content
 * negotiation: Markdown for the homepage and for 404s when the client requests
 * `Accept: text/markdown`; HTML otherwise.
 */

interface Env {
  ASSETS: Fetcher;
}

interface Fetcher {
  fetch(request: Request | string, init?: RequestInit): Promise<Response>;
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
  propagation: unknown;
}

interface AcceptEntry {
  type: string;
  q: number;
}

/** Parse an `Accept` header into { type, q } entries sorted by quality desc. */
function parseAccept(accept: string): AcceptEntry[] {
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

/**
 * Serve Markdown when text/markdown is acceptable and at least as preferred as
 * text/html. Pure Accept: text/html keeps HTML.
 */
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

// Agent-oriented Markdown rendering of the homepage.
const HOMEPAGE_MARKDOWN = `# ReShape

ReShape is an agent-native 3D modeling, sculpting, and mesh review system for Blender. It enables autonomous AI
agents, Codex, and 3D artists to model in passes, capture matched camera angles, and validate topology for 3D
printing, game engines, and animation.

## When to use this

Use ReShape when:
- You need to generate, model, sculpt, or review 3D assets in Blender from a reference image, concept art,
  written brief, or initial 3D mesh.
- You need iterative modeling passes: Blockout -> Volumes -> Surface.
- You need to capture and compare matching camera views (front, profile, three-quarter) across iterations.
- You need to validate mesh topology for production standards: manifold geometry, quad/triangle budgeting,
  normal orientation, non-overlapping UVs, watertight thickness for 3D printing.
- You want to execute Blender commands programmatically via the ReShape MCP server or invoke the \$reshape skill
  in Codex.

## How to call ReShape

- Codex Skill: call \$reshape followed by the task prompt, image reference, or target 3D asset path.
- MCP Server Endpoint: https://reshape.eduardoaugusto.work/mcp (Streamable HTTP transport)
- MCP Manifest: https://reshape.eduardoaugusto.work/.well-known/mcp.json

## Key Links & Resources

- Homepage: https://reshape.eduardoaugusto.work/
- Documentation & API: https://reshape.eduardoaugusto.work/docs/
- MCP Server & Tools: https://reshape.eduardoaugusto.work/mcp/
- Full Guide: https://reshape.eduardoaugusto.work/llms-full.txt
- Sitemap: https://reshape.eduardoaugusto.work/sitemap.xml
- GitHub Repository: https://github.com/eduardoaugustolb/reshape
- About: https://reshape.eduardoaugusto.work/about/
- Contact: https://reshape.eduardoaugusto.work/contact/
- Privacy: https://reshape.eduardoaugusto.work/privacy/
`;

// Agent-oriented Markdown rendering of a 404.
const NOT_FOUND_MARKDOWN = `# 404 · Page not found

The requested page could not be found on ReShape. Check the URL or browse the site map to find what you are
looking for.

## Where to go next

- [Homepage](/)
- [API Documentation](/docs/)
- [MCP Server](/mcp/)
- [Sitemap](/sitemap.xml)
- [llms.txt](/llms.txt)
- [About](/about/)
- [Contact](/contact/)
- [Privacy](/privacy/)
`;

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const accept = request.headers.get("Accept") || "";

    // --- Homepage content negotiation -------------------------------------
    if (url.pathname === "/" || url.pathname === "") {
      if (shouldServeMarkdown(accept)) {
        return new Response(HOMEPAGE_MARKDOWN, {
          status: 200,
          headers: {
            "Content-Type": "text/markdown; charset=utf-8",
            Vary: "Accept",
            "Cache-Control": "public, max-age=3600",
          },
        });
      }
      const html = await env.ASSETS.fetch(request);
      const headers = new Headers(html.headers);
      headers.set("Vary", "Accept");
      return new Response(html.body, {
        status: html.status,
        statusText: html.statusText,
        headers,
      });
    }

    // --- Serve static asset ----------------------------------------------
    let response = await env.ASSETS.fetch(request);

    // --- 404 content negotiation -----------------------------------------
    if (response.status === 404 && shouldServeMarkdown(accept)) {
      return new Response(NOT_FOUND_MARKDOWN, {
        status: 404,
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          Vary: "Accept",
          "Cache-Control": "public, max-age=300",
        },
      });
    }

    return response;
  },
};
