import { Download, Globe, MapPin } from "lucide-react";
import { HeroBackdrop } from "@/components/ui/backdrop";
import { ButtonLink, buttonClasses } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SocialLinks } from "@/components/ui/social-links";
import { TypingTagline } from "@/components/home/typing-tagline";
import { siteConfig } from "@/lib/site";

const meta = [
  { label: "role", value: "ML engineer · software developer" },
  { label: "now", value: "ML Intern — ETH Lab, MUHAS" },
  { label: "study", value: "BSc Computer Science — final year" },
];

export function Hero() {
  return (
    <section
      aria-labelledby="hero-name"
      className="relative flex min-h-[90dvh] items-center overflow-hidden border-b border-line-soft"
    >
      <HeroBackdrop />

      <div className="container-wide relative w-full pt-28 pb-28 sm:pt-32 sm:pb-32">
        <div className="max-w-3xl">
          <Reveal from="none">
            <p className="inline-flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-2xl border border-line bg-surface/60 px-3.5 py-2 font-mono text-xs text-muted sm:rounded-full sm:py-1.5">
              <span className="inline-flex items-center gap-2">
                <span className="relative flex size-1.5" aria-hidden>
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
                </span>
                <span className="text-accent">
                  {siteConfig.availability.status}
                </span>
              </span>
              <span aria-hidden className="hidden h-3 w-px bg-line sm:inline-block" />
              <span className="inline-flex items-center gap-1.5">
                <Globe className="size-3.5" strokeWidth={1.75} aria-hidden />
                {siteConfig.availability.short}
              </span>
              <span aria-hidden className="hidden h-3 w-px bg-line sm:inline-block" />
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-3.5" strokeWidth={1.75} aria-hidden />
                {siteConfig.location}
              </span>
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <h1
              id="hero-name"
              className="mt-7 text-gradient text-[clamp(2.25rem,8.6vw,5rem)] leading-[1.04] tracking-[-0.035em] break-words"
            >
              {siteConfig.name}
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <TypingTagline className="mt-5 max-w-[34ch] sm:max-w-none" />
          </Reveal>

          <Reveal delay={0.18}>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Machine learning engineer and software developer. I build
              end-to-end systems — the model, the backend that serves it, and
              the desktop or mobile app someone actually opens. Deployment
              decides the design: offline inference, safety boundaries drawn in
              the architecture, and modules that can be swapped without a
              rewrite.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex flex-wrap gap-3">
                <ButtonLink href="/projects" variant="primary" size="lg">
                  View Projects
                </ButtonLink>
                <a
                  href={siteConfig.cv.href}
                  download={siteConfig.cv.filename}
                  className={buttonClasses({ variant: "secondary", size: "lg" })}
                >
                  <Download className="size-4" strokeWidth={1.75} aria-hidden />
                  Download CV
                </a>
              </div>
              <SocialLinks className="sm:ml-2" size="sm" />
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <dl className="mt-12 grid gap-x-10 gap-y-4 border-t border-line-soft pt-6 sm:grid-cols-3">
              {meta.map((item) => (
                <div key={item.label}>
                  <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-faint">
                    {item.label}
                  </dt>
                  <dd className="mt-1.5 font-mono text-xs leading-relaxed text-muted">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-6 hidden justify-center sm:flex"
      >
        <span className="flex flex-col items-center gap-2.5">
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.24em] text-faint">
            scroll
          </span>
          <span className="relative block h-10 w-px overflow-hidden bg-line">
            <span className="absolute inset-x-0 top-0 h-3 animate-scan bg-linear-to-b from-transparent to-accent" />
          </span>
        </span>
      </div>
    </section>
  );
}
