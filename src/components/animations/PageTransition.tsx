"use client";

import { useEffect, useState, type ReactNode } from "react";
import { m } from "motion/react";
import { easeOut } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** True until the first page has mounted in the browser; later mounts are client navigations. */
let firstPageLoad = true;

/**
 * Short fade on client navigations only. The first page is never hidden while it waits for
 * scripts (that made the whole page invisible on slow connections), so it paints immediately.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  // Evaluated on the server and during hydration while firstPageLoad is still true.
  const [fadeIn] = useState(() => !firstPageLoad);

  useEffect(() => {
    firstPageLoad = false;
  }, []);

  return (
    <m.div
      data-reveal
      initial={reduced || !fadeIn ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: easeOut }}
    >
      {children}
    </m.div>
  );
}
