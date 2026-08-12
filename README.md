# HBOTQ — hbotq.com rebuild

Marketing site for **Hyperbaric Medicine and Wound Treatment Center of Queens** (HBOTQ), the hyperbaric oxygen therapy and advanced wound-care clinic at 65-35 Queens Blvd, Suite #100, Woodside, NY.

This repository replaces the legacy WordPress site. The job of the new site is to **educate patients about HBOT and convert them into consultations**.

- **Live preview**: <https://hbotq.vercel.app>
- **Production** (still WordPress until DNS cutover): <https://hbotq.com>

---

## Stack

| Layer       | Choice                                                                 |
| ----------- | ---------------------------------------------------------------------- |
| Framework   | **Next.js 16** (App Router, Turbopack, React 19)                       |
| Language    | TypeScript 5, strict mode                                              |
| Styling     | **Tailwind CSS v4** (CSS-based config via `@theme` in `app/globals.css`) |
| Fonts       | Inter (body) + Fraunces (display), via `next/font/google`              |
| Forms       | `react-hook-form` + `@hookform/resolvers/zod`                          |
| Validation  | Zod                                                                    |
| Email       | Resend + `@react-email/components`                                     |
| Analytics   | Google Tag Manager (single container; GA4 etc. configured inside GTM)  |
| Deployment  | Vercel                                                                 |
| Content     | Hardcoded typed TS in `lib/data/*.ts` — **no CMS**                     |

> **Heads up — Next.js 16:** the `params` and `searchParams` props on pages and `generateMetadata` are now **Promises** and must be awaited. Tailwind v4 has no `tailwind.config.ts` — design tokens live in `app/globals.css` under `@theme`. AGENTS.md instructs agents to read `node_modules/next/dist/docs/` before writing Next.js code; please do the same.

---

## Quick start

```bash
# 1. Install
npm install

# 2. Copy environment variables
cp .env.example .env.local
# Fill in RESEND_API_KEY, LEAD_TO_EMAIL, NEXT_PUBLIC_GTM_ID

# 3. Dev server
npm run dev
# → http://localhost:3000

# 4. Production build (matches Vercel)
npm run build
npm run start
```

### Docker dev

A `compose.yml` is included for parity with the production runtime:

```bash
docker compose up
```

---

## Environment variables

| Variable             | Required | Purpose                                                                 |
| -------------------- | -------- | ----------------------------------------------------------------------- |
| `RESEND_API_KEY`     | Prod\*   | Emails consultation-form leads to the inbox. In dev, when no channel is configured the API logs the lead and returns 200. |
| `LEAD_TO_EMAIL`      | No       | Where lead emails go. Defaults to `hello@hbotq.com`.                    |
| `GHL_WEBHOOK_URL`    | Prod\*   | GoHighLevel inbound-webhook URL; each lead is POSTed here as JSON in parallel with the email. Unset = CRM push disabled. |
| `NEXT_PUBLIC_GTM_ID` | No       | Google Tag Manager container ID (e.g. `GTM-XXXXXXX`). Loader is a no-op when unset, which is convenient locally. |

\* The consultation form delivers to **both** Resend (email) and the GHL webhook (CRM), independently — a lead succeeds as long as *either* channel accepts it. Production needs **at least one** configured; set both for redundancy.

The Resend sending domain (`hbotq.com`) needs DKIM/SPF verified in the Resend dashboard before production launch.

---

## Architecture

### Routing (`app/`)

```
/                       Home — full conversion funnel
/treatment/             How HBOT works
/conditions/            Conditions overview
/condition/[slug]/      6 prerendered condition pages
/physicians/            Care team
/faqs/                  Grouped FAQs with FAQPage JSON-LD
/contact-us/            Form + map + hours
/hyperbaric-therapy/    Paid-traffic landing page
/thank-you/             Form post-submit (fires GTM conversion event, noindex)
/privacy-policy/        Legal — DRAFT, needs counsel review
/terms-of-service/      Legal — DRAFT, needs counsel review
/accessibility/         Accessibility statement (WCAG 2.1 AA target)
/sample/non-healing-wounds/  Editorial-design sandbox (noindex)

/api/consultation       POST-only Zod-validated lead handler
sitemap.xml, robots.txt All routes enumerated; sample + api + thank-you blocked
```

URLs use **`trailingSlash: true`** to match the legacy WordPress site so existing SEO equity carries over. Legacy WP slug aliases (`/contact`, `/faq`, `/conditions/<slug>/`, etc.) 301 to the new equivalents — see `next.config.ts → redirects()`.

