"use client";

import { openConsent } from "./cookie-consent";

export function ConsentLink({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={openConsent}
      className="transition-colors hover:text-white"
    >
      {children}
    </button>
  );
}
