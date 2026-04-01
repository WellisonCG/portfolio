/*
  YouPayHero
  ─────────────────────────────────────────────────────────────────────────────
  Framer node: Hero (nodeId: b4o59gFXT) inside Desktop (SMcAWBT6b)
  Figma reference: node 5016:5105 (file V2kvIdR7ojEXlZD1GvPRKX)

  Layer structure (from Framer XML):
  ┌─ Hero  [stack vertical · center · gap 48px · padding 80 80 0 80 · overflow visible]
  │   ├─ SolidBg  [full-width · bleeds behind nav · covers entire section · hides canvas]
  │   ├─ GlowBg   [full-width · bleeds behind nav · stops 120px before section bottom]
  │   │   └─ youpay-hero-bg.png  (blue glow + noise, pre-rendered by designer)
  │   ├─ Particles [full-width · SVG flame shapes rising from glow boundary]
  │   ├─ Text  [stack vertical · center · gap 16px · z-10]
  │   │   ├─ "Youpay Digital"  [Gabarito 700 · 60px · tracking -0.04em]
  │   │   └─ Subtitle  [Gabarito regular · 20px · maxWidth 550px]
  │   └─ Cover  [w-1fr · maxWidth 1040px · h-600px · radius 24px · border Black Mid · z-9]
  │       └─ youpay-hero.jpg  (angled mockup, local asset)

  Background system (two layers):
  1. SolidBg (#0D0E0D) — hides the global dot-grid canvas for the entire hero + nav area.
     Extends from 200px above section top (behind sticky nav) to the same bottom as GlowBg.
  2. GlowBg — the pre-rendered blue glow image on top of the solid base.
     Same top bleed (-200px), stops at bottom: 120px so the cover's lower
     portion exits the glow onto the solid dark base.

  Particles: SVG flame shapes with radial gradient fills. 5 silhouettes
  (slim, wide, lean-right, lean-left, wispy) distributed across 16 instances
  with varied scale, speed, delay and drift.
*/

"use client";

import Image from "next/image";
import heroBgImg    from "@/public/assets/youpay/youpay-hero-bg.avif";
import heroCoverImg from "@/public/assets/youpay/youpay-hero.png";
import HeroCoverRise from "@/components/animations/HeroCoverRise";
import { useLanguage } from "@/lib/language-context";

const COPY = {
  EN: {
    title:    "Youpay Digital",
    subtitle: "Increasing revenue and strengthening the brand with redesign of the payment flow",
  },
  PT: {
    title:    "Youpay Digital",
    subtitle: "Aumentando a receita e fortalecendo a marca com o redesign do fluxo de pagamento",
  },
} as const;

/*
  FLAME_SHAPES — 5 SVG path silhouettes in a shared 16×26 viewBox.
  Each shape has default render dimensions (w×h px) and gradient colors.
  inner: bright core color · outer: edge color (fades to opacity 0)
*/
const FLAME_SHAPES = [
  { // 0 — classic slim: symmetric, tapers cleanly to a point at the top
    path: "M8,0 C10,4 13,9 12,15 C11,20 9,26 8,26 C7,26 5,20 4,15 C3,9 6,4 8,0Z",
    w: 10, h: 22, inner: "#93c5fd", outer: "#3b82f6",
  },
  { // 1 — wide base: fuller body, flame that just erupted from the source
    path: "M8,0 C12,4 15,9 14,15 C13,21 11,26 8,26 C5,26 3,21 2,15 C1,9 4,4 8,0Z",
    w: 13, h: 18, inner: "#bfdbfe", outer: "#60a5fa",
  },
  { // 2 — leaning right: caught by a breeze
    path: "M6,0 C9,4 13,9 13,15 C13,21 11,26 8,26 C5,26 3,22 2,16 C1,10 3,5 6,0Z",
    w: 11, h: 22, inner: "#60a5fa", outer: "#2563eb",
  },
  { // 3 — leaning left: mirror of shape 2
    path: "M10,0 C13,5 13,10 13,16 C13,22 11,26 8,26 C5,26 3,21 3,15 C3,9 7,4 10,0Z",
    w: 11, h: 22, inner: "#93c5fd", outer: "#3b82f6",
  },
  { // 4 — wispy: very narrow, tall — the tip of a dying ember
    path: "M8,0 C10,5 11,10 10,17 C10,21 9,26 8,26 C7,26 6,21 6,17 C5,10 6,5 8,0Z",
    w: 6, h: 24, inner: "#dbeafe", outer: "#93c5fd",
  },
] as const;

