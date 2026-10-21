import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type SectionProps = ComponentProps<"section"> & {
  tone?: "ivory" | "linen" | "forest" | "ink";
};

const tones = {
  ivory: "bg-mist text-ink",
  linen: "bg-mist-deep text-ink",
  forest: "dark-surface bg-night-teal text-mist",
  ink: "dark-surface bg-night-teal text-mist",
} as const;

/** Page section with the shared vertical padding token and a background tone. */
export function Section({ tone = "ivory", className, ...props }: SectionProps) {
  return <section className={cn("section-space", tones[tone], className)} {...props} />;
}
