import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "dark" | "light";
  layout?: "inline" | "stacked";
  showTagline?: boolean;
  className?: string;
  /** Render without a link (e.g. inside the footer wordmark). */
  asLink?: boolean;
}

function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 40" className={className} aria-hidden="true" fill="currentColor">
      <path d="M0 40 L22 5 L31 19 L38 10 L64 40 Z" />
      <path d="M22 5 L31 19 L26 40 L18 40 Z" fillOpacity="0.28" />
    </svg>
  );
}

/**
 * Recreated from the resort logo: forest-green peak, bold serif wordmark, a rule and the tagline.
 * TODO: swap for the real logo file if one is added to /public.
 */
export function Logo({
  variant = "dark",
  layout = "inline",
  showTagline = true,
  className,
  asLink = true,
}: LogoProps) {
  const color = variant === "dark" ? "text-forest-900" : "text-paper";
  const stacked = layout === "stacked";

  const content = (
    <span
      className={cn(
        "inline-flex",
        stacked ? "flex-col items-center gap-2" : "items-center gap-3",
        color,
        className,
      )}
    >
      <Mark className={stacked ? "h-10 w-16" : "h-7 w-11"} />
      <span className={cn("flex flex-col", stacked ? "items-center" : "items-start")}>
        <span
          className={cn(
            "font-display leading-none font-bold tracking-[0.08em]",
            stacked ? "text-3xl" : "text-xl",
          )}
        >
          JUNGLE HILL
        </span>
        {showTagline && (
          <>
            <span
              aria-hidden="true"
              className="mt-1.5 block h-px w-full bg-current opacity-60"
            />
            <span className="label-mono mt-1.5 text-[0.62rem] tracking-[0.22em]">
              {siteConfig.tagline}
            </span>
          </>
        )}
      </span>
    </span>
  );

  if (!asLink) return content;

  return (
    <Link href="/" aria-label={`${siteConfig.name}, home`} className="inline-block">
      {content}
    </Link>
  );
}
