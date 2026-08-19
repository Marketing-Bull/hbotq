import Image from "next/image";
import { site } from "@/lib/data/site";
import { TrackedAnchor } from "@/components/analytics/tracked-link";

/**
 * Minimal chrome for paid landing pages.
 *
 * The site header and footer are suppressed on `/lp/*` by `ChromeGate` in the
 * root layout, because every nav and footer link is an exit from a page we paid
 * to put someone on. What remains is the smallest thing that still earns trust:
 * the wordmark, and the phone number — which is the dominant conversion path for
 * this account, not a navigation element.
 *
 * The logo intentionally does NOT link to the homepage. On a landing page that
 * is just a well-dressed exit.
 */
export default function LpLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <header className="border-b border-[var(--color-surface-border)] bg-white">
        <div className="container-page flex items-center justify-between h-16 lg:h-20 gap-4">
          <Image
            src="/images/brand/wordmark.webp"
            alt="HBOTQ — Hyperbaric Medicine and Wound Treatment Center of Queens"
            width={284}
            height={78}
            priority
            className="h-9 lg:h-10 w-auto"
          />

          <TrackedAnchor
            href={`tel:${site.phoneE164}`}
            category="phone_call"
            location="lp_header"
            ctaLabel="call_cta"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-brand-500)] text-white px-5 py-2.5 text-sm lg:text-base font-semibold hover:bg-[var(--color-brand-600)] transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              aria-hidden
              fill="currentColor"
              className="shrink-0"
            >
              <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .58 3.6 1 1 0 0 1-.24 1z" />
            </svg>
            <span className="hidden sm:inline">Call {site.phone}</span>
            <span className="sm:hidden">Call</span>
          </TrackedAnchor>
        </div>
      </header>

      {children}
    </>
  );
}
