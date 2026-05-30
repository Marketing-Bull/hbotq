# COMPLETED — HBOTQ Site Improvements

Format per entry:
- **Date**: YYYY-MM-DD
- **Item**: TODO code (e.g., S-01)
- **Description**: What was done
- **PR**: Link to PR or 'not yet merged' if still open

---

## 2026-05-29 — PR #1
- **S-01** — Added `aggregateRatingSchema()` using 5 testimonial ratings (5.0 avg) + site-wide injection in `layout.tsx`
- **S-02** — Added `reviewSchema()` helper for individual patient review JSON-LD
- **S-03** — Verified `medicalConditionSchema()` is rendered via `<JsonLd>` on each `condition/[slug]` page
- **T-02** — Added GTM `form_submit` dataLayer event on successful consultation form submission (with `form_name`, `form_condition`)
- **SE-02** — Created `public/robots.txt` allowing all crawlers + sitemap reference
- **Infrastructure** — Created `.hermes/site-improver/` with RUN.md + TODO.md + COMPLETED.md for nightly automation
- **PR**: https://github.com/Marketing-Bull/hbotq/pull/1

## 2026-05-30 — PR #2 (open)
- **S-03 (cleanup)** — Fixed type error: `aggregateRatingSchema()` can return `null`, guarded with conditional render in `layout.tsx` so `JsonLd` only receives non-null data
- **PR**: https://github.com/Marketing-Bull/hbotq/pull/1 (same branch, auto-updated)
