import Image from "next/image";
import type { Physician } from "@/types/content";

const PROFILE_LABELS: { match: string; label: string }[] = [
  { match: "healthgrades.com", label: "Healthgrades" },
  { match: "zocdoc.com", label: "Zocdoc" },
  { match: "doximity.com", label: "Doximity" },
  { match: "vitals.com", label: "Vitals" },
  { match: "cms.gov", label: "Medicare (CMS)" },
];

function profileLabel(url: string): string {
  return PROFILE_LABELS.find((p) => url.includes(p.match))?.label ?? "Profile";
}

export function PhysicianCard({ p }: { p: Physician }) {
  const initials = p.name
    .split(" ")
    .map((n) => n[0])
    .filter((c) => /[A-Z]/.test(c))
    .slice(0, 2)
    .join("");
  return (
    <article className="rounded-2xl bg-white border border-[var(--color-surface-border)] p-7 lg:p-8">
      <div className="flex items-start gap-5">
        {p.image ? (
          <div className="shrink-0 w-20 h-20 rounded-full overflow-hidden ring-2 ring-[var(--color-brand-100)] relative">
            <Image
              src={p.image}
              alt={p.name}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="shrink-0 w-20 h-20 rounded-full bg-[var(--color-brand-50)] text-[var(--color-brand-500)] inline-flex items-center justify-center font-display text-2xl font-semibold">
            {initials}
          </div>
        )}
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
      {p.sameAs?.length ? (
        <div className="mt-5 border-t border-[var(--color-surface-border)] pt-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-ink-muted)]">
            Verified profiles
          </p>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5">
            {p.sameAs.map((url) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[var(--color-brand-500)] hover:underline"
              >
                {profileLabel(url)}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </article>
  );
}
