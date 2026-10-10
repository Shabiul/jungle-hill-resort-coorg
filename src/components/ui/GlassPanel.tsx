import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Glassmorphism, reserved for: scrolled navbar, hero booking bar, mobile menu, room quick facts, lightbox caption. */
export function GlassPanel({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("glass", className)} {...props} />;
}
