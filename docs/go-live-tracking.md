# Go-live: tracking and measurement

Status of everything measurement-related before DNS cutover. Split into what is
done in code, and what has to be done by a human in a dashboard.

Legend: **[CODE]** shipped in this repo · **[HERMES]** needs an agent/human with
account access.

---

## 0. Blocker found and fixed — the form never worked

`<input type="checkbox" value="true" {...register("consent")} />` made
react-hook-form return the *string* `"true"`, while the Zod schema requires the
boolean literal `true`. **Every submission failed validation and the API was
never called.** Present since the original Next.js 16 rebuild (`e052de5`), so no
lead has ever reached the API through this form.

Fixed by removing the `value` attribute. Verified in Chromium: the form now
submits and redirects to `/thank-you/`.

This explains why the phone dominates conversions in the CallRail data — the
form was not an alternative, it was a dead end.

> **Do not cut over DNS until this is merged.** Everything else on this page is
> improvement; this one is the difference between capturing web leads and not.

---

## 1. GTM — currently pointed at the old site

**[CODE]** The container loads from `NEXT_PUBLIC_GTM_ID` (`components/analytics/gtm.tsx`),
head script plus `<noscript>` iframe. Nothing else is needed in code.

**[HERMES] What to change inside the GTM container.** The container was built
for the WordPress site, so its triggers reference things that no longer exist.

1. **Set the env var.** Vercel → project → Settings → Environment Variables →
   `NEXT_PUBLIC_GTM_ID` = the container ID, scoped to **Production** (add
   **Preview** too if you want tags on branch deploys). Redeploy.
2. **Delete or disable every WordPress-era trigger.** Anything matching
   `*/wp-admin/*`, `*/wp-content/*`, Contact Form 7 / Gravity Forms / Elementor
   form triggers, and any "Form Submission" trigger relying on GTM's built-in
   form listener. The new site submits over `fetch` — the built-in form
   listener will never fire, and leaving these in place produces silent zeroes
   that look like a traffic problem.
3. **Rebuild triggers on Custom Events** using the dataLayer event names in
   section 3 below. Every interaction on the new site pushes a named event; none
   of them need DOM-scraping triggers.
4. **Re-point URL-based triggers.** Old paths (`/frequently-asked-questions`,
   `/accepted-insurance`, `/contact`) now redirect — see `next.config.ts`.
   Triggers matching the old paths will not fire on the new URLs.
5. **Check the Consent Mode / cookie-banner tag** if one exists. There is no
   consent banner on the new site; a consent-gated tag will stay blocked forever.
6. **Preview mode against the Vercel preview URL before cutover**, not after.
   Confirm each event in section 3 fires.

---

## 2. GA4 and Google Ads conversions — not present at all

**[CODE]** There is **no GA4 tag and no Google Ads conversion tag anywhere in the
codebase**. Searched for `gtag`, `G-XXXXXXXXXX`, `AW-XXXXXXXXX`, `googleads`,
`conversion_id` — zero matches. The only tag is the GTM container.

This is the correct architecture: GA4 and Ads conversions belong *inside* GTM,
not hardcoded. But right now nothing is configured inside it either, which means
**Google Ads is currently optimising against conversions it cannot see from the
website.** The 273 conversions in the Ads account come from call extensions, not
from the site.

**[HERMES] To configure, all inside GTM:**

1. **GA4 Configuration tag** — Google Tag with the GA4 Measurement ID, firing on
   *Initialization – All Pages*.
2. **GA4 Event tags** for each custom event in section 3. Pass the event
   parameters through (`form_name`, `form_condition`, `location`, `cta_label`,
   `utm_source`, `utm_medium`, `utm_campaign`, `has_gclid`).
3. **Mark conversions in GA4** — Admin → Events → mark `form_submit` and
   `phone_call` as key events.
4. **Google Ads conversion actions.** Create two in the Ads UI, then fire them
   from GTM on the same triggers:
   - *Website lead — form* on `form_submit`
   - *Website lead — phone click* on `phone_call`
   Import the GA4 key events instead if you prefer a single source of truth —
   but do not do both, or every conversion double-counts.
