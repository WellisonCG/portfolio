/*
  CassettePlayer — simplified hand-drawn sticker
  ─────────────────────────────────────────────────────────────────────────────
  Visual: adesivo estilo mão livre (branco, borda grossa escura, bordas
  levemente irregulares) com apenas dois elementos internos:

  1. Janela da fita — retângulo escuro com dois carretéis animados (SMIL)
     · Carretel esquerdo: 6s por rotação
     · Carretel direito: 8s por rotação
     · Caminho da fita curvado entre os dois

  2. Três botões redondos na base — ⏮  ▶  ⏭
     · Botão central em vermelho accent (#ea1646)
*/

interface Props {
  onClick: () => void;
  playing?: boolean;
}

export default function CassettePlayer({ onClick, playing = false }: Props) {
  const reelState = playing ? "running" : "paused";
  return (
    <button
      onClick={onClick}
      className="cursor-pointer transition-transform hover:scale-[1.05] active:scale-[0.97]"
      style={{
        filter:     "drop-shadow(2px 4px 0px rgba(0,0,0,0.55)) drop-shadow(0 1px 3px rgba(0,0,0,0.3))",
        background: "none",
        border:     "none",
        padding:    0,
      }}
      aria-label="Abrir player de música"
    >
      <svg
        width="88"
        height="78"
        viewBox="0 0 88 78"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── Contorno branco (halo de adesivo) ───────────────────────── */}
        <path
          d="M 7 7.5 Q 6.5 4.5 10 4 L 78.5 3.5 Q 83 3.5 83 7 L 83.5 64 Q 83.8 68 80 68.5 L 8.5 69 Q 4.8 69.3 4.5 65.5 Z"
          fill="white"
          stroke="white"
          strokeWidth="14"
          strokeLinejoin="round"
        />

        {/* ── Sombra do adesivo (layer atrás) ──────────────────────────── */}
        <path
          d="M 6 8 Q 5.5 5 9 4.5 L 79 4 Q 83.5 4 83.5 7.5 L 84 65 Q 84.2 69 80.5 69.5 L 8 70 Q 4.5 70.2 4 66.5 Z"
          fill="rgba(0,0,0,0.18)"
          transform="translate(2, 3)"
        />

        {/* ── Corpo do adesivo — branco levemente irregular ─────────────── */}
        <path
          d="M 7 7.5 Q 6.5 4.5 10 4 L 78.5 3.5 Q 83 3.5 83 7 L 83.5 64 Q 83.8 68 80 68.5 L 8.5 69 Q 4.8 69.3 4.5 65.5 Z"
          fill="#ffffff"
          stroke="#1A1A22"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />

        {/* ── Janela da fita ─────────────────────────────────────────────── */}
        <rect
          x="10" y="9" width="67" height="42"
          rx="5"
          fill="#1A1A22"
          stroke="#1A1A22"
          strokeWidth="1.5"
        />
        {/* Interior da janela */}
        <rect x="12" y="11" width="63" height="38" rx="3.5" fill="#0d0d12" />

        {/* ── Carretel esquerdo — centro (30, 31) ────────────────────────── */}
        <circle cx="30" cy="31" r="11" fill="#222230" stroke="#383848" strokeWidth="0.8" />
        <g style={{ animation: "reel-spin 6s linear infinite", animationPlayState: reelState, transformBox: "fill-box", transformOrigin: "center" }}>
          <line x1="30" y1="20.5" x2="30" y2="41.5" stroke="#4a4a60" strokeWidth="0.9" />
          <line x1="19.5" y1="31" x2="40.5" y2="31" stroke="#4a4a60" strokeWidth="0.9" />
          <line x1="22.5" y1="23.5" x2="37.5" y2="38.5" stroke="#4a4a60" strokeWidth="0.6" />
          <line x1="37.5" y1="23.5" x2="22.5" y2="38.5" stroke="#4a4a60" strokeWidth="0.6" />
          <circle cx="30" cy="31" r="6" fill="#2a2a3a" />
          <circle cx="30" cy="31" r="2.2" fill="#4a4a60" />
        </g>
        <circle cx="30" cy="31" r="1" fill="#707088" />

        {/* ── Carretel direito — centro (57, 31) ─────────────────────────── */}
        <circle cx="57" cy="31" r="11" fill="#222230" stroke="#383848" strokeWidth="0.8" />
        <g style={{ animation: "reel-spin 8s linear infinite", animationPlayState: reelState, transformBox: "fill-box", transformOrigin: "center" }}>
          <line x1="57" y1="20.5" x2="57" y2="41.5" stroke="#4a4a60" strokeWidth="0.9" />
          <line x1="46.5" y1="31" x2="67.5" y2="31" stroke="#4a4a60" strokeWidth="0.9" />
          <line x1="49.5" y1="23.5" x2="64.5" y2="38.5" stroke="#4a4a60" strokeWidth="0.6" />
          <line x1="64.5" y1="23.5" x2="49.5" y2="38.5" stroke="#4a4a60" strokeWidth="0.6" />
          <circle cx="57" cy="31" r="6" fill="#2a2a3a" />
          <circle cx="57" cy="31" r="2.2" fill="#4a4a60" />
        </g>
        <circle cx="57" cy="31" r="1" fill="#707088" />

        {/* ── Caminho da fita entre os carretéis ─────────────────────────── */}
        <path
          d="M 19 43 Q 30 48 43.5 47 Q 57 48 68 43"
          stroke="#555570"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />

        {/* ── Botões na base ─────────────────────────────────────────────── */}

        {/* REW ⏮ */}
        <circle cx="24" cy="59" r="7.5" fill="#ffffff" stroke="#1A1A22" strokeWidth="1.8" />
        <path
          d="M 27 55.5 L 23.5 59 L 27 62.5 M 23.5 55.5 L 20 59 L 23.5 62.5"
          stroke="#1A1A22" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round"
        />

        {/* PLAY ▶ — vermelho accent */}
        <circle cx="44" cy="59" r="8.5" fill="#ea1646" stroke="#1A1A22" strokeWidth="1.8" />
        <path d="M 41.5 55.5 L 41.5 62.5 L 48 59 Z" fill="white" />

        {/* FF ⏭ */}
        <circle cx="64" cy="59" r="7.5" fill="#ffffff" stroke="#1A1A22" strokeWidth="1.8" />
        <path
          d="M 61 55.5 L 64.5 59 L 61 62.5 M 64.5 55.5 L 68 59 L 64.5 62.5"
          stroke="#1A1A22" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
