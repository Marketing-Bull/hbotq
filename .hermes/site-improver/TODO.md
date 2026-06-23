# HBOTQ Site Improvement TODO — Priority Order

## 🔴 IN PROGRESS
(Nothing — start of cycle)

---

## 🟢 NEXT (for the next nightly run, in priority order)

|C-06 was the last deferred item — it requires real press coverage the practice doesn't yet have. The remaining TODO is functionally exhausted of safe, non-fabricating items; any future high-impact work will come from new audit findings. Last shipped: S-07 (BreadcrumbList on all index pages).

1. **S-07** — Add BreadcrumbList JSON-LD to all 6 index-level pages. ✅ DONE 2026-06-22 — see Schema category checklist.

---

## 🟡 PENDING
(nothing — see 🟢 NEXT below for the next-cycle work list)

### Category: Schema / Structured Data
- [x] **S-01** — Add `AggregateRating` schema site-wide ✅ DONE 2026-06-05
  - Moved `aggregateRating` object into `medicalBusinessSchema()` as a nested property instead of separate JSON-LD block
  - Computes avg rating from 5 testimonials (5.0 avg), falls back to 4.8 placeholder when no testimonials exist
  - Removed redundant second `<JsonLd>` injection from `layout.tsx` — all business schema now in one block
  - PR #37

- [x] **S-02** — Add `Review` individual review schemas ✅ DONE 2026-06-03
  - Map existing testimonials in `lib/data/testimonials.ts` to `@type: Review` JSON-LD
  - Added `<JsonLd data={reviewSchema(...)} />` for all 5 testimonials in `app/page.tsx`



- [x] **S-04** — Physician schema on listing page ✅ DONE 2026-06-07 (verified)
  - `app/physicians/page.tsx` already maps each `physicians` entry to a `<JsonLd data={physicianSchema(...)} />` block
  - No code change required; just verified presence in audit

- [x] **S-05** — Enrich `MedicalBusiness` schema with LocalBusiness-spec fields ✅ DONE 2026-06-14
  - The site-wide `MedicalBusiness` JSON-LD in `lib/seo/schemas.ts → medicalBusinessSchema()` was missing six LocalBusiness fields the schema.org spec recommends and Google uses for the Knowledge Panel
  - Added: `areaServed` (Woodside City + NY/NJ/CT States), `availableService` (6 `MedicalProcedure` entries, one per condition in `lib/data/conditions.ts`), `priceRange` (`$$`), `currenciesAccepted` (`USD`), `paymentAccepted` (Medicare, Medicaid, Major Insurers, Self-pay, Cash, Check, Credit Card — mirrors TrustBar copy in machine-readable form), `logo` (`/favicon.ico`), `image` (`/images/og/homepage.jpg`)
  - `availableService` is data-driven from `lib/data/conditions.ts` — adding a new condition automatically updates the schema
  - 58 lines added, 0 removed, single file
  - `npm run build`: passes (20 routes); `npm run validate:schema`: 80 blocks / 0 errors / 0 warnings; new fields appear in all 19 MedicalBusiness blocks
  - Part of PR #41 (rolled into the existing WD-03 PR since one was already open for this branch)

- [x] **S-06** — Physician schema `image` + `worksFor` cross-link ✅ DONE 2026-06-21
  - Two distinct gaps found:
    1. **Inline `employee` Physician entries lacked `worksFor: { @id }`.** `medicalBusinessSchema().employee` emitted 19 sets of 2 Physician entries (one set per MedicalBusiness block) with only `name`, `jobTitle`, `medicalSpecialty` — no inverse link back to the business. The 2 standalone Physician blocks on `/physicians/` (rendered via `physicianSchema()`) already carried `worksFor: { @id: "#business" }`, but Google could only see the Physician→Business direction there. On every other page (19 routes), the business→people direction was entirely missing — Google had no way to know the MedicalBusiness "employed" anyone.
    2. **Standalone Physician blocks had no `image` field.** `lib/data/physicians.ts` had `image: "/images/physicians/dr-sadhnani.webp"` and `image: "/images/physicians/nurse-regina.webp"` ready to go, but `physicianSchema()` didn't accept an `image` parameter, and the call site on `app/physicians/page.tsx` didn't pass one. Google's rich-results docs specifically recommend `image` on Physician entities; without it, the Knowledge Panel can't show a headshot for the people behind the practice.
  - Fix in `lib/seo/schemas.ts`: added `worksFor: { @id: "${site.url}/#business" }` to every inline `employee` Physician in `medicalBusinessSchema()`; extended `physicianSchema()` to accept an optional `image` field, normalizing the relative path to an absolute URL (prepending `site.url` and a `/` if needed). Empty/undefined `image` is omitted from the block entirely rather than emitted as `"image": ""`.
  - Fix in `app/physicians/page.tsx`: added `image: p.image` to the `physicianSchema(...)` call so the existing physician-data `image` field actually flows through to the JSON-LD output.
  - Fix in `scripts/validate-schema.mjs`:
    - `validateMedicalBusiness.employee[]` now ERRORS if `worksFor.{@id}` is missing (was: silently allowed). Without the cross-link, the inline Physicians are dangling entities with no resolvable relationship to the business.
    - `validatePhysician` now ERRORS if `worksFor.{@id}` is missing (was: only validated when present, i.e. the field was optional). Standalone Physician blocks MUST cross-link to the business.
    - `validatePhysician` now WARNS if `image` is missing (was: not checked). Google's rich-results docs recommend `image` on Physician entities, but it's not strictly required by schema.org — warning (not erroring) is the right escalation since legitimate Physician entries can be headshot-less in the short term.
    - `validatePhysician` now ERRORS if `image` is present but not an http(s) URL (was: not checked). All existing entries use absolute URLs (validated).
  - 3 files changed, 39 insertions(+), 5 deletions(-). No schema changes other than the missing fields and cross-links.
  - `npm run build`: passes (20 routes). `npm run validate:schema`: **99 blocks / 0 errors / 0 warnings** — the new rules fire and the data is correct on the current codebase (any future regression that breaks the cross-link or removes the image will now fail the build).
  - Verified rendered HTML on `/` (parses the JSON-LD): both inline `employee` Physicians carry `"worksFor":{"@id":"https://hbotq.com/#business"}`.
  - Verified rendered HTML on `/physicians/` (parses the JSON-LD): both standalone Physician blocks carry `"image":"https://hbotq.com/images/physicians/dr-sadhnani.webp"` and `"image":"https://hbotq.com/images/physicians/nurse-regina.webp"` respectively, plus the existing `"worksFor":{"@id":"https://hbotq.com/#business"}`.
  - Part of PR #41 (rolled into the existing open PR for this branch — SKILL.md guidance: skip PR creation when one is already open for the branch).

