import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ReShape API Documentation",
  description: "ReShape API reference for the Blender 3D modeling skill and Model Context Protocol (MCP) server.",
  alternates: { canonical: "https://reshape.eduardoaugusto.work/docs/" },
  openGraph: {
    title: "ReShape API Documentation",
    description: "ReShape API reference for the Blender 3D modeling skill and Model Context Protocol (MCP) server.",
    type: "website",
    url: "https://reshape.eduardoaugusto.work/docs/",
  },
};

export default function DocsPage() {
  return (
    <main className="main">
      <header className="masthead">
        <span className="masthead__brand">ReShape</span>
        <div className="masthead__links">
          <a href="/">Home</a>
          <a href="/mcp/">MCP Server</a>
          <a href="/about/">About</a>
        </div>
      </header>

      <h1>ReShape API Documentation</h1>
      <p className="lede">
        Reference for the ReShape 3D modeling skill and the ReShape Model Context Protocol (MCP) server for
        Blender. Use these docs to integrate ReShape into your AI agent workflows.
      </p>

      <section className="section">
        <div className="section__head"><h2>ReShape skill (Codex)</h2></div>
        <p>
          Install the ReShape package in Codex and invoke <code>$reshape</code> with a brief, image reference, or
          target 3D asset path. Use <code>$reshape-anatomy-&lt;region&gt;</code> for anatomy-specific guidance and
          <code>$reshape-styles</code> for style conventions (low-poly, cel shading, cartoon, realism, clay).
        </p>
      </section>

      <section className="section">
        <div className="section__head"><h2>MCP server</h2></div>
        <p>
          Connect your agent to <code>https://reshape.eduardoaugusto.work/mcp</code> using Streamable HTTP
          transport. The manifest is at{" "}
          <a href="/.well-known/mcp.json">/.well-known/mcp.json</a>.
        </p>
        <ul className="list">
          <li><code>reshape_model</code> — create or edit a 3D asset in Blender through modeling passes.</li>
          <li><code>reshape_compare_views</code> — render matching camera views across iterations.</li>
          <li><code>reshape_validate_mesh</code> — run topology audits (manifoldness, normals, triangle count).</li>
          <li><code>reshape_list_skills</code> — list anatomy and style skills.</li>
          <li><code>reshape_inspect_anatomy</code> — retrieve anatomy construction rules for a region.</li>
        </ul>
      </section>

      <section className="section">
        <div className="section__head"><h2>Full guide</h2></div>
        <p>
          Read the complete agent-oriented specification at{" "}
          <a href="/llms-full.txt">/llms-full.txt</a>. The sitemap is at{" "}
          <a href="/sitemap.xml">/sitemap.xml</a>.
        </p>
      </section>

      <footer className="footer">
        <span>ReShape · MIT license</span>
        <span>
          Source:{" "}
          <a href="https://github.com/eduardoaugustolb/reshape">github.com/eduardoaugustolb/reshape</a>
        </span>
      </footer>
    </main>
  );
}
