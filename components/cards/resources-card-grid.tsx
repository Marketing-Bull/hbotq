"use client";

import Link from "next/link";
import { trackClick } from "@/lib/analytics/track";
import type { Article } from "@/types/content";

/**
 * Resources hub card grid — client component so onClick dataLayer events
 * fire for each article card click.
 *
 * Event: cta_click { location: "resources_grid", cta_label: <article.title> }
 */
export function ResourcesCardGrid({ articles }: { articles: Article[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((a) => (
        <Link
          key={a.slug}
          href={`/resources/${a.slug}/`}
          onClick={trackClick("cta_click", {
            location: "resources_grid",
            cta_label: a.title,
          })}
          className="group flex flex-col rounded-2xl border border-[var(--color-surface-border)] bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--color-brand-300)] hover:shadow-lg"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-brand-500)]">
            {a.readMinutes} min read
          </p>
          <h2 className="mt-3 font-display text-xl font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-brand-500)]">
            {a.title}
          </h2>
          <p className="mt-3 flex-1 text-[var(--color-ink-muted)] leading-relaxed">
            {a.excerpt}
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-brand-500)]">
            Read the guide
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
  );
}
