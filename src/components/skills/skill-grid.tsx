import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { skillGroups } from "@/lib/data/skills";

/** Two-digit index used for the mono row counter. */
function pad(value: number) {
  return String(value).padStart(2, "0");
}

/**
 * The capability groups as a ruled spec sheet rather than a grid of cards.
 *
 * Eight bordered, hoverable cards in a three-up grid said "every one of these
 * is a discrete, equally important object" — which is both untrue and the most
 * template-looking layout on the site. A card is elevation, and elevation only
 * means something when it is rare: it now belongs to projects, which are the
 * things actually worth clicking.
 *
 * Read down the left edge and the slugs alone answer "what does he do". That
 * is the job this page has, and a list does it in less space than the grid
 * needed for the chrome around it.
 */
export function SkillGrid() {
  return (
    <RevealGroup as="ul" stagger={0.05} className="border-t border-line-soft">
      {skillGroups.map((group, index) => (
        <RevealItem
          key={group.slug}
          as="li"
          className="group border-b border-line-soft"
        >
          {/*
            * The accent rule is the whole hover treatment. It grows from the
            * left edge rather than lighting up a border box, so scanning the
            * list does not set four corners blinking on every row.
            */}
          <div className="relative py-7 transition-colors duration-300 sm:py-8">
            <span
              aria-hidden
              className="absolute -left-4 top-7 h-0 w-px bg-accent transition-all duration-300 group-hover:h-[calc(100%-3.5rem)] sm:-left-6"
            />

            <div className="grid gap-x-8 gap-y-3 sm:grid-cols-[11rem_minmax(0,1fr)] lg:grid-cols-[14rem_minmax(0,1fr)]">
              <div className="flex items-baseline gap-3 sm:flex-col sm:gap-1.5">
                <p className="font-mono text-sm tracking-wide text-accent">
                  {group.slug}
                </p>
                <p className="font-mono text-[0.625rem] tracking-[0.2em] text-faint">
                  {pad(index + 1)} / {pad(group.skills.length)}
                </p>
              </div>

              <div className="min-w-0">
                <h2 className="text-lg text-pretty text-fg sm:text-xl">
                  {group.title}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                  {group.blurb}
                </p>

                {/*
                  * Plain separated text, not a row of bordered pills. Forty
                  * chips across the page competed with the project tags, which
                  * are the ones that should read as interactive.
                  */}
                <p className="mt-4 font-mono text-xs leading-relaxed text-faint transition-colors duration-300 group-hover:text-muted">
                  {group.skills.join("  ·  ")}
                </p>
              </div>
            </div>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
