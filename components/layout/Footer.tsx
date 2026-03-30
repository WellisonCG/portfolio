/*
  Footer
  ─────────────────────────────────────────────────────────────────────────────
  Figma node 1119:1243

  Layout:
  - Row: "Follow me on social medias..." (left) + icon buttons (right)
  - Copyright line centered below

  Icon buttons (from Figma):
  - bg: #e8e8e8 (light), border: 4px solid #f9fafd (white), p-13px, rounded-10px
*/

"use client";

import Image from "next/image";
import { SOCIAL_BEHANCE, SOCIAL_LINKEDIN, SOCIAL_MEDIUM } from "@/lib/assets";
import { useLanguage } from "@/lib/language-context";

const FOOTER_COPY = {
  EN: {
    social:    "Follow me on social medias\nto see more of my work",
    copyright: "❤️ Made with love by Wellison Gonçalves",
  },
  PT: {
    social:    "Me siga nas redes sociais\npara ver mais do meu trabalho",
    copyright: "❤️ Feito com amor por Wellison Gonçalves",
  },
} as const;

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/wellisoncg/",
    icon: SOCIAL_LINKEDIN,
  },
  {
    label: "Behance",
    href: "https://www.behance.net/wellisoncg",
    icon: SOCIAL_BEHANCE,
  },
  {
    label: "Medium",
    href: "https://medium.com/@wellisoncg",
    icon: SOCIAL_MEDIUM,
  },
];

export default function Footer() {
  const { language } = useLanguage();
  const copy = FOOTER_COPY[language];

  return (
    <footer className="flex w-full flex-col items-center gap-[32px] md:gap-[40px] pb-[32px] md:pb-[48px]">
      {/* Social row */}
      <div className="flex w-full max-w-[1200px] flex-col md:flex-row items-center justify-center gap-[24px] md:gap-[56px] px-10 xl:px-0 text-center md:text-left">
        <p className="font-sans text-[18px] lg:text-[20px] font-normal leading-[1.5] text-muted">
          {copy.social.split("\n").map((line, i) => (
            <span key={i}>{line}{i === 0 && <br />}</span>
          ))}
        </p>

        {/* Icon buttons */}
        <div className="flex items-center gap-[24px]">
          {SOCIAL_LINKS.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="group flex h-[48px] w-[48px] items-center justify-center rounded-[10px] border-4 border-[#f9fafd] bg-[#e8e8e8] [transition:background-color_200ms_ease,border-color_200ms_ease] hover:border-accent hover:bg-accent"
            >
              <Image src={icon} alt={label} width={24} height={24} unoptimized className="[transition:filter_200ms_ease] group-hover:invert" />
            </a>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <p className="font-sans text-[14px] leading-[1.3] text-primary">
        {copy.copyright}
      </p>
    </footer>
  );
}
