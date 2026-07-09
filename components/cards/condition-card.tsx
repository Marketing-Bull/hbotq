import Link from "next/link";
import type { Condition } from "@/types/content";

export function ConditionCard({ condition }: { condition: Condition }) {
  return (
    <Link
      href={`/condition/${condition.slug}/`}
      className="group block rounded-2xl border border-[var(--color-surface-border)] bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--color-brand-300)] hover:shadow-lg"
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-xl font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-brand-500)]">
          {condition.name}
        </h3>
        <span
          className={`shrink-0 text-xs font-semibold px-2 py-1 rounded-full ${
            condition.fdaStatus === "on-label"
              ? "bg-[var(--color-brand-50)] text-[var(--color-brand-600)]"
              : "bg-[var(--color-sand-200)] text-[var(--color-ink-muted)]"
          }`}
        >
          {condition.fdaStatus === "on-label" ? "FDA-Approved" : "Off-Label"}
        </span>
      </div>
      <p className="mt-3 text-sm text-[var(--color-ink-muted)] leading-relaxed">
        {condition.summary}
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
