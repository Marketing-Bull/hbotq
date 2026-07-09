import type { ConditionSlug } from "@/types/content";

export interface LpFaq {
  q: string;
  a: string;
}

export interface ConditionLp {
  slug: string;
  conditionSlug: ConditionSlug;
  /** Source tag for the consultation form — for lead attribution */
  formSource: string;
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  subheadline: string;
  heroStats: { stat: string; label: string }[];
  /** Condition-specific bullet trust signals in the left hero column */
  heroBullets: string[];
  mechanismHeading: string;
  mechanism: string;
  benefitsHeading: string;
  benefits: string[];
  testimonialId: string;
  faqs: LpFaq[];
  ctaHeading: string;
  ctaSubheading: string;
  insuranceNote: string;
  metaTitle: string;
  metaDescription: string;
}

export const conditionLps: ConditionLp[] = [
  {
    slug: "diabetic-foot-ulcers",
    conditionSlug: "diabetic-lower-extremity-wounds",
    formSource: "lp-diabetic-foot-ulcers",
    eyebrow: "Diabetic Wound Care · Woodside, Queens, NY",
    headline: "Diabetic foot ulcer not healing?",
    headlineAccent: "HBOT can help.",
    subheadline:
      "Hyperbaric oxygen therapy is an FDA-approved treatment for diabetic lower-extremity wounds that haven't responded to standard care — focused on closing the wound and saving the limb.",
    heroStats: [
      { stat: "FDA-Approved", label: "for diabetic wounds" },
      { stat: "Limb-Salvage", label: "focused program" },
      { stat: "Board-Certified", label: "wound physicians" },
      { stat: "Medicare", label: "& most insurers covered" },
    ],
    heroBullets: [
      "FDA-approved for diabetic lower-extremity wounds",
      "Targets the oxygen shortage that stalls diabetic wounds",
      "Coordinated with your podiatrist and vascular team",
      "Medicare, Medicaid & most major insurers accepted",
    ],
    mechanismHeading: "Why diabetic wounds stop healing — and how HBOT restarts them",
    mechanism:
      "Diabetes damages the small blood vessels in the feet and legs, cutting off the oxygen supply that tissue needs to repair itself. Even a minor wound can become a non-healing ulcer when oxygen can't reach it. Hyperbaric oxygen therapy dissolves oxygen directly into the blood plasma under pressure, bypassing those damaged vessels and delivering it to the wound bed — supporting new blood vessel growth, infection control, and the cellular signals that drive closure.",
    benefitsHeading: "What HBOT does for diabetic wounds",
    benefits: [
      "Delivers oxygen to tissue your blood vessels can no longer reach",
      "Stimulates new capillary growth in chronically ischemic tissue",
      "Reduces bacterial burden and infection in the wound bed",
      "Often allows closure where amputation was being considered",
      "Covered by Medicare and most insurers when medically necessary",
    ],
    testimonialId: "t-1",
    faqs: [
      {
        q: "Does my wound qualify for HBOT?",
        a: "Diabetic lower-extremity wounds that haven't healed after 30+ days of standard care — with adequate vascular flow and glycemic management in place — are the strongest indication. A free consultation with our physicians is the best way to find out.",
      },
      {
        q: "Is this covered by my insurance?",
        a: "HBOT for diabetic lower-extremity wounds is an FDA-approved indication. Medicare Part B, Medicaid, and most major commercial plans cover it when medical necessity is documented. Our team handles pre-authorization on your behalf.",
      },
      {
        q: "How many sessions will I need?",
        a: "Most diabetic wound protocols run 20–40 sessions, five days a week. Your physician sets a plan at your evaluation and reassesses partway through to confirm the wound is responding.",
      },
      {
        q: "Does it hurt?",
        a: "No. You breathe pure oxygen inside a comfortable hard-shell chamber for about 90 minutes. The only sensation is mild ear pressure during compression — similar to an airplane descent. Most patients read or nap.",
      },
      {
        q: "Do I need a referral?",
        a: "No referral is needed for a free consultation. For insurance coverage, we'll coordinate with your podiatrist or primary care physician for the documentation.",
      },
    ],
    ctaHeading: "Get an honest assessment of your wound",
    ctaSubheading:
      "Free consultation with our wound-care team. We'll review your situation and tell you directly whether HBOT can help — and handle the insurance paperwork if it can.",
    insuranceNote:
      "HBOT for diabetic lower-extremity wounds is FDA-approved and typically covered by Medicare, Medicaid, and most major insurers. We handle pre-authorization.",
    metaTitle: "HBOT for Diabetic Foot Ulcers in Queens, NY | HBOTQ",
    metaDescription:
      "Hyperbaric oxygen therapy for diabetic foot ulcers and lower-extremity wounds in Woodside, Queens. FDA-approved, Medicare covered, limb-salvage focused. Free consultation.",
  },
  {
    slug: "non-healing-wounds",
    conditionSlug: "non-healing-wounds",
    formSource: "lp-non-healing-wounds",
    eyebrow: "Wound Care · Woodside, Queens, NY",
    headline: "Wound that won't close after weeks of treatment?",
    headlineAccent: "HBOT can help.",
    subheadline:
      "When a wound has stalled for 30+ days despite standard care, oxygen delivery is often the missing piece. Hyperbaric oxygen therapy is an FDA-approved treatment for non-healing wounds — delivered by physician-led wound specialists in Queens.",
    heroStats: [
      { stat: "FDA-Approved", label: "for non-healing wounds" },
      { stat: "Hard-Shell", label: "medical-grade chambers" },
      { stat: "Board-Certified", label: "wound physicians" },
      { stat: "Medicare", label: "& most insurers covered" },
    ],
    heroBullets: [
      "FDA-approved for chronic non-healing wounds",
      "Oxygen delivered directly to oxygen-starved tissue",
      "Wound debridement and dressing care also available",
      "Medicare, Medicaid & most major insurers accepted",
    ],
    mechanismHeading: "Why some wounds stall — and what HBOT does about it",
    mechanism:
      "A wound that won't close after 30 days isn't just slow — it's typically stuck because the surrounding tissue is starved of oxygen. Compromised blood vessels can't deliver what the wound needs: oxygen for fibroblasts to build collagen, for new capillaries to grow, for white cells to fight infection. Inside the hyperbaric chamber, oxygen dissolves directly into the plasma under pressure, reaching tissue that blood cells can no longer feed. That oxygen restarts the biological processes the wound needs to close.",
    benefitsHeading: "What HBOT does for chronic wounds",
    benefits: [
      "Restores oxygen to tissue that compromised blood vessels can't reach",
      "Stimulates new blood vessel formation (angiogenesis)",
      "Supports collagen synthesis and wound edge contraction",
      "Reduces edema and bacterial load in the wound",
      "Often allows closure or limb salvage where amputation was considered",
    ],
    testimonialId: "t-4",
    faqs: [
      {
        q: "What types of wounds respond to HBOT?",
        a: "Surgical wounds that haven't closed as expected, venous and arterial ulcers, pressure injuries, traumatic wounds, and post-operative complications. The wounds that respond best are those where oxygen delivery — not the biology of healing — is the rate-limiting factor.",
      },
      {
        q: "Is it covered by insurance?",
        a: "HBOT for non-healing hypoxic wounds is an FDA-approved indication. Medicare Part B, Medicaid, and most major commercial insurers cover it when medical necessity is documented. We handle the pre-authorization process.",
      },
      {
        q: "How many sessions will I need?",
        a: "Most wound protocols run 20–40 sessions, five days a week. Your physician evaluates progress throughout and adjusts the plan. Wounds rarely show visible change in the first week — most patients see meaningful progress by treatments 20–30.",
      },
      {
        q: "Do I need to stop my other wound care?",
        a: "No. HBOT works best alongside your existing wound-care plan — debridement, dressing changes, offloading. We coordinate with your wound team so everything works together.",
      },
      {
        q: "Do I need a referral?",
        a: "No referral is needed for a free consultation. For insurance-covered care we coordinate with your referring physician.",
      },
    ],
    ctaHeading: "Find out if your wound qualifies for HBOT",
    ctaSubheading:
      "Free consultation with our wound-care physicians. We'll review your wound history and tell you honestly whether HBOT can help — and manage insurance if it can.",
    insuranceNote:
      "HBOT for non-healing wounds is FDA-approved and typically covered by Medicare, Medicaid, and most major insurers. We handle pre-authorization.",
    metaTitle: "HBOT for Non-Healing Wounds in Queens, NY | HBOTQ",
    metaDescription:
      "Hyperbaric oxygen therapy for chronic non-healing wounds in Woodside, Queens. FDA-approved, Medicare covered, physician-led wound care. Free consultation.",
  },
  {
    slug: "sudden-hearing-loss",
    conditionSlug: "sudden-hearing-loss",
    formSource: "lp-sudden-hearing-loss",
    eyebrow: "Sudden Hearing Loss · Woodside, Queens, NY",
    headline: "Sudden hearing loss in one ear?",
    headlineAccent: "Call us today.",
    subheadline:
      "Sudden sensorineural hearing loss is a medical emergency. Hyperbaric oxygen therapy started within two weeks of onset can meaningfully improve recovery. Don't wait — the window closes fast.",
    heroStats: [
      { stat: "FDA-Approved", label: "for sudden hearing loss" },
      { stat: "Act Within", label: "14 days for best results" },
      { stat: "Board-Certified", label: "physician supervision" },
      { stat: "Fast", label: "scheduling, no waitlist" },
    ],
    heroBullets: [
      "FDA-approved for sudden sensorineural hearing loss",
      "Best evidence when started within 14 days of onset",
      "We coordinate quickly with your ENT",
      "Don't wait — the treatment window closes",
    ],
    mechanismHeading: "Why timing is critical — and how HBOT helps",
    mechanism:
      "The inner ear has one of the highest oxygen demands in the body and is supplied by tiny end-arteries with no backup circulation. When blood flow to those hair cells is interrupted, hearing can vanish within hours. Hyperbaric oxygen therapy dissolves far more oxygen into the blood plasma under pressure, reaching the oxygen-starved inner-ear tissue that normal circulation can no longer feed. The earlier treatment starts, the better the chance of recovery — evidence is strongest for HBOT started within 14 days of onset.",
    benefitsHeading: "What HBOT does for sudden hearing loss",
    benefits: [
      "Significantly increases oxygen delivery to inner-ear tissue",
      "Best evidence when started within 14 days of symptom onset",
      "Complements ENT care and steroid therapy",
      "FDA-approved indication — typically covered by insurance",
      "We fast-track scheduling for hearing-loss patients",
    ],
    testimonialId: "t-2",
    faqs: [
      {
        q: "How quickly do I need to start treatment?",
        a: "As soon as possible. The evidence for HBOT in sudden hearing loss is strongest when treatment starts within 14 days of onset — and outcomes decline meaningfully after that. Call us today; we prioritize scheduling for sudden hearing loss patients.",
      },
      {
        q: "Does this replace the steroids my ENT prescribed?",
        a: "No — HBOT works alongside steroid therapy, not instead of it. We coordinate quickly with your ENT so the two treatments work together.",
      },
      {
        q: "Is it covered by insurance?",
        a: "Sudden sensorineural hearing loss is an FDA-approved indication for HBOT. Medicare, Medicaid, and most major commercial insurers typically cover treatment. We handle pre-authorization.",
      },
      {
        q: "How many sessions?",
        a: "A standard protocol is typically 10–20 sessions. Your physician will reassess hearing partway through to confirm response and decide on the full course.",
      },
      {
        q: "Do I need a referral from my ENT?",
        a: "No referral is needed to consult with us. We coordinate with your ENT for the documentation and combined treatment plan.",
      },
    ],
    ctaHeading: "Don't wait — call or book now",
    ctaSubheading:
      "The treatment window for sudden hearing loss closes within two weeks. Our team will respond same business day and fast-track your evaluation.",
    insuranceNote:
      "Sudden sensorineural hearing loss is an FDA-approved indication. Medicare, Medicaid, and most major insurers typically cover HBOT. We handle pre-authorization.",
    metaTitle: "HBOT for Sudden Hearing Loss in Queens, NY | HBOTQ",
    metaDescription:
      "Sudden sensorineural hearing loss in one ear? Start HBOT within 14 days for the best chance of recovery. HBOTQ Queens — FDA-approved, fast scheduling, insurance handled.",
  },
  {
    slug: "radiation-injury",
    conditionSlug: "radiation-tissue-damage",
    formSource: "lp-radiation-injury",
    eyebrow: "Radiation Injury Care · Woodside, Queens, NY",
    headline: "Dealing with tissue damage after radiation treatment?",
    headlineAccent: "HBOT is FDA-approved for that.",
    subheadline:
      "Late-effect radiation injuries — soft tissue radionecrosis, osteoradionecrosis, radiation cystitis — are FDA-approved indications for hyperbaric oxygen therapy. We work closely with oncology and surgical teams across NYC.",
    heroStats: [
      { stat: "FDA-Approved", label: "for radiation injury" },
      { stat: "Oncology", label: "team coordination" },
      { stat: "Board-Certified", label: "physician supervision" },
      { stat: "Medicare", label: "& most insurers covered" },
    ],
    heroBullets: [
      "FDA-approved for late-effect radiation tissue injury",
      "Osteoradionecrosis, soft tissue radionecrosis, cystitis & more",
      "Close coordination with your oncology and surgical teams",
      "Medicare, Medicaid & most major insurers accepted",
    ],
    mechanismHeading: "How radiation damages tissue long-term — and how HBOT helps",
    mechanism:
      "Radiation therapy can permanently reduce the blood supply and oxygen tension in treated tissue — sometimes becoming apparent months or years after treatment ends. When that damaged tissue is then injured, operated on, or subjected to dental procedures, it heals poorly or breaks down entirely. Hyperbaric oxygen therapy stimulates new blood vessel formation in irradiated tissue, builds up capillary density, and restores the oxygen levels that allow tissue to repair and tolerate further intervention.",
    benefitsHeading: "What HBOT does for radiation injury",
    benefits: [
      "Restores blood supply and oxygen to chronically irradiated tissue",
      "Enables tissue to heal and tolerate surgery (including dental extractions)",
      "Can resolve hemorrhagic radiation cystitis when other treatments fail",
      "Reduces breakdown and necrosis in previously irradiated areas",
      "Covered by Medicare and most insurers for FDA-approved indications",
    ],
    testimonialId: "t-3",
    faqs: [
      {
        q: "Which radiation injuries does HBOT treat?",
        a: "FDA-approved indications include osteoradionecrosis of the jaw (ORN), soft tissue radionecrosis, hemorrhagic radiation cystitis, radiation proctitis, and pre-operative protocols before surgery or dental procedures in irradiated tissue.",
      },
      {
        q: "How long after radiation does HBOT work?",
        a: "HBOT is used for late-effect injuries — those developing months or years after radiation ends. There's no absolute time cutoff, but earlier intervention typically produces better outcomes. A physician evaluation determines whether your specific injury is likely to respond.",
      },
      {
        q: "Is it covered by insurance?",
        a: "Radiation tissue damage is an FDA-approved indication. Medicare, Medicaid, and most major commercial insurers cover HBOT for these conditions when medical necessity is documented. We handle pre-authorization and coordinate with your oncology team.",
      },
      {
        q: "How many sessions will I need?",
        a: "Most radiation injury protocols run 30–40 sessions. Severe osteoradionecrosis may require up to 60. We coordinate timing with your oncology and surgical teams.",
      },
      {
        q: "Do I need my oncologist's approval?",
        a: "No referral is needed for a free consultation. For covered care, we coordinate closely with your oncologist and any surgical team involved in your treatment.",
      },
    ],
    ctaHeading: "Talk to our team about radiation injury",
    ctaSubheading:
      "Free consultation — we'll review your history and tell you honestly whether HBOT can help. We coordinate with your oncology team and handle insurance.",
    insuranceNote:
      "Radiation tissue damage is FDA-approved for HBOT and typically covered by Medicare, Medicaid, and most major insurers. We handle coordination and pre-authorization.",
    metaTitle: "HBOT for Radiation Tissue Damage in Queens, NY | HBOTQ",
    metaDescription:
      "Hyperbaric oxygen therapy for radiation injuries — osteoradionecrosis, soft tissue radionecrosis, radiation cystitis — in Woodside, Queens. FDA-approved, oncology-coordinated. Free consultation.",
  },
];

export function getConditionLp(slug: string): ConditionLp | undefined {
  return conditionLps.find((l) => l.slug === slug);
}
