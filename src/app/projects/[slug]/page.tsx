import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { ProjectStatus } from "@/components/projects/project-card";
import { ProjectNav } from "@/components/projects/project-nav";
import { ButtonLink } from "@/components/ui/button";
import { GithubIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { Tag } from "@/components/ui/tag";
import { TerminalWindow } from "@/components/ui/terminal";
import { getProject, projects } from "@/lib/data/projects";
import { siteConfig } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return { title: "Project not found" };

  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      url: `${siteConfig.url}/projects/${project.slug}`,
      title: `${project.name} — ${project.domain}`,
      description: project.summary,
    },
  };
}

function MetaRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 border-b border-line-soft py-3 last:border-b-0 sm:flex-row sm:items-baseline sm:gap-4">
      <dt className="w-24 shrink-0 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-faint">
        {label}
      </dt>
      <dd className="min-w-0 text-sm text-fg">{children}</dd>
    </div>
  );
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: `${siteConfig.url}/projects`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.name,
        item: `${siteConfig.url}/projects/${project.slug}`,
      },
    ],
  };

  return (
    <article className="pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <header className="relative overflow-hidden border-b border-line-soft">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 grid-field mask-fade opacity-50"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-accent/8 blur-[100px]"
        />

        <div className="container-wide relative pt-32 pb-14 sm:pt-40 sm:pb-16">
          <Reveal>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-faint transition-colors hover:text-accent"
            >
              <ArrowLeft className="size-3.5" strokeWidth={1.75} aria-hidden />
              All projects
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
              <span>{project.domain}</span>
              <span aria-hidden className="text-line">
                /
              </span>
              <span className="text-faint">{project.year}</span>
              <ProjectStatus status={project.status} />
            </div>

            <h1 className="mt-4 text-4xl text-gradient sm:text-5xl lg:text-6xl">
              {project.name}
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              {project.summary}
            </p>
          </Reveal>
        </div>
      </header>

      <div className="container-wide pt-14 sm:pt-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
          <div className="min-w-0">
            <Reveal>
              <p className="text-base leading-relaxed text-muted">
                {project.description}
              </p>
            </Reveal>

            <Reveal delay={0.06} className="mt-10">
              <TerminalWindow
                title={`${project.slug} — bash`}
                command={project.terminal.command}
                output={project.terminal.output}
              />
            </Reveal>

            <section className="mt-14">
              <Reveal>
                <p className="eyebrow">{"// engineering notes"}</p>
                <h2 className="mt-3 text-2xl text-gradient sm:text-3xl">
                  Decisions behind it
                </h2>
              </Reveal>

              <ol className="mt-8 space-y-8">
                {project.highlights.map((highlight, index) => (
                  <Reveal
                    as="li"
                    key={highlight.title}
                    delay={index * 0.05}
                    className="relative border-l border-line pl-6"
                  >
                    <span
                      aria-hidden
                      className="absolute -left-px top-1.5 h-6 w-px bg-accent"
                    />
                    <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-faint">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 text-lg text-fg">{highlight.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {highlight.body}
                    </p>
                  </Reveal>
                ))}
              </ol>
            </section>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Reveal delay={0.08}>
              <div className="rounded-xl border border-line bg-surface/50 p-6">
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-accent">
                  Project
                </p>

                <dl className="mt-4">
                  <MetaRow label="Role">{project.role}</MetaRow>
                  <MetaRow label="Year">{project.year}</MetaRow>
                  <MetaRow label="Status">{project.status}</MetaRow>
                  <MetaRow label="Stack">
                    <ul className="flex flex-wrap gap-1.5">
                      {project.stack.map((item) => (
                        <li key={item}>
                          <Tag>{item}</Tag>
                        </li>
                      ))}
                    </ul>
                  </MetaRow>
                </dl>

                <div className="mt-6 flex flex-col gap-2.5">
                  <ButtonLink
                    href={project.github}
                    variant="primary"
                    size="sm"
                    className="w-full"
                  >
                    <GithubIcon className="size-4" />
                    View source
                  </ButtonLink>

                  {project.demo && (
                    <ButtonLink
                      href={project.demo}
                      variant="secondary"
                      size="sm"
                      className="w-full"
                    >
                      <ExternalLink
                        className="size-4"
                        strokeWidth={1.75}
                        aria-hidden
                      />
                      Live demo
                    </ButtonLink>
                  )}
                </div>
              </div>
            </Reveal>
          </aside>
        </div>

        <ProjectNav slug={project.slug} />
      </div>
    </article>
  );
}
