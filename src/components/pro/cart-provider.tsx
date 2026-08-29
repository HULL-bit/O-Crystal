"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

export type CartItem = { slug: string; packs: number };

const KEY = "oc_pro_cart:v1";
const EVENT = "oc:pro-cart";

type CartApi = {
  items: CartItem[];
  count: number;
  setPacks: (slug: string, packs: number) => void;
  add: (slug: string, packs?: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

let cache: CartItem[] = [];
let cacheRaw = "";

function read(): CartItem[] {
  try {
    const raw = localStorage.getItem(KEY) ?? "[]";
    if (raw !== cacheRaw) {
      cacheRaw = raw;
      const parsed = JSON.parse(raw);
      cache = Array.isArray(parsed)
        ? parsed
            .filter((x) => x && typeof x.slug === "string")
            .map((x) => ({ slug: String(x.slug), packs: Math.max(0, Math.floor(Number(x.packs) || 0)) }))
        : [];
    }
  } catch {
    cache = [];
  }
  return cache;
}

function write(items: CartItem[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    /* stockage indisponible */
  }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

const CartContext = createContext<CartApi | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(subscribe, read, () => cache);

  const setPacks = useCallback((slug: string, packs: number) => {
    const next = read().filter((i) => i.slug !== slug);
    const n = Math.max(0, Math.floor(packs));
    if (n > 0) next.push({ slug, packs: n });
    write(next);
  }, []);

  const add = useCallback((slug: string, packs = 1) => {
    const current = read().find((i) => i.slug === slug)?.packs ?? 0;
    setPacks(slug, current + packs);
  }, [setPacks]);

  const remove = useCallback((slug: string) => setPacks(slug, 0), [setPacks]);
  const clear = useCallback(() => write([]), []);

  const value = useMemo<CartApi>(
    () => ({
      items,
      count: items.reduce((s, i) => s + i.packs, 0),
      setPacks,
      add,
      remove,
      clear,
    }),
    [items, setPacks, add, remove, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartApi {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart doit être utilisé dans <CartProvider>");
  return ctx;
}
