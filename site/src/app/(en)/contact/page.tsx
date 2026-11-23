import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact · ReShape",
  description: "Contact ReShape: reach the maintainer at contact@eduardoaugusto.work.",
  alternates: { canonical: "https://reshape.eduardoaugusto.work/contact" },
  openGraph: {
    title: "Contact · ReShape",
    description: "Contact ReShape: reach the maintainer at contact@eduardoaugusto.work.",
    type: "website",
    url: "https://reshape.eduardoaugusto.work/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="main">
      <header className="masthead">
        <span className="masthead__brand">ReShape</span>
        <div className="masthead__links">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/privacy">Privacy</a>
        </div>
      </header>

      <h1>Contact ReShape</h1>
      <p className="lede">
        Reach the ReShape maintainer for questions about the 3D modeling skill, the Blender MCP server,
        partnerships, or this website.
      </p>

      <dl className="kv">
        <thead>
          <tr><th>Channel</th><th>Details</th></tr>
        </thead>
        <tr>
          <td>Email</td>
          <td><a href="mailto:contact@eduardoaugusto.work">contact@eduardoaugusto.work</a></td>
        </tr>
        <tr>
          <td>Contact type</td>
          <td>Customer support</td>
        </tr>
        <tr>
          <td>Response time</td>
          <td>We aim to reply within two business days.</td>
        </tr>
        <tr>
          <td>GitHub</td>
          <td>
            <a href="https://github.com/eduardoaugustolb/reshape">github.com/eduardoaugustolb/reshape</a>
          </td>
        </tr>
        <tr>
          <td>Issues</td>
          <td>
            <a href="https://github.com/eduardoaugustolb/reshape/issues">Open an issue on GitHub</a> for bugs or
            feature requests.
          </td>
        </tr>
      </dl>

      <section className="section">
        <div className="section__head"><h2>What to include</h2></div>
        <p>
          When writing in, please mention whether your question is about the ReShape Codex skill, the Blender MCP
          server, the installation package, or this website. Including the Blender version and your operating
          system helps us reproduce issues faster.
        </p>
      </section>

      <section className="section">
        <div className="section__head"><h2>Address</h2></div>
        <p>
          Eduardo Augusto<br />
          Av. Paulista<br />
          São Paulo, SP 01310-100<br />
          Brazil
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
