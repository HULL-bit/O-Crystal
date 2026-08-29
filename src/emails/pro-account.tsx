import { Button, Section, Text } from "@react-email/components";
import { EmailShell, emailStyles as s } from "./_shell";

const TYPE_LABEL: Record<string, string> = {
  wholesaler: "Grossiste / distributeur",
  chr: "Café, hôtel, restaurant",
  retailer: "Revendeur / boutique",
  institution: "Collectivité / entreprise",
  events: "Événementiel",
};

/** À l'équipe : nouvelle demande de compte pro à valider. */
export function ProAccountRequest(p: {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  type: string;
  region?: string;
  ninea?: string;
}) {
  return (
    <EmailShell
      preview={`Demande de compte pro — ${p.companyName}`}
      title="Nouvelle demande de compte professionnel"
    >
      <Text style={s.p}>À valider dans l&apos;admin → <strong>Espace pro → Comptes pros</strong>.</Text>
      <Section>
        <Text style={s.muted}>Société : <strong>{p.companyName}</strong> ({TYPE_LABEL[p.type] ?? p.type})</Text>
        <Text style={s.muted}>Contact : {p.contactName} · {p.phone} · {p.email}</Text>
        <Text style={s.muted}>Zone : {p.region || "—"} · NINEA/RCCM : {p.ninea || "—"}</Text>
      </Section>
    </EmailShell>
  );
}

/** Au client : compte validé. */
export function ProAccountApproved(p: {
  contactName: string;
  companyName: string;
  discountPct: number;
  loginUrl: string;
  locale?: "fr" | "en";
}) {
  const fr = p.locale !== "en";
  return (
    <EmailShell
      preview={fr ? "Votre compte O'Crystal est actif" : "Your O'Crystal account is active"}
      title={fr ? "Votre compte professionnel est actif" : "Your professional account is active"}
    >
      <Text style={s.p}>
        {fr
          ? `Bonjour ${p.contactName}, le compte « ${p.companyName} » est validé.`
          : `Hello ${p.contactName}, the account "${p.companyName}" is now approved.`}
      </Text>
      {p.discountPct > 0 ? (
        <Text style={s.p}>
          {fr
            ? `Votre remise catalogue : ${p.discountPct} %.`
            : `Your catalogue discount: ${p.discountPct}%.`}
        </Text>
      ) : null}
      <Button href={p.loginUrl} style={s.button}>
        {fr ? "Accéder à mon espace" : "Go to my area"}
      </Button>
    </EmailShell>
  );
}
