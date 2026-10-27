/** Client-safe shapes shared by the admin image editors and their server actions. */
export interface EditorItem {
  /** Public URL (Supabase) or a /images/... path that ships with the site. */
  src: string;
  alt: string;
  /** Gallery only. */
  category?: string;
}

export interface LibraryItem {
  id: string;
  url: string;
  alt: string;
  folder: string;
  mime: string;
  width: number | null;
  height: number | null;
  size_bytes: number | null;
}

export const GALLERY_CATEGORIES = [
  "Reception",
  "Rooms",
  "Pool",
  "Dining",
  "Kids Park",
  "Games",
  "Grounds",
] as const;

export function formatBytes(bytes: number | null) {
  if (!bytes) return "-";
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
