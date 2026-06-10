import Link from "next/link";
import Image from "next/image";
import { primaryNav } from "@/lib/data/nav";
import { site } from "@/lib/data/site";
import { MobileNav } from "@/components/layout/mobile-nav";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-surface-border)] bg-white/95 backdrop-blur">
      <div className="container-page flex items-center justify-between h-16 lg:h-20">
        <Link
          href="/"
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
        </Link>

        <nav
          className="hidden lg:flex items-center gap-8"
          aria-label="Primary"
        >
          {primaryNav.map((item) =>
            "children" in item ? (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
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
                </Link>
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 hidden group-hover:block group-focus-within:block z-50">
                  <ul className="bg-white rounded-xl shadow-lg ring-1 ring-black/5 py-1.5 min-w-[240px]">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block px-4 py-2 text-sm text-[var(--color-ink)] hover:bg-[var(--color-sand-100)] hover:text-[var(--color-brand-500)] transition-colors"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-[var(--color-ink)] hover:text-[var(--color-brand-500)] transition-colors"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`tel:${site.phoneE164}`}
            className="text-sm font-semibold text-[var(--color-brand-500)] hover:text-[var(--color-brand-600)]"
          >
            {site.phone}
          </a>
          <Link
            href="/contact-us/"
            className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] text-white px-5 py-2.5 text-sm font-semibold hover:bg-[var(--color-accent-hover)] transition-colors"
          >
            Book consultation
          </Link>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