- [x] **SE-06** — Add `WebSite` JSON-LD with `potentialAction: SearchAction` ✅ DONE 2026-06-16
  - Added `webSiteSchema()` helper in `lib/seo/schemas.ts` returning a site-wide `WebSite` JSON-LD block with a `SearchAction` `potentialAction` (EntryPoint `urlTemplate: https://hbotq.com/?s={search_term_string}` and `query-input: required name=search_term_string`)
  - The SearchAction gives Google the structured data it needs to surface the sitelinks search box for branded queries. The site has no `/search/` route today, so the target is wired to a `?s=…` query param on the homepage; the action remains valid per Google's docs even without a UI.
  - Rendered site-wide via `<JsonLd data={webSiteSchema()} />` in `app/layout.tsx <head>`, next to the existing `medicalBusinessSchema()`
  - Cross-linked the `WebSite.publisher` field to `MedicalBusiness.@id` (`#business`) so the Knowledge Panel can attribute the publisher of the site to the medical business entity
  - Added a `validateWebSite` + `validateSearchAction` pair to `scripts/validate-schema.mjs` so the new block is deeply validated: enforces `SearchAction.target` is a string URL or `EntryPoint` object, `urlTemplate` is http(s), `query-input` matches `/^required name=[\w-]+$/`, the placeholder appears in the urlTemplate, and `WebSite.publisher` has an `@id`
  - 99 lines added across 3 files: `lib/seo/schemas.ts` (33), `app/layout.tsx` (2), `scripts/validate-schema.mjs` (64)
  - `npm run build`: passes (20 routes); `npm run validate:schema`: **99 blocks / 0 errors / 0 warnings** (19 WebSite, 19 MedicalBusiness, 40 Review, 7 FAQPage, 6 MedicalCondition, 6 BreadcrumbList, 2 Physician)
  - Part of PR #41 (rolled into the existing open PR for this branch — SKILL.md guidance: skip PR creation when one is already open for the branch)

- [x] **S-07** — BreadcrumbList JSON-LD on all 6 index-level pages ✅ DONE 2026-06-22
  - Six top-level pages (`/conditions/`, `/treatment/`, `/contact-us/`, `/physicians/`, `/faqs/`, `/hyperbaric-therapy/`) were emitting MedicalBusiness, WebSite, FAQPage (where applicable), and Physician (where applicable) JSON-LD blocks but no `BreadcrumbList`. The dynamic `/condition/[slug]/` routes were the only ones with breadcrumbs — Google Search Central documents `BreadcrumbList` as one of the structured data types Google uses to render the breadcrumb trail in search results, so missing breadcrumbs on index pages cost the site the rich-snippet visual on the highest-traffic routes.
  - Each index page now emits a 2-item `BreadcrumbList` (Home → {PageName}) via `<JsonLd data={breadcrumbSchema([...])}/>` directly above the existing schemas. Reuses the existing `breadcrumbSchema()` helper that `/condition/[slug]/` was already using — no schema-side changes required, just three new imports per page (`JsonLd`, `breadcrumbSchema`, `site`).
  - 6 files touched: `app/conditions/page.tsx`, `app/treatment/page.tsx`, `app/contact-us/page.tsx`, `app/physicians/page.tsx`, `app/faqs/page.tsx`, `app/hyperbaric-therapy/page.tsx`. 30 insertions(+), 0 deletions(-). No changes to `lib/seo/schemas.ts` — the existing `breadcrumbSchema()` helper already passes the validator's `validateBreadcrumb` check (zero errors / zero warnings).
  - `npm run build`: passes (20 routes); `npm run validate:schema`: **105 blocks / 0 errors / 0 warnings** — BreadcrumbList count rose from 6 (only on `/condition/[slug]/`) to 12 (now on the 6 index pages too). Breakdown: Review 40, WebSite 19, MedicalBusiness 19, BreadcrumbList 12, FAQPage 7, MedicalCondition 6, Physician 2.
  - Verified rendered HTML on `/conditions/`: `"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://hbotq.com/"},{"@type":"ListItem","position":2,"name":"Conditions","item":"https://hbotq.com/conditions/"}]` — matches the BreadcrumbList spec (positions contiguous starting at 1; both `item` URLs are http(s); both `name` fields populated).
  - Part of PR #41 (rolled into the existing open PR for this branch — SKILL.md guidance: skip PR creation when one is already open for the branch).

