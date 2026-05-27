import type { Testimonial } from "@/types/content";

export function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="rounded-2xl bg-white border border-[var(--color-surface-border)] p-7 lg:p-9 h-full flex flex-col">
      {t.rating ? (
        <div className="flex items-center gap-0.5 mb-4 text-[var(--color-accent)]">
          {Array.from({ length: t.rating }).map((_, i) => (
            <svg key={i} width="18" height="18" viewBox="0 0 24 24" aria-hidden>
              <path
                d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"
                fill="currentColor"
              />
            </svg>
          ))}
          <span className="sr-only">{t.rating} out of 5 stars</span>
        </div>
      ) : null}
      <blockquote className="text-lg leading-relaxed text-[var(--color-ink)] flex-1">
        “{t.quote}”
      </blockquote>
      <figcaption className="mt-6 text-sm">
        <span className="font-semibold text-[var(--color-ink)]">
          {t.author}
        </span>
        <span className="text-[var(--color-ink-muted)]"> — {t.conditionLabel}</span>
      </figcaption>
    </figure>
  );
}
