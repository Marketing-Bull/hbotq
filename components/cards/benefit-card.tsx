import type { Benefit } from "@/types/content";

const ICONS: Record<Benefit["icon"], React.ReactNode> = {
  oxygen: (
    <path
      d="M12 3C8 8 6 11 6 14a6 6 0 0 0 12 0c0-3-2-6-6-11z"
      stroke="currentColor"
      strokeWidth="1.8"
      fill="none"
      strokeLinejoin="round"
    />
  ),
  healing: (
    <path
      d="M4 12s3-7 8-7 8 7 8 7-3 7-8 7-8-7-8-7z M12 9v6 M9 12h6"
      stroke="currentColor"
      strokeWidth="1.8"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  immune: (
    <path
      d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z"
      stroke="currentColor"
      strokeWidth="1.8"
      fill="none"
      strokeLinejoin="round"
    />
  ),
  recovery: (
    <path
      d="M12 4v6l4 2 M21 12a9 9 0 1 1-9-9"
      stroke="currentColor"
      strokeWidth="1.8"
      fill="none"
      strokeLinecap="round"
    />
  ),
  brain: (
    <path
      d="M9 4a3 3 0 0 0-3 3v2a3 3 0 0 0-2 3 3 3 0 0 0 2 3v2a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-2a3 3 0 0 0 2-3 3 3 0 0 0-2-3V7a3 3 0 0 0-3-3z"
      stroke="currentColor"
      strokeWidth="1.8"
      fill="none"
      strokeLinejoin="round"
    />
  ),
  energy: (
    <path
      d="M13 2L4 14h7l-1 8 9-12h-7z"
      stroke="currentColor"
      strokeWidth="1.8"
      fill="none"
      strokeLinejoin="round"
    />
  ),
};

export function BenefitCard({ benefit }: { benefit: Benefit }) {
  return (
    <div className="group rounded-2xl bg-white border border-[var(--color-surface-border)] p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-[var(--color-brand-200)]">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--color-brand-50)] text-[var(--color-brand-500)] transition-all duration-200 group-hover:bg-[var(--color-brand-500)] group-hover:text-white">
        <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden>
          {ICONS[benefit.icon]}
        </svg>
      </div>
      <h3 className="mt-5 font-display text-lg font-semibold leading-snug">
        {benefit.title}
      </h3>
      <p className="mt-2 text-sm text-[var(--color-ink-muted)] leading-relaxed">
        {benefit.description}
      </p>
    </div>
  );
}
