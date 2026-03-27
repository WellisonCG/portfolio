/*
  YouPaySidebar
  ─────────────────────────────────────────────────────────────────────────────
  Framer node: Sidebar (P4KnPO1BY) inside Body (bnOciEGrP)

  Spec:
  - position: sticky · top: 240px · z-index: 1
  - layout: stack vertical · gap: 16px
  - width: 1fr → ~200px (remainder after 800px content + gap)

  Navegation header: Gabarito regular label
  Items: 10 anchor links, gap 8px
  Bullet: 2px × 16px accent bar, absolute at left-0, visible only when active

  Active tracking: IntersectionObserver watches each section's entrance
  into the middle band of the viewport (rootMargin -40% / -55%).
*/

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const NAV_ITEMS = [
  { label: "Context",       href: "#context"     },
  { label: "Challenge",     href: "#challenge"    },
  { label: "Solution",      href: "#solution"     },
  { label: "Discovery",     href: "#discovery"    },
  { label: "Ideation",      href: "#ideation"     },
  { label: "Prototype",     href: "#prototype"    },
  { label: "Release",       href: "#release"      },
  { label: "Improvement",   href: "#improvement"  },
  { label: "Impact",        href: "#impact"       },
  { label: "My reflection", href: "#reflection"   },
] as const;

export default function YouPaySidebar() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    NAV_ITEMS.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <aside className="sticky top-[240px] flex w-[180px] shrink-0 flex-col gap-[16px]">
      {/* "Navigation" label — Gabarito regular, muted */}
      <span className="font-sans text-[20px] font-normal text-muted">
        Navigation
      </span>

      <nav className="flex flex-col gap-[8px]">
        {NAV_ITEMS.map(({ label, href }) => {
          const id = href.slice(1);
          const isActive = active === id;
          return (
            <Link
              key={href}
              href={href}
              className="relative flex items-center pl-[16px] font-sans text-[16px] leading-[1.6] transition-colors duration-200"
              style={{ color: isActive ? "#f9fafd" : "#b6b6c2" }}
            >
              {/* Bullet — 2px × 16px accent bar, visible only when active */}
              <span
                className="absolute left-0 top-1/2 w-[2px] -translate-y-1/2 rounded-full bg-accent transition-all duration-300"
                style={{ height: isActive ? 16 : 0, opacity: isActive ? 1 : 0 }}
              />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
