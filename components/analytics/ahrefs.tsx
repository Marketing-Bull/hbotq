import Script from "next/script";

/**
 * Ahrefs Web Analytics.
 *
 * `lazyOnload` injects the script client-side during browser idle time, after
 * the page and all its resources have loaded, so it cannot compete with the
 * hero image, fonts or hydration and does not affect LCP or INP. The site key
 * is a public identifier (it ships in the page source by design).
 */
const AHREFS_ANALYTICS_KEY = "zHRdSKIfkbyP0+tHuB57ew";

export function AhrefsAnalytics() {
  // Only count real visits — local `next dev` traffic would pollute reporting.
  if (process.env.NODE_ENV !== "production") return null;
  return (
    <Script
      id="ahrefs-analytics"
      src="https://analytics.ahrefs.com/analytics.js"
      data-key={AHREFS_ANALYTICS_KEY}
      strategy="lazyOnload"
    />
  );
}
