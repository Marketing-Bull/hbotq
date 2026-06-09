"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { primaryNav } from "@/lib/data/nav";
import { site } from "@/lib/data/site";
import { trackClick } from "@/lib/analytics/track";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center justify-center w-10 h-10 rounded-md text-[var(--color-ink)] hover:bg-[var(--color-sand-200)]"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
            <path
              d="M6 6l12 12M6 18L18 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>

      {open ? (
        <div
          className="fixed inset-0 top-16 z-40 bg-white"
          role="dialog"
          aria-modal="true"
        >
          <nav
            className="container-page py-8 flex flex-col gap-2"
            aria-label="Mobile"
          >
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 text-lg font-medium border-b border-[var(--color-surface-border)]"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-6 flex flex-col gap-3">
              <a
                href={`tel:${site.phoneE164}`}
                onClick={(e) => {
                  trackClick("phone_call", { location: "mobile_nav" });
                  setOpen(false);
                }}
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-brand-500)] text-white px-5 py-3 font-semibold"
              >
                Call {site.phone}
              </a>
              <Link
                href="/contact-us/"
                onClick={(e) => {
                  trackClick("cta_click", {
                    location: "mobile_nav",
                    cta_label: "Book consultation",
                  })(e);
                  setOpen(false);
                }}
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] text-white px-5 py-3 font-semibold"
              >
                Book consultation
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
