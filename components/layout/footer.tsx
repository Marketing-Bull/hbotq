import Link from "next/link";
import Image from "next/image";
import { footerNav } from "@/lib/data/nav";
import { site } from "@/lib/data/site";
import { locations } from "@/lib/data/locations";

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
            <Link
              href="/"
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
                className="text-white font-semibold hover:underline"
              >
                {site.phone}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="text-[var(--color-sand-300)] hover:text-white"
              >
                {site.email}
              </a>
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

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
        {title}
      </h3>
      <ul className="mt-4 space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-sm text-[var(--color-sand-300)] hover:text-white"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
