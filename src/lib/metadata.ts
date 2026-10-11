import type { Metadata } from "next";
import { siteConfig } from "@/config/site.config";

interface BuildMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  /** Absolute or root-relative image. Omit to use the route's opengraph-image file. */
  image?: string;
  noIndex?: boolean;
}

/** Reusable page metadata. Titles are wrapped by the root layout's title template. */
export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  image,
  noIndex = false,
}: BuildMetadataOptions = {}): Metadata {
  const images = image ? [{ url: image }] : undefined;
  const shownTitle = title ?? siteConfig.name;
  return {
    title,
    description: description || undefined,
    alternates: { canonical: path },
    openGraph: {
      title: shownTitle,
      description: description || undefined,
      url: path,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: shownTitle,
      description: description || undefined,
      ...(images ? { images } : {}),
    },
    robots: noIndex
      ? { index: false, follow: true }
      : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  };
}
