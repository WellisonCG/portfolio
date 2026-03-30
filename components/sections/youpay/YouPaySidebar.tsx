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
import { useLanguage } from "@/lib/language-context";

const HREFS = ["#context","#challenge","#solution","#discovery","#ideation","#prototype","#release","#improvement","#impact","#reflection"] as const;

const LABELS = {
  EN: { nav: "Navigation", items: ["Context","Challenge","Solution","Discovery","Ideation","Prototype","Release","Improvement","Impact","My reflection"] },
  PT: { nav: "Navegação",  items: ["Contexto","Desafio","Solução","Descoberta","Ideação","Prototipação","Lançamento","Aprimoramento","Impacto","Aprendizados"] },
} as const;

export default function YouPaySidebar() {
  const [active, setActive] = useState<string>("");
  const { language } = useLanguage();
  const c = LABELS[language];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    HREFS.forEach((href) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <aside className="sticky top-[240px] hidden w-[180px] shrink-0 flex-col gap-[16px] lg:flex">
      <span className="font-sans text-[20px] font-normal text-muted">
        {c.nav}
      </span>

      <nav className="flex flex-col gap-[8px]">
        {HREFS.map((href, i) => {
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
              {c.items[i]}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
