import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site.config";
import { rooms } from "@/data/rooms";
import { STATIC_ROUTES } from "@/lib/constants";

// /booking duplicates /contact and is noindex, so it stays out of the sitemap.
const INDEXED = STATIC_ROUTES.filter((route) => route !== "/booking");

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const paths = [...INDEXED, ...rooms.map((room) => `/rooms/${room.slug}`)];

  return paths.map((path) => ({
    url: `${siteConfig.siteUrl}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/rooms") ? 0.8 : 0.6,
  }));
}
