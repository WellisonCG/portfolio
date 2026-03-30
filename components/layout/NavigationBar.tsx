/*
  NavigationBar
  ─────────────────────────────────────────────────────────────────────────────
  Sticky top navbar with logo, nav links, CTA button, and language dropdowcopy.
  Layout: 1200px max-width, 80px height, 80px horizontal padding (from Figma).

  LanguageDropdown: trigger shows active flag + code + chevrocopy.
  Clicking opens a small panel with both language options.
  Closes on outside click via a ref listener.
*/

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FLAG_BR, FLAG_US, LOGO } from "@/lib/assets";
import { useLanguage } from "@/lib/language-context";

const LANGUAGES = [
  { code: "PT", label: "Portuguese (BR)", flag: FLAG_BR, alt: "PT-BR" },
  { code: "EN", label: "English (US)",    flag: FLAG_US, alt: "EN-US" },
] as const;

const NAV_COPY = {
  EN: { projects: "Projects", about: "About me", cta: "Get in touch" },
  PT: { projects: "Projetos", about: "Sobre mim", cta: "Entre em contato" },
} as const;

function LanguageDropdown() {
  const { language: active, setLanguage: setActive } = useLanguage();
  const [open, setOpen] = useState(false);
  const wrapperRef           = useRef<HTMLDivElement>(null);

  // Close when clicking outside the dropdown
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const current = LANGUAGES.find((l) => l.code === active)!;

  return (
    <div ref={wrapperRef} className="relative">

      {/* Trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
        className="flex cursor-pointer items-center gap-[8px] rounded-[6px] px-[10px] py-[6px] transition-colors hover:bg-white/10"
      >
        <Image src={current.flag} alt={current.alt} width={24} height={18} unoptimized className="rounded-[3px]" />
        <span className="font-sans text-[14px] font-medium leading-none text-primary">{current.code}</span>
        {/* Chevron */}
        <svg
          width="10" height="6" viewBox="0 0 10 6" fill="none"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary" />
        </svg>
      </button>

      {/* Dropdown panel */}
      {open && (
        <ul
          role="listbox"
          aria-label="Language"
          className="absolute right-0 top-[calc(100%+6px)] z-50 w-max overflow-hidden rounded-[8px] border border-white/10 bg-[#1e1e22] py-[4px] shadow-lg"
        >
          {LANGUAGES.map((lang) => (
            <li key={lang.code} role="option" aria-selected={active === lang.code}>
              <button
                onClick={() => { setActive(lang.code); setOpen(false); }}
                className={`flex w-full cursor-pointer items-center gap-[10px] px-[12px] py-[8px] text-left transition-colors hover:bg-white/10 ${active === lang.code ? "bg-white/5" : ""}`}
              >
                <Image src={lang.flag} alt={lang.alt} width={24} height={18} unoptimized className="rounded-[3px]" />
                <span className="font-sans text-[14px] leading-none text-primary whitespace-nowrap">{lang.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

    </div>
  );
}

export default function NavigationBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { language } = useLanguage();
  const copy = NAV_COPY[language];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  const handleContactClick = () => {
    setMenuOpen(false);
    const section = document.getElementById("contact");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => window.dispatchEvent(new CustomEvent("open-contact-modal")), 700);
    } else {
      window.dispatchEvent(new CustomEvent("open-contact-modal"));
    }
  };

  return (
    <nav className={`sticky top-0 z-50 w-full flex flex-col items-center transition-all duration-300 ${scrolled || menuOpen ? "backdrop-blur-md bg-surface/80" : ""}`}>

      {/* ── Main bar ──────────────────────────────────────────────────────── */}
      <div className="flex h-[80px] w-full max-w-[1200px] items-center justify-between px-10">

        {/* Logo */}
        <a href={language === "PT" ? "/pt" : "/"} aria-label="Wellison home">
          <Image src={LOGO} alt="Wellison" width={140} height={30} unoptimized />
        </a>

        {/* Desktop: nav links + CTA + language dropdown */}
        <div className="hidden md:flex items-center gap-[40px]">
          <div className="flex items-center gap-[40px]">
            <a href="#projects" className="font-sans text-[18px] leading-[1.1] text-primary hover:text-accent transition-colors cursor-pointer">
              {copy.projects}
            </a>
            <a href="#about" className="font-sans text-[18px] leading-[1.1] text-primary hover:text-accent transition-colors cursor-pointer">
              {copy.about}
            </a>
            <button onClick={handleContactClick} className="rounded-[4px] bg-primary px-[16px] py-[4px] font-sans text-[18px] leading-[1.1] text-surface hover:bg-accent hover:text-white transition-colors cursor-pointer">
              {copy.cta}
            </button>
          </div>
          <LanguageDropdown />
        </div>

        {/* Mobile: language dropdown + hamburger */}
        <div className="md:hidden flex items-center gap-[12px]">
          <LanguageDropdown />
          <button
            className="flex cursor-pointer flex-col justify-center items-center gap-[5px] w-[40px] h-[40px]"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className={`block h-[2px] w-[24px] bg-primary transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block h-[2px] w-[24px] bg-primary transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block h-[2px] w-[24px] bg-primary transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </div>

      {/* ── Mobile menu drawer ────────────────────────────────────────────── */}
      <div className={`md:hidden w-full overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-[300px] pb-6" : "max-h-0"}`}>
        <div className="flex flex-col items-center gap-[24px] px-10 pt-2">
          <a href="#projects" onClick={handleNavClick} className="font-sans text-[18px] leading-[1.1] text-primary hover:text-accent transition-colors cursor-pointer">
            {copy.projects}
          </a>
          <a href="#about" onClick={handleNavClick} className="font-sans text-[18px] leading-[1.1] text-primary hover:text-accent transition-colors cursor-pointer">
            {copy.about}
          </a>
          <button onClick={handleContactClick} className="rounded-[4px] bg-primary px-[24px] py-[8px] font-sans text-[18px] leading-[1.1] text-surface hover:bg-accent hover:text-white transition-colors cursor-pointer">
            {copy.cta}
          </button>
        </div>
      </div>

    </nav>
  );
}
