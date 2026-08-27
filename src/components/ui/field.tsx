import { forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

const baseField =
  "w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white/[0.03] px-4 py-3 text-[var(--color-foreground)] placeholder:text-[var(--color-muted)]/60 transition-colors duration-[var(--duration-fast)] focus:border-[var(--color-cristal)] focus:bg-white/[0.05] focus-visible:outline-none";

type FieldChildProps = {
  id: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
  "aria-required"?: boolean;
};

type FieldWrapProps = {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: (props: FieldChildProps) => React.ReactNode;
};

/** Groupe champ + label + aide + erreur (a11y : label lié, aria-describedby). */
export function Field({ label, hint, error, required, children }: FieldWrapProps) {
  const id = useId();
  const describedBy =
    [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-[var(--color-foreground)]">
        {label}
        {required && <span className="ml-1 text-[var(--color-cristal-light)]">*</span>}
      </label>
      {children({
        id,
        "aria-describedby": describedBy,
        "aria-invalid": error ? true : undefined,
        "aria-required": required || undefined,
      })}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-[var(--color-muted)]">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-xs text-[#ff9d9d]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export const Input = forwardRef<HTMLInputElement, React.ComponentPropsWithoutRef<"input">>(
  function Input({ className, ...props }, ref) {
    return <input ref={ref} className={cn(baseField, className)} {...props} />;
  },
);

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.ComponentPropsWithoutRef<"textarea">
>(function Textarea({ className, ...props }, ref) {
  return (
    <textarea ref={ref} className={cn(baseField, "min-h-32 resize-y", className)} {...props} />
  );
});
