import { useId, type ComponentProps } from "react";
import { fieldBase } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

export type SelectProps = ComponentProps<"select"> & {
  label?: string;
  error?: string;
};

export function Select({ label, error, className, id, children, ...props }: SelectProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;

  return (
    <div>
      {label && (
        <label htmlFor={fieldId} className="label-mono block text-ink">
          {label}
        </label>
      )}
      <select
        id={fieldId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        className={cn(fieldBase, className)}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p
          id={`${fieldId}-error`}
          role="alert"
          className="mt-1 text-sm font-medium text-ink"
        >
          {error}
        </p>
      )}
    </div>
  );
}
