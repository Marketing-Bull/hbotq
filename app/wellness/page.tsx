import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { CtaBanner } from "@/components/sections/cta-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { wellnessUses } from "@/lib/data/wellness";
import { medicalBusinessSchema, breadcrumbSchema } from "@/lib/seo/schemas";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/data/site";
import { WellnessCardGrid } from "@/components/cards/wellness-card-grid";

export const metadata = buildMetadata({
  title: "HBOT for Wellness & Recovery",
  description:
    "Some patients use hyperbaric oxygen therapy for athletic recovery, healthy aging and everyday wellness. Honest, physician-supervised care in Queens.",
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
          <WellnessCardGrid uses={wellnessUses} />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
