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

const TAGS = ["UX/UI Designer", "Product Designer"];

export default function AboutSection() {
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = photoRef.current;
    if (!el) return;

    // Idle: float contínuo — GSAP anima y no container, CSS zoom anima scale na imagem
    gsap.to(el, {
      y: -10,
      duration: 2.5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    return () => { gsap.killTweensOf(el); };
  }, []);

  return (
    <section
      id="about"
      className="flex w-full max-w-[1200px] flex-col lg:flex-row items-center gap-[32px] lg:gap-[94px] px-10 lg:px-[79px]"
    >

      {/* ── Coluna esquerda — texto ─────────────────────────────────────────── */}
      <div id="about-text" className="flex shrink-0 flex-col gap-[24px] w-full md:w-auto">

        <div className="flex flex-col gap-[16px]">
          <h2 className="font-sans font-bold text-[28px] md:text-[38px] lg:text-[48px] leading-[1.3] text-primary w-full lg:w-[420px]">
            The hand that
            <br />
            holds the pencil
          </h2>

          <p className="font-sans text-[14px] md:text-[17px] lg:text-[20px] font-normal leading-[1.5] text-muted w-full lg:w-[509px]">
            My pleasure. I&apos;m Wellison and I have always been moved by the
            desire to make real ideas that only existed in my mind. I found
            myself in design, and currently I dedicate myself to the creation
            of products that solve problems and enchant people.
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-[16px]">
          {TAGS.map((tag) => (
            <div key={tag} className="flex items-center gap-[8px]">
              <div className="relative size-[16px] shrink-0 overflow-hidden">
                <Image src={ABOUT_TAG_MARKER} alt="" fill className="object-contain" unoptimized />
              </div>
              <span className="font-sans text-[16px] md:text-[18px] lg:text-[20px] font-bold leading-[1.1] text-accent whitespace-nowrap">
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
        className="group relative h-[240px] w-full md:h-[360px] lg:h-[468px] lg:w-[408px] shrink-0"
        style={{ willChange: "transform" }}
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

    </section>
  );
}
