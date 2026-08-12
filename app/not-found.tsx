"use client";

import { useEffect } from "react";
import Link from "next/link";
import { site } from "@/lib/data/site";
import { trackClick, trackEvent } from "@/lib/analytics/track";

export default function NotFound() {
  // Fire a single not_found_view event when a user lands on the 404 page.
  // Combined with the CTA click events below, this gives GTM a full
  // "user hit broken page → user recovered" funnel: how many users
  // land on 404 in the first place, and of those, how many click a
  // recovery CTA (back home / conditions / call).
  useEffect(() => {
    trackEvent("not_found_view", { page_location: typeof window !== "undefined" ? window.location.pathname : "/" });
  }, []);

  return (
    <section className="section bg-[var(--color-sand-100)]">
      <div className="container-page max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-brand-500)]">
          404
        </p>
        <h1 className="mt-3 font-display text-4xl lg:text-5xl font-semibold">
          We can&rsquo;t find that page.
        </h1>
        <p className="mt-4 text-[var(--color-ink-muted)] text-lg">
          The link may have changed, or the page may no longer exist. Try one
          of the links below &mdash; or give us a call.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-[var(--color-brand-500)] text-white px-6 py-3 font-semibold"
            onClick={trackClick("cta_click", {
              location: "404_page",
              cta_label: "back_to_home",
            })}
          >
            Back to home
          </Link>
          <Link
            href="/conditions/"
            className="inline-flex items-center justify-center rounded-full border border-[var(--color-brand-500)] text-[var(--color-brand-500)] px-6 py-3 font-semibold"
            onClick={trackClick("cta_click", {
              location: "404_page",
              cta_label: "view_conditions",
            })}
          >
            Conditions we treat
          </Link>
          <a
            href={`tel:${site.phoneE164}`}
            className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] text-white px-6 py-3 font-semibold"
            onClick={trackClick("phone_call", {
              location: "404_page",
              cta_label: "call_cta",
            })}
          >
            Call {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
