import type { ReactNode } from "react";
import { RevealText, type HeadingLine } from "@/components/animations/RevealText";
import { cn } from "@/lib/utils";

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
  return (
    <div className={cn("max-w-3xl", className)}>
      <p className={cn("label-mono", tone === "dark" ? "text-teal-deep" : "text-mist/80")}>
        {label}
      </p>
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
            tone === "dark" ? "text-ink/80" : "text-mist/80",
          )}
        >
          {description}
        </div>
      )}
    </div>
  );
}
