import type { MetadataRoute } from "next";
import { site } from "@/lib/data/site";
import { conditions } from "@/lib/data/conditions";

type RouteConfig = {
  path: string;
  priority: number;
  image?: string;
};

const STATIC_ROUTES: RouteConfig[] = [
  { path: "/", priority: 1.0, image: "/images/og/homepage.jpg" },
  { path: "/treatment/", priority: 0.9, image: "/images/og/treatment.jpg" },
  { path: "/conditions/", priority: 0.9, image: "/images/og/conditions.jpg" },
  {
    path: "/physicians/",
    priority: 0.7,
    image: "/images/og/physicians.jpg",
  },
  { path: "/faqs/", priority: 0.7 },
  { path: "/contact-us/", priority: 0.8, image: "/images/og/contact.jpg" },
  {
    path: "/hyperbaric-therapy/",
    priority: 0.9,
    image: "/images/og/treatment.jpg",
  },
];

function toAbsoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap[number][] = STATIC_ROUTES.map(
    (r) => ({
      url: toAbsoluteUrl(r.path),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: r.priority,
      ...(r.image ? { images: [toAbsoluteUrl(r.image)] } : {}),
    }),
  );

  const conditionEntries: MetadataRoute.Sitemap[number][] = conditions.map(
    (c) => ({
      url: toAbsoluteUrl(`/condition/${c.slug}/`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
      images: [toAbsoluteUrl(c.heroImage)],
    }),
  );

  return [...staticEntries, ...conditionEntries];
}
