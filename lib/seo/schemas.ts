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

export function physicianSchema(opts: {
  name: string;
  title: string;
  specialties: readonly string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: opts.name,
    jobTitle: opts.title,
    medicalSpecialty: opts.specialties,
    worksFor: { "@id": `${site.url}/#business` },
  };
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
