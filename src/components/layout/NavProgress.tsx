"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Thin brass bar shown from the moment an internal link is clicked until the new route renders,
 * so a slow first compile or load never looks like a dead click. Decorative and pointer-events-none.
 */
export function NavProgress() {
  const pathname = usePathname();
  const [pending, setPending] = useState<string | null>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey)
        return;
      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download"))
        return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return;
      setPending(url.pathname);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const active = pending !== null && pending !== pathname;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[110] h-0.5"
    >
      <div
        className="h-full origin-left bg-teal"
        style={{
          transform: active ? "scaleX(0.85)" : "scaleX(0)",
          opacity: active ? 1 : 0,
          transition: active
            ? "transform 8s cubic-bezier(0.1, 0.6, 0.2, 1), opacity 0.2s"
            : "opacity 0.3s",
        }}
      />
    </div>
  );
}
