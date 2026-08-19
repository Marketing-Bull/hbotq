"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { trackClick } from "@/lib/analytics/track";

/**
 * Thin `"use client"` wrappers that add a dataLayer event to a link without
 * turning the whole surrounding section into a client component.
 *
 * The header, footer, hero, sticky CTA and CTA banners are server components
 * rendering static markup — the only reason they would need to be client
 * components is the `onClick` handler. Wrapping just the anchor keeps those
 * sections server-rendered and keeps the tracking metadata (location +
 * cta_label) at the call site, where it is readable.
 *
 * Event shapes match the rest of the site (see `lib/analytics/track.ts`):
 * internal navigation fires `cta_click`, and tel: / mailto: / off-site links
 * fire `outbound_click` with the matching `outbound_category`.
 */

interface TrackMeta {
  /** Where on the page the link lives, e.g. "header", "sticky_cta". */
  location: string;
  /** Which link it is within that location, e.g. "book_consultation". */
  ctaLabel: string;
}

type TrackedLinkProps = TrackMeta & ComponentProps<typeof Link>;

/** Internal route link that reports a `cta_click` when clicked. */
export function TrackedLink({
  location,
  ctaLabel,
  onClick,
  children,
  ...props
}: TrackedLinkProps) {
  const report = trackClick("cta_click", {
    location,
    cta_label: ctaLabel,
  });
  return (
    <Link
      {...props}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        report();
        onClick?.(e);
      }}
    >
      {children}
    </Link>
  );
}

type TrackedAnchorProps = TrackMeta &
  ComponentProps<"a"> & {
    /** Which off-site category this is — picks the `outbound_category`. */
    category: "phone_call" | "mailto" | "external";
  };

/** Plain `<a>` (tel:, mailto:, off-site) that reports an `outbound_click`. */
export function TrackedAnchor({
  category,
  location,
  ctaLabel,
  onClick,
  children,
  ...props
}: TrackedAnchorProps) {
  const report = trackClick(category, {
    location,
    cta_label: ctaLabel,
  });
  return (
    <a
      {...props}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        report();
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
