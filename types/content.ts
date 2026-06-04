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
  bio: string;
  image?: string;
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
