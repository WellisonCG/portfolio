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

import ProjectCard from "@/components/ui/ProjectCard";
import { YOUPAY_SCREENS, INTER_PHONE } from "@/lib/assets";

const PROJECTS = [
  {
    title: "Youpay Digital",
    description:
      "Increasing revenue and strengthening the brand with redesign of the payment flow",
    href: "/youpay",
    coverBg: "#eaf1fb",
    coverImage: YOUPAY_SCREENS,
    coverImageAlt: "Youpay Digital — payment flow redesign screens",
  },
  {
    title: "Inter My Finances",
    description:
      "Creating a new feature to personal financial managment for Banco Inter users",
    href: "/inter-my-finances",
    coverBg: "#ffffff",
    coverImage: INTER_PHONE,
    coverImageAlt: "Inter My Finances — personal finance feature screens",
  },
];

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="flex w-full max-w-[1200px] flex-col lg:flex-row items-center justify-center gap-[24px] px-10 xl:px-0"
    >
      {PROJECTS.map((project) => (
        <ProjectCard key={project.title} {...project} />
      ))}
    </section>
  );
}
