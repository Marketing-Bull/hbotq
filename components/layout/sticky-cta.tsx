import Link from "next/link";
import { site } from "@/lib/data/site";

export function StickyCta() {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 border-t border-[var(--color-surface-border)] bg-white/95 backdrop-blur shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <p className="text-center text-[11px] font-medium text-[var(--color-ink-muted)] pt-1.5">
        Free consultation · Medicare &amp; major insurers accepted
      </p>
      <div className="container-page pb-2 pt-1.5 grid grid-cols-2 gap-2">
        <a
          href={`tel:${site.phoneE164}`}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-brand-500)] text-white px-4 py-3 text-sm font-semibold active:scale-[0.98] transition-transform"
          aria-label={`Call ${site.phone}`}
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
          Call
        </a>
        <Link
          href="/contact-us/"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] text-white px-4 py-3 text-sm font-semibold active:scale-[0.98] transition-transform"
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            aria-hidden
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="4.5" width="18" height="16" rx="2" />
            <path d="M3 9h18M8 3v3m8-3v3" strokeLinecap="round" />
          </svg>
          Book free consult
        </Link>
      </div>
    </div>
  );
}
