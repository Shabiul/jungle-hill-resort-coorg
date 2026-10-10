import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type SectionProps = ComponentProps<"section"> & {
  tone?: "ivory" | "linen" | "forest" | "ink";
};

const tones = {
  ivory: "bg-ivory text-ink",
  linen: "bg-linen text-ink",
  forest: "dark-surface bg-forest text-ivory",
  ink: "dark-surface bg-ink text-ivory",
} as const;

/** Page section with the shared vertical padding token and a background tone. */
export function Section({ tone = "ivory", className, ...props }: SectionProps) {
  return <section className={cn("section-space", tones[tone], className)} {...props} />;
}
