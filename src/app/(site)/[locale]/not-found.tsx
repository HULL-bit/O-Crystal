import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { BrandMark } from "@/components/brand/BrandMark";
import { Aurora } from "@/components/backgrounds/aurora";
import { Bubbles } from "@/components/backgrounds/bubbles";
import { LostDrop } from "@/components/motion/lost-drop";

/**
 * 404 créative — « une goutte s'est perdue ». La goutte suit le curseur
 * (easter egg discret). Repli statique en reduced-motion.
 */
export default async function NotFound() {
  const t = await getTranslations("notFound");
  const tA = await getTranslations("actions");

  return (
    <section className="relative isolate grid min-h-[100svh] place-items-center overflow-hidden px-6 text-center">
      <Aurora />
      <Bubbles count={12} />
      <LostDrop />
      <div className="relative z-10 max-w-md">
        <BrandMark className="mx-auto h-16 w-auto opacity-80" />
        <p className="mt-8 font-[family-name:var(--font-display)] text-6xl text-shimmer">
          {t("code")}
        </p>
        <h1 className="mt-4 text-2xl">{t("title")}</h1>
        <p className="mt-3 text-[var(--color-muted)]">{t("text")}</p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-[image:var(--gradient-eau)] px-6 py-3 text-sm font-medium text-white"
        >
          {t("cta")}
        </Link>
        <span className="sr-only">{tA("back")}</span>
      </div>
    </section>
  );
}
