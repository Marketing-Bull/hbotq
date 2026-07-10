import Link from "next/link";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { CtaBanner } from "@/components/sections/cta-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { wellnessUses } from "@/lib/data/wellness";
import { medicalBusinessSchema, breadcrumbSchema } from "@/lib/seo/schemas";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/data/site";

export const metadata = buildMetadata({
  title: "HBOT for Wellness & Recovery",
  description:
    "Beyond our FDA-approved medical care, some patients use hyperbaric oxygen therapy for athletic recovery, healthy aging, and everyday wellness. Honest, physician-supervised, in Woodside, Queens.",
  path: "/wellness/",
});

export const dynamic = "force-static";

export default function WellnessHubPage() {
  return (
    <>
      <JsonLd data={medicalBusinessSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${site.url}/` },
          { name: "Wellness & Recovery", url: `${site.url}/wellness/` },
        ])}
      />

      <Hero
        variant="page"
        eyebrow="Wellness & Recovery"
        title="HBOT beyond the clinic."
        subtitle="Some people use hyperbaric oxygen for recovery, healthy aging, and everyday wellness — not to treat a diagnosis. These are off-label wellness uses, and we'll always be honest about what the evidence shows."
        primaryCta={{ label: "Book a consultation", href: "/contact-us/" }}
      />
      <TrustBar />

      <section className="section bg-white">
        <div className="container-page">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl lg:text-4xl font-semibold">
              Ways people use HBOT for wellness
            </h2>
            <p className="mt-4 text-lg text-[var(--color-ink-muted)]">
              These are wellness uses, provided on a self-pay basis — separate
              from the FDA-approved medical conditions we treat. Honest
              expectations, always.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {wellnessUses.map((w) => (
              <Link
                key={w.slug}
                href={`/wellness/${w.slug}/`}
                className="group rounded-2xl bg-[var(--color-sand-100)] p-6 border border-[var(--color-surface-border)] transition-all duration-200 hover:-translate-y-1 hover:border-[var(--color-brand-300)] hover:shadow-lg"
              >
                <h3 className="font-display text-xl font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-brand-500)]">
                  {w.name}
                </h3>
                <p className="mt-3 text-[var(--color-ink-muted)] leading-relaxed">
                  {w.summary}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-brand-500)]">
                  Learn more
                  <span
                    aria-hidden
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-10 max-w-3xl text-sm text-[var(--color-ink-muted)]">
            Looking for treatment of a medical condition? See our{" "}
            <Link
              href="/conditions/"
              className="font-semibold text-[var(--color-brand-500)] hover:underline"
            >
              FDA-approved conditions
            </Link>
            .
          </p>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
