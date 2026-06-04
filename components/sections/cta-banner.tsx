"use client";

import Link from "next/link";
import { site } from "@/lib/data/site";
import { trackClick } from "@/lib/analytics/track";

export function CtaBanner({
  heading = "Ready to find out if HBOT can help?",
  subtitle = "Book a free consultation with our medical team. We'll review your situation honestly and let you know whether hyperbaric oxygen therapy is the right fit.",
}: {
  heading?: string;
  subtitle?: string;
} = {}) {
  return (
    <section className="section bg-[var(--color-brand-700)] text-white">
      <div className="container-page text-center">
        <h2 className="font-display text-3xl lg:text-4xl font-semibold text-white">
          {heading}
        </h2>
        <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
          {subtitle}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/contact-us/"
            className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] text-white px-7 py-3.5 font-semibold hover:bg-[var(--color-accent-hover)]"
          >
            Book a free consultation
          </Link>
          <a
            href={`tel:${site.phoneE164}`}
            onClick={trackClick("phone_call", { location: "cta_banner" })}
            className="inline-flex items-center justify-center rounded-full border border-white/40 text-white px-7 py-3.5 font-semibold hover:bg-white/10"
          >
            Call {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
