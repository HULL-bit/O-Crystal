"use client";

import { useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { motion } from "motion/react";
import { Link } from "@/i18n/navigation";
import { track } from "@/lib/analytics";
import { spring } from "@/lib/motion";

const S = {
  fr: {
    weight: "Votre poids (kg)",
    activity: "Activité physique",
    climate: "Climat",
    act: ["Sédentaire", "Modérée", "Intense"],
    clim: ["Tempéré", "Chaud", "Très chaud"],
    result: "Votre besoin quotidien",
    perDay: "par jour",
    reco: "Nos formats adaptés",
    note: "Estimation indicative — adaptez selon votre ressenti, la grossesse ou un avis médical.",
  },
  en: {
    weight: "Your weight (kg)",
    activity: "Physical activity",
    climate: "Climate",
    act: ["Sedentary", "Moderate", "Intense"],
    clim: ["Temperate", "Hot", "Very hot"],
    result: "Your daily need",
    perDay: "per day",
    reco: "Formats that fit",
    note: "Indicative estimate — adjust to how you feel, pregnancy or medical advice.",
  },
};

export function HydrationCalculator() {
  const locale = useLocale() === "en" ? "en" : "fr";
  const t = S[locale];
  const [weight, setWeight] = useState(70);
  const [activity, setActivity] = useState(1);
  const [climate, setClimate] = useState(0);

  const litres = useMemo(() => {
    const base = weight * 0.033;
    const act = [0, 0.4, 0.8][activity];
    const clim = [0, 0.5, 0.9][climate];
    return Math.round((base + act + clim) * 10) / 10;
  }, [weight, activity, climate]);

  const formats = useMemo(() => {
    if (litres >= 4) return ["5 L", "19 L"];
    if (litres >= 2.5) return ["1,5 L", "5 L"];
    return ["50 cl", "1,5 L"];
  }, [litres]);

  return (
    <div className="glass rounded-[var(--radius-xl)] p-8 md:p-10">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-6">
          <label className="text-sm">
            <span className="text-[var(--color-muted)]">{t.weight}</span>
            <div className="mt-2 flex items-center gap-4">
              <input
                type="range"
                min={35}
                max={140}
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="flex-1 accent-[var(--color-cristal)]"
              />
              <span className="w-12 text-right font-[family-name:var(--font-display)] text-xl">
                {weight}
              </span>
            </div>
          </label>

          <Segmented label={t.activity} options={t.act} value={activity} onChange={setActivity} />
          <Segmented label={t.climate} options={t.clim} value={climate} onChange={setClimate} />
        </div>

        <div className="flex flex-col items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-track)] p-8 text-center">
          <span className="text-xs tracking-[0.2em] text-[var(--color-muted)] uppercase">
            {t.result}
          </span>
          <motion.span
            key={litres}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={spring.soft}
            className="mt-2 font-[family-name:var(--font-display)] text-[length:var(--text-6xl)] leading-none text-shimmer"
          >
            {litres.toLocaleString(locale === "fr" ? "fr-FR" : "en-US")} L
          </motion.span>
          <span className="text-sm text-[var(--color-muted)]">{t.perDay}</span>

          <div className="mt-6">
            <p className="text-xs tracking-[0.2em] text-[var(--color-cristal-light)] uppercase">
              {t.reco}
            </p>
            <div className="mt-2 flex justify-center gap-2">
              {formats.map((f) => (
                <Link
                  key={f}
                  href="/produits"
                  onClick={() => track("hydration_reco", { format: f })}
                  className="rounded-full border border-[var(--color-border)] px-3 py-1 text-sm hover:border-[var(--color-cristal)]"
                >
                  {f}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="mt-6 text-xs text-[var(--color-muted)]">{t.note}</p>
    </div>
  );
}

function Segmented({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="text-sm">
      <span className="text-[var(--color-muted)]">{label}</span>
      <div className="mt-2 flex gap-2">
        {options.map((o, i) => (
          <button
            key={o}
            type="button"
            onClick={() => onChange(i)}
            className={`flex-1 rounded-full border px-3 py-2 transition-colors ${
              value === i
                ? "border-[var(--color-cristal)] bg-[var(--color-track)] text-[var(--color-foreground)]"
                : "border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
