import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { redis } from "@/lib/cache";
import { createServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

function authorised(request: Request) {
  const secret = process.env.KEEPALIVE_SECRET;
  const given = request.headers.get("x-keepalive") ?? "";
  if (!secret || given.length !== secret.length) return false;
  return timingSafeEqual(Buffer.from(given), Buffer.from(secret));
}

/**
 * Called every few days by .github/workflows/keepalive.yml. Free Supabase projects pause after about
 * a week without activity, and the cached public pages can go that long without touching the database.
 */
export async function GET(request: Request) {
  if (!authorised(request)) return new NextResponse(null, { status: 404 });

  const { error } = await createServiceClient()
    .from("site_content")
    .select("key")
    .limit(1);
  let redisOk: boolean | null = null;
  if (redis) {
    try {
      redisOk = (await redis.ping()) === "PONG";
    } catch {
      redisOk = false;
    }
  }
  return NextResponse.json({ ok: !error, supabase: !error, redis: redisOk });
}
