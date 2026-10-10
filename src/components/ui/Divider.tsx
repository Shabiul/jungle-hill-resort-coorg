import { cn } from "@/lib/utils";

/** 1px hairline in the current text colour at low opacity. */
export function Divider({ className }: { className?: string }) {
  return (
    <hr aria-hidden="true" className={cn("hairline border-0 border-t", className)} />
  );
}
