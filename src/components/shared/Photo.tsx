import Image from "next/image";
import { GradeTint } from "@/components/shared/GradeTint";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types";

interface PhotoProps {
  image: ImageAsset | null | undefined;
  sizes: string;
  className?: string;
  imgClassName?: string;
  /** Fill the parent (parent must be positioned) instead of using intrinsic size. */
  fill?: boolean;
  priority?: boolean;
}

/**
 * next/image wrapper with the blur placeholder from the manifest and the shared photo grade
 * (muted, slightly more contrast, cool slate tint), so every photograph sits in the same palette.
 */
export function Photo({
  image,
  sizes,
  className,
  imgClassName,
  fill = false,
  priority = false,
}: PhotoProps) {
  if (!image) return null;

  const common = {
    sizes,
    priority,
    placeholder: image.blurDataURL ? ("blur" as const) : ("empty" as const),
    blurDataURL: image.blurDataURL,
  };

  if (fill) {
    return (
      <>
        <Image
          src={image.src}
          fill
          alt={image.alt}
          className={cn("grade-filter object-cover", imgClassName, className)}
          {...common}
        />
        <GradeTint />
      </>
    );
  }

  return (
    <span className="relative block">
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className={cn("grade-filter h-auto w-full", imgClassName, className)}
        {...common}
      />
      <GradeTint />
    </span>
  );
}
