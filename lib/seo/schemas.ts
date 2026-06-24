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
    // Inline `employee` Physician entries appear in the MedicalBusiness
    // block on every page (19 blocks). They MUST carry a `worksFor: { @id }`
    // back-link to the business entity so Google can resolve the inverse
    // relationship (the standalone Physician blocks on /physicians/ already
    // carry this — the inline entries were missing it).
    employee: physicians.map((p) => ({
      "@type": "Physician",
      name: p.name,
      jobTitle: p.title,
      medicalSpecialty: p.specialties,
      worksFor: { "@id": `${site.url}/#business` },
    })),
  };
}

/**
 * Site-wide WebSite schema with a sitelinks SearchAction. Adding this gives
 * Google the data it needs to surface the "sitelinks search box" for the
 * site (the search bar that appears under the first organic result for
 * branded queries). The action's `target` points to the homepage with a
 * `?s={search_term_string}` query param — currently no client-side search
 * UI exists, so the link is informational and tells Google the intent
 * pattern. If a real `/search/` route is added later, swap the target.
 */
export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    alternateName: site.legalName,
    url: site.url,
    inLanguage: "en-US",
    publisher: { "@id": `${site.url}/#business` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${site.url}/?s={search_term_string}`,
      },
      // `query-input` is required by Google's docs for the SearchAction to
      // be eligible for the sitelinks search box. The placeholder name on
      // the left of the `=` must match the placeholder in urlTemplate.
      "query-input": "required name=search_term_string",
    },
  };
}

export function physicianSchema(opts: {
  name: string;
  title: string;
  specialties: readonly string[];
  /**
   * Absolute path (under `public/`) to the physician's headshot. The
   * validator emits a warning when this is missing, but it's not strictly
   * required by schema.org. We surface it because Google's rich-results
   * docs specifically call out `image` as a recommended field on
   * `Physician` entities and the data is already in `lib/data/physicians.ts`.
   */
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: opts.name,
    jobTitle: opts.title,
    medicalSpecialty: opts.specialties,
    worksFor: { "@id": `${site.url}/#business` },
    ...(opts.image
      ? { image: `${site.url}${opts.image.startsWith("/") ? opts.image : `/${opts.image}`}` }
      : {}),
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
    // Cross-link to the same `#business` entity the MedicalBusiness,
    // WebSite, and Physician blocks all use — completes the inverse-
    // link loop so the Knowledge Graph can resolve each Review back
    // to the practice it describes. Mirrors the S-06 fix (Physician
    // `worksFor: { @id: #business }`) and S-05 (`availableService`
    // already uses absolute URLs into the same graph).
    itemReviewed: {
      "@type": "MedicalBusiness",
      "@id": `${site.url}/#business`,
      name: site.legalName,
      url: site.url,
    },
  };
}
