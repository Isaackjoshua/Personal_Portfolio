import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { TerminalWindow } from "@/components/ui/terminal";
import { siteConfig } from "@/lib/site";

const output = [
  "status    ▸ available for work",
  `based     ▸ ${siteConfig.location} · UTC+3`,
  "remote    ▸ worldwide · open to relocation",
  "channels  ▸ email · github · linkedin",
  "languages ▸ English · Swahili",
];

export function ClosingCta() {
  return (
    <Section id="contact" className="pb-24 sm:pb-32">
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl border border-line bg-bg-soft">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 dot-field opacity-40"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 right-0 h-64 w-[28rem] rounded-full bg-accent/8 blur-[100px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/40 to-transparent"
          />

          <div className="relative grid gap-10 p-7 sm:p-10 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-12">
            <div>
              <p className="eyebrow">{"// open channel"}</p>
              <h2 className="mt-4 text-2xl sm:text-3xl text-gradient">
                Have something that needs to work in production?
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base">
                I am available for work — machine learning, backend, or the
                stretch between the two. Tell me the constraint you are building
                against and I will tell you straight whether I am the right
                person for it.
              </p>

              <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
                <ButtonLink href="/contact" variant="primary" size="lg">
                  Start a conversation
                  <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden />
                </ButtonLink>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="link-underline self-start font-mono text-sm text-muted transition-colors duration-200 hover:text-accent sm:self-auto"
                >
                  {siteConfig.email}
                </a>
              </div>
            </div>

            <TerminalWindow
              title="contact — zsh"
              command="whois isaack --availability"
              output={output}
              className="w-full"
            />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
