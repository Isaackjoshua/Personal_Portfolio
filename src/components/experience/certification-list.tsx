import { ArrowUpRight } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import type { Certification } from "@/lib/data/experience";
import { cn } from "@/lib/utils";

/**
 * Matches EducationList: a ruled record keyed on the date, not a card grid.
 * The two sections sit directly above and below each other on /experience, so
 * they have to agree — two different treatments for two lists of credentials
 * would read as an accident.
 */
export function CertificationList({
  items,
  className,
}: {
  items: Certification[];
  className?: string;
}) {
  return (
    <RevealGroup
      as="ul"
      stagger={0.08}
      className={cn("border-t border-line-soft", className)}
    >
      {items.map((item) => {
        /*
         * The issuer's own verification page wins when there is one: it is
         * checked against the body that awarded it. A copy hosted here is the
         * fallback — it shows the document without proving it, so the label
         * says "view", not "verify".
         */
        const link = item.url
          ? { href: item.url, label: "verify with the issuer, opens in a new tab" }
          : item.document
            ? {
                href: item.document,
                label: "view the certificate, PDF, opens in a new tab",
              }
            : null;

        return (
          <RevealItem
            as="li"
            key={`${item.name}-${item.issuer}`}
            className="group grid gap-x-8 gap-y-2 border-b border-line-soft py-6 sm:grid-cols-[11rem_minmax(0,1fr)] sm:py-7 lg:grid-cols-[14rem_minmax(0,1fr)]"
          >
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-faint">
              {item.issued}
              {item.expires ? ` — ${item.expires}` : ""}
            </p>

            <div className="min-w-0">
              <h3 className="text-base text-pretty sm:text-lg">
                {link ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-start gap-1.5 transition-colors duration-200 hover:text-accent"
                  >
                    <span className="link-underline">{item.name}</span>
                    <ArrowUpRight
                      className="mt-1 size-3.5 shrink-0 text-faint transition-colors duration-200 group-hover:text-accent"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                    <span className="sr-only"> ({link.label})</span>
                  </a>
                ) : (
                  item.name
                )}
              </h3>

              <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted">
                {item.issuer}
              </p>

              {/* Only when there is nothing to click — beside a working link
                  the ID is noise the reader cannot act on. */}
              {!link && item.credentialId && (
                <p className="mt-2.5 font-mono text-xs text-accent">
                  ID {item.credentialId}
                </p>
              )}
            </div>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
