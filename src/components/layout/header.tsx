"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { primaryNav } from "@/config/nav";
import { cn } from "@/lib/utils";
import { duration, ease } from "@/lib/motion";
import { Logo } from "./logo";
import { LocaleSwitcher } from "./locale-switcher";
import { Button } from "@/components/ui/button";
import { BrandMark } from "@/components/brand/BrandMark";

export function Header() {
  const t = useTranslations("nav");
  const tA = useTranslations("actions");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:pt-4">
      <div
        data-scrolled={scrolled}
        className={cn(
          "oc-navbar pointer-events-auto flex w-full max-w-[87rem] items-center justify-between gap-1 rounded-full px-2.5 sm:px-3",
          scrolled ? "py-1.5" : "py-2.5",
        )}
      >
        <Logo />

        {/* Nav desktop */}
        <nav
          className="hidden shrink items-center lg:flex xl:gap-0.5"
          onMouseLeave={() => setOpenMenu(null)}
        >
          {primaryNav.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setOpenMenu(item.children ? item.href : null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "relative block rounded-full px-2.5 py-2 text-[0.82rem] whitespace-nowrap transition-colors xl:px-3",
                    isActive
                      ? "text-white"
                      : "text-[var(--color-platine)] hover:text-white",
                  )}
                  aria-current={isActive ? "page" : undefined}
                  onFocus={() => setOpenMenu(item.children ? item.href : null)}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      aria-hidden
                      className="absolute inset-0 rounded-full border border-[color-mix(in_oklab,var(--color-argent)_45%,transparent)] bg-[color-mix(in_oklab,var(--color-argent-bright)_18%,transparent)]"
                      transition={{ duration: duration.base, ease: ease.eau }}
                    />
                  )}
                  <span className="relative">{t(item.shortKey ?? item.labelKey)}</span>
                </Link>

                <AnimatePresence>
                  {item.children && openMenu === item.href && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: duration.base, ease: ease.eau }}
                      className="oc-navbar absolute left-1/2 top-full mt-3 w-[26rem] -translate-x-1/2 rounded-[var(--radius-lg)] bg-[color-mix(in_oklab,var(--color-royal-abysse)_94%,transparent)] p-3"
                    >
                      <div className="grid grid-cols-2 gap-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="flex items-center gap-3 rounded-full px-3 py-2.5 text-sm text-[var(--color-muted)] transition-colors hover:bg-[color-mix(in_oklab,var(--color-argent-bright)_12%,transparent)] hover:text-white"
                          >
                            <BrandMark className="h-5 w-auto shrink-0 opacity-70" />
                            {t(child.labelKey)}
                          </Link>
                        ))}
                      </div>
                      <Link
                        href={item.href}
                        className="mt-1 block rounded-full px-3 py-2.5 text-sm text-[var(--color-cristal-light)] transition-colors hover:bg-[color-mix(in_oklab,var(--color-argent-bright)_12%,transparent)]"
                      >
                        {t("viewAll")} →
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5">
          <Link
            href="/pro"
            className="hidden rounded-full border border-[color-mix(in_oklab,var(--color-argent)_35%,transparent)] px-3 py-1.5 text-[0.8rem] whitespace-nowrap text-[var(--color-platine)] transition-colors hover:border-[color-mix(in_oklab,var(--color-argent-bright)_60%,transparent)] hover:text-white xl:inline-flex"
          >
            {t("proSpace")}
          </Link>
          <Link
            href="/recherche"
            aria-label={t("search")}
            className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[color-mix(in_oklab,var(--color-argent)_35%,transparent)] text-[var(--color-platine-bright)] transition-colors hover:border-[color-mix(in_oklab,var(--color-argent-bright)_60%,transparent)] hover:text-white sm:flex"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
          </Link>

          <LocaleSwitcher className="hidden shrink-0 rounded-full border border-[color-mix(in_oklab,var(--color-argent)_35%,transparent)] px-2.5 py-1.5 sm:inline-flex" />

          <Button
            href="/professionnels"
            variant="metal"
            size="sm"
            className="hidden whitespace-nowrap xl:inline-flex"
            magnetic
          >
            {tA("becomeDistributor")}
          </Button>

          <button
            type="button"
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-[color-mix(in_oklab,var(--color-argent)_35%,transparent)] text-[var(--color-platine-bright)] lg:hidden"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? t("close") : t("openMenu")}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="relative block h-3.5 w-6">
              <span
                className={cn(
                  "absolute left-0 h-0.5 w-full bg-current transition-all duration-[var(--duration-base)] ease-[var(--ease-eau)]",
                  mobileOpen ? "top-1.5 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1.5 h-0.5 w-full bg-current transition-opacity duration-[var(--duration-fast)]",
                  mobileOpen && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-0.5 w-full bg-current transition-all duration-[var(--duration-base)] ease-[var(--ease-eau)]",
                  mobileOpen ? "top-1.5 -rotate-45" : "top-3",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Overlay mobile — fondu + montée (léger, pas de `clip-path` animé). */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: ease.eau }}
            className="pointer-events-auto fixed inset-0 z-40 bg-[var(--color-royal-abysse)] lg:hidden"
          >
            <nav className="container-page flex h-full flex-col justify-center gap-1 pt-16">
              {primaryNav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 + i * 0.028, duration: 0.28, ease: ease.eau }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-2 font-[family-name:var(--font-display)] text-3xl text-[var(--color-platine-bright)] transition-colors hover:text-white"
                  >
                    {t(item.labelKey)}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <LocaleSwitcher />
                <Link
                  href="/pro"
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-[var(--color-cristal-light)]"
                >
                  {t("proSpace")}
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-[var(--color-cristal-light)]"
                >
                  {t("contact")}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
