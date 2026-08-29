import "server-only";

import { payloadClient } from "@/lib/pro-auth";
import type { Locale } from "@/lib/cms";
import type { MediaDoc } from "@/lib/cms-types";
import { asMedia } from "@/lib/cms-types";
import type { ProPricing } from "@/lib/pro-pricing";

export type ProProduct = ProPricing & {
  id: string;
  slug: string;
  name: string;
  volume: string;
  tagline?: string | null;
  packshot: MediaDoc | null;
  availability?: string | null;
};

export type OrderLine = {
  product: { slug?: string; name?: string } | string;
  label?: string | null;
  qtyPacks: number;
  unitPriceHT: number;
  vatRate: number;
};

export type Order = {
  id: string;
  reference: string;
  status: string;
  createdAt: string;
  requestedDate?: string | null;
  deliveryAddress?: string | null;
  customerNote?: string | null;
  lines: OrderLine[];
  totalHT: number;
  totalVAT: number;
  totalTTC: number;
};

/** Catalogue pro : formats publiés dont le tarif pro est renseigné. */
export async function getProCatalogue(locale: Locale): Promise<ProProduct[]> {
  try {
    const payload = await payloadClient();
    const res = await payload.find({
      collection: "products",
      where: {
        and: [
          { _status: { equals: "published" } },
          { proPriceHT: { greater_than: 0 } },
        ],
      },
      locale,
      depth: 1,
      limit: 50,
      sort: "proPriceHT",
      overrideAccess: true,
    });
    return res.docs.map((d) => {
      const doc = d as Record<string, unknown>;
      return {
        id: String(doc.id),
        slug: String(doc.slug),
        name: String(doc.name ?? ""),
        volume: String(doc.volume ?? ""),
        tagline: (doc.tagline as string) ?? null,
        packshot: asMedia(doc.packshot as never),
        availability: (doc.availability as string) ?? null,
        proPriceHT: (doc.proPriceHT as number) ?? null,
        proPackSize: (doc.proPackSize as number) ?? null,
        proVatRate: (doc.proVatRate as number) ?? null,
        proMinPacks: (doc.proMinPacks as number) ?? null,
        proLeadTimeDays: (doc.proLeadTimeDays as number) ?? null,
      };
    });
  } catch {
    return [];
  }
}

export async function getProOrders(accountId: string): Promise<Order[]> {
  try {
    const payload = await payloadClient();
    const res = await payload.find({
      collection: "orders",
      where: { account: { equals: accountId } },
      sort: "-createdAt",
      depth: 1,
      limit: 100,
      overrideAccess: true,
    });
    return res.docs.map(normalizeOrder);
  } catch {
    return [];
  }
}

export async function getProOrder(accountId: string, id: string): Promise<Order | null> {
  try {
    const payload = await payloadClient();
    const doc = await payload.findByID({
      collection: "orders",
      id,
      depth: 1,
      overrideAccess: true,
    });
    const record = doc as Record<string, unknown>;
    const owner =
      typeof record.account === "object"
        ? String((record.account as { id: unknown }).id)
        : String(record.account);
    if (owner !== accountId) return null;
    return normalizeOrder(record);
  } catch {
    return null;
  }
}

function normalizeOrder(doc: Record<string, unknown>): Order {
  return {
    id: String(doc.id),
    reference: String(doc.reference ?? ""),
    status: String(doc.status ?? "submitted"),
    createdAt: String(doc.createdAt ?? ""),
    requestedDate: (doc.requestedDate as string) ?? null,
    deliveryAddress: (doc.deliveryAddress as string) ?? null,
    customerNote: (doc.customerNote as string) ?? null,
    lines: ((doc.lines as OrderLine[]) ?? []).map((l) => ({
      product: l.product,
      label: l.label ?? null,
      qtyPacks: l.qtyPacks ?? 0,
      unitPriceHT: l.unitPriceHT ?? 0,
      vatRate: l.vatRate ?? 18,
    })),
    totalHT: (doc.totalHT as number) ?? 0,
    totalVAT: (doc.totalVAT as number) ?? 0,
    totalTTC: (doc.totalTTC as number) ?? 0,
  };
}
