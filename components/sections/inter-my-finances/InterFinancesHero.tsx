/*
  InterFinancesHero
  ─────────────────────────────────────────────────────────────────────────────
  Hero section for the Inter My Finances case study.
  Mirrors the YouPayHero structure (SolidBg + GlowBg + Particles + Text + Cover).

  Assets:
  - INTER_HERO_BG:    /assets/inter/inter-hero-bg.png  (background glow image)
  - INTER_HERO_COVER: /assets/inter/inter-hero.jpg      (cover mockup)
*/

import Image from "next/image";
import { INTER_HERO_BG, INTER_HERO_COVER } from "@/lib/assets";

const FLAME_SHAPES = [
  { // 0 — classic slim
    path: "M8,0 C10,4 13,9 12,15 C11,20 9,26 8,26 C7,26 5,20 4,15 C3,9 6,4 8,0Z",
    w: 10, h: 22, inner: "#fdba74", outer: "#f97316",
  },
  { // 1 — wide base
    path: "M8,0 C12,4 15,9 14,15 C13,21 11,26 8,26 C5,26 3,21 2,15 C1,9 4,4 8,0Z",
    w: 13, h: 18, inner: "#fed7aa", outer: "#fb923c",
  },
  { // 2 — leaning right
    path: "M6,0 C9,4 13,9 13,15 C13,21 11,26 8,26 C5,26 3,22 2,16 C1,10 3,5 6,0Z",
    w: 11, h: 22, inner: "#fb923c", outer: "#ea580c",
  },
  { // 3 — leaning left
    path: "M10,0 C13,5 13,10 13,16 C13,22 11,26 8,26 C5,26 3,21 3,15 C3,9 7,4 10,0Z",
    w: 11, h: 22, inner: "#fdba74", outer: "#f97316",
  },
  { // 4 — wispy
    path: "M8,0 C10,5 11,10 10,17 C10,21 9,26 8,26 C7,26 6,21 6,17 C5,10 6,5 8,0Z",
    w: 6, h: 24, inner: "#ffedd5", outer: "#fdba74",
  },
] as const;

const PARTICLES: {
  left: string; bottom: number; shape: number; scale: number;
  opacity: number; duration: number; delay: number; drift: number;
}[] = [
  // ── Primary ──────────────────────────────────────────────────────────────
  { left: "46%", bottom: 20, shape: 0, scale: 1.0, opacity: 1.00, duration: 12.0, delay:  -6.0, drift: -16 },
  { left: "53%", bottom: 45, shape: 4, scale: 0.8, opacity: 1.00, duration: 14.0, delay:  -3.0, drift:  10 },
  { left: "50%", bottom: 10, shape: 2, scale: 1.1, opacity: 1.00, duration: 13.5, delay:  -9.5, drift:  -8 },
  { left: "35%", bottom: 25, shape: 3, scale: 1.0, opacity: 1.00, duration: 12.5, delay:  -8.0, drift: -22 },
  { left: "62%", bottom: 30, shape: 1, scale: 1.0, opacity: 1.00, duration: 12.0, delay:  -5.0, drift:  20 },
  { left: "40%", bottom: 12, shape: 0, scale: 0.8, opacity: 1.00, duration: 11.5, delay: -11.0, drift: -12 },
  { left: "58%", bottom: 10, shape: 2, scale: 1.2, opacity: 1.00, duration: 14.0, delay:  -9.0, drift:  10 },
  // ── Secondary ─────────────────────────────────────────────────────────────
  { left: "24%", bottom: 55, shape: 4, scale: 0.70, opacity: 0.65, duration: 15.0, delay:  -4.0, drift:  18 },
  { left: "72%", bottom: 60, shape: 4, scale: 0.90, opacity: 0.60, duration: 16.0, delay:  -2.0, drift: -14 },
  { left: "11%", bottom: 40, shape: 4, scale: 0.70, opacity: 0.55, duration: 17.0, delay:  -7.0, drift: -26 },
  { left: "86%", bottom: 50, shape: 3, scale: 0.80, opacity: 0.60, duration: 16.5, delay: -12.0, drift:  24 },
  { left: "7%",  bottom: 30, shape: 0, scale: 0.60, opacity: 0.55, duration: 18.0, delay:  -3.5, drift:  -8 },
  { left: "91%", bottom: 20, shape: 1, scale: 0.70, opacity: 0.65, duration: 15.5, delay:  -6.5, drift:  14 },
  { left: "30%", bottom: 70, shape: 2, scale: 0.65, opacity: 0.60, duration: 13.0, delay:  -5.5, drift: -18 },
  { left: "68%", bottom: 35, shape: 3, scale: 0.75, opacity: 0.65, duration: 14.5, delay:  -8.5, drift:  16 },
  // ── Micro ─────────────────────────────────────────────────────────────────
  { left: "44%", bottom: 80, shape: 4, scale: 0.40, opacity: 0.25, duration: 16.0, delay:  -2.5, drift:   8 },
  { left: "56%", bottom: 65, shape: 4, scale: 0.35, opacity: 0.20, duration: 18.5, delay: -14.0, drift: -10 },
  { left: "20%", bottom: 30, shape: 4, scale: 0.45, opacity: 0.30, duration: 15.5, delay: -10.0, drift:  14 },
  { left: "78%", bottom: 25, shape: 4, scale: 0.40, opacity: 0.25, duration: 17.5, delay:  -4.5, drift: -22 },
  { left: "48%", bottom: 50, shape: 0, scale: 0.50, opacity: 0.35, duration: 12.5, delay:  -7.0, drift:  -6 },
  { left: "16%", bottom: 60, shape: 4, scale: 0.40, opacity: 0.25, duration: 19.0, delay:  -9.0, drift: -12 },
  { left: "83%", bottom: 70, shape: 4, scale: 0.45, opacity: 0.30, duration: 16.5, delay: -13.0, drift:  10 },
  { left: "38%", bottom: 40, shape: 3, scale: 0.50, opacity: 0.30, duration: 14.0, delay:  -6.0, drift:  20 },
  { left: "63%", bottom: 55, shape: 4, scale: 0.40, opacity: 0.20, duration: 17.0, delay: -11.5, drift: -16 },
];

