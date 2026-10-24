import type { NextConfig } from "next";
import { pageRedirects } from "./lib/redirects";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "hbotq.com" },
      { protocol: "https", hostname: "www.hbotq.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  // The built-in trailing-slash redirect runs before `redirects()`, which made
  // every unslashed legacy URL a two-hop chain. proxy.ts redirects the slash
  // itself (straight to the destination for legacy paths), so turn this off.
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      { source: "/index.php", destination: "/", permanent: true },

      // Legacy pages. proxy.ts handles the unslashed spelling of each.
      ...Object.entries(pageRedirects).map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),

      // Rank Math sitemaps. The old robots.txt points Google at
      // /sitemap_index.xml; app/sitemap.ts serves /sitemap.xml instead, so
      // without these the indexed sitemap URLs 404. Paths with a file
      // extension are exempt from trailingSlash, so no slashed variants.
      { source: "/sitemap_index.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/wp-sitemap.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/page-sitemap.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/condition-sitemap.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/local-sitemap.xml", destination: "/sitemap.xml", permanent: true },

      // WordPress artifact that still returns 200 on the old site.
      { source: "/locations.kml", destination: "/locations/", permanent: true },
    ];
  },
};

export default nextConfig;
