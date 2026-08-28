import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from "@react-email/components";

export function NewsletterConfirm({
  url,
  locale = "fr",
}: {
  url: string;
  locale?: "fr" | "en";
}) {
  const fr = locale === "fr";
  return (
    <Html>
      <Head />
      <Preview>{fr ? "Confirmez votre inscription O'Crystal" : "Confirm your O'Crystal subscription"}</Preview>
      <Body style={{ fontFamily: "Arial, sans-serif", background: "#f4f6fa" }}>
        <Container style={{ padding: 32, maxWidth: 520, textAlign: "center" }}>
          <Heading style={{ fontSize: 20, color: "#0a1e7a" }}>
            {fr ? "Une dernière étape" : "One last step"}
          </Heading>
          <Text>
            {fr
              ? "Confirmez votre adresse pour recevoir la lettre O'Crystal."
              : "Confirm your address to receive the O'Crystal letter."}
          </Text>
          <Button
            href={url}
            style={{
              background: "#0a1e7a",
              color: "#fff",
              padding: "12px 24px",
              borderRadius: 999,
              fontSize: 14,
            }}
          >
            {fr ? "Confirmer mon inscription" : "Confirm my subscription"}
          </Button>
          <Text style={{ fontSize: 12, color: "#667" }}>
            {fr
              ? "Si vous n'êtes pas à l'origine de cette demande, ignorez cet e-mail."
              : "If you did not request this, please ignore this email."}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default NewsletterConfirm;
