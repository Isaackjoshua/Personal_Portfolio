import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projects } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

const cardClasses =
  "group flex h-full flex-col rounded-xl border border-line bg-surface/40 p-5 sm:p-6 " +
  "transition-all duration-300 hover:border-accent/40 hover:bg-surface " +
  "hover:shadow-[0_18px_50px_-24px_rgba(0,0,0,0.9)]";

const labelClasses =
  "flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-faint";

/**
 * Previous / next project at the foot of a case study. Wraps around the
 * array so neither end is a dead stop.
 */
export function ProjectNav({ slug }: { slug: string }) {
  const current = projects.findIndex((project) => project.slug === slug);

  if (current === -1 || projects.length < 2) {
    return null;
  }

  const previous = projects[(current - 1 + projects.length) % projects.length];
  const next = projects[(current + 1) % projects.length];

  return (
    <nav
      aria-label="More projects"
      className="border-t border-line-soft bg-bg-soft/40"
    >
      <div className="container-wide py-10 sm:py-14">
        <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          <li className="min-w-0">
            <Link href={`/projects/${previous.slug}`} className={cardClasses}>
              <span className={labelClasses}>
                <ArrowLeft
                  aria-hidden
                  className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5"
                />
                Previous
              </span>
              <span className="mt-3 font-mono text-lg text-fg transition-colors duration-300 group-hover:text-accent">
                {previous.name}
              </span>
              <span className="mt-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-faint">
                {previous.domain}
              </span>
            </Link>
          </li>

          <li className="min-w-0">
            <Link
              href={`/projects/${next.slug}`}
              className={cn(cardClasses, "sm:items-end sm:text-right")}
            >
              <span className={labelClasses}>
                Next
                <ArrowRight
                  aria-hidden
                  className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </span>
              <span className="mt-3 font-mono text-lg text-fg transition-colors duration-300 group-hover:text-accent">
                {next.name}
              </span>
              <span className="mt-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-faint">
                {next.domain}
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
