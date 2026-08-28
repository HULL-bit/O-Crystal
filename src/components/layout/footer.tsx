import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { footerNav, legalNav, socialLinks } from "@/config/nav";
import { ConsentLink } from "@/components/consent/consent-link";
import { BrandMark } from "@/components/brand/BrandMark";
import { LocaleSwitcher } from "./locale-switcher";
import { NewsletterForm } from "@/components/forms/newsletter-form";

export function Footer() {
  const t = useTranslations("nav");
  const tf = useTranslations("footer");
  const tn = useTranslations("home.newsletter");
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[var(--color-border)] bg-[var(--color-royal-deep)]">
      <hr className="hairline" />
      <div className="container-page grid gap-12 py-16 md:py-20 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-xs">
          <div className="flex items-center gap-3">
            <BrandMark className="h-10 w-auto" />
            <span className="font-[family-name:var(--font-display)] text-lg tracking-[0.14em] text-[var(--color-platine-bright)]">
              O<span className="text-[var(--color-cristal)]">&apos;</span>Crystal
            </span>
          </div>
          <p className="mt-4 text-sm text-[var(--color-muted)]">{tf("tagline")}</p>
          <p className="mt-6 text-xs text-[var(--color-muted)]">{tf("address")}</p>
        </div>

        {footerNav.map((col) => (
          <nav key={col.headingKey} aria-label={t(col.headingKey)}>
            <h2 className="text-xs font-medium tracking-[0.2em] text-[var(--color-platine)] uppercase">
              {t(col.headingKey)}
            </h2>
            <ul className="mt-4 space-y-3">
              {col.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--color-muted)] transition-colors hover:text-white"
                  >
                    {t(item.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="container-page grid gap-10 border-t border-[var(--color-border)] py-12 lg:grid-cols-2">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-xl">{tn("title")}</h2>
          <p className="mt-2 max-w-sm text-sm text-[var(--color-muted)]">{tn("text")}</p>
          <NewsletterForm className="mt-5 max-w-sm" />
        </div>
        <div className="lg:justify-self-end">
          <h2 className="text-xs font-medium tracking-[0.2em] text-[var(--color-platine)] uppercase">
            {tf("social")}
          </h2>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {socialLinks.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="text-sm text-[var(--color-muted)] transition-colors hover:text-white"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-page flex flex-col gap-4 border-t border-[var(--color-border)] py-8 text-xs text-[var(--color-muted)] md:flex-row md:items-center md:justify-between">
        <p>
          © {year} Cristal Waters SARL. {tf("rights")}
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {legalNav.map((item) => (
            <li key={item.href}>
              {item.labelKey === "cookies" ? (
                <ConsentLink>{tf(item.labelKey)}</ConsentLink>
              ) : (
                <Link href={item.href} className="transition-colors hover:text-white">
                  {tf(item.labelKey)}
                </Link>
              )}
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <span className="sr-only">{tf("language")}</span>
          <LocaleSwitcher />
        </div>
      </div>
      <p className="container-page pb-8 text-2xs text-[var(--color-muted)]/70">
        {tf("madeWith")}
      </p>
    </footer>
  );
}
