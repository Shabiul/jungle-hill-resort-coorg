import { imageManifest } from "@/data/generated/image-manifest";
import type { ImageAsset } from "@/types";

/**
 * Builds an ImageAsset from the generated manifest (run `npm run images` after adding photos).
 * Returns null when the file is not in public/, so missing photos drop out instead of breaking pages.
 */
export function photo(src: string, alt: string): ImageAsset | null {
  const entry = imageManifest[src];
  if (!entry) return null;
  return { src, alt, width: entry.width, height: entry.height, blurDataURL: entry.blur };
}

export function compact<T>(items: (T | null | undefined)[]): T[] {
  return items.filter((item): item is T => item != null);
}

export function photos(
  folder: string,
  items: [file: string, alt: string][],
): ImageAsset[] {
  return compact(items.map(([file, alt]) => photo(`${folder}/${file}`, alt)));
}
