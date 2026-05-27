export function TrustBar() {
  const items = [
    "FDA-Approved Indications",
    "Hard-Shell Medical-Grade Chambers",
    "Board-Certified Physicians",
    "Medicare & Major Insurers Accepted",
  ];
  return (
    <section className="bg-white border-y border-[var(--color-surface-border)]">
      <div className="container-page py-6 lg:py-8">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-[var(--color-ink-muted)]">
          {items.map((it) => (
            <li key={it} className="flex items-center gap-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                aria-hidden
                className="text-[var(--color-brand-500)]"
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
      </div>
    </section>
  );
}