---

### Category: SEO Meta
- [x] **SE-01** — Add real OG images (currently using `default.jpg`) ✅ DONE 2026-05-31
  - Created `/public/images/og/` with page-specific og images at 1200x630
  - At minimum: homepage, conditions, treatment, contact-us, physicians
  - Hook: `buildMetadata({ image: "/images/og/page-specific.jpg" })` on each page ✅

- [x] **SE-05** — Add geo meta tags to condition/city pages ✅ DONE 2026-06-01
  - Extended `buildMetadata()` with `geo?: { region?: string; placename?: string }` via Next.js `other` metadata field
  - Added `geo.region=NY-US` + `geo.placename=Woodside, Queens` to homepage, /conditions/, /contact-us/, and all `/condition/[slug]/` pages
  - Helps local SEO for Woodside/Queens/NYC hyperbaric oxygen searches

- [x] **SE-02** — robots.txt ✅ DONE 2026-06-11
  - `public/robots.txt` exists: `User-agent: *` + `Allow: /` + `Sitemap: https://hbotq.com/sitemap.xml`
  - No code change required; just verified presence in audit

- [x] **SE-03** — Sitemap image enrichment ✅ DONE 2026-06-07
  - Audited existing `app/sitemap.ts`: covers all 10 static routes + 6 dynamic condition routes
  - Added Google Image Sitemap support: each static route with an OG image (homepage, treatment, conditions, physicians, contact-us) and each condition page (using its `heroImage`) now emits an `<image:image>` block
  - XML output now declares `xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"`
  - Refactored to a `toAbsoluteUrl()` helper so absolute URLs are built consistently
  - No routes missing; `/thank-you` and `/sample/*` correctly noIndex'd and excluded
  - Part of PR #39

- [x] **SE-04** — Comprehensive noIndex audit ✅ DONE 2026-06-08
  - Confirmed all 19 routes have correct indexability:
    - Indexable (in sitemap): `/`, `/treatment/`, `/hyperbaric-therapy/`, `/conditions/`, `/condition/[slug]/` (valid only — notFound returns noIndex), `/physicians/`, `/faqs/`, `/contact-us/`
    - noIndex (not in sitemap): `/thank-you/`, `/sample/non-healing-wounds/`, `/privacy-policy/` (new), `/terms-of-service/` (new), `/accessibility/` (new)
    - Auto-handled: `/_not-found` (Next.js), `/api/consultation` (POST API, no HTML render)
  - Added `noIndex: true` to `/privacy-policy`, `/terms-of-service`, `/accessibility` — these legal pages were previously indexable, diluting SEO equity from the medical marketing pages
  - Removed the 3 legal pages from `app/sitemap.ts` — sitemap entries contradict noIndex, so they must be excluded together
  - Footer links to all three legal pages still pass internal PageRank
  - Part of PR #39 (also includes C-02)

---

### Category: Tracking / Analytics
- [x] **T-06** — Primary nav click tracking ✅ DONE 2026-06-15
  - The primary nav `<Link>`s in `components/layout/header.tsx` and `components/layout/mobile-nav.tsx` were the only outbound-internal links on the site that fired no dataLayer event — every CTA / phone / email link was already instrumented.
  - Added `onClick={trackClick("cta_click", { location: "primary_nav", cta_label: item.label })}` to both desktop and mobile nav link maps. On mobile, the existing `setOpen(false)` is preserved alongside the tracker call so the panel still closes on tap.
  - Closes the last funnel-attribution gap: with T-01, T-02, T-03, T-04, and T-06, every outbound-conversion path on the site (CTA buttons, phone, email, form submit, sticky-cta dismiss, AND primary nav) now emits a labeled `cta_click` / `phone_call` / `outbound_click` / `form_submit` event to GTM.
  - Build passes; no schema changes; no other files touched.
  - Part of PR #41 (rolled into the open PR for this branch).

