import type { NextConfig } from "next";
import path from "node:path";

const IMMUTABLE = "public, max-age=31536000, immutable";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  trailingSlash: false,
  images: {
    qualities: [60, 70, 75, 80],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },
  turbopack: { root: path.resolve(__dirname) },
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
