interface ReassuranceLineProps {
  /** Visual theme: "light" for dark backgrounds, "dark" for light backgrounds */
  tone?: "light" | "dark";
  className?: string;
  items?: string[];
}

const DEFAULT_ITEMS = [
  "Free & no obligation",
  "Medicare & major insurers accepted",
  "Honest answers from our physicians",
];

/**
 * Small friction-reducing trust microcopy shown beneath primary CTAs.
 */
export function ReassuranceLine({
  tone = "dark",
  className = "",
  items = DEFAULT_ITEMS,
}: ReassuranceLineProps) {
  const text = tone === "light" ? "text-white/80" : "text-[var(--color-ink-muted)]";
  const check =
    tone === "light" ? "text-white/70" : "text-[var(--color-brand-500)]";
  return (
    <ul
      className={`flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm ${text} ${className}`}
    >
      {items.map((it) => (
        <li key={it} className="flex items-center gap-1.5">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            aria-hidden
            className={`shrink-0 ${check}`}
          >
            <path
              d="M5 12l4 4L19 7"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          {it}
        </li>
      ))}
    </ul>
  );
}
