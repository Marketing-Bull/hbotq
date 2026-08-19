import {
  TrackedAnchor,
  TrackedLink,
} from "@/components/analytics/tracked-link";
import { ConsultationForm } from "@/components/forms/consultation-form";
import { ReassuranceLine } from "@/components/sections/reassurance-line";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo/schemas";
import { buildMetadata } from "@/lib/seo/metadata";
import { testimonials } from "@/lib/data/testimonials";
import { site } from "@/lib/data/site";
import type { Metadata } from "next";

// Google Ads LP for wound-care intent ("wound care center near me", "wound care
// clinic", "wound doctor near me"). Deliberately leads with the wound-care
// center — not with HBOT — because those searchers are looking for a place that
// treats wounds, not for hyperbaric oxygen. HBOT appears as the differentiator.
export const metadata: Metadata = buildMetadata({
  title: "Wound Care Center in Queens, NY | Non-Healing Wounds | HBOTQ",
  description:
    "Physician-led wound care center in Woodside, Queens. Debridement, advanced dressings, offloading and hyperbaric oxygen therapy for wounds that won't heal. Medicare & most insurers accepted.",
  path: "/lp/wound-care-queens/",
  // noindex — ad LPs should not compete with the condition pages in organic search
  noIndex: true,
});

export const dynamic = "force-static";

const HERO_BULLETS = [
  "Wounds stalled 30+ days despite standard care — our specialty",
  "Debridement, advanced dressings, offloading & HBOT under one roof",
  "Board-certified wound physicians at every visit",
  "Medicare, Medicaid & most major insurers accepted",
];

const HERO_STATS = [
  { stat: "Physician-Led", label: "wound program" },
  { stat: "Within Days", label: "most evaluations scheduled" },
  { stat: "Medicare", label: "& most insurers accepted" },
  { stat: "Woodside", label: "2 blocks from the 7 train" },
];

const TRUST_ITEMS = [
  "Board-Certified Wound Physicians",
  "Debridement & Advanced Wound Care",
  "FDA-Approved Hyperbaric Oxygen Therapy",
  "Medicare & Major Insurers Accepted",
  "Free Patient Parking · 7 Train + LIRR",
];

const SERVICES = [
  {
    heading: "Wound assessment & diagnosis",
    body: "We start by finding out why the wound isn't closing — blood supply, infection, pressure, or oxygen delivery. The treatment plan follows the diagnosis, not the other way around.",
    iconPath: "M21 21l-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z",
  },
  {
    heading: "Debridement",
    body: "Removing non-viable tissue so the wound edge can contract and healthy tissue can grow. Performed in-office by our physicians as often as your wound needs it.",
    iconPath: "M14.5 4.5l5 5L9 20H4v-5L14.5 4.5z",
  },
  {
    heading: "Advanced dressings & offloading",
    body: "Matching the dressing to the wound bed, and taking pressure off the wound so healing isn't undone between visits — the two things that most often stall recovery at home.",
    iconPath: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z",
  },
  {
    heading: "Infection management",
    body: "Cultures, targeted treatment, and coordination with infectious disease when a wound is infected or bone involvement is suspected.",
    iconPath: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  },
  {
    heading: "Hyperbaric oxygen therapy",
    body: "When the wound is starved of oxygen, HBOT delivers it directly to the tissue through the plasma. FDA-approved for diabetic lower-extremity wounds, chronic non-healing wounds, radiation injury and refractory osteomyelitis.",
    iconPath: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 5a4 4 0 1 1 0 8 4 4 0 0 1 0-8z",
  },
  {
    heading: "Coordination with your other doctors",
    body: "We work alongside your podiatrist, vascular surgeon, endocrinologist or primary care physician, and send notes back to them — you don't have to relay your own care.",
    iconPath: "M17 20h5v-2a3 3 0 0 0-5.36-1.86M17 20H7m10 0v-2c0-.66-.13-1.3-.36-1.86m0 0a5 5 0 0 0-9.28 0M7 20H2v-2a3 3 0 0 1 5.36-1.86M7 20v-2c0-.66.13-1.3.36-1.86m0 0a5 5 0 0 1 9.28 0M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0z",
  },
];

