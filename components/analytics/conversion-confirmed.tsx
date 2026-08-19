"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics/track";
import {
  getAttribution,
  consumePendingConversion,
} from "@/lib/analytics/attribution";

/**
 * Conversion signal for the confirmation page.
 *
 * A page-view on `/thank-you/` is the sturdiest Google Ads conversion trigger
 * available — it survives GTM misconfiguration that would drop a custom event —
 * so it is worth having alongside `form_submit`.
 *
 * It fires only when the form actually recorded a submission this session, and
 * only once. `consumePendingConversion()` reads and clears the flag the form
 * sets on success, which handles both failure modes in one step:
 *
 * - a refresh, back-navigation, or bookmark of `/thank-you/` finds no flag and
 *   fires nothing, so one lead produces one conversion rather than one per view;
 * - landing here directly, without submitting, never had a flag to begin with
 *   and cannot claim a conversion that did not happen.
 *
 * Both matter once this is wired to Ads: duplicate or phantom conversions feed
 * straight into automated bidding.
 *
 * The event carries the same campaign fields as `form_submit`, so whichever
 * trigger GTM ends up using can attribute the conversion.
 */
export function ConversionConfirmed() {
  useEffect(() => {
    if (!consumePendingConversion()) return;

    const attribution = getAttribution();
    trackEvent("conversion_confirmed", {
      form: "consultation",
      utm_source: attribution.utm_source ?? "",
      utm_medium: attribution.utm_medium ?? "",
      utm_campaign: attribution.utm_campaign ?? "",
      has_gclid: Boolean(attribution.gclid),
    });
  }, []);

  return null;
}
