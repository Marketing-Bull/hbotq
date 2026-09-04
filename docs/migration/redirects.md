# 301 Redirect Map — hbotq.com

Captured from the live site on 2026-09-04, before DNS cutover. Every rule below was
verified with a live request; nothing here is guessed.

**28 rules.** Machine-readable copy: [`redirects.csv`](./redirects.csv).
Ready-to-paste Next.js config: [`next-redirects.ts`](./next-redirects.ts).

| Source | Destination | Status | Note |
| --- | --- | --- | --- |
| `http://hbotq.com/*` | `https://hbotq.com/*` | 301 | Force HTTPS |
| `https://www.hbotq.com/*` | `https://hbotq.com/*` | 301 | Strip www |
| `http://www.hbotq.com/*` | `https://hbotq.com/*` | 301 | 2-hop today -> collapse to 1 |
| `/contact/` | `/contact-us/` | 301 | Alias |
| `/hyperbaric/` | `/hyperbaric-therapy/` | 301 | Alias |
| `/physician/` | `/physicians/` | 301 | Alias |
| `/faq/` | `/faqs/` | 301 | Alias |
| `/privacy/` | `/privacy-policy/` | 301 | Alias |
| `/condition/` | `/conditions/` | 301 | Alias |
| `/radiation/` | `/condition/radiation-tissue-damage/` | 301 | Alias |
| `/conditions/chronic-pain/` | `/condition/chronic-pain/` | 301 | Legacy plural path |
| `/chronic-pain/` | `/condition/chronic-pain/` | 301 | Legacy root-level path |
| `/conditions/diabetic-lower-extremity-wounds/` | `/condition/diabetic-lower-extremity-wounds/` | 301 | Legacy plural path |
| `/diabetic-lower-extremity-wounds/` | `/condition/diabetic-lower-extremity-wounds/` | 301 | Legacy root-level path |
| `/conditions/non-healing-wounds/` | `/condition/non-healing-wounds/` | 301 | Legacy plural path |
| `/non-healing-wounds/` | `/condition/non-healing-wounds/` | 301 | Legacy root-level path |
| `/conditions/post-covid/` | `/condition/post-covid/` | 301 | Legacy plural path |
| `/post-covid/` | `/condition/post-covid/` | 301 | Legacy root-level path |
| `/conditions/radiation-tissue-damage/` | `/condition/radiation-tissue-damage/` | 301 | Legacy plural path |
| `/radiation-tissue-damage/` | `/condition/radiation-tissue-damage/` | 301 | Legacy root-level path |
| `/conditions/sudden-hearing-loss/` | `/condition/sudden-hearing-loss/` | 301 | Legacy plural path |
| `/sudden-hearing-loss/` | `/condition/sudden-hearing-loss/` | 301 | Legacy root-level path |
| `/sitemap.xml` | `/sitemap_index.xml` | 301 | Sitemap |
| `/wp-sitemap.xml` | `/sitemap_index.xml` | 301 | Sitemap |
| `/index.php` | `/` | 301 | WP artifact |
| `/?p=<ID>` | `/<permalink>/` | 301 | WP ID lookup |
| `/?page_id=<ID>` | `/<permalink>/` | 301 | WP ID lookup |
| `/<path>  (no trailing slash)` | `/<path>/` | 301 | Enforce trailing slash consistently |

## Behaviour notes

1. **Trailing slash is inconsistent today.** `/privacy-policy` and `/thank-you` 301 to the
   slashed form, but `/faqs`, `/treatment`, `/conditions`, `/contact-us`, `/home`,
   `/physicians`, `/hyperbaric-therapy` and every `/condition/<slug>` all return **200 at
   both** spellings. Canonical tags point at the slashed version, so Google is fine, but the
   new site should 301 unslashed to slashed across the board.
2. **`http://www.` takes two hops** (`http://www.` -> `https://www.` -> `https://`). Collapse
   to a single 301 on the new host.
3. **`/home/` duplicates `/`.** It is a separate published page with a self-referencing
   canonical, so both are indexable. Recommend 301 `/home/` -> `/` on the new site.
4. **`?p=` / `?page_id=` lookups** resolve for any WordPress ID. These disappear with
   WordPress; only worth preserving if the ID URLs have live backlinks.
