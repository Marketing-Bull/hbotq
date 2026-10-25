import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { site } from "@/lib/data/site";
import { APEX_HOST, fileRedirects, pageRedirects } from "@/lib/redirects";

/**
 * Two jobs, each in a single hop.
 *
 * 1. Trailing slash. `trailingSlash: true` normally 308s `/hyperbaric` to
 *    `/hyperbaric/` before any custom redirect runs, so a legacy URL took two
 *    hops to reach its real page. `skipTrailingSlashRedirect` (next.config.ts)
 *    turns that built-in redirect off; this proxy replaces it: a mapped legacy
 *    path goes straight to its destination, anything else gets the slash
 *    appended exactly as before. Slashed requests pass through untouched —
 *    `redirects()` in next.config.ts covers the slashed legacy spellings.
 *
 * 2. Bare domain → www. When `hbotq.com` is attached to the project as a
 *    normal domain (not as a Vercel-level redirect), requests for it land here
 *    and are sent to `www.hbotq.com` with the legacy mapping and slash already
 *    applied, instead of redirect-to-www then redirect-to-destination. While
 *    Vercel still redirects the bare domain, those requests never reach the
 *    app, so this branch is inert. See docs/apex-redirect.md.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const host = (request.headers.get("host") ?? "").split(":")[0].toLowerCase();
  const isApex = host === APEX_HOST;

  const destination = resolve(pathname);

  if (isApex) {
    // 308 keeps the method, matching what Vercel's own domain redirect does.
    return NextResponse.redirect(
      new URL(`${destination ?? pathname}${search}`, site.url),
      308,
    );
  }

  if (destination === null || destination === pathname) {
    return NextResponse.next();
  }
  // Build a plain URL: with skipTrailingSlashRedirect on, NextURL drops the
  // trailing slash again when it serialises, which would redirect to itself.
  return NextResponse.redirect(new URL(`${destination}${search}`, request.url), 308);
}

/**
 * The final path for `pathname`, or null when it needs no redirect: a slashed
 * path with no legacy mapping, or an excluded path (API, Next internals,
 * .well-known, anything with a file extension — the exemptions the built-in
 * trailing-slash redirect makes).
 */
function resolve(pathname: string): string | null {
  const file = fileRedirects[pathname];
  if (file) return file;

  const excluded =
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/.well-known/") ||
    /\.[^/]+$/.test(pathname);
  if (excluded) return null;

  const slashed = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return pageRedirects[slashed] ?? slashed;
}

export const config = {
  matcher: [
    // www and preview hosts: only paths that can need the slash redirect.
    "/((?!api/|_next/|\\.well-known/|.*\\..*).*)",
    // The bare domain: every path, so assets and API calls also reach www.
    { source: "/:path*", has: [{ type: "host", value: "hbotq.com" }] },
  ],
};