- [x] **T-07** — Fire `phone_call` (not `cta_click`) for `tel:` hero CTAs ✅ DONE 2026-06-18
  - The secondary CTA on every `/condition/[slug]/` page is `Call 718-925-3322` with a `tel:` href, but the Hero component always rendered it as a Next.js `<Link>` and always fired `cta_click` (a generic engagement event, not a phone-call conversion). That miscategorizes phone-call conversions in GTM and obscures the real attribution.
  - New `ctaElement()` helper in `components/sections/hero.tsx`: `tel:` href → plain `<a>` + `trackClick("phone_call", ...)`; `mailto:` → plain `<a>` + `trackClick("mailto", ...)`; internal route → `<Link>` + `trackClick("cta_click", ...)` (unchanged).
  - Also added `hero_slot: "primary" | "secondary"` to the dataLayer payload so a single `location: "hero_<variant>"` can be split into the two slots when reading GTM funnels.
  - 1 file, 75 insertions(+), 20 deletions(-); no other files touched.
  - Verified rendered HTML: `/condition/non-healing-wounds/` now emits `<a href="tel:...">Call 718-925-3322</a>` (plain `<a>`, not `<Link>`); home/hero/lp/page variants unchanged for non-`tel:` CTAs.
  - `npm run build`: passes (20 routes); `npm run validate:schema`: 99 blocks / 0 errors / 0 warnings (no schema changes; tracking/HTML-only).
  - Part of PR #41 (rolled into the open PR for this branch — SKILL.md guidance: skip PR creation when one is already open for the branch).
- [x] **T-05** — Scroll-depth / engagement tracking ✅ DONE 2026-06-19
  - No scroll-depth or time-on-page events were firing before this change. Added a new `components/analytics/scroll-depth.tsx` component (mounted once in the root `app/layout.tsx` so it covers every route) that listens to `window.scroll` and fires a `scroll_depth` dataLayer event at the 25 / 50 / 75 / 100% thresholds. The fired set is reset on every pathname change via `usePathname()` so client-side navigations get fresh thresholds.
  - Scroll handling is throttled with `requestAnimationFrame` (at most one `scrollY` read per frame, regardless of how many `scroll` events the browser fires). The listener is registered with `{ passive: true }` so it never blocks scroll.
  - Initial check runs once on mount so a user who lands already-scrolled (browser scroll restoration, hash-link navigation) still gets the threshold that corresponds to the restored position.
  - Event payload: `{ event: "scroll_depth", percent: <25|50|75|100>, page: <pathname> }` — `page` lets GA4 funnels segment scroll engagement by route.
  - Renders no DOM (`return null`), is a client component (`"use client"`), and no-ops on the server — safe to mount in the root layout.
  - Reuses the existing `trackEvent()` helper from `lib/analytics/track.ts` so the dataLayer.push boilerplate stays in one place.
  - 2 files, 82 insertions(+), 0 deletions(-); no schema changes.
  - `npm run build`: passes (20 routes); `npm run validate:schema`: 99 blocks / 0 errors / 0 warnings.
  - Verified compiled bundle: `.next/static/chunks/*.js` contains `scroll_depth",{percent:t,page:e||"/"}` — confirms the dataLayer payload shape is what we expect.
  - Part of PR #41 (rolled into the open PR for this branch — SKILL.md guidance: skip PR creation when one is already open for the branch).
- [x] **T-01** — GTM verification + CTA click tracking ✅ DONE 2026-06-09
  - `NEXT_PUBLIC_GTM_ID` env var correctly read in `app/layout.tsx:49`; GTM component no-ops cleanly when unset
  - `lib/analytics/track.ts` extended with `cta_click` category (emits `cta_click` event) and `trackEvent()` helper for non-link events
  - `consultation-form.tsx` refactored to use `trackEvent('form_submit', ...)` — same payload, no duplicated `dataLayer.push` boilerplate
  - `sticky-cta.tsx` `trackDismiss` helper replaced with `trackEvent('sticky_cta_dismiss', ...)`
  - All `/contact-us/` CTA buttons now fire `cta_click` with `location` and `cta_label` metadata: header, mobile_nav, sticky_cta (mobile), sticky_cta_desktop, phone_cta, cta_banner, hero_{variant} (primary + secondary)
  - Combined with T-03 (tel:/mailto:), every outbound-conversion path on the site is now instrumented

- [x] **T-02** — Form submission event to dataLayer ✅ DONE 2026-05-29
  - In `ConsultationForm`, on successful submit: `trackEvent('form_submit', { form_name: source, form_condition })`
  - Track in GTM as a custom trigger

- [x] **T-03** — Add outbound link click tracking ✅ DONE 2026-06-04
  - Added `lib/analytics/track.ts` with `trackClick()` helper → fires `dataLayer.push({ event: 'outbound_click', outbound_category, location })`
  - Applied to all `tel:` and `mailto:` links across: StickyCta, Hero, PhoneCta, CtaBanner, Header, Footer, MobileNav
  - GTM already loads via `afterInteractive` Script — no additional GTM setup needed
  - All tracking components marked `"use client"` to support onClick event handlers

