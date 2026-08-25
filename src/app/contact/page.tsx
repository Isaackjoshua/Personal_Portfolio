import type { Metadata } from "next";
import { ContactDetails } from "@/components/contact/contact-details";
import { ContactForm } from "@/components/contact/contact-form";
import { Reveal } from "@/components/ui/reveal";
import { PageHeader, Section } from "@/components/ui/section";
import { siteConfig } from "@/lib/site";

const description =
  "Get in touch with Isaack Joshua Lukumay about machine learning, backend, desktop, or mobile work — or about anything else worth building.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/contact`,
    title: "Contact",
    description,
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="contact"
        title={"Have a project in mind? Let’s talk."}
        lead="Open to engineering roles, contract work, and collaboration — on machine learning systems, backends, or anything that has to run somewhere real. I work remotely with teams in any timezone and I am open to relocating. Tell me what you are building and I will reply."
      />

      <Section width="wide">
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
          <Reveal className="lg:col-span-3">
            <ContactForm />
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-2">
            <ContactDetails />

            <div className="mt-6 rounded-xl border border-line-soft bg-bg-soft/60 p-6">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-faint">
                Response time
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {
                  "Messages land in my inbox directly. I read everything and reply to anything with a real question in it — usually within a couple of days."
                }
              </p>
              <p className="mt-4 font-mono text-xs text-faint">
                {siteConfig.location} &middot; EAT (UTC+3)
              </p>
              <p className="mt-1.5 font-mono text-xs text-accent">
                {siteConfig.availability.long}
              </p>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
