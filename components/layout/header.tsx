import Link from "next/link";
import { primaryNav } from "@/lib/data/nav";
import { site } from "@/lib/data/site";
import { MobileNav } from "@/components/layout/mobile-nav";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-surface-border)] bg-white/95 backdrop-blur">
      <div className="container-page flex items-center justify-between h-16 lg:h-20">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-xl font-semibold text-[var(--color-brand-500)]"
          aria-label="HBOTQ home"
        >
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[var(--color-brand-500)] text-white text-sm font-bold">
            H
          </span>
          <span>HBOTQ</span>
        </Link>

        <nav
          className="hidden lg:flex items-center gap-8"
          aria-label="Primary"
        >
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[var(--color-ink)] hover:text-[var(--color-brand-500)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
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
