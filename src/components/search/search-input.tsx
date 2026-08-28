"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";

/** Champ de recherche — soumet vers /recherche?q=… */
export function SearchInput({ initial = "" }: { initial?: string }) {
  const router = useRouter();
  const [q, setQ] = useState(initial);

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/recherche?q=${encodeURIComponent(q.trim())}`);
      }}
      className="flex gap-2"
    >
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        autoFocus
        placeholder="Rechercher un produit, une actualité…"
        className="flex-1 rounded-full border border-[var(--color-border)] bg-[var(--color-field)] px-5 py-3 text-[var(--color-foreground)] placeholder:text-[var(--color-muted)]/60 focus:border-[var(--color-cristal)] focus-visible:outline-none"
      />
      <button
        type="submit"
        className="rounded-full bg-[image:var(--gradient-eau)] px-6 py-3 text-sm font-medium text-white"
      >
        OK
      </button>
    </form>
  );
}
