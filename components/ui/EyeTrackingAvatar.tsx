"use client";

/*
  EyeTrackingAvatar
  ─────────────────────────────────────────────────────────────────────────────
  Renderiza o contact-avatar.svg como <img> e sobrepõe um SVG transparente
  com as íris animadas que seguem o cursor do mouse.

  Estrutura dos olhos extraída do SVG original:
  - Globe mask (ellipse): delimita o globo ocular — rx=11.5, ry=17.5
  - Iris (circle r=6.5): pupila escura animável
  - Highlight (circle r=3): brilho, offset fixo (-3.5, -3.5) da íris

  O movimento máximo da íris dentro do globo (sem sair da máscara):
    rx_max = globe_rx - iris_r = 11.5 - 6.5 = 5px
    ry_max = globe_ry - iris_r = 17.5 - 6.5 = 11px

  A posição é constrainada a uma elipse de (5, 11) em torno do centro do globo.
  A atualização usa RAF + lerp direto no DOM para evitar re-renders React.
*/

import { useEffect, useId, useRef } from "react";
import Image from "next/image";
import { CTA_AVATAR } from "@/lib/assets";

// Centros dos globos oculares no espaço do SVG (152×199)
const RIGHT = { cx: 99.4062, cy: 112.104 };
const LEFT  = { cx: 46.4062, cy: 112.104 };

// Máximo deslocamento da íris dentro do globo (globe_r - iris_r)
const MAX_RX = 5;
const MAX_RY = 11;

const LERP      = 0.08;
const HL_OFFSET = { x: -3.5, y: -3.5 }; // highlight relativo à íris

/** Clamp (dx, dy) ao interior de uma elipse (rx, ry) */
function clampEllipse(dx: number, dy: number, rx: number, ry: number) {
  const scale = Math.sqrt((dx / rx) ** 2 + (dy / ry) ** 2);
  return scale <= 1
    ? { x: dx, y: dy }
    : { x: dx / scale, y: dy / scale };
}

