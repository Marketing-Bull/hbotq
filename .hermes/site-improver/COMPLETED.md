# COMPLETED — HBOTQ Site Improvements

Format per entry:
- **Date**: YYYY-MM-DD
- **Item**: TODO code (e.g., S-01)
- **Description**: What was done
- **PR**: Link to PR or 'not yet merged' if still open

---

## 2026-06-09 — PR #40
- **T-01** — GTM verification + CTA click tracking. Verified `NEXT_PUBLIC_GTM_ID` is correctly read from `process.env` in `app/layout.tsx:49` and the `GTM` component no-ops cleanly when unset (so local dev with no GTM ID still works). Then closed the last tracking gap: every `/contact-us/` CTA button on the site now fires a `cta_click` dataLayer event with `location` (header, mobile_nav, sticky_cta, sticky_cta_desktop, phone_cta, cta_banner, hero_{variant}) and `cta_label` (e.g. "Book a free consultation") metadata. Components instrumented: `header.tsx`, `mobile-nav.tsx`, `sticky-cta.tsx` (mobile + desktop variants), `phone-cta.tsx`, `cta-banner.tsx`, `hero.tsx` (primary + secondary CTAs). Also added a generic `trackEvent()` helper to `lib/analytics/track.ts` and refactored `consultation-form.tsx` (form_submit) and `sticky-cta.tsx` (sticky_cta_dismiss) onto it to remove the duplicated `dataLayer.push` boilerplate. Combined with T-03 (tel:/mailto:), every outbound-conversion path on the site is now instrumented for GTM.
- **PR**: https://github.com/Marketing-Bull/hbotq/pull/40

## 2026-06-08 — PR #39 (updated)
- **SE-04** — Comprehensive noIndex audit. Audited all 19 routes (every non-API page under `app/`) and tightened indexability: added `noIndex: true` to `/privacy-policy`, `/terms-of-service`, `/accessibility` (they were previously indexable and were diluting SEO equity away from the medical condition/marketing pages that drive conversions), and removed the three legal pages from `app/sitemap.ts` (sitemap entries contradict `noIndex` declarations, so they must be excluded together). The 8 indexable marketing/condition pages remain in the sitemap. Footer links to the legal pages are preserved, so internal PageRank still flows — they just don't compete in search results. `app/not-found.tsx` is auto-handled by Next.js. `app/api/consultation` is a POST API route with no HTML render.
- **PR**: https://github.com/Marketing-Bull/hbotq/pull/39

## 2026-06-06 — PR #39
- **C-02** — Sticky CTA improvements. Replaced the mobile-only `StickyCta` (which was `lg:hidden`) with a dual-layout component: desktop (≥1024px) now renders a floating vertical pill in the bottom-right with `Call 718-925-3322` (primary, brand) and `Book consultation` (accent) stacked buttons, plus a small ✕ dismiss. Mobile keeps the existing two-button bottom bar with an added ✕ dismiss. Dismiss state persists in `localStorage` under `hbotq:sticky_cta:dismissed_at` with a 7-day re-show window. Fires a new `dataLayer` `sticky_cta_dismiss` event (with `location: mobile|desktop`) and the existing `outbound_click` event for phone clicks (`location: sticky_cta_desktop`). Hydration-safe: component returns `null` until `useEffect` mounts so the localStorage check doesn't cause SSR/CSR mismatch. Graceful fallback if localStorage is unavailable.
- **PR**: https://github.com/Marketing-Bull/hbotq/pull/39

---

## 2026-05-29 — PR #1
- **S-01** — Added `aggregateRatingSchema()` using 5 testimonial ratings (5.0 avg) + site-wide injection in `layout.tsx`
- **S-02** — Added `reviewSchema()` helper for individual patient review JSON-LD
- **S-03** — Verified `medicalConditionSchema()` is rendered via `<JsonLd>` on each `condition/[slug]` page
- **T-02** — Added GTM `form_submit` dataLayer event on successful consultation form submission (with `form_name`, `form_condition`)
- **SE-02** — Created `public/robots.txt` allowing all crawlers + sitemap reference
- **Infrastructure** — Created `.hermes/site-improver/` with RUN.md + TODO.md + COMPLETED.md for nightly automation
- **PR**: https://github.com/Marketing-Bull/hbotq/pull/1

