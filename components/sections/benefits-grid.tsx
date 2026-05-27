import { benefits } from "@/lib/data/benefits";
import { BenefitCard } from "@/components/cards/benefit-card";

export function BenefitsGrid() {
  return (
    <section className="section bg-[var(--color-sand-100)]">
      <div className="container-page">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-brand-500)]">
            Why HBOT works
          </p>
          <h2 className="mt-3 font-display text-3xl lg:text-4xl font-semibold">
            The mechanisms behind the medicine
          </h2>
          <p className="mt-4 text-lg text-[var(--color-ink-muted)]">
            HBOT isn’t a wellness trend at HBOTQ — it’s the cellular biology
            of oxygen, applied to conditions where oxygen delivery is the
            missing piece.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <BenefitCard key={b.id} benefit={b} />
          ))}
        </div>
      </div>
    </section>
  );
}
