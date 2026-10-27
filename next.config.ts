import type { NextConfig } from "next";
import path from "node:path";

const IMMUTABLE = "public, max-age=31536000, immutable";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  trailingSlash: false,
  images: {
    qualities: [60, 70, 75, 80],
    // Fewer widths means fewer variants generated, and fewer fetches of each original from Supabase.
    deviceSizes: [640, 828, 1080, 1440, 1920],
    imageSizes: [96, 256, 384],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    // Photos managed from the admin panel live in the Supabase "media" bucket.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "olwahqhygjbvrhnnqzyg.supabase.co",
        pathname: "/storage/v1/object/public/media/**",
      },
    ],
  },
  turbopack: { root: path.resolve(__dirname) },
  // public/ is served from the CDN on Vercel and is not inside the server functions. These pages read
  // files from it at runtime (hero slides and videos, share images), so bundle exactly those files.
  outputFileTracingIncludes: {
    "/": ["./public/videos/**/*", "./public/images/hero/**/*"],
    "/*/opengraph-image": ["./public/images/hero/**/*", "./public/images/logo/**/*"],
    "/opengraph-image": ["./public/images/hero/**/*", "./public/images/logo/**/*"],
    "/rooms/[slug]/opengraph-image": [
      "./public/images/hero/**/*",
      "./public/images/logo/**/*",
      "./public/images/rooms/**/*",
    ],
  },
  async redirects() {
    // TODO: confirm the live domain; this sends the bare domain to www.
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "junglehillresort.co.in" }],
        destination: "https://www.junglehillresort.co.in/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      { source: "/images/:path*", headers: [{ key: "Cache-Control", value: IMMUTABLE }] },
      { source: "/videos/:path*", headers: [{ key: "Cache-Control", value: IMMUTABLE }] },
      { source: "/fonts/:path*", headers: [{ key: "Cache-Control", value: IMMUTABLE }] },
      { source: "/api/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
    ];
  },
};

export default nextConfig;
