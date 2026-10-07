import Image from "next/image";
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

/** next/image wrapper: blur placeholder from the manifest and hard-edged crops by default. */
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
    quality: 78,
  };

  if (fill) {
    return (
      <Image
        src={image.src}
        fill
        alt={image.alt}
        className={cn("object-cover", imgClassName, className)}
        {...common}
      />
    );
  }

  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      className={cn("h-auto w-full", imgClassName, className)}
      {...common}
    />
  );
}
