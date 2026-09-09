import { siteConfig } from "@/lib/site";

/**
 * The site-wide social preview image, ready to spread into a page's
 * `openGraph` and `twitter` metadata.
 *
 * `opengraph-image.tsx` sits in this directory, so Next attaches the image it
 * generates to the root segment automatically. That is enough for the homepage
 * and nothing else: metadata is merged down the tree *shallowly*, so a page
 * declaring its own `openGraph` object replaces the root's entire object —
 * images included — rather than adding to it. Every page here sets a bespoke
 * `openGraph.title` and `description`, so every page was dropping the image.
 *
 * Sharing the fields through a variable is the pattern the Next metadata docs
 * prescribe for this exact case: spread these in, then override title and
 * description alongside.
 *
 * The URL is the image route's own path, with no cache-busting query. Next
 * appends a content hash when it emits the tag itself, but that hash changes
 * whenever `opengraph-image.tsx` changes, so hardcoding one would rot silently.
 * `metadataBase` resolves this to an absolute URL, which is what the social and
 * AI crawlers reading these tags require.
 */
export const socialImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${siteConfig.name} — ${siteConfig.role}`,
} as const;

/** Spread into `openGraph`. */
export const openGraphImage = { images: [socialImage] };

/** Spread into `twitter`. Card type travels with it — the image needs it. */
export const twitterImage = {
  card: "summary_large_image" as const,
  images: [socialImage],
};
