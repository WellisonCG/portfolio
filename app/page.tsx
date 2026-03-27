/*
  Home Page
  ─────────────────────────────────────────────────────────────────────────────
  Assembles all sections from the Figma design.

  Section order (matching Figma "Home" frame, node 1119:1228):
  1. NavigationBar
  2. HeroSection
  3. ProjectsSection
  4. MarqueeBanner
  5. AboutSection
  6. CTASection
  7. Footer

  The main content uses `gap-[104px]` — the exact section spacing from Figma.
  All sections are center-aligned; each manages its own max-width internally.
*/

import NavigationBar from "@/components/layout/NavigationBar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import MarqueeBanner from "@/components/sections/MarqueeBanner";
import AboutSection from "@/components/sections/AboutSection";
import CTASection from "@/components/sections/CTASection";
import ScrollAnimations from "@/components/animations/ScrollAnimations";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <NavigationBar />

      <ScrollAnimations />
      <main className="flex w-full flex-col items-center gap-[48px] md:gap-[72px] lg:gap-[104px] pt-[24px]">
        <HeroSection />
        <ProjectsSection />
        <MarqueeBanner />
        <AboutSection />
        <CTASection />
      </main>

      <div className="mt-[48px] md:mt-[72px] lg:mt-[104px] w-full">
        <Footer />
      </div>
    </div>
  );
}
