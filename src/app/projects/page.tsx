import type { Metadata } from "next";
import { ProjectCard } from "@/components/projects/project-card";
import { ButtonLink } from "@/components/ui/button";
import { GithubIcon } from "@/components/ui/icons";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { PageHeader, Section } from "@/components/ui/section";
import { projects } from "@/lib/data/projects";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const description =
  "Machine learning, backend, desktop, and mobile systems built by Isaack Joshua Lukumay — each one written up with the engineering decisions behind it.";

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: { canonical: "/projects" },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/projects`,
    title: "Projects",
    description,
  },
};

const meta = [
  { label: "count", value: String(projects.length).padStart(2, "0") },
  { label: "domains", value: "ML · Backend · Desktop · Mobile" },
];

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="projects"
        title="Selected work"
        lead="Five systems across machine learning, backend, desktop, and mobile. Each one was built to run somewhere real — offline on an Android phone, on a Linux VPS behind nginx, or on a laptop with no network at all. The case studies cover the decisions that made that possible."
      >
        <dl className="flex flex-wrap items-baseline gap-x-8 gap-y-3 font-mono text-xs">
          {meta.map((item) => (
            <div key={item.label} className="flex items-baseline gap-2">
              <dt className="uppercase tracking-[0.14em] text-faint">
                {item.label}
              </dt>
              <dd className="text-fg">{item.value}</dd>
            </div>
          ))}
          <div className="flex items-baseline gap-2">
            <dt className="uppercase tracking-[0.14em] text-faint">source</dt>
            <dd>
              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noreferrer noopener"
                className="link-underline text-fg transition-colors duration-200 hover:text-accent"
              >
                github.com/Isaackjoshua
              </a>
            </dd>
          </div>
        </dl>
      </PageHeader>

      <Section width="wide">
        <RevealGroup
          as="ul"
          stagger={0.08}
          className="grid gap-5 lg:grid-cols-2 lg:gap-6"
        >
          {projects.map((project, index) => (
            <RevealItem
              as="li"
              key={project.slug}
              className={cn("min-w-0", index === 0 && "lg:col-span-2")}
            >
              <ProjectCard
                project={project}
                index={index}
                featured={index === 0}
              />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-14 sm:mt-16">
          <div className="flex flex-col gap-5 rounded-xl border border-line-soft bg-bg-soft/60 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <h2 className="text-lg">The source is on GitHub</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Every project on this page links to its repository. Smaller
                experiments live there too.
              </p>
            </div>
            <ButtonLink
              href={siteConfig.socials.github}
              variant="secondary"
              size="md"
              className="shrink-0 self-start sm:self-auto"
            >
              <GithubIcon className="size-4" />
              GitHub profile
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
