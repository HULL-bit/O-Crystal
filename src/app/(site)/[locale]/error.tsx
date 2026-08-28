"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { BrandMark } from "@/components/brand/BrandMark";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");

  useEffect(() => {
    // TODO (étape 6) : brancher Sentry ici.
    console.error(error);
  }, [error]);

  return (
    <section className="grid min-h-[70svh] place-items-center px-6 text-center">
      <div className="max-w-md">
        <BrandMark className="mx-auto h-14 w-auto opacity-70" />
        <h1 className="mt-8 text-2xl">{t("title")}</h1>
        <p className="mt-3 text-[var(--color-muted)]">{t("text")}</p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 inline-flex rounded-full bg-[image:var(--gradient-eau)] px-6 py-3 text-sm font-medium text-white"
        >
          {t("retry")}
        </button>
      </div>
    </section>
  );
}
