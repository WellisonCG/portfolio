/*
  MarqueeBanner (Quote section)
  ─────────────────────────────────────────────────────────────────────────────
  Figma node 1119:1291

  Layout:
  - Texto bold 48px centrado, leading-[1.1], duas linhas
  - BrushOval: SVG brush-circle com stroke-dashoffset animando o traço

  IntersectionObserver adiciona .draw-oval-active na section quando visível,
  o que ativa animation-play-state: running no path via CSS. Fora da viewport,
  a animação fica paused — zero trabalho de GPU/CPU no scroll.

  GSAP target: #marquee-banner
*/

"use client";

import { useEffect, useRef } from "react";
import BrushOval from "@/components/ui/BrushOval";
import { useLanguage } from "@/lib/language-context";

const MARQUEE_COPY = {
  EN: { line1: "Every great idea, starts", line2: "as a horrible sketch" },
  PT: { line1: "Toda grande ideia começa", line2: "como um esboço horrível" },
} as const;

export default function MarqueeBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const { language } = useLanguage();
  const copy = MARQUEE_COPY[language];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        el.classList.toggle("draw-oval-active", entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="marquee-banner" className="w-full px-10 xl:px-0 md:pt-12">
      <div className="w-full max-w-[1200px] mx-auto flex items-center justify-center">
        <div className="relative flex items-center justify-center">

          <BrushOval />

          {/* Quote text */}
          <h2 className="relative px-6 md:px-[40px] lg:px-[64px] py-[24px] font-sans text-[36px] lg:text-[48px] font-bold leading-[1.1] text-primary text-center">
            {copy.line1}
            <br />
            {copy.line2}
          </h2>

        </div>
      </div>
    </section>
  );
}
