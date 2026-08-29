import { Button, Column, Row, Section, Text } from "@react-email/components";
import { EmailShell, emailStyles as s } from "./_shell";
import { formatXOF } from "@/lib/pro-pricing";

type Line = { name: string; packs: number; unitPriceHT: number };

type Common = {
  reference: string;
  lines: Line[];
  totalHT: number;
  totalVAT: number;
  totalTTC: number;
  deliveryAddress: string;
  requestedDate?: string;
  customerNote?: string;
};

function LinesTable({ lines }: { lines: Line[] }) {
  return (
    <Section style={{ margin: "8px 0 16px" }}>
      <Row>
        <Column style={s.th}>Article</Column>
        <Column style={{ ...s.th, textAlign: "right" }}>Packs</Column>
        <Column style={{ ...s.th, textAlign: "right" }}>PU HT</Column>
        <Column style={{ ...s.th, textAlign: "right" }}>Total HT</Column>
      </Row>
      {lines.map((l, i) => (
        <Row key={i}>
          <Column style={s.td}>{l.name}</Column>
          <Column style={{ ...s.td, textAlign: "right" }}>{l.packs}</Column>
          <Column style={{ ...s.td, textAlign: "right" }}>{formatXOF(l.unitPriceHT)}</Column>
          <Column style={{ ...s.td, textAlign: "right" }}>{formatXOF(l.unitPriceHT * l.packs)}</Column>
        </Row>
      ))}
    </Section>
  );
}

/** À l'équipe : nouvelle commande pro. */
export function ProOrderStaff(
  p: Common & { companyName: string; contactName: string; email: string },
) {
  return (
    <EmailShell
      preview={`Commande ${p.reference} — ${p.companyName}`}
      title={`Commande ${p.reference}`}
    >
      <Text style={s.muted}>
        {p.companyName} — {p.contactName} · {p.email}
      </Text>
      <LinesTable lines={p.lines} />
      <Text style={s.p}>
        Total HT {formatXOF(p.totalHT)} · TVA {formatXOF(p.totalVAT)} ·{" "}
        <span style={s.total}>TTC {formatXOF(p.totalTTC)}</span>
      </Text>
      <Text style={s.muted}>Livraison : {p.deliveryAddress}</Text>
      {p.requestedDate ? <Text style={s.muted}>Date souhaitée : {p.requestedDate}</Text> : null}
      {p.customerNote ? <Text style={s.muted}>Note : {p.customerNote}</Text> : null}
    </EmailShell>
  );
}

/** Au client : accusé de réception de commande. */
export function ProOrderCustomer(
  p: Common & { contactName: string; ordersUrl: string; locale?: "fr" | "en" },
) {
  const fr = p.locale !== "en";
  return (
    <EmailShell
      preview={fr ? `Commande ${p.reference} reçue` : `Order ${p.reference} received`}
      title={fr ? `Commande ${p.reference} bien reçue` : `Order ${p.reference} received`}
    >
      <Text style={s.p}>
        {fr
          ? `Bonjour ${p.contactName}, nous avons bien reçu votre commande. Notre équipe la confirme et vous recontacte pour la livraison et le règlement.`
          : `Hello ${p.contactName}, we received your order. Our team will confirm it and get back to you about delivery and payment.`}
      </Text>
      <LinesTable lines={p.lines} />
      <Text style={s.p}>
        <span style={s.total}>{fr ? "Total TTC" : "Total incl. VAT"} {formatXOF(p.totalTTC)}</span>
      </Text>
      <Button href={p.ordersUrl} style={s.button}>
        {fr ? "Suivre ma commande" : "Track my order"}
      </Button>
    </EmailShell>
  );
}
