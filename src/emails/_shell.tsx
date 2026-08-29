import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

/** Coquille commune aux e-mails transactionnels O'Crystal. */
export function EmailShell({
  preview,
  title,
  children,
  footer = "O'Crystal — Cristal Waters SARL · Zone Industrielle de Niague, Rufisque, Sénégal",
}: {
  preview: string;
  title: string;
  children: React.ReactNode;
  footer?: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={{ fontFamily: "Arial, Helvetica, sans-serif", background: "#eef2f8", margin: 0 }}>
        <Container style={{ maxWidth: 560, margin: "0 auto", padding: "32px 0" }}>
          <Section style={{ padding: "0 24px 12px" }}>
            <Text style={{ margin: 0, fontSize: 13, letterSpacing: 2, color: "#2e9fdf", textTransform: "uppercase" }}>
              O&apos;Crystal
            </Text>
          </Section>
          <Section
            style={{
              background: "#ffffff",
              borderRadius: 16,
              padding: 28,
              border: "1px solid #dbe3ec",
            }}
          >
            <Heading style={{ fontSize: 19, color: "#0a1e7a", margin: "0 0 12px" }}>{title}</Heading>
            {children}
          </Section>
          <Hr style={{ borderColor: "#dbe3ec", margin: "20px 24px" }} />
          <Text style={{ padding: "0 24px", fontSize: 11, color: "#8792a8", margin: 0 }}>{footer}</Text>
        </Container>
      </Body>
    </Html>
  );
}

export const emailStyles = {
  p: { fontSize: 14, lineHeight: "22px", color: "#1f2a44", margin: "0 0 12px" } as const,
  muted: { fontSize: 13, color: "#55617c", margin: "0 0 8px" } as const,
  th: { fontSize: 12, color: "#8792a8", textAlign: "left" as const, padding: "6px 8px" },
  td: { fontSize: 13, color: "#1f2a44", padding: "6px 8px", borderTop: "1px solid #eef2f8" },
  total: { fontSize: 15, fontWeight: 700, color: "#0a1e7a" } as const,
  button: {
    background: "#0a1e7a",
    color: "#ffffff",
    padding: "12px 24px",
    borderRadius: 999,
    fontSize: 14,
    textDecoration: "none",
    display: "inline-block",
  } as const,
};
