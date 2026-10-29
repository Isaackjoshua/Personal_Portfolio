import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Card, CornerTicks } from "@/components/ui/card";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { TagList } from "@/components/ui/tag";
import { featuredProjects } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

export function FeaturedWork() {
  const selected = featuredProjects.slice(0, 3);
  const [lead, ...rest] = selected;

  return (
    <Section id="work">
      <SectionHeading
        index="01"
        eyebrow="selected work"
        title="Systems built to run, not to demo"
        description="A teaching app that works against any model, an agent with hard limits on what it may touch, and an early-warning platform for public health. Each one shipped with the deployment constraint decided first."
      />

      {/*
        * Three equal columns is the most recognisable template layout there
        * is, and it also lied: these projects are not equally important. The
        * first one now takes a tall left column and the other two stack beside
        * it, so the grid states a preference instead of hedging.
        */}
      <RevealGroup
        as="ul"
        className="mt-12 grid gap-5 lg:grid-cols-[1.25fr_minmax(0,1fr)] lg:grid-rows-2"
      >
        {[lead, ...rest].map((project, index) => (
          <RevealItem
            key={project.slug}
            as="li"
            className={index === 0 ? "lg:row-span-2" : undefined}
          >
            <Card
              as="article"
              interactive
              className="flex h-full flex-col p-6 sm:p-7"
            >
              <CornerTicks />

              <div className="flex items-baseline justify-between gap-3">
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
                  {project.domain}
                </p>
                <p className="font-mono text-[0.6875rem] text-faint">
                  {project.year}
                </p>
              </div>

              <h3
                className={cn(
                  "mt-4 transition-colors duration-300 group-hover:text-accent",
                  index === 0 ? "text-2xl sm:text-3xl" : "text-xl",
                )}
              >
                {project.name}
              </h3>

              <p
                className={cn(
                  "mt-3 leading-relaxed text-muted",
                  index === 0 ? "max-w-md text-base" : "text-sm",
                )}
              >
                {project.summary}
              </p>

              <TagList
                items={project.stack}
                limit={index === 0 ? 6 : 3}
                className="mt-auto pt-6"
              />

              <p
                aria-hidden
                className="mt-6 flex items-center gap-1.5 border-t border-line-soft pt-4 font-mono text-xs text-faint transition-colors duration-300 group-hover:text-accent"
              >
                View project
                <ArrowUpRight
                  className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.75}
                />
              </p>

              <Link
                href={`/projects/${project.slug}`}
                className="absolute inset-0 rounded-xl"
              >
                <span className="sr-only">
                  {`View the ${project.name} project`}
                </span>
              </Link>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal delay={0.08}>
        <div className="mt-10 flex justify-center sm:justify-start">
          <ButtonLink href="/projects" variant="ghost" className="group -ml-1">
            View all projects
            <ArrowRight
              className="size-4 transition-transform duration-200 group-hover:translate-x-1"
              strokeWidth={1.75}
              aria-hidden
            />
          </ButtonLink>
        </div>
      </Reveal>
    </Section>
  );
}
