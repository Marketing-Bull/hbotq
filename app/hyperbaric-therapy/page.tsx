import Link from "next/link";
import Image from "next/image";
import { TrustBar } from "@/components/sections/trust-bar";
import { TestimonialCarousel } from "@/components/sections/testimonial-carousel";
import { ConsultationForm } from "@/components/forms/consultation-form";
import { ReassuranceLine } from "@/components/sections/reassurance-line";
import { buildMetadata } from "@/lib/seo/metadata";
import { conditions } from "@/lib/data/conditions";
import { site } from "@/lib/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Hyperbaric Oxygen Therapy in Queens & NYC | HBOTQ",
  description:
    "Medical-grade hyperbaric oxygen therapy in Woodside, Queens. Board-certified physicians, hard-shell chambers, Medicare & most insurers accepted. Free consultation.",
  path: "/hyperbaric-therapy/",
});

export const dynamic = "force-static";

const TRUST_BADGES = [
  { stat: "FDA-Approved", label: "indications treated" },
  { stat: "Hard-Shell", label: "medical-grade chambers" },
  { stat: "Board-Certified", label: "physician supervision" },
  { stat: "Medicare", label: "& most insurers accepted" },
];

const DIFFERENTIATORS = [
  {
    heading: "Not a wellness spa",
    body: "We use hard-shell chambers at 2.0–2.5 ATA — the pressure FDA-approved indications require. Soft-sided \"hyperbaric\" pods sold in wellness settings don't reach these pressures and don't meet the medical standard.",
    iconPath: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 0 0 1.946-.806 3.42 3.42 0 0 1 4.438 0 3.42 3.42 0 0 0 1.946.806 3.42 3.42 0 0 1 3.138 3.138 3.42 3.42 0 0 0 .806 1.946 3.42 3.42 0 0 1 0 4.438 3.42 3.42 0 0 0-.806 1.946 3.42 3.42 0 0 1-3.138 3.138 3.42 3.42 0 0 0-1.946.806 3.42 3.42 0 0 1-4.438 0 3.42 3.42 0 0 0-1.946-.806 3.42 3.42 0 0 1-3.138-3.138 3.42 3.42 0 0 0-.806-1.946 3.42 3.42 0 0 1 0-4.438 3.42 3.42 0 0 0 .806-1.946 3.42 3.42 0 0 1 3.138-3.138z",
  },
  {
    heading: "No months-long waitlist",
    body: "Hospital hyperbaric units often carry months-long waits. We're a dedicated center — most patients are evaluated and scheduled within days of calling.",
    iconPath: "M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",
  },
  {
    heading: "Physician-led, every session",
    body: "Board-certified physicians and wound-care specialists manage every case. We coordinate with your referring physician and handle insurance pre-authorization so you don't have to.",
    iconPath: "M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM4 20a8 8 0 0 1 16 0",
  },
  {
    heading: "Insurance handled for you",
    body: "For FDA-approved indications, Medicare, Medicaid, and most major insurers cover HBOT. Our team manages the paperwork and pre-authorization — you focus on getting better.",
    iconPath: "M9 12h6m-3-3v6m-7 4h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H6.5L4 4H2v16",
  },
];

const FAQS = [
  {
    q: "Is hyperbaric oxygen therapy painful?",
    a: "No. The most common sensation is mild ear pressure during compression — similar to descending in an airplane. Most patients read, watch a show, or nap during their 90-minute session.",
  },
  {
    q: "How many sessions will I need?",
    a: "It depends on your condition. Sudden hearing loss typically needs 10–20 sessions; most wound and radiation injury protocols run 20–40. Your physician sets a plan at your evaluation and adjusts based on how you respond.",
  },
  {
    q: "Is it covered by insurance?",
    a: "For FDA-approved indications — including diabetic wounds, non-healing wounds, radiation injury, sudden hearing loss, and others — Medicare, Medicaid, and most major commercial insurers typically cover treatment when medical necessity is documented. We handle pre-authorization.",
  },
  {
    q: "How is HBOTQ different from a hospital hyperbaric unit?",
    a: "We're a dedicated center, not a hospital department. That means faster scheduling, the same care team at every visit, and a staff that actively manages your insurance paperwork. Our chambers meet the same medical standard hospital units use.",
  },
  {
    q: "Do I need a referral?",
    a: "No referral is needed for a free consultation. If your condition is insurance-covered, we coordinate with your physician to complete the documentation.",
  },
];