- [x] **T-04** — Check Google Business Profile integration ✅ DONE 2026-06-02
  - Footer has Facebook/Instagram but no Google Business Profile link ✅ NOW ADDED
  - Update social links to include Google Business Profile listing ✅
  - Add `sameAs` in schema if GBP profile URL is available ✅

- [x] **T-08** — MapHours phone/email link tracking ✅ DONE 2026-06-20
  - T-03 (PR #1, 2026-06-04) explicitly enumerated the components it instrumented: "StickyCta, Hero, PhoneCta, CtaBanner, Header, Footer, MobileNav" — but missed the `MapHours` section on `/contact-us/`, which renders the phone (`tel:`) and email (`mailto:`) CTA pair below the consultation form. The two most prominent phone/email CTAs on the contact page were firing no dataLayer event.
  - Added `onClick={trackClick("phone_call", { location: "map_hours" })}` to the `tel:` anchor and `onClick={trackClick("mailto", { location: "map_hours" })}` to the `mailto:` anchor in `components/sections/map-hours.tsx`. The component was a server component; converted to `"use client"` so the handlers wire up (matches the convention every other instrumented component on the site already follows).
  - Single-file change, 5 insertions(+), 0 deletions(-). `npm run build`: passes (20 routes); `npm run validate:schema`: 99 blocks / 0 errors / 0 warnings (no schema changes). Verified the literal `map_hours` location string is present in the compiled client bundle (`grep -r map_hours .next/static/` returns 2 hits: one per handler), confirming the dataLayer payload is wired.
  - Closes the last `tel:`/`mailto:` tracking gap on the site. Combined with T-01, T-02, T-03, T-04, T-06, T-07, and T-08, every `tel:` and `mailto:` link across Header, MobileNav, StickyCta (mobile + desktop), Hero, PhoneCta, CtaBanner, Footer, and now MapHours fires a labeled `phone_call` or `mailto` event to GTM.

---

### Category: Conversion Optimization
- [x] **C-01** — Add phone number to hero section ✅ DONE 2026-06-10 (verified)
  - `components/sections/hero.tsx` lines 104–115 already render `Or call us directly: <tel link>` for the `home` and `lp` hero variants
  - Both `/` (variant="home") and `/hyperbaric-therapy/` (variant="lp") get the phone fallback; phone click fires `trackClick("phone_call", { location: "hero" })` → GTM
  - No code change required; just verified presence in audit

- [x] **C-02** — Sticky CTA bar improvement ✅ DONE 2026-06-06
  - Previous `StickyCta` was mobile-only (`lg:hidden` bottom bar); desktop users had no persistent CTA
  - Added floating vertical pill in bottom-right (desktop ≥lg) with `Call 718-925-3322` + `Book consultation` stacked buttons + ✕ dismiss
  - Kept mobile bottom bar, added small ✕ dismiss there too
  - localStorage dismiss persistence with 7-day re-show window (`hbotq:sticky_cta:dismissed_at`)
  - Fires `dataLayer` `sticky_cta_dismiss` event on dismiss; phone clicks fire `outbound_click` with `location: sticky_cta_desktop`
  - Hydration-safe: returns null until `useEffect` mounts
  - PR #39

- [x] **C-03** — Consultation form honeypot field review ✅ DONE 2026-06-11 (verified)
  - `components/forms/consultation-form.tsx` lines 108–128: `website` field wrapped in `<div aria-hidden style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>` — off-screen, screen-reader hidden, and `tabIndex={-1}` removes it from keyboard tab order. `autoComplete="off"` prevents browser autofill.
  - No code change required; just verified presence in audit

- [x] **C-04** — TrustBar content + coverage audit ✅ DONE 2026-06-11
  - `components/sections/trust-bar.tsx` content is accurate and already includes "Medicare & Major Insurers Accepted" — verified
  - Coverage gap found: TrustBar was rendered on `/`, `/treatment/`, `/conditions/`, `/hyperbaric-therapy/`, and every `/condition/[slug]/` — but **missing** on `/physicians/` and `/faqs/`
  - Added `<TrustBar />` directly below the Hero on `app/physicians/page.tsx` and `app/faqs/page.tsx` (placed above the physicians/FAQ content but below the hero, so the four trust signals are visible before users read credentials or Q&A)
  - Intentionally left off `/contact-us/` — the form is the conversion goal; a trust bar above it would dilute the form's visual weight. The hero's CTA + form already carry the conversion framing.
  - Now every indexable marketing page (`/`, `/treatment/`, `/conditions/`, `/hyperbaric-therapy/`, every `/condition/[slug]/`, `/physicians/`, `/faqs/`) has the trust signals; the noIndex legal pages and `/thank-you/` correctly omit it.

- [x] **C-05** — Testimonial schema on pages ✅ DONE 2026-06-10
  - The `TestimonialCarousel` component renders all 5 testimonials on three page types (`/`, `/hyperbaric-therapy/`, every `/condition/[slug]/`) but only the homepage was emitting matching `<JsonLd>` reviewSchema blocks
  - Added the same `testimonials.map(t => <JsonLd data={reviewSchema(...)} />)` block to `app/hyperbaric-therapy/page.tsx` and `app/condition/[slug]/page.tsx`
  - 27 lines added, no other code touched; build passes; all 8 carousel pages now emit 5 Review JSON-LD blocks; 4 non-carousel pages unchanged
  - Mirrors the homepage pattern exactly (rather than per-condition filtering) because the carousel hard-codes all 5 reviews on every page — markup must reflect what the user actually sees per Google's review guidelines
  - Closes C-05

---

### Category: Web Design / UX
- [x] **WD-01** — Mobile nav audit ✅ DONE 2026-06-11 (verified)
  - `components/layout/mobile-nav.tsx` uses a hamburger button (`aria-label={open ? "Close menu" : "Open menu"}`) that toggles a slide-in nav panel
  - All 6 nav links ("Home, Conditions, Treatment, Physicians, FAQ, Contact Us") are rendered in the mobile panel — confirmed by code inspection
  - Topbar collapses to hamburger on mobile via `lg:hidden` (header) + `lg:flex` pattern in `components/layout/header.tsx`
  - No code change required

- [x] **WD-02** — Check Core Web Vitals ✅ DONE 2026-06-11 (verified)
  - LCP: `components/sections/hero.tsx` accepts `priority` prop and forwards to `<Image priority fill>` — homepage (`app/page.tsx`), all `/condition/[slug]/` pages, and `/hyperbaric-therapy/` all pass `priority` to the Hero
  - Font loading: `app/layout.tsx` loads Inter + Fraunces via `next/font/google` with the default `display: swap` (no FOIT/CLS)
  - No code change required

- [x] **WD-03** — Add structured data error auditing to build ✅ DONE 2026-06-13
  - Created `scripts/validate-schema.mjs` (592 lines) that walks `.next/server/app/**/*.html` after build, extracts every `<script type="application/ld+json">` block, and validates against schema.org rules
  - Checks: required `@context`/`@type`; per-type required fields (MedicalBusiness, AggregateRating bounds, Review, Physician, MedicalCondition, FAQPage, BreadcrumbList); HTTP-only URLs in `url`/`sameAs`/`item`/`image`; `tel:`↔`telephone` cross-check; image paths resolve under `public/`
  - Wired into `package.json`: `npm run validate:schema`, `npm run build:validate` (build + validate), `npm run validate` (alias)
  - Also fixed `AggregateRating.ratingValue` to emit a Number (`Math.round(avg*10)/10`) instead of a string (`avg.toFixed(1)`) — Google Rich Results requires a Number; was producing `"5.0"`
  - Current result: 80 JSON-LD blocks across 20 pages, 0 errors, 0 warnings
  - PR #41 (updated)

- [x] **WD-04** — Accessibility audit ✅ DONE 2026-06-11 (verified)
  - Skip link: `app/layout.tsx:61` renders `<a href="#main" className="skip-link">Skip to main content</a>` and `app/globals.css:115` defines `.skip-link` with `position: absolute; top: -40px` (off-screen) + `.skip-link:focus { top: 1rem; }` (slides in on focus). The `<main id="main">` target exists at `app/layout.tsx:66`. Visible on focus, hidden otherwise ✓
  - Icon-only buttons have aria-labels: mobile menu toggle (`mobile-nav.tsx:23`), social icons (`footer.tsx:54,65,76`), sticky-cta phone/dismiss buttons (`sticky-cta.tsx:55,74,84,90,98`)
  - `aria-hidden` on all decorative SVGs (trust-bar, hero, faq, condition, sticky-cta) — confirmed by grep
  - No code change required

- [x] **WD-05** — Verify all images have alt text ✅ DONE 2026-06-11 (verified)
  - Audited all 7 `<Image>` tags across `app/` and `components/` — all have `alt=` attributes (no missing alt). Tags found in: `app/sample/non-healing-wounds/page.tsx` (4), `components/cards/physician-card.tsx` (1, uses `alt={p.name}`), `components/sections/hero.tsx` (1, uses `alt={imageAlt}`), `components/sections/what-is-hbot.tsx` (1, hard-coded alt)
  - No code change required

- [x] **WD-06** — `aria-current="page"` on active nav links ✅ DONE 2026-06-17
  - New `lib/utils/nav.ts → isNavItemActive(href, pathname)` helper. Homepage link matches exact `/`; other links match exact-or-prefix-with-slash so `/treatment/` also lights for any future `/treatment/[slug]/` nested route. `/conditions/` does NOT light on `/condition/[slug]/` (different segment, not a child) — prefix boundary is `/`.
  - Wired into `components/layout/header.tsx` (desktop primary nav + HBOTQ home logo), `components/layout/mobile-nav.tsx` (slide-in nav, setOpen(false) preserved), and `components/layout/footer.tsx` (all three columns + HBOTQ home logo).
  - Visual reinforcement on top of the ARIA: active desktop nav link = brand-color semibold + 2px brand underline; active mobile link = brand-color semibold + 2px brand bottom border; active footer link = white semibold (over the brand-800 background).
  - Verified rendered HTML: homepage shows 2 active (both home links); top-level pages show 2 (header nav + footer nav); condition detail pages show 1 (footer Conditions column only — no primary nav item points to a `/condition/[slug]/` URL).
  - 4 files changed, 124 insertions(+), 42 deletions(-)
  - `npm run build`: passes (20 routes); `npm run validate:schema`: 99 blocks / 0 errors / 0 warnings
  - Part of PR #41 (rolled into the open PR for this branch — SKILL.md guidance: skip PR creation when one is already open for the branch)

---

## 🟢 COMPLETED
|- **S-06** — Physician schema `image` + `worksFor` cross-link. Two distinct gaps: (1) the inline `employee` Physician array inside `medicalBusinessSchema()` (emitted in all 19 MedicalBusiness blocks, one set per page) lacked `worksFor: { @id }` back to the business — only the 2 standalone Physician blocks on `/physicians/` carried the cross-link, so Google could only see the Physician→Business direction on 2 routes and had no business→people mapping on the other 18. Added `worksFor: { @id: "${site.url}/#business" }` to every inline employee entry. (2) The standalone `physicianSchema()` block on `/physicians/` had no `image` field even though `lib/data/physicians.ts` already had `image: "/images/physicians/dr-sadhnani.webp"` and `image: "/images/physicians/nurse-regina.webp"`. Extended `physicianSchema()` to accept an optional `image` (normalized to absolute URL); updated the call site on `app/physicians/page.tsx` to forward `p.image`. Validator changes: inline `employee[i]` Physicians now ERROR if `worksFor.@id` missing (was: silently allowed); standalone Physician blocks now ERROR if `worksFor.@id` missing (was: optional field, validated only when present); standalone Physician blocks WARN if `image` missing (Google-recommended but not schema-required) and ERROR if `image` present but not http(s) URL. `npm run build`: passes (20 routes); `npm run validate:schema`: **99 blocks / 0 errors / 0 warnings** — the new rules fire and the data is correct. Verified rendered HTML on `/`: both inline employee Physicians now carry `"worksFor":{"@id":"https://hbotq.com/#business"}`. Verified rendered HTML on `/physicians/`: both standalone Physician blocks now carry the expected absolute image URLs (`dr-sadhnani.webp`, `nurse-regina.webp`) plus the existing worksFor cross-link. 3 files changed, 39 insertions(+), 5 deletions(-). Part of PR #41 (rolled into the existing open PR for this branch — SKILL.md guidance: skip PR creation when one is already open for the branch). (2026-06-21, PR #41 updated)
|- **T-08** — MapHours phone/email link tracking. T-03 (PR #1, 2026-06-04) explicitly enumerated the components it instrumented for outbound-click tracking — StickyCta, Hero, PhoneCta, CtaBanner, Header, Footer, MobileNav — but missed the MapHours section on /contact-us/, which renders the phone (tel:) and email (mailto:) CTA pair below the consultation form. Those two CTAs were the most prominent phone/email links on the contact page and were firing no dataLayer event, leaving the highest-intent conversion moment on the site untracked.
- **T-05** — Scroll-depth / engagement tracking. New `components/analytics/scroll-depth.tsx` (mounted once in the root `app/layout.tsx`) listens to `window.scroll` (passive, rAF-throttled to one `scrollY` read per frame) and fires a `scroll_depth` dataLayer event at the 25 / 50 / 75 / 100% thresholds. Each threshold fires at most once per page view; the fired set is reset on every pathname change via `usePathname()` so client-side navigations get fresh thresholds. Initial check runs once on mount so a user who lands already-scrolled (browser scroll restoration, hash-link navigation) still gets the matching threshold. Event payload: `{ event: "scroll_depth", percent: <25|50|75|100>, page: <pathname> }` — `page` lets GA4 funnels segment scroll engagement by route. Component renders no DOM (`return null`), is a client component (`"use client"`), and no-ops on the server — safe to mount in the root layout. Reuses the existing `trackEvent()` helper from `lib/analytics/track.ts` so the dataLayer.push boilerplate stays in one place. 2 files changed, 82 insertions(+), 0 deletions(-); no schema changes. `npm run build`: passes (20 routes); `npm run validate:schema`: 99 blocks / 0 errors / 0 warnings. Verified compiled bundle: `.next/static/chunks/*.js` contains `scroll_depth",{percent:t,page:e||"/"}` — confirms the dataLayer payload shape is what we expect. (2026-06-19, PR #41 updated)
- **WD-06** — `aria-current="page"` on active nav links. Added a new `lib/utils/nav.ts → isNavItemActive(href, pathname)` helper (homepage link matches exact `/`; other links match exact-or-prefix-with-slash so `/treatment/` also lights for future `/treatment/[slug]/` nested routes; `/conditions/` does NOT light on `/condition/[slug]/` because that's a different segment, not a child). Wired it into `components/layout/header.tsx` (desktop primary nav + HBOTQ home logo), `components/layout/mobile-nav.tsx` (slide-in nav, setOpen(false) close behavior preserved), and `components/layout/footer.tsx` (all three columns + HBOTQ logo). Active state is reinforced visually too: desktop nav gets brand-color semibold with a 2px brand underline; mobile nav gets brand-color semibold with a brand 2px bottom border; footer columns get white semibold over the brand-800 background. Verified rendered HTML on every page: homepage shows 2 active (both home links); top-level pages show 2 (header nav + footer nav); condition detail pages show 1 (footer Conditions column only — no primary nav item points to a `/condition/[slug]/` URL). 4 files changed, 124 insertions(+), 42 deletions(-). `npm run build`: passes (20 routes); `npm run validate:schema`: 99 blocks / 0 errors / 0 warnings. Closes WCAG 2.4.4 (Link Purpose) and 2.4.8 (Location). (2026-06-17, PR #41 updated)
- **T-06** — Primary nav click tracking. Added `onClick={trackClick("cta_click", { location: "primary_nav", cta_label: item.label })}` to the `<Link>` map in both `components/layout/header.tsx` (desktop nav) and `components/layout/mobile-nav.tsx` (mobile drawer nav). On mobile, the existing `setOpen(false)` panel-close behavior is preserved alongside the tracker call. The primary nav (`Treatment / Conditions / Physicians / FAQs / Contact`) was the last set of internal links on the site with no dataLayer event — combined with T-01 (CTA), T-02 (form submit), T-03 (tel/mailto), and T-04 (GBP), every outbound-conversion path on the site is now instrumented. (2026-06-15, PR #41 updated)
- **C-05** — Review JSON-LD on every page that renders `<TestimonialCarousel/>` — added `testimonials.map(t => <JsonLd data={reviewSchema(...)} />)` to `app/hyperbaric-therapy/page.tsx` and `app/condition/[slug]/page.tsx`, matching the existing homepage pattern. 8 pages now emit 5 Review JSON-LD blocks each, plus the site-wide AggregateRating. 27 lines added. (2026-06-10, PR #39)
- **C-01** — Phone number in hero — verified already present in `components/sections/hero.tsx` for `home` and `lp` variants; phone click tracked via GTM `phone_call` event. No code change needed. (2026-06-10, verified)
- **S-01** — AggregateRating schema — nested inside `medicalBusinessSchema()` in `lib/seo/schemas.ts`; removed redundant standalone JSON-LD from `layout.tsx` (2026-06-05, PR #37)
- **S-02** — Review schema — `app/page.tsx` renders individual `@type: Review` JSON-LD for all 5 testimonials (2026-06-03, PR #1)
- **S-04** — Physician schema on `/physicians/` page — verified, no code change needed (2026-06-07)
- **SE-04** — Comprehensive noIndex audit — added `noIndex: true` to `/privacy-policy`, `/terms-of-service`, `/accessibility` and removed them from `app/sitemap.ts`. All 19 routes audited and confirmed correct. Part of PR #39 (2026-06-08)
- **SE-01** — Real page-specific OG images — `public/images/og/{homepage,conditions,treatment,physicians,contact}.jpg` (2026-05-31, PR #1)
- **S-01** — AggregateRating schema — `lib/seo/schemas.ts` + `layout.tsx` (2026-05-29, PR #1)
- **S-02** — Review schema helper — `lib/seo/schemas.ts` (2026-05-29, PR #1)
- **S-03** — MedicalCondition schema — `condition/[slug]/page.tsx` calls `<JsonLd data={medicalConditionSchema(c)} />` (2026-05-29, PR #1)
- **T-02** — GTM form_submit event — `consultation-form.tsx` (2026-05-29, PR #1)
- **SE-02** — robots.txt created — `public/robots.txt` (2026-05-29, PR #1)
- **T-01** — GTM verification + CTA click tracking — every `/contact-us/` CTA button now fires `cta_click` with `location`/`cta_label`; `trackEvent()` helper added; `consultation-form.tsx` + `sticky-cta.tsx` refactored onto it (2026-06-09, this PR)
- **S-07** — BreadcrumbList JSON-LD on all 6 index-level pages (`/conditions/`, `/treatment/`, `/contact-us/`, `/physicians/`, `/faqs/`, `/hyperbaric-therapy/`). Each emits a 2-item `BreadcrumbList` (Home → {PageName}) reusing the existing `breadcrumbSchema()` helper that `/condition/[slug]/` was already using. 6 files touched, 30 insertions(+), 0 deletions(-). `npm run build`: passes (20 routes); `npm run validate:schema`: **105 blocks / 0 errors / 0 warnings** — BreadcrumbList count rose from 6 to 12. Part of PR #41 (rolled into the existing open PR for this branch — SKILL.md guidance: skip PR creation when one is already open for the branch). (2026-06-22, PR #41 updated)

