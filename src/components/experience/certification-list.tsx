import { BadgeCheck, ExternalLink } from "lucide-react";
import { Card, CornerTicks } from "@/components/ui/card";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import type { Certification } from "@/lib/data/experience";
import { cn } from "@/lib/utils";

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
      className={cn("grid gap-4 sm:grid-cols-2", className)}
    >
      {items.map((item) => (
        <RevealItem
          as="li"
          key={`${item.name}-${item.issuer}`}
          className="h-full"
        >
          <Card interactive className="h-full p-5 sm:p-6">
            <CornerTicks />

            <div className="flex items-start gap-4">
              <span
                aria-hidden
                className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-line bg-surface-hi text-accent transition-colors duration-300 group-hover:border-accent/40"
              >
                <BadgeCheck className="size-5" />
              </span>

              <div className="min-w-0">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-faint">
                  {item.issued}
                  {item.expires ? ` — ${item.expires}` : ""}
                </p>

                <h3 className="mt-2 text-base text-pretty sm:text-lg">
                  {/*
                   * A certificate a reader cannot check is just a claim, so the
                   * title becomes the verification link whenever the issuer
                   * provides one. `noopener` is what keeps the new tab from
                   * reaching back into this page via `window.opener`.
                   */}
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="link-underline inline-flex items-start gap-1.5 transition-colors hover:text-accent"
                    >
                      <span>{item.name}</span>
                      <ExternalLink
                        className="mt-1 size-3.5 shrink-0"
                        aria-hidden
                      />
                      <span className="sr-only">
                        {" "}
                        (verify on the issuer&rsquo;s site, opens in a new tab)
                      </span>
                    </a>
                  ) : (
                    item.name
                  )}
                </h3>

                <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted">
                  {item.issuer}
                </p>

                {/*
                 * Only worth showing when there is no link to click — with a
                 * URL present the ID is noise the reader cannot act on.
                 */}
                {!item.url && item.credentialId && (
                  <p className="mt-3 flex items-center gap-2 font-mono text-xs text-accent">
                    <span
                      aria-hidden
                      className="h-px w-4 shrink-0 bg-accent/50"
                    />
                    <span className="truncate">ID {item.credentialId}</span>
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
