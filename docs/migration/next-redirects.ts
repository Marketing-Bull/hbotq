// Redirect rules found on the LIVE hbotq.com (2026-09-04) that are NOT yet in next.config.ts.
// Every source below was verified as a real 301 on the old site, or is a sitemap URL Google
// currently has indexed. Paste into the array returned by `redirects()` in next.config.ts.
//
// next.config.ts sets `trailingSlash: true`, so Next already 301s `/foo` -> `/foo/`.
// Sources are therefore written in the slashed form only.

export const missingRedirects = [
  // --- Aliases that 301 on the old site but have no rule on the new one ---
  { source: "/hyperbaric/", destination: "/lp/hyperbaric-therapy/", permanent: true },
  { source: "/privacy/", destination: "/privacy-policy/", permanent: true },
  { source: "/condition/", destination: "/conditions/", permanent: true },
  { source: "/radiation/", destination: "/condition/radiation-tissue-damage/", permanent: true },

  // --- Root-level condition slugs (all six 301 on the old site today) ---
  { source: "/chronic-pain/", destination: "/condition/chronic-pain/", permanent: true },
  { source: "/diabetic-lower-extremity-wounds/", destination: "/condition/diabetic-lower-extremity-wounds/", permanent: true },
  { source: "/non-healing-wounds/", destination: "/condition/non-healing-wounds/", permanent: true },
  { source: "/post-covid/", destination: "/condition/post-covid/", permanent: true },
  { source: "/radiation-tissue-damage/", destination: "/condition/radiation-tissue-damage/", permanent: true },
  { source: "/sudden-hearing-loss/", destination: "/condition/sudden-hearing-loss/", permanent: true },

  // --- Sitemaps: Rank Math URLs are indexed and referenced by the old robots.txt ---
  { source: "/sitemap_index.xml", destination: "/sitemap.xml", permanent: true },
  { source: "/wp-sitemap.xml", destination: "/sitemap.xml", permanent: true },
  { source: "/page-sitemap.xml", destination: "/sitemap.xml", permanent: true },
  { source: "/condition-sitemap.xml", destination: "/sitemap.xml", permanent: true },
  { source: "/local-sitemap.xml", destination: "/sitemap.xml", permanent: true },

  // --- WordPress artifacts that currently return 200 and may be indexed ---
  { source: "/locations.kml", destination: "/locations/", permanent: true },
  { source: "/feed/", destination: "/", permanent: true },
  { source: "/category/uncategorized/", destination: "/", permanent: true },
];
