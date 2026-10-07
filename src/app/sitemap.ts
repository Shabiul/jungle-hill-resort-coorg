import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site.config";
import { rooms } from "@/data/rooms";
import { STATIC_ROUTES } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...STATIC_ROUTES, ...rooms.map((room) => `/rooms/${room.slug}`)];

  return paths.map((path) => ({
    url: `${siteConfig.url}${path === "/" ? "" : path}`,
    lastModified: new Date(),
  }));
}
