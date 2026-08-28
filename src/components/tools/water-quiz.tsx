"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "@/i18n/navigation";
import { track } from "@/lib/analytics";
import { ease } from "@/lib/motion";

type Opt = { label: string; format: string };
type Q = { q: string; options: Opt[] };

const QUIZ: Record<"fr" | "en", { questions: Q[]; resultTitle: string; retake: string; cta: string; intro: string }> = {
  fr: {
    intro: "Trois questions pour trouver le format O'Crystal qui vous ressemble.",
    resultTitle: "Votre eau",
    retake: "Recommencer",
    cta: "Voir ce format",
    questions: [
      {
        q: "Où buvez-vous le plus souvent ?",
        options: [
          { label: "En déplacement", format: "50 cl" },
          { label: "Au bureau", format: "1,5 L" },
          { label: "À la maison", format: "5 L" },
          { label: "En collectivité / événement", format: "19 L" },
        ],
      },
      {
        q: "Votre rythme ?",
        options: [
          { label: "Sportif, actif", format: "50 cl" },
          { label: "Équilibré", format: "1,5 L" },
          { label: "Familial", format: "5 L" },
        ],
      },
      {
        q: "Ce qui compte le plus ?",
        options: [
          { label: "La praticité", format: "33 cl" },
          { label: "La minéralité à table", format: "1,5 L" },
          { label: "L'économie au litre", format: "10 L" },
        ],
      },
    ],
  },
  en: {
    intro: "Three questions to find the O'Crystal format that fits you.",
    resultTitle: "Your water",
    retake: "Start over",
    cta: "See this format",
    questions: [
      {
        q: "Where do you drink most often?",
        options: [
          { label: "On the go", format: "50 cl" },
          { label: "At the office", format: "1.5 L" },
          { label: "At home", format: "5 L" },
          { label: "Communities / events", format: "19 L" },
        ],
      },
      {
        q: "Your rhythm?",
        options: [
          { label: "Sporty, active", format: "50 cl" },
          { label: "Balanced", format: "1.5 L" },
          { label: "Family", format: "5 L" },
        ],
      },
      {
        q: "What matters most?",
        options: [
          { label: "Convenience", format: "33 cl" },
          { label: "Minerality at the table", format: "1.5 L" },
          { label: "Cost per litre", format: "10 L" },
        ],
      },
    ],
  },
};

const SLUG: Record<string, string> = {
  "33 cl": "33cl", "50 cl": "50cl", "1,5 L": "1-5l", "1.5 L": "1-5l",
  "5 L": "5l", "10 L": "10l", "19 L": "19l",
};

export function WaterQuiz() {
  const locale = useLocale() === "en" ? "en" : "fr";
  const data = QUIZ[locale];
  const [step, setStep] = useState(0);
  const [picks, setPicks] = useState<string[]>([]);

  const done = step >= data.questions.length;
  const result = done ? mode(picks) : null;

  function choose(format: string) {
    const next = [...picks, format];
    setPicks(next);
    setStep(step + 1);
    if (next.length === data.questions.length) track("quiz_result", { format: mode(next) });
  }

  return (
    <div className="glass rounded-[var(--radius-xl)] p-8 md:p-10">
      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3, ease: ease.eau }}
          >
            <p className="text-xs tracking-[0.2em] text-[var(--color-muted)] uppercase">
              {step + 1} / {data.questions.length}
            </p>
            <h2 className="mt-3 text-2xl md:text-3xl">{data.questions[step].q}</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {data.questions[step].options.map((o) => (
                <button
                  key={o.label}
                  type="button"
                  onClick={() => choose(o.format)}
                  className="rounded-[var(--radius-md)] border border-[var(--color-border)] p-4 text-left transition-colors hover:border-[var(--color-cristal)]"
                >
                  {o.label}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <p className="text-xs tracking-[0.2em] text-[var(--color-cristal-light)] uppercase">
              {data.resultTitle}
            </p>
            <p className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-5xl)] leading-none text-shimmer">
              {result}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href={`/produits/${SLUG[result ?? ""] ?? ""}`}
                className="rounded-full bg-[image:var(--gradient-eau)] px-6 py-3 text-sm font-medium text-white"
              >
                {data.cta}
              </Link>
              <button
                type="button"
                onClick={() => {
                  setStep(0);
                  setPicks([]);
                }}
                className="rounded-full border border-[var(--color-border)] px-6 py-3 text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
              >
                {data.retake}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function mode(arr: string[]) {
  const count = new Map<string, number>();
  let best = arr[0];
  let max = 0;
  for (const v of arr) {
    const n = (count.get(v) ?? 0) + 1;
    count.set(v, n);
    if (n > max) {
      max = n;
      best = v;
    }
  }
  return best;
}
