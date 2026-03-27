/*
  ProjectCard
  ─────────────────────────────────────────────────────────────────────────────
  Reusable card for each case study. Matches Figma node structure exactly.

  Cover area (352px tall, 24px radius):
  - Solid colored background rectangle
  - Noisy gradient texture overlay (opacity varies per card)
  - Main cover image positioned to fill the card
  - Optional character illustration (absolute, bottom-right)

  Text area below the cover:
  - Title: 20px, leading-[1.1], text-primary (#f9fafd)
  - Description: 20px, leading-[1.5], #6f6f76, capped at w-[419px]
  Both sizes and colors extracted directly from Figma (node 1119:1296).

  GSAP target: data-gsap="project-card"
*/

import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  href: string;
  coverBg: string;
  coverImage: string;
  coverImageAlt: string;
  illustration?: string;
  illustrationAlt?: string;
}

export default function ProjectCard({
  title,
  description,
  href,
  coverBg,
  coverImage,
  coverImageAlt,
  illustration,
  illustrationAlt = "",
}: ProjectCardProps) {
  return (
    <article
      className="flex w-full md:w-[508px] shrink-0 flex-col gap-[24px]"
      data-gsap="project-card"
    >
      {/* ── Cover ──────────────────────────────────────────────────────────── */}
      <a
        href={href}
        className="group relative block h-[260px] md:h-[310px] lg:h-[352px] w-full overflow-hidden rounded-[24px] cursor-pointer"
        style={{ backgroundColor: coverBg }}
        aria-label={`View ${title} case study`}
      >
        {/* Main cover image */}
        <Image
          src={coverImage}
          alt={coverImageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03] z-[2]"
          unoptimized
        />

        {/* Optional character illustration — bottom-right corner */}
        {illustration && (
          <div
            className="pointer-events-none absolute bottom-0 right-0 h-full w-full z-[3]"
            aria-hidden="true"
          >
            <Image
              src={illustration}
              alt={illustrationAlt}
              fill
              className="object-contain object-bottom-right"
              unoptimized
            />
          </div>
        )}
      </a>

      {/* ── Text — font sizes and colors from Figma node 1119:1296 ─────────── */}
      {/*
        Both title and description use font-size 20px in Figma.
        Description uses #6f6f76 (dark medium grey), NOT the global --color-muted.
      */}
      <div className="flex flex-col gap-[8px]">
        <h3 className="font-sans text-[20px] font-normal leading-[1.1] text-primary w-full">
          {title}
        </h3>
        <p
          className="font-sans text-[15px] md:text-[18px] lg:text-[20px] font-normal leading-[1.5] w-full lg:w-[419px]"
          style={{ color: "#6f6f76" }}
        >
          {description}
        </p>
      </div>
    </article>
  );
}
