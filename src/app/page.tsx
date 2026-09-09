import type { Metadata } from "next";
import { CapabilityStrip } from "@/components/home/capability-strip";
import { ClosingCta } from "@/components/home/closing-cta";
import { FeaturedWork } from "@/components/home/featured-work";
import { Hero } from "@/components/home/hero";
import { siteConfig } from "@/lib/site";
import { jsonLd } from "@/lib/utils";
import { openGraphImage } from "./shared-metadata";

/**
 * Shorter than `siteConfig.description`, which runs to 250 characters. Google
 * truncates a search snippet around 160, so the long form was being cut
 * mid-clause. The full version still feeds Open Graph and the Person schema
 * below, where there is no such limit — this trims only where it costs.
 */
const metaDescription =
  "ML engineer in Dar es Salaam building end-to-end AI systems — offline inference, agentic tooling, and the backends that carry them to production.";

export const metadata: Metadata = {
  description: metaDescription,
  alternates: { canonical: "/" },
  openGraph: {
    ...openGraphImage,
    type: "website",
    url: siteConfig.url,
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.description,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  // Stable identifier, referenced by the ProfilePage on /about so both
  // descriptions resolve to one person rather than two who share a name.
  "@id": `${siteConfig.url}/#person`,
  name: siteConfig.name,
  jobTitle: siteConfig.role,
  description: siteConfig.description,
  url: siteConfig.url,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  sameAs: [siteConfig.socials.github, siteConfig.socials.linkedin],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dar es Salaam",
    addressCountry: "TZ",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "St. Joseph University in Tanzania",
  },
  knowsLanguage: ["en", "sw"],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(personJsonLd) }}
      />
      <Hero />
      <CapabilityStrip />
      <FeaturedWork />
      <ClosingCta />
    </>
  );
}
