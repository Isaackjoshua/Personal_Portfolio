import type { Metadata } from "next";
import { ArrowRight, Download } from "lucide-react";
import { EducationList } from "@/components/experience/education-list";
import { Timeline } from "@/components/experience/timeline";
import { ButtonLink, buttonClasses } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { PageHeader, Section, SectionHeading } from "@/components/ui/section";
import { education, roles } from "@/lib/data/experience";
import { siteConfig } from "@/lib/site";

const description =
  "Machine learning work at the Emerging Technologies for Healthcare Lab, MUHAS, and the Computer Science degree running alongside it — roles, dates, tools, and what shipped.";

export const metadata: Metadata = {
  title: "Experience",
  description,
  openGraph: {
    title: `Experience · ${siteConfig.shortName}`,
    description,
  },
};

export default function ExperiencePage() {
  const currentRole = roles.find((role) => role.current);

  return (
    <>
      <PageHeader
        eyebrow="experience"
        title="Experience"
        lead="Applied machine learning inside a health-research lab in Dar es Salaam, alongside a final-year Computer Science degree. Dates, tools, and the work itself."
      >
        {currentRole && (
          <dl className="flex flex-wrap gap-x-10 gap-y-5 font-mono text-xs">
            <div>
              <dt className="uppercase tracking-[0.14em] text-faint">Role</dt>
              <dd className="mt-1.5 text-fg">{currentRole.title}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-[0.14em] text-faint">Period</dt>
              <dd className="mt-1.5 text-fg">{currentRole.period}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-[0.14em] text-faint">
                Based in
              </dt>
              <dd className="mt-1.5 text-fg">{siteConfig.location}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-[0.14em] text-faint">
                Available
              </dt>
              <dd className="mt-1.5 text-fg">
                {siteConfig.availability.short}
              </dd>
            </div>
          </dl>
        )}
      </PageHeader>

      <Section id="roles">
        <SectionHeading
          index="01"
          eyebrow="experience"
          title="Roles"
          description="Model work measured against deployment constraints: offline devices, explainability requirements, and datasets assembled across institutions."
        />
        <Timeline roles={roles} className="mt-12 max-w-3xl sm:mt-16" />
      </Section>

      <Section id="education">
        <SectionHeading
          index="02"
          eyebrow="education"
          title="Education"
          description="The formal track behind the engineering work."
        />
        <EducationList items={education} className="mt-10 max-w-4xl sm:mt-12" />
      </Section>

      <Section className="pt-0 sm:pt-0">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-line bg-bg-soft p-6 sm:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 dot-field mask-fade opacity-40"
            />
            <div className="relative flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-md">
                <p className="eyebrow">{"// cv"}</p>
                <h2 className="mt-4 text-2xl text-gradient sm:text-3xl">
                  The full record, on one page
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  Every role, project, and tool in PDF form. Or skip the
                  document and start a conversation.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={siteConfig.cv.href}
                  download={siteConfig.cv.filename}
                  className={buttonClasses({ size: "lg" })}
                >
                  <Download className="size-4" aria-hidden />
                  Download CV
                </a>
                <ButtonLink href="/contact" variant="ghost" size="lg">
                  Get in touch
                  <ArrowRight className="size-4" aria-hidden />
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
