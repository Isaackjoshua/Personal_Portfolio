import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import incrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

/**
 * `next build` prerenders every dynamic route on this site — blog posts, tag
 * pages, project case studies — and Next then reads that HTML back through its
 * incremental cache at request time. On Cloudflare that cache has to be given
 * an implementation explicitly: without one, the routes are listed in the
 * prerender manifest but their HTML is unreachable, and every one of them
 * answers 404.
 *
 * `staticAssetsIncrementalCache` reads the prerendered output straight from the
 * Workers assets binding. It cannot write, which is exactly right here — no
 * route on this site revalidates, so a new deploy is the only thing that should
 * ever change a page. Swap it for the R2 or KV cache if ISR is ever introduced.
 */
export default defineCloudflareConfig({ incrementalCache });
