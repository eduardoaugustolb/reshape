import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 · Not Found · ReShape",
  description: "The requested page could not be found on ReShape.",
  openGraph: { title: "404 · Not Found · ReShape", type: "website" },
};

export default function NotFound() {
  return (
    <main className="main">
      <header className="masthead">
        <span className="masthead__brand">ReShape</span>
        <div className="masthead__links">
          <a href="/">Home</a>
          <a href="/docs">API Documentation</a>
          <a href="/sitemap.xml">Sitemap</a>
        </div>
      </header>

      <h1>404 · Page not found</h1>
      <p className="lede">
        The page you requested could not be found on ReShape. Check the URL or browse the site map to find what
        you are looking for.
      </p>

      <section className="section">
        <div className="section__head"><h2>Where to go next</h2></div>
        <ul className="list">
          <li>
            <a href="/">Homepage</a> — ReShape 3D modeling and sculpting for Blender.
          </li>
          <li>
            <a href="/docs">ReShape API Documentation</a> — skill and MCP server reference.
          </li>
          <li>
            <a href="/sitemap.xml">Sitemap</a> — full list of indexable pages.
          </li>
          <li>
            <a href="/llms.txt">llms.txt</a> — agent-oriented site guide and when-to-use guidance.
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
