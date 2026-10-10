import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** The one small-label style: 11-12px uppercase with wide tracking, e.g. "01 — Stays". */
export function Label({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("label-mono", className)} {...props} />;
}
