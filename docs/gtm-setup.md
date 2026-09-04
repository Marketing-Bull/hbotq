# GTM build-out — container `GTM-N3QDS5PC`

Build spec for the Hermes agent (or anyone with GTM/GA4/Ads access). Every event
name, parameter and value below is taken from the shipped code on `main`, not
from memory — see "Source of truth" at the end.

**State right now:** the container loads on production and the site is firing
events into it. It has **no tags, triggers or variables**, so every event is
being discarded. Nothing is being recorded in GA4 or Google Ads.

**Order matters.** Do section 1 before anything else, then 2 → 6. Do not publish
until section 8 passes.

---

## 1. Delete the WordPress-era triggers first

The container was built for the old WordPress site. Leaving its triggers in place
produces silent zeroes that look like a traffic collapse rather than a
misconfiguration, so clear them before adding anything.

Delete or disable:

- Any trigger of type **Form Submission** (GTM's built-in form listener). It
  **cannot fire on this site** — the consultation form submits over `fetch` and
  never triggers a native form submit event. Any tag depending on one is dead.
- Any trigger matching `*/wp-admin/*`, `*/wp-content/*`, `*/wp-json/*`.
- Contact Form 7 / Gravity Forms / Elementor triggers.
- **Page View triggers on old paths.** These URLs now redirect, so a trigger
  matching the old path never fires:

  | Old path | Now |
  | --- | --- |
  | `/frequently-asked-questions` | `/faqs/` |
  | `/contact` | `/contact-us/` |
  | `/physician` | `/physicians/` |
  | `/treatments` | `/treatment/` |
  | `/accepted-insurance` | removed |
  | `/hyperbaric-therapy` | `/lp/hyperbaric-therapy/` |
  | `/conditions/<slug>/` | `/condition/<slug>/` |

- Any **Consent Mode** or cookie-banner gating tag. There is no consent banner on
  this site; a consent-gated tag stays blocked forever.

---

## 2. Data Layer Variables

Create one **Data Layer Variable** per row (Variables → User-Defined → New →
Data Layer Variable). Name them exactly as shown so the tag configs below match.

| Variable name | Data Layer Variable Name | Appears on |
| --- | --- | --- |
| `dlv - form_name` | `form_name` | `form_view`, `form_start`, `form_field_complete`, `form_submit` |
| `dlv - form_condition` | `form_condition` | `form_submit` |
| `dlv - field_name` | `field_name` | `form_field_complete` |
| `dlv - form` | `form` | `conversion_confirmed` |
| `dlv - utm_source` | `utm_source` | `form_submit`, `conversion_confirmed` |
| `dlv - utm_medium` | `utm_medium` | `form_submit`, `conversion_confirmed` |
| `dlv - utm_campaign` | `utm_campaign` | `form_submit`, `conversion_confirmed` |
| `dlv - has_gclid` | `has_gclid` | `form_submit`, `conversion_confirmed` |
| `dlv - location` | `location` | `phone_call`, `outbound_click`, `cta_click` |
| `dlv - cta_label` | `cta_label` | `phone_call`, `outbound_click`, `cta_click` |
| `dlv - outbound_category` | `outbound_category` | `phone_call`, `outbound_click`, `cta_click` |
| `dlv - percent` | `percent` | `scroll_depth` |
| `dlv - page` | `page` | `scroll_depth` |
| `dlv - page_location` | `page_location` | `not_found_view` |
| `dlv - user_data` | `user_data` | `form_submit` — **Version 2**, needed for Enhanced Conversions |

---

## 3. Triggers

All are **Custom Event** triggers. Event name must match exactly (case-sensitive,
no regex needed).

| Trigger name | Custom Event name | Fires on |
| --- | --- | --- |
| `CE - conversion_confirmed` | `conversion_confirmed` | Confirmed lead — **this is the conversion** |
| `CE - form_submit` | `form_submit` | Form accepted by the API |
| `CE - form_view` | `form_view` | Form scrolled into view |
| `CE - form_start` | `form_start` | First field interaction |
| `CE - form_field_complete` | `form_field_complete` | Each field completed |
| `CE - phone_call` | `phone_call` | `tel:` link clicked |
| `CE - outbound_click` | `outbound_click` | `mailto:` or external link |
| `CE - cta_click` | `cta_click` | Internal CTA / nav click |
| `CE - scroll_depth` | `scroll_depth` | 25 / 50 / 75 / 100% |
| `CE - not_found_view` | `not_found_view` | 404 rendered |

### Two traps

**`phone_call` is its own event name.** It used to be nested inside
`outbound_click` with `outbound_category: phone_call`. It was split out because
phone is the dominant conversion path here. A trigger built the old way (match
`outbound_click` AND a parameter) still works — `outbound_category` is still
emitted on all three — but the simple event-name trigger is what you want.

**Do not use a Page View trigger on `/thank-you/` for the conversion.** Use
`CE - conversion_confirmed`. The event only fires when the visitor actually
submitted the form this session, and only once — a refresh, a bookmark, or a
direct visit to `/thank-you/` fires nothing. A raw page-view trigger counts all
three and feeds duplicate and phantom conversions into automated bidding.

---

## 4. GA4

### 4.1 Configuration tag

- Tag type: **Google Tag**
- Tag ID: the GA4 Measurement ID (`G-…`)
- Trigger: **Initialization – All Pages**

### 4.2 Event tags

One **GA4 Event** tag per row. Measurement ID as above.

| Tag name | Event Name | Event Parameters | Trigger |
| --- | --- | --- | --- |
| `GA4 - conversion_confirmed` | `conversion_confirmed` | `form`, `utm_source`, `utm_medium`, `utm_campaign`, `has_gclid` | `CE - conversion_confirmed` |
| `GA4 - form_submit` | `form_submit` | `form_name`, `form_condition`, `utm_source`, `utm_medium`, `utm_campaign`, `has_gclid` | `CE - form_submit` |
| `GA4 - phone_call` | `phone_call` | `location`, `cta_label` | `CE - phone_call` |
| `GA4 - form_view` | `form_view` | `form_name` | `CE - form_view` |
| `GA4 - form_start` | `form_start` | `form_name` | `CE - form_start` |
| `GA4 - form_field_complete` | `form_field_complete` | `form_name`, `field_name` | `CE - form_field_complete` |
| `GA4 - outbound_click` | `outbound_click` | `outbound_category`, `location`, `cta_label` | `CE - outbound_click` |
| `GA4 - cta_click` | `cta_click` | `location`, `cta_label` | `CE - cta_click` |
| `GA4 - scroll_depth` | `scroll_depth` | `percent`, `page` | `CE - scroll_depth` |
| `GA4 - not_found_view` | `not_found_view` | `page_location` | `CE - not_found_view` |

Map each parameter to its `dlv - …` variable from section 2.

### 4.3 Key events

GA4 → Admin → Events → mark as key events:

- `conversion_confirmed`
- `phone_call`

**Not `form_submit`.** Use `conversion_confirmed` so GA4 and Google Ads count the
same thing; otherwise the two platforms report different numbers for the same
lead and someone loses an afternoon to the discrepancy. Keep `form_submit` as a
plain event — it is the funnel step above `conversion_confirmed`, and the gap
between them is a real signal (someone submitted but never reached confirmation).

### 4.4 Register custom dimensions

GA4 → Admin → Custom definitions → Custom dimensions, scope **Event**, for:
`form_name`, `form_condition`, `utm_source`, `utm_medium`, `utm_campaign`,
`has_gclid`, `location`, `cta_label`.

Without this the parameters are collected but not reportable.

---

## 5. Google Ads conversions

Create two conversion actions in Google Ads (Goals → Conversions → New), then
fire each from GTM with a **Google Ads Conversion Tracking** tag.

| Conversion action | GTM trigger | Count | Category |
| --- | --- | --- | --- |
| *Website lead — form* | `CE - conversion_confirmed` | **One** | Submit lead form |
| *Website lead — phone click* | `CE - phone_call` | **One** | Contact |

**Count = "One", not "Every".** "Every" inflates badly here — the CallRail data
shows a single existing patient placing 36 calls in one period.

Link GA4 ↔ Google Ads (GA4 Admin → Product links). Import the GA4 key events
*or* fire the Ads tags from GTM — **not both**, or every conversion double-counts.

### ⚠️ Double-counting with CallRail

If CallRail also reports calls into Google Ads *and* the `phone_call` Ads
conversion fires above, one call becomes two conversions.

**Recommendation:** make `phone_call` a **GA4 event only** and let CallRail own
the Ads phone conversion. 94% of paid calls never touch the website — they come
from call and location extensions — so CallRail sees the complete picture and
GTM sees a small slice of it.

---

## 6. Enhanced Conversions

The data side already ships. `form_submit` carries a `user_data` object:

```
user_data: {
  email_address: "patient@example.com",   // lowercased, trimmed
  phone_number:  "+17185550100"           // E.164
}
```

Both are normalised exactly as Google expects. To enable:

1. Google Ads → the *Website lead — form* conversion action → **Enhanced
   conversions** → turn on, method **Google Tag Manager**.
2. In the Ads conversion tag in GTM → **Include user-provided data** → select
   `dlv - user_data`.
3. GTM applies SHA-256 in the browser; nothing unhashed leaves the page.

Note `user_data` is on `form_submit`, while the conversion fires on
`conversion_confirmed`. If your Ads tag fires on `conversion_confirmed` and
cannot see `user_data`, either move the Ads tag to `CE - form_submit` (accepting
that it is one step earlier in the funnel and not deduped against refreshes), or
set `dlv - user_data` to persist across the navigation. **Prefer keeping the
conversion on `conversion_confirmed`** — accurate counting matters more than
enhanced match rate.

---

## 7. Reference values

Useful for building segments and for sanity-checking Preview mode.

**`form_name`** — `contact-us`, `home`, `treatment`,
`lp-wound-care-queens-hero`, `lp-wound-care-queens-bottom`,
`lp-hyperbaric-therapy-hero`, `lp-hyperbaric-therapy-bottom`,
`lp-diabetic-foot-ulcers`, `lp-non-healing-wounds`, `lp-sudden-hearing-loss`,
`lp-radiation-injury`, plus `condition-<slug>`, `location-<slug>`,
`wellness-<slug>` and any of the above with a `-bottom` suffix.

**`form_condition`** — `non-healing-wounds`, `diabetic-lower-extremity-wounds`,
`radiation-tissue-damage`, `refractory-osteomyelitis`, `severe-anemia`,
`sudden-hearing-loss`, `post-covid`, `chronic-pain`, `other`, `unsure`.

**`location`** — `header`, `hero`, `primary_nav`, `primary_nav_submenu`,
`footer`, `footer_social`, `sticky_cta`, `cta_banner`, `phone_cta`,
`thank_you`, `lp_header`, `lp_hero`, `lp_body`, `lp_footer`,
`lp_conditions_grid`, `lp_wound_types`, `lp_faq`.

**`cta_label`** — `call_cta`, `book_consultation`, `book_free_consult`,
`book_now`, `address_phone`, `email_cta`, `logo_home`, `clinical_overview`,
`see_all_conditions`, `see_all_faqs`, `watch_videos`.

**`outbound_category`** — `phone_call`, `mailto`, `external`, `cta_click`.

---

## 8. QA before publishing

Run GTM **Preview** against the Vercel preview URL, not production, and confirm
each of these. Do not publish until all pass.

- [ ] Load any page → GA4 Configuration tag fires once
- [ ] Scroll to the form → `form_view` with the right `form_name`
- [ ] Click into a field → `form_start`
- [ ] Complete name, then blur → `form_field_complete` with `field_name: name`
- [ ] Submit a valid test lead → `form_submit` fires, carrying `user_data` with
      a lowercased email and a `+1…` phone
- [ ] Redirect to `/thank-you/` → `conversion_confirmed` fires **once**
- [ ] **Refresh `/thank-you/` → `conversion_confirmed` does NOT fire again**
- [ ] **Open `/thank-you/` directly in a new session → it does NOT fire**
- [ ] Click a `tel:` link → `phone_call` with `location` and `cta_label`
- [ ] Click a nav link → `cta_click`
- [ ] Visit a bad URL → `not_found_view`
- [ ] Land on `?utm_source=google&utm_medium=cpc&utm_campaign=test&gclid=TEST`,
      navigate to `/contact-us/`, submit → the UTMs and `has_gclid: true` are
      still on `form_submit` and `conversion_confirmed` (first-touch attribution
      survives the navigation)
- [ ] GA4 DebugView shows the events arriving
- [ ] Google Ads shows the conversion actions leaving "No recent conversions"

Then **Submit → Publish** with a version name and description.

---

## 9. Also outstanding (not GTM)

- Repoint ad final URLs to the landing pages — every ad currently points at
  `hbotq.com/`. LPs: `/lp/wound-care-queens/`, `/lp/diabetic-foot-ulcers/`,
  `/lp/non-healing-wounds/`, `/lp/sudden-hearing-loss/`, `/lp/radiation-injury/`,
  `/lp/hyperbaric-therapy/`.
- Standardise final URLs on the **apex** domain — `www` converts clicks at 1.30%
  CTR against 4.25% for apex.
- CallRail: set `NEXT_PUBLIC_CALLRAIL_COMPANY_ID` and
  `NEXT_PUBLIC_CALLRAIL_SCRIPT_ID` in Vercel, then verify the swapped number
  survives a client-side route change and that the `tel:` href is swapped too.
- GoHighLevel: re-capture the webhook sample **from a URL carrying UTMs**, map
  the 13 attribution fields, publish the workflow.

---

## Source of truth

Event names and parameters come from `lib/analytics/track.ts` and its call sites
on `main` (`c0e54a5`). If they ever disagree, the code wins — regenerate this
document rather than patching around it.

- `lib/analytics/track.ts` — event-name mapping
- `components/forms/consultation-form.tsx` — form funnel, `user_data`
- `components/analytics/conversion-confirmed.tsx` — dedupe logic
- `components/analytics/attribution.ts` — first-touch capture
- `docs/go-live-tracking.md` — the wider pre-cutover checklist
