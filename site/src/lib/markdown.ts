/**
 * Agent-oriented Markdown content for ReShape, shared by the Edge
 * middleware (homepage negotiation) and the catch-all route handler
 * (Markdown 404s). Vercel serves the static 404 page straight from the
 * CDN, bypassing middleware, so unknown paths are answered by
 * src/app/[...slug]/route.ts instead.
 */

export const HOMEPAGE_MARKDOWN = `# ReShape

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
- You want to execute Blender commands programmatically via the ReShape MCP server or invoke the $reshape skill
  in Codex.

## How to call ReShape

- Codex Skill: call $reshape followed by the task prompt, image reference, or target 3D asset path.
- MCP Server Endpoint: https://reshape.eduardoaugusto.work/mcp (Streamable HTTP transport)
- MCP Manifest: https://reshape.eduardoaugusto.work/.well-known/mcp.json
- OpenAPI spec: https://reshape.eduardoaugusto.work/openapi.json

## Key Links & Resources

- Homepage: https://reshape.eduardoaugusto.work/
- Documentation & API: https://reshape.eduardoaugusto.work/docs
- MCP Server & Tools: https://reshape.eduardoaugusto.work/mcp
- Full Guide: https://reshape.eduardoaugusto.work/llms-full.txt
- Sitemap: https://reshape.eduardoaugusto.work/sitemap.xml
- GitHub Repository: https://github.com/eduardoaugustolb/reshape
- About: https://reshape.eduardoaugusto.work/about
- Contact: https://reshape.eduardoaugusto.work/contact
- Privacy: https://reshape.eduardoaugusto.work/privacy
`;

export const NOT_FOUND_MARKDOWN = `# 404 · Page not found

The requested page could not be found on ReShape. Check the URL or browse the site map to find what you are
looking for.

## Where to go next

- [Homepage](/)
- [API Documentation](/docs)
- [OpenAPI spec](/openapi.json)
- [MCP Server](/mcp)
- [Sitemap](/sitemap.xml)
- [llms.txt](/llms.txt)
- [About](/about)
- [Contact](/contact)
- [Privacy](/privacy)
`;

export function wantsMarkdown(accept: string): boolean {
  return accept.includes("text/markdown");
}

export function markdownResponse(body: string, status: number): Response {
  return new Response(body, {
    status,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
      "Cache-Control": "public, max-age=300",
    },
  });
}

/**
 * Returns a Markdown 404 response when the request's Accept header asks for
 * Markdown, or null when the caller should fall back to the HTML 404 page.
 */
export function markdownNotFound(request: Request): Response | null {
  const accept = request.headers.get("accept") || "";
  if (!wantsMarkdown(accept)) return null;
  return markdownResponse(NOT_FOUND_MARKDOWN, 404);
}

// Minimal branded HTML 404 for the catch-all route handler. (Calling
// notFound() inside a route handler returns an empty body on Vercel, so the
// HTML variant is rendered here directly; not-found.tsx still covers
// notFound() thrown from pages.)
export const NOT_FOUND_HTML = `<!doctype html>
<html lang="en-US">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>404 · Not Found · ReShape</title>
<meta name="description" content="The requested page could not be found on ReShape."/>
<link rel="canonical" href="https://reshape.eduardoaugusto.work/"/>
</head>
<body>
<main>
  <header>
    <span>ReShape</span>
    <nav>
      <a href="/">Home</a>
      <a href="/docs">API Documentation</a>
      <a href="/sitemap.xml">Sitemap</a>
    </nav>
  </header>
  <h1>404 · Page not found</h1>
  <p>The page you requested could not be found on ReShape. Check the URL or browse the site map to find what you are looking for.</p>
  <section>
    <h2>Where to go next</h2>
    <ul>
      <li><a href="/">Homepage</a> — ReShape 3D modeling and sculpting for Blender.</li>
      <li><a href="/docs">ReShape API Documentation</a> — skill and MCP server reference.</li>
      <li><a href="/openapi.json">OpenAPI spec</a> — machine-readable API description.</li>
      <li><a href="/sitemap.xml">Sitemap</a> — full list of indexable pages.</li>
      <li><a href="/llms.txt">llms.txt</a> — agent-oriented site guide and when-to-use guidance.</li>
    </ul>
  </section>
  <footer>
    <span>ReShape · MIT license</span>
    <span>Source: <a href="https://github.com/eduardoaugustolb/reshape">github.com/eduardoaugustolb/reshape</a></span>
  </footer>
</main>
</body>
</html>
`;

export function htmlNotFound(): Response {
  return new Response(NOT_FOUND_HTML, {
    status: 404,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      Vary: "Accept",
      "Cache-Control": "public, max-age=300",
    },
  });
}
