# HBOTQ Site Improvement TODO — Priority Order

## 🔴 IN PROGRESS
(Nothing — start of cycle)

---

## 🟡 PENDING

### Category: Schema / Structured Data
- [ ] **S-01** — Add `AggregateRating` schema site-wide
  - Add `aggregateRating` to medicalBusinessSchema() with placeholder values (real ones from Google Business Profile when available)
  - Rating: 4.8, reviewCount: needs actual count

- [ ] **S-02** — Add `Review` individual review schemas ✅ DONE 2026-06-03
  - Map existing testimonials in `lib/data/testimonials.ts` to `@type: Review` JSON-LD
  - Added `<JsonLd data={reviewSchema(...)} />` for all 5 testimonials in `app/page.tsx`



- [ ] **S-04** — Add `Physician` schema on physicians page
  - Already has `physicianSchema()` in lib — verify each physician page calls it
  - Add to `/physicians/` listing page too

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

- [ ] **SE-02** — Add robots.txt
  - Check if `/public/robots.txt` exists — if not, create it
  - Should allow all, reference sitemap at `https://hbotq.com/sitemap.xml`

- [ ] **SE-03** — Verify sitemap.xml is complete
  - Has `/sitemap.ts` — check it covers ALL routes: homepage, conditions/[slug], treatment, physicians, contact-us, faqs
  - Add condition dynamic routes if not already present

- [ ] **SE-04** — Audit noIndex pages
  - Check for any pages that should be noIndex (e.g., thank-you, accessibility) — verify `noIndex: true` in metadata

---

### Category: Tracking / Analytics
- [ ] **T-01** — Verify GTM is properly firing
  - Check `NEXT_PUBLIC_GTM_ID` env var is set in Vercel (not in repo)
  - Add GTM event tracking for: form submissions, CTA clicks, phone link clicks

- [ ] **T-02** — Add form submission event to dataLayer
  - In `ConsultationForm`, on successful submit: `dataLayer.push({ event: 'form_submit', form_name: source })`
  - Track in GTM as a custom trigger

- [ ] **T-03** — Add outbound link click tracking ✅ DONE 2026-06-04
  - Added `lib/analytics/track.ts` with `trackClick()` helper → fires `dataLayer.push({ event: 'outbound_click', outbound_category, location })`
  - Applied to all `tel:` and `mailto:` links across: StickyCta, Hero, PhoneCta, CtaBanner, Header, Footer, MobileNav
  - GTM already loads via `afterInteractive` Script — no additional GTM setup needed
  - All tracking components marked `"use client"` to support onClick event handlers

- [ ] **T-04** — Check Google Business Profile integration ✅ DONE 2026-06-02
  - Footer has Facebook/Instagram but no Google Business Profile link ✅ NOW ADDED
  - Update social links to include Google Business Profile listing ✅
  - Add `sameAs` in schema if GBP profile URL is available ✅

---

### Category: Conversion Optimization
- [ ] **C-01** — Add phone number to hero section
  - Homepage hero currently has CTA buttons only
  - Add "Or call us directly at 718-925-3322" for phone-first visitors

  - [ ] **C-02** — Sticky CTA bar improvement
  - `StickyCta` exists — review if it shows phone number prominently enough
  - Add click-to-call tel: link + "Book consultation" side by side

- [ ] **C-03** — Consultation form honeypot field review
  - The `website` field in ConsultationForm looks like a honeypot — verify it's hidden with CSS and not in the tab order
  - Hidden via `tabIndex={-1}` and visually hidden — confirm it's spam-filtering correctly

- [ ] **C-04** — TrustBar content check
  - `TrustBar` shows at top of every page — verify it has updated, accurate content [verify against actual services]
  - Add "Medicare Accepted" if that's a key trust signal

- [ ] **C-05** — Testimonial carousel — add schema
  - Testimonials are in DOM but not in JSON-LD
  - Add AggregateRating + individual Review schemas using existing testimonial data

---

### Category: Web Design / UX
- [ ] **WD-01** — Mobile nav audit
  - Run lighthouse on mobile — check topbar collapses to hamburger correctly
  - Nav links: "Home, Conditions, Treatment, Physicians, FAQ, Contact Us" — verify all render

- [ ] **WD-02** — Check Core Web Vitals
  - LCP: hero image should be `priority` (already done with `priority` prop — verify)
  - No CLS from font loading — Inter + Fraunces have `display: swap` (already set) ✓

- [ ] **WD-03** — Add structured data error auditing to build
  - Add a `scripts/validate-schema.ts` that runs as part of `pre-push` or as a CI check
  - Verify all JSON-LD is valid and no missing fields

- [ ] **WD-04** — Accessibility audit
  - Skip link (`skip-link`) exists ✓ — verify it's visible on focus
  - `aria-label` on all icon-only buttons (mobile menu toggle, social icons)
  - Contrast ratio on `color-ink-muted` text — verify 4.5:1 minimum for body text

- [ ] **WD-05** — Verify all images have alt text
  - Run a grep to check for `alt=` in all img tags — flag any missing alt attrs
  - Hero images have alt/altAlt — check all public/images/ conditions images

---

## 🟢 COMPLETED
- **S-02** — Review schema — `app/page.tsx` renders individual `@type: Review` JSON-LD for all 5 testimonials (2026-06-03, PR #1)
- **SE-01** — Real page-specific OG images — `public/images/og/{homepage,conditions,treatment,physicians,contact}.jpg` (2026-05-31, PR #1)
- **S-01** — AggregateRating schema — `lib/seo/schemas.ts` + `layout.tsx` (2026-05-29, PR #1)
- **S-02** — Review schema helper — `lib/seo/schemas.ts` (2026-05-29, PR #1)
- **S-03** — MedicalCondition schema — `condition/[slug]/page.tsx` calls `<JsonLd data={medicalConditionSchema(c)} />` (2026-05-29, PR #1)
- **T-02** — GTM form_submit event — `consultation-form.tsx` (2026-05-29, PR #1)
- **SE-02** — robots.txt created — `public/robots.txt` (2026-05-29, PR #1)

