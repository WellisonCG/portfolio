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

import Image from "next/image";
import { SOCIAL_BEHANCE, SOCIAL_LINKEDIN, SOCIAL_MEDIUM } from "@/lib/assets";

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/wellisongoncalves",
    icon: SOCIAL_LINKEDIN,
  },
  {
    label: "Behance",
    href: "https://www.behance.net/wellisongoncalves",
    icon: SOCIAL_BEHANCE,
  },
  {
    label: "Medium",
    href: "https://medium.com/@wellisongoncalves",
    icon: SOCIAL_MEDIUM,
  },
];

export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-center gap-[64px] md:gap-[104px] pb-[32px] md:pb-[48px]">
      {/* Social row */}
      <div className="flex w-full max-w-[1200px] flex-col md:flex-row items-center justify-center gap-[24px] md:gap-[56px] px-4 md:px-0 text-center md:text-left">
        <p className="font-sans text-[16px] md:text-[18px] lg:text-[20px] font-normal leading-[1.5] text-muted">
          Follow me on social medias<br />to see more of my work
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
        ❤️ Made with love by Wellison Gonçalves
      </p>
    </footer>
  );
}
