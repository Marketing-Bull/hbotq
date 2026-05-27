import { NextResponse } from "next/server";
import { consultationSchema } from "@/lib/validation/consultation";
import { getResend } from "@/lib/email/resend";
import { ConsultationLeadEmail } from "@/lib/email/templates/consultation-lead";
import { site } from "@/lib/data/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RATE_WINDOW_MS = 15_000;
const ipHits = new Map<string, number>();

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: Request) {
  const ip = clientIp(req);
  const now = Date.now();
  const last = ipHits.get(ip) ?? 0;
  if (now - last < RATE_WINDOW_MS) {
    return NextResponse.json(
      { ok: false, error: "Please wait a moment and try again." },
      { status: 429 },
    );
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  // Honeypot: if the hidden field has any value, silently accept and discard.
  // Run this before validation so bots can't tell they were caught.
  if (
    raw &&
    typeof raw === "object" &&
    "website" in raw &&
    typeof (raw as { website?: unknown }).website === "string" &&
    ((raw as { website: string }).website ?? "").length > 0
  ) {
    return NextResponse.json({ ok: true });
  }

  const parsed = consultationSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const path = issue.path.join(".");
      if (path && !fieldErrors[path]) fieldErrors[path] = issue.message;
    }
    return NextResponse.json(
      { ok: false, fieldErrors },
      { status: 400 },
    );
  }

  const data = parsed.data;
  ipHits.set(ip, now);

  const resend = getResend();
  const to = process.env.LEAD_TO_EMAIL || site.leadEmail;

  if (!resend) {
    // In dev without RESEND_API_KEY, log the lead and return success so the
    // funnel can be tested end-to-end. Production must have the key set.
    if (process.env.NODE_ENV !== "production") {
      console.warn("[consultation] RESEND_API_KEY not set — logging lead:", {
        ...data,
        ip,
      });
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json(
      { ok: false, error: "Email service is not configured." },
      { status: 500 },
    );
  }

  try {
    await resend.emails.send({
      from: site.fromEmail,
      to: [to],
      replyTo: data.email,
      subject: `New consultation request — ${data.name} (${data.condition})`,
      react: ConsultationLeadEmail({
        data,
        receivedAt: new Date().toLocaleString("en-US", {
          timeZone: "America/New_York",
        }),
      }),
    });
  } catch (err) {
    console.error("[consultation] resend error:", err);
    return NextResponse.json(
      { ok: false, error: "Could not send your message. Please call us." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ ok: false, error: "Method not allowed" }, {
    status: 405,
    headers: { Allow: "POST" },
  });
}
