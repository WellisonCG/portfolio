/*
  CTASection — "Get In Touch"
  ─────────────────────────────────────────────────────────────────────────────
  Figma node 1119:1255

  Estrutura:
  - Card: flex-col items-center, bg-[#191919], border-[#37373b], rounded-24, p-40
  - Avatar: absolute left-[-92px], centrado verticalmente, rotated -9.31deg, 152×199px
  - Tape: absolute right-[-19.76px] top-[-25px], rotated 48.23deg, -scale-y-100
  - Content: label Comic Neue Bold 24px + heading Gabarito Bold 48px w-685px
  - Botão CTA: bg-accent, px-32 py-8, mail-icon + "Entre em contato" 20px

  O card tem overflow-visible para o avatar extravasar à esquerda.
  GSAP target: #cta-section
*/

"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import EyeTrackingAvatar from "@/components/ui/EyeTrackingAvatar";
import { CTA_MAIL_ICON, CTA_TAPE } from "@/lib/assets";

export default function CTASection() {
  const wobbleRef = useRef<HTMLDivElement>(null);
  const wobbleTlRef = useRef<gsap.core.Timeline | null>(null);

  const handleMouseEnter = () => {
    wobbleTlRef.current?.kill();
    gsap.set(wobbleRef.current, { rotation: 0, x: 0 });
    wobbleTlRef.current = gsap.timeline()
      .to(wobbleRef.current, { rotation: -5, x: -3, duration: 0.10, ease: "power2.out"  }) // impulso inicial
      .to(wobbleRef.current, { rotation:  4, x:  2, duration: 0.22, ease: "sine.inOut"  }) // balanço 1
      .to(wobbleRef.current, { rotation: -2, x: -1, duration: 0.20, ease: "sine.inOut"  }) // balanço 2 (amortecido)
      .to(wobbleRef.current, { rotation:  0, x:  0, duration: 0.18, ease: "sine.out"    }); // pouso
  };

  const handleMouseLeave = () => {
    wobbleTlRef.current?.kill();
    wobbleTlRef.current = null;
    gsap.to(wobbleRef.current, { rotation: 0, x: 0, duration: 0.2, ease: "power2.out" });
  };

  return (
    <section
      id="contact"
      className="w-full max-w-[1200px] px-4 lg:px-0 lg:pl-[92px]"
    >
      <div
        id="cta-section"
        className="relative flex flex-col items-center gap-[24px] overflow-visible rounded-[24px] border border-[#37373b] bg-[#191919] p-[20px] md:p-[32px] lg:p-[40px]"
      >

        {/* ── Avatar — desktop: extravasa à esquerda; mobile: oculto (sem espaço) */}
        <div
          className="hidden lg:block absolute -translate-y-1/2 cursor-pointer"
          style={{ left: "-92px", top: "calc(50% + 0.9px)" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div ref={wobbleRef}>
            <div className="-rotate-[9.31deg] shadow-[2px_2px_6px_0px_rgba(0,0,0,0.08)]">
              <EyeTrackingAvatar />
            </div>
          </div>
        </div>

        {/* ── Tape — canto superior direito ─────────────────────────────────── */}
        <div
          className="pointer-events-none absolute flex h-[102.701px] w-[96.761px] items-center justify-center"
          style={{ right: "-19.76px", top: "-25px" }}
          aria-hidden="true"
        >
          <Image src={CTA_TAPE} alt="" width={108} height={34} unoptimized />
        </div>

        {/* ── Content ───────────────────────────────────────────────────────── */}
        <div className="flex flex-col items-center gap-[8px] leading-[1.1] text-primary">
          <p className="font-comic text-[16px] md:text-[20px] lg:text-[24px] whitespace-nowrap">
            Let&apos;s work together!
          </p>

          <h2 className="font-sans text-[22px] md:text-[34px] lg:text-[48px] font-bold text-center w-full lg:w-[685px]">
            Are you ready to create an incredible project?
          </h2>
        </div>

        {/* ── CTA Button ────────────────────────────────────────────────────── */}
        <a
          href="mailto:wellison@example.com"
          className="flex items-center gap-[8px] rounded-[4px] bg-primary px-[24px] md:px-[32px] py-[8px] transition-colors hover:bg-accent group"
        >
          <Image
            src={CTA_MAIL_ICON}
            alt=""
            width={16}
            height={13}
            className="invert group-hover:invert-0 transition-[filter]"
            unoptimized
          />
          <span className="font-sans text-[16px] md:text-[18px] lg:text-[20px] font-normal leading-[1.1] text-surface group-hover:text-primary whitespace-nowrap transition-colors">
            Get in touch
          </span>
        </a>

      </div>
    </section>
  );
}
