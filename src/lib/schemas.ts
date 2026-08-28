import { z } from "zod";

const trimmed = (min: number, max: number) =>
  z.string().trim().min(min).max(max);

/** Champ piège anti-bot : doit rester vide. */
export const honeypot = z.string().max(0).optional().or(z.literal(""));

export const leadSchema = z.object({
  variant: z.enum(["contact", "quote", "distributor", "application"]),
  name: trimmed(2, 120),
  email: z.string().trim().email().max(180),
  phone: trimmed(0, 40).optional().or(z.literal("")),
  company: trimmed(0, 160).optional().or(z.literal("")),
  subject: trimmed(0, 200).optional().or(z.literal("")),
  message: trimmed(5, 4000),
  activity: trimmed(0, 160).optional().or(z.literal("")),
  volumes: trimmed(0, 120).optional().or(z.literal("")),
  city: trimmed(0, 120).optional().or(z.literal("")),
  consent: z.literal("on"),
  locale: z.enum(["fr", "en"]).default("fr"),
  website: honeypot, // honeypot
  elapsed: z.coerce.number().min(0).optional(), // ms depuis affichage (time-trap)
});
export type LeadInput = z.infer<typeof leadSchema>;

export const newsletterSchema = z.object({
  email: z.string().trim().email().max(180),
  consent: z.literal("on"),
  locale: z.enum(["fr", "en"]).default("fr"),
  website: honeypot,
});

export type ActionResult =
  | { ok: true; message?: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };
