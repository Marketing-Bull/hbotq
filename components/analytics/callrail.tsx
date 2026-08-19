"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * CallRail dynamic number insertion ("phone swapping").
 *
 * CallRail's swap.js rewrites every phone number on the page to a tracking
 * number chosen by traffic source, so a call from a Google Ads visit is
 * attributed to the ad rather than landing in the same undifferentiated bucket
 * as organic and direct. It matches on the *rendered* number, which is why the
 * site's real number must stay in the markup — `site.phone` in `lib/data/site.ts`
 * — rather than being replaced by hand.
 *
 * Two things this component handles that a plain GTM tag does not:
 *
 * 1. **Route changes.** swap.js runs its substitution once, at load. This site
 *    is a client-routed App Router app, so navigating from `/lp/wound-care-queens/`
 *    to `/contact-us/` renders fresh markup containing the untouched house
 *    number. Re-running `CallTrk.swap()` after each navigation re-applies it.
 *
 * 2. **`tel:` hrefs.** swap.js rewrites both the visible text and the `href` of
 *    an anchor, so the tracked number is what actually gets dialled on mobile —
 *    where the large majority of these calls originate.
 *
 * Inert until both env vars are set, so preview and local builds do not consume
 * CallRail's number pool or pollute reporting.
 */
export function CallRail({
  companyId,
  scriptId,
}: {
  companyId?: string;
  scriptId?: string;
}) {
  const pathname = usePathname();
  const loadedRef = useRef(false);

  useEffect(() => {
    // Skip the navigation that first mounted the script — swap.js performs its
    // own initial pass, and calling swap() before it is ready throws.
    if (!loadedRef.current) {
      loadedRef.current = true;
      return;
    }
    const w = window as unknown as { CallTrk?: { swap: () => void } };
    try {
      w.CallTrk?.swap();
    } catch {
      // Never let a tracking script break navigation.
    }
  }, [pathname]);

  if (!companyId || !scriptId) return null;

  return (
    <Script
      id="callrail-swap"
      strategy="afterInteractive"
      src={`https://cdn.callrail.com/companies/${companyId}/${scriptId}/12/swap.js`}
    />
  );
}
