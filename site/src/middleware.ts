import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { HOMEPAGE_MARKDOWN, markdownResponse, wantsMarkdown } from "@/lib/markdown";

// Agent-oriented Markdown rendering of the homepage.
//
// Note: 404 Markdown negotiation is NOT done here. On Vercel the static
// 404 page is served directly from the CDN and never reaches middleware;
// unknown paths are handled by the catch-all route handler in
// src/app/[...slug]/route.ts.
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accept = request.headers.get("accept") || "";

  // --- Markdown content negotiation for the homepage -----------------------
  if (pathname === "/" && wantsMarkdown(accept)) {
    return markdownResponse(HOMEPAGE_MARKDOWN, 200);
  }

  // --- Serve static asset / proceed to Next.js -----------------------------
  const response = await NextResponse.next();

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
