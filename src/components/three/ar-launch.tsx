"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const BottleAR = dynamic(() => import("./bottle-ar"), { ssr: false });

const R3D_ENABLED = process.env.NEXT_PUBLIC_ENABLE_3D === "true";

type XRNavigator = Navigator & {
  xr?: { isSessionSupported?: (mode: string) => Promise<boolean> };
};

/**
 * Bouton « Voir en réalité augmentée » — affiché uniquement si la 3D est
 * activée ET que l'appareil supporte WebXR `immersive-ar` (Chrome Android,
 * Quest, Android XR). Le module AR n'est chargé qu'au clic.
 */
export function ARLaunch() {
  const t = useTranslations("productsPage");
  const [supported, setSupported] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!R3D_ENABLED) return;
    const xr = (navigator as XRNavigator).xr;
    xr?.isSessionSupported?.("immersive-ar")
      .then((ok) => setSupported(Boolean(ok)))
      .catch(() => setSupported(false));
  }, []);

  if (!supported) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-4 inline-flex items-center gap-2 rounded-full border border-[color-mix(in_oklab,var(--color-argent)_45%,transparent)] px-4 py-2 text-sm text-[var(--color-platine-bright)] transition-colors hover:border-[color-mix(in_oklab,var(--color-argent-bright)_60%,transparent)] hover:text-white"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 3 3 7.5v9L12 21l9-4.5v-9L12 3Zm0 0v18M3 7.5l9 4.5 9-4.5" strokeLinejoin="round" />
        </svg>
        {t("viewInAR")}
      </button>
      {open && <BottleAR onExit={() => setOpen(false)} />}
    </>
  );
}
