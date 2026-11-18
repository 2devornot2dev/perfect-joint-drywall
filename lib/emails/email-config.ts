// lib/emails/email-config.ts

// Must be a public https URL: email clients can't load localhost or relative paths
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://perfectjointdrywall.com"
).replace(/\/$/, "");

export const LOGO_URL = `https://res.cloudinary.com/dmllgn0t7/image/upload/v1795045151/logo-no-text.png`;

export const BUSINESS = {
  name: "Perfect Joint Drywall",
  tagline: "Drywall & Carpentry",
  phone: "(647) 514-2453",
  phoneHref: "tel:+16475142453",
  email: "info@perfectjointdrywall.com",
  serviceArea: "Greater Toronto & Surrounding Areas",
} as const;

// Emails can't use Tailwind or CSS variables, so these mirror your theme as hex.
// primary = logo teal (blue-500 in globals.css)
export const COLORS = {
  primary: "#097680",
  primarySoft: "#d9f1f3",
  primaryText: "#ffffff",
  heading: "#1c1917",
  body: "#57534e",
  muted: "#a8a29e",
  border: "#e7e5e4",
  surface: "#fafaf9",
  page: "#f5f5f4",
  card: "#ffffff",
} as const;

export const FONT_STACK =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';