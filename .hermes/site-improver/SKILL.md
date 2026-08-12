---
name: hbotq-site-improver
description: "Improve HBOTQ medical site: SEO, schema, performance, conversion, tracking. Pick next pending item from TODO.md and create PRs."
version: 1.0.0
author: Hermes Agent
license: MIT
metadata:
  hermes:
    tags: [hbotq, nextjs, seo, schema, conversion, tracking, web-design]
---

# HBOTQ Site Improver

## Overview
Nightly automated site improvement for **HBOTQ** (Hyperbaric Medicine and Wound Treatment Center of Queens — hbotq.com). Picks the next pending item from `.hermes/site-improver/TODO.md`, implements it, commits, and creates a PR.

## Site Context
- **Repo**: `github.com/Marketing-Bull/hbotq`
- **Branch**: `improve-credibility-conversion`
- **Stack**: Next.js 14 + Tailwind CSS + TypeScript + GTM
- **Sites**: Repo URL `https://github.com/Marketing-Bull/hbotq` | Deployed `https://hbotq.com`
- **Repo path**: `/root/hermes/projects/hbotq-site`

## Workflow
Each run:
1. Fetch latest branch
2. Read `.hermes/site-improver/TODO.md` → find first `[ ]` pending item
3. Implement it (schema, SEO, tracking, conversion, WebDesign)
4. Stage changes, commit with `feat: <item>` message
5. Push branch
6. If no open PR exists for this branch → create one via GitHub REST API
7. Update `.hermes/site-improver/TODO.md`: move item from PENDING to COMPLETED
8. Also update `.hermes/site-improver/COMPLETED.md` with: date, item code, description, PR URL

## Implementation Categories (in order of priority in TODO.md)
- **Schema** — JSON-LD: LocalBusiness, FAQPage, BreadcrumbList, MedicalCondition, Physician, Review
- **SEO Meta** — OG images, canonical, geo tags, robots.txt
- **Tracking** — GTM events: form submission, phone clicks, scroll depth, outbound links
- **Conversion** — form UX, trust signals, CTA copy, urgency signals
- **Web Design** — mobile nav, Core Web Vitals, accessibility, image alt

## PR Creation via GitHub REST API
```bash
curl -s -X POST "https://api.github.com/repos/Marketing-Bull/hbotq/pulls" \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "feat: <item description>",
    "head": "improve-credibility-conversion",
    "base": "main",
    "body": "## Summary\n\n<pick one item from TODO, implement, describe changes>\n\n### Changes\n| Item | Description |\n|------|-------------|\n| ... | ... |\n"
  }'
```
GitHub token: stored in env as `GITHUB_TOKEN`

## Common Pitfalls
1. **Conflicting API errors** — if another PR exists for this branch, skip PR creation step
2. **Build failures** — always run `cd $REPO && yarn build` before pushing to verify no TS/Tailwind errors
3. **Large JSON-LD additions** — keep schema additions under 5KB; split into separate items if needed
4. **Merge conflicts** — if main has changed newer items, rebase or merge before committing
5. **GTM server-side only** — GTM events via dataLayer fire client-side only; ensure form tracking doesn't break Server Components

## Verification Checklist
- [ ] Implementation builds without errors (`yarn build`)
- [ ] Changes are scoped to one item per commit
- [ ] PR body contains proper summary table
- [ ] TODO.md marked complete with date
- [ ] COMPLETED.md updated with PR URL
- [ ] Branch pushed to origin
