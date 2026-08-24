import { ChevronRight, MapPin } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Tag, TagList } from "@/components/ui/tag";
import type { Role } from "@/lib/data/experience";
import { cn } from "@/lib/utils";

/**
 * Node sits at the far left of every entry (centre = 8px), so the rail can
 * stay on a single x-position at every breakpoint while the content indent
 * grows. `current` roles get a live accent dot; past roles a hollow one.
 */
function TimelineNode({ current }: { current: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute left-0 top-1.5 flex size-4 items-center justify-center rounded-full bg-bg",
        !current && "border border-line",
      )}
    >
      {current ? (
        <>
          <span className="absolute inset-0 animate-ping rounded-full bg-accent/25 [animation-duration:2.8s]" />
          <span className="absolute inset-0 rounded-full border border-accent/45" />
          <span className="relative size-1.5 rounded-full bg-accent shadow-[0_0_10px_2px_rgba(52,211,153,0.45)]" />
        </>
      ) : (
        <span className="size-1.5 rounded-full bg-line" />
      )}
    </span>
  );
}

export function Timeline({
  roles,
  className,
}: {
  roles: Role[];
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-2 top-3 w-px -translate-x-1/2 bg-linear-to-b from-line via-line to-transparent"
      />

      <RevealGroup
        as="ol"
        stagger={0.09}
        className="relative space-y-12 sm:space-y-16"
      >
        {roles.map((role) => (
          <RevealItem
            as="li"
            key={`${role.title}-${role.period}`}
            className="relative pl-8 sm:pl-12"
          >
            <TimelineNode current={role.current} />

            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-faint">
                {role.period}
              </p>
              {role.current && <Tag active>Current</Tag>}
            </div>

            <h3 className="mt-3 text-xl sm:text-2xl">{role.title}</h3>
            <p className="mt-1.5 font-mono text-xs text-faint sm:text-sm">
              {role.subtitle}
            </p>

            <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-fg sm:text-base">
              {role.organisation}
            </p>

            <p className="mt-2 flex items-start gap-1.5 font-mono text-xs text-faint">
              <MapPin className="mt-px size-3.5 shrink-0" aria-hidden />
              <span>{role.location}</span>
            </p>

            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
              {role.summary}
            </p>

            {role.highlights.length > 0 && (
              <>
                <p className="mt-6 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-faint">
                  // selected work
                </p>
                <ul className="mt-2.5 max-w-2xl space-y-2.5 rounded-xl border border-line-soft bg-surface/40 p-4 sm:p-5">
                  {role.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-2.5 text-sm leading-relaxed text-muted"
                    >
                      <ChevronRight
                        className="mt-1 size-3.5 shrink-0 text-accent"
                        aria-hidden
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <TagList items={role.stack} className="mt-5" />
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
