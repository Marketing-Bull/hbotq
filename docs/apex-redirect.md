# Apex (`hbotq.com`) → `www` redirect

## Why

`hbotq.com` is attached to the Vercel project with a **domain-level redirect** to
`www.hbotq.com` (308). Vercel applies it before the request reaches the app, so
an old URL on the bare domain is redirected to `www` first and to its real
destination second:

| Request | Hops today | Hops after |
| --- | --- | --- |
| `https://hbotq.com/` | 1 | 1 |
| `https://hbotq.com/faq` | 2 | 1 |
| `https://hbotq.com/hyperbaric` | 2 | 1 |
| `http://hbotq.com/` | 2 | 2 |
| `http://hbotq.com/hyperbaric` | 3 | 2 |

`http://` on the bare domain stays at two hops at best: Vercel enforces HTTPS on
the host first (`http://hbotq.com` → `https://hbotq.com`), and only then can the
app redirect to `www`. Ahrefs reports two or more redirects as a chain, so a
crawler that arrives on `http://hbotq.com/` will still see one. That cannot be
removed without moving DNS off Vercel's edge.

## What the code does

`proxy.ts` handles the bare domain itself: any request whose `Host` is
`hbotq.com` gets a single 308 to `https://www.hbotq.com`, with the legacy
mapping (`lib/redirects.ts`) and trailing slash already applied and the query
string preserved. The redirects in `next.config.ts` skip the bare domain so they
do not add a hop of their own.

While Vercel still redirects the bare domain, those requests never reach the
app, so the code is **inert until the dashboard change below**. It is safe to
merge first.

## Switching it on

1. Merge the PR and let production deploy.
2. Vercel dashboard → the `hbotq` project → **Settings → Domains** → `hbotq.com`
   → **Edit**. Change it from *Redirect to Another Domain* to
   *Connect to an environment → Production*. Save.
3. Verify (all should print the shown status and `location`):

   ```sh
   curl -sI https://hbotq.com/            # 308 → https://www.hbotq.com/
   curl -sI https://hbotq.com/faq         # 308 → https://www.hbotq.com/faqs/
   curl -sI https://hbotq.com/hyperbaric  # 308 → https://www.hbotq.com/lp/hyperbaric-therapy/
   curl -sI "https://hbotq.com/faqs/?a=1" # 308 → https://www.hbotq.com/faqs/?a=1
   curl -sI https://hbotq.com/sitemap.xml # 308 → https://www.hbotq.com/sitemap.xml
   curl -sI https://www.hbotq.com/        # 200
   ```

   Each bare-domain URL must answer with exactly one redirect.

## Rolling back

Same screen: set `hbotq.com` back to *Redirect to Another Domain* →
`www.hbotq.com`, status **308**. It takes effect immediately and needs no deploy.
If the proxy ever stops running, the bare domain would serve the site directly
instead of redirecting; every page's canonical already points at `www`, so
Google would consolidate on `www` regardless, but roll back promptly.
