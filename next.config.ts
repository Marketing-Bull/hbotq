import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "hbotq.com" },
      { protocol: "https", hostname: "www.hbotq.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/index.php", destination: "/", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      { source: "/home/", destination: "/", permanent: true },
      { source: "/faq", destination: "/faqs/", permanent: true },
      { source: "/faq/", destination: "/faqs/", permanent: true },
      { source: "/contact", destination: "/contact-us/", permanent: true },
      { source: "/contact/", destination: "/contact-us/", permanent: true },
      { source: "/physician", destination: "/physicians/", permanent: true },
      { source: "/physician/", destination: "/physicians/", permanent: true },
      { source: "/treatments", destination: "/treatment/", permanent: true },
      { source: "/treatments/", destination: "/treatment/", permanent: true },
      {
        source: "/conditions/chronic-pain/",
        destination: "/condition/chronic-pain/",
        permanent: true,
      },
      {
        source: "/conditions/diabetic-lower-extremity-wounds/",
        destination: "/condition/diabetic-lower-extremity-wounds/",
        permanent: true,
      },
      {
        source: "/conditions/non-healing-wounds/",
        destination: "/condition/non-healing-wounds/",
        permanent: true,
      },
      {
        source: "/conditions/post-covid/",
        destination: "/condition/post-covid/",
        permanent: true,
      },
      {
        source: "/conditions/radiation-tissue-damage/",
        destination: "/condition/radiation-tissue-damage/",
        permanent: true,
      },
      {
        source: "/conditions/sudden-hearing-loss/",
        destination: "/condition/sudden-hearing-loss/",
        permanent: true,
      },
      {
        source: "/hyperbaric-therapy",
        destination: "/lp/hyperbaric-therapy/",
        permanent: true,
      },
      {
        source: "/hyperbaric-therapy/",
        destination: "/lp/hyperbaric-therapy/",
        permanent: true,
      },

      // --- Aliases carried over from the old WordPress site ---
      // Each of these 301s on hbotq.com today; verified against the live site
      // before the DNS cutover and recorded in docs/migration/redirects.md.
      // `permanent: true` emits a 308, which search engines treat the same as
      // the 301 these replace, while preserving the request method.
      //
      // Sources are written slashed only. `trailingSlash: true` above already
      // 308s the unslashed spelling onto the slashed one, so /hyperbaric
      // reaches /lp/hyperbaric-therapy/ in two hops rather than one. Verified
      // end-to-end against `next start`; every source below lands on a 200.
      {
        source: "/hyperbaric/",
        destination: "/lp/hyperbaric-therapy/",
        permanent: true,
      },
      {
        source: "/privacy/",
        destination: "/privacy-policy/",
        permanent: true,
      },
      {
        source: "/condition/",
        destination: "/conditions/",
        permanent: true,
      },
      {
        source: "/radiation/",
        destination: "/condition/radiation-tissue-damage/",
        permanent: true,
      },

      // Root-level condition slugs. The old site served every condition at
      // /<slug>/ as well as /condition/<slug>/, and 301s the short form.
      {
        source: "/chronic-pain/",
        destination: "/condition/chronic-pain/",
        permanent: true,
      },
      {
        source: "/diabetic-lower-extremity-wounds/",
        destination: "/condition/diabetic-lower-extremity-wounds/",
        permanent: true,
      },
      {
        source: "/non-healing-wounds/",
        destination: "/condition/non-healing-wounds/",
        permanent: true,
      },
      {
        source: "/post-covid/",
        destination: "/condition/post-covid/",
        permanent: true,
      },
      {
        source: "/radiation-tissue-damage/",
        destination: "/condition/radiation-tissue-damage/",
        permanent: true,
      },
      {
        source: "/sudden-hearing-loss/",
        destination: "/condition/sudden-hearing-loss/",
        permanent: true,
      },

      // Rank Math sitemaps. The old robots.txt points Google at
      // /sitemap_index.xml; app/sitemap.ts serves /sitemap.xml instead, so
      // without these the indexed sitemap URLs 404. Paths with a file
      // extension are exempt from trailingSlash, so no slashed variants.
      {
        source: "/sitemap_index.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/wp-sitemap.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/page-sitemap.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/condition-sitemap.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/local-sitemap.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },

      // WordPress artifacts that still return 200 on the old site.
      {
        source: "/locations.kml",
        destination: "/locations/",
        permanent: true,
      },
      {
        source: "/feed/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/category/uncategorized/",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
