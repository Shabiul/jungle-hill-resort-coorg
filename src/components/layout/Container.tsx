import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

// TODO: max-width and gutters
export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full", className)} {...props} />;
}
