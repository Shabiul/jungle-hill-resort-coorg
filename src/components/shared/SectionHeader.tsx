import type { ReactNode } from "react";
import { RevealText, type HeadingLine } from "@/components/animations/RevealText";
import { cn } from "@/lib/utils";
import { AccentMark } from "@/components/animations/AccentMark";

interface SectionHeaderProps {
  /** e.g. "01 / Rooms" */
  label: string;
  /** Headline lines, masked in one by one. Use `emphasis` for the italic brass word. */
  lines: HeadingLine[];
  description?: ReactNode;
  tone?: "light" | "dark";
  as?: "h1" | "h2";
  className?: string;
}

export function SectionHeader({
  label,
  lines,
  description,
  tone = "dark",
  as = "h2",
  className,
}: SectionHeaderProps) {
  const numeral = /^\d{2}/.exec(label)?.[0];
  return (
    <div className={cn("relative max-w-3xl", className)}>
      {numeral && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-8 -left-3 -z-10 font-display text-[7.5rem] leading-none text-olive/30 select-none"
        >
          {numeral}
        </span>
      )}
      <p
        className={cn("label-mono", tone === "dark" ? "text-body" : "text-body/80")}
      >
        {label}
      </p>
      <div className="mt-2 flex items-center gap-2">
        <AccentMark />
        <span aria-hidden="true" className="block h-1.5 w-1.5 bg-olive" />
      </div>
      <RevealText
        as={as}
        lines={lines}
        onDark={tone === "light"}
        className="mt-4 text-h2"
      />
      {description && (
        <div
          className={cn(
            "mt-4 max-w-xl",
            tone === "dark" ? "text-body/80" : "text-body/80",
          )}
        >
          {description}
        </div>
      )}
    </div>
  );
}
