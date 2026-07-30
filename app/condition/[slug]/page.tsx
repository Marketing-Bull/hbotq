import Link from "next/link";
import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { WhatToExpect } from "@/components/sections/what-to-expect";
import { TestimonialCarousel } from "@/components/sections/testimonial-carousel";
import { FaqSection } from "@/components/sections/faq-section";
import { ConsultationForm } from "@/components/forms/consultation-form";
import { CtaBanner } from "@/components/sections/cta-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { ConditionCard } from "@/components/cards/condition-card";
import {
  MedicalReviewer,
  LAST_MEDICALLY_REVIEWED_ISO,
} from "@/components/seo/medical-reviewer";
import { VideoEmbed } from "@/components/media/video-embed";
import { TikTokEmbed } from "@/components/media/tiktok-embed";
import {
  conditions,
  getCondition,
  relatedConditions,
} from "@/lib/data/conditions";
import { getConditionVideo, getConditionTikTok } from "@/lib/data/videos";
import { getFaqsByIds } from "@/lib/data/faqs";
import {
  medicalConditionSchema,
  breadcrumbSchema,
  faqPageSchema,
  videoObjectSchema,
  medicalWebPageSchema,
  reviewSchema,
} from "@/lib/seo/schemas";
import { getCitations } from "@/lib/data/citations";
import { physicians } from "@/lib/data/physicians";
import { testimonials } from "@/lib/data/testimonials";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/data/site";
import type { ConsultationInput } from "@/lib/validation/consultation";

type Params = { slug: string };

export const dynamicParams = false;
export const dynamic = "force-static";

export function generateStaticParams(): Params[] {
  return conditions.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(props: { params: Promise<Params> }) {
  const { slug } = await props.params;
  const condition = getCondition(slug);
  if (!condition) {
    return buildMetadata({
      title: "Condition not found",
      description: "This condition page could not be found.",
      path: `/condition/${slug}/`,
      noIndex: true,
    });
  }
  return buildMetadata({
    title: condition.metaTitle,
    description: condition.metaDescription,
    path: `/condition/${condition.slug}/`,
    image: condition.heroImage,
  });
}

export default async function ConditionPage(props: {
  params: Promise<Params>;
}) {
  const { slug } = await props.params;
  const condition = getCondition(slug);
  if (!condition) notFound();

  const related = relatedConditions(slug);
  const faqs = condition.faqIds ? getFaqsByIds(condition.faqIds) : [];
  const video = getConditionVideo(slug);
  const tiktok = getConditionTikTok(slug);
  const citations = getCitations(slug);
  const reviewer = physicians[0];

  return (
    <>
      <JsonLd data={medicalConditionSchema(condition)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${site.url}/` },
          { name: "Conditions", url: `${site.url}/conditions/` },
          {
            name: condition.name,
            url: `${site.url}/condition/${condition.slug}/`,
          },
        ])}
      />
      {faqs.length > 0 ? <JsonLd data={faqPageSchema(faqs)} /> : null}
      {video ? <JsonLd data={videoObjectSchema(video)} /> : null}
      <JsonLd
        data={medicalWebPageSchema({
          name: condition.metaTitle,
          description: condition.metaDescription,
          path: `/condition/${condition.slug}/`,
          lastReviewed: LAST_MEDICALLY_REVIEWED_ISO,
          reviewer: { name: reviewer.name, title: reviewer.title },
          citations,
        })}
      />
      <JsonLd data={testimonials.map(reviewSchema)} />

      <Hero
        variant="condition"
        eyebrow={
          condition.fdaStatus === "on-label"
            ? "FDA-Approved Indication"
            : "Off-Label Use — Honestly Discussed"
        }
        title={condition.name}
        subtitle={condition.summary}
        primaryCta={{ label: "Book a free consultation", href: "/contact-us/" }}
        secondaryCta={{ label: `Call ${site.phone}`, href: `tel:${site.phoneE164}` }}
        image={condition.heroImage}
        imageAlt={`HBOTQ — hyperbaric oxygen therapy for ${condition.name.toLowerCase()}`}
        priority
      />
      <TrustBar />

      <section className="section bg-white">
        <div className="container-page max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-brand-500)]">
            How HBOT helps
          </p>
          <h2 className="mt-3 font-display text-3xl lg:text-4xl font-semibold">
            {condition.name} & hyperbaric oxygen
          </h2>
          <div className="mt-6">
            <MedicalReviewer />
          </div>
          <p className="mt-6 text-lg text-[var(--color-ink-muted)] leading-relaxed">
            {condition.howHbotHelps}
          </p>
        </div>
      </section>

      {video || tiktok ? (
        <section className="section bg-[var(--color-sand-100)]">
          <div className="container-page max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-brand-500)]">
              Watch
            </p>
            <h2 className="mt-3 font-display text-2xl lg:text-3xl font-semibold">
              {condition.shortName} & HBOT, explained
            </h2>
            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
              {video ? (
                <VideoEmbed
                  id={video.id}
                  title={video.title}
                  caption={video.description}
                />
              ) : null}
              {tiktok ? (
                <div className="lg:w-[300px]">
                  <TikTokEmbed id={tiktok.id} label={tiktok.label} />
                  <p className="mt-3 text-center text-sm text-[var(--color-ink-muted)]">
                    A quick look, from our TikTok
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {condition.sections.map((s, idx) => (
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
            Why patients with {condition.shortName.toLowerCase()} choose HBOTQ
          </h2>
          <ul className="mt-6 grid sm:grid-cols-2 gap-4">
            {condition.benefits.map((b) => (
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

      <WhatToExpect />
      <TestimonialCarousel />

      {faqs.length ? (
        <FaqSection
          heading={`${condition.shortName} — common questions`}
          faqs={faqs}
        />
      ) : null}

      {citations.length ? (
        <section className="section bg-[var(--color-sand-100)]">
          <div className="container-page max-w-4xl">
            <h2 className="font-display text-2xl lg:text-3xl font-semibold">
              Sources &amp; further reading
            </h2>
            <p className="mt-3 text-[var(--color-ink-muted)]">
              This page is informational and reviewed by our medical team. For
              the underlying evidence, see:
            </p>
            <ul className="mt-6 space-y-3">
              {citations.map((c) => (
                <li key={c.url} className="flex items-start gap-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    aria-hidden
                    className="mt-0.5 shrink-0 text-[var(--color-brand-500)]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-[var(--color-ink)] hover:text-[var(--color-brand-500)] hover:underline"
                  >
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {related.length ? (
        <section className="section bg-white">
          <div className="container-page">
            <h2 className="font-display text-2xl lg:text-3xl font-semibold">
              Related conditions
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {related.map((r) => (
                <ConditionCard key={r.slug} condition={r} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section bg-[var(--color-sand-100)]">
        <div className="container-page max-w-3xl">
          <ConsultationForm
            source={`condition-${condition.slug}`}
            defaultCondition={condition.slug as ConsultationInput["condition"]}
            heading={`Talk about ${condition.shortName.toLowerCase()} with our team`}
            subheading="Free consultation, no commitment. We'll let you know honestly whether HBOT can help."
          />
        </div>
      </section>

      <CtaBanner />

      <div className="container-page py-6 text-sm text-[var(--color-ink-muted)]">
        <Link href="/conditions/" className="hover:underline">
          ← All conditions
        </Link>
      </div>
    </>
  );
}
