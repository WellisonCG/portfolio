/*
  ProjectsSection
  ─────────────────────────────────────────────────────────────────────────────
  Displays the two featured project cards side by side.
  Layout: 1200px container, 24px gap (from Figma node 1119:1294).

  Card backgrounds (from Figma):
  - Youpay: #eaf1fb (soft blue/lavender) + noise texture at opacity 0.4
  - Inter:  white (#f9fafd) + warm orange noise texture at opacity 0.6

  Cover images are local PNGs in /public/assets/projects/.
*/

"use client";

import ProjectCard from "@/components/ui/ProjectCard";
import { YOUPAY_SCREENS, INTER_PHONE } from "@/lib/assets";
import { useLanguage } from "@/lib/language-context";

export default function ProjectsSection() {
  const { language } = useLanguage();
  const prefix = language === "PT" ? "/pt" : "";

  const PROJECTS = [
    {
      title: "Youpay Digital",
      description:
        language === "PT"
          ? "Aumentando a receita e fortalecendo a marca com o redesign do fluxo de pagamento"
          : "Increasing revenue and strengthening the brand with redesign of the payment flow",
      href: `${prefix}/youpay`,
      coverBg: "#eaf1fb",
      coverImage: YOUPAY_SCREENS,
      coverImageAlt: "Youpay Digital — payment flow redesign screens",
    },
    {
      title: "Inter My Finances",
      description:
        language === "PT"
          ? "Criando uma nova funcionalidade de gestão financeira pessoal para usuários do Banco Inter"
          : "Creating a new feature to personal financial management for Banco Inter users",
      href: `${prefix}/inter-my-finances`,
      coverBg: "#ffffff",
      coverImage: INTER_PHONE,
      coverImageAlt: "Inter My Finances — personal finance feature screens",
    },
  ];

  return (
    <section id="projects" className="w-full px-10 xl:px-0">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-center gap-[24px]">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  );
}
