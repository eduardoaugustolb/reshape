import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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
- OpenAPI spec: https://reshape.eduardoaugusto.work/openapi.json

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
- [OpenAPI spec](/openapi.json)
- [MCP Server](/mcp/)
- [Sitemap](/sitemap.xml)
- [llms.txt](/llms.txt)
- [About](/about/)
- [Contact](/contact/)
- [Privacy](/privacy/)
`;

function wantsMarkdown(accept: string): boolean {
  return accept.includes("text/markdown");
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accept = request.headers.get("accept") || "";

  // --- Markdown content negotiation for the homepage -----------------------
  if (pathname === "/" && wantsMarkdown(accept)) {
    return new Response(HOMEPAGE_MARKDOWN, {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        Vary: "Accept",
        "Cache-Control": "public, max-age=3600",
      },
    });
  }

  // --- Serve static asset / proceed to Next.js -----------------------------
  const response = await NextResponse.next();

  // --- Agent-friendly Markdown 404 ----------------------------------------
  if (response.status === 404 && wantsMarkdown(accept)) {
    return new Response(NOT_FOUND_MARKDOWN, {
      status: 404,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        Vary: "Accept",
        "Cache-Control": "public, max-age=300",
      },
    });
  }

  // Ensure Vary: Accept is present on HTML responses for content negotiation
  if (pathname === "/" && response.headers.get("content-type")?.includes("text/html")) {
    const headers = new Headers(response.headers);
    headers.set("Vary", "Accept");
    return new Response(response.body, {
      status: response.status,
      headers,
    });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - files with extensions (e.g. .png, .jpg, .json, .xml, .txt)
     * - /api/* (handled by route handlers)
     * - /mcp (handled by route handler)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*|api|mcp).*)",
  ],
};
