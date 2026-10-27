import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/** Refreshes the Supabase session and sends signed-out visitors from /admin to the login page. */
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.SUPABASE_URL ?? "",
    process.env.SUPABASE_PUBLISHABLE_KEY ?? "",
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll(list) {
          list.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          list.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && request.nextUrl.pathname !== "/admin/login") {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  return response;
}

export const config = { matcher: ["/admin/:path*"] };
