import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card, CornerTicks } from "@/components/ui/card";
import { GithubIcon } from "@/components/ui/icons";
import { TagList } from "@/components/ui/tag";
import { TerminalWindow } from "@/components/ui/terminal";
import type { Project } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

const statusTone: Record<
  Project["status"],
  { dot: string; text: string; pulse: boolean }
> = {
  Active: { dot: "bg-accent", text: "text-accent", pulse: true },
  Shipped: { dot: "bg-accent-dim", text: "text-muted", pulse: false },
  "In development": { dot: "bg-faint", text: "text-faint", pulse: false },
};

/** Accent dot + label. Live work pulses; everything else sits still. */
export function ProjectStatus({
  status,
  className,
}: {
  status: Project["status"];
  className?: string;
}) {
  const tone = statusTone[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-line bg-bg-soft/80 px-2.5 py-1",
        "font-mono text-[0.625rem] uppercase leading-none tracking-[0.14em]",
        tone.text,
        className,
      )}
    >
      <span aria-hidden className="relative flex size-1.5 shrink-0">
        {tone.pulse && (
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-70" />
        )}
        <span
          className={cn("relative inline-flex size-1.5 rounded-full", tone.dot)}
        />
      </span>
      {status}
    </span>
  );
}

function indexLabel(index: number) {
  return String(index + 1).padStart(2, "0");
}

/**
 * One project. `featured` splits the card into copy + terminal chrome and is
 * meant for a card that spans the full grid width.
 */
export function ProjectCard({
  project,
  index,
  featured = false,
}: {
  project: Project;
  index: number;
  featured?: boolean;
}) {
  const meta = (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <span className="font-mono text-[0.6875rem] tracking-[0.2em] text-faint">
        {indexLabel(index)}
      </span>
      <span aria-hidden className="h-px w-5 shrink-0 bg-line" />
      <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
        {project.domain}
      </span>
      <ProjectStatus status={project.status} className="ml-auto" />
    </div>
  );

  const body = (
    <>
      <h3
        className={cn(
          "mt-5 text-xl transition-colors duration-300 group-hover:text-accent",
          featured && "sm:text-2xl lg:text-3xl",
        )}
      >
        {project.name}
      </h3>
      <p
        className={cn(
          "mt-3 text-sm leading-relaxed text-muted",
          featured && "sm:text-base",
        )}
      >
        {project.summary}
      </p>
      <TagList items={project.stack} limit={5} className="mt-5" />
    </>
  );

  const actions = (
    <div className="mt-auto flex items-center gap-4 border-t border-line-soft pt-5">
      <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-faint">
        {project.year}
      </span>

      <Link
        href={`/projects/${project.slug}`}
        className={cn(
          "ml-auto inline-flex items-center gap-1.5 font-mono text-xs text-muted",
          "transition-colors duration-200 group-hover:text-accent hover:text-accent",
          "after:absolute after:inset-0 after:content-['']",
        )}
      >
        Case study
        <span className="sr-only"> for {project.name}</span>
        <ArrowUpRight
          aria-hidden
          className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </Link>

      <a
        href={project.github}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={`${project.name} source code on GitHub`}
        className={cn(
          "relative z-10 -mr-1 inline-flex size-8 items-center justify-center rounded-lg",
          "text-faint transition-colors duration-200 hover:bg-surface-hi hover:text-accent",
        )}
      >
        <GithubIcon className="size-4" />
      </a>
    </div>
  );

  if (featured) {
    return (
      <Card
        as="article"
        interactive
        className="flex h-full flex-col overflow-hidden"
      >
        <CornerTicks />
        <div className="grid h-full lg:grid-cols-[1.08fr_minmax(0,1fr)]">
          <div className="flex min-w-0 flex-col p-6 sm:p-8">
            {meta}
            {body}
            {actions}
          </div>
          <div className="min-w-0 border-t border-line-soft bg-bg-soft/40 p-6 sm:p-8 lg:border-l lg:border-t-0">
            <TerminalWindow
              title={`${project.slug} — bash`}
              command={project.terminal.command}
              output={project.terminal.output}
              className="text-[0.6875rem]"
            />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      as="article"
      interactive
      className="flex h-full flex-col overflow-hidden p-6 sm:p-7"
    >
      <CornerTicks />
      {meta}
      {body}
      {actions}
    </Card>
  );
}
