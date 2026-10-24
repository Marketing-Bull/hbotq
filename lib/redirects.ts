/**
 * Legacy page redirects, keyed by the slashed source path.
 *
 * Two places read this map:
 *
 * - `next.config.ts` turns each entry into a 308 for the slashed spelling.
 * - `proxy.ts` handles the *unslashed* spelling (`/hyperbaric`). Next.js applies
 *   its built-in trailing-slash redirect before any `redirects()` rule, so
 *   `/hyperbaric` used to go `/hyperbaric` → `/hyperbaric/` → `/lp/hyperbaric-therapy/`,
 *   which Ahrefs reports as a redirect chain. With
 *   `skipTrailingSlashRedirect` on, the proxy does the slash redirect itself
 *   and sends mapped paths straight to their destination in one hop.
 *
 * `permanent: true` emits a 308, which search engines treat the same as the
 * 301 these replace, while preserving the request method. Sources were
 * verified against the live WordPress site before the DNS cutover and are
 * recorded in docs/migration/redirects.md.
 */
export const pageRedirects: Record<string, string> = {
  "/home/": "/",
  "/faq/": "/faqs/",
  "/contact/": "/contact-us/",
  "/physician/": "/physicians/",
  "/treatments/": "/treatment/",
  "/hyperbaric-therapy/": "/lp/hyperbaric-therapy/",
  "/hyperbaric/": "/lp/hyperbaric-therapy/",
  "/privacy/": "/privacy-policy/",
  "/condition/": "/conditions/",
  "/radiation/": "/condition/radiation-tissue-damage/",

  // /conditions/<slug>/ → /condition/<slug>/
  "/conditions/chronic-pain/": "/condition/chronic-pain/",
  "/conditions/diabetic-lower-extremity-wounds/":
    "/condition/diabetic-lower-extremity-wounds/",
  "/conditions/non-healing-wounds/": "/condition/non-healing-wounds/",
  "/conditions/post-covid/": "/condition/post-covid/",
  "/conditions/radiation-tissue-damage/":
    "/condition/radiation-tissue-damage/",
  "/conditions/sudden-hearing-loss/": "/condition/sudden-hearing-loss/",

  // Root-level condition slugs. The old site served every condition at
  // /<slug>/ as well as /condition/<slug>/, and 301s the short form.
  "/chronic-pain/": "/condition/chronic-pain/",
  "/diabetic-lower-extremity-wounds/":
    "/condition/diabetic-lower-extremity-wounds/",
  "/non-healing-wounds/": "/condition/non-healing-wounds/",
  "/post-covid/": "/condition/post-covid/",
  "/radiation-tissue-damage/": "/condition/radiation-tissue-damage/",
  "/sudden-hearing-loss/": "/condition/sudden-hearing-loss/",

  // WordPress artifacts that still return 200 on the old site.
  "/feed/": "/",
  "/category/uncategorized/": "/",
};
