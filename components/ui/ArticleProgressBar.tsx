/*
  ArticleProgressBar
  ─────────────────────────────────────────────────────────────────────────────
  A 3px red bar fixed just below the sticky nav (top: 80px) that tracks
  scroll progress through the article body.

  Range:
  - 0%   → top of the first section (#context) reaches the nav bottom
  - 100% → bottom of the last section (#reflection) reaches the nav bottom

  Props:
  - startId: id of the first anchor element  (default "context")
  - endId:   id of the last anchor element   (default "reflection")
*/

"use client";

import { useEffect, useState } from "react";

interface ArticleProgressBarProps {
  startId?: string;
  endId?: string;
}

export default function ArticleProgressBar({
  startId = "context",
  endId = "reflection",
}: ArticleProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const NAV_HEIGHT = 80;

    const calc = () => {
      const startEl = document.getElementById(startId);
      const endEl   = document.getElementById(endId);
      if (!startEl || !endEl) return;

      // Absolute page positions, independent of current scroll
      const startY = startEl.getBoundingClientRect().top  + window.scrollY - NAV_HEIGHT;
      const endY   = endEl.getBoundingClientRect().bottom + window.scrollY - NAV_HEIGHT;

      const raw = (window.scrollY - startY) / (endY - startY);
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    window.addEventListener("scroll", calc, { passive: true });
    calc(); // initialise on mount
    return () => window.removeEventListener("scroll", calc);
  }, [startId, endId]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 z-[49] h-[2px] w-full bg-accent"
      style={{ top: "80px", transform: `scaleX(${progress})`, transformOrigin: "center", transition: "transform 0.15s ease-out" }}
    />
  );
}
