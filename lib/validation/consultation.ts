import { z } from "zod";

const CONDITION_VALUES = [
  "chronic-pain",
  "diabetic-lower-extremity-wounds",
  "non-healing-wounds",
  "post-covid",
  "radiation-tissue-damage",
  "refractory-osteomyelitis",
  "severe-anemia",
  "sudden-hearing-loss",
  "wellness",
  "other",
  "unsure",
] as const;

const PHONE_REGEX = /^[+()\-\s.\d]{7,20}$/;

// First-touch campaign attribution, captured client-side and passed through to
// the CRM and the lead email. Every field is optional: direct visitors have
// none of it, and a lead must never be rejected for missing marketing metadata.
const ATTRIBUTION_MAX = 200;
const attributionField = z.string().trim().max(ATTRIBUTION_MAX).optional();

export const attributionSchema = z
  .object({
    utm_source: attributionField,
    utm_medium: attributionField,
    utm_campaign: attributionField,
    utm_term: attributionField,
    utm_content: attributionField,
    gclid: attributionField,
    gbraid: attributionField,
    wbraid: attributionField,
    fbclid: attributionField,
    msclkid: attributionField,
    landing_page: attributionField,
    referrer: attributionField,
    first_seen_at: attributionField,
  })
  .optional();

export const consultationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(120, "Name is too long"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email"),
  phone: z
    .string()
    .trim()
    .regex(PHONE_REGEX, "Please enter a valid phone number"),
  condition: z.enum(CONDITION_VALUES, {
    message: "Please select a condition",
  }),
  preferredContact: z.enum(["phone", "email"]),
  message: z.string().trim().max(2000, "Message is too long"),
  consent: z.literal(true, {
    message: "Please confirm you'd like us to contact you",
  }),
  source: z.string().trim().max(200),
  website: z.string().max(200), // honeypot — checked in handler, not by Zod
  attribution: attributionSchema,
});

export type ConsultationInput = z.infer<typeof consultationSchema>;

export const CONDITION_OPTIONS: { value: (typeof CONDITION_VALUES)[number]; label: string }[] = [
  { value: "non-healing-wounds", label: "Non-Healing Wounds" },
  {
    value: "diabetic-lower-extremity-wounds",
    label: "Diabetic Lower-Extremity Wounds",
  },
  { value: "radiation-tissue-damage", label: "Radiation Tissue Damage" },
  {
    value: "refractory-osteomyelitis",
    label: "Refractory Osteomyelitis (Bone Infection)",
  },
  { value: "severe-anemia", label: "Severe Anemia / Bridge Therapy" },
  { value: "sudden-hearing-loss", label: "Sudden Hearing Loss" },
  { value: "post-covid", label: "Post-COVID" },
  { value: "chronic-pain", label: "Chronic Pain" },
  { value: "wellness", label: "Wellness & Recovery" },
  { value: "other", label: "Other / Not Listed" },
  { value: "unsure", label: "I'm Not Sure Yet" },
];
