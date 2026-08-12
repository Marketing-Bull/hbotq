"use client";

import { trackClick } from "@/lib/analytics/track";

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

/**
 * Physician "Verified profiles" sidebar links — client component so onClick
 * dataLayer events fire for each external profile click.
 *
 * Event: external { location: "physician_profile_sidebar", cta_label: <platform> }
 * e.g. "Healthgrades", "Zocdoc", "Doximity", "Vitals", "Medicare (CMS)"
 */
export function PhysicianProfileLinks({ sameAs }: { sameAs: string[] }) {
  return (
    <div className="rounded-2xl border border-[var(--color-surface-border)] bg-white p-6">
      <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-ink-muted)]">
        Verified profiles
      </h3>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
        {sameAs.map((url) => {
          const label = profileLabel(url);
          return (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackClick("external", {
                location: "physician_profile_sidebar",
                cta_label: label,
              })}
              className="text-sm font-medium text-[var(--color-brand-500)] hover:underline"
            >
              {label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
