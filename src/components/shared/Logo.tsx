import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** "dark" for ivory backgrounds, "light" for dark backgrounds. */
  variant?: "dark" | "light";
  className?: string;
  /** Render without a link (e.g. in the footer next to other links). */
  asLink?: boolean;
  priority?: boolean;
}

const SOURCES = {
  dark: "/images/logo/jungle-hill-logo-dark.png",
  light: "/images/logo/jungle-hill-logo-light.png",
} as const;

/**
 * The real Jungle Hill logo (peak, wordmark, rule and tagline), as transparent PNGs made from the
 * supplied artwork. Size it by height; width follows the 982:642 ratio so it is never stretched.
 */
export function Logo({
  variant = "dark",
  className,
  asLink = true,
  priority = false,
}: LogoProps) {
  const image = (
    <Image
      src={SOURCES[variant]}
      alt={`${siteConfig.shortName}, ${siteConfig.tagline}`}
      width={982}
      height={642}
      priority={priority}
      sizes="160px"
      className={cn("h-14 w-auto", className)}
    />
  );

  if (!asLink) return image;

  return (
    <Link href="/" aria-label={`${siteConfig.name}, home`} className="inline-block">
      {image}
    </Link>
  );
}
