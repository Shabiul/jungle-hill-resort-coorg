import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// TODO: design variants
const buttonVariants = cva("inline-flex items-center justify-center", {
  variants: {
    variant: { primary: "", secondary: "", ghost: "" },
    size: { sm: "", md: "", lg: "" },
  },
  defaultVariants: { variant: "primary", size: "md" },
});

export type ButtonProps = ComponentProps<"button"> & VariantProps<typeof buttonVariants>;

export function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { buttonVariants };
