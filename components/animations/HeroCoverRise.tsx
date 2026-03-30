/*
  HeroCoverRise
  ─────────────────────────────────────────────────────────────────────────────
  Entrance animation for project-page hero cover images.

  Concept: the cover starts tilted back (like a screen laying flat) and
  rotates up to face the viewer on page load. The pivot point is the bottom
  edge of the image, so it feels like the screen is standing up.

  Implementation:
  - GSAP `from` with rotationX + transformPerspective — no CSS keyframes needed.
  - transformOrigin: "bottom center" — pivots from the bottom edge.
  - Screenshot mode (?screenshot=1) skips the animation entirely.

  Usage:
    <HeroCoverRise className="...layout classes...">
      <div className="overflow-hidden rounded-[24px] ...">
        <Image ... />
      </div>
    </HeroCoverRise>

  The visual clip/border lives on the inner div (not on this wrapper)
  to avoid Safari's "overflow:hidden flattens 3D transforms" quirk.
*/

"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export default function HeroCoverRise({ className, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  // useLayoutEffect runs before the browser paints, so GSAP sets the element
  // to its `from` state (rotated back) before any pixel is visible — no flash.
  useLayoutEffect(() => {
    if (!ref.current) return;
    if (new URLSearchParams(window.location.search).get("screenshot") === "1") return;

    const el = ref.current;

    // Set perspective + origin before animating so they're stable properties,
    // not part of the keyframe calculation.
    gsap.set(el, {
      transformPerspective: 1200,
      transformOrigin: "bottom center",
    });

    gsap.from(el, {
      rotationX: 28,
      opacity: 0.4,
      duration: 1.3,
      delay: 0.1,
      ease: "power2.out",
    });
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
