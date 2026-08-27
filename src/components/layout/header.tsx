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
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,backdrop-filter,border-color,box-shadow] duration-[var(--duration-slow)] ease-[var(--ease-eau)]",
        scrolled
          ? "border-[var(--color-border)] bg-[color-mix(in_oklab,var(--color-royal-deep)_86%,transparent)] shadow-[var(--shadow-soft)] backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">
        <Logo />

        {/* Nav desktop */}
        <nav
          className="hidden items-center gap-1 lg:flex"
          onMouseLeave={() => setOpenMenu(null)}
        >
          {primaryNav.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setOpenMenu(item.children ? item.href : null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-sm transition-colors",
                    isActive
                      ? "text-white"
                      : "text-[var(--color-muted)] hover:text-white",
                  )}
                  aria-current={isActive ? "page" : undefined}
                  onFocus={() => setOpenMenu(item.children ? item.href : null)}
                >
                  {t(item.labelKey)}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-px h-px bg-[var(--color-cristal)]"
                      transition={{ duration: duration.base, ease: ease.eau }}
                    />
                  )}
                </Link>

                <AnimatePresence>
                  {item.children && openMenu === item.href && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: duration.base, ease: ease.eau }}
                      className="glass absolute left-1/2 top-full mt-3 w-[26rem] -translate-x-1/2 rounded-[var(--radius-lg)] p-3 shadow-[var(--shadow-lift)]"
                    >
                      <div className="grid grid-cols-2 gap-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="flex items-center gap-3 rounded-[var(--radius-md)] p-3 text-sm text-[var(--color-muted)] transition-colors hover:bg-white/5 hover:text-white"
                          >
                            <BrandMark className="h-5 w-auto shrink-0 opacity-70" />
                            {t(child.labelKey)}
                          </Link>
                        ))}
                      </div>
                      <Link
                        href={item.href}
                        className="mt-1 block rounded-[var(--radius-md)] p-3 text-sm text-[var(--color-cristal-light)] transition-colors hover:bg-white/5"
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

        <div className="flex items-center gap-3">
          <LocaleSwitcher className="hidden sm:inline-flex" />
          <Button href="/professionnels" size="sm" className="hidden md:inline-flex" magnetic>
            {tA("becomeDistributor")}
          </Button>
          <button
            type="button"
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full text-white lg:hidden"
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

      {/* Overlay mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            transition={{ duration: duration.slow, ease: ease.plonge }}
            className="fixed inset-0 z-40 bg-[var(--color-royal-deep)] lg:hidden"
          >
            <nav className="container-page flex h-full flex-col justify-center gap-1 pt-16">
              {primaryNav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, ease: ease.eau }}
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
              <div className="mt-8 flex items-center gap-6">
                <LocaleSwitcher />
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
