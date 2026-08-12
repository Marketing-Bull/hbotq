"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics/track";

const THRESHOLDS = [25, 50, 75, 100] as const;
type Threshold = (typeof THRESHOLDS)[number];

/**
 * Scroll-depth / engagement tracking.
 *
 * Fires a `scroll_depth` dataLayer event each time the user scrolls past
 * one of the configured thresholds (25%, 50%, 75%, 100%). Each threshold
 * fires at most once per page view. The threshold set is reset whenever
 * the pathname changes (so client-side navigations get fresh thresholds).
 *
 * Scroll handling is throttled with requestAnimationFrame so we read
 * `scrollY` at most once per frame, regardless of how many `scroll`
 * events the browser fires.
 *
 * The component renders no DOM (returns null) and is no-op on the
 * server, so it's safe to mount in the root layout.
 */
export function ScrollDepth() {
  const pathname = usePathname();
  const firedRef = useRef<Set<Threshold>>(new Set());
  const tickingRef = useRef(false);

  useEffect(() => {
    // Reset on every page-view (initial mount + every pathname change).
    firedRef.current = new Set();

    // SSR safety: useEffect only runs on the client, but guard anyway
    // in case this ever runs in an unusual environment.
    if (typeof window === "undefined") return;

    const computePercent = (): number => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop || 0;
      const viewport = window.innerHeight || doc.clientHeight || 0;
      const fullHeight = doc.scrollHeight || 0;
      const trackableHeight = fullHeight - viewport;
      // A page that fits entirely within the viewport has nothing to
      // scroll — the user has seen 100% of the content as soon as it
      // renders. Previously this clamped `trackable` to a minimum of 1,
      // which forced `raw` to 0 (scrollTop is always 0 on an unscrollable
      // page) and meant short pages could never fire ANY threshold, even
      // though the user saw the whole page.
      if (trackableHeight <= 0) return 100;
      const raw = (scrollTop / trackableHeight) * 100;
      // Clamp to [0, 100] — overscroll on iOS can push the ratio past 100.
      return Math.min(100, Math.max(0, Math.round(raw)));
    };

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      window.requestAnimationFrame(() => {
        tickingRef.current = false;
        const percent = computePercent();
        for (const t of THRESHOLDS) {
          if (percent >= t && !firedRef.current.has(t)) {
            firedRef.current.add(t);
            trackEvent("scroll_depth", {
              percent: t,
              page: pathname || "/",
            });
          }
        }
      });
    };

    // Fire the initial check once so a short page (or a user who lands
    // already scrolled — e.g. browser restoring scroll position) still
    // gets its 25% threshold if applicable.
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      tickingRef.current = false;
    };
  }, [pathname]);

  return null;
}
