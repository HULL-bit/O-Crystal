import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const TONE: Record<string, string> = {
  submitted: "border-[color-mix(in_oklab,var(--color-cristal)_45%,transparent)] text-[var(--color-cristal-light)]",
  confirmed: "border-[color-mix(in_oklab,var(--color-cristal)_45%,transparent)] text-[var(--color-cristal-light)]",
  preparing: "border-[color-mix(in_oklab,var(--color-or)_55%,transparent)] text-[var(--color-or)]",
  shipped: "border-[color-mix(in_oklab,var(--color-or)_55%,transparent)] text-[var(--color-or)]",
  delivered: "border-[color-mix(in_oklab,#4ade80_45%,transparent)] text-[#7ee2a8]",
  cancelled: "border-[color-mix(in_oklab,#ff9d9d_45%,transparent)] text-[#ff9d9d]",
};

export function OrderStatus({ status }: { status: string }) {
  const t = useTranslations("pro.orderStatus");
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-3 py-1 text-2xs tracking-wide uppercase",
        TONE[status] ?? TONE.submitted,
      )}
    >
      {t(status)}
    </span>
  );
}
