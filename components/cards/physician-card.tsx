import type { Physician } from "@/types/content";

export function PhysicianCard({ p }: { p: Physician }) {
  return (
    <article className="rounded-2xl bg-white border border-[var(--color-surface-border)] p-7 lg:p-8">
      <div className="flex items-start gap-5">
        <div className="shrink-0 w-16 h-16 rounded-full bg-[var(--color-brand-50)] text-[var(--color-brand-500)] inline-flex items-center justify-center font-display text-2xl font-semibold">
          {p.name
            .split(" ")
            .map((n) => n[0])
            .filter((c) => /[A-Z]/.test(c))
            .slice(0, 2)
            .join("")}
        </div>
        <div>
          <h3 className="font-display text-xl font-semibold">{p.name}</h3>
          <p className="text-sm text-[var(--color-brand-500)] font-semibold mt-0.5">
            {p.title}
          </p>
          <p className="text-xs text-[var(--color-ink-muted)] mt-1">
            {p.credentials.join(" · ")}
          </p>
        </div>
      </div>
      <p className="mt-5 text-[var(--color-ink-muted)] leading-relaxed">
        {p.bio}
      </p>
      {p.specialties.length ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {p.specialties.map((s) => (
            <span
              key={s}
              className="text-xs font-medium px-3 py-1 rounded-full bg-[var(--color-sand-200)] text-[var(--color-ink-muted)]"
            >
              {s}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}
