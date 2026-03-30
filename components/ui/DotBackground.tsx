"use client";

/*
  DotBackground — entry point.

  ≥ 1280px: CanvasDotBackground (interactive dot grid with mouse warp effect).
            Loaded via next/dynamic so the canvas JS is never downloaded on
            mobile or tablet — the chunk only arrives when isDesktop becomes true.

  < 1280px: StaticDotGrid (pure CSS radial-gradient, zero JS overhead).
*/

import { useLayoutEffect, useState } from "react";
import dynamic from "next/dynamic";

const DOT_SPACING  = 20;
const BASE_OPACITY = 0.25;

// Canvas chunk is lazy-loaded: not downloaded until isDesktop === true.
const CanvasDotBackground = dynamic(
  () => import("./CanvasDotBackground"),
  { ssr: false, loading: () => null },
);

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
