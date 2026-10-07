import type { ReactNode } from "react";
import { RevealText } from "@/components/animations/RevealText";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  /** e.g. "01 / Rooms" */
  label: string;
  /** Headline lines, masked in one by one. Wrap emphasis words in <em>. */
  lines: ReactNode[];
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
      <p
        className={cn(
          "label-mono",
          tone === "dark" ? "text-forest-700" : "text-paper/75",
        )}
      >
        {label}
      </p>
      <RevealText
        as={as}
        lines={lines}
        className="mt-5 text-[clamp(2.5rem,6.5vw,5.5rem)] [&_em]:font-light [&_em]:italic"
      />
      {description && (
        <div
          className={cn(
            "mt-6 max-w-xl",
            tone === "dark" ? "text-forest-950/80" : "text-paper/80",
          )}
        >
          {description}
        </div>
      )}
    </div>
  );
}
