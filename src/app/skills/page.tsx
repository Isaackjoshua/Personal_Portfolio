import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { SkillGrid } from "@/components/skills/skill-grid";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { PageHeader, Section } from "@/components/ui/section";
import { skillGroups } from "@/lib/data/skills";
import { languages } from "@/lib/site";

const description =
  "Machine learning, backend services, computer vision, data work and cross-platform delivery — the tools and techniques behind the projects, grouped by capability.";

export const metadata: Metadata = {
  title: "Skills",
  description,
  openGraph: {
    title: "Skills · Isaack Joshua",
    description,
  },
};

export default function SkillsPage() {
  const total = skillGroups.reduce((sum, group) => sum + group.skills.length, 0);

  return (
    <>
      <PageHeader
        eyebrow="skills"
        title="What I build with"
        lead="Grouped by capability, not flattened into one long list. Model training, the services that carry a model into production, and the desktop and mobile targets it ships to."
      >
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-faint">
          <li>
            <span className="text-accent">{skillGroups.length}</span> groups
          </li>
          <li>
            <span className="text-accent">{total}</span> tools &amp; techniques
          </li>
          <li>
            <span className="text-accent">{"//"}</span> trained, served, shipped
          </li>
        </ul>
      </PageHeader>

      <Section className="pt-12 sm:pt-16">
        <SkillGrid />

        <Reveal className="mt-8 sm:mt-10">
          <div className="flex flex-col gap-4 rounded-xl border border-line bg-bg-soft/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <p className="font-mono text-xs leading-relaxed text-faint">
              <span className="text-accent">{"// "}</span>
              also works in{" "}
              {languages.map((language, index) => (
                <span key={language.name}>
                  {index > 0 && ", "}
                  <span className="text-fg">{language.name}</span>
                  {" ("}
                  {language.level.toLowerCase()}
                  {")"}
                </span>
              ))}
            </p>

            <div className="flex flex-wrap items-center gap-1 sm:shrink-0">
              <ButtonLink href="/experience" variant="ghost" size="sm">
                Experience
                <ArrowRight aria-hidden className="size-3.5" />
              </ButtonLink>
              <ButtonLink href="/projects" variant="ghost" size="sm">
                Projects
                <ArrowRight aria-hidden className="size-3.5" />
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
