import { processSteps } from "@/lib/data/process";

export function WhatToExpect() {
  return (
    <section className="section bg-white">
      <div className="container-page">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-brand-500)]">
            What to expect
          </p>
          <h2 className="mt-3 font-display text-3xl lg:text-4xl font-semibold">
            From first call to last treatment
          </h2>
          <p className="mt-4 text-lg text-[var(--color-ink-muted)]">
            Most patients say the hardest part is picking up the phone. Here’s
            how the rest looks once you do.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((s) => (
            <div
              key={s.step}
              className="group relative rounded-2xl border border-[var(--color-surface-border)] p-6 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-[var(--color-brand-200)]"
            >
              <span
                aria-hidden
                className="absolute inset-x-6 -top-px h-1 rounded-b bg-[var(--color-brand-500)] opacity-0 transition-opacity group-hover:opacity-100"
              />
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[var(--color-brand-500)] text-white font-semibold font-display text-lg transition-transform group-hover:scale-110">
                {s.step}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--color-ink-muted)] leading-relaxed">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
