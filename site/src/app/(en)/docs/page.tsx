import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ReShape Docs — 3D Modeling in Blender with AI Agents",
  description: "Learn to model from a reference image in Blender with the ReShape skill for AI agents, then compare renders and audit the mesh. Includes MCP and API documentation.",
  alternates: { canonical: "https://reshape.eduardoaugusto.work/docs" },
  openGraph: {
    title: "ReShape Docs — 3D Modeling in Blender with AI Agents",
    description: "Learn to model from a reference image in Blender with the ReShape skill for AI agents, then compare renders and audit the mesh. Includes MCP and API documentation.",
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
          <Link href="/">Home</Link>
          <Link href="/mcp">MCP Server</Link>
          <Link href="/about">About</Link>
        </div>
      </header>

      <h1>3D modeling in Blender with AI agents</h1>
      <p className="lede">
        Reference for the ReShape 3D modeling skill and the ReShape Model Context Protocol (MCP) server for
        Blender. Use these docs to integrate ReShape into your AI agent workflows.
      </p>

      <section className="section">
        <div className="section__head"><h2>ReShape skill setup</h2></div>
        <p>
          <Link href="/#instalacao">Install the ReShape skill</Link> in your agent’s skills directory. ReShape works with agents that can load skills, including Codex, Claude Code, Cursor, and Antigravity. Ask your agent to use ReShape with a brief, image reference, or
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
        <div className="section__head"><h2>Model a 3D object from a reference image</h2></div>
        <ol className="list">
          <li>Open a Blender scene and connect your agent to your local session through Blender MCP.</li>
          <li>Share a reference image with your agent and ask it to use ReShape to block out the object and capture a matching view.</li>
          <li>Compare the blockout with the reference. For a vase, check the widest point, the height of the neck, and the shape of the opening before adding surface details.</li>
          <li>Capture the same view after each correction. Save the Blender file and use the mesh audit below for topology checks.</li>
        </ol>
        <p><Link href="/#comparacao">Compare a vase blockout and the finished surface</Link> from front, side, and three-quarter views.</p>
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
