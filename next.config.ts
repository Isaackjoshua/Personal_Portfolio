import type { NextConfig } from "next";

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
