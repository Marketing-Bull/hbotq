"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { primaryNav } from "@/lib/data/nav";
import { site } from "@/lib/data/site";
import { trackClick } from "@/lib/analytics/track";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    setExpanded(null);
  };

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
          className="fixed inset-0 top-16 z-40 bg-white overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <nav
            className="container-page py-8 flex flex-col gap-2"
            aria-label="Mobile"
          >
            {primaryNav.map((item) =>
              "children" in item ? (
                <div
                  key={item.href}
                  className="border-b border-[var(--color-surface-border)]"
                >
                  <button
                    type="button"
                    aria-expanded={expanded === item.href}
                    aria-controls={`submenu-${item.label.toLowerCase()}`}
                    onClick={() =>
                      setExpanded((cur) =>
                        cur === item.href ? null : item.href,
                      )
                    }
                    className="w-full flex items-center justify-between py-3 text-lg font-medium text-[var(--color-ink)]"
                  >
                    {item.label}
                    <svg
                      className={`w-4 h-4 opacity-60 transition-transform ${
                        expanded === item.href ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {expanded === item.href ? (
                    <ul
                      id={`submenu-${item.label.toLowerCase()}`}
                      className="pb-3"
                    >
                      <li>
                        <Link
                          href={item.href}
                          onClick={() => {
                            trackClick("cta_click", {
                              location: "mobile_nav_submenu",
                              cta_label: `${item.label}_view_all`,
                            })();
                            close();
                          }}
                          className="block py-2 pl-4 text-base font-semibold text-[var(--color-brand-500)]"
                        >
                          View all conditions →
                        </Link>
                      </li>
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => {
                              trackClick("cta_click", {
                                location: "mobile_nav_submenu",
                                cta_label: child.label,
                              })();
                              close();
                            }}
                            className="block py-2 pl-4 text-base text-[var(--color-ink-muted)] hover:text-[var(--color-brand-500)]"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    trackClick("cta_click", {
                      location: "mobile_nav",
                      cta_label: item.label,
                    })();
                    close();
                  }}
                  className="py-3 text-lg font-medium border-b border-[var(--color-surface-border)]"
                >
                  {item.label}
                </Link>
              ),
            )}
            <div className="mt-6 flex flex-col gap-3">
              <a
                href={`tel:${site.phoneE164}`}
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-brand-500)] text-white px-5 py-3 font-semibold"
                onClick={() => {
                  trackClick("phone_call", {
                    location: "mobile_nav",
                    cta_label: "call_cta",
                  })();
                  close();
                }}
              >
                Call {site.phone}
              </a>
              <Link
                href="/contact-us/"
                onClick={() => {
                  trackClick("cta_click", {
                    location: "mobile_nav",
                    cta_label: "book_consultation",
                  })();
                  close();
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
