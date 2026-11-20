"use client";

import { useEffect, useState } from "react";
import { SculptMark } from "./SculptMark";

export type NavItem = { id: string; label: string };

// Sticky table of contents; highlights the section currently in view.
export function Nav({ items }: { items: NavItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const sections = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav className="nav" aria-label="Nesta página">
      <div className="nav__inner">
        <a href="#top" className="nav__brand">
          <SculptMark />
          ReShape
        </a>
        <ul>
          {items.map((i) => (
            <li key={i.id}>
              <a href={`#${i.id}`} aria-current={active === i.id ? "true" : undefined}>{i.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
