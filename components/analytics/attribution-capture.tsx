"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureAttribution } from "@/lib/analytics/attribution";

/**
 * Records first-touch campaign parameters once per session.
 *
 * Mounted in the root layout so it runs on whichever page the visitor lands on.
 * `captureAttribution` is a no-op after the first record is written, and the
 * pathname dependency only exists so client-side navigations re-check — a
 * visitor can arrive on a page whose link carried the UTMs while the initial
 * document did not.
 */
export function AttributionCapture() {
  const pathname = usePathname();

  useEffect(() => {
    captureAttribution();
  }, [pathname]);

  return null;
}
