import { site } from "@/lib/data/site";
import { physicians } from "@/lib/data/physicians";
import type { Condition, Faq } from "@/types/content";

export function medicalBusinessSchema() {
  const openingHoursSpecification = site.hours
    .filter((h) => h.open && h.close)
    .map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${
        {
          Monday: "Monday",
          Tuesday: "Tuesday",
          Wednesday: "Wednesday",
          Thursday: "Thursday",
          Friday: "Friday",
          Saturday: "Saturday",
          Sunday: "Sunday",
        }[h.day]
      }`,
      opens: h.open,
      closes: h.close,
    }));

  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${site.url}/#business`,
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    telephone: site.phoneE164,
    email: site.email,
    medicalSpecialty: ["Hyperbaric Medicine", "Wound Care"],
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    hasMap: `https://www.google.com/maps?q=${encodeURIComponent(
      `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`,
    )}`,
    areaServed: [
      "Queens",
      "Manhattan",
      "Brooklyn",
      "New York City",
      "Long Island City",
      "Astoria",
      "Jackson Heights",
      "Forest Hills",
      "Flushing",
      "Elmhurst",
      "Woodside",
    ].map((name) => ({ "@type": "AdministrativeArea", name })),
    openingHoursSpecification,
    sameAs: Object.values(site.social),
    employee: physicians.map((p) => ({
      "@type": "Physician",
      name: p.name,
      jobTitle: p.title,
      medicalSpecialty: p.specialties,
    })),
  };
}

export function physicianSchema(p: {
  slug?: string;
  name: string;
  title: string;
  specialties: readonly string[];
  bio?: string;
  image?: string;
  education?: readonly string[];
  affiliations?: readonly string[];
  languages?: readonly string[];
  npi?: string;
  sameAs?: readonly string[];
}) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: p.name,
    jobTitle: p.title,
    medicalSpecialty: p.specialties,
    worksFor: { "@id": `${site.url}/#business` },
  };
  if (p.slug) schema["@id"] = `${site.url}/physicians/#${p.slug}`;
  if (p.bio) schema.description = p.bio;
  if (p.image) schema.image = `${site.url}${p.image}`;
  if (p.education?.length)
    schema.alumniOf = p.education.map((name) => ({
      "@type": "EducationalOrganization",
      name,
    }));
  if (p.affiliations?.length)
    schema.affiliation = p.affiliations.map((name) => ({
      "@type": "Organization",
      name,
    }));
  if (p.languages?.length) schema.knowsLanguage = p.languages;
  if (p.npi)
    schema.identifier = {
      "@type": "PropertyValue",
      propertyID: "NPI",
      value: p.npi,
    };
  if (p.sameAs?.length) schema.sameAs = p.sameAs;
  return schema;
}

export function medicalConditionSchema(c: Condition) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalCondition",
    name: c.name,
    description: c.summary,
    url: `${site.url}/condition/${c.slug}/`,
    possibleTreatment: {
      "@type": "MedicalTherapy",
      name: "Hyperbaric Oxygen Therapy",
      url: `${site.url}/treatment/`,
    },
  };
}

export function videoObjectSchema(v: {
  id: string;
  title: string;
  description: string;
  uploadDate: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: v.title,
    description: v.description,
    thumbnailUrl: [
      `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`,
      `https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg`,
    ],
    uploadDate: v.uploadDate,
    embedUrl: `https://www.youtube-nocookie.com/embed/${v.id}`,
    contentUrl: `https://www.youtube.com/watch?v=${v.id}`,
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
  };
}

export function medicalWebPageSchema(opts: {
  name: string;
  description: string;
  path: string;
  lastReviewed: string;
  reviewer: { name: string; title: string };
  citations?: { label: string; url: string }[];
}) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: opts.name,
    description: opts.description,
    url: `${site.url}${opts.path}`,
    lastReviewed: opts.lastReviewed,
    reviewedBy: {
      "@type": "Physician",
      name: opts.reviewer.name,
      jobTitle: opts.reviewer.title,
    },
    publisher: { "@id": `${site.url}/#business` },
  };
  if (opts.citations?.length)
    schema.citation = opts.citations.map((c) => ({
      "@type": "CreativeWork",
      name: c.label,
      url: c.url,
    }));
  return schema;
}

export function faqPageSchema(items: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export function breadcrumbSchema(
  crumbs: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
}
