import { physicians } from "@/lib/data/physicians";
import { PhysicianCard } from "@/components/cards/physician-card";

export function PhysiciansSection({
  heading = "Care led by experienced physicians",
  subtitle = "Every HBOTQ patient is evaluated and supervised by our board-certified medical director — not a technician or a wellness consultant.",
}: {
  heading?: string;
  subtitle?: string;
} = {}) {
  return (
    <section className="section bg-white">
      <div className="container-page">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-brand-500)]">
            Our Physicians
          </p>
          <h2 className="mt-3 font-display text-3xl lg:text-4xl font-semibold">
            {heading}
          </h2>
          <p className="mt-4 text-lg text-[var(--color-ink-muted)]">{subtitle}</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {physicians.map((p) => (
            <PhysicianCard key={p.slug} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
