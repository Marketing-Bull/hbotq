"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Hides site chrome on paid landing pages.
 *
 * `/lp/*` pages are bought traffic. Every link in the primary nav and the
 * footer is an exit path away from the one action the page was paid to produce,
 * so the full header and footer are suppressed there and `app/lp/layout.tsx`
 * supplies a minimal header in their place.
 *
 * Implemented as a gate around server-rendered children rather than a separate
 * root layout: a nested `app/lp/layout.tsx` renders *inside* the root layout, so
 * it cannot remove the root's `<Header />`. Splitting the app into route groups
 * with two root layouts would work but duplicates `<html>`/`<body>`, the font
 * setup and every `<head>` tag for no other gain.
 *
 * The sticky mobile call bar is deliberately NOT gated — on a landing page it is
 * a conversion surface, not an exit.
 */
export function ChromeGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/lp/")) return null;
  return <>{children}</>;
}
