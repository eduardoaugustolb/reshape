import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ReShape MCP Server",
  description: "ReShape Model Context Protocol (MCP) server for Blender — Streamable HTTP endpoint and manifest.",
  alternates: { canonical: "https://reshape.eduardoaugusto.work/mcp/" },
  openGraph: {
    title: "ReShape MCP Server",
    description: "ReShape Model Context Protocol (MCP) server for Blender — Streamable HTTP endpoint and manifest.",
    type: "website",
    url: "https://reshape.eduardoaugusto.work/mcp/",
  },
};

export default function McpPage() {
  return (
    <main className="main">
      <header className="masthead">
        <span className="masthead__brand">ReShape</span>
        <div className="masthead__links">
          <a href="/">Home</a>
          <a href="/docs/">API Documentation</a>
          <a href="/about/">About</a>
        </div>
      </header>

      <h1>ReShape MCP Server</h1>
      <p className="lede">
        The ReShape Model Context Protocol (MCP) server exposes Blender 3D modeling, sculpting, and mesh
        validation as tools that AI agents can call natively.
      </p>

      <section className="section">
        <div className="section__head"><h2>Endpoint</h2></div>
        <p>
          Transport: Streamable HTTP<br />
          Endpoint:{" "}
          <a href="https://reshape.eduardoaugusto.work/mcp">
            https://reshape.eduardoaugusto.work/mcp
          </a>
        </p>
        <p>
          Manifest:{" "}
          <a href="/.well-known/mcp.json">/.well-known/mcp.json</a>
        </p>
      </section>

      <section className="section">
        <div className="section__head"><h2>Tools</h2></div>
        <ul className="list">
          <li>
            <code>reshape_model</code> — create or edit a 3D asset in Blender (blockout, volumes, surface).
          </li>
          <li>
            <code>reshape_compare_views</code> — render matching front, profile, three-quarter, and top views.
          </li>
          <li>
            <code>reshape_validate_mesh</code> — audit manifoldness, normals, triangle count, watertightness.
          </li>
          <li>
            <code>reshape_list_skills</code> — list anatomy and style skills.
          </li>
          <li>
            <code>reshape_inspect_anatomy</code> — anatomy landmarks, review angles, rejection criteria.
          </li>
        </ul>
        <p>
          Full JSON-RPC 2.0 method reference is in the{" "}
          <a href="/docs/">ReShape API Documentation</a> and the agent guide at{" "}
          <a href="/llms-full.txt">/llms-full.txt</a>.
        </p>
      </section>

      <section className="section">
        <div className="section__head"><h2>Connect in your agent</h2></div>
        <ul className="list">
          <li>
            Claude Code / Cursor / Windsurf / ChatGPT: add the MCP server at{" "}
            <code>https://reshape.eduardoaugusto.work/mcp</code> using Streamable HTTP transport.
          </li>
          <li>
            Codex: invoke <code>$reshape</code> (the ReShape skill) instead.
          </li>
        </ul>
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
