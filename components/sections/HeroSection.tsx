/*
  HeroSection
  ─────────────────────────────────────────────────────────────────────────────
  Layout fiel ao Figma (node 1119:4128):

  Container: 1200px, px-[98px] py-[18px], overflow-hidden, relative

  Layers absolutas (todas relativas ao container de 1200px):
  - Avatar:  left-[112px] top-[34px], rotated -9.31deg
  - Note:    left-[265px] top-[13px] (layer separada, NÃO rotaciona com avatar)
  - Cursor:  right-[224px] top-[211px], overflow-clip — icon absolute (0,0),
             label absolute left-[20px] top-[16px] (sobrepostos, não flex)
  - Sticker: left-[910px] top-[112px], rotated 8deg

  Coluna de texto centralizada (w-[508px]):
  - "Hello, I'm": 48px, leading-normal
  - Box WELLISON: border-[0.867px] (sub-pixel do Figma), px-29 py-24, 4 corner dots
  - Quote tagline: 20px, w-[362px], com scribble decorativo no canto superior-direito
    (o scribble pertence à Quote, não ao Note — posição Figma: inset [-1.67% 0.09% 83.57% 97.51%])

  GSAP targets: #hero-avatar, #hero-text, #hero-sticker, #hero-scroll

  Cursor state machine:
  ┌──────────┐   animation ends   ┌──────────┐
  │ resizing │ ─────────────────► │   idle   │
  └──────────┘                    └──────────┘
       ▲                               │
       │   box shrinks (scale 1)       │ user clicks WELLISON
       └───────────────────────────────┘

  resizing: cursor BR→TL, drag 2px, box grows, cursor returns BR
  idle:     cursor floats organically around BR; WELLISON is interactive
            - hover: cursor:pointer + tooltip "Don't click"
            - click: box shrinks → triggers resizing again

  Breakpoints:
  - default (< 640px): avatar hidden, cursor hidden
  - sm (640–767px):    avatar visible (sm), no speech bubble, no cursor
  - md (768–1023px):   cursor visible (md:block), no speech bubble, drag disabled
  - lg (1024–1279px):  speech bubble visible (lg:block), drag active, dynamic GSAP cursor
  - xl (1280px+):      notes visible (xl:block), hardcoded GSAP offsets
*/

"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import {
  CURSOR_ICON,
  HERO_ARROW,
  HERO_AVATAR,
} from "@/lib/assets";
import NotesIllustration from "@/components/ui/NotesIllustration";
import MiniPlayer     from "@/components/ui/MiniPlayer";
import CassettePlayer from "@/components/ui/CassettePlayer";

