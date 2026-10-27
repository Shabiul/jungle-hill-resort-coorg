"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { MotionProvider } from "@/components/animations/MotionProvider";
import { SmoothScroll } from "@/components/animations/SmoothScroll";

interface SiteChromeProps {
  intro: ReactNode;
  header: ReactNode;
  footer: ReactNode;
  floating: ReactNode;
  children: ReactNode;
}

/** Public-site shell (intro, header, footer, smooth scroll). The admin panel renders bare. */
export function SiteChrome({ intro, header, footer, floating, children }: SiteChromeProps) {
  const pathname = usePathname();
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return <main id="main">{children}</main>;
  }
  return (
    <MotionProvider>
      <SmoothScroll>
        {intro}
        {header}
        <main id="main">{children}</main>
        {footer}
        {floating}
      </SmoothScroll>
    </MotionProvider>
  );
}
