import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function Section({
  children,
  className,
  id,
  width = "wide",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  width?: "wide" | "prose" | "full";
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 sm:py-28",
        width === "wide" && "container-wide",
        width === "prose" && "container-prose",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  /** Two-digit section index, e.g. "02". */
  index?: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <p className="eyebrow flex items-center gap-2">
        <span className="text-faint">{index ? `// ${index}` : "//"}</span>
        <span>{eyebrow}</span>
        <span
          aria-hidden
          className={cn(
            "h-px flex-1 bg-linear-to-r from-line to-transparent",
            align === "center" && "hidden",
          )}
        />
      </p>
      <h2 className="mt-4 text-3xl sm:text-4xl text-gradient">{title}</h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted">
          {description}
        </p>
      )}
    </Reveal>
  );
}

/**
 * Page-level header for the inner routes. Keeps every non-home page
 * opening on the same rhythm.
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-line-soft">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-field mask-fade opacity-60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-accent/8 blur-[100px]"
      />
      <div className="container-wide relative pt-32 pb-14 sm:pt-40 sm:pb-20">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl text-gradient">
            {title}
          </h1>
          {lead && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              {lead}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
      </div>
    </header>
  );
}
