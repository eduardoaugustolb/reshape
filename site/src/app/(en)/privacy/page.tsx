import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy · ReShape",
  description: "ReShape privacy notice: what data we collect, why, and how to exercise your rights.",
  alternates: { canonical: "https://reshape.eduardoaugusto.work/privacy" },
  openGraph: {
    title: "Privacy · ReShape",
    description: "ReShape privacy notice: what data we collect, why, and how to exercise your rights.",
    type: "website",
    url: "https://reshape.eduardoaugusto.work/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main className="main">
      <header className="masthead">
        <span className="masthead__brand">ReShape</span>
        <div className="masthead__links">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </div>
      </header>

      <h1>Privacy Notice</h1>
      <p className="lede">
        This notice explains what personal data ReShape processes, why, and your rights. Last updated
        November 23, 2026.
      </p>

      <section className="section">
        <div className="section__head"><h2>Data we collect</h2></div>
        <p>
          ReShape is a local 3D modeling skill and MCP server for Blender. The skill and MCP server run on your
          machine and do not send your 3D models, prompts, or reference images to the ReShape website. The only
          personal data we collect is what you voluntarily provide when you email us (name and email address),
          which we use solely to answer your message.
        </p>
      </section>

      <section className="section">
        <div className="section__head"><h2>Why we process it</h2></div>
        <p>
          Email content is processed to provide customer support and respond to your inquiries. We do not use
          your data for profiling, advertising, or automated decision-making, and we do not share it with third
          parties.
        </p>
      </section>

      <section className="section">
        <div className="section__head"><h2>Your rights</h2></div>
        <p>
          You may request access to, correction of, or deletion of your personal data, and you may object to or
          withdraw consent for its processing. To exercise any of these rights, email
          <a href="mailto:contact@eduardoaugusto.work">contact@eduardoaugusto.work</a>. We respond within
          fifteen days.
        </p>
      </section>

      <section className="section">
        <div className="section__head"><h2>Contact</h2></div>
        <p>
          Privacy questions can be sent to{" "}
          <a href="mailto:contact@eduardoaugusto.work">contact@eduardoaugusto.work</a> or to the address on the
          <a href="/contact">Contact page</a>.
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
