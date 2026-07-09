import Link from "next/link";
import Image from "next/image";
import { physicians } from "@/lib/data/physicians";

/** Date this clinical content was last reviewed by a physician. */
export const LAST_MEDICALLY_REVIEWED = "June 2026";
/** ISO form for schema.org lastReviewed. */
export const LAST_MEDICALLY_REVIEWED_ISO = "2026-06-01";

/**
 * E-E-A-T byline: shows who medically reviewed the page and when.
 * Defaults to the practice's board-certified physician.
 */
export function MedicalReviewer({
  reviewerSlug = "dr-manoj-sadhnani",
}: {
  reviewerSlug?: string;
}) {
  const reviewer =
    physicians.find((p) => p.slug === reviewerSlug) ?? physicians[0];
  if (!reviewer) return null;

  return (
    <div className="flex items-center gap-3 rounded-xl border border-[var(--color-surface-border)] bg-white px-4 py-3">
      {reviewer.image ? (
        <Image
          src={reviewer.image}
          alt={reviewer.name}
          width={44}
          height={44}
          className="h-11 w-11 rounded-full object-cover ring-1 ring-[var(--color-surface-border)]"
        />
      ) : null}
      <div className="text-sm leading-snug">
        <p className="text-[var(--color-ink-muted)]">
          Medically reviewed by{" "}
          <Link
            href={`/physicians/${reviewer.slug}/`}
            className="font-semibold text-[var(--color-ink)] hover:text-[var(--color-brand-500)]"
          >
            {reviewer.name}
          </Link>
        </p>
        <p className="text-[var(--color-ink-muted)]">
          {reviewer.title} · Last reviewed {LAST_MEDICALLY_REVIEWED}
        </p>
      </div>
    </div>
  );
}
