import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { pageRedirects } from "@/lib/redirects";

/**
 * Trailing-slash handling with one hop for legacy URLs.
 *
 * `trailingSlash: true` normally 308s `/hyperbaric` to `/hyperbaric/` before
 * any custom redirect runs, so a legacy URL took two hops to reach its real
 * page. `skipTrailingSlashRedirect` (next.config.ts) turns that built-in
 * redirect off; this proxy replaces it: a mapped legacy path goes straight to
 * its destination, anything else gets the slash appended exactly as before.
 *
 * Slashed requests pass through untouched — `redirects()` in next.config.ts
 * covers the slashed legacy spellings.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.endsWith("/")) return NextResponse.next();

  // Build a plain URL: with skipTrailingSlashRedirect on, NextURL drops the
  // trailing slash again when it serialises, which would redirect to itself.
  const destination = pageRedirects[`${pathname}/`] ?? `${pathname}/`;
  return NextResponse.redirect(
    new URL(`${destination}${request.nextUrl.search}`, request.url),
    308,
  );
}

export const config = {
  // Skip the API, Next internals, .well-known and anything with a file
  // extension — the same exemptions the built-in redirect makes.
  matcher: ["/((?!api/|_next/|\\.well-known/|.*\\..*).*)"],
};
