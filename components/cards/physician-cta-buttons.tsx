"use client";

import Link from "next/link";
import { trackClick } from "@/lib/analytics/track";
import { site } from "@/lib/data/site";

/**
 * Physician profile page primary CTAs — extracted as a client component so
 * onClick dataLayer events can fire from the otherwise server-rendered page.
 *
 * Events fired:
 *   cta_click  { location: "physician_profile", cta_label: "book_consultation" }
 *   phone_call { location: "physician_profile", cta_label: "call_cta" }
 */
export function PhysicianCtaButtons() {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <Link
        href="/contact-us/"
        onClick={trackClick("cta_click", {
          location: "physician_profile",
          cta_label: "book_consultation",
        })}
        className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] text-white px-6 py-3 font-semibold hover:bg-[var(--color-accent-hover)]"
      >
        Book a consultation
      </Link>
      <a
        href={`tel:${site.phoneE164}`}
        onClick={trackClick("phone_call", {
          location: "physician_profile",
          cta_label: "call_cta",
        })}
        className="inline-flex items-center justify-center rounded-full border border-[var(--color-brand-500)] text-[var(--color-brand-500)] px-6 py-3 font-semibold hover:bg-[var(--color-brand-50)]"
      >
        Call {site.phone}
      </a>
    </div>
  );
}
