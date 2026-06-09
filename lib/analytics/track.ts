/**
 * GTM outbound link click tracking.
 * Fire a dataLayer event when users click tel: or mailto: links.
 * Call this from onClick on any <a> element.
 *
 * Usage:
 *   <a href="tel:..." onClick={trackClick('phone_call', { location: 'sticky_cta' })}>
 */
export function trackClick(
  category: "phone_call" | "mailto" | "cta_click",
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