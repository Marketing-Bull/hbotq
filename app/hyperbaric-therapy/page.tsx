import Link from "next/link";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { BenefitsGrid } from "@/components/sections/benefits-grid";
import { WhatToExpect } from "@/components/sections/what-to-expect";
import { TestimonialCarousel } from "@/components/sections/testimonial-carousel";
import { ConsultationForm } from "@/components/forms/consultation-form";
import { CtaBanner } from "@/components/sections/cta-banner";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/data/site";

export const metadata = buildMetadata({
  title: "Hyperbaric Oxygen Therapy in Queens, NY | HBOTQ",
  description:
    "Hyperbaric oxygen therapy in Woodside, Queens. Physician-led HBOT for non-healing wounds, diabetic ulcers, radiation injury, sudden hearing loss, and more. Medicare and most insurers accepted.",
  path: "/hyperbaric-therapy/",
});

export const dynamic = "force-static";

export default function HyperbaricTherapyPage() {
  return (
    <>
      <Hero
        variant="lp"
        eyebrow="Hyperbaric Oxygen Therapy · Queens, NY"
        title="Advanced HBOT in Woodside, Queens — physician-led."
        subtitle="HBOTQ is the Hyperbaric Medicine and Wound Treatment Center of Queens. Hard-shell medical-grade chambers. Board-certified physicians. Medicare and most insurers accepted."
        primaryCta={{ label: "Book a free consultation", href: "/contact-us/" }}
        secondaryCta={{
          label: `Call ${site.phone}`,
          href: `tel:${site.phoneE164}`,
        }}
        image="/images/hero/patient-in-chamber.jpg"
        imageAlt="HBOTQ patient inside a hard-shell hyperbaric oxygen chamber in Woodside, Queens"
        priority
      />
      <TrustBar />
      <section className="section bg-white">
        <div className="container-page grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-brand-500)]">
              About HBOTQ
            </p>
            <h2 className="mt-3 font-display text-3xl lg:text-4xl font-semibold">
              The local choice for hyperbaric medicine in Queens.
            </h2>
            <p className="mt-5 text-lg text-[var(--color-ink-muted)] leading-relaxed">
              Patients across Queens, Brooklyn, the Bronx, Manhattan, and Long
              Island come to HBOTQ for hyperbaric oxygen therapy. Whether
              you’re managing a non-healing wound, recovering from a
              radiation injury, or facing sudden hearing loss, our medical
              team will tell you honestly whether HBOT can help.
            </p>
            <ul className="mt-6 space-y-3 text-[var(--color-ink-muted)]">
              {[
                "Hard-shelled medical-grade chambers (2.0–2.5 ATA)",
                "Board-certified physicians supervising every case",
                "Medicare, Medicaid, and most major insurers accepted",
                "Convenient Woodside location with patient parking",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3">
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
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact-us/"
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] text-white px-6 py-3 font-semibold hover:bg-[var(--color-accent-hover)]"
              >
                Book consultation
              </Link>
              <a
                href={`tel:${site.phoneE164}`}
                className="inline-flex items-center justify-center rounded-full border border-[var(--color-brand-500)] text-[var(--color-brand-500)] px-6 py-3 font-semibold hover:bg-[var(--color-brand-50)]"
              >
                Call {site.phone}
              </a>
            </div>
          </div>
          <div>
            <ConsultationForm source="hyperbaric-therapy" />
          </div>
        </div>
      </section>
      <BenefitsGrid />
      <WhatToExpect />
      <TestimonialCarousel />
      <CtaBanner />
    </>
  );
}
