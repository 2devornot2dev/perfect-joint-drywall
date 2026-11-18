// lib/actions/send-contact-email.ts
"use server";

import { sendEmail, EMAIL_TO } from "@/lib/resend";
import { getProjectTypeLabel } from "@/lib/types/project-types";
import ConfirmationEmail from "@/lib/emails/confirmation-email";
import FormEmail from "@/lib/emails/form-email";

type ContactFormInput = {
  name: string;
  phone: string;
  email: string;
  projectType: string;
  details: string;
  website?: string; // honeypot: real users never fill this
};

type ContactFormResult = { success: true } | { success: false; error: string };

const GENERIC_ERROR =
  "Something went wrong. Please try again or call us at (647) 514-2453.";
const INVALID_ERROR = "Please check your details and try again.";

// Single-line fields: strip newlines so nothing can leak into email subjects/headers
function singleLine(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.replace(/[\r\n\t]+/g, " ").replace(/\s{2,}/g, " ").trim().slice(0, max);
}

function multiLine(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.replace(/\r\n/g, "\n").trim().slice(0, max);
}

export async function sendContactEmail(
  input: ContactFormInput
): Promise<ContactFormResult> {
  try {
    // Bots fill the hidden field: pretend it worked, send nothing
    if (input.website) return { success: true };

    const name = singleLine(input.name, 100);
    const phone = singleLine(input.phone, 30);
    const email = singleLine(input.email, 254);
    const details = multiLine(input.details, 3000);
    const projectTypeLabel = getProjectTypeLabel(String(input.projectType));

    const phoneDigits = phone.replace(/\D/g, "");
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

    if (
      !name ||
      !details ||
      !projectTypeLabel ||
      !emailOk ||
      phoneDigits.length < 7 ||
      phoneDigits.length > 15
    ) {
      return { success: false, error: INVALID_ERROR };
    }

    const submittedAt = new Date().toLocaleString("en-CA", {
      timeZone: "America/Toronto",
      dateStyle: "medium",
      timeStyle: "short",
    });

    // 1. Owner first: this is the lead, it must not be lost
    const ownerResult = await sendEmail({
      to: EMAIL_TO,
      subject: `New quote request: ${projectTypeLabel} (${name})`,
      replyTo: email, // hitting Reply goes straight to the customer
      template: FormEmail({
        name,
        phone,
        email,
        projectType: projectTypeLabel,
        details,
        submittedAt,
      }),
    });

    if (!ownerResult.success) {
      return { success: false, error: GENERIC_ERROR };
    }

    // 2. Customer confirmation: best effort. A typo'd email shouldn't fail the request
    const customerResult = await sendEmail({
      to: email,
      subject: "We received your request | Perfect Joint Drywall",
      template: ConfirmationEmail({
        name,
        projectType: projectTypeLabel,
        details,
      }),
    });

    if (!customerResult.success) {
      console.error("⚠️ Confirmation email failed, owner email was sent:", email);
    }

    return { success: true };
  } catch (error) {
    console.error("❌ sendContactEmail failed:", error);
    return { success: false, error: GENERIC_ERROR };
  }
}