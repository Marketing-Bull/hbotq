"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/**
 * Reads the user's reduced-motion preference as a reactive value.
 *
 * Uses `useSyncExternalStore` rather than `useState` + `useEffect`: the
 * preference is external browser state, and reading it inside an effect means
 * calling `setState` synchronously on mount — which triggers a cascading
 * re-render and is flagged by `react-hooks/set-state-in-effect`.
 *
 * The server snapshot returns `false` (SSR has no `window.matchMedia`), so the
 * markup renders in its pre-animation state and React re-renders after
 * hydration if the user actually prefers reduced motion. Changing the OS
 * setting while the page is open updates live via the `change` listener.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
