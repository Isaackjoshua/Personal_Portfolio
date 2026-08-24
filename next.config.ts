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
