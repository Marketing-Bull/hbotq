"use client";

import Link from "next/link";
import { trackClick } from "@/lib/analytics/track";
import type { WellnessUse } from "@/types/content";

/**
 * Wellness hub card grid — client component so onClick dataLayer events
 * fire for each card click.
 *
 * Events:
 *   cta_click { location: "wellness_grid", cta_label: <use.name> }
 *   cta_click { location: "wellness_conditions_cta", cta_label: "FDA-approved conditions" }
 */
export function WellnessCardGrid({ uses }: { uses: WellnessUse[] }) {
  return (
    <>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {uses.map((w) => (
          <Link
            key={w.slug}
            href={`/wellness/${w.slug}/`}
            onClick={trackClick("cta_click", {
              location: "wellness_grid",
              cta_label: w.name,
            })}
            className="group rounded-2xl bg-[var(--color-sand-100)] p-6 border border-[var(--color-surface-border)] transition-all duration-200 hover:-translate-y-1 hover:border-[var(--color-brand-300)] hover:shadow-lg"
          >
            <h3 className="font-display text-xl font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-brand-500)]">
              {w.name}
            </h3>
            <p className="mt-3 text-[var(--color-ink-muted)] leading-relaxed">
              {w.summary}
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-brand-500)]">
              Learn more
              <span
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </span>
          </Link>
        ))}
      </div>
      <p className="mt-10 max-w-3xl text-sm text-[var(--color-ink-muted)]">
        Looking for treatment of a medical condition? See our{" "}
        <Link
          href="/conditions/"
          onClick={trackClick("cta_click", {
            location: "wellness_conditions_cta",
            cta_label: "FDA-approved conditions",
          })}
          className="font-semibold text-[var(--color-brand-500)] hover:underline"
        >
          FDA-approved conditions
        </Link>
        .
      </p>
    </>
  );
}
