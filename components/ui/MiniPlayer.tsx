/*
  MiniPlayer — YouTube IFrame API
  ─────────────────────────────────────────────────────────────────────────────
  Layout compacto:

  ┌────────────────────────────────────────┐
  │ [Título · Artista →scroll←]  0:52  [X] │
  │ ──────────────────────────────────────  │  progress bar real
  │   ⏮         ⏸/▶         ⏭       🔊  │
  └────────────────────────────────────────┘

  Áudio via YouTube IFrame Player API (iframe oculto).
  Animações de abertura/fechamento via GSAP, do/para o botão de play.
*/

"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";

// ─── YouTube IFrame API types (minimal) ───────────────────────────────────

interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  loadVideoById(id: string): void;
  cueVideoById(id: string): void;
  getCurrentTime(): number;
  getDuration(): number;
  setVolume(v: number): void;
  mute(): void;
  unMute(): void;
  destroy(): void;
}

declare global {
  interface Window {
    YT: {
      Player: new (
        el: HTMLElement,
        opts: {
          videoId: string;
          playerVars?: Record<string, number | string>;
          events?: {
            onReady?: (e: { target: YTPlayer }) => void;
            onStateChange?: (e: { data: number }) => void;
          };
        },
      ) => YTPlayer;
      PlayerState: { PLAYING: 1; PAUSED: 2; ENDED: 0; BUFFERING: 3 };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

// ─── Tracks ───────────────────────────────────────────────────────────────

const TRACKS = [
  { title: "VIRUS",               artist: "KLOUD",       videoId: "bDVEdZaFHA8" },
  { title: "Savior Complex",      artist: "Tiny Habits", videoId: "nlA2O3LL0O8" },
  { title: "Take Me Back To Eden",artist: "Sleep Token", videoId: "k8h50PjQozw" },
  { title: "Perspective",         artist: "Cafuné",      videoId: "n87C0iUyrCU" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────

function formatTime(s: number): string {
  if (!isFinite(s) || s < 0) return "0:00";
  const m  = Math.floor(s / 60);
  const ss = String(Math.floor(s % 60)).padStart(2, "0");
  return `${m}:${ss}`;
}

// ─── Icons ────────────────────────────────────────────────────────────────

function IconClose() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
  );
}
function IconPrev() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
    </svg>
  );
}
function IconNext() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 18 14.5 12 6 6v12zm8.5-12v12h2V6h-2z" />
    </svg>
  );
}
function IconPlay() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
function IconPause() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  );
}
function IconVolume({ muted }: { muted: boolean }) {
  return muted ? (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z" />
    </svg>
  ) : (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
    </svg>
  );
}

// ─── Scrolling track label ─────────────────────────────────────────────────

function TrackLabel({ title, artist }: { title: string; artist: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef   = useRef<HTMLSpanElement>(null);
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const measure   = measureRef.current;
    const container = containerRef.current;
    if (!measure || !container) return;
    const id = requestAnimationFrame(() => {
      setScroll(measure.scrollWidth > container.clientWidth);
    });
    return () => cancelAnimationFrame(id);
  }, [title, artist]);

  const label    = `${title} · ${artist}`;
  const duration = Math.max(5, label.length * 0.28);

  const content = (
    <>
      <span className="font-bold text-primary">{title}</span>
      <span className="mx-[4px] text-white/30">·</span>
      <span className="text-muted">{artist}</span>
    </>
  );

  return (
    <div ref={containerRef} className="relative min-w-0 flex-1 overflow-hidden">
      <span
        ref={measureRef}
        className="pointer-events-none invisible absolute whitespace-nowrap font-sans text-[12px]"
        aria-hidden="true"
      >
        {label}
      </span>
      {scroll ? (
        <div
          className="flex whitespace-nowrap font-sans text-[12px]"
          style={{ animation: `text-marquee ${duration}s linear infinite` }}
        >
          <span className="pr-[48px]">{content}</span>
          <span className="pr-[48px]">{content}</span>
        </div>
      ) : (
        <p className="whitespace-nowrap font-sans text-[12px]">{content}</p>
      )}
    </div>
  );
}

// ─── Volume slider vertical ────────────────────────────────────────────────

function VolumeSlider({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const update = (e: React.PointerEvent) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return;
    onChange(Math.max(0, Math.min(1, 1 - (e.clientY - rect.top) / rect.height)));
  };

  return (
    <div
      ref={trackRef}
      className="relative h-[60px] w-[3px] cursor-pointer rounded-full bg-white/10"
      onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); update(e); }}
      onPointerMove={(e) => { if (e.buttons) update(e); }}
    >
      <div className="absolute bottom-0 w-full rounded-full bg-primary" style={{ height: `${value * 100}%` }} />
      <div
        className="absolute left-1/2 h-[8px] w-[8px] -translate-x-1/2 rounded-full bg-primary"
        style={{ bottom: `calc(${value * 100}% - 4px)` }}
      />
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────

