// lib/emails/confirmation-email.tsx
import * as React from "react";
import { Heading, Text, Section, Row, Column, Button, Hr } from "react-email";
import { BUSINESS, COLORS } from "./email-config";
import { EmailLayout, emailStyles } from "./email-layout";

interface ConfirmationEmailProps {
  name: string;
  projectType: string;
  details: string;
}

const steps = [
  {
    title: "We review your request",
    text: "We read through your project details so we come prepared.",
  },
  {
    title: "We give you a call",
    text: "Expect to hear from us within 24 hours to talk through the job.",
  },
  {
    title: "Free, no-obligation quote",
    text: "Honest, itemized pricing with no pressure to commit.",
  },
];

export default function ConfirmationEmail({
  name,
  projectType,
  details,
}: ConfirmationEmailProps) {
  const firstName = name.split(/\s+/)[0];
  const excerpt =
    details.length > 400 ? `${details.slice(0, 400).trimEnd()}…` : details;

  return (
    <EmailLayout
      preview={`Thanks ${firstName}, we've received your request and will be in touch within 24 hours.`}
    >
      <Text style={emailStyles.eyebrow}>Request received</Text>
      <Heading as="h1" style={emailStyles.h1}>
        Thanks, {firstName}. We&rsquo;ve got it.
      </Heading>
      <Text style={emailStyles.p}>
        Your request is in. One of our team members will review it and get back
        to you within 24 hours.
      </Text>

      {/* Summary of what they sent */}
      <Section
        style={{
          backgroundColor: COLORS.surface,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 12,
          padding: "20px 24px",
          margin: "8px 0 32px",
        }}
      >
        <Text style={emailStyles.label}>Project type</Text>
        <Text style={emailStyles.value}>{projectType}</Text>

        <Text style={{ ...emailStyles.label, marginTop: 20 }}>Your message</Text>
        <Text
          style={{
            ...emailStyles.p,
            margin: 0,
            fontSize: 15,
            lineHeight: "24px",
            whiteSpace: "pre-wrap",
          }}
        >
          {excerpt}
        </Text>
      </Section>

      <Hr style={{ borderColor: COLORS.border, margin: "0 0 28px" }} />

      {/* What happens next */}
      <Text style={{ ...emailStyles.eyebrow, margin: "0 0 20px" }}>
        What happens next
      </Text>

      {steps.map((step, i) => (
        <Row key={step.title} style={{ marginBottom: 18 }}>
          <Column style={{ width: 48, verticalAlign: "top" }}>
            <div
              style={{
                width: 32,
                height: 32,
                lineHeight: "32px",
                borderRadius: 16,
                backgroundColor: COLORS.primarySoft,
                color: COLORS.primary,
                textAlign: "center",
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              {i + 1}
            </div>
          </Column>
          <Column style={{ verticalAlign: "top" }}>
            <Text
              style={{
                margin: "0 0 2px",
                fontSize: 16,
                lineHeight: "24px",
                fontWeight: 700,
                color: COLORS.heading,
              }}
            >
              {step.title}
            </Text>
            <Text
              style={{
                margin: 0,
                fontSize: 14,
                lineHeight: "22px",
                color: COLORS.body,
              }}
            >
              {step.text}
            </Text>
          </Column>
        </Row>
      ))}

      {/* CTA */}
      <Section style={{ paddingTop: 16 }}>
        <Text style={{ ...emailStyles.p, marginBottom: 16 }}>
          Urgent job? Give us a call and we&rsquo;ll get you sorted faster.
        </Text>
        <Button href={BUSINESS.phoneHref} style={emailStyles.button}>
          Call {BUSINESS.phone}
        </Button>
      </Section>

      <Text style={{ ...emailStyles.p, margin: "32px 0 0" }}>
        Talk soon,
        <br />
        <strong style={{ color: COLORS.heading }}>The Perfect Joint team</strong>
      </Text>
    </EmailLayout>
  );
}