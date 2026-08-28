"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import {
  Map as MlMap,
  Marker as MlMarker,
  NavigationControl,
} from "maplibre-gl";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  MAP_DEFAULT_CENTER,
  MAP_DEFAULT_ZOOM,
  MAP_STYLE_URL,
  directionsUrl,
  distanceKm,
} from "@/config/map";
import type { PointOfSale } from "@/lib/cms-types";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

type Located = PointOfSale & { lng: number; lat: number };

const TYPE_LABELS: Record<string, string> = {
  boutique: "Boutique",
  gms: "Grande distribution",
  chr: "CHR",
  distributor: "Distributeur",
};

export function StoreLocator({ points }: { points: PointOfSale[] }) {
  const t = useTranslations("whereToBuy");
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MlMap | null>(null);
  const markersRef = useRef<Map<string, MlMarker>>(new Map());
  const reduced = usePrefersReducedMotion();

  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [userPos, setUserPos] = useState<[number, number] | null>(null);
  const [locating, setLocating] = useState(false);

  const located = useMemo<Located[]>(
    () =>
      points.filter(
        (p): p is Located =>
          typeof p.lat === "number" && typeof p.lng === "number",
      ),
    [points],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = located.filter((p) => {
      if (typeFilter && p.type !== typeFilter) return false;
      if (!q) return true;
      return [p.name, p.city, p.quartier, p.enseigne]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q));
    });
    if (userPos) {
      list = [...list].sort(
        (a, b) =>
          distanceKm(userPos, [a.lng, a.lat]) - distanceKm(userPos, [b.lng, b.lat]),
      );
    }
    return list;
  }, [located, query, typeFilter, userPos]);

  // Init map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = new MlMap({
      container: containerRef.current,
      style: MAP_STYLE_URL,
      center: MAP_DEFAULT_CENTER,
      zoom: MAP_DEFAULT_ZOOM,
      attributionControl: { compact: true },
    });
    map.addControl(new NavigationControl({ showCompass: false }), "top-right");
    mapRef.current = map;
    const markers = markersRef.current;
    return () => {
      map.remove();
      mapRef.current = null;
      markers.clear();
    };
  }, []);

  // Sync markers with filtered list
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const keep = new Set(filtered.map((p) => String(p.id)));

    for (const [id, marker] of markersRef.current) {
      if (!keep.has(id)) {
        marker.remove();
        markersRef.current.delete(id);
      }
    }

    for (const p of filtered) {
      const id = String(p.id);
      if (markersRef.current.has(id)) continue;
      const el = document.createElement("button");
      el.className = "oc-marker";
      el.setAttribute("aria-label", p.name);
      el.innerHTML = markerSvg;
      el.addEventListener("click", () => focusPoint(p));
      const marker = new MlMarker({ element: el, anchor: "bottom" })
        .setLngLat([p.lng, p.lat])
        .addTo(map);
      markersRef.current.set(id, marker);
    }
  }, [filtered]); // eslint-disable-line react-hooks/exhaustive-deps

  // Reflect active marker
  useEffect(() => {
    for (const [id, marker] of markersRef.current) {
      marker.getElement().classList.toggle("is-active", id === activeId);
    }
  }, [activeId]);

  function focusPoint(p: Located) {
    setActiveId(String(p.id));
    mapRef.current?.flyTo({
      center: [p.lng, p.lat],
      zoom: 14,
      duration: reduced ? 0 : 900,
    });
  }

  function locate() {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const c: [number, number] = [pos.coords.longitude, pos.coords.latitude];
        setUserPos(c);
        setLocating(false);
        mapRef.current?.flyTo({ center: c, zoom: 12, duration: reduced ? 0 : 900 });
        new MlMarker({ color: "#7FD0F5" }).setLngLat(c).addTo(mapRef.current!);
      },
      () => setLocating(false),
      { enableHighAccuracy: true, timeout: 8000 },
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[380px_1fr] lg:gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="flex-1 rounded-full border border-[var(--color-border)] bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-[var(--color-muted)]/60 focus:border-[var(--color-cristal)] focus-visible:outline-none"
          />
          <button
            type="button"
            onClick={locate}
            disabled={locating}
            className="glass shrink-0 rounded-full px-3 text-xs text-[var(--color-cristal-light)] transition-colors hover:text-white disabled:opacity-50"
            title={t("useLocation")}
          >
            {locating ? "…" : "◎"}
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {[null, "boutique", "gms", "chr"].map((tp) => (
            <button
              key={tp ?? "all"}
              type="button"
              onClick={() => setTypeFilter(tp)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs transition-colors",
                typeFilter === tp
                  ? "border-[var(--color-cristal)] text-white"
                  : "border-[var(--color-border)] text-[var(--color-muted)] hover:text-white",
              )}
            >
              {tp ? TYPE_LABELS[tp] : t("allTypes")}
            </button>
          ))}
        </div>

        <ul className="flex max-h-[52vh] flex-col gap-2 overflow-y-auto pr-1 lg:max-h-[560px]">
          {filtered.length === 0 && (
            <li className="rounded-[var(--radius-md)] border border-[var(--color-border)] p-4 text-sm text-[var(--color-muted)]">
              {t("noResults")}
            </li>
          )}
          {filtered.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => focusPoint(p)}
                className={cn(
                  "w-full rounded-[var(--radius-md)] border p-4 text-left transition-colors",
                  activeId === String(p.id)
                    ? "border-[var(--color-cristal)] bg-white/[0.04]"
                    : "border-[var(--color-border)] hover:border-[color-mix(in_oklab,var(--color-cristal)_40%,transparent)]",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium">{p.name}</p>
                    <p className="mt-0.5 text-xs text-[var(--color-muted)]">
                      {[p.quartier, p.city].filter(Boolean).join(", ")} ·{" "}
                      {TYPE_LABELS[p.type]}
                    </p>
                  </div>
                  {userPos && (
                    <span className="shrink-0 text-xs text-[var(--color-cristal-light)]">
                      {distanceKm(userPos, [p.lng, p.lat]).toFixed(1)} km
                    </span>
                  )}
                </div>
                <a
                  href={directionsUrl([p.lng, p.lat], p.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="mt-2 inline-block text-xs text-[var(--color-cristal-light)] hover:underline"
                >
                  {t("directions")} →
                </a>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div
        ref={containerRef}
        className="oc-map h-[60vh] min-h-[380px] w-full overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] lg:h-auto"
      />
    </div>
  );
}

const markerSvg = `<svg viewBox="0 0 100 172" width="30" height="42" aria-hidden><defs><linearGradient id="ocm" x1="50" y1="30" x2="50" y2="168" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#7FD0F5"/><stop offset=".45" stop-color="#2E9FDF"/><stop offset="1" stop-color="#0A1E7A"/></linearGradient></defs><path d="M50 52c12 30 36 50 36 74a36 36 0 0 1-72 0c0-24 24-44 36-74Z" fill="url(#ocm)" stroke="#fff" stroke-width="4"/><g fill="#fff"><path d="M50 130 44 117 50 104 56 117Z"/><path d="M50 130 63 124 76 130 63 136Z"/><path d="M50 130 56 143 50 156 44 143Z"/><path d="M50 130 37 124 24 130 37 136Z"/><circle cx="59.4" cy="120.6" r="4.6"/><circle cx="40.6" cy="120.6" r="4.6"/><circle cx="59.4" cy="139.4" r="4.6"/><circle cx="40.6" cy="139.4" r="4.6"/></g></svg>`;
