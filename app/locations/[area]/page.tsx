import Link from "next/link";
import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { ConditionsGrid } from "@/components/sections/conditions-grid";
import { WhatToExpect } from "@/components/sections/what-to-expect";
import { MapHours } from "@/components/sections/map-hours";
import { ConsultationForm } from "@/components/forms/consultation-form";
import { CtaBanner } from "@/components/sections/cta-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { locations, getLocation } from "@/lib/data/locations";
import { medicalBusinessSchema, breadcrumbSchema } from "@/lib/seo/schemas";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/data/site";

type Params = { area: string };

export const dynamicParams = false;
export const dynamic = "force-static";

export function generateStaticParams(): Params[] {
  return locations.map((l) => ({ area: l.slug }));
}

export async function generateMetadata(props: { params: Promise<Params> }) {
  const { area } = await props.params;
  const location = getLocation(area);
  if (!location) {
    return buildMetadata({
      title: "Area not found",
      description: "This location page could not be found.",
      path: `/locations/${area}/`,
      noIndex: true,
    });
  }
  return buildMetadata({
    title: location.metaTitle,
    description: location.metaDescription,
    path: `/locations/${location.slug}/`,
  });
}

export default async function LocationPage(props: {
  params: Promise<Params>;
}) {
  const { area } = await props.params;
  const location = getLocation(area);
  if (!location) notFound();

  const gettingHere: { label: string; body: string }[] = [
    { label: "By subway & rail", body: location.gettingHere.transit },
    { label: "By car", body: location.gettingHere.driving },
    { label: "Parking", body: location.gettingHere.parking },
  ];

  return (
    <>
      <JsonLd data={medicalBusinessSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${site.url}/` },
          { name: "Areas We Serve", url: `${site.url}/locations/` },
          {
            name: location.area,
            url: `${site.url}/locations/${location.slug}/`,
          },
        ])}
      />

      <Hero
        variant="page"
        eyebrow={`Serving ${location.area}`}
        title={`Hyperbaric Oxygen Therapy in ${location.area}`}
        subtitle={location.summary}
        primaryCta={{ label: "Book a free consultation", href: "/contact-us/" }}
        secondaryCta={{
          label: `Call ${site.phone}`,
          href: `tel:${site.phoneE164}`,
        }}
      />
      <TrustBar />

      <section className="section bg-white">
        <div className="container-page max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-brand-500)]">
            {location.area} & HBOTQ
          </p>
          <h2 className="mt-3 font-display text-3xl lg:text-4xl font-semibold">
            Medical-grade HBOT, close to {location.shortName}
          </h2>
          <p className="mt-6 text-lg text-[var(--color-ink-muted)] leading-relaxed">
            {location.intro}
          </p>
        </div>
      </section>

      <section className="section bg-[var(--color-sand-100)]">
        <div className="container-page">
          <h2 className="font-display text-2xl lg:text-3xl font-semibold">
            Getting to HBOTQ from {location.area}
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {gettingHere.map((g) => (
              <div
                key={g.label}
                className="rounded-2xl bg-white p-6 border border-[var(--color-surface-border)]"
              >
                <h3 className="font-display text-lg font-semibold text-[var(--color-ink)]">
                  {g.label}
                </h3>
                <p className="mt-3 text-[var(--color-ink-muted)] leading-relaxed">
                  {g.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-page max-w-4xl">
          <h2 className="font-display text-2xl lg:text-3xl font-semibold">
            Why patients from {location.area} choose HBOTQ
          </h2>
          <p className="mt-6 text-lg text-[var(--color-ink-muted)] leading-relaxed">
            {location.whyTravel}
          </p>
          {location.neighborhoods.length ? (
            <>
              <h3 className="mt-10 font-display text-lg font-semibold">
                Neighborhoods we see {location.shortName} patients from
              </h3>
              <ul className="mt-5 flex flex-wrap gap-3">
                {location.neighborhoods.map((n) => (
                  <li
                    key={n}
                    className="rounded-full bg-[var(--color-sand-100)] px-4 py-2 text-sm text-[var(--color-ink)] border border-[var(--color-surface-border)]"
                  >
                    {n}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      </section>

      <ConditionsGrid
        heading="What we treat"
        subtitle="From FDA-approved wound, radiation, and hearing-loss indications to carefully evaluated off-label uses — the same physician-led care for every patient who travels in."
      />

      <WhatToExpect />
      <MapHours />

      <section className="section bg-[var(--color-sand-100)]">
        <div className="container-page max-w-3xl">
          <ConsultationForm
            source={`location-${location.slug}`}
            heading={`Book your consultation from ${location.area}`}
            subheading="Free, no commitment. We'll let you know honestly whether HBOT can help — and handle the insurance paperwork if it can."
          />
        </div>
      </section>

      <CtaBanner />

      <div className="container-page py-6 text-sm text-[var(--color-ink-muted)]">
        <Link href="/locations/" className="hover:underline">
          ← All areas we serve
        </Link>
      </div>
    </>
  );
}