5. **Link GA4 ↔ Google Ads** (GA4 Admin → Product links) so audiences and
   conversions flow.
6. **Set the conversion window and counting.** For a medical lead, "one per
   click" is usually right; "every" inflates on repeat callers — the CallRail
   data has one patient placing 36 calls.
7. **Enable Enhanced Conversions** if you want to close the loop on offline
   bookings. The form already collects email and phone.

> Beware double-counting with CallRail (section 6). If CallRail also reports
> calls into Ads, and GTM fires a `phone_call` conversion on the same click,
> one call becomes two conversions.

---

## 3. Event tracking — this part is done

**[CODE]** Every meaningful interaction pushes a named dataLayer event via
`lib/analytics/track.ts`. Complete inventory:

| dataLayer event | Fires on | Key parameters |
| --- | --- | --- |
| `form_view` | Consultation form enters the viewport | `form_name` |
| `form_start` | First interaction with any form field | `form_name` |
| `form_field_complete` | Each tracked field blurred non-empty | `form_name`, `field_name` |
| `form_submit` | Successful submission | `form_name`, `form_condition`, `utm_source`, `utm_medium`, `utm_campaign`, `has_gclid` |
| `outbound_click` | `tel:` / `mailto:` / external links | `outbound_category` (`phone_call`, `mailto`, `external`), `location`, `cta_label` |
| `cta_click` | Internal CTA and nav clicks | `location`, `cta_label` |
| `scroll_depth` | 25 / 50 / 75 / 100% | `percent`, `page_location` |
| `not_found_view` | 404 page render | `page_location` |

Note `phone_call` arrives as **`outbound_click` with `outbound_category:
phone_call`**, not as its own event name. Build the GTM trigger on that pair —
a trigger listening for an event literally named `phone_call` will never fire.

---

## 4. Source and UTM on form submissions — done

**[CODE]** `lib/analytics/attribution.ts` captures on the first page of a
session and holds in `sessionStorage`:

`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `gclid`,
`gbraid`, `wbraid`, `fbclid`, `msclkid`, `landing_page`, `referrer`,
`first_seen_at`.

First touch wins, so a patient who lands on an ad, browses, and submits from
`/contact-us/` stays attributed to the ad. `sessionStorage` rather than a
cookie: not sent to the server on every request, dies with the tab, cannot leak
one visit's attribution onto a later one.

These now flow to three places: the GHL webhook payload, the lead email
("Campaign attribution" block), and the `form_submit` dataLayer event.

**[HERMES] GoHighLevel workflow — finish the mapping.**

The webhook now posts **13 additional top-level keys**. They are always present
(empty string when unknown) specifically so the sample GHL captures shows every
mappable field — *a key absent from the sample cannot be mapped later*.

1. **Re-capture the sample.** GHL only knows the fields present when you last
   captured. Trigger a test submission **from a URL carrying UTMs and a fake
   gclid** so the sample is populated:
   `https://hbotq.com/lp/wound-care-queens/?utm_source=google&utm_medium=cpc&utm_campaign=test&utm_term=test-kw&gclid=TESTGCLID`
2. **Create custom fields** on the contact for `utm_source`, `utm_medium`,
   `utm_campaign`, `utm_term`, `utm_content`, `gclid`, `landing_page`,
   `referrer`. Map the payload keys onto them in the Create/Update Contact action.
3. **De-duplicate by email, falling back to phone.**
4. **Tag from the data** — a constant `website-lead`, plus one tag from `source`
   (which LP or page) and one from `condition_label`.
5. **Put `message` into a contact Note** so intake staff see the context.
6. **Add an internal notification** so leads get seen promptly.
7. **Publish/activate the workflow.** Until then leads arrive but are not filed.
8. **Delete the two test contacts** afterwards.

Authoritative payload shape: `lib/integrations/ghl.ts`.

---

## 5. Landing page URLs