/*
  PARTICLES — 24 instances in three intensity tiers.
  opacity: base brightness of the wrapper — the keyframe multiplies on top.
           1.0 = primary flame · 0.55–0.65 = secondary · 0.20–0.35 = micro ember
  Negative delay = animation starts mid-cycle on load, distributing flames
  vertically across the section from the first frame.
*/
const PARTICLES: {
  left: string; bottom: number; shape: number; scale: number;
  opacity: number; duration: number; delay: number; drift: number;
}[] = [
  // ── Primary — full opacity, visible flames ───────────────────────────────
  { left: "46%", bottom: 20, shape: 0, scale: 1.0, opacity: 1.00, duration: 12.0, delay:  -6.0, drift: -16 },
  { left: "53%", bottom: 45, shape: 4, scale: 0.8, opacity: 1.00, duration: 14.0, delay:  -3.0, drift:  10 },
  { left: "50%", bottom: 10, shape: 2, scale: 1.1, opacity: 1.00, duration: 13.5, delay:  -9.5, drift:  -8 },
  { left: "35%", bottom: 25, shape: 3, scale: 1.0, opacity: 1.00, duration: 12.5, delay:  -8.0, drift: -22 },
  { left: "62%", bottom: 30, shape: 1, scale: 1.0, opacity: 1.00, duration: 12.0, delay:  -5.0, drift:  20 },
  { left: "40%", bottom: 12, shape: 0, scale: 0.8, opacity: 1.00, duration: 11.5, delay: -11.0, drift: -12 },
  { left: "58%", bottom: 10, shape: 2, scale: 1.2, opacity: 1.00, duration: 14.0, delay:  -9.0, drift:  10 },
  // ── Secondary — slightly dimmer, mid-size ───────────────────────────────
  { left: "24%", bottom: 55, shape: 4, scale: 0.70, opacity: 0.65, duration: 15.0, delay:  -4.0, drift:  18 },
  { left: "72%", bottom: 60, shape: 4, scale: 0.90, opacity: 0.60, duration: 16.0, delay:  -2.0, drift: -14 },
  { left: "11%", bottom: 40, shape: 4, scale: 0.70, opacity: 0.55, duration: 17.0, delay:  -7.0, drift: -26 },
  { left: "86%", bottom: 50, shape: 3, scale: 0.80, opacity: 0.60, duration: 16.5, delay: -12.0, drift:  24 },
  { left: "7%",  bottom: 30, shape: 0, scale: 0.60, opacity: 0.55, duration: 18.0, delay:  -3.5, drift:  -8 },
  { left: "91%", bottom: 20, shape: 1, scale: 0.70, opacity: 0.65, duration: 15.5, delay:  -6.5, drift:  14 },
  { left: "30%", bottom: 70, shape: 2, scale: 0.65, opacity: 0.60, duration: 13.0, delay:  -5.5, drift: -18 },
  { left: "68%", bottom: 35, shape: 3, scale: 0.75, opacity: 0.65, duration: 14.5, delay:  -8.5, drift:  16 },
  // ── Micro — faint background embers ─────────────────────────────────────
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

export default function YouPayHero() {
  const { language } = useLanguage();
  const c = COPY[language];

  return (
    <section className="relative flex w-full max-w-[1200px] flex-col items-center gap-[48px] overflow-visible px-[40px] pt-[80px] lg:px-[80px]">

      {/*
        SolidBg — #0D0E0D base that hides the dot-grid canvas.
        top: -200px bleeds behind the sticky nav (nav ~80px, 200px is safe).
        Matches GlowBg bottom (120px) so canvas appears right where glow ends.
      */}
      <div
        className="pointer-events-none absolute left-1/2 w-screen -translate-x-1/2"
        style={{ top: -200, bottom: 120, zIndex: 0, backgroundColor: "#0D0E0D" }}
        aria-hidden="true"
      />

      {/*
        GlowBg — blue glow image on top of the solid base.
        Same top bleed; bottom: 120px leaves the cover's lower portion
        against the clean dark surface so the cover "exits" the glow.
      */}
      <div
        className="pointer-events-none absolute left-1/2 w-screen -translate-x-1/2 overflow-hidden"
        style={{ top: -200, bottom: 120, zIndex: 1 }}
        aria-hidden="true"
      >
        <Image
          src={heroBgImg}
          alt=""
          fill
          className="object-cover object-bottom"
          priority
          placeholder="blur"
        />
      </div>

      {/*
        Particles — SVG flame silhouettes rising from the glow boundary.
        Each SVG uses a unique radialGradient (flame-grad-{i}) so gradients
        don't bleed between shapes. A 0.5px blur softens the hard SVG edges.
        --drift is a CSS custom property consumed by the particle-rise keyframe.
      */}
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
            // Wrapper carries position + base opacity so the keyframe
            // (which also drives opacity) multiplies on top of it.
            <div
              key={i}
              className="absolute"
              style={{
                left: p.left,
                bottom: p.bottom,
                marginLeft: -w / 2,
                opacity: p.opacity,
              }}
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
                  <radialGradient id={`flame-grad-${i}`} cx="50%" cy="62%" r="52%">
                    <stop offset="0%"   stopColor={shape.inner} stopOpacity={1} />
                    <stop offset="100%" stopColor={shape.outer} stopOpacity={0} />
                  </radialGradient>
                </defs>
                <path d={shape.path} fill={`url(#flame-grad-${i})`} />
              </svg>
            </div>
          );
        })}
      </div>

      {/*
        Text group — Framer: stack vertical · center · gap 16px
        z-10 keeps it above all background layers.
      */}
      <div className="relative z-10 flex w-full flex-col items-center gap-[16px]">
        <h1 className="w-full text-center font-sans text-[80px] font-bold leading-[1.4] tracking-[-0.04em] text-primary">
          {c.title}
        </h1>
        <p className="max-w-[550px] text-center font-sans text-[24px] font-normal leading-[1.5] text-primary">
          {c.subtitle}
        </p>
      </div>

      {/*
        Cover — Framer: width 1fr · maxWidth 1040px · height 600px
                        borderRadius 24px · border 1px solid /Black Mid (#6f6f76) · z-9
        HeroCoverRise wraps the layout shell; overflow-hidden stays on the
        inner div so Safari's "overflow:hidden flattens 3D" quirk doesn't
        cancel the rotationX entrance animation.
      */}
      <HeroCoverRise className="relative z-[9] w-full max-w-[1040px]">
        <div
          className="relative overflow-hidden rounded-[24px] border border-[#6f6f76]"
          style={{ aspectRatio: "1040 / 600" }}
        >
          <Image
            src={heroCoverImg}
            alt="Youpay Digital app screens showing the redesigned payment flow with Pix as the highlighted default method"
            fill
            className="object-cover"
            sizes="(max-width: 1040px) 100vw, 1040px"
            priority
            placeholder="blur"
          />
        </div>
      </HeroCoverRise>

    </section>
  );
}
