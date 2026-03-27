/*
  ScrollAnimations
  ─────────────────────────────────────────────────────────────────────────────
  Componente renderless — gerencia todas as animações de entrada do site.

  Hero: anima no load (sem ScrollTrigger), pois já está visível.
  Demais seções: ScrollTrigger com toggleActions "play reset play reset",
  que re-dispara a animação toda vez que a seção entra na viewport.

  Targets GSAP já definidos nas seções:
    Hero    → #hero-avatar, #hero-text, #hero-sticker, #hero-scroll
    Projects → #projects
    Quote   → #marquee-banner
    About   → #about-text, #about-photo
    CTA     → #cta-section
*/

"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollAnimations() {
  useEffect(() => {
    // Skip all entrance animations in screenshot mode
    if (new URLSearchParams(window.location.search).get("screenshot") === "1") return;

    const ctx = gsap.context(() => {

      // ── Hero — load animation (sem ScrollTrigger) ─────────────────
      gsap.timeline({ defaults: { ease: "power2.out" } })
        .from("#hero-avatar",  { opacity: 0, x: -24,          duration: 0.6 }, 0   )
        .from("#hero-text",    { opacity: 0, y: 20, scale: 0.96, duration: 0.7 }, 0.15)
        .from("#hero-sticker", { opacity: 0, scale: 0.8,       duration: 0.5,
                                 ease: "back.out(1.4)" },                          0.35)
        .from("#hero-scroll",  { opacity: 0, y: 10,            duration: 0.4 }, 0.55);

      // ── helper ────────────────────────────────────────────────────
      type Item = {
        sel:    string;
        delay?: number;
        from?:  gsap.TweenVars;
        to?:    gsap.TweenVars;
      };

      const reveal = (trigger: string, items: Item[]) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger,
            start: "top bottom", // dispara quando o topo da seção entra/sai pelo fundo do viewport
            end: "bottom top",   // dispara quando o fundo da seção entra/sai pelo topo do viewport
            toggleActions: "play reset play reset",
          },
        });

        items.forEach(({
          sel,
          delay = 0,
          from = { opacity: 0, scale: 0.94, y: 20 },
          to   = { opacity: 1, scale: 1,    y: 0, duration: 0.7, ease: "power2.out" },
        }) => {
          tl.fromTo(sel, from, to, delay);
        });
      };

      // ── Projects ──────────────────────────────────────────────────
      reveal("#projects", [
        { sel: "#projects", from: { opacity: 0, scale: 0.96, y: 24 } },
      ]);

      // ── Quote / MarqueeBanner ─────────────────────────────────────
      reveal("#marquee-banner", [
        { sel: "#marquee-banner", from: { opacity: 0, scale: 0.95, y: 20 } },
      ]);

      // ── About ────────────────────────────────────────────────────
      reveal("#about", [
        {
          sel:   "#about-text",
          delay: 0,
          from:  { opacity: 0, x: -24, scale: 0.96 },
          to:    { opacity: 1, x: 0,   scale: 1, duration: 0.7, ease: "power2.out" },
        },
        {
          sel:   "#about-photo",
          delay: 0.15,
          // sem y — a animação de float em AboutSection já controla o eixo y
          from:  { opacity: 0, scale: 0.94 },
          to:    { opacity: 1, scale: 1,    duration: 0.7, ease: "power2.out" },
        },
      ]);

      // ── CTA ───────────────────────────────────────────────────────
      reveal("#contact", [
        { sel: "#cta-section", from: { opacity: 0, scale: 0.96, y: 24 } },
      ]);

    });

    return () => ctx.revert();
  }, []);

  return null;
}
