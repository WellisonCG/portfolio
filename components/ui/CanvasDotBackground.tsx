"use client";

/*
  CanvasDotBackground — interactive dot grid, desktop only (≥ 1280px).

  Loaded exclusively via next/dynamic in DotBackground.tsx, so this entire
  module is never downloaded on mobile or tablet.

  Canvas is fixed to the viewport (not the full document):
  - dimensions: innerWidth × innerHeight  (~8 MB at 1920×1080)
  - was: scrollWidth × scrollHeight       (~54 MB for a long page)

  Mouse coordinates: clientX/clientY (viewport space, matches fixed canvas).
  No scroll offset, no ResizeObserver on body — only window resize matters.
*/

import { useEffect, useRef } from "react";

const DOT_SPACING     = 20;
const DOT_RADIUS      = 1;
const BASE_OPACITY    = 0.25;
const PEAK_OPACITY    = 1.0;
const WARP_SIGMA      = 208;
const OPACITY_SIGMA   = 180;
const COLOR_SIGMA     = 300;
const MAX_DISP        = 26;
const GRADIENT_RADIUS = 70;
const MOUSE_LERP      = 0.1;
const BLOOM_RAMP      = 500;
const DEV             = process.env.NODE_ENV === "development";

const TWO_WARP_SQ    = 2 * WARP_SIGMA * WARP_SIGMA;
const TWO_WARP2X_SQ  = 2 * (WARP_SIGMA * 2) ** 2;
const TWO_OPACITY_SQ = 2 * OPACITY_SIGMA * OPACITY_SIGMA;
const TWO_COLOR_SQ   = 2 * COLOR_SIGMA * COLOR_SIGMA;

const EFFECT_CUTOFF    = COLOR_SIGMA * 3;
const EFFECT_CUTOFF_SQ = EFFECT_CUTOFF ** 2;
const BASE_FILL        = `rgba(255,255,255,${BASE_OPACITY})`;
const BASE_A255        = Math.round(BASE_OPACITY * 255);

// ── Bucket system (precomputed Gaussian — zero Math.exp in draw loop) ──────────
const NUM_BUCKETS = Math.ceil(EFFECT_CUTOFF / DOT_SPACING);
const BUCKET_SIZE = EFFECT_CUTOFF / NUM_BUCKETS;

interface BucketMeta { dispFactor: number; r: number; g: number; b: number; a255: number; }

const BUCKET_META: BucketMeta[] = Array.from({ length: NUM_BUCKETS }, (_, b) => {
  const dist  = (b + 0.5) * BUCKET_SIZE;
  const dist2 = dist * dist;
  const g1    = Math.exp(-dist2 / TWO_WARP_SQ);
  const g2    = Math.exp(-dist2 / TWO_WARP2X_SQ);
  const opF   = Math.exp(-dist2 / TWO_OPACITY_SQ);
  const cF    = Math.exp(-dist2 / TWO_COLOR_SQ);
  const op    = BASE_OPACITY + (PEAK_OPACITY - BASE_OPACITY) * opF;
  return {
    dispFactor: g1 * 0.7 + g2 * 0.3,
    r:    Math.round(255 + (234 - 255) * cF),
    g:    Math.round(255 + ( 22 - 255) * cF),
    b:    Math.round(255 + ( 70 - 255) * cF),
    a255: Math.round(op * 255),
  };
});

const BUCKET_DISP = new Float32Array(NUM_BUCKETS);

// ── Dirty pixel tracking ──────────────────────────────────────────────────────
//
// Only the pixels written in the previous frame are zeroed at the start of each
// new frame — O(dotCount) clear instead of O(bufferSize).
//
const MAX_DIRTY  = 50000; // ~5 000 dots × 5 pixels × 2× safety margin
const DIRTY_IDXS = new Int32Array(MAX_DIRTY);

// ── Dev instrumentation ───────────────────────────────────────────────────────
type CanvasDevGlobals = { __canvasDrawMs?: number; __canvasState?: string };
declare global { interface Window extends CanvasDevGlobals {} }

