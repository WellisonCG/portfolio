/*
  Inter My Finances — Case Study Page
  ─────────────────────────────────────────────────────────────────────────────
  Route: /inter-my-finances

  Layout spec (mirroring /youpay):
    - max-width: 1200px, centered
    - horizontal padding: 80px
    - gap between body sections: 160px
*/

import type { Metadata } from "next";
import NavigationBar from "@/components/layout/NavigationBar";
import Footer from "@/components/layout/Footer";
import InterFinancesHero from "@/components/sections/inter-my-finances/InterFinancesHero";
import InterFinancesBody from "@/components/sections/inter-my-finances/InterFinancesBody";
import CTASection from "@/components/sections/CTASection";
import ArticleProgressBar from "@/components/ui/ArticleProgressBar";

export const metadata: Metadata = {
  title: "Inter My Finances — Wellison Gonçalves",
  description:
    "Designing a personal finance feature inside the Inter super-app to help users manage their money effortlessly.",
};

export default function InterMyFinancesPage() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <NavigationBar />
      <ArticleProgressBar endId="impact" />

      <main className="flex w-full flex-col items-center gap-[104px]">
        <InterFinancesHero />
        <InterFinancesBody />
        <CTASection />
      </main>

      <div className="mt-[104px] w-full">
        <Footer />
      </div>
    </div>
  );
}
