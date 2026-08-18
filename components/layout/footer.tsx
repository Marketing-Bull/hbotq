import Image from "next/image";
import { footerNav } from "@/lib/data/nav";
import { site } from "@/lib/data/site";
import { locations } from "@/lib/data/locations";
import {
  TrackedAnchor,
  TrackedLink,
} from "@/components/analytics/tracked-link";

const areaLinks = [
  { label: "All areas we serve", href: "/locations/" },
  ...locations.map((l) => ({
    label: l.area,
    href: `/locations/${l.slug}/`,
  })),
];

export function Footer() {
  return (
    <footer className="bg-[var(--color-brand-800)] text-[var(--color-sand-100)]">
      <div className="container-page py-16 lg:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2 lg:col-span-1">
            <TrackedLink
              href="/"
              location="footer"
              ctaLabel="logo_home"
              className="inline-flex items-center"
              aria-label="HBOTQ home"
            >
              <Image
                src="/images/brand/wordmark-white.webp"
                alt="HBOTQ — Hyperbaric Medicine and Wound Treatment Center of Queens"
                width={284}
                height={78}
                className="h-10 w-auto"
              />
            </TrackedLink>
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
              <TrackedAnchor
                href={`tel:${site.phoneE164}`}
                category="phone_call"
                location="footer"
                ctaLabel="call_cta"
                className="text-white font-semibold hover:underline"
              >
                {site.phone}
              </TrackedAnchor>
              <TrackedAnchor
                href={`mailto:${site.email}`}
                category="mailto"
                location="footer"
                ctaLabel="email_cta"
                className="text-[var(--color-sand-300)] hover:text-white"
              >
                {site.email}
              </TrackedAnchor>
            </div>

            {/* Social icons */}
            <div className="mt-5 flex items-center gap-3">
              <SocialIcon
                href={site.social.facebook}
                label="Facebook"
                icon={
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                }
              />
              <SocialIcon
                href={site.social.instagram}
                label="Instagram"
                icon={
                  <>
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                  </>
                }
              />
              <SocialIcon
                href={site.social.youtube}
                label="YouTube"
                icon={
                  <>
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="var(--color-brand-800)" />
                  </>
                }
              />
              <SocialIcon
                href={site.social.tiktok}
                label="TikTok"
                icon={
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34l.04-8.37a8.19 8.19 0 0 0 4.79 1.52V5.01a4.85 4.85 0 0 1-1.06-.32z" />
                }
              />
            </div>
          </div>

          <FooterColumn title="Explore" links={footerNav.explore} />
          <FooterColumn title="Conditions" links={footerNav.conditions} />
          <FooterColumn title="Areas We Serve" links={areaLinks} />
          <FooterColumn title="Visit" links={footerNav.legal} />
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

function SocialIcon({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <TrackedAnchor
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      category="external"
      location="footer_social"
      ctaLabel={label.toLowerCase()}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-brand-600)] text-[var(--color-sand-300)] hover:border-[var(--color-brand-400)] hover:text-white transition-colors"
    >
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {icon}
      </svg>
    </TrackedAnchor>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  const location = `footer_${title.toLowerCase().replace(/\s+/g, "_")}`;
  return (
    <div>
      <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
        {title}
      </h3>
      <ul className="mt-4 space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <TrackedLink
              href={l.href}
              location={location}
              ctaLabel={l.label}
              className="text-sm text-[var(--color-sand-300)] hover:text-white"
            >
              {l.label}
            </TrackedLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