All six are `noindex` and excluded from `sitemap.xml` by design, so they never
compete with the organic condition pages.

| URL | Targets |
| --- | --- |
| `https://hbotq.com/lp/wound-care-queens/` | wound-care intent — **new in this PR** |
| `https://hbotq.com/lp/diabetic-foot-ulcers/` | diabetic wound intent |
| `https://hbotq.com/lp/non-healing-wounds/` | chronic non-healing wounds |
| `https://hbotq.com/lp/sudden-hearing-loss/` | sudden sensorineural hearing loss |
| `https://hbotq.com/lp/radiation-injury/` | radiation tissue damage |
| `https://hbotq.com/lp/hyperbaric-therapy/` | generic hyperbaric / HBOT intent |

Preview host for pre-cutover testing:
`https://hbotq-git-claude-google-ads-landing-page-yhlthv-marketing-bull.vercel.app`

**[HERMES]** Ad final URLs currently all point at `https://hbotq.com/`. Repoint
each ad group to its matching LP above, and standardise on the **apex domain** —
the landing page report shows `www.hbotq.com` converting clicks at 1.30% CTR
against 4.25% for the apex.

---

## 6. CallRail phone swapping — installed, needs credentials

**[CODE]** `components/analytics/callrail.tsx` injects swap.js and, critically,
re-runs `CallTrk.swap()` on every client-side route change. Without that, the
number is swapped on the landing page and reverts to the house number the moment
the visitor navigates — which on an App Router site is most of the journey.

It also swaps `tel:` hrefs, so the tracked number is what actually gets dialled
on mobile.

Inert until both env vars are set, so preview and local builds do not consume
the number pool.

**[HERMES] To enable:**

1. In CallRail: **Settings → Integrations → JavaScript snippet**. The URL is
   `https://cdn.callrail.com/companies/<COMPANY_ID>/<SCRIPT_ID>/12/swap.js`.
2. In Vercel → Settings → Environment Variables, scoped to **Production**:
   - `NEXT_PUBLIC_CALLRAIL_COMPANY_ID` = `<COMPANY_ID>`
   - `NEXT_PUBLIC_CALLRAIL_SCRIPT_ID` = `<SCRIPT_ID>`
   Both are public identifiers that ship in the page, hence the `NEXT_PUBLIC_` prefix.
3. Redeploy.
4. **Verify**: load a page with `?utm_source=google&utm_medium=cpc`, confirm the
   displayed number changes, then navigate to another page and confirm it *stays*
   swapped. Check the `tel:` href, not just the visible text.
5. **Configure the number pool** for source-level swapping (Google Ads / organic
   / direct at minimum), and keep the house number `718-925-3322` as the fallback.
6. **Decide where calls are counted.** If CallRail reports conversions into
   Google Ads *and* GTM fires a `phone_call` conversion, every call counts twice.
   Pick one. Given 94% of paid calls never touch the site, CallRail is the more
   complete source — consider making GTM's `phone_call` a GA4 event only, not an
   Ads conversion.
7. **Split the existing-patient line.** One patient placed 36 of 96 paid calls
   about transport and supplies. A dedicated number for existing patients keeps
   both reporting and the front desk clean.

---

## Pre-cutover checklist

- [ ] Merge the consent-checkbox fix — **blocker**
- [ ] `NEXT_PUBLIC_GTM_ID` set in Vercel Production
- [ ] GTM: WordPress-era triggers removed, custom-event triggers rebuilt
- [ ] GA4 config tag + event tags live, key events marked
- [ ] Google Ads conversion actions created and linked, counting rules set
- [ ] GHL: sample re-captured with UTMs, fields mapped, workflow **published**
- [ ] CallRail env vars set, swap verified across a route change
- [ ] Double-counting decision made between CallRail and GTM
- [ ] Ad final URLs repointed to the LPs, on the apex domain
- [ ] End-to-end test: ad-URL click → browse → submit → lead lands in GHL with
      `utm_source` and `gclid` populated, and shows in GA4 and Ads
