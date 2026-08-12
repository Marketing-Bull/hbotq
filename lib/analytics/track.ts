/**
 * GTM outbound link click tracking.
 * Fire a dataLayer event when users click tel:, mailto:, or external
 * (social / GBP / other off-site) links.
 * Call this from onClick on any <a> element.
 *
 * The dataLayer event name is `outbound_click` for phone_call / mailto /
 * external — all three are "leaving the site" conversion events from
 * GTM's perspective. `cta_click` is a separate event used for internal
 * route navigation that we still want to attribute (primary nav, hero
 * CTAs, etc.).
 *
 * Usage:
 *   <a href="tel:..." onClick={trackClick('phone_call', { location: 'sticky_cta' })}>
 *   <a href="https://facebook.com/hbotq" onClick={trackClick('external', { location: 'footer', outbound_target: 'facebook' })}>
 */
export function trackClick(
  category: "phone_call" | "mailto" | "external" | "cta_click",
  metadata?: Record<string, string | number | boolean>,
) {
  return (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window === "undefined" || !("dataLayer" in window)) return;
    (window as { dataLayer: unknown[] }).dataLayer.push({
      event: category === "cta_click" ? "cta_click" : "outbound_click",
      outbound_category: category,
      ...metadata,
    });
  };
}

/**
 * Fire a custom dataLayer event for non-link interactions
 * (form submit, sticky-cta dismiss, etc.). Use from onClick / onSubmit.
 */
export function trackEvent(
  eventName: string,
  metadata?: Record<string, string | number | boolean>,
) {
  if (typeof window === "undefined" || !("dataLayer" in window)) return;
  (window as { dataLayer: unknown[] }).dataLayer.push({
    event: eventName,
    ...metadata,
  });
}