## 2026-06-02 — PR #1 (open)
- **T-04** — Added Google Business Profile link to footer with accessible SVG icon (Facebook/Instagram/GBP), added `googleBusinessProfile` to `site.social` data, added GBP URL to `medicalBusinessSchema()` `sameAs` array for LocalBusiness rich snippets. GBP listing confirmed at 4.7 stars, phone (718) 306-6459.
- **PR**: https://github.com/Marketing-Bull/hbotq/pull/1

## 2026-06-01 — PR #1 (open)
- **SE-05** — Added geo meta tags (`geo.region=NY-US`, `geo.placename=Woodside, Queens`) to homepage, /conditions/, /contact-us/, and all individual `/condition/[slug]/` pages via an extended `buildMetadata({ geo: {...} })`. Implemented by adding `geo.region` and `geo.placename` to the Next.js `Metadata.other` field in `lib/seo/metadata.ts`.
- **SE-04** — Audit: `thank-you/` page already has `noIndex: true` ✓; `accessibility/` intentionally indexable (public content) ✓
- **SE-03** — Audit: `sitemap.ts` covers all static routes + dynamic `/condition/[slug]/` routes via `generateStaticParams` ✓
- **PR**: https://github.com/Marketing-Bull/hbotq/pull/1

## 2026-05-31 — PR #1 (open, 4th commit)
- **SE-01** — Created 5 page-specific OG images at 1200×630 using existing site photography + ImageMagick text overlays: homepage (patient-in-chamber), conditions (diabetic-wounds), treatment (facility chamber), physicians (Dr. Sadhnani), contact-us (service). Each page now passes its own `image` to `buildMetadata()` so social shares show context-relevant previews instead of the generic `default.jpg`
- **PR**: https://github.com/Marketing-Bull/hbotq/pull/1

## 2026-05-30 — PR #2 (open)
- **S-03 (cleanup)** — Fixed type error: `aggregateRatingSchema()` can return `null`, guarded with conditional render in `layout.tsx` so `JsonLd` only receives non-null data
- **PR**: https://github.com/Marketing-Bull/hbotq/pull/1 (same branch, auto-updated)

## 2026-06-04 — PR #1 (open)
- **T-03** — Added `lib/analytics/track.ts` with `trackClick()` helper that fires `dataLayer.push({ event: 'outbound_click', outbound_category, location })` on tel: and mailto: link clicks. Applied to all phone/email links across: StickyCta, Hero, PhoneCta, CtaBanner, Header, Footer, MobileNav. All tracking components marked `"use client"` for onClick handler support. GTM already loads via `afterInteractive` Script — no additional GTM setup needed.
- **PR**: https://github.com/Marketing-Bull/hbotq/pull/1

## 2026-06-05 — PR #37
- **S-01** — Moved `AggregateRating` from a separate `aggregateRatingSchema()` (rendered as its own JSON-LD block in `layout.tsx`) into `medicalBusinessSchema()` as a nested `aggregateRating` property. Now computes actual avg rating from 5 testimonials (5.0). Removed redundant second `<JsonLd>` injection — all business-level structured data now in a single JSON-LD block. Fallback to 4.8 placeholder when no testimonials exist.
- **PR**: https://github.com/Marketing-Bull/hbotq/pull/37
- **S-02** — Added individual `@type: Review` JSON-LD for all 5 testimonials rendered in `app/page.tsx` via `<JsonLd data={reviewSchema(...)} />`. Each Review includes author, quote, conditionLabel, and star rating. Previously only the helper function existed in `lib/seo/schemas.ts`; now the schemas are actually injected into the homepage DOM.
- **PR**: https://github.com/Marketing-Bull/hbotq/pull/1
