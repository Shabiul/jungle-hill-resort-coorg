import "server-only";
import { rooms } from "@/data/rooms";
import { KEYS, TTL, cached } from "@/lib/cache";
import { createServiceClient } from "@/lib/supabase/server";
import { GALLERY_KEY, roomKey } from "@/lib/site-content";
import { STATUSES, type EnquiryStatus } from "./enquiries";

interface Row {
  created_at: string;
  status: EnquiryStatus;
  source: "wizard" | "contact";
  stay: string | null;
  occasion: string | null;
  check_in: string | null;
  check_out: string | null;
  adults: number | null;
  children: number | null;
  name: string;
  id: string;
  rooms: number | null;
}

const DAY = 24 * 60 * 60 * 1000;
const IST = { timeZone: "Asia/Kolkata" } as const;

/** yyyy-mm-dd in India time. */
function istDay(date: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    ...IST,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function tally<T extends string>(values: (T | null | undefined)[]) {
  const map = new Map<T, number>();
  for (const value of values) if (value) map.set(value, (map.get(value) ?? 0) + 1);
  return [...map.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);
}

export function getDashboard() {
  return cached(KEYS.dashboard, TTL.dashboard, computeDashboard);
}

async function computeDashboard() {
  const supabase = createServiceClient();
  const since = new Date(Date.now() - 365 * DAY).toISOString();

  const [enquiriesResult, mediaResult, contentResult] = await Promise.all([
    supabase
      .from("enquiries")
      .select(
        "id, name, created_at, status, source, stay, occasion, check_in, check_out, adults, children, rooms",
      )
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(5000),
    supabase.from("media").select("size_bytes, mime"),
    supabase.from("site_content").select("key, value"),
  ]);
  if (enquiriesResult.error) throw new Error(enquiriesResult.error.message);

  const data = (enquiriesResult.data ?? []) as Row[];
  const now = Date.now();
  const today = istDay(new Date(now));

  // Last 30 days, one bucket per day.
  const days = Array.from({ length: 30 }, (_, i) =>
    istDay(new Date(now - (29 - i) * DAY)),
  );
  const perDay = new Map(days.map((day) => [day, 0]));
  for (const row of data) {
    const day = istDay(new Date(row.created_at));
    if (perDay.has(day)) perDay.set(day, (perDay.get(day) ?? 0) + 1);
  }
  const daily = days.map((day) => ({ day, count: perDay.get(day) ?? 0 }));

  const inLast = (days_: number, offset = 0) =>
    data.filter((row) => {
      const age = now - new Date(row.created_at).getTime();
      return age >= offset * DAY && age < (offset + days_) * DAY;
    }).length;
  const last7 = inLast(7);
  const prev7 = inLast(7, 7);
  const last30 = inLast(30);

  const status = Object.fromEntries(STATUSES.map((s) => [s, 0])) as Record<
    EnquiryStatus,
    number
  >;
  for (const row of data) status[row.status] += 1;
  const genuine = data.length - status.spam;

  const needsAttention = data.filter(
    (row) => row.status === "new" && now - new Date(row.created_at).getTime() > DAY,
  ).length;

  const roomName = new Map(rooms.map((room) => [room.slug, room.categoryShort]));
  const stays = tally(
    data
      .filter((r) => r.status !== "spam")
      .map((row) =>
        row.stay === "any" ? "No preference" : (roomName.get(row.stay ?? "") ?? null),
      ),
  );
  const occasions = tally(
    data.filter((r) => r.status !== "spam").map((row) => row.occasion),
  );
  const sources = tally(
    data
      .filter((r) => r.status !== "spam")
      .map((row) => (row.source === "wizard" ? "Enquiry form" : "Contact form")),
  );

  // Which months guests want to visit (by requested check-in), from this month on.
  const monthFmt = new Intl.DateTimeFormat("en-IN", { month: "short", year: "2-digit" });
  const [y, m] = today.split("-").map(Number) as [number, number];
  const months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(Date.UTC(y, m - 1 + i, 1));
    return { key: d.toISOString().slice(0, 7), label: monthFmt.format(d), count: 0 };
  });
  for (const row of data) {
    if (row.status === "spam" || !row.check_in) continue;
    const bucket = months.find((month) => row.check_in!.startsWith(month.key));
    if (bucket) bucket.count += 1;
  }

  const upcoming = data
    .filter(
      (row) =>
        row.check_in &&
        row.check_in >= today &&
        row.status !== "spam" &&
        row.status !== "closed",
    )
    .sort((a, b) => a.check_in!.localeCompare(b.check_in!))
    .slice(0, 6);

  const nights = data
    .filter((row) => row.check_in && row.check_out && row.status !== "spam")
    .map(
      (row) =>
        (new Date(row.check_out!).getTime() - new Date(row.check_in!).getTime()) / DAY,
    )
    .filter((value) => value > 0 && value < 60);
  const avgNights = nights.length
    ? nights.reduce((a, b) => a + b, 0) / nights.length
    : null;

  const party = data.filter((r) => r.adults != null && r.status !== "spam");
  const avgGuests = party.length
    ? party.reduce((sum, r) => sum + (r.adults ?? 0) + (r.children ?? 0), 0) /
      party.length
    : null;

  const mediaRows = mediaResult.data ?? [];
  const contentKeys = new Set((contentResult.data ?? []).map((row) => row.key as string));
  const pricedRooms = (contentResult.data ?? []).filter(
    (row) =>
      String(row.key).startsWith("room:") &&
      typeof (row.value as { price?: unknown })?.price === "number",
  ).length;

  return {
    total: data.length,
    last7,
    prev7,
    last30,
    status,
    genuine,
    confirmRate: genuine ? status.confirmed / genuine : null,
    needsAttention,
    daily,
    stays,
    occasions,
    sources,
    months,
    upcoming,
    avgNights,
    avgGuests,
    assets: {
      count: mediaRows.length,
      bytes: mediaRows.reduce((sum, row) => sum + (row.size_bytes ?? 0), 0),
      images: mediaRows.filter((row) => String(row.mime).startsWith("image/")).length,
      pricedRooms,
      totalRooms: rooms.length,
      customRooms: rooms.filter((room) => contentKeys.has(roomKey(room.slug))).length,
      customGallery: contentKeys.has(GALLERY_KEY),
    },
  };
}