interface MiniPlayerProps {
  getOriginRect: () => DOMRect | null;
  onClose: () => void;
  onRegisterClose?: (fn: () => void) => void;
  onPlayingChange?: (playing: boolean) => void;
}

export default function MiniPlayer({ getOriginRect, onClose, onRegisterClose, onPlayingChange }: MiniPlayerProps) {
  const cardRef    = useRef<HTMLDivElement>(null);
  const iframeRef  = useRef<HTMLDivElement>(null);
  const playerRef  = useRef<YTPlayer | null>(null);
  const readyRef   = useRef(false);
  const tickRef    = useRef<ReturnType<typeof setInterval> | null>(null);
  const playingRef = useRef(false);
  const idxRef     = useRef(0);

  const [playing,  setPlaying]  = useState(false);
  const [idx,      setIdx]      = useState(0);
  const [progress, setProgress] = useState(0);
  const [elapsed,  setElapsed]  = useState("0:00");
  const [volume,   setVolume]   = useState(0.3);
  const [muted,    setMuted]    = useState(false);

  const track = TRACKS[idx];

  // ── YouTube IFrame API ────────────────────────────────────────────────
  useEffect(() => {
    const initPlayer = () => {
      if (!iframeRef.current) return;

      new window.YT.Player(iframeRef.current, {
        videoId: TRACKS[0].videoId,
        playerVars: {
          autoplay:       0,
          controls:       0,
          disablekb:      1,
          fs:             0,
          iv_load_policy: 3,
          modestbranding: 1,
          rel:            0,
          playsinline:    1,
        },
        events: {
          onReady: (e) => {
            // e.target é o player totalmente inicializado com todos os métodos
            playerRef.current = e.target as unknown as YTPlayer;
            playerRef.current.setVolume(30);
            readyRef.current = true;
          },
          onStateChange: (e) => {
            // 1 = PLAYING, 2 = PAUSED, 0 = ENDED
            if (e.data === 1) {
              playingRef.current = true;
              setPlaying(true);
            } else if (e.data === 2 || e.data === 0) {
              playingRef.current = false;
              setPlaying(false);
            }
            // Auto-advance on end
            if (e.data === 0) {
              setIdx((prev) => {
                const next = (prev + 1) % TRACKS.length;
                idxRef.current = next;
                setProgress(0);
                setElapsed("0:00");
                playerRef.current?.loadVideoById(TRACKS[next].videoId);
                return next;
              });
            }
          },
        },
      });
    };

    if (window.YT?.Player) {
      initPlayer();
    } else {
      // Chain onto any existing callback so multiple instances coexist
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => { prev?.(); initPlayer(); };

      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement("script");
        tag.src   = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
      }
    }

    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
      playerRef.current?.destroy();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Progress ticker (runs only while playing) ─────────────────────────
  useEffect(() => {
    if (tickRef.current) clearInterval(tickRef.current);
    if (!playing) return;

    tickRef.current = setInterval(() => {
      const p = playerRef.current;
      if (!p) return;
      const cur = p.getCurrentTime();
      const dur = p.getDuration();
      if (dur > 0) {
        setProgress(cur / dur);
        setElapsed(formatTime(cur));
      }
    }, 500);

    return () => { if (tickRef.current) clearInterval(tickRef.current); };
  }, [playing]);

  // ── Controls ─────────────────────────────────────────────────────────
  const handlePlay = useCallback(() => {
    const p = playerRef.current;
    if (!p || !readyRef.current) return;
    playingRef.current ? p.pauseVideo() : p.playVideo();
  }, []);

  const changeTrack = useCallback((newIdx: number) => {
    idxRef.current = newIdx;
    setIdx(newIdx);
    setProgress(0);
    setElapsed("0:00");
    const p = playerRef.current;
    if (!p || !readyRef.current) return;
    // loadVideoById auto-plays; cueVideoById stays paused
    if (playingRef.current) {
      p.loadVideoById(TRACKS[newIdx].videoId);
    } else {
      p.cueVideoById(TRACKS[newIdx].videoId);
    }
  }, []);

  const handleVolume = useCallback((v: number) => {
    setVolume(v);
    setMuted(false);
    playerRef.current?.unMute();
    playerRef.current?.setVolume(v * 100);
  }, []);

  const handleMute = useCallback(() => {
    const p = playerRef.current;
    if (!p || !readyRef.current) return;
    if (muted) { p.unMute(); setMuted(false); }
    else        { p.mute();  setMuted(true);  }
  }, [muted]);

  // ── Abertura: posiciona próximo ao botão e emerge do seu centro ──────
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const origin = getOriginRect();
    if (!origin) return;

    const cardW = card.offsetWidth;
    const cardH = card.offsetHeight;

    // Calcular posição em coordenadas de viewport (para clamp e animação)
    let vpLeft = origin.left - 8;
    let vpTop  = origin.bottom + 10;

    vpLeft = Math.max(8, Math.min(window.innerWidth  - cardW - 8, vpLeft));
    vpTop  = Math.max(8, Math.min(window.innerHeight - cardH - 8, vpTop));

    // Converter para coordenadas do documento (position: absolute)
    gsap.set(card, { left: vpLeft + window.scrollX, top: vpTop + window.scrollY });

    const dx = (origin.left + origin.width  / 2) - (vpLeft + cardW / 2);
    const dy = (origin.top  + origin.height / 2) - (vpTop  + cardH / 2);

    gsap.fromTo(
      card,
      { x: dx, y: dy, scale: 0, opacity: 0 },
      { x: 0,  y: 0,  scale: 1, opacity: 1, duration: 0.42, ease: "back.out(1.6)" },
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Fechamento: retorna ao botão ──────────────────────────────────────
  const handleClose = useCallback(() => {
    const card = cardRef.current;
    if (!card) { onClose(); return; }
    const origin = getOriginRect();
    if (!origin) { onClose(); return; }

    const r  = card.getBoundingClientRect();
    const dx = (origin.left + origin.width  / 2) - (r.left + r.width  / 2);
    const dy = (origin.top  + origin.height / 2) - (r.top  + r.height / 2);

    gsap.to(card, { x: dx, y: dy, scale: 0, opacity: 0, duration: 0.32, ease: "back.in(1.6)", onComplete: onClose });
  }, [getOriginRect, onClose]);

  useEffect(() => { onRegisterClose?.(handleClose); }, [handleClose, onRegisterClose]);
  useEffect(() => { onPlayingChange?.(playing); }, [playing, onPlayingChange]);

  // ── Render ────────────────────────────────────────────────────────────
  const card = (
    <div ref={cardRef} className="absolute z-50 will-change-transform" style={{ opacity: 0 }}>
      {/*
        Iframe oculto do YouTube — 1×1px, fora da área visível.
        O YT.Player precisa de um elemento real no DOM para inicializar.
      */}
      <div
        ref={iframeRef}
        aria-hidden="true"
        style={{ position: "absolute", width: 1, height: 1, top: 0, left: 0, overflow: "hidden", pointerEvents: "none" }}
      />

      <div
        className="flex w-[220px] flex-col gap-[10px] rounded-[16px] border border-white/10 p-[12px] backdrop-blur-[3px]"
        style={{ background: "linear-gradient(96deg, #191919e8 0.26%, rgba(25,25,25,0.82) 96.06%)" }}
      >
        {/* ── Linha 1: track label + tempo + fechar ── */}
        <div className="flex items-center gap-[8px]">
          <TrackLabel title={track.title} artist={track.artist} />
          <span className="shrink-0 font-sans text-[10px] tabular-nums text-muted/50">
            {elapsed}
          </span>
          <button
            onClick={handleClose}
            className="shrink-0 cursor-pointer text-muted/40 transition-colors hover:text-primary"
            aria-label="Fechar player"
          >
            <IconClose />
          </button>
        </div>

        {/* ── Linha 2: barra de progresso real ── */}
        <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-500"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        {/* ── Linha 3: controles + volume ── */}
        <div className="flex items-center justify-between px-[2px]">
          <button
            onClick={() => changeTrack((idx - 1 + TRACKS.length) % TRACKS.length)}
            className="flex cursor-pointer h-[32px] w-[32px] items-center justify-center text-muted transition-colors hover:text-primary"
            aria-label="Faixa anterior"
          >
            <IconPrev />
          </button>

          <button
            onClick={handlePlay}
            className="flex cursor-pointer h-[32px] w-[32px] items-center justify-center rounded-full bg-primary text-[#0d0e0d] transition-transform hover:scale-105 active:scale-95"
            aria-label={playing ? "Pausar" : "Reproduzir"}
          >
            {playing ? <IconPause /> : <IconPlay />}
          </button>

          <button
            onClick={() => changeTrack((idx + 1) % TRACKS.length)}
            className="flex cursor-pointer h-[32px] w-[32px] items-center justify-center text-muted transition-colors hover:text-primary"
            aria-label="Próxima faixa"
          >
            <IconNext />
          </button>

          {/* Volume com slider vertical no hover */}
          <div className="group/vol relative flex items-center">
            <button
              onClick={handleMute}
              className="cursor-pointer text-muted transition-colors hover:text-primary"
              aria-label={muted ? "Ativar som" : "Mutar"}
            >
              <IconVolume muted={muted} />
            </button>

            <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 pb-[8px] opacity-0 transition-opacity duration-150 group-hover/vol:pointer-events-auto group-hover/vol:opacity-100">
              <div
                className="flex items-center justify-center rounded-[12px] border border-white/10 px-[10px] py-[10px] backdrop-blur-[2px]"
                style={{ background: "linear-gradient(96deg, #191919e8 0.26%, rgba(25,25,25,0.82) 96.06%)" }}
              >
                <VolumeSlider
                  value={muted ? 0 : volume}
                  onChange={handleVolume}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(card, document.body);
}