export default function InterFinancesHero() {
  return (
    <section className="relative flex w-full max-w-[1200px] flex-col items-center gap-[48px] overflow-visible px-[80px] pt-[80px]">

      {/* SolidBg — hides the dot-grid canvas behind nav + hero */}
      <div
        className="pointer-events-none absolute left-1/2 w-screen -translate-x-1/2"
        style={{ top: -200, bottom: 120, zIndex: 0, backgroundColor: "#0D0E0D" }}
        aria-hidden="true"
      />

      {/* GlowBg — pre-rendered background glow image */}
      <div
        className="pointer-events-none absolute left-1/2 w-screen -translate-x-1/2 overflow-hidden"
        style={{ top: -200, bottom: 120, zIndex: 1 }}
        aria-hidden="true"
      >
        <Image
          src={INTER_HERO_BG}
          alt=""
          fill
          className="object-cover object-bottom"
          priority
        />
      </div>

      {/* Particles — SVG flame silhouettes */}
      <div
        className="pointer-events-none absolute left-1/2 w-screen -translate-x-1/2 overflow-hidden"
        style={{ top: -200, bottom: 120, zIndex: 2 }}
        aria-hidden="true"
      >
        {PARTICLES.map((p, i) => {
          const shape = FLAME_SHAPES[p.shape];
          const w = Math.round(shape.w * p.scale);
          const h = Math.round(shape.h * p.scale);
          return (
            <div
              key={i}
              className="absolute"
              style={{ left: p.left, bottom: p.bottom, marginLeft: -w / 2, opacity: p.opacity }}
            >
              <svg
                viewBox="0 0 16 26"
                width={w}
                height={h}
                style={{
                  display: "block",
                  animation: `particle-rise ${p.duration}s ${p.delay}s ease-out infinite backwards`,
                  filter: "blur(0.4px)",
                  "--drift": `${p.drift}px`,
                } as React.CSSProperties}
              >
                <defs>
                  <radialGradient id={`inter-flame-grad-${i}`} cx="50%" cy="62%" r="52%">
                    <stop offset="0%"   stopColor={shape.inner} stopOpacity={1} />
                    <stop offset="100%" stopColor={shape.outer} stopOpacity={0} />
                  </radialGradient>
                </defs>
                <path d={shape.path} fill={`url(#inter-flame-grad-${i})`} />
              </svg>
            </div>
          );
        })}
      </div>

      {/* Text group */}
      <div className="relative z-10 flex w-full flex-col items-center gap-[16px]">
        <h1 className="w-full text-center font-sans text-[80px] font-bold leading-[1.4] tracking-[-0.04em] text-primary">
          Inter My Finances
        </h1>
        <p className="max-w-[550px] text-center font-sans text-[24px] font-normal leading-[1.5] text-primary">
          Designing a personal finance feature to help Inter users manage
          their money effortlessly
        </p>
      </div>

      {/* Cover */}
      <div
        className="relative z-[9] w-full max-w-[1040px] overflow-hidden rounded-[24px] border border-[#6f6f76]"
        style={{ height: 600 }}
      >
        <Image
          src={INTER_HERO_COVER}
          alt="Inter My Finances — case study cover"
          fill
          className="object-cover"
          sizes="(max-width: 1040px) 100vw, 1040px"
          priority
        />
      </div>

    </section>
  );
}
