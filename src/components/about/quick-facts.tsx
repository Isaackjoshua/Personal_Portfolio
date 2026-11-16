import { education, leadRole, roles } from "@/lib/data/experience";
import { languages, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Every role with no end date. This used to be a single `.find()`, which was
 * safe only while exactly one role was current — an assumption nothing in the
 * data ever stated. There are now three, so the old code silently picked the
 * first and pinned it to a hardcoded "ETH Lab, MUHAS", producing a title from
 * one job beside the organisation of another.
 */
const currentRoles = roles.filter((role) => role.current);
const degree = education[0];

type Fact = {
  label: string;
  value: string;
  meta?: string;
};

/**
 * The "Currently" row of the quick-facts panel, which is a single
 * label/value/meta line in a narrow sidebar column.
 *
 * Leads with one role rather than listing all three. The panel is a scan-in-
 * two-seconds summary beside the portrait, and three wrapped organisation
 * names would turn the shortest row into the longest. Which role leads is
 * stated in the data (`lead`), not inferred from array order, and the count
 * of the others is carried in `meta` so nothing is hidden — a reader who
 * wants the full picture is told there is one and where to find it.
 */
function currentlyFact(): Fact {
  const alsoRunning = currentRoles.length - 1;

  return {
    label: "Currently",
    value: leadRole.title,
    meta: [
      leadRole.shortOrganisation ?? leadRole.organisation,
      leadRole.period,
      alsoRunning > 0 ? `+${alsoRunning} concurrent roles` : null,
    ]
      .filter(Boolean)
      .join(" · "),
  };
}

const facts: Fact[] = [
  {
    label: "Location",
    value: siteConfig.location,
    meta: "East Africa Time · UTC+3",
  },
  {
    label: "Available",
    value: siteConfig.availability.short,
    meta: "Remote worldwide · will relocate for the right role",
  },
  {
    label: "Focus",
    value: "ML/AI · Backend · Desktop · Mobile",
    meta: "Systems built for deployment, not demos",
  },
  currentlyFact(),
  {
    label: "Education",
    value: degree.qualification,
    meta: `${degree.institution} · ${degree.period}`,
  },
];

export function QuickFacts({ className }: { className?: string }) {
  return (
    <section
      aria-labelledby="quick-facts-heading"
      className={cn(
        "rounded-xl border border-line bg-surface/50 px-5 py-4 sm:px-6 sm:py-5",
        className,
      )}
    >
      <h2
        id="quick-facts-heading"
        className="flex items-center gap-3 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-faint"
      >
        Quick facts
        <span aria-hidden className="h-px flex-1 bg-line-soft" />
      </h2>

      <dl className="mt-1 divide-y divide-line-soft">
        {facts.map((fact) => (
          <div
            key={fact.label}
            className="grid gap-1 py-3.5 sm:grid-cols-[6.5rem_1fr] sm:gap-4"
          >
            <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-faint sm:pt-0.5">
              {fact.label}
            </dt>
            <dd className="min-w-0">
              <span className="block font-mono text-sm leading-snug text-fg">
                {fact.value}
              </span>
              {fact.meta && (
                <span className="mt-1 block font-mono text-[0.6875rem] leading-snug text-faint">
                  {fact.meta}
                </span>
              )}
            </dd>
          </div>
        ))}

        <div className="grid gap-1 py-3.5 sm:grid-cols-[6.5rem_1fr] sm:gap-4">
          <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-faint sm:pt-0.5">
            Languages
          </dt>
          <dd className="min-w-0 space-y-1.5">
            {languages.map((language) => (
              <span key={language.name} className="block">
                <span className="font-mono text-sm leading-snug text-fg">
                  {language.name}
                </span>
                <span className="ml-2 font-mono text-[0.6875rem] leading-snug text-faint">
                  {language.level}
                </span>
              </span>
            ))}
          </dd>
        </div>
      </dl>
    </section>
  );
}