const NEXT_STEPS = [
  {
    step: "1",
    heading: "You call or send the form",
    body: "Takes a minute. No referral, no insurance details needed yet.",
  },
  {
    step: "2",
    heading: "We evaluate the wound",
    body: "A physician examines it and finds what's blocking healing — usually within days of your call.",
  },
  {
    step: "3",
    heading: "You get a plan and a straight answer",
    body: "What it takes to close the wound, what insurance covers, and what it costs you. Then you decide.",
  },
];

const QUALIFIERS = [
  "The wound has been open more than 30 days",
  "It's healed and reopened, or it keeps getting bigger",
  "You've been told the next step might be amputation",
  "There's exposed bone, tendon, or a wound that won't granulate",
  "You have diabetes, poor circulation, or a history of radiation",
  "Your current dressing routine isn't changing anything",
];

const WOUND_TYPES: { label: string; href: string }[] = [
  { label: "Diabetic foot & leg ulcers", href: "/condition/diabetic-lower-extremity-wounds/" },
  { label: "Chronic non-healing wounds", href: "/condition/non-healing-wounds/" },
  { label: "Venous & arterial ulcers", href: "/condition/non-healing-wounds/" },
  { label: "Pressure injuries (bed sores)", href: "/condition/non-healing-wounds/" },
  { label: "Surgical wounds that reopened", href: "/condition/non-healing-wounds/" },
  { label: "Radiation tissue damage", href: "/condition/radiation-tissue-damage/" },
  { label: "Refractory osteomyelitis", href: "/condition/refractory-osteomyelitis/" },
  { label: "Traumatic & crush wounds", href: "/condition/non-healing-wounds/" },
];

const FAQS = [
  {
    q: "Do I need a referral to be seen?",
    a: "No. You can book a consultation directly and we'll evaluate the wound. If your care ends up being insurance-covered, we coordinate the documentation with your referring physician — but nothing has to happen before your first visit.",
  },
  {
    q: "Is wound care covered by insurance? What will this cost me?",
    a: "Wound care visits and FDA-approved hyperbaric oxygen therapy are covered by Medicare Part B, Medicaid, and most major commercial insurers when medical necessity is documented. Our team verifies your benefits and handles pre-authorization before treatment starts, so you know where you stand before you commit to anything.",
  },
  {
    q: "What happens at the first visit?",
    a: "A board-certified physician examines and measures the wound, reviews your history and circulation, and identifies what's blocking healing. You leave with a specific plan — including whether debridement, offloading changes, or hyperbaric oxygen therapy make sense for your wound. Most first visits take under an hour.",
  },
  {
    q: "My wound is already being treated somewhere else. Should I still come?",
    a: "Yes — a second opinion is worth it if the wound hasn't measurably improved in four weeks. We frequently co-manage patients alongside their existing podiatrist or surgeon rather than replacing them, and we'll tell you honestly if your current plan is the right one.",
  },
  {
    q: "How is this different from a hospital wound clinic?",
    a: "We're a dedicated center, not a hospital department. That means you see the same physicians at every visit, scheduling happens within days instead of weeks, and hyperbaric oxygen therapy is in the same building as your wound care rather than a separate referral across the city.",
  },
  {
    q: "Where are you and how do I get there?",
    a: "65-35 Queens Blvd, Suite #100 in Woodside — two blocks from the 7 train and the Woodside LIRR station, with free patient parking on site. We see patients from across Queens, Brooklyn, Long Island City and the surrounding area.",
  },
];

const NEIGHBORHOODS = [
  "Woodside",
  "Elmhurst",
  "Jackson Heights",
  "Astoria",
  "Sunnyside",
  "Corona",
  "Rego Park",
  "Forest Hills",
  "Long Island City",
  "Flushing",
  "Maspeth",
  "Greenpoint & North Brooklyn",
];

