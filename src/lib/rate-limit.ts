import "server-only";
import { redis } from "@/lib/cache";

const hits = new Map<string, number[]>();

/** In-memory fallback: per instance only, so on serverless it slows bursts rather than capping them. */
function localLimited(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (times.every((time) => now - time >= windowMs)) hits.delete(k);
    }
  }
  return false;
}

/**
 * True when `key` has used up `limit` requests in the current window. Uses a shared Redis counter
 * when configured (one count across all server instances), otherwise the in-memory fallback.
 */
export async function rateLimited(key: string, limit = 5, windowMs = 10 * 60 * 1000) {
  if (redis) {
    try {
      const redisKey = `rl:${key}`;
      const count = await redis.incr(redisKey);
      if (count === 1) await redis.pexpire(redisKey, windowMs);
      return count > limit;
    } catch (error) {
      console.error("Redis rate limit failed, using local counter", error);
    }
  }
  return localLimited(key, limit, windowMs);
}

export function clientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}
