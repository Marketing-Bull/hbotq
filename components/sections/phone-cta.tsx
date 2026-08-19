import { site } from "@/lib/data/site";
import { ReassuranceLine } from "@/components/sections/reassurance-line";
import {
  TrackedAnchor,
  TrackedLink,
} from "@/components/analytics/tracked-link";

export function PhoneCta() {
  return (
    <section className="section bg-white">
      <div className="container-page">
        <div className="rounded-3xl border border-[var(--color-surface-border)] bg-[var(--color-sand-100)] p-10 lg:p-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-brand-500)]">
            Talk to our team
          </p>
          <h2 className="mt-3 font-display text-3xl lg:text-4xl font-semibold">
            Have a question? Call us.
          </h2>
          <p className="mt-4 text-lg text-[var(--color-ink-muted)] max-w-2xl mx-auto">
            We’re glad to talk through your situation, explain what HBOT can
            and can’t do, and let you know whether a consultation makes sense.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <TrackedAnchor
              href={`tel:${site.phoneE164}`}
              category="phone_call"
              location="phone_cta"
              ctaLabel="call_cta"
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-brand-500)] text-white px-7 py-3.5 font-semibold hover:bg-[var(--color-brand-600)]"
            >
              Call {site.phone}
            </TrackedAnchor>
            <TrackedLink
              href="/contact-us/"
              location="phone_cta"
              ctaLabel="book_consultation"
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] text-white px-7 py-3.5 font-semibold hover:bg-[var(--color-accent-hover)]"
            >
              Book a free consultation
            </TrackedLink>
          </div>
          <ReassuranceLine className="mt-6" />
        </div>
      </div>
    </section>
  );
}
