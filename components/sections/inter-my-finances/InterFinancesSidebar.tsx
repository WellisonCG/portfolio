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
import { useLanguage } from "@/lib/language-context";

const HREFS = ["#context","#challenge","#solution","#discovery","#validation","#ideation","#prototype","#usability-tests","#impact"] as const;

const LABELS = {
  EN: { nav: "Navigation", items: ["Context","Challenge","Solution","Discovery","Validation","Ideation","Prototyping","Usability Tests","Impact"] },
  PT: { nav: "Navegação",  items: ["Contexto","Desafio","Solução","Descoberta","Validação","Ideação","Prototipação","Testes de Usabilidade","Impacto"] },
} as const;

export default function InterFinancesSidebar() {
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
