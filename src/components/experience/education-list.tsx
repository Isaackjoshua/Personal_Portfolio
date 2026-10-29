import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import type { Education } from "@/lib/data/experience";
import { cn } from "@/lib/utils";

/**
 * A ruled record rather than a card grid.
 *
 * One degree in a bordered, hoverable, icon-bearing card gave a single fact
 * the same visual weight as a project case study. The period is the natural
 * left column — it is what a reader scans an education section for — so it
 * leads, and everything else hangs off it.
 */
export function EducationList({
  items,
  className,
}: {
  items: Education[];
  className?: string;
}) {
  return (
    <RevealGroup
      as="ul"
      stagger={0.08}
      className={cn("border-t border-line-soft", className)}
    >
      {items.map((item) => (
        <RevealItem
          as="li"
          key={`${item.qualification}-${item.period}`}
          className="grid gap-x-8 gap-y-2 border-b border-line-soft py-6 sm:grid-cols-[11rem_minmax(0,1fr)] sm:py-7 lg:grid-cols-[14rem_minmax(0,1fr)]"
        >
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-faint">
            {item.period}
          </p>

          <div className="min-w-0">
            <h3 className="text-base text-pretty sm:text-lg">
              {item.qualification}
            </h3>

            <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted">
              {item.institution}
              {item.location ? `, ${item.location}` : ""}
            </p>

            {item.note && (
              <p className="mt-2.5 font-mono text-xs text-accent">
                {item.note}
              </p>
            )}
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