// ── Base (idle) draw — runs at most once per idle entry ───────────────────────
function drawBaseBatch(
  ctx: CanvasRenderingContext2D,
  colEnd: number,
  rowEnd: number,
) {
  ctx.fillStyle = BASE_FILL;
  ctx.beginPath();
  for (let i = 0; i < colEnd; i++) {
    for (let j = 0; j < rowEnd; j++) {
      const x = i * DOT_SPACING;
      const y = j * DOT_SPACING;
      ctx.moveTo(x + DOT_RADIUS, y);
      ctx.arc(x, y, DOT_RADIUS, 0, Math.PI * 2);
    }
  }
  ctx.fill();
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function CanvasDotBackground() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const targetMouse  = useRef({ x: -9999, y: -9999 });
  const currentMouse = useRef({ x: -9999, y: -9999 });
  const intensity    = useRef(0);
  const lastMoveTime = useRef(Date.now());
  const rafRef       = useRef<number>(0);
  const dims         = useRef({ w: 0, h: 0 });
  const isPaused     = useRef(false);
  const idleDrawn    = useRef(false);
  const imgDataRef   = useRef<ImageData | null>(null);
  const dirtyLenRef  = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resume = () => {
      if (isPaused.current) {
        isPaused.current = false;
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    // Resize to viewport only — removes the scrollHeight allocation that was
    // the primary source of excess RAM (54 MB → 8 MB at 1920×1080).
    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      dims.current  = { w, h };
      canvas.width  = w;
      canvas.height = h;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      imgDataRef.current  = ctx.createImageData(w, h);
      dirtyLenRef.current = 0;
      idleDrawn.current   = false;
      resume();
    };

    const onMouseMove = (e: MouseEvent) => {
      // clientX/clientY: viewport-relative, matches fixed canvas coordinate space
      targetMouse.current  = { x: e.clientX, y: e.clientY };
      lastMoveTime.current = Date.now();
      idleDrawn.current    = false;
      resume();
    };

    const onMouseLeave = () => { targetMouse.current = { x: -9999, y: -9999 }; };

    const draw = () => {
      const t0 = DEV ? performance.now() : 0;

      const cm = currentMouse.current;
      const tm = targetMouse.current;
      cm.x += (tm.x - cm.x) * MOUSE_LERP;
      cm.y += (tm.y - cm.y) * MOUSE_LERP;

      const elapsed         = Date.now() - lastMoveTime.current;
      const targetIntensity = Math.min(1, elapsed / BLOOM_RAMP);
      const lerpSpeed       = targetIntensity > intensity.current ? 0.02 : 0.12;
      intensity.current    += (targetIntensity - intensity.current) * lerpSpeed;

      const { w: fullW, h: fullH } = dims.current;

      // Only the dots visible in the viewport — no scroll overdraw
      const colEnd = Math.ceil(fullW / DOT_SPACING) + 1;
      const rowEnd = Math.ceil(fullH / DOT_SPACING) + 1;

      const mx = cm.x;
      const my = cm.y;
      const hasMouseInteraction = mx > -999;
      const isSettled = !hasMouseInteraction && cm.x < -9000 && intensity.current < 0.001;

      if (isSettled) {
        if (!idleDrawn.current) {
          ctx.clearRect(0, 0, fullW, fullH);
          drawBaseBatch(ctx, colEnd, rowEnd);
          idleDrawn.current = true;
        }
        if (DEV) { window.__canvasDrawMs = 0; window.__canvasState = "paused"; }
        isPaused.current = true;
        rafRef.current   = 0;
        return;
      }

      ctx.clearRect(0, 0, fullW, fullH);

      if (!hasMouseInteraction) {
        drawBaseBatch(ctx, colEnd, rowEnd);

      } else {
        // ── Interactive: ImageData + dirty pixel tracking ──────────────────────
        const imgData = imgDataRef.current;
        if (!imgData) { rafRef.current = requestAnimationFrame(draw); return; }

        const data = imgData.data;
        const imgW = imgData.width;
        const imgH = imgData.height;
        const dit  = DIRTY_IDXS;
        let   dl   = dirtyLenRef.current;

        // Clear only pixels touched last frame — not the entire buffer
        for (let d = 0; d < dl; d++) {
          const i = dit[d];
          data[i] = 0; data[i + 1] = 0; data[i + 2] = 0; data[i + 3] = 0;
        }
        dl = 0;

        const strength = 0.3 + 0.7 * intensity.current;
        for (let b = 0; b < NUM_BUCKETS; b++) {
          BUCKET_DISP[b] = MAX_DISP * BUCKET_META[b].dispFactor * strength;
        }

        for (let i = 0; i < colEnd; i++) {
          for (let j = 0; j < rowEnd; j++) {
            const bx    = i * DOT_SPACING;
            const by    = j * DOT_SPACING;
            const dx    = bx - mx;
            const dy    = by - my;
            const dist2 = dx * dx + dy * dy;

            let cx: number, cy: number;
            let r: number, g: number, bC: number, a: number;

            if (dist2 > EFFECT_CUTOFF_SQ) {
              cx = bx; cy = by;
              r = 255; g = 255; bC = 255; a = BASE_A255;
            } else {
              const dist    = Math.sqrt(dist2);
              const bucket  = Math.min(NUM_BUCKETS - 1, (dist / BUCKET_SIZE) | 0);
              const invDist = dist > 0 ? 1 / dist : 0;
              cx = Math.round(bx + dx * invDist * BUCKET_DISP[bucket]);
              cy = Math.round(by + dy * invDist * BUCKET_DISP[bucket]);
              const m = BUCKET_META[bucket];
              r = m.r; g = m.g; bC = m.b; a = m.a255;
            }

            // Centre pixel — full alpha
            if (cx >= 0 && cx < imgW && cy >= 0 && cy < imgH) {
              const idx = (cy * imgW + cx) * 4;
              if (dl < MAX_DIRTY) dit[dl++] = idx;
              data[idx] = r; data[idx + 1] = g; data[idx + 2] = bC; data[idx + 3] = a;
            }

            // 4 cardinal neighbours — half alpha, for a soft dot
            const ah = a >> 1;

            if (cx + 1 < imgW && cy >= 0 && cy < imgH) {
              const idx = (cy * imgW + cx + 1) * 4;
              if (dl < MAX_DIRTY) dit[dl++] = idx;
              data[idx] = r; data[idx + 1] = g; data[idx + 2] = bC; data[idx + 3] = ah;
            }
            if (cx - 1 >= 0 && cy >= 0 && cy < imgH) {
              const idx = (cy * imgW + cx - 1) * 4;
              if (dl < MAX_DIRTY) dit[dl++] = idx;
              data[idx] = r; data[idx + 1] = g; data[idx + 2] = bC; data[idx + 3] = ah;
            }
            if (cx >= 0 && cx < imgW && cy + 1 < imgH) {
              const idx = ((cy + 1) * imgW + cx) * 4;
              if (dl < MAX_DIRTY) dit[dl++] = idx;
              data[idx] = r; data[idx + 1] = g; data[idx + 2] = bC; data[idx + 3] = ah;
            }
            if (cx >= 0 && cx < imgW && cy - 1 >= 0) {
              const idx = ((cy - 1) * imgW + cx) * 4;
              if (dl < MAX_DIRTY) dit[dl++] = idx;
              data[idx] = r; data[idx + 1] = g; data[idx + 2] = bC; data[idx + 3] = ah;
            }
          }
        }

        dirtyLenRef.current = dl;

        // Single GPU blit — all dots at once, no scroll offset needed
        ctx.putImageData(imgData, 0, 0);

        // Radial darkening at cursor (one canvas call, clamped to gradient radius)
        const grad = ctx.createRadialGradient(mx, my, 0, mx, my, GRADIENT_RADIUS);
        grad.addColorStop(0.3221, "rgba(13,14,13,1)");
        grad.addColorStop(0.6683, "rgba(13,14,13,0.5)");
        grad.addColorStop(1,      "rgba(13,14,13,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(
          Math.max(0, mx - GRADIENT_RADIUS),
          Math.max(0, my - GRADIENT_RADIUS),
          GRADIENT_RADIUS * 2,
          GRADIENT_RADIUS * 2,
        );
      }

      if (DEV) {
        window.__canvasDrawMs = +(performance.now() - t0).toFixed(2);
        window.__canvasState  = hasMouseInteraction ? "active" : "fading";
      }
      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    // Only window resize — body ResizeObserver removed (it fired on every GSAP
    // animation that changed element height, causing repeated canvas reallocations)
    window.addEventListener("resize",    resize);
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize",    resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  // fixed inset-0: canvas covers only the viewport, positioned by CSS
  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden="true"
    />
  );
}
