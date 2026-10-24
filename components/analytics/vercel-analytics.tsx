"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/next";

/**
 * Vercel Web Analytics, mounted only after the page has finished loading and
 * the browser is idle. `<Analytics />` on its own injects its script right
 * after hydration, which competes with the hero image and first interactions;
 * waiting for `load` + idle time keeps it off the critical path, so it cannot
 * affect LCP or INP. The cost is that a visitor who bounces before the page
 * finishes loading is not counted.
 */
export function VercelAnalytics() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let idleHandle: number | undefined;
    let timeoutHandle: ReturnType<typeof setTimeout> | undefined;

    const schedule = () => {
      if ("requestIdleCallback" in window) {
        idleHandle = window.requestIdleCallback(() => setReady(true), {
          timeout: 4000,
        });
      } else {
        timeoutHandle = setTimeout(() => setReady(true), 2000);
      }
    };

    if (document.readyState === "complete") {
      schedule();
    } else {
      window.addEventListener("load", schedule, { once: true });
    }

    return () => {
      window.removeEventListener("load", schedule);
      if (idleHandle !== undefined) window.cancelIdleCallback(idleHandle);
      if (timeoutHandle !== undefined) clearTimeout(timeoutHandle);
    };
  }, []);

  return ready ? <Analytics /> : null;
}
