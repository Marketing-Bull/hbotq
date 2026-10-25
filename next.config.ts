import type { NextConfig } from "next";
import { APEX_HOST, fileRedirects, pageRedirects } from "./lib/redirects";

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
    // Skip the bare domain: proxy.ts sends it to www in a single hop, with the
    // legacy mapping already applied. Without this, `hbotq.com/hyperbaric/`
    // would redirect to `hbotq.com/lp/...` first and to www second.
    const missing = [{ type: "host" as const, value: APEX_HOST }];
    return [
      ...Object.entries({ ...fileRedirects, ...pageRedirects }).map(
        ([source, destination]) => ({
          source,
          destination,
          permanent: true,
          missing,
        }),
      ),
    ];
  },
};

export default nextConfig;
