/*
  InterFinancesSidebar
  ─────────────────────────────────────────────────────────────────────────────
  Sticky sidebar navigation for the Inter My Finances case study.
  Mirrors YouPaySidebar — IntersectionObserver tracks active section.

  Update NAV_ITEMS to match the actual sections of this article.
*/

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const NAV_ITEMS = [
  { label: "Context",         href: "#context"        },
  { label: "Challenge",       href: "#challenge"       },
  { label: "Solution",        href: "#solution"        },
  { label: "Discovery",       href: "#discovery"       },
  { label: "Validation",      href: "#validation"      },
  { label: "Ideation",        href: "#ideation"        },
  { label: "Prototyping",     href: "#prototype"       },
  { label: "Usability Tests", href: "#usability-tests" },
  { label: "Impact",          href: "#impact"          },
] as const;

export default function InterFinancesSidebar() {
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
