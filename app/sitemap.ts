import type { MetadataRoute } from "next";
import { site } from "@/lib/data/site";
import { conditions } from "@/lib/data/conditions";

const STATIC_ROUTES: { path: string; priority: number }[] = [
  { path: "/", priority: 1.0 },
  { path: "/treatment/", priority: 0.9 },
  { path: "/conditions/", priority: 0.9 },
  { path: "/physicians/", priority: 0.7 },
  { path: "/faqs/", priority: 0.7 },
  { path: "/contact-us/", priority: 0.8 },
  { path: "/hyperbaric-therapy/", priority: 0.9 },
  { path: "/privacy-policy/", priority: 0.3 },
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
  return [...staticEntries, ...conditionEntries];
}
