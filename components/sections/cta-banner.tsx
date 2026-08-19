import { site } from "@/lib/data/site";
import { ReassuranceLine } from "@/components/sections/reassurance-line";
import { BlobsDark } from "@/components/ui/background-blobs";
import {
  TrackedAnchor,
  TrackedLink,
} from "@/components/analytics/tracked-link";

export function CtaBanner({
  heading = "Ready to find out if HBOT can help?",
  subtitle = "Book a free consultation with our medical team. We'll review your situation honestly and let you know whether hyperbaric oxygen therapy is the right fit.",
}: {
  heading?: string;
  subtitle?: string;
} = {}) {
  return (
    <section
      className="section relative overflow-hidden text-white"
      style={{
        background:
          "linear-gradient(135deg, var(--color-brand-900) 0%, var(--color-brand-700) 60%, var(--color-brand-800) 100%)",
      }}
    >
      <BlobsDark />

      <div className="container-page relative z-10 text-center">
        <h2 className="font-display text-3xl lg:text-4xl font-semibold text-white">
          {heading}
        </h2>
        <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
          {subtitle}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <TrackedLink
            href="/contact-us/"
            location="cta_banner"
            ctaLabel="book_consultation"
            className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] text-white px-7 py-3.5 font-semibold hover:bg-[var(--color-accent-hover)] shadow-lg shadow-[var(--color-accent)]/30 transition-colors"
          >
            Book a free consultation
          </TrackedLink>
          <TrackedAnchor
            href={`tel:${site.phoneE164}`}
            category="phone_call"
            location="cta_banner"
            ctaLabel="call_cta"
            className="inline-flex items-center justify-center rounded-full border border-white/30 text-white px-7 py-3.5 font-semibold hover:bg-white/10 transition-colors backdrop-blur-sm"
          >
            Call {site.phone}
          </TrackedAnchor>
        </div>
        <ReassuranceLine tone="light" className="mt-6" />
      </div>
    </section>
  );
}
