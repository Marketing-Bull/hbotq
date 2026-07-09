import Link from "next/link";
import { notFound } from "next/navigation";
import { ConsultationForm } from "@/components/forms/consultation-form";
import { ReassuranceLine } from "@/components/sections/reassurance-line";
import { JsonLd } from "@/components/seo/json-ld";
import { conditionLps, getConditionLp } from "@/lib/data/lps";
import { testimonials } from "@/lib/data/testimonials";
import { breadcrumbSchema } from "@/lib/seo/schemas";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/data/site";
import type { ConsultationInput } from "@/lib/validation/consultation";

type Params = { slug: string };

export const dynamicParams = false;
export const dynamic = "force-static";

export function generateStaticParams(): Params[] {
  return conditionLps.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata(props: { params: Promise<Params> }) {
  const { slug } = await props.params;
  const lp = getConditionLp(slug);
  if (!lp) {
    return buildMetadata({
      title: "Not found",
      description: "This page could not be found.",
      path: `/lp/${slug}/`,
      noIndex: true,
    });
  }
  // noindex — ad LPs should not compete with condition pages in organic search
  return buildMetadata({
    title: lp.metaTitle,
    description: lp.metaDescription,
    path: `/lp/${lp.slug}/`,
    noIndex: true,
  });
}

export default async function ConditionLpPage(props: {
  params: Promise<Params>;
}) {
  const { slug } = await props.params;
  const lp = getConditionLp(slug);
  if (!lp) notFound();

  const testimonial = testimonials.find((t) => t.id === lp.testimonialId);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${site.url}/` },
          { name: lp.headline, url: `${site.url}/lp/${lp.slug}/` },
        ])}
      />

      {/* ── HERO + FORM ──────────────────────────────────────────────────── */}
      <section className="relative bg-[var(--color-brand-800)] overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 60%, var(--color-brand-500) 0, transparent 55%), radial-gradient(circle at 85% 20%, #e07856 0, transparent 45%)",
          }}
        />
        <div className="container-page relative z-10 grid lg:grid-cols-[1fr_420px] gap-10 lg:gap-14 items-start py-12 lg:py-16">

          {/* Left: headline + bullets + call CTA */}
          <div className="lg:pt-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-sand-300)]">
              {lp.eyebrow}
            </p>
            <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-semibold text-white leading-[1.05]">
              {lp.headline}{" "}
              <span className="text-[var(--color-accent)]">{lp.headlineAccent}</span>
            </h1>
            <p className="mt-5 text-lg text-white/80 leading-relaxed">
              {lp.subheadline}
            </p>

            <ul className="mt-7 space-y-2.5">
              {lp.heroBullets.map((b) => (
                <li key={b} className="flex items-center gap-3 text-white/85 text-base">
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden className="shrink-0 text-[var(--color-accent)]">
                    <path d="M5 12l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`tel:${site.phoneE164}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white/15 border border-white/30 text-white px-6 py-3 font-semibold hover:bg-white/25 transition-colors"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden fill="currentColor">
                  <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .58 3.6 1 1 0 0 1-.24 1z" />
                </svg>
                Call {site.phone}
              </a>
            </div>
          </div>

          {/* Right: trust badges → form → reassurance */}
          <div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {lp.heroStats.map((s) => (
                <div
                  key={s.stat}
                  className="flex items-center gap-2 rounded-lg bg-white/10 border border-white/20 px-3 py-2"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden className="shrink-0 text-[var(--color-accent)]">
                    <path d="M5 12l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                  <span className="text-xs font-semibold text-white leading-tight">
                    {s.stat}{" "}
                    <span className="font-normal text-white/70">{s.label}</span>
                  </span>
                </div>
              ))}
            </div>

            <ConsultationForm
              source={lp.formSource as string}
              defaultCondition={lp.conditionSlug as ConsultationInput["condition"]}
              heading="Book your free consultation"
              subheading="We respond within one business day and will tell you honestly whether HBOT can help."
            />

            <ReassuranceLine
              tone="light"
              className="mt-3 justify-center text-xs"
              items={["Free & no obligation", "We handle insurance", "No referral needed"]}
            />
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ─────────────────────────────────────────────────────── */}
      <section className="bg-white border-y border-[var(--color-surface-border)]">
        <div className="container-page py-5">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-[var(--color-ink-muted)]">
            {[
              "FDA-Approved Indication",
              "Hard-Shell Medical-Grade Chambers",
              "Board-Certified Physicians",
              "Medicare & Major Insurers Accepted",
              "Free Patient Parking · 7 Train Access",
            ].map((it) => (
              <li key={it} className="flex items-center gap-2">
                <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden className="text-[var(--color-brand-500)]">
                  <path d="M5 12l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
                {it}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── MECHANISM ─────────────────────────────────────────────────────── */}
      <section className="section bg-white">
        <div className="container-page grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-brand-500)]">
              How HBOT helps
            </p>
            <h2 className="mt-3 font-display text-3xl lg:text-4xl font-semibold leading-tight">
              {lp.mechanismHeading}
            </h2>
            <p className="mt-5 text-lg text-[var(--color-ink-muted)] leading-relaxed">
              {lp.mechanism}
            </p>
            <div className="mt-8">
              <Link
                href={`/condition/${lp.conditionSlug}/`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-brand-500)] hover:underline"
              >
                Read the full clinical overview
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-display text-xl font-semibold">
              {lp.benefitsHeading}
            </h3>
            <ul className="mt-5 space-y-4">
              {lp.benefits.map((b, i) => (
                <li key={b} className="flex items-start gap-4">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-brand-50)] text-[var(--color-brand-500)] font-display font-semibold text-sm shrink-0">
                    {i + 1}
                  </span>
                  <p className="mt-1 text-[var(--color-ink)] leading-snug">{b}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── INSURANCE NOTE ────────────────────────────────────────────────── */}
      <section className="bg-[var(--color-brand-50)] border-y border-[var(--color-brand-100)]">
        <div className="container-page py-6 flex flex-col sm:flex-row items-center gap-4">
          <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden className="shrink-0 text-[var(--color-brand-500)]" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 0 0 1.946-.806 3.42 3.42 0 0 1 4.438 0 3.42 3.42 0 0 0 1.946.806 3.42 3.42 0 0 1 3.138 3.138 3.42 3.42 0 0 0 .806 1.946 3.42 3.42 0 0 1 0 4.438 3.42 3.42 0 0 0-.806 1.946 3.42 3.42 0 0 1-3.138 3.138 3.42 3.42 0 0 0-1.946.806 3.42 3.42 0 0 1-4.438 0 3.42 3.42 0 0 0-1.946-.806 3.42 3.42 0 0 1-3.138-3.138 3.42 3.42 0 0 0-.806-1.946 3.42 3.42 0 0 1 0-4.438 3.42 3.42 0 0 0 .806-1.946 3.42 3.42 0 0 1 3.138-3.138z" />
          </svg>
          <p className="text-[var(--color-brand-700)] font-medium text-center sm:text-left">
            {lp.insuranceNote}
          </p>
        </div>
      </section>

      {/* ── TESTIMONIAL ───────────────────────────────────────────────────── */}
      {testimonial ? (
        <section className="section bg-[var(--color-sand-100)]">
          <div className="container-page max-w-3xl">
            <figure className="rounded-2xl bg-white border border-[var(--color-surface-border)] p-8 lg:p-10">
              {testimonial.rating ? (
                <div className="flex gap-1 text-[var(--color-accent)] mb-5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <svg key={i} width="20" height="20" viewBox="0 0 24 24" aria-hidden>
                      <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" fill="currentColor" />
                    </svg>
                  ))}
                  <span className="sr-only">{testimonial.rating} out of 5 stars</span>
                </div>
              ) : null}
              <blockquote className="font-display text-2xl lg:text-3xl italic leading-snug text-[var(--color-ink)]">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="w-8 h-px bg-[var(--color-ink-muted)]/40" />
                <span className="text-sm text-[var(--color-ink-muted)]">
                  {testimonial.author}{" "}
                  <span className="text-[var(--color-ink-muted)]/60">
                    — {testimonial.conditionLabel}
                  </span>
                </span>
              </figcaption>
            </figure>
          </div>
        </section>
      ) : null}

      {/* ── FAQs ──────────────────────────────────────────────────────────── */}
      <section className="section bg-white">
        <div className="container-page max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-brand-500)]">
            Common questions
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold">
            Quick answers before you call.
          </h2>
          <dl className="mt-8 space-y-4">
            {lp.faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-2xl bg-[var(--color-sand-100)] border border-[var(--color-surface-border)] p-6"
              >
                <dt className="font-display text-lg font-semibold text-[var(--color-ink)]">
                  {faq.q}
                </dt>
                <dd className="mt-3 text-[var(--color-ink-muted)] leading-relaxed">
                  {faq.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── BOTTOM FORM ───────────────────────────────────────────────────── */}
      <section className="section bg-[var(--color-sand-100)]">
        <div className="container-page max-w-3xl">
          <ConsultationForm
            source={`${lp.formSource}-bottom`}
            defaultCondition={lp.conditionSlug as ConsultationInput["condition"]}
            heading={lp.ctaHeading}
            subheading={lp.ctaSubheading}
          />
        </div>
      </section>

      {/* ── LOCATION STRIP ────────────────────────────────────────────────── */}
      <section className="border-t border-[var(--color-surface-border)] bg-white py-10">
        <div className="container-page flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <p className="font-display text-lg font-semibold text-[var(--color-ink)]">
              HBOTQ — Woodside, Queens, NY
            </p>
            <p className="mt-1 text-[var(--color-ink-muted)]">
              65-35 Queens Blvd, Suite #100 ·{" "}
              <a href={`tel:${site.phoneE164}`} className="font-semibold text-[var(--color-brand-500)] hover:underline">
                {site.phone}
              </a>
            </p>
            <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
              Mon–Fri 8:00 AM–6:00 PM · Sat 9:00 AM–2:00 PM · 2 blocks from 7 train + LIRR
            </p>
          </div>
          <a
            href={`tel:${site.phoneE164}`}
            className="shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-brand-500)] text-white px-7 py-3.5 font-semibold hover:bg-[var(--color-brand-600)] transition-colors"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden fill="currentColor">
              <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .58 3.6 1 1 0 0 1-.24 1z" />
            </svg>
            Call {site.phone}
          </a>
        </div>
      </section>
    </>
  );
}
