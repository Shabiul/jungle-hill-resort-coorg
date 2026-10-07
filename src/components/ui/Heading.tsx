import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type HeadingProps = ComponentProps<"h1"> & {
  level?: 1 | 2 | 3 | 4;
};

// TODO: type scale
export function Heading({ level = 2, className, ...props }: HeadingProps) {
  const Tag = `h${level}` as const;
  return <Tag className={cn(className)} {...props} />;
}
