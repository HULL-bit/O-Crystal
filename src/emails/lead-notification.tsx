import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

const KIND_LABEL: Record<string, string> = {
  contact: "Contact",
  quote: "Demande de devis",
  distributor: "Devenir distributeur",
  application: "Candidature",
};

export function LeadNotification(props: {
  variant: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
  activity?: string;
  volumes?: string;
  city?: string;
}) {
  const { variant, name, email, phone, company, subject, message } = props;
  return (
    <Html>
      <Head />
      <Preview>{`${KIND_LABEL[variant] ?? variant} — ${name}`}</Preview>
      <Body style={{ fontFamily: "Arial, sans-serif", background: "#f4f6fa" }}>
        <Container style={{ padding: 24, maxWidth: 560 }}>
          <Heading style={{ fontSize: 18, color: "#0a1e7a" }}>
            {KIND_LABEL[variant] ?? variant}
          </Heading>
          <Section>
            <Row><Text><b>Nom :</b> {name}</Text></Row>
            <Row><Text><b>E-mail :</b> {email}</Text></Row>
            {phone ? <Row><Text><b>Téléphone :</b> {phone}</Text></Row> : null}
            {company ? <Row><Text><b>Société :</b> {company}</Text></Row> : null}
            {subject ? <Row><Text><b>Sujet :</b> {subject}</Text></Row> : null}
            {props.activity ? <Row><Text><b>Activité :</b> {props.activity}</Text></Row> : null}
            {props.volumes ? <Row><Text><b>Volumes :</b> {props.volumes}</Text></Row> : null}
            {props.city ? <Row><Text><b>Ville :</b> {props.city}</Text></Row> : null}
          </Section>
          <Hr />
          <Text style={{ whiteSpace: "pre-wrap" }}>{message}</Text>
        </Container>
      </Body>
    </Html>
  );
}

export default LeadNotification;
