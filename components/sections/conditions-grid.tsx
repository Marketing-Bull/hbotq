import { conditions } from "@/lib/data/conditions";
import { ConditionCard } from "@/components/cards/condition-card";

export function ConditionsGrid({
  heading = "Conditions we treat",
  subtitle = "From FDA-approved wound and radiation indications to carefully evaluated off-label uses, our medical team will tell you honestly whether HBOT is right for you.",
}: {
  heading?: string;
  subtitle?: string;
}) {
  return (
    <section className="section bg-white">
      <div className="container-page">
        <div className="max-w-3xl">
          <h2 className="font-display text-3xl lg:text-4xl font-semibold">
            {heading}
          </h2>
          <p className="mt-4 text-lg text-[var(--color-ink-muted)]">
            {subtitle}
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {conditions.map((c) => (
            <ConditionCard key={c.slug} condition={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
