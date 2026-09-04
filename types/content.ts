export type ConditionSlug =
  | "chronic-pain"
  | "diabetic-lower-extremity-wounds"
  | "non-healing-wounds"
  | "post-covid"
  | "radiation-tissue-damage"
  | "refractory-osteomyelitis"
  | "severe-anemia"
  | "sudden-hearing-loss";

export interface ConditionSection {
  heading: string;
  body: string;
  bullets?: string[];
}

export interface Condition {
  slug: ConditionSlug;
  name: string;
  shortName: string;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  fdaStatus: "on-label" | "off-label";
  heroImage: string;
  howHbotHelps: string;
  sections: ConditionSection[];
  benefits: string[];
  faqIds?: string[];
  relatedSlugs: ConditionSlug[];
}

/**
 * A card in the conditions grid. Most entries are clinical condition pages,
 * but the grid also surfaces the wellness hub — off-label, self-pay uses that
 * live at /wellness/ rather than under /condition/.
 */
export interface ConditionListing {
  /** Stable React key — the condition slug, or "wellness" for the hub card. */
  key: string;
  name: string;
  summary: string;
  href: string;
  status: "on-label" | "off-label" | "wellness";
}

export interface Article {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  datePublished: string;
  dateModified: string;
  authorSlug: string;
  readMinutes: number;
  keyTakeaways: string[];
  sections: ConditionSection[];
  relatedConditionSlugs?: ConditionSlug[];
}

export interface WellnessUse {
  slug: string;
  name: string;
  shortName: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  intro: string;
  sections: ConditionSection[];
  benefits: string[];
  honestNote: string;
  tiktokIds: string[];
}

export interface Location {
  slug: string;
  area: string;
  shortName: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  intro: string;
  gettingHere: {
    transit: string;
    driving: string;
    parking: string;
  };
  neighborhoods: string[];
  whyTravel: string;
}

export interface Faq {
  id: string;
  category: "general" | "treatment" | "conditions" | "logistics";
  question: string;
  answer: string;
}

export interface Physician {
  slug: string;
  name: string;
  title: string;
  credentials: string[];
  specialties: string[];
  /** Short bio used on cards and meta descriptions. */
  bio: string;
  /** Longer, multi-paragraph bio for the detail page. */
  bioLong?: string[];
  /** Quick-scan credential highlights. */
  highlights?: string[];
  image?: string;
  education?: string[];
  affiliations?: string[];
  languages?: string[];
  /** Public NPI number — only populate if verified via the NPPES registry. */
  npi?: string;
  /** Verified external profile URLs (Healthgrades, NPI, LinkedIn, etc.). */
  sameAs?: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  conditionLabel: string;
  rating?: number;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: "oxygen" | "healing" | "energy" | "immune" | "brain" | "recovery";
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}
