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
    "Aumentando a receita e fortalecendo a marca com o redesign do fluxo de pagamento na Youpay Digital.",
};

export default function YouPayPagePT() {
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
