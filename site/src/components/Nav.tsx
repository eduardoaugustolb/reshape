"use client";

import { BookOpenIcon, CheckSquareIcon, DownloadSimpleIcon, ListChecksIcon, SplitHorizontalIcon } from "@phosphor-icons/react/ssr";
import { useEffect, useState } from "react";
import { SculptMark } from "./SculptMark";

const icons = {
  metodo: ListChecksIcon,
  comparacao: SplitHorizontalIcon,
  validacao: CheckSquareIcon,
  skills: BookOpenIcon,
  instalacao: DownloadSimpleIcon,
};

export type NavItem = { id: keyof typeof icons; label: string };

// Sticky table of contents; highlights the section currently in view.
export function Nav({ items, label }: { items: NavItem[]; label: string }) {
  const [active, setActive] = useState<string>(items[0]?.id);

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
    <nav className="nav" aria-label={label}>
      <div className="nav__inner">
        <a href="#top" className="nav__brand">
          <SculptMark />
          ReShape
        </a>
        <ul>
          {items.map((item) => {
            const Icon = icons[item.id];
            return (
              <li key={item.id}>
                <a className="icon-action" href={`#${item.id}`} aria-current={active === item.id ? "true" : undefined}>
                  <Icon aria-hidden="true" />
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
