/*
  ContactModal
  ─────────────────────────────────────────────────────────────────────────────
  Modal de contato. Abre ao receber o custom event "open-contact-modal".
  Envia o formulário para /api/contact (Resend).

  Campos: Nome, E-mail, Mensagem.
  Estados: idle → loading → success | error
*/

"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import { useLanguage } from "@/lib/language-context";

const COPY = {
  EN: {
    label:          "Let's talk!",
    title:          "Get in touch",
    close:          "Close",
    fieldName:      "Name",
    fieldEmail:     "Email",
    fieldMessage:   "Message",
    placeholderName:"Your name",
    placeholderEmail:"your@email.com",
    placeholderMsg: "Hi Wellison, I'd like to...",
    submit:         "Send message",
    sending:        "Sending...",
    successTitle:   "Message sent!",
    successSubtitle:"I'll get back to you soon. Thanks for reaching oucopy.",
    error:          "Something went wrong. Try again or contact me by email.",
  },
  PT: {
    label:          "Vamos conversar!",
    title:          "Entre em contato",
    close:          "Fechar",
    fieldName:      "Nome",
    fieldEmail:     "E-mail",
    fieldMessage:   "Mensagem",
    placeholderName:"Seu nome",
    placeholderEmail:"seu@email.com",
    placeholderMsg: "Olá Wellison, gostaria de...",
    submit:         "Enviar mensagem",
    sending:        "Enviando...",
    successTitle:   "Mensagem enviada!",
    successSubtitle:"Responderei em breve. Obrigado pelo contato.",
    error:          "Algo deu errado. Tente novamente ou me contate por e-mail.",
  },
} as const;

type Status = "idle" | "loading" | "success" | "error";

export default function ContactModal() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);

  const { language } = useLanguage();
  const copy = COPY[language];

  const [open,    setOpen]    = useState(false);
  const [visible, setVisible] = useState(false); // controla a transição CSS

  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [message, setMessage] = useState("");
  const [status,  setStatus]  = useState<Status>("idle");

  // ── Ouve o evento global para abrir o modal ───────────────────────────
  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener("open-contact-modal", handleOpen);
    return () => window.removeEventListener("open-contact-modal", handleOpen);
  }, []);

  // ── Transição de entrada: monta → aguarda um frame → exibe ───────────
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => setVisible(true));
    }
  }, [open]);

  // ── Fechar: anima saída, depois desmonta ─────────────────────────────
  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      setOpen(false);
      setStatus("idle");
      setName(""); setEmail(""); setMessage("");
      document.body.style.overflow = "";
    }, 280);
  };

  // Fecha ao clicar no overlay
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) handleClose();
  };

  // Fecha com Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // ── Envio ─────────────────────────────────────────────────────────────
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ name, email, message }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[200] flex items-center justify-center px-4"
      style={{
        background:      `rgba(0,0,0,${visible ? 0.65 : 0})`,
        backdropFilter:  visible ? "blur(6px)" : "blur(0px)",
        transition:      "background 0.28s ease, backdrop-filter 0.28s ease",
      }}
    >
      <div
        ref={cardRef}
        className="w-full max-w-[480px] rounded-[24px] border border-white/10 p-[32px] flex flex-col gap-[24px]"
        style={{
          background:  "linear-gradient(135deg, #1c1c1c 0%, #111111 100%)",
          opacity:      visible ? 1 : 0,
          transform:    visible ? "scale(1) translateY(0)" : "scale(0.95) translateY(12px)",
          transition:   "opacity 0.28s ease, transform 0.28s ease",
        }}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-comic text-[14px] text-accent">{copy.label}</p>
            <h2 className="font-sans text-[22px] font-bold text-primary leading-tight">
              {copy.title}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="flex cursor-pointer h-[32px] w-[32px] items-center justify-center rounded-full text-muted/50 transition-colors hover:text-primary hover:bg-white/10"
            aria-label={copy.close}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>

        {/* ── Estados: formulário / sucesso / erro ── */}
        {status === "success" ? (
          <div className="flex flex-col items-center gap-[12px] py-[24px] text-center">
            <div className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-accent/10">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ea1646" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <p className="font-sans text-[16px] font-semibold text-primary">{copy.successTitle}</p>
            <p className="font-sans text-[14px] text-muted/70">{copy.successSubtitle}</p>
            <button
              onClick={handleClose}
              className="mt-[8px] cursor-pointer rounded-[4px] bg-accent px-[24px] py-[8px] font-sans text-[14px] font-semibold text-white transition-colors hover:bg-accent/85"
            >
              {copy.close}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-[16px]">

            {/* Nome */}
            <div className="flex flex-col gap-[6px]">
              <label className="font-sans text-[12px] font-medium text-muted/70 uppercase tracking-wider">
                {copy.fieldName}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={copy.placeholderName}
                className="w-full rounded-[8px] border border-white/10 bg-white/5 px-[14px] py-[10px] font-sans text-[15px] text-primary placeholder:text-muted/30 focus:border-white/25 focus:outline-none transition-colors"
              />
            </div>

            {/* E-mail */}
            <div className="flex flex-col gap-[6px]">
              <label className="font-sans text-[12px] font-medium text-muted/70 uppercase tracking-wider">
                {copy.fieldEmail}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={copy.placeholderEmail}
                className="w-full rounded-[8px] border border-white/10 bg-white/5 px-[14px] py-[10px] font-sans text-[15px] text-primary placeholder:text-muted/30 focus:border-white/25 focus:outline-none transition-colors"
              />
            </div>

            {/* Mensagem */}
            <div className="flex flex-col gap-[6px]">
              <label className="font-sans text-[12px] font-medium text-muted/70 uppercase tracking-wider">
                {copy.fieldMessage}
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={copy.placeholderMsg}
                className="w-full resize-none rounded-[8px] border border-white/10 bg-white/5 px-[14px] py-[10px] font-sans text-[15px] text-primary placeholder:text-muted/30 focus:border-white/25 focus:outline-none transition-colors"
              />
            </div>

            {/* Erro */}
            {status === "error" && (
              <p className="font-sans text-[13px] text-accent">{copy.error}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-[4px] flex cursor-pointer items-center justify-center gap-[8px] rounded-[4px] bg-accent px-[32px] py-[10px] font-sans text-[16px] font-semibold text-white transition-colors hover:bg-accent/85 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "loading" ? (
                <>
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                  </svg>
                  {copy.sending}
                </>
              ) : (
                copy.submit
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
