import { z } from "zod";
import { honeypot } from "@/lib/schemas";

const str = (min: number, max: number) => z.string().trim().min(min).max(max);

export const proRegisterSchema = z.object({
  companyName: str(2, 160),
  contactName: str(2, 120),
  email: z.string().trim().email().max(180),
  phone: str(6, 40),
  type: z.enum(["wholesaler", "chr", "retailer", "institution", "events"]),
  region: str(0, 120).optional().or(z.literal("")),
  ninea: str(0, 60).optional().or(z.literal("")),
  deliveryAddress: str(0, 400).optional().or(z.literal("")),
  password: z.string().min(10, "10 caractères minimum").max(200),
  consent: z.literal("on"),
  locale: z.enum(["fr", "en"]).default("fr"),
  website: honeypot,
});
export type ProRegisterInput = z.infer<typeof proRegisterSchema>;

export const proLoginSchema = z.object({
  email: z.string().trim().email().max(180),
  password: z.string().min(1).max(200),
  locale: z.enum(["fr", "en"]).default("fr"),
});

export const proOrderSchema = z.object({
  cart: z.string().min(2).max(5000), // JSON [{slug, packs}]
  deliveryAddress: str(4, 400),
  requestedDate: str(0, 40).optional().or(z.literal("")),
  customerNote: str(0, 1000).optional().or(z.literal("")),
  locale: z.enum(["fr", "en"]).default("fr"),
  website: honeypot,
});

export const cartLineSchema = z.object({
  slug: z.string().min(1).max(200),
  packs: z.coerce.number().int().min(0).max(100000),
});
