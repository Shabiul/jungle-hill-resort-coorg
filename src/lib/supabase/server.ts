import "server-only";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

function env(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable ${name}`);
  return value;
}

/** Cookie-backed client that acts as the signed-in user. Used only to read the admin session. */
export async function createSessionClient() {
  const store = await cookies();
  return createServerClient(env("SUPABASE_URL"), env("SUPABASE_PUBLISHABLE_KEY"), {
    cookies: {
      getAll: () => store.getAll(),
      setAll(list) {
        try {
          list.forEach(({ name, value, options }) => store.set(name, value, options));
        } catch {
          // Called from a Server Component: the proxy refreshes the session instead.
        }
      },
    },
  });
}

/** Full-access client. Server only; callers must have verified the admin first. */
export function createServiceClient() {
  return createClient(env("SUPABASE_URL"), env("SUPABASE_SECRET_KEY"), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
