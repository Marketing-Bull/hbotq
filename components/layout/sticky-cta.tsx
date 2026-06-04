"use client";

import Link from "next/link";
import { site } from "@/lib/data/site";
import { trackClick } from "@/lib/analytics/track";

export function StickyCta() {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 border-t border-[var(--color-surface-border)] bg-white/95 backdrop-blur">
      <div className="container-page py-2 grid grid-cols-2 gap-2">
        <a
          href={`tel:${site.phoneE164}`}
          onClick={trackClick("phone_call", { location: "sticky_cta" })}
          className="inline-flex items-center justify-center rounded-full bg-[var(--color-brand-500)] text-white px-4 py-3 text-sm font-semibold"
          aria-label={`Call ${site.phone}`}
        >
          Call
        </a>
        <Link
          href="/contact-us/"
          className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] text-white px-4 py-3 text-sm font-semibold"
        >
          Book consultation
        </Link>
      </div>
    </div>
  );
}
