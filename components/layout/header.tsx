import Image from "next/image";
import { primaryNav } from "@/lib/data/nav";
import { site } from "@/lib/data/site";
import { MobileNav } from "@/components/layout/mobile-nav";
import {
  TrackedAnchor,
  TrackedLink,
} from "@/components/analytics/tracked-link";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-surface-border)] bg-white/95 backdrop-blur">
      <div className="container-page flex items-center justify-between h-16 lg:h-20">
        <TrackedLink
          href="/"
          location="header"
          ctaLabel="logo_home"
          className="flex items-center"
          aria-label="HBOTQ — Hyperbaric Medicine and Wound Treatment Center of Queens, home"
        >
          <Image
            src="/images/brand/wordmark.webp"
            alt="HBOTQ — Hyperbaric Medicine and Wound Treatment Center of Queens"
            width={284}
            height={78}
            priority
            className="h-9 lg:h-10 w-auto"
          />
        </TrackedLink>

        <nav
          className="hidden lg:flex items-center gap-8"
          aria-label="Primary"
        >
          {primaryNav.map((item) =>
            "children" in item ? (
              <div key={item.href} className="relative group">
                <TrackedLink
                  href={item.href}
                  location="primary_nav"
                  ctaLabel={item.label}
                  className="flex items-center gap-1 text-sm font-medium text-[var(--color-ink)] hover:text-[var(--color-brand-500)] transition-colors"
                >
                  {item.label}
                  <svg
                    className="w-3.5 h-3.5 opacity-60 transition-transform group-hover:rotate-180 group-focus-within:rotate-180"
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
                </TrackedLink>
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 hidden group-hover:block group-focus-within:block z-50">
                  <ul className="bg-white rounded-xl shadow-lg ring-1 ring-black/5 py-1.5 min-w-[240px]">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <TrackedLink
                          href={child.href}
                          location="primary_nav_submenu"
                          ctaLabel={child.label}
                          className="block px-4 py-2 text-sm text-[var(--color-ink)] hover:bg-[var(--color-sand-100)] hover:text-[var(--color-brand-500)] transition-colors"
                        >
                          {child.label}
                        </TrackedLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <TrackedLink
                key={item.href}
                href={item.href}
                location="primary_nav"
                ctaLabel={item.label}
                className="text-sm font-medium text-[var(--color-ink)] hover:text-[var(--color-brand-500)] transition-colors"
              >
                {item.label}
              </TrackedLink>
            ),
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <TrackedAnchor
            href={`tel:${site.phoneE164}`}
            category="phone_call"
            location="header"
            ctaLabel="call_cta"
            className="text-sm font-semibold text-[var(--color-brand-500)] hover:text-[var(--color-brand-600)]"
          >
            {site.phone}
          </TrackedAnchor>
          <TrackedLink
            href="/contact-us/"
            location="header"
            ctaLabel="book_consultation"
            className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] text-white px-5 py-2.5 text-sm font-semibold hover:bg-[var(--color-accent-hover)] transition-colors"
          >
            Book consultation
          </TrackedLink>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
