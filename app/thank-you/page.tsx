import Link from "next/link";
import Script from "next/script";
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
      <Script
        id="gtm-form-success"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:'form_submission_success',form:'consultation'});`,
        }}
      />
      <Hero
        variant="page"
        eyebrow="Thank You"
        title="Your message is on its way."
        subtitle="A member of our team will follow up shortly, usually within the same business day."
      />
      <section className="section bg-white">
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
              <a
                href={`tel:${site.phoneE164}`}
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-brand-500)] text-white px-6 py-3 font-semibold"
              >
                Call {site.phone}
              </a>
              <Link
                href="/conditions/"
                className="inline-flex items-center justify-center rounded-full border border-[var(--color-brand-500)] text-[var(--color-brand-500)] px-6 py-3 font-semibold"
              >
                Read about conditions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
