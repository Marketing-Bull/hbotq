import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { ConsultationInput } from "@/lib/validation/consultation";

interface Props {
  data: ConsultationInput;
  receivedAt: string;
}

export function ConsultationLeadEmail({ data, receivedAt }: Props) {
  // Only render rows we actually have — a direct visitor produces none of
  // these, and empty "utm_source:" lines would be noise for intake staff.
  const campaign = Object.entries({
    "UTM source": data.attribution?.utm_source,
    "UTM medium": data.attribution?.utm_medium,
    "UTM campaign": data.attribution?.utm_campaign,
    "UTM term": data.attribution?.utm_term,
    "UTM content": data.attribution?.utm_content,
    "Google click ID": data.attribution?.gclid,
    "Landing page": data.attribution?.landing_page,
    Referrer: data.attribution?.referrer,
  }).filter((entry): entry is [string, string] => Boolean(entry[1]));

  return (
    <Html>
      <Head />
      <Preview>
        New consultation request from {data.name} ({data.condition})
      </Preview>
      <Body style={body}>
        <Container style={container}>
          <Heading style={h1}>New consultation request</Heading>
          <Text style={meta}>Received {receivedAt}</Text>

          <Section style={card}>
            <Row label="Name" value={data.name} />
            <Row label="Email" value={data.email} />
            <Row label="Phone" value={data.phone} />
            <Row label="Condition" value={data.condition} />
            <Row label="Preferred contact" value={data.preferredContact} />
            <Row label="Source page" value={data.source ?? "unknown"} />
          </Section>

          {campaign.length > 0 ? (
            <Section style={card}>
              <Text style={label}>Campaign attribution</Text>
              {campaign.map(([k, v]) => (
                <Row key={k} label={k} value={v} />
              ))}
            </Section>
          ) : null}

          {data.message ? (
            <Section style={card}>
              <Text style={label}>Message</Text>
              <Text style={messageText}>{data.message}</Text>
            </Section>
          ) : null}

          <Text style={footer}>
            Reply to this email to respond directly to the patient.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <Text style={row}>
      <strong>{label}:</strong> {value}
    </Text>
  );
}

const body: React.CSSProperties = {
  backgroundColor: "#f5efe4",
  margin: 0,
  padding: "40px 0",
  fontFamily:
    "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
};
const container: React.CSSProperties = {
  maxWidth: 560,
  margin: "0 auto",
  background: "#ffffff",
  borderRadius: 12,
  padding: 32,
};
const h1: React.CSSProperties = {
  color: "#0e5c5e",
  fontSize: 22,
  margin: 0,
};
const meta: React.CSSProperties = {
  color: "#4b5c5e",
  fontSize: 13,
  marginTop: 4,
  marginBottom: 24,
};
const card: React.CSSProperties = {
  background: "#fafbfb",
  borderRadius: 8,
  padding: 16,
  marginBottom: 16,
};
const row: React.CSSProperties = {
  margin: "4px 0",
  fontSize: 14,
  color: "#0f1b1c",
};
const label: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 600,
  color: "#4b5c5e",
  marginBottom: 4,
};
const messageText: React.CSSProperties = {
  fontSize: 14,
  color: "#0f1b1c",
  margin: 0,
  whiteSpace: "pre-wrap",
};
const footer: React.CSSProperties = {
  fontSize: 12,
  color: "#4b5c5e",
  textAlign: "center",
  marginTop: 24,
};

export default ConsultationLeadEmail;
