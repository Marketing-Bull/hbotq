import Link from "next/link";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { MapHours } from "@/components/sections/map-hours";
import { CtaBanner } from "@/components/sections/cta-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { locations } from "@/lib/data/locations";
import { medicalBusinessSchema, breadcrumbSchema } from "@/lib/seo/schemas";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/data/site";

export const metadata = buildMetadata({
  title: "Areas We Serve — Hyperbaric Oxygen Therapy Across NYC",
  description:
    "Physician-led hyperbaric oxygen therapy in Woodside, Queens — serving Manhattan, Brooklyn, Long Island City, Astoria and all of Queens.",
  path: "/locations/",
});

export const dynamic = "force-static";

export default function LocationsPage() {
  return (
    <>
      <JsonLd data={medicalBusinessSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${site.url}/` },
          { name: "Areas We Serve", url: `${site.url}/locations/` },
        ])}
      />

      <Hero
        variant="page"
        eyebrow="Areas We Serve"
        title="Hyperbaric oxygen therapy across NYC."
        subtitle="HBOTQ sits in Woodside, Queens — one of the most transit-accessible spots in the city. Patients travel to us from Manhattan, Brooklyn, and across Queens for medical-grade HBOT."
        primaryCta={{ label: "Book a consultation", href: "/contact-us/" }}
        secondaryCta={{
          label: `Call ${site.phone}`,
          href: `tel:${site.phoneE164}`,
        }}
      />
      <TrustBar />

      <section className="section bg-white">
        <div className="container-page">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl lg:text-4xl font-semibold">
              One center, reachable from across the city
            </h2>
            <p className="mt-4 text-lg text-[var(--color-ink-muted)]">
              Choose your area for directions, transit times, and why patients
              near you make the trip to HBOTQ.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((l) => (
              <Link
                key={l.slug}
                href={`/locations/${l.slug}/`}
                className="group rounded-2xl bg-[var(--color-sand-100)] p-6 border border-[var(--color-surface-border)] hover:border-[var(--color-brand-500)] transition-colors"
              >
                <h3 className="font-display text-xl font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-brand-500)]">
                  {l.area}
                </h3>
                <p className="mt-3 text-[var(--color-ink-muted)] leading-relaxed">
                  {l.summary}
                </p>
                <span className="mt-4 inline-block text-sm font-semibold text-[var(--color-brand-500)]">
                  HBOT in {l.shortName} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <MapHours />
      <CtaBanner />
    </>
  );
}
