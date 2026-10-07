import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

// TODO: design
export function Badge({ className, ...props }: ComponentProps<"span">) {
  return <span className={cn(className)} {...props} />;
}
