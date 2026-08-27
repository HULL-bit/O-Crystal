"use client";

import { useSyncExternalStore } from "react";

export type DeviceTier = "low" | "mid" | "high";
export type DeviceInfo = { tier: DeviceTier; saveData: boolean };

type NavigatorWithMemory = Navigator & {
  deviceMemory?: number;
  connection?: {
    saveData?: boolean;
    effectiveType?: string;
    addEventListener?: (t: string, cb: () => void) => void;
    removeEventListener?: (t: string, cb: () => void) => void;
  };
};

const SERVER_SNAPSHOT: DeviceInfo = { tier: "low", saveData: false };
let cacheKey = "";
let cached: DeviceInfo = SERVER_SNAPSHOT;

function compute(): DeviceInfo {
  const nav = navigator as NavigatorWithMemory;
  const cores = nav.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 4;
  const conn = nav.connection;
  const saveData = Boolean(conn?.saveData);
  const slowNet = conn?.effectiveType ? /2g|slow-2g|3g/.test(conn.effectiveType) : false;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const smallViewport = Math.min(window.innerWidth, window.innerHeight) < 640;

  let tier: DeviceTier = "high";
  if (cores <= 4 || memory <= 4) tier = "mid";
  if (cores <= 2 || memory <= 2 || slowNet || saveData) tier = "low";
  if (coarse && smallViewport && tier === "high") tier = "mid";

  return { tier, saveData: saveData || slowNet };
}

function getSnapshot(): DeviceInfo {
  const next = compute();
  const key = `${next.tier}:${next.saveData}`;
  if (key !== cacheKey) {
    cacheKey = key;
    cached = next;
  }
  return cached;
}

function subscribe(onChange: () => void) {
  const nav = navigator as NavigatorWithMemory;
  nav.connection?.addEventListener?.("change", onChange);
  window.addEventListener("resize", onChange);
  return () => {
    nav.connection?.removeEventListener?.("change", onChange);
    window.removeEventListener("resize", onChange);
  };
}

/**
 * Estime la capacité de l'appareil (WebGL, autoplay vidéo, post-processing…).
 * Contexte réseau sénégalais : on dégrade volontiers, jamais les Core Web Vitals.
 */
export function useDeviceTier(): DeviceInfo {
  return useSyncExternalStore(subscribe, getSnapshot, () => SERVER_SNAPSHOT);
}
