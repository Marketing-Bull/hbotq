import Link from "next/link";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { CtaBanner } from "@/components/sections/cta-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { articles } from "@/lib/data/articles";
import { breadcrumbSchema } from "@/lib/seo/schemas";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/data/site";

export const metadata = buildMetadata({
  title: "HBOT Resources & Guides",
  description:
    "Physician-reviewed guides to hyperbaric oxygen therapy — how it works, how many sessions you need, insurance coverage, and what to expect. From the HBOTQ medical team.",
  path: "/resources/",
});

export const dynamic = "force-static";

export default function ResourcesPage() {
  return (
    <>
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <Link
                key={a.slug}
                href={`/resources/${a.slug}/`}
                className="group flex flex-col rounded-2xl border border-[var(--color-surface-border)] bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--color-brand-300)] hover:shadow-lg"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-brand-500)]">
                  {a.readMinutes} min read
                </p>
                <h2 className="mt-3 font-display text-xl font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-brand-500)]">
                  {a.title}
                </h2>
                <p className="mt-3 flex-1 text-[var(--color-ink-muted)] leading-relaxed">
                  {a.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-brand-500)]">
                  Read the guide
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
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
