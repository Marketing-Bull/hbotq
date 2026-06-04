import type { ConditionSlug } from "@/types/content";

export interface Citation {
  label: string;
  url: string;
}

/**
 * Authoritative sources cited on condition pages (NIH/PMC, StatPearls, Nature,
 * UHMS). Citing primary sources strengthens E-E-A-T and makes the pages more
 * "quotable" for AI answer engines.
 */
export const conditionCitations: Partial<Record<ConditionSlug, Citation[]>> = {
  "non-healing-wounds": [
    {
      label: "Hyperbaric oxygen and wound healing — National Institutes of Health (PMC)",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3495382/",
    },
    {
      label: "Hyperbaric Therapy for Wound Healing — StatPearls, NCBI",
      url: "https://www.ncbi.nlm.nih.gov/books/NBK459172/",
    },
  ],
  "diabetic-lower-extremity-wounds": [
    {
      label: "HBOT for diabetic foot ulcers: a meta-analysis — NIH (PMC)",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10965274/",
    },
    {
      label: "Hyperbaric Treatment of Diabetic Foot Ulcer — StatPearls, NCBI",
      url: "https://www.ncbi.nlm.nih.gov/books/NBK430783/",
    },
  ],
  "radiation-tissue-damage": [
    {
      label: "HBOT for late radiation tissue injury — NIH (PMC)",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6457778/",
    },
    {
      label:
        "Delayed Radiation Injury (Soft Tissue & Bony Necrosis) — Undersea & Hyperbaric Medical Society",
      url: "https://www.uhms.org/11-delayed-radiation-injury-soft-tissue-and-bony-necrosis.html",
    },
  ],
  "sudden-hearing-loss": [
    {
      label:
        "HBOT for idiopathic sudden sensorineural hearing loss — Scientific Reports (Nature)",
      url: "https://www.nature.com/articles/s41598-024-53978-1",
    },
    {
      label: "HBOT in Sudden Sensorineural Hearing Loss — NIH (PMC)",
      url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9960654/",
    },
  ],
  "post-covid": [
    {
      label: "HBOT for long COVID: a prospective registry — Scientific Reports (Nature)",
      url: "https://www.nature.com/articles/s41598-025-11539-0",
    },
  ],
  "chronic-pain": [
    {
      label: "HBOT for the Treatment of Chronic Pain — NCBI Bookshelf",
      url: "https://www.ncbi.nlm.nih.gov/books/NBK537956/",
    },
    {
      label: "Hyperbaric Oxygen Therapy: A New Treatment for Chronic Pain? — PubMed",
      url: "https://pubmed.ncbi.nlm.nih.gov/25988526/",
    },
  ],
};

export function getCitations(slug: string): Citation[] {
  return conditionCitations[slug as ConditionSlug] ?? [];
}
