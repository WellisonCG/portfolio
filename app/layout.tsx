import type { Metadata } from "next";
import { Gabarito, Comic_Neue } from "next/font/google";
import "./globals.css";
import DotBackground from "@/components/ui/DotBackground";
import { LanguageProvider } from "@/lib/language-context";

/*
  Gabarito is the primary font used throughout the design.
  Comic Neue Bold is used exclusively for the handwriting-style annotations in the hero.
*/
const gabarito = Gabarito({
  subsets: ["latin"],
  variable: "--font-gabarito",
  weight: ["400", "700"],
  display: "swap",
});

const comicNeue = Comic_Neue({
  subsets: ["latin"],
  variable: "--font-comic-neue",
  weight: ["700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wellison Gonçalves — UX/UI Designer",
  description:
    "Portfolio of Wellison Gonçalves. Full-cycle designer who explores every stage, delivers real impact and loves the process.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${gabarito.variable} ${comicNeue.variable}`}>
      <body className="relative isolate antialiased">
        <DotBackground />
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
