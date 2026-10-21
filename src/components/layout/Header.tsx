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
  // Only the home hero photo sits under a transparent header with light text; every other state is light glass with ink text.
  const light = overHero;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,box-shadow] duration-300",
        scrolled
          ? "glass border-0 bg-mist/70 text-ink shadow-[0_8px_24px_-18px_rgba(46,81,86,0.35)] backdrop-blur-xl"
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
                    prefetch={false}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "label-mono py-2 transition-colors",
                      light
                        ? "text-mist/80 hover:text-aqua"
                        : "text-ink/85 hover:text-teal-deep",
                      active && (light ? "text-aqua" : "text-teal-deep"),
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
          <Link
            href={bookingNav.href}
            prefetch={false}
            className="btn btn-primary hidden sm:inline-flex"
          >
            {bookingNav.label}
          </Link>
          <MobileMenu items={mainNav} light={light} />
        </div>
      </div>
    </header>
  );
}
