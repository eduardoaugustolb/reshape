import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About · ReShape",
  description: "About ReShape: an agentic 3D modeling, sculpting, and mesh validation system for Blender.",
  alternates: { canonical: "https://reshape.eduardoaugusto.work/about" },
  openGraph: {
    title: "About · ReShape",
    description: "About ReShape: an agentic 3D modeling, sculpting, and mesh validation system for Blender.",
    type: "website",
    url: "https://reshape.eduardoaugusto.work/about",
  },
};

export default function AboutPage() {
  return (
    <main className="main">
      <header className="masthead">
        <span className="masthead__brand">ReShape</span>
        <div className="masthead__links">
          <a href="/">Home</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy</a>
        </div>
      </header>

      <h1>About ReShape</h1>
      <p className="lede">
        ReShape is an agent-native 3D modeling, sculpting, and mesh review system for Blender. It enables
        autonomous AI agents, Codex, and 3D artists to model in passes, capture matched camera angles, and
        validate topology for 3D printing, game engines, and animation.
      </p>

      <section className="section">
        <div className="section__head"><h2>What ReShape is</h2></div>
        <p>
          ReShape is both a Codex skill and a Model Context Protocol (MCP) server. The skill ($reshape and the
          $reshape-anatomy-* / $reshape-styles modules) gives agents structured guidance for modeling, sculpting,
          and reviewing 3D assets. The MCP server exposes the same capabilities as tools over Streamable HTTP, so
          agents such as Claude Code, Cursor, and ChatGPT can call Blender natively.
        </p>
      </section>

      <section className="section">
        <div className="section__head"><h2>Who maintains it</h2></div>
        <p>
          ReShape is developed and maintained by Eduardo Augusto, an independent developer focused on agentic tools
          for 3D content creation. The project is open source under the MIT license and hosted on GitHub.
        </p>
        <p>
          The source code, issue tracker, and release history are at
          <a href="https://github.com/eduardoaugustolb/reshape">github.com/eduardoaugustolb/reshape</a>.
        </p>
      </section>

      <section className="section">
        <div className="section__head"><h2>Contact</h2></div>
        <p>
          Questions about ReShape, the MCP server, or this site can be sent to
          <a href="mailto:contact@eduardoaugusto.work">contact@eduardoaugusto.work</a>. See the
          <a href="/contact">Contact page</a> for more details.
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
