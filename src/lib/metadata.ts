import type { Metadata } from "next";
import { siteConfig } from "@/config/site.config";

interface BuildMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
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
  return {
    title,
    description: description || undefined,
    alternates: { canonical: path },
    openGraph: {
      title: title ?? siteConfig.name,
      description: description || undefined,
      url: path,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: image ? [{ url: image }] : undefined, // TODO: default og image in public/images/og
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}
