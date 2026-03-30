"use client";

import { createContext, useContext } from "react";
import { usePathname, useRouter } from "next/navigation";

export type Language = "PT" | "EN";

interface LanguageContextValue {
  language:    Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  language:    "EN",
  setLanguage: () => {},
});

/** Derive the active language from the URL pathname. */
function langFromPath(path: string): Language {
  return path === "/pt" || path.startsWith("/pt/") ? "PT" : "EN";
}

/** Return the equivalent path in the target language. */
export function switchPath(path: string, lang: Language): string {
  if (lang === "PT") {
    return path.startsWith("/pt") ? path : `/pt${path === "/" ? "" : path}`;
  }
  return path.startsWith("/pt") ? path.slice(3) || "/" : path;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router   = useRouter();

  const language    = langFromPath(pathname);
  const setLanguage = (lang: Language) => router.push(switchPath(pathname, lang));

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
