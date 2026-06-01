import type { Metadata } from "next";
import { site } from "@/lib/data/site";

type BuildArgs = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
  geo?: {
    region?: string;
    placename?: string;
  };
};

export function buildMetadata({
  title,
  description,
  path,
  image,
  noIndex,
  geo,
}: BuildArgs): Metadata {
  const url = `${site.url}${path}`;
  const ogImage = image ?? "/images/og/default.jpg";
  const fullTitle = title.includes("HBOTQ") ? title : `${title} | HBOTQ`;

  const other: Record<string, string | number | (string | number)[]> = {};
  if (geo?.region) other["geo.region"] = geo.region;
  if (geo?.placename) other["geo.placename"] = geo.placename;

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    other,
  };
}
