import type { Metadata } from "next";
import NavigationBar from "@/components/layout/NavigationBar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import MarqueeBanner from "@/components/sections/MarqueeBanner";
import AboutSection from "@/components/sections/AboutSection";
import CTASection from "@/components/sections/CTASection";
import ScrollAnimations from "@/components/animations/ScrollAnimations";
import ContactModal from "@/components/ui/ContactModal";

export const metadata: Metadata = {
  title: "Wellison Gonçalves — UX/UI Designer",
  description:
    "Portfólio de Wellison Gonçalves. Designer full-cycle que explora cada etapa, entrega impacto real e ama o processo.",
};

export default function HomePagePT() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <NavigationBar />

      <ScrollAnimations />
      <main className="flex w-full flex-col items-center gap-[64px] md:gap-[72px] lg:gap-[104px] pt-[24px]">
        <HeroSection />
        <ProjectsSection />
        <MarqueeBanner />
        <AboutSection />
        <CTASection />
      </main>

      <div className="mt-[48px] md:mt-[72px] lg:mt-[104px] w-full">
        <Footer />
      </div>

      <ContactModal />
    </div>
  );
}
