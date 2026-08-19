import {
  TrackedAnchor,
  TrackedLink,
} from "@/components/analytics/tracked-link";
import { ConversionConfirmed } from "@/components/analytics/conversion-confirmed";
import { Hero } from "@/components/sections/hero";
import { site } from "@/lib/data/site";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Thank You — We'll Be in Touch",
  description:
    "Thanks for reaching out to HBOTQ. Our team will follow up shortly to schedule your consultation.",
  path: "/thank-you/",
  noIndex: true,
});

export const dynamic = "force-static";

export default function ThankYouPage() {
  return (
    <>
      <ConversionConfirmed />
      <Hero
        variant="page"
        eyebrow="Thank You"
        title="Your message is on its way."
        subtitle="A member of our team will follow up shortly, usually within the same business day."
      />
      <section className="section bg-white">
        <div className="container-page max-w-3xl">
          <h2 className="text-center font-display text-2xl lg:text-3xl font-semibold">
            What happens next
          </h2>
          <ol className="mt-8 grid gap-5 sm:grid-cols-3">
            {[
              {
                t: "We review your note",
                d: "Our team reads what you shared and matches you with the right physician.",
              },
              {
                t: "We call to schedule",
                d: "Usually within the same business day, we reach out to set up your evaluation.",
              },
              {
                t: "You meet your physician",
                d: "An honest assessment of whether HBOT can help — and we handle insurance.",
              },
            ].map((s, i) => (
              <li
                key={s.t}
                className="rounded-2xl border border-[var(--color-surface-border)] bg-white p-6"
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-brand-500)] text-white font-display font-semibold">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold">
                  {s.t}
                </h3>
                <p className="mt-2 text-sm text-[var(--color-ink-muted)] leading-relaxed">
                  {s.d}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section bg-white pt-0">
        <div className="container-page max-w-2xl text-center">
          <div className="rounded-2xl border border-[var(--color-surface-border)] bg-[var(--color-sand-100)] p-8 lg:p-10">
            <h2 className="font-display text-2xl font-semibold">
              In the meantime
            </h2>
            <p className="mt-3 text-[var(--color-ink-muted)]">
              If your situation is urgent — like sudden hearing loss in the
              last 14 days — please call us directly so we can fast-track
              you.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <TrackedAnchor
                href={`tel:${site.phoneE164}`}
                category="phone_call"
                location="thank_you"
                ctaLabel="call_cta"
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-brand-500)] text-white px-6 py-3 font-semibold"
              >
                Call {site.phone}
              </TrackedAnchor>
              <TrackedLink
                href="/videos/"
                location="thank_you"
                ctaLabel="watch_videos"
                className="inline-flex items-center justify-center rounded-full border border-[var(--color-brand-500)] text-[var(--color-brand-500)] px-6 py-3 font-semibold"
              >
                Watch: how HBOT works
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
