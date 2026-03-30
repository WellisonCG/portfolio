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

import { useRef, useLayoutEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import EyeTrackingAvatar from "@/components/ui/EyeTrackingAvatar";
import { CTA_MAIL_ICON, CTA_TAPE } from "@/lib/assets";
import { useLanguage } from "@/lib/language-context";

const CTA_COPY = {
  EN: {
    label:   "Say hello!",
    heading: "Interesting people and good ideas are always welcome.",
    button:  "Get in touch",
  },
  PT: {
    label:   "Me mande um oi!",
    heading: "Pessoas interessantes e boas ideias são sempre bem-vindas.",
    button:  "Entre em contato",
  },
} as const;

export default function CTASection() {
  const wobbleRef   = useRef<HTMLDivElement>(null);
  const wobbleTlRef = useRef<gsap.core.Timeline | null>(null);
  const { language } = useLanguage();
  const copy = CTA_COPY[language];

  // Mount only the avatar instance that matches the current breakpoint.
  // CSS hidden/block keeps all 3 wrappers in the DOM for layout, but
  // EyeTrackingAvatar (and its RAF + global mousemove listener) only mounts once.
  const [avatarVariant, setAvatarVariant] = useState<"md" | "lg" | "xl" | "2xl" | null>(null);

  useLayoutEffect(() => {
    const update = () => {
      if (window.innerWidth < 1024)      setAvatarVariant("md");
      else if (window.innerWidth < 1280) setAvatarVariant("lg");
      else if (window.innerWidth < 1500) setAvatarVariant("xl");
      else                               setAvatarVariant("2xl");
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

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
    <section id="contact" className="w-full px-10 xl:px-0">
      <div className="w-full max-w-[1200px] mx-auto">
      <div
        id="cta-section"
        className="relative flex flex-col items-center justify-center gap-[24px] overflow-visible rounded-[24px] border border-[#37373b] bg-[#191919] p-[24px] pb-[120px] sm:p-[32px] lg:p-[40px] mb-[60px] sm:mb-0"
      >

        {/* ── Avatar md — bottom-left do card; pés extravasam 30px abaixo ── */}
        <div
          className="block lg:hidden absolute bottom-[-90px] left-1/2 -translate-x-1/2 sm:left-[-30px] sm:translate-x-0"
        >
          <div className="-rotate-[9.31deg] sm:-rotate-[19.31deg] scale-[0.8] shadow-[2px_2px_6px_0px_rgba(0,0,0,0.08)]">
            {avatarVariant === "md" && <EyeTrackingAvatar />}
          </div>
        </div>

        {/* ── Avatar lg+ — extravasa à esquerda ─────────────────────────── */}
        <div
          className="hidden lg:block absolute -translate-y-1/2 cursor-pointer"
          style={{ left: avatarVariant === "2xl" ? "-92px" : avatarVariant === "xl" ? "-25px" : "-10px", top: "calc(50% + 0.9px)" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div ref={wobbleRef}>
            <div className="-rotate-[9.31deg] shadow-[2px_2px_6px_0px_rgba(0,0,0,0.08)]">
              {(avatarVariant === "lg" || avatarVariant === "xl" || avatarVariant === "2xl") && <EyeTrackingAvatar />}
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
          <p className="font-comic text-[20px] lg:text-[24px] whitespace-nowrap">
            {copy.label}
          </p>

          <h2 className="font-sans text-[34px] lg:text-[48px] font-bold text-center w-full lg:w-[685px]">
            {copy.heading}
          </h2>
        </div>

        {/* ── CTA Button ────────────────────────────────────────────────────── */}
        <button
          onClick={() => window.dispatchEvent(new CustomEvent("open-contact-modal"))}
          className="flex items-center gap-[8px] rounded-[4px] bg-primary px-[32px] py-[8px] transition-colors hover:bg-accent group cursor-pointer"
        >
          <Image
            src={CTA_MAIL_ICON}
            alt=""
            width={16}
            height={13}
            className="invert group-hover:invert-0 transition-[filter]"
            unoptimized
          />
          <span className="font-sans text-[18px] lg:text-[20px] font-normal leading-[1.1] text-surface group-hover:text-primary whitespace-nowrap transition-colors">
            {copy.button}
          </span>
        </button>


      </div>
      </div>
    </section>
  );
}
