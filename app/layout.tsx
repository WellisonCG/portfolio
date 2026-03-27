import type { Metadata } from "next";
import { Gabarito, Comic_Neue } from "next/font/google";
import "./globals.css";
import DotBackground from "@/components/ui/DotBackground";

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
    "Portfolio of Wellison Gonçalves. Solving problems, delivering results and having fun with design.",
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
        {children}
      </body>
    </html>
  );
}
