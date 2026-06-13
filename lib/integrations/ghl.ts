import type { ConsultationInput } from "@/lib/validation/consultation";
import { CONDITION_OPTIONS } from "@/lib/validation/consultation";

/** Inbound webhook URL for the GoHighLevel workflow trigger, if configured. */
export function getGhlWebhookUrl(): string | null {
  return process.env.GHL_WEBHOOK_URL?.trim() || null;
}

function splitName(full: string): { firstName: string; lastName: string } {
  const parts = full.trim().split(/\s+/);
  const firstName = parts.shift() ?? full;
  return { firstName, lastName: parts.join(" ") };
}

export interface GhlLeadMeta {
  /** Human-readable receipt time (US Eastern). */
  receivedAt: string;
  /** ISO 8601 submission timestamp. */
  submittedAt: string;
  ip?: string;
}

/**
 * POST a consultation lead to the configured GoHighLevel inbound webhook.
 *
 * Returns "sent" on a 2xx response, "skipped" when no webhook URL is
 * configured, or "error" on any failure. Never throws — the caller decides
 * what a single failed channel means for the overall response.
 */
export async function sendLeadToGhl(
  data: ConsultationInput,
  meta: GhlLeadMeta,
): Promise<"sent" | "skipped" | "error"> {
  const url = getGhlWebhookUrl();
  if (!url) return "skipped";

  const { firstName, lastName } = splitName(data.name);
  const conditionLabel =
    CONDITION_OPTIONS.find((o) => o.value === data.condition)?.label ??
    data.condition;

  // Keys chosen to map cleanly onto GHL contact fields in the workflow builder.
  const payload = {
    first_name: firstName,
    last_name: lastName,
    name: data.name,
    email: data.email,
    phone: data.phone,
    condition: data.condition,
    condition_label: conditionLabel,
    preferred_contact: data.preferredContact,
    message: data.message,
    source: data.source,
    received_at: meta.receivedAt,
    submitted_at: meta.submittedAt,
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      // GHL webhooks are normally fast; cap the wait so a slow CRM never hangs
      // the patient's request.
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      console.error(`[consultation] GHL webhook responded ${res.status}`);
      return "error";
    }
    return "sent";
  } catch (err) {
    console.error("[consultation] GHL webhook error:", err);
    return "error";
  }
}
