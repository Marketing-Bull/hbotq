import type { WellnessUse } from "@/types/content";

/**
 * Wellness / lifestyle uses of HBOT — distinct from the clinical, FDA-approved
 * condition pages. These are off-label wellness uses; copy is deliberately
 * honest about the limits of the evidence.
 */
export const wellnessUses: WellnessUse[] = [
  {
    slug: "athletic-recovery",
    name: "Athletic Recovery & Performance",
    shortName: "Athletic Recovery",
    metaTitle: "HBOT for Athletic Recovery & Performance | Queens, NY",
    metaDescription:
      "Athletes use hyperbaric oxygen therapy to support recovery between training and competition. A wellness use — not an FDA-approved treatment. HBOTQ, Woodside, Queens.",
    summary:
      "Active people use hyperbaric oxygen to support recovery between hard training and competition. This is a wellness use — not an FDA-approved medical treatment — and we'll always be honest about what the evidence does and doesn't show.",
    intro:
      "Inside the chamber, you breathe 100% oxygen under pressure, which dissolves far more oxygen into your plasma than normal. Athletes and active people use that oxygen boost to support recovery from demanding training blocks, soft-tissue strain, and travel fatigue. It's a recovery tool, not a shortcut — and it works best alongside good sleep, nutrition, and training.",
    sections: [
      {
        heading: "How active people use HBOT",
        body: "Most people in this group are looking to bounce back faster between sessions, not to treat an injury. We see weekend athletes, gym regulars, and competitors who want to add an oxygen-focused recovery session to their routine.",
        bullets: [
          "Recovery between intense training sessions",
          "Soreness and soft-tissue fatigue after hard efforts",
          "Recovery around competition and travel",
        ],
      },
      {
        heading: "What the evidence shows — honestly",
        body: "Research on HBOT for athletic recovery and performance is still emerging. Some studies and a lot of athlete experience point to a recovery benefit, but HBOT is not a proven performance enhancer and is not FDA-approved for this use. We'll tell you plainly what to expect before you book.",
      },
    ],
    benefits: [
      "May support faster recovery between training sessions",
      "Boosts oxygen delivery to working tissue",
      "A non-pharmacologic addition to your recovery routine",
      "Evaluated honestly — no performance guarantees",
    ],
    honestNote:
      "Athletic recovery and performance are wellness uses of HBOT, not FDA-approved medical indications, and the evidence is still developing. This is provided on a self-pay basis and isn't a substitute for medical care.",
    tiktokIds: [
      "7130052952596679979",
      "7122541271670983978",
      "7111961690706693422",
    ],
  },
  {
    slug: "healthy-aging",
    name: "Healthy Aging & Skin",
    shortName: "Healthy Aging",
    metaTitle: "HBOT for Healthy Aging & Skin | Queens, NY",
    metaDescription:
      "Hyperbaric oxygen therapy as part of a healthy-aging and skin-wellness routine in Woodside, Queens. A wellness use — not an FDA-approved treatment. Honest, physician-supervised.",
    summary:
      "Some people add hyperbaric oxygen to a healthy-aging and skin-care routine. This is a wellness use — not an FDA-approved medical treatment — and we keep our claims grounded in what the evidence actually supports.",
    intro:
      "Oxygen plays a role in the body's repair and collagen processes, which is why hyperbaric oxygen has drawn interest as part of a healthy-aging routine. By saturating plasma with oxygen, HBOT supports the tissue-level activity behind skin renewal — though it's one piece of a routine, not a replacement for sun protection, sleep, and good skincare.",
    sections: [
      {
        heading: "Why oxygen and aging are linked",
        body: "As we age, blood flow and oxygen delivery to skin and other tissue decline, and repair slows. The idea behind HBOT for healthy aging is to temporarily raise tissue oxygen to support the body's own renewal processes.",
        bullets: [
          "Supporting skin renewal and collagen activity",
          "An oxygen-focused complement to a skincare routine",
          "Part of a broader healthy-aging approach",
        ],
      },
      {
        heading: "What the evidence shows — honestly",
        body: "Early research into HBOT and aging biology is promising but limited, and HBOT is not FDA-approved as an anti-aging or cosmetic treatment. We won't promise to reverse aging — we'll explain what's known and let you decide.",
      },
    ],
    benefits: [
      "May support the skin's natural renewal processes",
      "Raises oxygen delivery to skin and connective tissue",
      "A non-invasive complement to your routine",
      "Honest expectations — no anti-aging guarantees",
    ],
    honestNote:
      "Healthy aging and skin wellness are off-label uses of HBOT, not FDA-approved indications, and the supporting evidence is still emerging. This is provided on a self-pay basis and isn't a medical or cosmetic treatment for any condition.",
    tiktokIds: ["7130038888927644971", "7113000676904537390"],
  },
  {
    slug: "energy-wellness",
    name: "Energy & Everyday Wellness",
    shortName: "Energy & Wellness",
    metaTitle: "HBOT for Energy & Everyday Wellness | Queens, NY",
    metaDescription:
      "Add hyperbaric oxygen therapy to your wellness routine for an oxygen boost in Woodside, Queens. A wellness use — not an FDA-approved treatment. Honest, physician-supervised.",
    summary:
      "Some people add hyperbaric oxygen to their wellness routine for an oxygen boost and a sense of restoration. This is a wellness use — not an FDA-approved medical treatment — and we keep our claims honest.",
    intro:
      "A hyperbaric session is a quiet 90 minutes breathing pure oxygen under pressure. People fold it into a wellness routine the way they would a sauna or recovery practice — for an oxygen boost and time to reset. It isn't a treatment for any disease, and we're upfront about that.",
    sections: [
      {
        heading: "How people use HBOT for wellness",
        body: "This group isn't treating a diagnosis — they're investing in everyday wellness. A session is calm, comfortable, and easy to add to a routine alongside exercise, sleep, and good nutrition.",
        bullets: [
          "An oxygen-focused addition to a wellness routine",
          "Time to rest and reset, comfortably",
          "Often paired with healthy sleep and exercise habits",
        ],
      },
      {
        heading: "What the evidence shows — honestly",
        body: "General-wellness use of HBOT is not an FDA-approved indication, and benefits like energy and focus are largely based on personal experience rather than strong clinical proof. We'll always separate what's established from what's anecdotal.",
      },
    ],
    benefits: [
      "Raises oxygen delivery throughout the body",
      "A calm, non-pharmacologic wellness practice",
      "Easy to add to an existing routine",
      "Honest framing — wellness, not a medical claim",
    ],
    honestNote:
      "Everyday wellness and energy are off-label uses of HBOT, not FDA-approved indications, and are not a treatment for any medical condition. This is provided on a self-pay basis. If you have a medical concern, please see a physician.",
    tiktokIds: [
      "7111962322524097838",
      "7113988887965502766",
      "7130045405177367851",
      "7130045011277794606",
      "7130046386703224110",
    ],
  },
];

export function getWellnessUse(slug: string): WellnessUse | undefined {
  return wellnessUses.find((w) => w.slug === slug);
}
