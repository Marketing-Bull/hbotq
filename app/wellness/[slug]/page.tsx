import Link from "next/link";
import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { WhatToExpect } from "@/components/sections/what-to-expect";
import { ConsultationForm } from "@/components/forms/consultation-form";
import { CtaBanner } from "@/components/sections/cta-banner";
import { TikTokEmbed } from "@/components/media/tiktok-embed";
import { JsonLd } from "@/components/seo/json-ld";
import { wellnessUses, getWellnessUse } from "@/lib/data/wellness";
import { tiktoks, TIKTOK_PROFILE_URL } from "@/lib/data/videos";
import { breadcrumbSchema } from "@/lib/seo/schemas";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/data/site";

type Params = { slug: string };

export const dynamicParams = false;
export const dynamic = "force-static";

export function generateStaticParams(): Params[] {
  return wellnessUses.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata(props: { params: Promise<Params> }) {
  const { slug } = await props.params;
  const use = getWellnessUse(slug);
  if (!use) {
    return buildMetadata({
      title: "Not found",
      description: "This page could not be found.",
      path: `/wellness/${slug}/`,
      noIndex: true,
    });
  }
  return buildMetadata({
    title: use.metaTitle,
    description: use.metaDescription,
    path: `/wellness/${use.slug}/`,
  });
}

function labelFor(id: string): string | undefined {
  return tiktoks.find((t) => t.id === id)?.label;
}

export default async function WellnessPage(props: {
  params: Promise<Params>;
}) {
  const { slug } = await props.params;
  const use = getWellnessUse(slug);
  if (!use) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${site.url}/` },
          { name: "Wellness & Recovery", url: `${site.url}/wellness/` },
          { name: use.name, url: `${site.url}/wellness/${use.slug}/` },
        ])}
      />

      <Hero
        variant="condition"
        eyebrow="Wellness & Recovery — Off-Label Use"
        title={use.name}
        subtitle={use.summary}
        primaryCta={{ label: "Book a consultation", href: "/contact-us/" }}
        secondaryCta={{
          label: `Call ${site.phone}`,
          href: `tel:${site.phoneE164}`,
        }}
      />
      <TrustBar />

      <section className="section bg-white">
        <div className="container-page max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-brand-500)]">
            The idea
          </p>
          <h2 className="mt-3 font-display text-3xl lg:text-4xl font-semibold">
            {use.shortName} & hyperbaric oxygen
          </h2>
          <p className="mt-6 text-lg text-[var(--color-ink-muted)] leading-relaxed">
            {use.intro}
          </p>
        </div>
      </section>

      {use.sections.map((s, idx) => (
        <section
          key={s.heading}
          className={`section ${
            idx % 2 === 0 ? "bg-[var(--color-sand-100)]" : "bg-white"
          }`}
        >
          <div className="container-page max-w-4xl">
            <h2 className="font-display text-2xl lg:text-3xl font-semibold">
              {s.heading}
            </h2>
            <p className="mt-4 text-lg text-[var(--color-ink-muted)] leading-relaxed">
              {s.body}
            </p>
            {s.bullets?.length ? (
              <ul className="mt-6 space-y-3">
                {s.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 text-[var(--color-ink-muted)]"
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      aria-hidden
                      className="shrink-0 text-[var(--color-brand-500)] mt-0.5"
                    >
                      <path
                        d="M5 12l4 4L19 7"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                    {b}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      ))}

      <section className="section bg-white">
        <div className="container-page max-w-4xl">
          <h2 className="font-display text-2xl lg:text-3xl font-semibold">
            What people value about {use.shortName.toLowerCase()} at HBOTQ
          </h2>
          <ul className="mt-6 grid sm:grid-cols-2 gap-4">
            {use.benefits.map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 rounded-2xl bg-[var(--color-sand-100)] p-5 border border-[var(--color-surface-border)]"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  aria-hidden
                  className="shrink-0 text-[var(--color-brand-500)] mt-0.5"
                >
                  <path
                    d="M5 12l4 4L19 7"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
                <span className="text-[var(--color-ink)]">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* TikTok shorts */}
      <section className="section bg-[var(--color-sand-100)]">
        <div className="container-page">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h2 className="font-display text-2xl lg:text-3xl font-semibold">
              See it on TikTok
            </h2>
            <a
              href={TIKTOK_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-[var(--color-brand-500)] hover:underline"
            >
              @hyperbaricqueens →
            </a>
          </div>
          <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {use.tiktokIds.map((id) => (
              <TikTokEmbed key={id} id={id} label={labelFor(id)} />
            ))}
          </div>
        </div>
      </section>

      {/* Honest framing */}
      <section className="section bg-white">
        <div className="container-page max-w-4xl">
          <div className="rounded-2xl border border-[var(--color-surface-border)] bg-[var(--color-sand-100)] p-6 lg:p-8">
            <h2 className="font-display text-xl font-semibold">
              Our honest take
            </h2>
            <p className="mt-3 text-[var(--color-ink-muted)] leading-relaxed">
              {use.honestNote}
            </p>
          </div>
        </div>
      </section>

      <WhatToExpect />

      <section className="section bg-[var(--color-sand-100)]">
        <div className="container-page max-w-3xl">
          <ConsultationForm
            source={`wellness-${use.slug}`}
            heading={`Ask us about ${use.shortName.toLowerCase()}`}
            subheading="Book a consultation and we'll give you an honest read on whether HBOT fits your goals — no pressure, no overpromising."
          />
        </div>
      </section>

      <CtaBanner />

      <div className="container-page py-6 text-sm text-[var(--color-ink-muted)]">
        <Link href="/wellness/" className="hover:underline">
          ← All wellness uses
        </Link>
      </div>
    </>
  );
}
