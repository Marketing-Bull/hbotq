"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { footerNav } from "@/lib/data/nav";
import { site } from "@/lib/data/site";
import { trackClick } from "@/lib/analytics/track";
import { isNavItemActive } from "@/lib/utils/nav";

export function Footer() {
  const pathname = usePathname() || "/";
  return (
    <footer className="bg-[var(--color-brand-800)] text-[var(--color-sand-100)]">
      <div className="container-page py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-4">
          <div>
            <Link
              href="/"
              aria-current={pathname === "/" ? "page" : undefined}
              className="inline-flex items-center gap-2 font-display text-xl font-semibold text-white"
            >
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[var(--color-accent)] text-white text-sm font-bold">
                H
              </span>
              <span>HBOTQ</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-sand-300)]">
              {site.legalName}. Hyperbaric oxygen therapy and advanced wound
              care in Woodside, Queens.
            </p>
            <address className="mt-4 not-italic text-sm text-[var(--color-sand-300)]">
              {site.address.street}
              <br />
              {site.address.city}, {site.address.region}{" "}
              {site.address.postalCode}
            </address>
            <div className="mt-4 flex flex-col gap-1 text-sm">
              <a
                href={`tel:${site.phoneE164}`}
                onClick={trackClick("phone_call", { location: "footer" })}
                className="text-white font-semibold hover:underline"
              >
                {site.phone}
              </a>
              <a
                href={`mailto:${site.email}`}
                onClick={trackClick("mailto", { location: "footer" })}
                className="text-[var(--color-sand-300)] hover:text-white"
              >
                {site.email}
              </a>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackClick("external", {
                  location: "footer",
                  outbound_target: "facebook",
                })}
                aria-label="Follow us on Facebook"
                className="text-[var(--color-sand-300)] hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackClick("external", {
                  location: "footer",
                  outbound_target: "instagram",
                })}
                aria-label="Follow us on Instagram"
                className="text-[var(--color-sand-300)] hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href={site.social.googleBusinessProfile}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackClick("external", {
                  location: "footer",
                  outbound_target: "google_business_profile",
                })}
                aria-label="View us on Google Business Profile"
                className="text-[var(--color-sand-300)] hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                </svg>
              </a>
            </div>
          </div>

          <FooterColumn title="Explore" links={footerNav.explore} pathname={pathname} />
          <FooterColumn title="Conditions" links={footerNav.conditions} pathname={pathname} />
          <FooterColumn title="Visit" links={footerNav.legal} pathname={pathname} />
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--color-brand-700)] flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-[var(--color-sand-300)]">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>
            Treatments described on this site are intended to educate. Always
            consult a qualified physician about your medical condition.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  pathname,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
  pathname: string;
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
        {title}
      </h3>
      <ul className="mt-4 space-y-2">
        {links.map((l) => {
          const active = isNavItemActive(l.href, pathname);
          return (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "text-sm font-semibold text-white"
                    : "text-sm text-[var(--color-sand-300)] hover:text-white"
                }
              >
                {l.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
