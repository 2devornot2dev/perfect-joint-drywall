// lib/emails/form-email.tsx
import * as React from "react";
import { Heading, Text, Link, Section, Row, Column, Button } from "react-email";
import { COLORS } from "./email-config";
import { EmailLayout, emailStyles } from "./email-layout";

interface FormEmailProps {
  name: string;
  phone: string;
  email: string;
  projectType: string;
  details: string;
  submittedAt: string;
}

const rowStyle = {
  borderBottom: `1px solid ${COLORS.border}`,
  padding: "14px 0",
} satisfies React.CSSProperties;

export default function FormEmail({
  name,
  phone,
  email,
  projectType,
  details,
  submittedAt,
}: FormEmailProps) {
  const telHref = `tel:${phone.replace(/[^\d+]/g, "")}`;
  const replyHref = `mailto:${email}?subject=${encodeURIComponent(
    "Re: your drywall quote request"
  )}`;

  return (
    <EmailLayout preview={`New ${projectType} request from ${name}`}>
      <Text style={emailStyles.eyebrow}>New quote request</Text>
      <Heading as="h1" style={{ ...emailStyles.h1, marginBottom: 20 }}>
        {name} wants a quote
      </Heading>

      {/* Project pill */}
      <Text style={{ margin: "0 0 28px" }}>
        <span
          style={{
            display: "inline-block",
            backgroundColor: COLORS.primarySoft,
            color: COLORS.primary,
            borderRadius: 999,
            padding: "6px 14px",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          {projectType}
        </span>
      </Text>

      {/* Contact details */}
      <Section
        style={{ borderTop: `1px solid ${COLORS.border}`, marginBottom: 28 }}
      >
        <Row style={rowStyle}>
          <Column style={{ width: 96, verticalAlign: "top" }}>
            <Text style={{ ...emailStyles.label, margin: "3px 0 0" }}>Name</Text>
          </Column>
          <Column>
            <Text style={emailStyles.value}>{name}</Text>
          </Column>
        </Row>
        <Row style={rowStyle}>
          <Column style={{ width: 96, verticalAlign: "top" }}>
            <Text style={{ ...emailStyles.label, margin: "3px 0 0" }}>Phone</Text>
          </Column>
          <Column>
            <Text style={emailStyles.value}>
              <Link
                href={telHref}
                style={{ color: COLORS.primary, textDecoration: "none" }}
              >
                {phone}
              </Link>
            </Text>
          </Column>
        </Row>
        <Row style={rowStyle}>
          <Column style={{ width: 96, verticalAlign: "top" }}>
            <Text style={{ ...emailStyles.label, margin: "3px 0 0" }}>Email</Text>
          </Column>
          <Column>
            <Text style={emailStyles.value}>
              <Link
                href={`mailto:${email}`}
                style={{ color: COLORS.primary, textDecoration: "none" }}
              >
                {email}
              </Link>
            </Text>
          </Column>
        </Row>
      </Section>

      {/* Message */}
      <Text style={emailStyles.label}>Project details</Text>
      <Section
        style={{
          backgroundColor: COLORS.surface,
          borderLeft: `3px solid ${COLORS.primary}`,
          borderRadius: 8,
          padding: "16px 20px",
          margin: "8px 0 32px",
        }}
      >
        <Text
          style={{
            margin: 0,
            fontSize: 15,
            lineHeight: "24px",
            color: COLORS.heading,
            whiteSpace: "pre-wrap",
          }}
        >
          {details}
        </Text>
      </Section>

      {/* Actions */}
      <Section>
        <Row>
          <Column style={{ width: "50%", paddingRight: 6 }}>
            <Button
              href={telHref}
              style={{
                ...emailStyles.button,
                display: "block",
                boxSizing: "border-box",
              }}
            >
              Call {name.split(/\s+/)[0]}
            </Button>
          </Column>
          <Column style={{ width: "50%", paddingLeft: 6 }}>
            <Button
              href={replyHref}
              style={{
                ...emailStyles.button,
                display: "block",
                boxSizing: "border-box",
                backgroundColor: COLORS.card,
                color: COLORS.heading,
                border: `1px solid ${COLORS.border}`,
              }}
            >
              Reply by email
            </Button>
          </Column>
        </Row>
      </Section>

      <Text
        style={{
          margin: "28px 0 0",
          fontSize: 12,
          lineHeight: "18px",
          color: COLORS.muted,
          textAlign: "center",
        }}
      >
        Submitted {submittedAt} via perfectjointdrywall.com
      </Text>
    </EmailLayout>
  );
}