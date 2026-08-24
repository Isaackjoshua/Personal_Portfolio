import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Base surface. `interactive` adds the accent hairline + lift used on
 * project and post cards.
 */
export function Card({
  children,
  className,
  interactive = false,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  as?: "div" | "article" | "li";
}) {
  return (
    <Tag
      className={cn(
        "relative rounded-xl border border-line bg-surface/50 backdrop-blur-[2px]",
        interactive &&
          "group transition-all duration-300 hover:border-accent/40 hover:bg-surface " +
            "hover:shadow-[0_18px_50px_-24px_rgba(0,0,0,0.9)]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/** Decorative corner ticks — the technical detail that reads as "terminal". */
export function CornerTicks({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("pointer-events-none", className)}>
      <span className="absolute left-0 top-0 h-2.5 w-2.5 border-l border-t border-accent/0 transition-colors duration-300 group-hover:border-accent/60" />
      <span className="absolute right-0 top-0 h-2.5 w-2.5 border-r border-t border-accent/0 transition-colors duration-300 group-hover:border-accent/60" />
      <span className="absolute bottom-0 left-0 h-2.5 w-2.5 border-b border-l border-accent/0 transition-colors duration-300 group-hover:border-accent/60" />
      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 border-b border-r border-accent/0 transition-colors duration-300 group-hover:border-accent/60" />
    </span>
  );
}
