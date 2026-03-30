/*
  NotesIllustration
  ─────────────────────────────────────────────────────────────────────────────
  SVG inline para herdar a fonte Gabarito da página via CSS.
  Textos como <text> para facilitar tradução futura.
*/

"use client";

import { useLanguage } from "@/lib/language-context";

const NOTES_COPY = {
  EN: {
    title: "Don't forget it",
    item1: "Draw your own avatar",
    item2: "Create a new e-mail",
    item3: "Take the trash out",
  },
  PT: {
    title: "Não esquecer",
    item1: "Desenhar meu avatar",
    item2: "Criar um novo e-mail",
    item3: "Tirar o lixo",
  },
} as const;

export default function NotesIllustration() {
  const { language } = useLanguage();
  const c = NOTES_COPY[language];

  return (
    <svg width="222" height="226" viewBox="0 0 222 226" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Notes">
        <g id="Note">
          {/* ── Fundo ──────────────────────────────────────────────────── */}
          <rect x="33.6985" y="11.9245" width="188.405" height="181.624" rx="2.41311" transform="rotate(10.5635 33.6985 11.9245)" fill="#222222"/>
          <rect x="33.6985" y="11.9245" width="188.405" height="181.624" rx="2.41311" transform="rotate(10.5635 33.6985 11.9245)" stroke="#404040" strokeWidth="0.689459"/>

          {/* ── Furos da espiral ────────────────────────────────────────── */}
          <circle cx="68.6309"  cy="32.8158" r="3.4473" transform="rotate(10.5635 68.6309 32.8158)"   fill="#0D0E0D"/>
          <circle cx="90.3194"  cy="36.8604" r="3.4473" transform="rotate(10.5635 90.3194 36.8604)"   fill="#0D0E0D"/>
          <circle cx="112.009"  cy="40.9051" r="3.4473" transform="rotate(10.5635 112.009 40.9051)"   fill="#0D0E0D"/>
          <circle cx="133.697"  cy="44.9496" r="3.4473" transform="rotate(10.5635 133.697 44.9496)"   fill="#0D0E0D"/>
          <circle cx="155.386"  cy="48.9942" r="3.4473" transform="rotate(10.5635 155.386 48.9942)"   fill="#0D0E0D"/>
          <circle cx="177.075"  cy="53.0389" r="3.4473" transform="rotate(10.5635 177.075 53.0389)"   fill="#0D0E0D"/>

          {/* ── Título ──────────────────────────────────────────────────── */}
          <text
            x="42.57" y="58.58"
            fontFamily="var(--font-gabarito), sans-serif"
            fontSize="16"
            fontWeight="bold"
            fill="#F9FAFD"
            transform="rotate(10.5635 42.57 58.58)"
          >
            {c.title}
          </text>

          {/* ── Itens da lista ──────────────────────────────────────────── */}
          <g id="Text" fontFamily="var(--font-gabarito), sans-serif" fontSize="14" fill="#F9FAFD">

            {/* Item 1 — concluído */}
            <g transform="rotate(10.5635 44 90.23)">
              <text x="44" y="90.23">1.</text>
              <text x="60" y="90.23">{c.item1}</text>
              <line x1="44" y1="85" x2="200" y2="85" stroke="#EA1646" strokeWidth="1" strokeLinecap="round"/>
            </g>

            {/* Item 2 — concluído */}
            <g transform="rotate(10.5635 40 124.83)">
              <text x="40" y="124.83">2.</text>
              <text x="56" y="124.83">{c.item2}</text>
              <line x1="40" y1="119.5" x2="190" y2="119.5" stroke="#EA1646" strokeWidth="1" strokeLinecap="round"/>
            </g>

            {/* Item 3 — pendente */}
            <g transform="rotate(10.5635 30 164.48)">
              <text x="30" y="164.48">3.</text>
              <text x="46" y="164.48">{c.item3}</text>
            </g>
          </g>
        </g>

        {/* ── Fita adesiva vermelha ────────────────────────────────────────── */}
        <path d="M129.683 22.7585L129.866 22.7662C129.053 23.612 128.097 24.1531 126.931 24.3517C126.694 24.3852 126.62 24.6962 126.767 24.8682C127.112 25.2534 127.438 25.6493 127.772 26.0475L127.735 26.0861C127.506 26.5985 127.08 26.94 126.484 27.1022C126.174 27.1877 126.072 27.5317 126.27 27.7783L128.174 30.1871C126.966 30.5149 125.773 30.6132 124.499 30.4682C124.138 30.4206 123.991 30.884 124.188 31.1305C125.182 32.3733 126.186 33.6109 127.198 34.843C113.066 32.436 98.7022 30.131 84.3737 29.3168C85.505 28.572 86.6175 27.8047 87.7277 27.0449C87.8842 26.9441 87.9888 26.6931 87.821 26.5395C87.3145 26.0781 86.8171 25.6195 86.3113 25.1582C87.7483 24.6859 88.9885 23.8587 89.928 22.6353C90.1679 22.3268 89.6676 21.9008 89.4098 22.1868L89.3694 22.2325L89.272 22.118C88.5163 21.5776 87.7643 21.0467 87.0087 20.5062C87.8023 20.3232 88.6027 20.1422 89.3963 19.9592C89.6407 19.9029 89.7394 19.6416 89.6428 19.4188C89.2104 18.4124 88.8193 17.3522 88.2809 16.3875L88.2187 16.3176C102.212 17.477 116.003 19.5335 129.683 22.7585Z" fill="#EA1646"/>
      </g>
    </svg>
  );
}
