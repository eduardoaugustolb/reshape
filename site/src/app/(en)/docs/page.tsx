import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ReShape API Documentation",
  description: "ReShape API reference for the Blender 3D modeling skill and Model Context Protocol (MCP) server.",
  alternates: { canonical: "https://reshape.eduardoaugusto.work/docs" },
  openGraph: {
    title: "ReShape API Documentation",
    description: "ReShape API reference for the Blender 3D modeling skill and Model Context Protocol (MCP) server.",
    type: "website",
    url: "https://reshape.eduardoaugusto.work/docs",
  },
};

export default function DocsPage() {
  return (
    <main className="main">
      <header className="masthead">
        <span className="masthead__brand">ReShape</span>
        <div className="masthead__links">
          <a href="/">Home</a>
          <a href="/mcp">MCP Server</a>
          <a href="/about">About</a>
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
          target 3D asset path. Use the{" "}
          <a href="https://github.com/eduardoaugustolb/reshape/blob/main/skills/reshape/references/anatomy.md">five anatomy skills</a>{" "}
          to find the guide for the region you are working on. Use <code>$reshape-styles</code> for style guidance.
        </p>
        <p>
          ReShape creates new realistic, stylized, or low-poly models and can sculpt or review existing meshes.
          Attach a visual reference or authorize the agent to search for one before it starts modeling.
          The review pairs each matching render with its reference and uses overlays for alignable views.
        </p>
      </section>

      <section className="section">
        <div className="section__head"><h2>Local mesh audit</h2></div>
        <p>
          Open the saved <code>.blend</code> in Blender background mode and pass the mesh object names to the
          installed audit script. Inspect the reported counts and topology separately from the captured views.
        </p>
        <pre><code>{`blender --background --disable-autoexec candidate.blend --python-exit-code 1 \\
  --python ~/.agents/skills/reshape/scripts/audit-mesh.py -- "Body" "Eyes"`}</code></pre>
        <p>
          See the{" "}
          <a href="https://github.com/eduardoaugustolb/reshape/blob/main/skills/reshape/references/validation.md#verify-mesh-and-intended-use">validation guide</a>{" "}
          for what the report measures and which checks require additional evidence.
        </p>
      </section>

      <section className="section">
        <div className="section__head"><h2>MCP server</h2></div>
        <p>
          Connect your agent to <code>https://reshape.eduardoaugusto.work/mcp</code> using Streamable HTTP
          transport. The manifest is at{" "}
          <a href="/.well-known/mcp.json">/.well-known/mcp.json</a>.
        </p>
        <p>The hosted service returns sample modeling and comparison responses. Connect Blender MCP to your local Blender session for scene edits and captures.</p>
        <ul className="list">
          <li><code>reshape_model</code> returns a sample modeling response for the requested pass.</li>
          <li><code>reshape_compare_views</code> returns sample view URLs.</li>
          <li><code>reshape_validate_mesh</code> reports <code>unverified</code> with null measurements.</li>
          <li><code>reshape_list_skills</code> lists tool entry points.</li>
          <li><code>reshape_inspect_anatomy</code> returns sample inspection criteria. Use the installed anatomy guides for regional construction rules.</li>
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
