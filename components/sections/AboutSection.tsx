/*
  AboutSection
  ─────────────────────────────────────────────────────────────────────────────
  Figma node 1119:1266

  Layout: duas colunas, gap-[94px], px-[79px], items-center
  - Esquerda: heading Gabarito Bold 48px + bio 20px + tags com marker icon
  - Direita: foto exportada 408×468, overflow-clip com offset fino do Figma

  GSAP targets: #about-text, #about-photo

  Micro-interações da foto:
  - Idle: float suave via GSAP (y: -10, yoyo, repeat: -1)
  - Hover: zoom leve na imagem via CSS transition (scale 1.06)
*/

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { ABOUT_PHOTO, ABOUT_TAG_MARKER } from "@/lib/assets";
import { useLanguage } from "@/lib/language-context";

const ABOUT_COPY = {
  EN: {
    heading: "The hand that holds the pencil",
    bio: "I'm Wellison. I've always had a compulsion to bring ideas to life, the ones that only exist in your head. Design gave me the tools to do that. I focus on building products that solve real problems and deliver impact that actually shows.",
    tags: ["UX/UI Designer", "Product Designer"],
  },
  PT: {
    heading: "A mão que segura o lápis",
    bio: "Me chamo Wellison. Sempre gostei de tirar ideias do papel, aquelas que só existem na nossa cabeçcopy. O design me deu as ferramentas para isso. Foco em construir produtos que resolvam problemas reais e entregam impacto de verdade.",
    tags: ["UX/UI Designer", "Designer de Produto"],
  },
} as const;

export default function AboutSection() {
  const photoRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const copy = ABOUT_COPY[language];

  useEffect(() => {
    const el = photoRef.current;
    if (!el) return;

    // Float só corre quando a secção está visível — IntersectionObserver pausa
    // o tween fora da viewport, eliminando trabalho de GSAP desnecessário.
    let tween: gsap.core.Tween | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tween = gsap.to(el, {
            y: -10,
            duration: 2.5,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        } else {
          tween?.kill();
          tween = null;
          gsap.set(el, { y: 0 });
        }
      },
      { threshold: 0 },
    );

    observer.observe(el);
    return () => { observer.disconnect(); tween?.kill(); };
  }, []);

  return (
    <section id="about" className="w-full px-10 xl:px-0">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-[32px] lg:gap-[94px]">

      {/* ── Coluna esquerda — texto ─────────────────────────────────────────── */}
      <div id="about-text" className="flex min-w-0 flex-col gap-[24px] w-full md:flex-1">

        <div className="flex flex-col gap-[16px]">
          <h2 className="font-sans font-bold text-[38px] lg:text-[48px] leading-[1.3] text-primary w-full lg:max-w-[420px]">
            {copy.heading}
          </h2>

          <p className="font-sans text-[17px] lg:text-[20px] font-normal leading-[1.5] text-muted w-full lg:max-w-[509px]">
            {copy.bio}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-[16px]">
          {copy.tags.map((tag) => (
            <div key={tag} className="flex items-center gap-[8px]">
              <div className="relative size-[16px] shrink-0 overflow-hidden">
                <Image src={ABOUT_TAG_MARKER} alt="" fill className="object-contain" unoptimized />
              </div>
              <span className="font-sans text-[18px] lg:text-[20px] font-bold leading-[1.1] text-accent whitespace-nowrap">
                {tag}
              </span>
            </div>
          ))}
        </div>

      </div>

      {/* ── Coluna direita — foto ───────────────────────────────────────────── */}
      <div
        ref={photoRef}
        id="about-photo"
        className="group relative hidden md:block md:w-[40%] md:h-[360px] lg:h-[468px] lg:w-[408px] shrink-0"
      >
        <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.06]">
          <Image
            src={ABOUT_PHOTO}
            alt="Wellison Gonçalves"
            fill
            className="object-contain object-top"
            unoptimized
          />
        </div>
      </div>

      </div>
    </section>
  );
}
