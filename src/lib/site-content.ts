import "server-only";
import { cache } from "react";
import { gallery as staticGallery } from "@/data/gallery";
import { getRoomBySlug, rooms as staticRooms } from "@/data/rooms";
import { KEYS, TTL, cached } from "@/lib/cache";
import { createServiceClient } from "@/lib/supabase/server";
import type { GalleryCategory, GalleryImage, ImageAsset, Room } from "@/types";

/** Shapes stored in the site_content table (edited from the admin panel). */
export interface RoomContent {
  /** Price per night in INR; null or missing means "enquire for rates". */
  price?: number | null;
  /** When present, replaces the room's photo list. */
  images?: ImageAsset[];
}

export interface GalleryContent {
  images: GalleryImage[];
}

export const roomKey = (slug: string) => `room:${slug}`;
export const GALLERY_KEY = "gallery";

export function formatPrice(price: number) {
  return `From ₹${price.toLocaleString("en-IN")} per night`;
}

async function loadAllContent(): Promise<Record<string, unknown>> {
  const { data, error } = await createServiceClient()
    .from("site_content")
    .select("key, value");
  if (error) throw error;
  return Object.fromEntries(
    (data ?? []).map((row) => [row.key as string, row.value as unknown]),
  );
}

/** One cached read per render (React cache), shared across servers by Redis when configured. */
const allContent = cache(() => cached(KEYS.content, TTL.content, loadAllContent));

/**
 * Overrides from the cache or Supabase. Any failure (missing env, network, table not created yet)
 * returns an empty map so the public site always falls back to the built-in content.
 */
async function readContent(keys?: string[]) {
  try {
    const all = await allContent();
    const wanted = keys
      ? Object.entries(all).filter(([key]) => keys.includes(key))
      : Object.entries(all);
    return new Map(wanted);
  } catch (error) {
    // Failures are not cached, so the next request retries.
    console.error("site_content unavailable, using built-in content", error);
    return new Map<string, unknown>();
  }
}

export function applyRoomContent(room: Room, content: RoomContent | undefined): Room {
  if (!content) return room;
  const price =
    typeof content.price === "number" && content.price > 0 ? content.price : null;
  const images = content.images?.length ? content.images : room.images;
  return {
    ...room,
    images,
    price,
    rateNote: price ? formatPrice(price) : room.rateNote,
  };
}

export async function getRooms(): Promise<Room[]> {
  const content = await readContent(staticRooms.map((room) => roomKey(room.slug)));
  return staticRooms.map((room) =>
    applyRoomContent(room, content.get(roomKey(room.slug)) as RoomContent | undefined),
  );
}

export async function getRoom(slug: string): Promise<Room | undefined> {
  const base = getRoomBySlug(slug);
  if (!base) return undefined;
  const content = await readContent([roomKey(slug)]);
  return applyRoomContent(base, content.get(roomKey(slug)) as RoomContent | undefined);
}

export async function getGallery(): Promise<GalleryImage[]> {
  const content = await readContent([GALLERY_KEY]);
  const stored = content.get(GALLERY_KEY) as GalleryContent | undefined;
  return stored?.images?.length ? stored.images : staticGallery;
}

export type { GalleryCategory };
