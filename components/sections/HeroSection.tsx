/*
  HeroSection
  ─────────────────────────────────────────────────────────────────────────────
  Layout fiel ao Figma (node 1119:4128):

  Container: 1200px, px-[98px] py-[18px], overflow-hidden, relative

  Layers absolutas (todas relativas ao container de 1200px):
  - Avatar:  left-[112px] top-[34px], rotated -9.31deg
  - Note:    left-[265px] top-[13px] (layer separada, NÃO rotaciona com avatar)
  - Cursor:  filho do #box-name em left-[506px] top-[120px] (BR do box),
             segue o box em qualquer resolução; anima até TL via GSAP
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
  - lg (1024–1279px):  speech bubble visible, notes + cassette visible (lg:block), drag active
  - xl (1280px+):      same — cursor target always computed dynamically (no hardcoded offsets)
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
import { useLanguage } from "@/lib/language-context";

const HERO_COPY = {
  EN: {
    greeting:    "Hello, I'm",
    tagline:     ["Full-cycle designer who explores every stage,", "delivers real impact and loves the process."],
    scroll:      "Scroll to see my work",
    speechBubble:["Where's my", "music player?"],
    nothingHere: "nothing here",
    tooltip:     "Don't Click!",
  },
  PT: {
    greeting:    "Olá, eu sou",
    tagline:     ["Mergulhando no processo, me divertindo em cada etapa", "e entregando impacto de verdade."],
    scroll:      "Role para ver meu trabalho",
    speechBubble:["Cadê minha", "playlist?"],
    nothingHere: "nada aqui",
    tooltip:     "Não Clique!",
  },
} as const;

export default function HeroSection() {
  const cursorRef      = useRef<HTMLDivElement>(null);
  const wellisonBoxRef = useRef<HTMLDivElement>(null);
  const tooltipRef     = useRef<HTMLDivElement>(null);
  const idleTlRef      = useRef<gsap.core.Timeline | null>(null);
  const disturbedRef   = useRef(false);
  const heroVisibleRef = useRef(true); // hero começa visível

  const playBtnRef       = useRef<HTMLDivElement>(null);
  const nothingHereRef   = useRef<HTMLDivElement>(null);
  const closePlayerRef   = useRef<(() => void) | null>(null);
  const avatarRef        = useRef<HTMLDivElement>(null);
  const notesRef         = useRef<HTMLDivElement>(null);
  const sectionRef       = useRef<HTMLElement>(null);
  const heroTextRef      = useRef<HTMLDivElement>(null);
  const dragState        = useRef({ active: false, sx: 0, sy: 0, ox: 0, oy: 0, minX: 0, maxX: 0 });
  const notesDragState   = useRef({ active: false, sx: 0, sy: 0, ox: 0, oy: 0, minX: 0, maxX: 0 });

  const { language } = useLanguage();
  const copy = HERO_COPY[language];

  const [phase,          setPhase]       = useState<"resizing" | "idle">("resizing");
  const [showTooltip,    setShowTooltip] = useState(false);
  const [playerOpen,     setPlayerOpen]  = useState(false);
  const [musicPlaying,   setMusicPlaying] = useState(false);
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

    // Compute target offsets once per trigger — single getBoundingClientRect()
    // call each, plus gsap.getProperty() cache reads (no reflow, no loop).
    //
    // getBoundingClientRect() includes active GSAP transforms in its result.
    // Stripping the current GSAP x/y from both elements recovers their natural
    // (CSS-only) positions, which is what GSAP expects as the animation target.
    //
    // TIP_X / TIP_Y: the cursor arrow-tip sits slightly inset from the div's
    // top-left corner. These pixel constants shift the target so the visual tip
    // lands exactly on the box TL — derived from the original xl+ calibration
    // and valid at every resolution because they describe the image, not the layout.
    const TIP_X = -18;
    const TIP_Y = -4;

    const cursorGsapX = (gsap.getProperty(cursor, "x") as number) || 0;
    const cursorGsapY = (gsap.getProperty(cursor, "y") as number) || 0;
    const boxGsapX    = (gsap.getProperty(box,    "x") as number) || 0;
    const boxGsapY    = (gsap.getProperty(box,    "y") as number) || 0;
    const boxRect     = box.getBoundingClientRect();
    const cursorRect  = cursor.getBoundingClientRect();

    const tX = (boxRect.left - boxGsapX) - (cursorRect.left - cursorGsapX) + TIP_X;
    const tY = (boxRect.top  - boxGsapY) - (cursorRect.top  - cursorGsapY) + TIP_Y;

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

    // Pausa imediatamente se o hero já estiver fora da viewport
    if (!heroVisibleRef.current) idleTlRef.current.pause();
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
    const tween = gsap.fromTo(
      [playBtnRef.current, nothingHereRef.current],
      { opacity: 0 },
      { opacity: 1, duration: 0.6, delay: 0.4, ease: "power2.out" },
    );
    return () => { tween.kill(); };
  }, []);

  useEffect(() => {
    if (phase === "resizing") {
      startResizing();
    } else if (phase === "idle") {
      startIdle();
    }
    return () => {
      idleTlRef.current?.kill();
      gsap.killTweensOf(cursorRef.current);
      gsap.killTweensOf(wellisonBoxRef.current);
    };
  }, [phase, startResizing, startIdle]);

  // Pausa a cursor idle timeline quando o hero sai completamente da viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        heroVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          idleTlRef.current?.resume();
        } else {
          idleTlRef.current?.pause();
        }
      },
      { threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
          {copy.tooltip}
        </span>
      </div>

      {/* ── Main hero area ─────────────────────────────────────────────────── */}
      <div className="relative w-full max-w-[1200px] px-10 xl:px-[98px] py-[18px]">

        {/* Toca-fitas — visível em lg+ */}
        <div
          ref={playBtnRef}
          className="hidden lg:block absolute right-[103px] top-[100px] z-0"
          style={{ transform: "rotate(-5deg)", opacity: 0 }}
        >
          <CassettePlayer
            playing={musicPlaying}
            onClick={() => {
              if (playerOpen) closePlayerRef.current?.();
              else            setPlayerOpen(true);
            }}
          />
        </div>

        {/* "Nothing here" — visível apenas em lg+ */}
        <div
          ref={nothingHereRef}
          className="hidden lg:block absolute left-[109px] top-[90px] z-[1] pointer-events-none select-none"
          style={{ opacity: 0 }}
          aria-hidden="true"
        >
          <p className="font-comic text-[13px] text-primary -rotate-[9.31deg] whitespace-nowrap">
            {copy.nothingHere}
          </p>
        </div>

        {/* Avatar + speech bubble — hidden below sm; drag active at lg+ only */}
        <div
          ref={avatarRef}
          id="hero-avatar"
          className={`absolute left-[10px] lg:left-[40px] top-0 w-[180px] h-[145px] lg:w-[185px] lg:h-[220px] z-[5] lg:z-[2] select-none ${dragging ? "lg:cursor-grabbing" : "lg:cursor-grab"}`}
          aria-hidden="true"
          onPointerDown={onAvatarDown}
          onPointerMove={onAvatarMove}
          onPointerUp={springAvatarBack}
          onPointerCancel={springAvatarBack}
        >
          <div className="absolute left-[30px] top-[4px] rotate-[10.69deg] sm:left-0 sm:top-[21px] sm:-rotate-[9.31deg] origin-top-left scale-[0.5] sm:scale-[0.8] lg:scale-[1]">
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

          {/* Speech bubble + arrow */}
          <div
            className="absolute left-[133px] lg:left-[163px] top-0 pointer-events-none select-none hidden sm:block"
            aria-hidden="true"
          >
            <div className="-rotate-[6.68deg]">
              <p className="font-comic text-[16px] leading-[1.3] font-bold text-primary whitespace-nowrap">
                {copy.speechBubble[0]}
                <br />
                {copy.speechBubble[1]}
              </p>
            </div>
            <div className="absolute left-[8px] top-[59px]">
              <Image src={HERO_ARROW} alt="" width={18} height={26} unoptimized />
            </div>
          </div>
        </div>

        {/* Notes illustration — visível apenas em xl+ */}
        <div
          ref={notesRef}
          id="hero-sticker"
          className={`hidden md:block absolute right-[10px] top-0 z-[4] lg:right-[15px] lg:top-[45px] lg:z-[2] select-none ${notesDragging ? "lg:cursor-grabbing" : "lg:cursor-grab"}`}
          aria-hidden="true"
          onPointerDown={onNotesDown}
          onPointerMove={onNotesMove}
          onPointerUp={springNotesBack}
          onPointerCancel={springNotesBack}
        >
          <div className="scale-[0.8] lg:scale-[1] origin-top-right">
            <NotesIllustration />
          </div>
        </div>

        {/* ── Coluna de texto centralizada ─────────────────────────────────── */}
        <div
          ref={heroTextRef}
          id="hero-text"
          className="relative z-[3] mx-auto flex w-full max-w-[508px] flex-col items-center gap-[16px]"
        >
          <p className="font-sans text-[38px] lg:text-[48px] leading-normal text-primary text-center w-full">
            {copy.greeting}
          </p>

          {/* WELLISON box — interativa em idle */}
          <div
            id="box-name"
            ref={wellisonBoxRef}
            className={`relative z-[3] w-auto lg:w-full select-none text-[clamp(41.6px,14.4vw,75.5px)] lg:text-[clamp(52px,18vw,94.378px)] ${isIdle ? "cursor-pointer" : ""}`}
            style={{ border: "0.867px solid #b6b6c2", padding: "0.254em 0.307em" }}
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
            {/* Corner dots — em units para escalar proporcionalmente com o texto */}
            <span className="absolute bg-muted" style={{ width: "0.0656em", height: "0.0656em", left:  "-0.0308em", top:    "-0.0308em" }} />
            <span className="absolute bg-muted" style={{ width: "0.0656em", height: "0.0656em", right: "-0.0308em", top:    "-0.0308em" }} />
            <span className="absolute bg-muted" style={{ width: "0.0656em", height: "0.0656em", left:  "-0.0308em", bottom: "-0.0341em" }} />
            <span className="absolute bg-muted" style={{ width: "0.0656em", height: "0.0656em", right: "-0.0308em", bottom: "-0.0341em" }} />

            <span
              className="block font-sans font-black text-primary whitespace-nowrap"
              style={{ fontSize: "1em", lineHeight: 0.75 }}
            >
              WELLISON
            </span>

            {/* Cursor — filho do #box-name para seguir o box em qualquer resolução.
                left-[506px] top-[120px] = BR do box (508px wide, ~120px tall).
                A fórmula de animação produz naturalmente tX≈-509 tY≈-122 (TL).  */}
            <div
              ref={cursorRef}
              id="hero-cursor"
              className="absolute left-[200px] top-[35px] sm:left-[368px] sm:top-[75px] md:left-[408px] md:top-[95px] lg:left-[506px] lg:top-[120px] w-[124px] h-[43px] pointer-events-none z-10 scale-[0.8] sm:scale-[1]"
              aria-hidden="true"
            >
              <Image src={CURSOR_ICON} alt="" width={124} height={43} unoptimized />
            </div>
          </div>

          {/* Quote/tagline */}
          <div className="relative shrink-0 w-full">
            <p className="font-sans text-[17px] lg:text-[20px] leading-[1.5] text-muted text-center w-full mx-auto">
              {copy.tagline[0]}
              <br />
              {copy.tagline[1]}
            </p>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ───────────────────────────────────────────────── */}
      <div id="hero-scroll" className="flex flex-col items-center gap-[8px]">
        <svg width="22" height="40" viewBox="0 0 22 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="overflow-visible">
          <rect x="0.5" y="0.5" width="21" height="39" rx="10.5" stroke="#F9FAFD"/>
          <path className="animate-scroll-dot" fillRule="evenodd" clipRule="evenodd" d="M11 17C11.2761 17 11.5 17.2239 11.5 17.5V29.2929L14.6464 26.1464C14.8417 25.9512 15.1583 25.9512 15.3536 26.1464C15.5488 26.3417 15.5488 26.6583 15.3536 26.8536L11.3536 30.8536C11.1583 31.0488 10.8417 31.0488 10.6464 30.8536L6.64645 26.8536C6.45118 26.6583 6.45118 26.3417 6.64645 26.1464C6.84171 25.9512 7.15829 25.9512 7.35355 26.1464L10.5 29.2929V17.5C10.5 17.2239 10.7239 17 11 17Z" fill="#F9FAFD"/>
        </svg>
        <p className="font-sans text-[16px] leading-[1.3] text-primary text-center">
          {copy.scroll}
        </p>
      </div>

      {playerOpen && (
        <MiniPlayer
          getOriginRect={getOriginRect}
          onClose={() => { closePlayerRef.current = null; setPlayerOpen(false); setMusicPlaying(false); }}
          onRegisterClose={(fn) => { closePlayerRef.current = fn; }}
          onPlayingChange={setMusicPlaying}
        />
      )}

    </section>
  );
}
