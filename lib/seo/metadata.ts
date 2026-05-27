import type { Metadata } from "next";
import { site } from "@/lib/data/site";

type BuildArgs = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  image,
  noIndex,
}: BuildArgs): Metadata {
  const url = `${site.url}${path}`;
  const ogImage = image ?? "/images/og/default.jpg";
  const fullTitle = title.includes("HBOTQ") ? title : `${title} | HBOTQ`;
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
  };
}
