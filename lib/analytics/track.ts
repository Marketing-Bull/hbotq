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
 * Event names, by category:
 *   phone_call            -> `phone_call`
 *   mailto / external     -> `outbound_click`
 *   cta_click             -> `cta_click`
 *
 * Phone gets its own event name rather than hiding inside `outbound_click`.
 * It is the dominant conversion path for this account, and a GTM trigger built
 * on an event literally named `phone_call` is much harder to get wrong than one
 * that has to match `outbound_click` AND `outbound_category == "phone_call"`.
 * `outbound_category` is still emitted on every event so existing filters keep
 * working. `cta_click` covers internal route navigation we want to attribute
 * (primary nav, hero CTAs).
 *
 * Usage:
 *   <a href="tel:..." onClick={trackClick('phone_call', { location: 'sticky_cta' })}>
 *   <a href="https://facebook.com/hbotq" onClick={trackClick('external', { location: 'footer', outbound_target: 'facebook' })}>
 */
const EVENT_NAME_BY_CATEGORY = {
  phone_call: "phone_call",
  mailto: "outbound_click",
  external: "outbound_click",
  cta_click: "cta_click",
} as const;

export function trackClick(
  category: "phone_call" | "mailto" | "external" | "cta_click",
  metadata?: Record<string, string | number | boolean>,
) {
  // No event parameter: the handler only reports the click, it never inspects
  // or intercepts the event. A zero-arg function is still assignable to
  // onClick, so call sites are unaffected.
  return () => {
    pushToDataLayer({
      event: EVENT_NAME_BY_CATEGORY[category],
      outbound_category: category,
      ...metadata,
    });
  };
}

/**
 * Fire a custom dataLayer event for non-link interactions
 * (form submit, sticky-cta dismiss, etc.). Use from onClick / onSubmit.
 */
/**
 * Values allowed on a dataLayer event. Mostly primitives; the one nested shape
 * is `user_data`, which Google Ads Enhanced Conversions expects as an object.
 */
type EventValue =
  | string
  | number
  | boolean
  | Record<string, string | undefined>;

export function trackEvent(
  eventName: string,
  metadata?: Record<string, EventValue>,
) {
  pushToDataLayer({
    event: eventName,
    ...metadata,
  });
}