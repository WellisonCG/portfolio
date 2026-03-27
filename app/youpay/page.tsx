/*
  Youpay Digital — Case Study Page
  ─────────────────────────────────────────────────────────────────────────────
  Route: /youpay

  Framer source: /youpay page (nodeId: f2vXtJfm4, Desktop: SMcAWBT6b)

  Planned section order (from Framer):
    1. NavigationBar      — sticky, reused
    2. YouPayHero         — title, subtitle, hero image
    3. YouPayImproving    — "Improving the solution" + screenshot
    4. YouPayImpact       — "The impact" + metrics
    5. YouPayReflection   — "My reflection"
    6. Footer             — social + copyright, reused

  Layout spec (from Framer):
    - max-width: 1200px, centered
    - horizontal padding: 80px
    - gap between body sections: 160px
*/

import type { Metadata } from "next";
import NavigationBar from "@/components/layout/NavigationBar";
import Footer from "@/components/layout/Footer";
import YouPayHero from "@/components/sections/youpay/YouPayHero";
import YouPayBody from "@/components/sections/youpay/YouPayBody";
import CTASection from "@/components/sections/CTASection";
import ArticleProgressBar from "@/components/ui/ArticleProgressBar";

export const metadata: Metadata = {
  title: "Youpay Digital — Wellison Gonçalves",
  description:
    "Increasing revenue and strengthening the brand with a redesign of the payment flow at Youpay Digital.",
};

export default function YouPayPage() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <NavigationBar />
      <ArticleProgressBar />

      <main className="flex w-full flex-col items-center gap-[104px]">
        <YouPayHero />
        <YouPayBody />
        <CTASection />
      </main>

      <div className="mt-[104px] w-full">
        <Footer />
      </div>
    </div>
  );
}
