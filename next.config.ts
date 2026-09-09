import type { NextConfig } from "next";

import { siteConfig } from "./src/lib/site";

/**
 * Applied to every route. Nothing here needs a per-page exception, so the
 * whole set is attached with a single wildcard matcher.
 */
const securityHeaders = [
  // Stop the browser guessing a MIME type it was not given.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Send the origin, but only the origin, when leaving the site.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // No third-party framing.
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // The site never asks for these, so deny them outright.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  /**
   * After one HTTPS response the browser refuses to speak plain HTTP to this
   * domain for two years, so a visitor who types the bare hostname never makes
   * the redirectable request that a network attacker could intercept.
   *
   * `includeSubDomains` covers `send.` and anything added later.
   * `preload` opts into the browser-shipped list, which closes the very first
   * visit as well — submit at hstspreload.org once this has been live a while.
   * Both are hard to walk back: the header must keep being served for the whole
   * max-age, and removal from the preload list takes months. That is the point
   * of the mechanism, and this domain serves nothing over plain HTTP.
   */
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    /**
     * Cloudflare Workers has no Node image-optimisation runtime, so the
     * `/_next/image` endpoint that `next/image` would otherwise call does not
     * exist in production. Serving the source file directly is the correct
     * behaviour here rather than a compromise: the site has exactly one raster
     * image (`public/isaack.jpg`, ~100 KB), and Cloudflare's CDN caches it at
     * the edge anyway. If more or larger images ever appear, the alternative is
     * a custom loader pointed at Cloudflare Images (a paid zone feature).
     */
    unoptimized: true,
  },
  /**
   * `isaackjoshua.com` and `www.isaackjoshua.com` are both attached to this
   * Worker, so without this every page would answer on two hostnames. That
   * splits inbound links between them and leaves search engines to guess which
   * one is the real site. The apex is the canonical host — it is what
   * `siteConfig.url` feeds into canonical links, Open Graph URLs and the
   * sitemap — so `www` permanently redirects to it, path and query intact.
   *
   * Static assets are served straight off the Workers assets binding and never
   * reach this routing layer, so a `www` request for `/_next/static/...` is
   * answered rather than redirected. That is harmless: those URLs are
   * referenced by pages that have already been redirected, never shared.
   */
  async redirects() {
    const canonical = new URL(siteConfig.url);
    return [
      // Two rules rather than one, and the order matters. `/:path*` does match
      // the bare root, but with zero segments captured Next emits the
      // placeholder literally — `www.isaackjoshua.com/` would send visitors to
      // `https://isaackjoshua.com/:path*`. Rules are evaluated top down, so the
      // root is claimed by its own rule before the wildcard can mangle it.
      {
        source: "/",
        has: [{ type: "host" as const, value: `www.${canonical.host}` }],
        destination: canonical.origin,
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host" as const, value: `www.${canonical.host}` }],
        destination: `${canonical.origin}/:path*`,
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
