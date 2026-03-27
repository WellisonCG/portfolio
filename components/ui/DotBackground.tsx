"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

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

function StaticDotGrid() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden="true"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(255,255,255,${BASE_OPACITY}) 1px, transparent 1px)`,
        backgroundSize:  `${DOT_SPACING}px ${DOT_SPACING}px`,
      }}
    />
  );
}

// ── Canvas interactive — ≥ 1280px ─────────────────────────────────────────────
function CanvasDotBackground() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const targetMouse  = useRef({ x: -9999, y: -9999 });
  const currentMouse = useRef({ x: -9999, y: -9999 });
  const intensity    = useRef(0);
  const lastMoveTime = useRef(Date.now());
  const rafRef       = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const w = document.documentElement.scrollWidth;
      const h = document.documentElement.scrollHeight;
      canvas.style.width  = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.width  = w;
      canvas.height = h;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    };

    const onMouseMove = (e: MouseEvent) => {
      targetMouse.current  = { x: e.pageX, y: e.pageY };
      lastMoveTime.current = Date.now();
    };

    const onMouseLeave = () => {
      targetMouse.current = { x: -9999, y: -9999 };
    };

    const draw = () => {
      currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * MOUSE_LERP;
      currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * MOUSE_LERP;

      const elapsed         = Date.now() - lastMoveTime.current;
      const targetIntensity = Math.min(1, elapsed / BLOOM_RAMP);
      const lerpSpeed       = targetIntensity > intensity.current ? 0.02 : 0.12;
      intensity.current    += (targetIntensity - intensity.current) * lerpSpeed;

      const fullW = document.documentElement.scrollWidth;
      const fullH = document.documentElement.scrollHeight;

      const scrollY    = window.scrollY;
      const viewH      = window.innerHeight;
      const buffer     = Math.max(WARP_SIGMA, COLOR_SIGMA) + MAX_DISP;
      const drawTop    = Math.max(0,     scrollY - buffer);
      const drawBottom = Math.min(fullH, scrollY + viewH + buffer);

      ctx.clearRect(0, drawTop, fullW, drawBottom - drawTop);

      const { x: mx, y: my } = currentMouse.current;

      const colStart = 0;
      const colEnd   = Math.ceil(fullW / DOT_SPACING) + 1;
      const rowStart = Math.floor(drawTop   / DOT_SPACING);
      const rowEnd   = Math.ceil(drawBottom / DOT_SPACING) + 1;

      for (let i = colStart; i < colEnd; i++) {
        for (let j = rowStart; j < rowEnd; j++) {
          const baseX = Math.round(i * DOT_SPACING);
          const baseY = Math.round(j * DOT_SPACING);

          let x       = baseX;
          let y       = baseY;
          let opacity = BASE_OPACITY;
          let r = 255, g = 255, b = 255;

          if (mx > -999) {
            const dx   = baseX - mx;
            const dy   = baseY - my;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > 0) {
              const g1         = Math.exp(-(dist * dist) / (2 * WARP_SIGMA * WARP_SIGMA));
              const g2         = Math.exp(-(dist * dist) / (2 * (WARP_SIGMA * 2) * (WARP_SIGMA * 2)));
              const dispFactor = g1 * 0.7 + g2 * 0.3;
              const strength   = 0.3 + 0.7 * intensity.current;

              const displacement = MAX_DISP * dispFactor * strength;
              x += (dx / dist) * displacement;
              y += (dy / dist) * displacement;

              const opacityFactor = Math.exp(-(dist * dist) / (2 * OPACITY_SIGMA * OPACITY_SIGMA));
              opacity = BASE_OPACITY + (PEAK_OPACITY - BASE_OPACITY) * opacityFactor;

              const colorFactor = Math.exp(-(dist * dist) / (2 * COLOR_SIGMA * COLOR_SIGMA));
              r = Math.round(255 + (234 - 255) * colorFactor);
              g = Math.round(255 + ( 22 - 255) * colorFactor);
              b = Math.round(255 + ( 70 - 255) * colorFactor);
            }
          }

          ctx.fillStyle = `rgba(${r},${g},${b},${opacity.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(x, y, DOT_RADIUS, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (mx > -999) {
        const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, GRADIENT_RADIUS);
        gradient.addColorStop(0.3221, "rgba(13,14,13,1)");
        gradient.addColorStop(0.6683, "rgba(13,14,13,0.5)");
        gradient.addColorStop(1,      "rgba(13,14,13,0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, drawTop, fullW, drawBottom - drawTop);
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    const ro = new ResizeObserver(resize);
    ro.observe(document.body);
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute top-0 left-0 -z-10"
      aria-hidden="true"
    />
  );
}

// ── Entry point ───────────────────────────────────────────────────────────────
export default function DotBackground() {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (isDesktop === null) return null;
  return isDesktop ? <CanvasDotBackground /> : <StaticDotGrid />;
}
