# hbotq.com — Pre-Migration Audit & Content Archive

Captured **2026-09-04**, while the old WordPress site was still live at `hbotq.com`.
Everything here was taken from the live site so the content survives the DNS repoint.

## What is archived

| Folder / file | Contents |
| --- | --- |
| [`pages/`](./pages/) | All 16 pages as Markdown — full copy, plus title tag, meta description, canonical, robots, schema types and H1 per page |
| [`raw-html/`](./raw-html/) | Byte-for-byte HTML of every page, as served |
| [`assets/`](./assets/) | All 117 images/SVGs (5.8 MB) — the full media library plus every sized variant and Elementor crop the pages reference, original paths preserved |
| [`global-header-footer.md`](./global-header-footer.md) | Shared nav and footer copy |
| [`page-inventory.md`](./page-inventory.md) | Every URL with its SEO metadata |
| [`redirects.md`](./redirects.md) / [`redirects.csv`](./redirects.csv) | The verified 301 map (28 rules) |
| [`next-redirects.ts`](./next-redirects.ts) | The 18 rules missing from `next.config.ts`, ready to paste |
| [`fetch-videos.sh`](./fetch-videos.sh) | Downloads the 17 videos (443 MB) not committed here |
| [`crawl-results.json`](./crawl-results.json) / [`media-inventory.json`](./media-inventory.json) | Raw audit data |

## The site, in short

WordPress + Elementor + Rank Math SEO, served through nginx. **16 indexable pages**: 10
WordPress `page` records and 6 `condition` records. There is **no blog** — `/wp-json/wp/v2/posts`
returns an empty array — and no other public post type.

The inventory is confirmed complete against three independent sources that agree exactly:
the Rank Math sitemap, the WordPress REST API (all records `publish`), and a link-following
crawl. No orphaned or hidden published pages exist.

**Contact details** (recovered from the page source; the on-page email is obfuscated by
CleanTalk anti-spam and renders as `he***@***tq.com`):

- `hello@hbotq.com` · 718-925-3322 · also seen: 718-736-2430, 866-438-7756
- 65-35 Queens Blvd #100, Woodside, NY 11377 · Mon–Fri 9:00 am – 5:00 pm, Sat–Sun closed

## Before you repoint DNS

1. **Take a server-side backup of `wp-content/uploads/` and the database.** This archive has
   every image, but the 17 videos (443 MB) are only listed, not copied — run
   [`fetch-videos.sh`](./fetch-videos.sh) or pull them from the host. Once DNS moves you can
   still reach the origin by IP or via the host panel, but only if you have those credentials.
2. **Add the 18 missing redirects** in [`next-redirects.ts`](./next-redirects.ts) — see below.
3. **Export Search Console data** if you want pre-migration baselines. (GSC access itself is
   not affected by the DNS change, so this is not urgent.)

## One dependency that is easy to miss

Images on the old site are served through **BerqWP** (`static.berqwp.com`), a third-party
optimization CDN. Every `<img>` carries a base64 placeholder in `src` and the real URL in
`data-berqwpsrc`, wrapped as
`https://static.berqwp.com/hbotq.com/mw1920-q80-webp/https://hbotq.com/wp-content/uploads/...`.

Two consequences: a naive scrape of this site captures **no images at all**, only placeholders
(this archive unwraps them back to origin URLs), and if anything still points at
`static.berqwp.com` after cutover it will break once that subscription lapses. Nothing in the
new Next.js app references it — worth keeping it that way.

## Redirect gap analysis

`next.config.ts` already carries 20 redirect rules, and **all 16 old URLs have a working
destination** on the new site — no live page will 404. All six old condition slugs exist in
`lib/data/conditions.ts`. The gaps are in the *aliases* around them:

**Missing — these 301 on the old site today but have no rule on the new one:**
`/hyperbaric/`, `/privacy/`, `/condition/`, `/radiation/`, and all six root-level condition
slugs (`/chronic-pain/`, `/post-covid/`, `/non-healing-wounds/`, `/sudden-hearing-loss/`,
`/radiation-tissue-damage/`, `/diabetic-lower-extremity-wounds/`).

**Missing — indexed sitemap URLs.** The old `robots.txt` points Google at
`/sitemap_index.xml`, and Rank Math also publishes `/page-sitemap.xml`,
`/condition-sitemap.xml` and `/local-sitemap.xml`. The new site serves `/sitemap.xml` via
`app/sitemap.ts`, so the Rank Math paths will 404 unless redirected.

**Worth a decision, not a bug:**

- `/hyperbaric-therapy/` currently redirects to `/lp/hyperbaric-therapy/`. That is a real,
  indexed 16 KB content page on the old site being sent to a landing page. Fine if the LP
  covers the same ground — worth confirming the copy in
  [`pages/hyperbaric-therapy.md`](./pages/hyperbaric-therapy.md) is represented, since this is
  the largest page on the site.
- `/treatments/` is in the new config but was a 404 on the old site. Harmless.
- `/home/` is a genuine duplicate of `/` on the old site — a separate published page with a
  self-referencing canonical, so both are indexable. The new config already 301s it. Good.

## Two quirks in the old site's behaviour

1. **Trailing slashes are inconsistent.** `/privacy-policy` and `/thank-you` 301 to the slashed
   form, but `/faqs`, `/treatment`, `/conditions`, `/contact-us`, `/home`, `/physicians`,
   `/hyperbaric-therapy` and every `/condition/<slug>` return **200 at both spellings**.
   Canonical tags point at the slashed version, so this has not hurt indexing. The new site's
   `trailingSlash: true` fixes it properly.
2. **`http://www.` takes two hops** (`http://www.` → `https://www.` → `https://`). Collapse to
   a single 301 at the new host or CDN.

## How this was captured

A BFS crawl seeded from the sitemap, cross-checked against the WordPress REST API for
completeness, with every redirect verified by live request rather than inferred. HTML was
re-fetched with explicit UTF-8 decoding after an initial pass mangled en-dashes.

Ahrefs and Search Console data were not available for this audit — both endpoints returned
`Insufficient plan` on the connected account. That means historical URLs that no longer
resolve (old paths with backlinks, killed pages) are **not** represented here. If you have
Search Console access, exporting the Pages report and diffing it against
[`page-inventory.md`](./page-inventory.md) is the one gap worth closing before cutover.
