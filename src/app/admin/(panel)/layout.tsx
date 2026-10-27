import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { logout } from "@/lib/admin/actions";
import { requireAdmin } from "@/lib/admin/auth";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Admin" },
  robots: { index: false, follow: false },
};

export default async function PanelLayout({ children }: { children: ReactNode }) {
  const admin = await requireAdmin();
  return (
    <div className="min-h-dvh bg-surface">
      <header className="border-b border-line bg-card">
        <div className="mx-auto flex max-w-[var(--container-page)] flex-wrap items-center gap-x-6 gap-y-2 px-[var(--spacing-gutter)] py-3">
          <Link href="/admin" className="font-display text-h4 leading-none">
            Jungle Hill admin
          </Link>
          <nav className="flex flex-wrap gap-x-4 gap-y-1 text-small" aria-label="Admin">
            <Link href="/admin" className="underline-offset-4 hover:underline">
              Dashboard
            </Link>
            <Link href="/admin/enquiries" className="underline-offset-4 hover:underline">
              Enquiries
            </Link>
            <Link href="/admin/rooms" className="underline-offset-4 hover:underline">
              Rooms and prices
            </Link>
            <Link href="/admin/gallery" className="underline-offset-4 hover:underline">
              Gallery
            </Link>
            <Link href="/admin/media" className="underline-offset-4 hover:underline">
              Media
            </Link>
            <Link href="/" target="_blank" className="underline-offset-4 hover:underline">
              View site
            </Link>
          </nav>
          <form action={logout} className="ml-auto flex items-center gap-3 text-small">
            <span className="hidden sm:inline">{admin.email}</span>
            <button type="submit" className="min-h-11 rounded-[6px] border border-line px-3">
              Sign out
            </button>
          </form>
        </div>
      </header>
      <div className="mx-auto max-w-[var(--container-page)] px-[var(--spacing-gutter)] py-8">
        {children}
      </div>
    </div>
  );
}
