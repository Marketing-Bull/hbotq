"use client";

import { site } from "@/lib/data/site";
import { trackClick } from "@/lib/analytics/track";

export function MapHours() {
  const addressLine = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`;
  const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    addressLine,
  )}&output=embed`;
  return (
    <section className="section bg-white">
      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-brand-500)]">
              Visit us
            </p>
            <h2 className="mt-3 font-display text-3xl lg:text-4xl font-semibold">
              In Woodside, Queens
            </h2>
            <address className="mt-6 not-italic text-lg text-[var(--color-ink)]">
              {site.address.street}
              <br />
              {site.address.city}, {site.address.region}{" "}
              {site.address.postalCode}
            </address>
            <div className="mt-6 flex flex-col gap-2 text-[var(--color-ink-muted)]">
              <a
                href={`tel:${site.phoneE164}`}
                onClick={trackClick("phone_call", { location: "map_hours" })}
                className="text-[var(--color-brand-500)] font-semibold text-lg hover:underline"
              >
                {site.phone}
              </a>
              <a
                href={`mailto:${site.email}`}
                onClick={trackClick("mailto", { location: "map_hours" })}
                className="hover:text-[var(--color-brand-500)]"
              >
                {site.email}
              </a>
            </div>

            <h3 className="mt-10 font-display text-xl font-semibold">Hours</h3>
            <ul className="mt-4 divide-y divide-[var(--color-surface-border)] border-y border-[var(--color-surface-border)]">
              {site.hours.map((h) => (
                <li
                  key={h.day}
                  className="flex justify-between py-3 text-[var(--color-ink-muted)]"
                >
                  <span className="font-medium text-[var(--color-ink)]">
                    {h.day}
                  </span>
                  <span>
                    {h.open && h.close
                      ? `${formatTime(h.open)} – ${formatTime(h.close)}`
                      : "Closed"}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl overflow-hidden border border-[var(--color-surface-border)] bg-[var(--color-sand-100)] aspect-[4/3] lg:aspect-square">
            <iframe
              src={mapEmbedSrc}
              title="HBOTQ location map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function formatTime(t: string) {
  const [hh, mm] = t.split(":").map(Number);
  const period = hh >= 12 ? "PM" : "AM";
  const h12 = ((hh + 11) % 12) + 1;
  return `${h12}:${String(mm).padStart(2, "0")} ${period}`;
}
