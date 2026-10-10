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

const SHOT_KINDS: [RegExp, string][] = [
  [/^bedroom/, "bedroom"],
  [/^bathroom/, "bathroom"],
  [/^balcony/, "balcony"],
  [/^exterior/, "exterior"],
  [/^seating/, "seating area"],
  [/^view/, "view from the balcony"],
  [/^entrance/, "entrance"],
  [/^coffee-kettle/, "coffee kettle and tray"],
];

/** Fallback alt text for a room photo that has no hand-written description. */
export function describeShot(file: string, roomName: string): string {
  const kind = SHOT_KINDS.find(([pattern]) => pattern.test(file))?.[1] ?? "photograph";
  return `${roomName}: ${kind}`;
}

/**
 * Hand-described photos first (in the given order), then every other photo found in the folder,
 * so a new file dropped into public/images shows up after `npm run images`.
 */
export function photosFromFolder(
  folder: string,
  curated: [file: string, alt: string][],
  fallbackAlt: (file: string) => string,
): ImageAsset[] {
  const prefix = `${folder}/`;
  const listed = new Set(curated.map(([file]) => file));
  const rest = Object.keys(imageManifest)
    .filter((key) => key.startsWith(prefix) && !listed.has(key.slice(prefix.length)))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((key) => photo(key, fallbackAlt(key.slice(prefix.length))));
  return [...photos(folder, curated), ...compact(rest)];
}
