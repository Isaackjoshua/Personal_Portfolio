import { GraduationCap, MapPin } from "lucide-react";
import { Card, CornerTicks } from "@/components/ui/card";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import type { Education } from "@/lib/data/experience";
import { cn } from "@/lib/utils";

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
      className={cn("grid gap-4 sm:grid-cols-2", className)}
    >
      {items.map((item) => (
        <RevealItem
          as="li"
          key={`${item.qualification}-${item.period}`}
          className="h-full"
        >
          <Card interactive className="h-full p-5 sm:p-6">
            <CornerTicks />

            <div className="flex items-start gap-4">
              <span
                aria-hidden
                className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-line bg-surface-hi text-accent transition-colors duration-300 group-hover:border-accent/40"
              >
                <GraduationCap className="size-5" />
              </span>

              <div className="min-w-0">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-faint">
                  {item.period}
                </p>

                <h3 className="mt-2 text-base text-pretty sm:text-lg">
                  {item.qualification}
                </h3>

                <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted">
                  {item.institution}
                </p>

                {item.location && (
                  <p className="mt-1.5 flex items-start gap-1.5 font-mono text-xs text-faint">
                    <MapPin className="mt-px size-3.5 shrink-0" aria-hidden />
                    <span>{item.location}</span>
                  </p>
                )}

                {item.note && (
                  <p className="mt-3 flex items-center gap-2 font-mono text-xs text-accent">
                    <span aria-hidden className="h-px w-4 shrink-0 bg-accent/50" />
                    <span>{item.note}</span>
                  </p>
                )}
              </div>
            </div>
          </Card>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
