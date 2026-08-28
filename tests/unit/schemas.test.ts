import { describe, expect, it } from "vitest";
import { leadSchema, newsletterSchema } from "@/lib/schemas";

const validLead = {
  variant: "contact",
  name: "Awa Ndiaye",
  email: "awa@example.sn",
  message: "Bonjour, je souhaite un devis.",
  consent: "on",
  locale: "fr",
  website: "",
};

describe("leadSchema", () => {
  it("accepte un formulaire de contact minimal valide", () => {
    const r = leadSchema.safeParse(validLead);
    expect(r.success).toBe(true);
  });

  it("rejette un e-mail invalide", () => {
    const r = leadSchema.safeParse({ ...validLead, email: "pas-un-email" });
    expect(r.success).toBe(false);
  });

  it("rejette un message trop court", () => {
    const r = leadSchema.safeParse({ ...validLead, message: "hi" });
    expect(r.success).toBe(false);
  });

  it("exige le consentement (`on`)", () => {
    const r = leadSchema.safeParse({ ...validLead, consent: "" });
    expect(r.success).toBe(false);
  });

  it("rejette un honeypot rempli", () => {
    const r = leadSchema.safeParse({ ...validLead, website: "http://spam.example" });
    expect(r.success).toBe(false);
  });

  it("coerce `elapsed` en nombre et applique le défaut de locale", () => {
    const r = leadSchema.safeParse({ ...validLead, locale: undefined, elapsed: "2500" });
    expect(r.success).toBe(true);
    if (r.success) {
      expect(r.data.elapsed).toBe(2500);
      expect(r.data.locale).toBe("fr");
    }
  });

  it("trim le nom et refuse un nom vide après trim", () => {
    const r = leadSchema.safeParse({ ...validLead, name: "   " });
    expect(r.success).toBe(false);
  });
});

describe("newsletterSchema", () => {
  it("accepte un e-mail + consentement", () => {
    expect(
      newsletterSchema.safeParse({ email: "a@b.sn", consent: "on", locale: "en", website: "" }).success,
    ).toBe(true);
  });

  it("refuse sans consentement", () => {
    expect(
      newsletterSchema.safeParse({ email: "a@b.sn", consent: "off", website: "" }).success,
    ).toBe(false);
  });
});
