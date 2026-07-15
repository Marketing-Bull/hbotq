import { Resend } from "resend";
import { site } from "@/lib/data/site";
import { ConsultationLeadEmail } from "@/lib/email/templates/consultation-lead";
import type { ConsultationInput } from "@/lib/validation/consultation";

let cached: Resend | null = null;

export function getResend(): Resend | null {
  if (cached) return cached;
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  cached = new Resend(key);
  return cached;
}

/**
 * Email a consultation lead to the destination inbox via Resend.
 *
 * Returns "sent" on success, "skipped" when RESEND_API_KEY is unset, or
 * "error" on any failure (thrown or returned by the Resend API). Never throws.
 */
export async function sendLeadEmail(
  data: ConsultationInput,
  receivedAt: string,
): Promise<"sent" | "skipped" | "error"> {
  const resend = getResend();
  if (!resend) return "skipped";

  const to = process.env.LEAD_TO_EMAIL || site.leadEmail;

  try {
    const { error } = await resend.emails.send({
      from: site.fromEmail,
      to: [to],
      replyTo: data.email,
      subject: `New consultation request — ${data.name} (${data.condition})`,
      react: ConsultationLeadEmail({ data, receivedAt }),
    });
    if (error) {
      console.error("[consultation] resend error:", error);
      return "error";
    }
    return "sent";
  } catch (err) {
    console.error("[consultation] resend error:", err);
    return "error";
  }
}
