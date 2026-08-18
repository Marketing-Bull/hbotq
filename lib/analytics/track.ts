/**
 * Push one event onto the GTM dataLayer, creating the queue if it does not
 * exist yet.
 *
 * The GTM container loads with `strategy="afterInteractive"`, so it can define
 * `window.dataLayer` *after* React has hydrated. Any event fired from a mount
 * effect — `form_view`, `not_found_view`, the initial `scroll_depth` check on a
 * short page — therefore races the container script. Bailing out when the array
 * is missing dropped exactly those events; creating it here queues them instead,
 * and GTM replays whatever is already in the array when it loads.
 */
function pushToDataLayer(payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: unknown[] };
  (w.dataLayer ??= []).push(payload);
}

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
  // No event parameter: the handler only reports the click, it never inspects
  // or intercepts the event. A zero-arg function is still assignable to
  // onClick, so call sites are unaffected.
  return () => {
    pushToDataLayer({
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
  pushToDataLayer({
    event: eventName,
    ...metadata,
  });
}