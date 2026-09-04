import Link from "next/link";
import type { ConditionListing } from "@/types/content";

const STATUS_LABEL: Record<ConditionListing["status"], string> = {
  "on-label": "FDA-Approved",
  "off-label": "Off-Label",
  wellness: "Wellness",
};

const STATUS_CLASS: Record<ConditionListing["status"], string> = {
  "on-label": "bg-[var(--color-brand-50)] text-[var(--color-brand-600)]",
  "off-label": "bg-[var(--color-sand-200)] text-[var(--color-ink-muted)]",
  wellness: "bg-[var(--color-sand-200)] text-[var(--color-ink-muted)]",
};

export function ConditionCard({ listing }: { listing: ConditionListing }) {
  return (
    <Link
      href={listing.href}
      className="group block rounded-2xl border border-[var(--color-surface-border)] bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--color-brand-300)] hover:shadow-lg"
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-xl font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-brand-500)]">
          {listing.name}
        </h3>
        <span
          className={`shrink-0 text-xs font-semibold px-2 py-1 rounded-full ${
            STATUS_CLASS[listing.status]
          }`}
        >
          {STATUS_LABEL[listing.status]}
        </span>
      </div>
      <p className="mt-3 text-sm text-[var(--color-ink-muted)] leading-relaxed">
        {listing.summary}
      </p>
      <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-brand-500)]">
        Learn more
        <span
          aria-hidden
          className="transition-transform duration-200 group-hover:translate-x-1"
        >
          →
        </span>
      </p>
    </Link>
  );
}
