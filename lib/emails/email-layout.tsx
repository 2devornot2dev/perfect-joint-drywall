// lib/emails/email-layout.tsx
import * as React from "react";
import {
  Html,
  Head,
  Body,
  Preview,
  Container,
  Section,
  Row,
  Column,
  Img,
  Text,
  Link,
} from "react-email";
import { BUSINESS, COLORS, FONT_STACK, LOGO_URL } from "./email-config";

export const emailStyles = {
  eyebrow: {
    margin: "0 0 12px",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: COLORS.primary,
  },
  h1: {
    margin: "0 0 16px",
    fontSize: 30,
    lineHeight: "38px",
    fontWeight: 800,
    letterSpacing: "-0.02em",
    color: COLORS.heading,
  },
  p: {
    margin: "0 0 20px",
    fontSize: 16,
    lineHeight: "26px",
    color: COLORS.body,
  },
  label: {
    margin: "0 0 4px",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: COLORS.muted,
  },
  value: {
    margin: 0,
    fontSize: 16,
    lineHeight: "24px",
    fontWeight: 600,
    color: COLORS.heading,
  },
  button: {
    display: "inline-block",
    backgroundColor: COLORS.primary,
    color: COLORS.primaryText,
    borderRadius: 10,
    padding: "14px 24px",
    fontSize: 15,
    fontWeight: 600,
    textDecoration: "none",
    textAlign: "center",
  },
} satisfies Record<string, React.CSSProperties>;

type EmailLayoutProps = {
  preview: string;
  children: React.ReactNode;
};

export function EmailLayout({ preview, children }: EmailLayoutProps) {
  return (
    <Html lang="en">
      <Head>
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />
      </Head>
      <Preview>{preview}</Preview>

      <Body
        style={{
          margin: 0,
          padding: "40px 16px",
          backgroundColor: COLORS.page,
          fontFamily: FONT_STACK,
        }}
      >
        <Container style={{ maxWidth: 600, margin: "0 auto" }}>
          {/* Brand header */}
          <Section style={{ paddingBottom: 24 }}>
            <Row>
              <Column style={{ width: 56, verticalAlign: "middle" }}>
                <Img
                  src={LOGO_URL}
                  width={44}
                  height={44}
                  alt=""
                  style={{ display: "block" }}
                />
              </Column>
              <Column style={{ verticalAlign: "middle" }}>
                <Text
                  style={{
                    margin: 0,
                    fontSize: 18,
                    lineHeight: "22px",
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                    color: COLORS.heading,
                  }}
                >
                  Perfect Joint
                </Text>
                <Text
                  style={{
                    margin: 0,
                    fontSize: 11,
                    lineHeight: "16px",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: COLORS.primary,
                  }}
                >
                  {BUSINESS.tagline}
                </Text>
              </Column>
            </Row>
          </Section>

          {/* Card */}
          <Section
            style={{
              backgroundColor: COLORS.card,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 16,
              padding: "40px 36px",
            }}
          >
            {children}
          </Section>

          {/* Footer */}
          <Section style={{ paddingTop: 24, textAlign: "center" }}>
            <Text
              style={{
                margin: "0 0 4px",
                fontSize: 13,
                lineHeight: "20px",
                fontWeight: 600,
                color: COLORS.body,
              }}
            >
              {BUSINESS.name}
            </Text>
            <Text
              style={{
                margin: "0 0 4px",
                fontSize: 12,
                lineHeight: "20px",
                color: COLORS.muted,
              }}
            >
              {BUSINESS.serviceArea}
            </Text>
            <Text
              style={{
                margin: 0,
                fontSize: 12,
                lineHeight: "20px",
                color: COLORS.muted,
              }}
            >
              <Link
                href={BUSINESS.phoneHref}
                style={{ color: COLORS.muted, textDecoration: "underline" }}
              >
                {BUSINESS.phone}
              </Link>
              {"  ·  "}
              <Link
                href={`mailto:${BUSINESS.email}`}
                style={{ color: COLORS.muted, textDecoration: "underline" }}
              >
                {BUSINESS.email}
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}