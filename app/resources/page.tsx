import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { CtaBanner } from "@/components/sections/cta-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { articles } from "@/lib/data/articles";
import { medicalBusinessSchema, breadcrumbSchema } from "@/lib/seo/schemas";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/data/site";
import { ResourcesCardGrid } from "@/components/cards/resources-card-grid";

export const metadata = buildMetadata({
  title: "HBOT Resources & Guides",
  description:
    "Physician-reviewed guides to hyperbaric oxygen therapy — how it works, how many sessions you need, insurance coverage and what to expect.",
  path: "/resources/",
});

export const dynamic = "force-static";

export default function ResourcesPage() {
  return (
    <>
      <JsonLd data={medicalBusinessSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${site.url}/` },
          { name: "Resources", url: `${site.url}/resources/` },
        ])}
      />

      <Hero
        variant="page"
        eyebrow="Resources & Guides"
        title="Hyperbaric oxygen therapy, clearly explained."
        subtitle="Physician-reviewed answers to the questions patients ask most — written by our medical team, in plain language."
        primaryCta={{ label: "Book a consultation", href: "/contact-us/" }}
      />
      <TrustBar />

      <section className="section bg-white">
        <div className="container-page">
          <ResourcesCardGrid articles={articles} />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
