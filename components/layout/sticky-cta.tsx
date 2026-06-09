"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/data/site";
import { trackClick, trackEvent } from "@/lib/analytics/track";

const DISMISS_KEY = "hbotq:sticky_cta:dismissed_at";
const DISMISS_DAYS = 7;

function isDismissed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = window.localStorage.getItem(DISMISS_KEY);
    if (!raw) return false;
    const dismissedAt = Number.parseInt(raw, 10);
    if (!Number.isFinite(dismissedAt)) return false;
    const ageMs = Date.now() - dismissedAt;
    return ageMs < DISMISS_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

export function StickyCta() {
  const [dismissed, setDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDismissed(isDismissed());
  }, []);

  const handleDismiss = (location: "mobile" | "desktop") => {
    try {
      window.localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
      // localStorage may be unavailable (private mode, etc.) — fall through.
    }
    trackEvent("sticky_cta_dismiss", { location });
    setDismissed(true);
  };

  if (!mounted || dismissed) return null;

  return (
    <>
      {/* Mobile: full-width bottom bar (existing behavior) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 border-t border-[var(--color-surface-border)] bg-white/95 backdrop-blur">
        <div className="container-page py-2 grid grid-cols-2 gap-2">
          <a
            href={`tel:${site.phoneE164}`}
            onClick={trackClick("phone_call", { location: "sticky_cta" })}
            className="inline-flex items-center justify-center rounded-full bg-[var(--color-brand-500)] text-white px-4 py-3 text-sm font-semibold"
            aria-label={`Call ${site.phone}`}
          >
            Call
          </a>
          <Link
            href="/contact-us/"
            onClick={trackClick("cta_click", {
              location: "sticky_cta",
              cta_label: "Book consultation",
            })}
            className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] text-white px-4 py-3 text-sm font-semibold"
          >
            Book consultation
          </Link>
        </div>
        <button
          type="button"
          onClick={() => handleDismiss("mobile")}
          className="absolute top-1 right-2 text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] p-2 text-xs"
          aria-label="Dismiss call-to-action bar"
        >
          ✕
        </button>
      </div>

      {/* Desktop: floating vertical pill, bottom-right */}
      <div
        className="hidden lg:flex fixed bottom-6 right-6 z-30 flex-col gap-2 rounded-2xl border border-[var(--color-surface-border)] bg-white/95 backdrop-blur shadow-lg p-2"
        role="region"
        aria-label="Quick contact"
      >
        <button
          type="button"
          onClick={() => handleDismiss("desktop")}
          className="self-end text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] p-1 text-xs leading-none"
          aria-label="Dismiss quick-contact widget"
        >
          ✕
        </button>
        <a
          href={`tel:${site.phoneE164}`}
          onClick={trackClick("phone_call", { location: "sticky_cta_desktop" })}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-brand-500)] text-white px-5 py-3 text-sm font-semibold hover:bg-[var(--color-brand-600)] transition-colors"
          aria-label={`Call ${site.phone}`}
        >
          <span aria-hidden>📞</span>
          Call {site.phone}
        </a>
        <Link
          href="/contact-us/"
          onClick={trackClick("cta_click", {
            location: "sticky_cta_desktop",
            cta_label: "Book consultation",
          })}
          className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] text-white px-5 py-3 text-sm font-semibold hover:bg-[var(--color-accent-hover)] transition-colors"
        >
          Book consultation
        </Link>
      </div>
    </>
  );
}