### Data layer (`lib/data/`)

All copy is hardcoded as typed TypeScript. No CMS, no MDX. Editing content = editing a file + opening a PR.

```
lib/data/site.ts          Phone, address, hours, social URLs
lib/data/nav.ts           Primary + footer navigation
lib/data/conditions.ts    6 conditions (slug, body, sections, benefits, FAQs)
lib/data/faqs.ts          12 FAQs grouped by category
lib/data/physicians.ts    Real people: Dr. Manoj Sadhnani, Regina Matatova
lib/data/testimonials.ts  Patient quotes
lib/data/benefits.ts      "Mechanisms of HBOT" cards
lib/data/process.ts       4-step what-to-expect timeline
```

Condition slugs are **frozen for SEO** — they match the legacy WordPress URLs. Adding a new condition is safe; renaming an existing one is not.

### SEO (`lib/seo/` and `app/sitemap.ts`, `app/robots.ts`)

- `buildMetadata()` helper produces canonical URLs, OG, Twitter, and noindex flags from a single call. Every page uses it.
- JSON-LD schemas authored in `lib/seo/schemas.ts` and rendered through a hardened `<JsonLd>` component (escapes `<` to `<`).
  - `MedicalBusiness` (root layout, every page)
  - `Physician` (on `/physicians/`)
  - `MedicalCondition` + `BreadcrumbList` (on each condition page)
  - `FAQPage` (on `/faqs/` and condition pages with FAQ blocks)

### Forms & leads (`app/api/consultation/route.ts`)

- POST-only, JSON in / JSON out
- Shared Zod schema in `lib/validation/consultation.ts` — same source of truth on the client and the server
- **Honeypot**: hidden `website` field is checked **before** validation; if filled, the route returns `{ok:true}` silently (no email sent, no field error leaked) so bots can’t learn they were caught
- **Rate limit**: 15-second per-IP cooldown in-memory (sufficient given Vercel’s function lifecycle; swap for upstash/redis if abuse becomes a real problem)
- Email rendered with `@react-email/components` and sent via Resend; success redirects to `/thank-you/` which fires `form_submission_success` to GTM

### Components

| Folder                  | What lives there                                         |
| ----------------------- | -------------------------------------------------------- |
| `components/layout/`    | `Header`, `Footer`, `MobileNav` (Sheet pattern), `StickyCta` |
| `components/sections/`  | Composable page sections (Hero, ConditionsGrid, TestimonialCarousel, etc.) |
| `components/cards/`     | `ConditionCard`, `BenefitCard`, `PhysicianCard`, `TestimonialCard` |
| `components/forms/`     | `ConsultationForm`                                       |
| `components/seo/`       | `JsonLd`                                                 |
| `components/analytics/` | GTM loader (`afterInteractive`)                          |

Pages compose sections. There are no shadcn primitives — the chrome is small enough that hand-rolled Tailwind components are simpler.

### Design tokens

Tailwind v4 tokens are defined in `app/globals.css`:

- **Brand teal** `#0E5C5E` (50–900 ramp)
- **Sand** cream backgrounds `#F5EFE4` / `#FBF6EC`
- **Coral accent** `#E07856` for primary CTAs
- **Ink** body text `#0F1B1C` with muted `#4B5C5E`
- Fonts: `--font-sans` (Inter), `--font-display` (Fraunces)

---

## Scripts

```bash
npm run dev              # next dev (Turbopack)
npm run build            # next build (production, with TS check)
npm run start            # next start (production server)
npm run lint             # eslint
npm run validate:schema  # validate JSON-LD in the build output (needs a build first)
npm run validate         # build + validate:schema
```

### CI

`.github/workflows/ci.yml` runs **lint → build → validate:schema** on every pull request and every push to `main`. `next build` also type-checks, so that job covers lint, types, build breaks, and structured-data regressions together. `.github/workflows/codeql-analysis.yml` runs the security scan separately.

Vercel also builds every PR as a preview deploy, but that reports *after* the fact — the CI workflow is what gates the merge.

> To make CI blocking rather than advisory, mark **“Lint, build & validate schema”** as a required status check in GitHub → Settings → Branches → branch protection for `main`. That’s a one-time repo-settings change and can’t be done from code.

---

## Deployment

`main` is auto-deployed to <https://hbotq.vercel.app> by Vercel. Custom domain `hbotq.com` is added in the Vercel project but **not yet pointed at Vercel via DNS** — the WordPress site is still serving production until cutover.

### Cutover checklist (when you’re ready to flip DNS)

