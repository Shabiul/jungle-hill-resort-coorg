import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type SectionProps = ComponentProps<"section"> & {
  tone?: "ivory" | "linen" | "forest" | "ink";
};

const tones = {
  ivory: "bg-pearl text-night",
  linen: "bg-vapour text-night",
  forest: "dark-surface bg-slate text-pearl",
  ink: "dark-surface bg-night text-pearl",
} as const;

/** Page section with the shared vertical padding token and a background tone. */
export function Section({ tone = "ivory", className, ...props }: SectionProps) {
  return <section className={cn("section-space", tones[tone], className)} {...props} />;
}
