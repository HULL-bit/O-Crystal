"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

type Stored = { hasSeenIntro?: boolean; soundEnabled?: boolean };

type Preferences = {
  /** L'intro cinématique a déjà été vue (on la saute à la 2ᵉ visite). */
  hasSeenIntro: boolean;
  markIntroSeen: () => void;
  /** Ambiance sonore optionnelle — jamais imposée, mémorisée. */
  soundEnabled: boolean;
  setSoundEnabled: (v: boolean) => void;
  /** `true` une fois passé le premier rendu client (localStorage lisible). */
  ready: boolean;
};

const KEY = "ocrystal:prefs:v1";
const EVENT = "ocrystal:prefs";
const EMPTY: Stored = {};

let rawCache = "";
let objCache: Stored = EMPTY;

function readStored(): Stored {
  let raw = "{}";
  try {
    raw = localStorage.getItem(KEY) ?? "{}";
  } catch {
    return EMPTY;
  }
  if (raw !== rawCache) {
    rawCache = raw;
    try {
      objCache = JSON.parse(raw) as Stored;
    } catch {
      objCache = EMPTY;
    }
  }
  return objCache;
}

function writeStored(patch: Stored) {
  try {
    const next = { ...readStored(), ...patch };
    localStorage.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(EVENT));
  } catch {
    /* stockage indisponible */
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

const PreferencesContext = createContext<Preferences | null>(null);

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const stored = useSyncExternalStore(subscribe, readStored, () => EMPTY);
  const ready = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const markIntroSeen = useCallback(() => writeStored({ hasSeenIntro: true }), []);
  const setSoundEnabled = useCallback(
    (v: boolean) => writeStored({ soundEnabled: v }),
    [],
  );

  const value = useMemo<Preferences>(
    () => ({
      hasSeenIntro: Boolean(stored.hasSeenIntro),
      soundEnabled: Boolean(stored.soundEnabled),
      markIntroSeen,
      setSoundEnabled,
      ready,
    }),
    [stored, markIntroSeen, setSoundEnabled, ready],
  );

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx)
    throw new Error("usePreferences doit être utilisé dans <PreferencesProvider>");
  return ctx;
}