1. Set Vercel env vars (`RESEND_API_KEY`, `LEAD_TO_EMAIL`, `NEXT_PUBLIC_GTM_ID`)
2. Verify the Resend sending domain
3. Lower DNS TTL 24h ahead
4. Point apex + `www` at Vercel; pick apex as canonical, redirect `www → apex`
5. Submit the new sitemap to Google Search Console and Bing Webmaster Tools
6. Spot-check top traffic URLs from GSC against the redirects in `next.config.ts`
7. Update the Google Business Profile website URL (see also: the GBP name/phone reconciliation noted in the SEO snapshot)
8. Keep WordPress live for ~7 days as a rollback path

---

## Pending manual tasks

These are **outside the codebase** — they can’t be done in a PR and need someone with access to the relevant dashboard. Delete each item once it’s done.

### Vercel — add the GTM container ID

`NEXT_PUBLIC_GTM_ID` is not yet set in production, so Google Tag Manager currently no-ops on the live site and none of the tracking events reach GTM.

- Go to <https://vercel.com/marketing-bull/hbotq/settings/environment-variables>
- Add `NEXT_PUBLIC_GTM_ID` = `GTM-NJLGQSS`, scoped to **Production** (and **Preview** if you want tags firing on branch previews)
- Redeploy, or let it apply on the next merge to `main`

No secret-handling concerns here — the `NEXT_PUBLIC_` prefix means this value is client-visible by design.

### GoHighLevel — finish and publish the intake workflow

The site posts every consultation lead to the GHL inbound webhook and this is confirmed working end-to-end, but a webhook *receiving* a payload is not the same as a usable CRM contact. The workflow behind the trigger still needs to be finished:

- Map the captured sample onto a **Create/Update Contact** action, de-duplicating by email (fall back to phone). The payload fields are `first_name`, `last_name`, `name`, `email`, `phone`, `condition`, `condition_label`, `preferred_contact`, `message`, `source`, `received_at`, `submitted_at`, `ip` — see `lib/integrations/ghl.ts` for the authoritative shape
- Add tags (e.g. a constant `website-lead`, plus one from `source` and one from `condition_label`) and put `message` into a contact Note so intake staff see the context
- Add an internal notification so new leads get seen promptly
- **Publish/activate the workflow** — until then, leads arrive but aren’t filed

### GoHighLevel — delete the two test contacts

Verification runs created two contacts that should not stay in the CRM:

- The raw webhook test — **“Webhook Test”** (`webhook-test@hbotq.com`, source `webhook-test`)
- The live end-to-end form test — **“Production Smoke Test”** (`smoke-test@hbotq.com`, source `production-smoke-test`)

### GitHub — delete merged/stale branches

All of these are fully merged or superseded and safe to delete (the repo’s git proxy blocks branch deletion from the CLI, so use the GitHub branches UI):

- `improve-credibility-conversion` — merged in PR #41
- `claude/happy-darwin-g7qtl7` — merged in PR #43
- `design/wow-background-refresh` — merged in PR #42
- `claude/stoic-gauss-IKcno` — abandoned; its conditions-submenu idea was rebuilt against current `main` and merged separately

### Claude Code — delete the finished nightly Routine

A scheduled Routine named **“HBOTQ PR #41 code-review fixes (CR-01..CR-05)”** was created to work through the PR #41 code-review findings one per night. **All five items are done and merged**, so it now fires nightly with nothing to do. Delete it from the Routines UI — it can’t remove itself.

---

## Sample / design-experiment routes

- `/sample/non-healing-wounds/` — an editorial-direction redesign of the non-healing-wounds condition page (longform-magazine typography, asymmetric grid, inline SVG diagrams, scroll-linked motion). `noindex`. Useful as a side-by-side comparison against the live `/condition/non-healing-wounds/`.

---

## Content edits — workflow

1. Edit the relevant file under `lib/data/`.
2. `npm run build` locally to catch any type breakage.
3. Open a PR. Vercel preview deploys on every PR.
4. Merge to `main`; production preview redeploys.

Condition slug renames and route deletions are SEO-impacting — coordinate with whoever owns search before merging.

---

## Legal note

`/privacy-policy/` and `/terms-of-service/` are currently flagged as **drafts** at the top of each page. The drafts hit the standard points (HIPAA carve-out, medical disclaimer, NY governing law, etc.) but **must be reviewed by counsel** before they ship as final.

---

## License & contributions

This is a private project owned by HBOTQ / Marketing Bull. Outside contributions are not currently being accepted.
