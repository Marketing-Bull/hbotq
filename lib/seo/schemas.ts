import { site } from "@/lib/data/site";
import { physicians } from "@/lib/data/physicians";
import { testimonials } from "@/lib/data/testimonials";
import { conditions } from "@/lib/data/conditions";
import type { Condition, Faq } from "@/types/content";

/**
 * Build the LocalBusiness areaServed entry. We support the two shapes
 * schema.org recommends: a `City` (most common for a single-location clinic)
 * and a `State` for the broader catchment (we serve all of NY/NJ/CT for
 * specialty indications like radiation injury and sudden hearing loss).
 */
function areaServedEntry() {
  return [
    {
      "@type": "City",
      name: "Woodside",
      containedInPlace: {
        "@type": "State",
        name: "New York",
      },
    },
    {
      "@type": "State",
      name: "New York",
    },
    {
      "@type": "State",
      name: "New Jersey",
    },
    {
      "@type": "State",
      name: "Connecticut",
    },
  ];
}

/**
 * List the clinic's services as MedicalProcedure entries with the matching
 * `/condition/[slug]/` URL. Mirrors the user-visible conditions index and
 * surfaces each treatment in the Knowledge Panel / rich results.
 */
function availableServiceEntries() {
  return conditions.map((c) => ({
    "@type": "MedicalProcedure",
    name: c.name,
    url: `${site.url}/condition/${c.slug}/`,
    procedureType: "Hyperbaric Oxygen Therapy",
  }));
}

export function medicalBusinessSchema() {
  const count = testimonials.length;
  const avg =
    count > 0
      ? testimonials.reduce((sum, t) => sum + (t.rating ?? 0), 0) / count
      : 4.8;
  const aggregateRating =
    count > 0
      ? {
          "@type": "AggregateRating",
          // Google Rich Results requires ratingValue to be a Number,
          // not a string — use Math.round so we never emit "5.0" with a decimal.
          ratingValue: Math.round(avg * 10) / 10,
          reviewCount: count,
          bestRating: 5,
          worstRating: 1,
        }
      : undefined;

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
    logo: `${site.url}/favicon.ico`,
    image: `${site.url}/images/og/homepage.jpg`,
    telephone: site.phoneE164,
    email: site.email,
    // Pricing & payment — reinforces the TrustBar "Medicare & Major Insurers
    // Accepted" copy in machine-readable form. `priceRange` is the standard
    // LocalBusiness "$$" notation (no public price list; consultations are
    // free per `site.ctas.book`).
    priceRange: "$$",
    currenciesAccepted: "USD",
    paymentAccepted:
      "Medicare, Medicaid, Major Insurers, Self-pay, Cash, Check, Credit Card",
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
    openingHoursSpecification,
    areaServed: areaServedEntry(),
    availableService: availableServiceEntries(),
    sameAs: Object.values(site.social),
    aggregateRating,
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

export function aggregateRatingSchema() {
  const count = testimonials.length;
  if (count === 0) return null;
  const avg =
    testimonials.reduce((sum, t) => sum + (t.rating ?? 0), 0) / count;
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    // Google Rich Results requires ratingValue to be a Number, not a string.
    ratingValue: Math.round(avg * 10) / 10,
    reviewCount: count,
    bestRating: 5,
    worstRating: 1,
  };
}

export function reviewSchema(
  opts: { quote: string; author: string; conditionLabel: string; rating?: number },
) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    reviewRating: {
      "@type": "Rating",
      ratingValue: opts.rating ?? 5,
      bestRating: 5,
      worstRating: 1,
    },
    author: {
      "@type": "Person",
      name: opts.author,
    },
    reviewBody: opts.quote,
    itemReviewed: {
      "@type": "MedicalBusiness",
      name: site.legalName,
      url: site.url,
    },
  };
}
