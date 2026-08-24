import { Card, CornerTicks } from "@/components/ui/card";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Tag } from "@/components/ui/tag";
import { skillGroups } from "@/lib/data/skills";
import { SkillIcon } from "./skill-icon";

/** Two-digit index used for the mono card counter. */
function pad(value: number) {
  return String(value).padStart(2, "0");
}

/**
 * The six capability groups as a staggered card grid:
 * 1 column on mobile, 2 from md, 3 from xl.
 */
export function SkillGrid() {
  return (
    <RevealGroup
      as="ul"
      stagger={0.06}
      className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3"
    >
      {skillGroups.map((group, index) => (
        <RevealItem key={group.slug} as="li" className="h-full">
          <Card
            interactive
            className="flex h-full flex-col overflow-hidden p-5 sm:p-6"
          >
            <CornerTicks />
            <span
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-12 size-32 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
            />

            <div className="relative flex items-start justify-between gap-4">
              <SkillIcon name={group.icon} />
              <span className="font-mono text-[0.6875rem] tracking-[0.2em] text-faint transition-colors duration-300 group-hover:text-accent">
                {pad(index + 1)}
              </span>
            </div>

            <h2 className="relative mt-5 text-lg text-fg">{group.title}</h2>
            <p className="relative mt-2 text-sm leading-relaxed text-muted">
              {group.blurb}
            </p>

            <div className="relative mt-6 flex flex-1 flex-col justify-end">
              <div className="mb-3 flex items-center gap-3">
                <span className="font-mono text-[0.625rem] tracking-wide text-faint">
                  {group.slug}
                </span>
                <span aria-hidden className="h-px flex-1 bg-line-soft" />
                <span className="font-mono text-[0.625rem] tracking-wide text-faint">
                  {pad(group.skills.length)}
                </span>
              </div>

              <ul className="flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <li key={skill}>
                    <Tag className="hover:border-accent/50 hover:bg-accent/10 hover:text-accent">
                      {skill}
                    </Tag>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