const fdaConditions = conditions.filter((c) => c.fdaStatus === "on-label");

export default function HyperbaricTherapyPage() {
  return (
    <div>

      {/* ── HERO + FORM ───────────────────────────────────────────────────── */}
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

          {/* Left: headline + quick trust signals */}
          <div className="lg:pt-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-sand-300)]">
              Hyperbaric Medicine · Woodside, Queens, NY
            </p>
            <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-semibold text-white leading-[1.05]">
              Hyperbaric oxygen therapy,{" "}
              <span className="text-[var(--color-accent)]">done right.</span>
            </h1>
            <p className="mt-5 text-lg text-white/80 leading-relaxed">
              HBOTQ is the Hyperbaric Medicine and Wound Treatment Center of Queens —
              hard-shell medical-grade chambers, board-certified physicians,
              and insurance handled for you.
            </p>

            {/* Bullet trust signals */}
            <ul className="mt-7 space-y-2.5">
              {[
                "Hard-shell chambers at medical pressure (2.0–2.5 ATA)",
                "Board-certified physicians supervising every case",
                "Medicare, Medicaid & most major insurers accepted",
                "Free patient parking · 2 blocks from the 7 train",
              ].map((b) => (
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

          {/* Right: trust badges above form → form → reassurance below */}
          <div>
            {/* Trust badge strip above the form */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              {TRUST_BADGES.map((b) => (
                <div
                  key={b.stat}
                  className="flex items-center gap-2 rounded-lg bg-white/10 border border-white/20 px-3 py-2"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden className="shrink-0 text-[var(--color-accent)]">
                    <path d="M5 12l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                  <span className="text-xs font-semibold text-white leading-tight">
                    {b.stat} <span className="font-normal text-white/70">{b.label}</span>
                  </span>
                </div>
              ))}
            </div>

            {/* The form card */}
            <ConsultationForm
              source="hyperbaric-therapy-lp-hero"
              heading="Book your free consultation"
              subheading="Tell us your situation. We respond within one business day."
            />

            {/* Reassurance strip below the form */}
            <ReassuranceLine
              tone="light"
              className="mt-3 justify-center text-xs"
              items={["Free & no obligation", "We handle insurance paperwork", "No referral needed"]}
            />
          </div>
        </div>
      </section>

      <TrustBar />

      {/* ── CONDITIONS ────────────────────────────────────────────────────── */}
      <section className="section bg-white">
        <div className="container-page">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-brand-500)]">
            FDA-approved indications
          </p>
          <h2 className="mt-3 font-display text-3xl lg:text-4xl font-semibold">
            Conditions we treat.
          </h2>
          <p className="mt-4 text-lg text-[var(--color-ink-muted)] max-w-2xl">
            For these indications, treatment is typically covered by Medicare,
            Medicaid, and most major insurers.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fdaConditions.map((c) => (
              <Link
                key={c.slug}
                href={`/condition/${c.slug}/`}
                className="group flex items-start gap-3 rounded-xl border border-[var(--color-surface-border)] bg-[var(--color-sand-100)] p-4 hover:border-[var(--color-brand-300)] hover:shadow-md transition-all duration-200"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden className="shrink-0 mt-0.5 text-[var(--color-brand-500)]">
                  <path d="M5 12l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
                <div>
                  <p className="font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-brand-500)] leading-snug">
                    {c.name}
                  </p>
                  <p className="mt-1 text-xs text-[var(--color-ink-muted)] leading-snug line-clamp-2">
                    {c.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <Link href="/conditions/" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-brand-500)] hover:underline">
            See all conditions including off-label uses <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* ── WHY HBOTQ ─────────────────────────────────────────────────────── */}
      <section className="section bg-[var(--color-sand-100)]">
        <div className="container-page">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-brand-500)]">
            Why HBOTQ
          </p>
          <h2 className="mt-3 font-display text-3xl lg:text-4xl font-semibold max-w-2xl">
            Medical-grade HBOT — not a wellness pod.
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {DIFFERENTIATORS.map((d) => (
              <div
                key={d.heading}
                className="rounded-2xl bg-white border border-[var(--color-surface-border)] p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[var(--color-brand-50)] text-[var(--color-brand-500)]">
                  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={d.iconPath} />
                  </svg>
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">
                  {d.heading}
                </h3>
                <p className="mt-2 text-[var(--color-ink-muted)] leading-relaxed">
                  {d.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT A SESSION LOOKS LIKE ─────────────────────────────────────── */}
      <section className="section bg-white">
        <div className="container-page grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden border border-[var(--color-surface-border)]">
            <Image
              src="/images/facility/chamber.jpg"
              alt="Hard-shell hyperbaric oxygen chamber at HBOTQ Woodside, Queens"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-brand-500)]">
              What to expect
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold">
              A quiet 90 minutes. Biology does the work.
            </h2>
            <p className="mt-5 text-lg text-[var(--color-ink-muted)] leading-relaxed">
              You change into cotton scrubs, settle into the chamber, and
              breathe 100% oxygen for about 90 minutes at treatment pressure.
              Most patients read, stream a show, or nap. Compression and
              decompression add about 15 minutes each — you&apos;ll feel mild
              ear pressure, like an airplane descent.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "About 2 hours door-to-door per visit",
                "Typically 5 sessions per week",
                "Same physician-led team, every visit",
                "Free patient parking on-site",
                "2 blocks from 61 St–Woodside (7 train + LIRR)",
              ].map((b) => (
                <li key={b} className="flex items-center gap-3 text-[var(--color-ink-muted)]">
                  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden className="shrink-0 text-[var(--color-brand-500)]">
                    <path d="M5 12l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact-us/"
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] text-white px-6 py-3 font-semibold hover:bg-[var(--color-accent-hover)] transition-colors"
              >
                Book a free consultation
              </Link>
              <a
                href={`tel:${site.phoneE164}`}
                className="inline-flex items-center justify-center rounded-full border border-[var(--color-brand-500)] text-[var(--color-brand-500)] px-6 py-3 font-semibold hover:bg-[var(--color-brand-50)] transition-colors"
              >
                Call {site.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
      <TestimonialCarousel />

      {/* ── FAQs ──────────────────────────────────────────────────────────── */}
      <section className="section bg-[var(--color-sand-100)]">
        <div className="container-page max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-brand-500)]">
            Common questions
          </p>
          <h2 className="mt-3 font-display text-3xl lg:text-4xl font-semibold">
            Quick answers before you call.
          </h2>
          <dl className="mt-10 space-y-5">
            {FAQS.map((faq) => (
              <div
                key={faq.q}
                className="rounded-2xl bg-white border border-[var(--color-surface-border)] p-6"
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
          <p className="mt-8 text-[var(--color-ink-muted)]">
            More questions?{" "}
            <Link href="/faqs/" className="font-semibold text-[var(--color-brand-500)] hover:underline">
              See all FAQs
            </Link>
            {" "}or call us at{" "}
            <a href={`tel:${site.phoneE164}`} className="font-semibold text-[var(--color-brand-500)] hover:underline">
              {site.phone}
            </a>.
          </p>
        </div>
      </section>

      {/* ── SECOND FORM (bottom conversion point) ─────────────────────────── */}
      <section className="section bg-white">
        <div className="container-page max-w-3xl">
          <ConsultationForm
            source="hyperbaric-therapy-lp-bottom"
            heading="Ready to find out if HBOT can help?"
            subheading="Free consultation, no commitment. Our physicians will review your situation and give you an honest answer — and handle insurance if it's a covered indication."
          />
        </div>
      </section>

      {/* ── LOCATION STRIP ────────────────────────────────────────────────── */}
      <section className="border-t border-[var(--color-surface-border)] bg-[var(--color-sand-100)] py-10">
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
          <Link
            href="/contact-us/"
            className="shrink-0 inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] text-white px-7 py-3.5 font-semibold hover:bg-[var(--color-accent-hover)] transition-colors"
          >
            Book now
          </Link>
        </div>
      </section>

    </div>
  );
}
