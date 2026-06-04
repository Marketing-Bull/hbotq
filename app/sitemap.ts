import type { MetadataRoute } from "next";
import { site } from "@/lib/data/site";
import { conditions } from "@/lib/data/conditions";
import { locations } from "@/lib/data/locations";
import { wellnessUses } from "@/lib/data/wellness";
import { articles } from "@/lib/data/articles";
import { physicians } from "@/lib/data/physicians";
import { conditionLps } from "@/lib/data/lps";

const STATIC_ROUTES: { path: string; priority: number }[] = [
  { path: "/", priority: 1.0 },
  { path: "/treatment/", priority: 0.9 },
  { path: "/conditions/", priority: 0.9 },
  { path: "/locations/", priority: 0.8 },
  { path: "/wellness/", priority: 0.7 },
  { path: "/resources/", priority: 0.7 },
  { path: "/videos/", priority: 0.6 },
  { path: "/physicians/", priority: 0.7 },
  { path: "/faqs/", priority: 0.7 },
  { path: "/contact-us/", priority: 0.8 },
  { path: "/hyperbaric-therapy/", priority: 0.9 },
  { path: "/privacy-policy/", priority: 0.3 },
  { path: "/terms-of-service/", priority: 0.3 },
  { path: "/accessibility/", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticEntries = STATIC_ROUTES.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: r.priority,
  }));
  const conditionEntries = conditions.map((c) => ({
    url: `${site.url}/condition/${c.slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));
  const locationEntries = locations.map((l) => ({
    url: `${site.url}/locations/${l.slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));
  const wellnessEntries = wellnessUses.map((w) => ({
    url: `${site.url}/wellness/${w.slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  const articleEntries = articles.map((a) => ({
    url: `${site.url}/resources/${a.slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  const physicianEntries = physicians.map((p) => ({
    url: `${site.url}/physicians/${p.slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  // lp/ pages are intentionally excluded from the sitemap —
  // they're ad landing pages and should not compete with condition pages in organic.
  void conditionLps; // import kept for type safety; not used in sitemap

  return [
    ...staticEntries,
    ...conditionEntries,
    ...locationEntries,
    ...wellnessEntries,
    ...articleEntries,
    ...physicianEntries,
  ];
}
