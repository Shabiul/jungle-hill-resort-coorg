import { useId, type ComponentProps } from "react";
import { fieldBase } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

export type TextareaProps = ComponentProps<"textarea"> & {
  label?: string;
  error?: string;
};

export function Textarea({ label, error, className, id, ...props }: TextareaProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;

  return (
    <div>
      {label && (
        <label htmlFor={fieldId} className="label-mono field-label block text-night">
          {label}
        </label>
      )}
      <textarea
        id={fieldId}
        rows={4}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        className={cn(fieldBase, "field-control resize-y", className)}
        {...props}
      />
      {error && (
        <p
          id={`${fieldId}-error`}
          role="alert"
          className="field-error mt-1 text-sm font-medium text-night"
        >
          {error}
        </p>
      )}
    </div>
  );
}
