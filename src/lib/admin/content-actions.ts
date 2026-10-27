"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/auth";
import { KEYS, invalidate } from "@/lib/cache";
import { GALLERY_CATEGORIES, type EditorItem } from "@/lib/admin/content-types";
import type { SaveState } from "@/lib/admin/actions";
import { photo } from "@/lib/images";
import { GALLERY_KEY, roomKey } from "@/lib/site-content";
import { createServiceClient } from "@/lib/supabase/server";
import { getRoomBySlug } from "@/data/rooms";
import type { GalleryCategory, GalleryImage, ImageAsset } from "@/types";

const FALLBACK_ALT = "Photograph at Jungle Hill Resort, Coorg";

/** Turns editor rows into stored ImageAssets, taking size and blur data from the media table. */
async function enrich(
  items: EditorItem[],
): Promise<(ImageAsset & { category?: string })[]> {
  const remote = items.map((item) => item.src).filter((src) => /^https:\/\//.test(src));
  const known = new Map<
    string,
    { width: number | null; height: number | null; blur: string | null }
  >();
  if (remote.length) {
    const { data, error } = await createServiceClient()
      .from("media")
      .select("url, width, height, blur")
      .in("url", remote);
    if (error) throw new Error(error.message);
    for (const row of data ?? []) known.set(row.url, row);
  }

  const out: (ImageAsset & { category?: string })[] = [];
  for (const item of items) {
    const alt = item.alt.trim().slice(0, 300) || FALLBACK_ALT;
    let asset: ImageAsset | null = null;
    if (/^https:\/\//.test(item.src)) {
      const row = known.get(item.src);
      if (row?.width && row.height) {
        asset = {
          src: item.src,
          alt,
          width: row.width,
          height: row.height,
          ...(row.blur ? { blurDataURL: row.blur } : {}),
        };
      }
    } else {
      asset = photo(item.src, alt);
    }
    if (asset)
      out.push({ ...asset, ...(item.category ? { category: item.category } : {}) });
  }
  return out;
}

/** Clears the shared cache first, then the pages, so regenerated pages read fresh data. */
async function refresh() {
  await invalidate(KEYS.content, KEYS.dashboard);
  revalidatePath("/", "layout");
}

export async function saveRoomContent(
  slug: string,
  priceInput: string,
  items: EditorItem[],
): Promise<SaveState> {
  await requireAdmin();
  if (!getRoomBySlug(slug)) return { error: "Unknown room." };

  const trimmed = priceInput.replace(/[,\s₹]/g, "");
  let price: number | null = null;
  if (trimmed !== "") {
    price = Number(trimmed);
    if (!Number.isInteger(price) || price <= 0 || price > 1_000_000) {
      return { error: "Enter the price as a whole number of rupees, for example 4500." };
    }
  }
  if (items.length === 0) return { error: "Keep at least one photo for the room." };

  const images = await enrich(items);
  if (images.length === 0) return { error: "None of the photos could be found." };

  const { error } = await createServiceClient()
    .from("site_content")
    .upsert({ key: roomKey(slug), value: { price, images } });
  if (error) return { error: "Could not save. Try again." };
  await refresh();
  return { ok: true };
}

export async function resetRoomContent(slug: string): Promise<SaveState> {
  await requireAdmin();
  const { error } = await createServiceClient()
    .from("site_content")
    .delete()
    .eq("key", roomKey(slug));
  if (error) return { error: "Could not reset. Try again." };
  await refresh();
  return { ok: true };
}

export async function saveGalleryContent(items: EditorItem[]): Promise<SaveState> {
  await requireAdmin();
  if (items.length === 0) return { error: "Keep at least one photo in the gallery." };

  const allowed: readonly string[] = GALLERY_CATEGORIES;
  const cleaned = items.map((item) => ({
    ...item,
    category:
      item.category && allowed.includes(item.category) ? item.category : "Grounds",
  }));
  const images = (await enrich(cleaned)) as GalleryImage[];
  images.forEach((image) => {
    image.category = image.category as GalleryCategory;
  });
  if (images.length === 0) return { error: "None of the photos could be found." };

  const { error } = await createServiceClient()
    .from("site_content")
    .upsert({ key: GALLERY_KEY, value: { images } });
  if (error) return { error: "Could not save. Try again." };
  await refresh();
  return { ok: true };
}

export async function resetGalleryContent(): Promise<SaveState> {
  await requireAdmin();
  const { error } = await createServiceClient()
    .from("site_content")
    .delete()
    .eq("key", GALLERY_KEY);
  if (error) return { error: "Could not reset. Try again." };
  await refresh();
  return { ok: true };
}

export async function updateMediaAlt(id: string, alt: string): Promise<SaveState> {
  await requireAdmin();
  const { error } = await createServiceClient()
    .from("media")
    .update({ alt: alt.trim().slice(0, 300) })
    .eq("id", id);
  if (error) return { error: "Could not save the description." };
  revalidatePath("/admin/media");
  return { ok: true };
}

export async function deleteMedia(id: string): Promise<SaveState> {
  await requireAdmin();
  const supabase = createServiceClient();
  const { data: file, error } = await supabase
    .from("media")
    .select("path, url")
    .eq("id", id)
    .maybeSingle();
  if (error || !file) return { error: "File not found." };

  // Refuse to delete a file the public site is still showing.
  const { data: content } = await supabase.from("site_content").select("key, value");
  const inUse = (content ?? []).some((row) =>
    JSON.stringify(row.value).includes(file.url),
  );
  if (inUse) {
    return {
      error: "This photo is used by a room or the gallery. Remove it there first.",
    };
  }

  await supabase.storage.from("media").remove([file.path]);
  const { error: deleteError } = await supabase.from("media").delete().eq("id", id);
  if (deleteError) return { error: "Could not delete. Try again." };
  revalidatePath("/admin/media");
  return { ok: true };
}