export default function EyeTrackingAvatar() {
  const uid          = useId();
  const maskR        = `mask-r-${uid}`;
  const maskL        = `mask-l-${uid}`;
  const containerRef = useRef<HTMLDivElement>(null);

  // Refs para os elementos SVG (atualização direta, sem state)
  const rIrisRef = useRef<SVGCircleElement>(null);
  const rHighRef = useRef<SVGCircleElement>(null);
  const lIrisRef = useRef<SVGCircleElement>(null);
  const lHighRef = useRef<SVGCircleElement>(null);

  // Posições correntes (lerped) e alvo
  const rCur = useRef({ x: RIGHT.cx, y: RIGHT.cy });
  const lCur = useRef({ x: LEFT.cx,  y: LEFT.cy  });
  const rTgt = useRef({ x: RIGHT.cx, y: RIGHT.cy });
  const lTgt = useRef({ x: LEFT.cx,  y: LEFT.cy  });
  const rafRef   = useRef<number>(0);
  const isPaused = useRef(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;

      const rect   = el.getBoundingClientRect();
      const scaleX = 152 / rect.width;
      const scaleY = 199 / rect.height;

      // Posição do cursor no espaço do SVG
      const mx = (e.clientX - rect.left) * scaleX;
      const my = (e.clientY - rect.top)  * scaleY;

      const rc = clampEllipse(mx - RIGHT.cx, my - RIGHT.cy, MAX_RX, MAX_RY);
      rTgt.current = { x: RIGHT.cx + rc.x, y: RIGHT.cy + rc.y };

      const lc = clampEllipse(mx - LEFT.cx, my - LEFT.cy, MAX_RX, MAX_RY);
      lTgt.current = { x: LEFT.cx + lc.x, y: LEFT.cy + lc.y };

      // Resume RAF if it was paused (eyes had settled)
      if (isPaused.current) {
        isPaused.current = false;
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    const tick = () => {
      const rDx = rTgt.current.x - rCur.current.x;
      const rDy = rTgt.current.y - rCur.current.y;
      const lDx = lTgt.current.x - lCur.current.x;
      const lDy = lTgt.current.y - lCur.current.y;

      // Eyes have settled — pause RAF until next mouse move
      if (
        Math.abs(rDx) < 0.01 && Math.abs(rDy) < 0.01 &&
        Math.abs(lDx) < 0.01 && Math.abs(lDy) < 0.01
      ) {
        isPaused.current = true;
        return;
      }

      // Lerp
      rCur.current.x += rDx * LERP;
      rCur.current.y += rDy * LERP;
      lCur.current.x += lDx * LERP;
      lCur.current.y += lDy * LERP;

      // Atualiza DOM diretamente
      rIrisRef.current?.setAttribute("cx", rCur.current.x.toFixed(3));
      rIrisRef.current?.setAttribute("cy", rCur.current.y.toFixed(3));
      rHighRef.current?.setAttribute("cx", (rCur.current.x + HL_OFFSET.x).toFixed(3));
      rHighRef.current?.setAttribute("cy", (rCur.current.y + HL_OFFSET.y).toFixed(3));

      lIrisRef.current?.setAttribute("cx", lCur.current.x.toFixed(3));
      lIrisRef.current?.setAttribute("cy", lCur.current.y.toFixed(3));
      lHighRef.current?.setAttribute("cx", (lCur.current.x + HL_OFFSET.x).toFixed(3));
      lHighRef.current?.setAttribute("cy", (lCur.current.y + HL_OFFSET.y).toFixed(3));

      rafRef.current = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.addEventListener("mousemove", onMouseMove);
          if (isPaused.current) {
            isPaused.current = false;
            rafRef.current = requestAnimationFrame(tick);
          }
        } else {
          window.removeEventListener("mousemove", onMouseMove);
          cancelAnimationFrame(rafRef.current);
          isPaused.current = true;
        }
      },
      { threshold: 0 },
    );

    if (containerRef.current) observer.observe(containerRef.current);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      observer.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative" style={{ width: 152, height: 199 }}>

      {/* Avatar base — raster + elementos estáticos do SVG */}
      <Image
        src={CTA_AVATAR}
        alt="Wellison avatar"
        width={152}
        height={199}
        unoptimized
      />

      {/*
        Overlay SVG — transparente, cobre exatamente o avatar.
        1. Redesenha os círculos brancos (sclera) para cobrir as íris estáticas do <img>.
        2. Aplica as mesmas máscaras do SVG original.
        3. Desenha as íris animadas dentro das máscaras.
      */}
      <svg
        width={152}
        height={199}
        viewBox="0 0 152 199"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <defs>
          <mask id={maskR} maskUnits="userSpaceOnUse">
            <ellipse cx="99.4062" cy="112.104" rx="11.5" ry="17.5" fill="white" />
          </mask>
          <mask id={maskL} maskUnits="userSpaceOnUse">
            <ellipse cx="46.4062" cy="112.104" rx="11.5" ry="17.5" fill="white" />
          </mask>
        </defs>

        {/* Sclera — cobre íris estáticas do <img> */}
        <circle cx="47.4062" cy="111.104" r="8.5" fill="white" />
        <circle cx="99.4062" cy="111.104" r="8.5" fill="white" />

        {/* Olho direito */}
        <g mask={`url(#${maskR})`}>
          <circle ref={rIrisRef} cx="99.4062" cy="110.104" r="6.5" fill="#1B1B1B" />
          <circle ref={rHighRef} cx="95.9062" cy="106.604" r="3"   fill="white"   />
        </g>

        {/* Olho esquerdo */}
        <g mask={`url(#${maskL})`}>
          <circle ref={lIrisRef} cx="46.4062" cy="110.104" r="6.5" fill="#1B1B1B" />
          <circle ref={lHighRef} cx="42.9062" cy="106.604" r="3"   fill="white"   />
        </g>
      </svg>

    </div>
  );
}
