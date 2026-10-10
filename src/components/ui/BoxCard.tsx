import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Bordered box: 1px brass at 30%, dark fill, 2px radius at most. */
export function BoxCard({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "dark-surface rounded-[2px] border border-brass/30 bg-forest text-ivory",
        className,
      )}
      {...props}
    />
  );
}
