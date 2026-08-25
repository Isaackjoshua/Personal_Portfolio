import {
  Brain,
  ChartColumn,
  Database,
  Eye,
  Layers,
  Smartphone,
  Terminal,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { SkillGroup } from "@/lib/data/skills";
import { cn } from "@/lib/utils";

/** Every icon key a skill group can declare, mapped to its lucide glyph. */
const glyphs: Record<SkillGroup["icon"], LucideIcon> = {
  terminal: Terminal,
  brain: Brain,
  layers: Layers,
  eye: Eye,
  database: Database,
  chart: ChartColumn,
  smartphone: Smartphone,
  users: Users,
};

/**
 * Small surface tile carrying a group glyph. Decorative — the group title
 * next to it carries the meaning — so it stays out of the accessibility tree.
 * Lights up when it sits inside a hovered `group` ancestor.
 */
export function SkillIcon({
  name,
  className,
}: {
  name: SkillGroup["icon"];
  className?: string;
}) {
  const Glyph = glyphs[name];

  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center rounded-lg",
        "border border-line bg-surface-hi text-accent",
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]",
        "transition-colors duration-300",
        "group-hover:border-accent/40 group-hover:bg-accent/10",
        className,
      )}
    >
      <Glyph className="size-5" strokeWidth={1.5} />
    </span>
  );
}
