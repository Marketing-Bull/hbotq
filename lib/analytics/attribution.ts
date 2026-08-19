/**
 * First-touch campaign attribution for consultation leads.
 *
 * A patient rarely converts on the page the ad dropped them on — they land on
 * `/lp/wound-care-queens/?utm_source=google&gclid=...`, read a condition page,
 * then submit from `/contact-us/`. By that point the URL carries no campaign
 * parameters at all, so the lead reaches the CRM with no way to trace it back
 * to the keyword that produced it.
 *
 * So we capture the campaign parameters on the first page of the session and
 * hold them in sessionStorage for the rest of it. First touch wins: a visitor
 * who arrives from an ad and later clicks an internal link with its own UTMs
 * stays attributed to the ad.
 *
 * sessionStorage rather than a cookie or localStorage:
 * - it is not sent to the server on every request, and it dies with the tab,
 *   which keeps this out of consent-banner territory;
 * - it does not leak one visit's attribution onto a later, unrelated one.
 */

const STORAGE_KEY = "hbotq_attribution";

/** Campaign parameters we read off the landing URL. */
const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

/** Click identifiers, by ad platform. */
const CLICK_ID_KEYS = ["gclid", "gbraid", "wbraid", "fbclid", "msclkid"] as const;

export interface Attribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  fbclid?: string;
  msclkid?: string;
  /** Path (no query) of the first page seen this session. */
  landing_page?: string;
  /** document.referrer at first touch, empty for direct arrivals. */
  referrer?: string;
  /** ISO 8601 timestamp of first touch. */
  first_seen_at?: string;
}

/** Values are echoed into email and the CRM — keep them short and printable. */
const MAX_VALUE_LENGTH = 200;

function clean(value: string | null): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim().slice(0, MAX_VALUE_LENGTH);
  return trimmed || undefined;
}

function readFromUrl(): Attribution {
  const params = new URLSearchParams(window.location.search);
  const found: Attribution = {};

  for (const key of UTM_KEYS) {
    const value = clean(params.get(key));
    if (value) found[key] = value;
  }
  for (const key of CLICK_ID_KEYS) {
    const value = clean(params.get(key));
    if (value) found[key] = value;
  }

  // Only stamp landing page and referrer when there is campaign data worth
  // attributing — otherwise every direct visit would write a useless record and
  // occupy the first-touch slot ahead of a later, real campaign arrival.
  if (Object.keys(found).length === 0) return {};

  found.landing_page = window.location.pathname;
  found.referrer = clean(document.referrer) ?? "";
  found.first_seen_at = new Date().toISOString();
  return found;
}

function readStored(): Attribution | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return null;
    }
    return parsed as Attribution;
  } catch {
    // Private browsing, storage disabled, or a corrupt value. Attribution is a
    // nice-to-have — never let it break the form.
    return null;
  }
}

/**
 * Capture campaign parameters from the current URL if this is the first touch
 * of the session. Safe to call on every page; later calls are no-ops once a
 * record exists. Call from a mount effect — it touches `window`.
 */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  if (readStored()) return; // first touch wins

  const found = readFromUrl();
  if (Object.keys(found).length === 0) return;

  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
  } catch {
    // Storage unavailable — the form still submits, just without attribution.
  }
}

/**
 * The attribution recorded for this session, or an empty object when the
 * visitor arrived without campaign parameters.
 */
export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  return readStored() ?? {};
}