export default function HeroSection() {
  const cursorRef      = useRef<HTMLDivElement>(null);
  const wellisonBoxRef = useRef<HTMLDivElement>(null);
  const tooltipRef     = useRef<HTMLDivElement>(null);
  const idleTlRef      = useRef<gsap.core.Timeline | null>(null);
  const disturbedRef   = useRef(false);

  const playBtnRef       = useRef<HTMLDivElement>(null);
  const nothingHereRef   = useRef<HTMLDivElement>(null);
  const closePlayerRef   = useRef<(() => void) | null>(null);
  const avatarRef        = useRef<HTMLDivElement>(null);
  const notesRef         = useRef<HTMLDivElement>(null);
  const sectionRef       = useRef<HTMLElement>(null);
  const heroTextRef      = useRef<HTMLDivElement>(null);
  const dragState        = useRef({ active: false, sx: 0, sy: 0, ox: 0, oy: 0, minX: 0, maxX: 0 });
  const notesDragState   = useRef({ active: false, sx: 0, sy: 0, ox: 0, oy: 0, minX: 0, maxX: 0 });

  const [phase,          setPhase]       = useState<"resizing" | "idle">("resizing");
  const [showTooltip,    setShowTooltip] = useState(false);
  const [playerOpen,     setPlayerOpen]  = useState(false);
  const [dragging,       setDragging]    = useState(false);
  const [notesDragging,  setNotesDragging] = useState(false);

  const onAvatarDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const el      = avatarRef.current;
    const section = sectionRef.current;
    if (!el || !section) return;

    const ox   = (gsap.getProperty(el, "x") as number) || 0;
    const oy   = (gsap.getProperty(el, "y") as number) || 0;
    const rect = el.getBoundingClientRect();
    const sr   = section.getBoundingClientRect();

    const naturalLeft = rect.left - ox;

    dragState.current = {
      active: true,
      sx: e.clientX,
      sy: e.clientY,
      ox,
      oy,
      minX: sr.left - naturalLeft,
      maxX: sr.right - rect.width - naturalLeft,
    };
    setDragging(true);
  }, []);

  const onAvatarMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const ds = dragState.current;
    if (!ds.active) return;
    const el = avatarRef.current;
    if (!el) return;

    const rawX = ds.ox + (e.clientX - ds.sx);
    const rawY = ds.oy + (e.clientY - ds.sy);

    gsap.set(el, {
      x: Math.max(ds.minX, Math.min(ds.maxX, rawX)),
      y: rawY,
    });
  }, []);

  const springAvatarBack = useCallback(() => {
    dragState.current.active = false;
    setDragging(false);

    const el      = avatarRef.current;
    const section = sectionRef.current;
    const textCol = heroTextRef.current;
    if (!el || !section) return;

    const currentX = (gsap.getProperty(el, "x") as number) || 0;
    const currentY = (gsap.getProperty(el, "y") as number) || 0;
    const rect     = el.getBoundingClientRect();
    const sr       = section.getBoundingClientRect();

    const naturalLeft = rect.left - currentX;
    const naturalTop  = rect.top  - currentY;

    const minY = sr.top    - naturalTop;
    const maxY = sr.bottom - rect.height - naturalTop;
    const targetY = Math.max(minY, Math.min(maxY, currentY));

    let targetX = currentX;
    if (textCol) {
      const tr = textCol.getBoundingClientRect();
      const overlapsText = rect.right > tr.left && rect.left < tr.right;

      if (overlapsText) {
        const avatarCenterX = rect.left + rect.width  / 2;
        const textCenterX   = tr.left   + tr.width    / 2;

        if (avatarCenterX < textCenterX) {
          targetX = (tr.left - rect.width) - naturalLeft;
        } else {
          targetX = tr.right - naturalLeft;
        }

        targetX = Math.max(sr.left - naturalLeft, Math.min(sr.right - rect.width - naturalLeft, targetX));
      }
    }

    if (targetX !== currentX || targetY !== currentY) {
      gsap.to(el, { x: targetX, y: targetY, duration: 0.9, ease: "elastic.out(1, 0.4)" });
    }
  }, []);

  const onNotesDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const el      = notesRef.current;
    const section = sectionRef.current;
    if (!el || !section) return;

    const ox   = (gsap.getProperty(el, "x") as number) || 0;
    const oy   = (gsap.getProperty(el, "y") as number) || 0;
    const rect = el.getBoundingClientRect();
    const sr   = section.getBoundingClientRect();
    const naturalLeft = rect.left - ox;

    notesDragState.current = {
      active: true,
      sx: e.clientX,
      sy: e.clientY,
      ox,
      oy,
      minX: sr.left - naturalLeft,
      maxX: sr.right - rect.width - naturalLeft,
    };
    setNotesDragging(true);
  }, []);

  const onNotesMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const ds = notesDragState.current;
    if (!ds.active) return;
    const el = notesRef.current;
    if (!el) return;

    const rawX = ds.ox + (e.clientX - ds.sx);
    const rawY = ds.oy + (e.clientY - ds.sy);

    gsap.set(el, {
      x: Math.max(ds.minX, Math.min(ds.maxX, rawX)),
      y: rawY,
    });
  }, []);

  const springNotesBack = useCallback(() => {
    notesDragState.current.active = false;
    setNotesDragging(false);

    const el      = notesRef.current;
    const section = sectionRef.current;
    const textCol = heroTextRef.current;
    if (!el || !section) return;

    const currentX = (gsap.getProperty(el, "x") as number) || 0;
    const currentY = (gsap.getProperty(el, "y") as number) || 0;
    const rect     = el.getBoundingClientRect();
    const sr       = section.getBoundingClientRect();

    const naturalLeft = rect.left - currentX;
    const naturalTop  = rect.top  - currentY;

    const minY    = sr.top    - naturalTop;
    const maxY    = sr.bottom - rect.height - naturalTop;
    const targetY = Math.max(minY, Math.min(maxY, currentY));

    let targetX = currentX;
    if (textCol) {
      const tr = textCol.getBoundingClientRect();
      const overlapsText = rect.right > tr.left && rect.left < tr.right;
      if (overlapsText) {
        const notesCenterX = rect.left + rect.width / 2;
        const textCenterX  = tr.left   + tr.width  / 2;
        targetX = notesCenterX < textCenterX
          ? (tr.left - rect.width) - naturalLeft
          : tr.right - naturalLeft;
        targetX = Math.max(sr.left - naturalLeft, Math.min(sr.right - rect.width - naturalLeft, targetX));
      }
    }

    if (targetX !== currentX || targetY !== currentY) {
      gsap.to(el, { x: targetX, y: targetY, duration: 0.9, ease: "elastic.out(1, 0.4)" });
    }
  }, []);

  const getOriginRect = useCallback(
    () => playBtnRef.current?.getBoundingClientRect() ?? null,
    [],
  );

  const startResizing = useCallback(() => {
    const cursor = cursorRef.current;
    const box    = wellisonBoxRef.current;
    if (!cursor || !box) return;

    idleTlRef.current?.kill();

    // xl+ (≥1280px): use hardcoded offsets calibrated for the 1200px layout.
    // lg  (1024–1279px): compute delta dynamically so the cursor lands on the
    //   box's TL corner regardless of viewport width.
    let tX: number, tY: number;
    if (window.innerWidth >= 1280) {
      tX = -509; tY = -122;
    } else {
      const boxRect    = box.getBoundingClientRect();
      const cursorRect = cursor.getBoundingClientRect();
      tX = boxRect.left   - cursorRect.right;
      tY = boxRect.top    - cursorRect.bottom;
    }

    if (disturbedRef.current) {
      disturbedRef.current = false;

      gsap.timeline({ onComplete: () => setPhase("idle") })
        .to(cursor, { x: tX + 3, y: tY + 53, duration: 1.4, ease: "power2.inOut" })
        .to(cursor, { duration: 0.2 })
        .to(cursor, { x: tX,     y: tY,       duration: 0.7, ease: "power2.out" })
        .to(box,    { rotation: 0, x: 0, y: 0, duration: 0.7, ease: "power2.out" }, "<")
        .to(cursor, { x: tX - 2, y: tY - 2,   duration: 0.25, ease: "power2.out" })
        .to(cursor, { duration: 0.4 })
        .to(cursor, { x: 0,      y: 0,        duration: 1.5,  ease: "power2.inOut" });
    } else {
      gsap.timeline({ onComplete: () => setPhase("idle") })
        .to(cursor, { x: tX,     y: tY,       duration: 2,    ease: "power2.inOut" })
        .to(cursor, { duration: 0.3 })
        .to(cursor, { x: tX - 2, y: tY - 2,   duration: 0.25, ease: "power2.out" })
        .to(box,    { scale: 1.015,            duration: 0.5,  ease: "back.out(1.4)" }, "<")
        .to(cursor, { duration: 0.4 })
        .to(cursor, { x: 0,      y: 0,        duration: 1.5,  ease: "power2.inOut" });
    }
  }, []);

  const startIdle = useCallback(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    idleTlRef.current = gsap.timeline({ repeat: -1 })
      .to(cursor, { x: -14, y:  -8, duration: 2.1, ease: "sine.inOut" })
      .to(cursor, { x:   8, y:  14, duration: 1.8, ease: "sine.inOut" })
      .to(cursor, { x: -12, y:   6, duration: 2.3, ease: "sine.inOut" })
      .to(cursor, { x:  -6, y: -12, duration: 2.0, ease: "sine.inOut" })
      .to(cursor, { x:  10, y:  10, duration: 1.9, ease: "sine.inOut" })
      .to(cursor, { x:   0, y:   0, duration: 2.2, ease: "sine.inOut" });
  }, []);

  const handleClick = useCallback(() => {
    if (phase !== "idle") return;
    const box = wellisonBoxRef.current;
    if (!box) return;

    setShowTooltip(false);
    idleTlRef.current?.kill();
    disturbedRef.current = true;

    gsap.to(box, {
      rotation: -6,
      x: 8,
      y: 26,
      duration: 0.7,
      ease: "power2.in",
      onComplete: () => setPhase("resizing"),
    });
  }, [phase]);

  useEffect(() => {
    gsap.fromTo(
      [playBtnRef.current, nothingHereRef.current],
      { opacity: 0 },
      { opacity: 1, duration: 0.6, delay: 0.4, ease: "power2.out" },
    );
  }, []);

  useEffect(() => {
    if (phase === "resizing") {
      if (window.innerWidth < 1024) setPhase("idle");
      else startResizing();
    } else if (phase === "idle") {
      startIdle();
    }
  }, [phase, startResizing, startIdle]);

  const handleBoxMouseMove = useCallback((e: React.MouseEvent) => {
    const tooltip = tooltipRef.current;
    if (!tooltip) return;
    tooltip.style.left = `${e.clientX + 16}px`;
    tooltip.style.top  = `${e.clientY - 36}px`;
  }, []);

  const isIdle = phase === "idle";

  return (
    <section ref={sectionRef} id="hero" className="w-full flex flex-col items-center gap-[24px]">

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className={`fixed pointer-events-none z-50 transition-opacity duration-150 ${showTooltip ? "opacity-100" : "opacity-0"}`}
        aria-hidden="true"
      >
        <span className="animate-tooltip-pulse block bg-accent text-primary font-sans text-[12px] font-bold px-[12px] py-[6px] rounded-full whitespace-nowrap">
          Don&apos;t Click!
        </span>
      </div>

      {/* ── Main hero area ─────────────────────────────────────────────────── */}
      <div className="relative w-full max-w-[1200px] px-10 xl:px-[98px] py-[18px]">

        {/* Toca-fitas — visível apenas em lg+ */}
        <div
          ref={playBtnRef}
          className="hidden lg:block absolute left-[956px] top-[100px] z-0"
          style={{ transform: "rotate(-5deg)", opacity: 0 }}
        >
          <CassettePlayer onClick={() => {
            if (playerOpen) closePlayerRef.current?.();
            else            setPlayerOpen(true);
          }} />
        </div>

        {/* "Nothing here" — visível apenas em lg+ */}
        <div
          ref={nothingHereRef}
          className="hidden lg:block absolute left-[112px] top-[90px] z-[1] pointer-events-none select-none"
          style={{ opacity: 0 }}
          aria-hidden="true"
        >
          <p className="font-comic text-[13px] text-primary -rotate-[9.31deg] whitespace-nowrap">
            nothing here
          </p>
        </div>

        {/* Avatar — hidden below sm; drag active at lg+ only */}
        <div
          ref={avatarRef}
          id="hero-avatar"
          className={`absolute hidden sm:block left-2 top-[13px] md:left-[60px] lg:left-[112px] w-[200px] h-[155px] md:w-[250px] md:h-[195px] lg:w-[300px] lg:h-[230px] z-[2] select-none ${dragging ? "lg:cursor-grabbing" : "lg:cursor-grab"}`}
          aria-hidden="true"
          onPointerDown={onAvatarDown}
          onPointerMove={onAvatarMove}
          onPointerUp={springAvatarBack}
          onPointerCancel={springAvatarBack}
        >
          <div className="absolute left-0 top-[21px] -rotate-[9.31deg]">
            <Image
              src={HERO_AVATAR}
              alt="Wellison avatar with headphones"
              width={152}
              height={199}
              className="shadow-[2px_2px_6px_0px_rgba(0,0,0,0.08)]"
              draggable={false}
              unoptimized
            />
          </div>
        </div>

        {/* Speech bubble + arrow — lg+ only; sibling of avatar, not drag-wired */}
        <div
          className="hidden lg:block absolute left-[265px] top-[13px] z-[2] pointer-events-none select-none"
          aria-hidden="true"
        >
          <div className="-rotate-[6.68deg]">
            <p className="font-comic text-[16px] leading-[1.3] font-bold text-primary whitespace-nowrap">
              Where&apos;s my
              <br />
              work playlist?
            </p>
          </div>
          <div className="absolute left-[8px] top-[59px]">
            <Image src={HERO_ARROW} alt="" width={18} height={26} unoptimized />
          </div>
        </div>

        {/* Notes illustration — visível apenas em xl+ */}
        <div
          ref={notesRef}
          id="hero-sticker"
          className={`hidden xl:block absolute left-[910px] top-[45px] z-[2] select-none ${notesDragging ? "lg:cursor-grabbing" : "lg:cursor-grab"}`}
          aria-hidden="true"
          onPointerDown={onNotesDown}
          onPointerMove={onNotesMove}
          onPointerUp={springNotesBack}
          onPointerCancel={springNotesBack}
        >
          <NotesIllustration />
        </div>

        {/* Cursor — hidden below md; animated at lg+ */}
        <div
          ref={cursorRef}
          id="hero-cursor"
          className="hidden md:block absolute right-4 top-[190px] md:right-[180px] md:top-[210px] lg:right-[224px] lg:top-[226px] pointer-events-none z-10"
          aria-hidden="true"
        >
          <Image src={CURSOR_ICON} alt="" width={124} height={43} unoptimized />
        </div>

        {/* ── Coluna de texto centralizada ─────────────────────────────────── */}
        <div
          ref={heroTextRef}
          id="hero-text"
          className="mx-auto flex w-full max-w-[508px] flex-col items-center gap-[16px]"
        >
          <p className="font-sans text-[28px] md:text-[38px] lg:text-[48px] leading-normal text-primary text-center w-full">
            Hello, I&apos;m
          </p>

          {/* WELLISON box — interativa em idle */}
          <div
            ref={wellisonBoxRef}
            className={`relative w-full px-[12px] md:px-[22px] lg:px-[29px] py-[12px] md:py-[18px] lg:py-[24px] select-none ${isIdle ? "cursor-pointer" : ""}`}
            style={{ border: "0.867px solid #b6b6c2" }}
            onClick={handleClick}
            onMouseEnter={(e) => {
              if (!isIdle) return;
              if (tooltipRef.current) {
                tooltipRef.current.style.left = `${e.clientX + 16}px`;
                tooltipRef.current.style.top  = `${e.clientY - 36}px`;
              }
              setShowTooltip(true);
            }}
            onMouseMove={handleBoxMouseMove}
            onMouseLeave={() => setShowTooltip(false)}
          >
            {/* Corner dots */}
            <span className="absolute bg-muted" style={{ width: "6.189px", height: "6.189px", left:  "-2.91px", top:    "-2.91px" }} />
            <span className="absolute bg-muted" style={{ width: "6.189px", height: "6.189px", right: "-2.91px", top:    "-2.91px" }} />
            <span className="absolute bg-muted" style={{ width: "6.189px", height: "6.189px", left:  "-2.91px", bottom: "-3.22px" }} />
            <span className="absolute bg-muted" style={{ width: "6.189px", height: "6.189px", right: "-2.91px", bottom: "-3.22px" }} />

            <span
              className="block font-sans font-black text-primary whitespace-nowrap"
              style={{ fontSize: "clamp(52px, 18vw, 94.378px)", lineHeight: 0.75 }}
            >
              WELLISON
            </span>
          </div>

          {/* Quote/tagline */}
          <div className="relative shrink-0 w-full">
            <p className="font-sans text-[14px] md:text-[17px] lg:text-[20px] leading-[1.5] text-muted text-center w-full lg:w-[362px] mx-auto">
              Solving problems, delivering results and
              <br />
              having fun with design.
            </p>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ───────────────────────────────────────────────── */}
      <div id="hero-scroll" className="flex flex-col items-center gap-[8px]">
        <svg width="22" height="40" viewBox="0 0 22 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="0.5" y="0.5" width="21" height="39" rx="10.5" stroke="#F9FAFD"/>
          <path className="animate-scroll-dot" fillRule="evenodd" clipRule="evenodd" d="M11 17C11.2761 17 11.5 17.2239 11.5 17.5V29.2929L14.6464 26.1464C14.8417 25.9512 15.1583 25.9512 15.3536 26.1464C15.5488 26.3417 15.5488 26.6583 15.3536 26.8536L11.3536 30.8536C11.1583 31.0488 10.8417 31.0488 10.6464 30.8536L6.64645 26.8536C6.45118 26.6583 6.45118 26.3417 6.64645 26.1464C6.84171 25.9512 7.15829 25.9512 7.35355 26.1464L10.5 29.2929V17.5C10.5 17.2239 10.7239 17 11 17Z" fill="#F9FAFD"/>
        </svg>
        <p className="font-sans text-[16px] leading-[1.3] text-primary text-center">
          Scroll to see my work
        </p>
      </div>

      {playerOpen && (
        <MiniPlayer
          getOriginRect={getOriginRect}
          onClose={() => { closePlayerRef.current = null; setPlayerOpen(false); }}
          onRegisterClose={(fn) => { closePlayerRef.current = fn; }}
        />
      )}

    </section>
  );
}
