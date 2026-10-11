"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Logo } from "@/components/shared/Logo";
import { bookingNav, headerNav, mainNav, xlOnlyHrefs } from "@/data/navigation";
import { useScrolledPast } from "@/hooks/useScrollPosition";
import { cn } from "@/lib/utils";

/**
 * Transparent over the hero on the home page, then glass once the page scrolls.
 * On inner pages the bar starts transparent over the ivory background with dark text.
 */
export function Header() {
  const pathname = usePathname();
  const scrolled = useScrolledPast(24);
  const overHero = pathname === "/" && !scrolled;
  // The home hero and the dark guest notes page both sit under a transparent header.
  const light = pathname === "/" || pathname === "/testimonials" || scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,box-shadow] duration-300",
        scrolled
          ? "glass border-0 bg-night/80 shadow-[0_10px_30px_-14px_rgba(13,19,25,0.55)]"
          : "shadow-none",
        light && "dark-surface",
      )}
    >
      <div
        className={cn(
          "page-container grid grid-cols-[auto_1fr_auto] items-center gap-6 transition-[height] duration-300",
          scrolled ? "h-16" : "h-20",
        )}
      >
        <Logo
          variant={light ? "light" : "dark"}
          className={cn(
            "transition-[height] duration-300",
            scrolled ? "h-14" : "h-[4.5rem]",
          )}
        />

        <nav aria-label="Main" className="hidden justify-self-center xl:block">
          <ul className="flex items-center gap-6 xl:gap-8">
            {headerNav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li
                  key={item.href}
                  className={
                    xlOnlyHrefs.includes(item.href) ? "hidden xl:block" : undefined
                  }
                >
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "label-mono py-2 transition-colors",
                      light
                        ? "text-pearl/90 hover:text-champagne-soft"
                        : "text-night/85 hover:text-steel",
                      active && (light ? "text-champagne-soft" : "text-steel"),
                      overHero && "drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)]",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="col-start-3 flex items-center gap-3 justify-self-end">
          <Link href={bookingNav.href} className="btn btn-primary hidden sm:inline-flex">
            {bookingNav.label}
          </Link>
          <MobileMenu items={mainNav} light={light} />
        </div>
      </div>
    </header>
  );
}