export default function WoundCareQueensPage() {
  const testimonial = testimonials.find((t) => t.id === "t-4");

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${site.url}/` },
          {
            name: "Wound Care Center in Queens",
            url: `${site.url}/lp/wound-care-queens/`,
          },
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
              Wound Care Center · Woodside, Queens, NY
            </p>
            <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-semibold text-white leading-[1.05]">
              A wound care center in Queens{" "}
              <span className="text-[var(--color-accent)]">
                for wounds that won&rsquo;t heal.
              </span>
            </h1>
            <p className="mt-5 text-lg text-white/80 leading-relaxed">
              Physician-led wound care in Woodside — debridement, advanced
              dressings, offloading and hyperbaric oxygen therapy in one place.
              If your wound has been open more than 30 days, we&rsquo;ll find
              out why and tell you what it will take to close it.
            </p>

            <ul className="mt-7 space-y-2.5">
              {HERO_BULLETS.map((b) => (
                <li
                  key={b}
                  className="flex items-center gap-3 text-white/85 text-base"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    aria-hidden
                    className="shrink-0 text-[var(--color-accent)]"
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

            {/* Phone is the dominant conversion channel for this account — paid
                calls outnumber form leads by an order of magnitude — so the call
                CTA is the primary action here, not a secondary ghost button. */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3">
              <TrackedAnchor
                href={`tel:${site.phoneE164}`}
                category="phone_call"
                location="lp_hero"
                ctaLabel="call_cta"
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[var(--color-accent)] text-white px-8 py-4 text-lg font-semibold hover:brightness-110 transition-all"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  aria-hidden
                  fill="currentColor"
                >
                  <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .58 3.6 1 1 0 0 1-.24 1z" />
                </svg>
                Call {site.phone}
              </TrackedAnchor>
              <p className="text-sm text-white/60 sm:max-w-[15rem] leading-snug">
                Fastest way to get answers. Mon–Fri 8am–6pm, Sat 9am–2pm — or use
                the form and we&rsquo;ll call you back.
              </p>
            </div>

            {/* What happens after you reach out — sets expectations before the form */}
            <ol className="mt-10 grid sm:grid-cols-3 gap-5 border-t border-white/15 pt-8">
              {NEXT_STEPS.map((s) => (
                <li key={s.step}>
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[var(--color-accent)]/20 border border-[var(--color-accent)]/40 text-[var(--color-accent)] font-display font-semibold text-sm">
                    {s.step}
                  </span>
                  <p className="mt-3 font-display text-base font-semibold text-white">
                    {s.heading}
                  </p>
                  <p className="mt-1.5 text-sm text-white/65 leading-relaxed">
                    {s.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* Right: trust badges → form → reassurance */}
          <div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {HERO_STATS.map((s) => (
                <div
                  key={s.stat}
                  className="flex items-center gap-2 rounded-lg bg-white/10 border border-white/20 px-3 py-2"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    aria-hidden
                    className="shrink-0 text-[var(--color-accent)]"
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
                  <span className="text-xs font-semibold text-white leading-tight">
                    {s.stat}{" "}
                    <span className="font-normal text-white/70">{s.label}</span>
                  </span>
                </div>
              ))}
            </div>

            <ConsultationForm
              source="lp-wound-care-queens-hero"
              defaultCondition="non-healing-wounds"
              heading="Book your free wound evaluation"
              subheading="We respond within one business day and will tell you honestly what it will take to close your wound."
            />

            <ReassuranceLine
              tone="light"
              className="mt-3 justify-center text-xs"
              items={[
                "Free & no obligation",
                "We handle insurance",
                "No referral needed",
              ]}
            />
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ─────────────────────────────────────────────────────── */}
      <section className="bg-white border-y border-[var(--color-surface-border)]">
        <div className="container-page py-5">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-[var(--color-ink-muted)]">
            {TRUST_ITEMS.map((it) => (
              <li key={it} className="flex items-center gap-2">
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  aria-hidden
                  className="text-[var(--color-brand-500)]"
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
                {it}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── QUALIFIER ─────────────────────────────────────────────────────── */}
      <section className="section bg-white">
        <div className="container-page grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-brand-500)]">
              Should you come in?
            </p>
            <h2 className="mt-3 font-display text-3xl lg:text-4xl font-semibold leading-tight">
              A wound that hasn&rsquo;t changed in a month isn&rsquo;t slow.
              It&rsquo;s stuck.
            </h2>
            <p className="mt-5 text-lg text-[var(--color-ink-muted)] leading-relaxed">
              Wounds heal on a predictable curve. When one stops moving, it&rsquo;s
              usually because something is blocking it — poor blood supply,
              infection, unrelieved pressure, or tissue that simply isn&rsquo;t
              getting enough oxygen to rebuild itself. Those are diagnosable
              problems, and each has a different fix. Continuing the same
              dressing routine rarely resolves any of them.
            </p>
            <div className="mt-8">
              <TrackedLink
                href="/condition/non-healing-wounds/"
                location="lp_body"
                ctaLabel="clinical_overview"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-brand-500)] hover:underline"
              >
                Read the full clinical overview
                <span aria-hidden>→</span>
              </TrackedLink>
            </div>
          </div>

          <div className="rounded-2xl bg-[var(--color-sand-100)] border border-[var(--color-surface-border)] p-7 lg:p-8">
            <h3 className="font-display text-xl font-semibold">
              Worth an evaluation if any of these are true:
            </h3>
            <ul className="mt-5 space-y-3.5">
              {QUALIFIERS.map((q) => (
                <li key={q} className="flex items-start gap-3">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    aria-hidden
                    className="shrink-0 mt-1 text-[var(--color-brand-500)]"
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
                  <p className="text-[var(--color-ink)] leading-snug">{q}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── WHAT THE CENTER DOES ──────────────────────────────────────────── */}
      <section className="section bg-[var(--color-sand-100)]">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-brand-500)]">
              What we do
            </p>
            <h2 className="mt-3 font-display text-3xl lg:text-4xl font-semibold leading-tight">
              A complete wound program — not a single treatment.
            </h2>
            <p className="mt-5 text-lg text-[var(--color-ink-muted)] leading-relaxed">
              Most wounds need more than one thing to close. Everything below
              happens at the same address, managed by the same physicians.
            </p>
          </div>

          <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s) => (
              <li
                key={s.heading}
                className="rounded-2xl bg-white border border-[var(--color-surface-border)] p-6"
              >
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[var(--color-brand-50)] text-[var(--color-brand-500)]">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    aria-hidden
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={s.iconPath} />
                  </svg>
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold">
                  {s.heading}
                </h3>
                <p className="mt-2.5 text-[var(--color-ink-muted)] leading-relaxed">
                  {s.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── INSURANCE NOTE ────────────────────────────────────────────────── */}
      <section className="bg-[var(--color-brand-50)] border-y border-[var(--color-brand-100)]">
        <div className="container-page py-6 flex flex-col sm:flex-row items-center gap-4">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            aria-hidden
            className="shrink-0 text-[var(--color-brand-500)]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 0 0 1.946-.806 3.42 3.42 0 0 1 4.438 0 3.42 3.42 0 0 0 1.946.806 3.42 3.42 0 0 1 3.138 3.138 3.42 3.42 0 0 0 .806 1.946 3.42 3.42 0 0 1 0 4.438 3.42 3.42 0 0 0-.806 1.946 3.42 3.42 0 0 1-3.138 3.138 3.42 3.42 0 0 0-1.946.806 3.42 3.42 0 0 1-4.438 0 3.42 3.42 0 0 0-1.946-.806 3.42 3.42 0 0 1-3.138-3.138 3.42 3.42 0 0 0-.806-1.946 3.42 3.42 0 0 1 0-4.438 3.42 3.42 0 0 0 .806-1.946 3.42 3.42 0 0 1 3.138-3.138z" />
          </svg>
          <p className="text-[var(--color-brand-700)] font-medium text-center sm:text-left">
            Wound care visits and FDA-approved hyperbaric oxygen therapy are
            typically covered by Medicare, Medicaid, and most major insurers. We
            verify your benefits and handle pre-authorization before treatment
            begins.
          </p>
        </div>
      </section>

      {/* ── WOUND TYPES ───────────────────────────────────────────────────── */}
      <section className="section bg-white">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-brand-500)]">
              Wounds we treat
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold">
              If it&rsquo;s open and it isn&rsquo;t closing, start here.
            </h2>
          </div>
          <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {WOUND_TYPES.map((w) => (
              <li key={w.label}>
                <TrackedLink
                  href={w.href}
                  location="lp_wound_types"
                  ctaLabel={w.label}
                  className="flex h-full items-center gap-3 rounded-xl bg-[var(--color-sand-100)] border border-[var(--color-surface-border)] px-4 py-3.5 text-[var(--color-ink)] font-medium hover:border-[var(--color-brand-500)] transition-colors"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    aria-hidden
                    className="shrink-0 text-[var(--color-brand-500)]"
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
                  {w.label}
                </TrackedLink>
              </li>
            ))}
          </ul>
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
                      <path
                        d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"
                        fill="currentColor"
                      />
                    </svg>
                  ))}
                  <span className="sr-only">
                    {testimonial.rating} out of 5 stars
                  </span>
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
            {FAQS.map((faq) => (
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
            source="lp-wound-care-queens-bottom"
            defaultCondition="non-healing-wounds"
            heading="Get your wound evaluated this week"
            subheading="Free consultation with our wound-care physicians. We'll examine the wound, tell you what's blocking it, and lay out exactly what closing it takes — insurance handled by us."
          />
        </div>
      </section>

      {/* ── LOCATION STRIP ────────────────────────────────────────────────── */}
      <section className="border-t border-[var(--color-surface-border)] bg-white py-10">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <p className="font-display text-lg font-semibold text-[var(--color-ink)]">
                HBOTQ — Woodside, Queens, NY
              </p>
              <p className="mt-1 text-[var(--color-ink-muted)]">
                65-35 Queens Blvd, Suite #100 ·{" "}
                <TrackedAnchor
                  href={`tel:${site.phoneE164}`}
                  category="phone_call"
                  location="lp_footer"
                  ctaLabel="address_phone"
                  className="font-semibold text-[var(--color-brand-500)] hover:underline"
                >
                  {site.phone}
                </TrackedAnchor>
              </p>
              <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
                Mon–Fri 8:00 AM–6:00 PM · Sat 9:00 AM–2:00 PM · Free patient
                parking · 2 blocks from 7 train + LIRR
              </p>
            </div>
            <TrackedAnchor
              href={`tel:${site.phoneE164}`}
              category="phone_call"
              location="lp_footer"
              ctaLabel="call_cta"
              className="shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-brand-500)] text-white px-7 py-3.5 font-semibold hover:bg-[var(--color-brand-600)] transition-colors"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                aria-hidden
                fill="currentColor"
              >
                <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .58 3.6 1 1 0 0 1-.24 1z" />
              </svg>
              Call {site.phone}
            </TrackedAnchor>
          </div>

          <p className="mt-7 pt-6 border-t border-[var(--color-surface-border)] text-sm text-[var(--color-ink-muted)] leading-relaxed">
            <span className="font-semibold text-[var(--color-ink)]">
              Serving patients from:
            </span>{" "}
            {NEIGHBORHOODS.join(" · ")}
          </p>
        </div>
      </section>
    </>
  );
}
