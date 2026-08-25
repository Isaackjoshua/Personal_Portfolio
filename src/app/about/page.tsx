import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { PortraitFrame } from "@/components/about/portrait-frame";
import { Principles } from "@/components/about/principles";
import { QuickFacts } from "@/components/about/quick-facts";
import { ButtonLink, buttonClasses } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { PageHeader, Section } from "@/components/ui/section";
import { siteConfig } from "@/lib/site";

const description =
  "Isaack Joshua Lukumay — machine learning engineer and software developer based in Dar es Salaam, available for remote work worldwide and open to relocation. Final-year computer science student, ML intern at the ETH Lab at MUHAS, building AI systems that run offline and in production.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About — ${siteConfig.name}`,
    description,
    url: "/about",
    type: "profile",
  },
};

const inlineLink =
  "link-underline font-medium text-accent transition-colors duration-200 hover:text-accent-hi";

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="about"
        title="Engineering, end to end"
        lead="I work across models, backends, desktop and mobile — and I care most about the part everyone skips: getting the thing to run somewhere real, on the hardware that is actually available."
      />

      <Section width="wide" className="pt-14 pb-6 sm:pt-20 sm:pb-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <Reveal from="left" className="lg:col-span-5 xl:col-span-4">
            <PortraitFrame className="mx-auto max-w-sm lg:max-w-none" />
            <QuickFacts className="mx-auto mt-8 max-w-sm lg:max-w-none" />
          </Reveal>

          <Reveal
            delay={0.08}
            className="lg:col-span-7 lg:pt-1 xl:col-span-8"
          >
            <div className="max-w-[46rem] space-y-6 font-sans text-base leading-[1.85] text-muted sm:text-[1.0625rem]">
              <p>
                I build systems end to end. That means the model, the service
                that carries it, and the interface someone actually opens —
                PyTorch through to ONNX, an API in front of it, then a Flutter
                build on a phone or an Electron app on a desktop. Projects tend
                to break at the seams between those layers, so I made a point of
                being useful on both sides of every seam.
              </p>
              <p>
                What I optimise for is deployment, not the leaderboard. A model
                that needs a stable connection, a spare GPU and its author in
                the room has not really shipped. So the constraints go in first:
                run offline, fit the device, fail in a way a person can read,
                and stay simple enough for someone else to maintain.
              </p>
              <p>
                I am in the final year of a BSc in Computer Science at St.
                Joseph University in Tanzania, graduating in 2026. The degree
                gave me the fundamentals. The rest came from building things
                that had to survive being used by someone who did not write
                them.
              </p>
              <p>
                Since March 2025 I have been a machine learning intern at the
                Emerging Technologies for Healthcare (ETH) Lab at Muhimbili
                University of Health and Allied Sciences, here in Dar es Salaam.
                Healthcare is an unforgiving place to learn deployment: clinics
                lose connectivity, a prediction has to be explainable to the
                clinician reading it, and data arrives from several institutions
                in several shapes. The{" "}
                <Link href="/experience" className={inlineLink}>
                  work there
                </Link>{" "}
                covers imaging classifiers, explainability, and the
                preprocessing pipelines underneath them.
              </p>
              <p>
                Outside the lab the problems look nothing like that, which is
                the point. My own{" "}
                <Link href="/projects" className={inlineLink}>
                  projects
                </Link>{" "}
                include a desktop tutor that runs on whichever model you bring
                it — hosted or local — and an agent that diagnoses a broken
                machine and knows exactly where to stop and hand over to a
                person. Different domains, same question every time: what
                happens to this once it leaves my machine?
              </p>
              <p>
                I work from Dar es Salaam, in English and Swahili. I work
                remotely with teams in any timezone, and I am open to
                relocating for the right role. The problems that interest me
                are the ones where the constraint is the interesting part —
                small hardware, no network, a decision that has to be
                defensible to whoever it lands on.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Principles className="py-16 sm:py-24" />

      <Section width="prose" className="pt-6 pb-24 sm:pt-10 sm:pb-32">
        <Reveal>
          <div className="relative overflow-hidden rounded-xl border border-line bg-bg-soft px-6 py-8 sm:px-10 sm:py-10">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 grid-field mask-fade opacity-40"
            />
            <div className="relative">
              <p className="eyebrow">the short version</p>
              <h2 className="mt-4 text-2xl text-gradient sm:text-3xl">
                Everything above, on one page
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                The CV covers the same ground in a single sheet — the degree,
                the internship, the stack. If you would rather just ask, the
                contact page reaches me directly.
              </p>
              <div className="mt-7 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
                <a
                  href={siteConfig.cv.href}
                  download={siteConfig.cv.filename}
                  className={buttonClasses({ size: "lg" })}
                >
                  <Download className="size-4" aria-hidden />
                  Download CV
                </a>
                <ButtonLink href="/contact" variant="secondary" size="lg">
                  Get in touch
                  <ArrowRight className="size-4" aria-hidden />
                </ButtonLink>
              </div>
              <p className="mt-5 font-mono text-[0.6875rem] tracking-wide text-faint">
                PDF &middot; {siteConfig.cv.filename}
              </p>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
