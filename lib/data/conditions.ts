import type { Condition, ConditionListing } from "@/types/content";

export const conditions: Condition[] = [
  {
    slug: "non-healing-wounds",
    name: "Non-Healing Wounds",
    shortName: "Non-Healing Wounds",
    summary:
      "Wounds that haven't closed after 30 days of standard care often respond to hyperbaric oxygen therapy when oxygen delivery to the tissue is the missing factor.",
    metaTitle: "Hyperbaric Oxygen Therapy for Non-Healing Wounds | Queens, NY",
    metaDescription:
      "HBOT in Woodside, Queens for chronic non-healing wounds — hyperbaric oxygen, debridement and advanced wound care for patients across NYC.",
    fdaStatus: "on-label",
    heroImage: "/images/conditions/safe-effective.webp",
    howHbotHelps:
      "Chronic wounds stall when the surrounding tissue is starved of oxygen. Inside the hyperbaric chamber, you breathe 100% oxygen at increased atmospheric pressure, which dissolves significantly more oxygen into your plasma than breathing air at sea level. That additional oxygen reaches tissue that compromised blood vessels can no longer feed, supporting fibroblast activity, new capillary growth, collagen synthesis, and infection control — the building blocks of wound closure.",
    sections: [
      {
        heading: "Who benefits",
        body: "We see patients with stalled surgical wounds, pressure injuries, venous and arterial ulcers, traumatic wounds, and post-operative complications. The wounds that respond best are those where oxygen delivery is the rate-limiting factor — not wounds that are healing on their own with conservative care.",
        bullets: [
          "Surgical wounds that haven't closed as expected",
          "Pressure injuries with exposed tissue",
          "Wounds complicated by infection or compromised blood supply",
          "Traumatic and crush wounds with poor healing trajectory",
        ],
      },
      {
        heading: "What treatment looks like",
        body: "A standard course typically runs 20–40 sessions, scheduled five days a week. Each session lasts about 90 minutes inside the chamber, plus 15 minutes of compression and decompression. Most patients also continue with wound debridement, dressing changes, and offloading between HBOT visits — the chamber is part of a complete wound-care plan, not a stand-alone fix.",
      },
      {
        heading: "What you can expect",
        body: "Wounds rarely change visibly in the first week. By weeks two and three, granulation tissue and edge contraction become measurable. Most patients see meaningful closure progress by treatments 20–30, and your physician will reassess regularly to confirm the wound is responding.",
      },
    ],
    benefits: [
      "Improves oxygen delivery to compromised tissue",
      "Stimulates new blood vessel formation (angiogenesis)",
      "Supports collagen synthesis and edge closure",
      "Reduces edema and bacterial load",
      "Often allows limb salvage where amputation was considered",
    ],
    faqIds: ["how-many-treatments", "covered-by-insurance", "what-to-wear"],
    relatedSlugs: ["diabetic-lower-extremity-wounds", "radiation-tissue-damage"],
  },
  {
    slug: "diabetic-lower-extremity-wounds",
    name: "Diabetic Lower-Extremity Wounds",
    shortName: "Diabetic Wounds",
    summary:
      "Diabetic foot ulcers that haven't responded to standard care for 30+ days are an FDA-approved indication for hyperbaric oxygen therapy and a focus of our wound program.",
    metaTitle:
      "HBOT for Diabetic Foot Ulcers & Lower-Extremity Wounds | Queens, NY",
    metaDescription:
      "Hyperbaric oxygen therapy for diabetic foot ulcers and lower-extremity wounds in Woodside, Queens. Limb-salvage focus, experienced wound physicians.",
    fdaStatus: "on-label",
    heroImage: "/images/conditions/diabetic-wounds.webp",
    howHbotHelps:
      "Diabetes damages the small blood vessels that feed the feet and legs, so even a minor wound can become an ulcer that refuses to close. Hyperbaric oxygen therapy raises the oxygen tension in plasma high enough to reach tissue that microvascular disease has cut off, which supports new capillary growth, infection control, and the cellular signals needed for closure.",
    sections: [
      {
        heading: "Why diabetic wounds are different",
        body: "Three things stack up against diabetic wounds: reduced blood flow, impaired immune response, and neuropathy that masks early warning signs. By the time a patient notices the wound, infection has often set in and the tissue is already oxygen-starved. HBOT directly addresses the oxygen-delivery piece of that picture.",
        bullets: [
          "Wagner Grade 3 or higher ulcers are the strongest indication",
          "Wounds that have failed 30+ days of standard care",
          "Patients who have had vascular workup and offloading optimized",
        ],
      },
      {
        heading: "Our limb-salvage approach",
        body: "Our program is built around limb salvage. Before recommending HBOT, we coordinate with your vascular team, podiatrist, and primary care to make sure perfusion, offloading, glucose control, and infection management are all in place. HBOT then amplifies the work being done by the rest of your care plan.",
      },
      {
        heading: "Coverage",
        body: "HBOT for diabetic lower-extremity wounds is an FDA-approved indication and is typically covered by Medicare, Medicaid, and most major insurers when documentation supports medical necessity. Our team handles the paperwork and pre-authorization on your behalf.",
      },
    ],
    benefits: [
      "Often allows wound closure where amputation was being considered",
      "Reduces infection burden in the wound bed",
      "Supports new blood vessel growth in chronically ischemic tissue",
      "Improves outcomes when combined with offloading and glycemic control",
    ],
    faqIds: [
      "how-many-treatments",
      "covered-by-insurance",
      "is-hbot-painful",
    ],
    relatedSlugs: ["non-healing-wounds", "chronic-pain"],
  },
  {
    slug: "radiation-tissue-damage",
    name: "Radiation Tissue Damage",
    shortName: "Radiation Injury",
    summary:
      "Late-effect radiation injuries — including soft tissue radionecrosis, osteoradionecrosis, and radiation cystitis or proctitis — are FDA-approved indications for hyperbaric oxygen therapy.",
    metaTitle:
      "HBOT for Radiation Tissue Damage & Osteoradionecrosis | Queens, NY",
    metaDescription:
      "Hyperbaric oxygen therapy in Woodside, Queens for soft tissue radionecrosis, osteoradionecrosis, radiation cystitis, and other late-effect radiation injuries.",
    fdaStatus: "on-label",
    heroImage: "/images/conditions/radiation-tissue-damage.webp",
    howHbotHelps:
      "Radiation can leave tissue with reduced blood supply and oxygen for years after treatment ends. When new injury or surgery is introduced into that tissue, it heals poorly or breaks down. HBOT stimulates fibroblast and endothelial activity in irradiated tissue, builds new capillary beds, and improves the body's ability to repair and tolerate further intervention.",
    sections: [
      {
        heading: "Conditions we treat",
        body: "We work with patients who have completed cancer treatment and are dealing with late-effect radiation injury in soft tissue, bone, the bladder, or the bowel — including patients preparing for dental extractions or implants in previously irradiated jaws.",
        bullets: [
          "Osteoradionecrosis of the jaw (ORN)",
          "Soft tissue radionecrosis",
          "Hemorrhagic radiation cystitis",
          "Radiation proctitis",
          "Pre-operative protocols before surgery in irradiated tissue",
        ],
      },
      {
        heading: "Standard protocol",
        body: "Most radiation injury protocols run 30–40 sessions, sometimes 60 for severe osteoradionecrosis. We coordinate closely with your oncology and surgical teams so timing and dosing fit your overall treatment plan.",
      },
    ],
    benefits: [
      "Restores blood supply to irradiated tissue",
      "Helps tissue tolerate surgical procedures (e.g. dental extractions)",
      "Can resolve hemorrhagic radiation cystitis when other treatments fail",
      "Supports repair without further damaging surrounding tissue",
    ],
    faqIds: ["how-many-treatments", "covered-by-insurance"],
    relatedSlugs: ["non-healing-wounds", "sudden-hearing-loss"],
  },
  {
    slug: "sudden-hearing-loss",
    name: "Sudden Sensorineural Hearing Loss",
    shortName: "Sudden Hearing Loss",
    summary:
      "Sudden sensorineural hearing loss is a medical emergency. Hyperbaric oxygen therapy started within two weeks of onset can meaningfully improve recovery, and is an FDA-approved indication.",
    metaTitle:
      "HBOT for Sudden Sensorineural Hearing Loss | Queens, NY",
    metaDescription:
      "Sudden hearing loss in one ear? Hyperbaric oxygen therapy started within two weeks of onset can support recovery. HBOTQ Woodside, Queens.",
    fdaStatus: "on-label",
    heroImage: "/images/conditions/suitable.webp",
    howHbotHelps:
      "The inner ear's hair cells have a very high oxygen demand and are supplied by tiny end-arteries with no collateral circulation. When that blood supply is interrupted, hearing can disappear within hours. Hyperbaric oxygen therapy delivers a far higher concentration of oxygen to inner-ear tissue, which can support recovery when treatment starts early — ideally within two weeks of onset.",
    sections: [
      {
        heading: "Why timing matters",
        body: "The earlier HBOT begins after sudden hearing loss, the better the chance of recovery. Treatment started within the first 14 days has the strongest evidence; outcomes drop as treatment is delayed. If you've just experienced sudden hearing loss in one ear, call us today — we coordinate quickly with ENT.",
      },
      {
        heading: "What treatment looks like",
        body: "A standard protocol is typically 10–20 sessions, often combined with the oral or intratympanic steroids prescribed by your ENT physician. Your physician will reassess hearing partway through to confirm response and decide on the full course.",
      },
    ],
    benefits: [
      "Significantly increases oxygen delivery to inner-ear tissue",
      "Best evidence when started within 14 days of hearing loss onset",
      "Complements ENT care including steroid therapy",
      "FDA-approved indication; typically covered by insurance",
    ],
    faqIds: ["how-many-treatments", "is-hbot-painful"],
    relatedSlugs: ["post-covid", "non-healing-wounds"],
  },
  {
    slug: "post-covid",
    name: "Post-COVID Recovery",
    shortName: "Post-COVID",
    summary:
      "Patients with persistent fatigue, brain fog, and exercise intolerance after COVID-19 are increasingly turning to hyperbaric oxygen therapy. This is currently an off-label use that we discuss carefully with each patient.",
    metaTitle: "HBOT for Long COVID & Post-COVID Symptoms | Queens, NY",
    metaDescription:
      "Hyperbaric oxygen therapy in Woodside, Queens for post-COVID fatigue, brain fog and exercise intolerance. Off-label use; honest physician guidance.",
    fdaStatus: "off-label",
    heroImage: "/images/conditions/post-covid.webp",
    howHbotHelps:
      "Long COVID involves multiple overlapping mechanisms — microvascular dysfunction, persistent inflammation, mitochondrial stress, and changes in tissue oxygenation. HBOT addresses several of these in parallel: by saturating plasma with oxygen, it can help reach tissue that microvascular damage no longer reaches efficiently, and it has been shown in early studies to modulate inflammation and support cognitive and physical function in carefully selected patients.",
    sections: [
      {
        heading: "What the evidence shows",
        body: "Research into HBOT for long COVID is still emerging. Small randomized trials and case series report improvements in fatigue, cognition, and exercise tolerance, but results vary and HBOT is not currently an FDA-approved indication for post-COVID syndrome. We discuss the evidence openly with every patient before starting treatment.",
      },
      {
        heading: "Our approach",
        body: "Before recommending HBOT for post-COVID symptoms, your physician reviews your full clinical picture and rules out other treatable causes. If we move forward, a typical protocol is 40 sessions, with reassessment at the midpoint. We don't make recovery promises — we use the chamber as one part of a broader recovery plan with honest expectations.",
      },
      {
        heading: "Insurance",
        body: "Because this is an off-label use, post-COVID HBOT is generally not covered by insurance and is provided on a self-pay basis. We'll walk you through pricing on your consultation call.",
      },
    ],
    benefits: [
      "May improve fatigue, cognitive symptoms, and exercise tolerance",
      "Addresses microvascular and inflammatory components in parallel",
      "Carefully evaluated against your full clinical picture",
      "Discussed with honest expectations — not a guaranteed cure",
    ],
    faqIds: [
      "is-hbot-painful",
      "how-many-treatments",
      "covered-by-insurance",
    ],
    relatedSlugs: ["chronic-pain", "sudden-hearing-loss"],
  },
  {
    slug: "chronic-pain",
    name: "Chronic Pain",
    shortName: "Chronic Pain",
    summary:
      "For appropriate patients, hyperbaric oxygen therapy can reduce inflammation, support tissue repair, and complement other pain management strategies. Most chronic pain indications are off-label.",
    metaTitle: "HBOT for Chronic Pain Management | Queens, NY",
    metaDescription:
      "Hyperbaric oxygen therapy in Woodside, Queens for chronic pain including complex regional pain syndrome and fibromyalgia. Physician-supervised care.",
    fdaStatus: "off-label",
    heroImage: "/images/conditions/treats.webp",
    howHbotHelps:
      "Many chronic pain conditions involve underlying tissue inflammation, microvascular dysfunction, or impaired healing. HBOT increases tissue oxygenation, modulates inflammatory mediators, and supports cellular repair processes. For some patients, this translates into reduced pain intensity and improved function — though responses vary and HBOT works best alongside the rest of your pain management plan.",
    sections: [
      {
        heading: "Conditions we consider",
        body: "We've helped patients with complex regional pain syndrome, fibromyalgia-related pain, and chronic post-surgical pain that hasn't responded to standard care. As with all off-label indications, we evaluate every case individually and discuss the evidence honestly before starting treatment.",
        bullets: [
          "Complex Regional Pain Syndrome (CRPS)",
          "Fibromyalgia-related pain",
          "Chronic post-surgical pain",
          "Refractory inflammatory pain",
        ],
      },
      {
        heading: "What to expect",
        body: "Most off-label chronic pain protocols are 30–40 sessions. We reassess pain scores and functional outcomes at the midpoint and end of the course. HBOT is typically one piece of a broader pain plan that includes your pain specialist's recommendations.",
      },
    ],
    benefits: [
      "May reduce pain intensity in selected chronic pain conditions",
      "Anti-inflammatory and tissue-repair mechanisms",
      "Non-opioid, non-pharmacologic option",
      "Evaluated honestly against your full clinical picture",
    ],
    faqIds: ["is-hbot-painful", "how-many-treatments"],
    relatedSlugs: ["post-covid", "non-healing-wounds"],
  },
  {
    slug: "refractory-osteomyelitis",
    name: "Chronic Refractory Osteomyelitis",
    shortName: "Refractory Osteomyelitis",
    summary:
      "Bone infections that keep coming back after antibiotics and surgery are an FDA-approved indication for hyperbaric oxygen therapy, used alongside surgical debridement and IV antibiotics to clear infection from poorly oxygenated bone.",
    metaTitle:
      "HBOT for Chronic Refractory Osteomyelitis (Bone Infection) | Queens, NY",
    metaDescription:
      "Hyperbaric oxygen therapy in Woodside, Queens for chronic refractory osteomyelitis — bone infection antibiotics and surgery alone haven't cleared.",
    fdaStatus: "on-label",
    heroImage: "/images/conditions/safe-effective.webp",
    howHbotHelps:
      "Osteomyelitis becomes \"refractory\" when infection persists in bone that no longer has the blood supply to deliver antibiotics or immune cells where they're needed. Inside the hyperbaric chamber, you breathe 100% oxygen at increased atmospheric pressure, raising oxygen levels in the infected bone high enough to restore the function of infection-fighting white cells, boost the killing power of certain antibiotics, and stimulate new blood vessel growth into the dead and devitalized tissue that harbors the infection.",
    sections: [
      {
        heading: "When osteomyelitis becomes refractory",
        body: "Most bone infections resolve with surgery and a course of antibiotics. It is called chronic refractory osteomyelitis when the infection returns or fails to clear despite appropriate surgical debridement and antibiotic therapy. At that point the limiting factor is often oxygen — the infected bone is too poorly perfused for treatment to reach it. HBOT is added as an adjunct, never as a replacement for surgery and antibiotics.",
        bullets: [
          "Infection that recurs after debridement and antibiotics",
          "Compromised, poorly vascularized, or previously irradiated bone",
          "Diabetic and post-traumatic bone infections of the foot and leg",
          "Hardware-associated infection cleared surgically but slow to heal",
        ],
      },
      {
        heading: "How we coordinate your care",
        body: "HBOT for osteomyelitis only works as part of a team plan. Before starting, we coordinate with your orthopedic or podiatric surgeon and infectious-disease physician so that surgical debridement, culture-directed IV antibiotics, and hyperbaric oxygen are all working together. We handle scheduling so your chamber sessions line up with the rest of your treatment.",
      },
      {
        heading: "Standard protocol",
        body: "A typical course for refractory osteomyelitis runs 20–40 sessions, scheduled five days a week, with each session about 90 minutes at treatment pressure. Your physician reassesses with your surgical and ID team partway through to confirm the infection is responding before completing the full course.",
      },
    ],
    benefits: [
      "Restores oxygen levels that infection-fighting white cells need to work",
      "Enhances the effectiveness of several antibiotics in low-oxygen bone",
      "Stimulates new blood vessel growth into devitalized bone",
      "Supports limb salvage in diabetic and post-traumatic bone infections",
      "FDA-approved indication; typically covered when medically necessary",
    ],
    faqIds: ["how-many-treatments", "covered-by-insurance", "is-hbot-safe"],
    relatedSlugs: ["diabetic-lower-extremity-wounds", "non-healing-wounds"],
  },
  {
    slug: "severe-anemia",
    name: "Severe Anemia (Bridge Therapy)",
    shortName: "Severe Anemia",
    summary:
      "When a blood transfusion isn't possible — by choice or by clinical circumstance — hyperbaric oxygen therapy can serve as a temporary bridge, oxygenating tissue directly through the plasma. This is an FDA-approved indication for exceptional blood-loss anemia.",
    metaTitle:
      "HBOT for Severe Anemia & Bridge Therapy | Queens, NY",
    metaDescription:
      "Hyperbaric oxygen therapy in Woodside, Queens as bridge therapy for severe blood-loss anemia when transfusion is unavailable or declined. FDA-approved.",
    fdaStatus: "on-label",
    heroImage: "/images/conditions/safe-effective.webp",
    howHbotHelps:
      "In severe anemia there aren't enough red blood cells to carry oxygen to the tissues. Hyperbaric oxygen therapy works around that bottleneck: under pressure, so much oxygen dissolves directly into the blood plasma that the body can be oxygenated without relying on hemoglobin at all. That makes HBOT a temporary bridge — buying critical time for tissue to stay oxygenated while the body rebuilds its own red cells or other treatment is arranged.",
    sections: [
      {
        heading: "When HBOT is used as a bridge",
        body: "This is what hyperbaric medicine calls \"exceptional blood-loss anemia\" — severe anemia where transfusion is not an option. That may be because compatible blood isn't available, because of a transfusion reaction risk, or because the patient declines blood products for personal or religious reasons. In these situations HBOT can sustain tissue oxygenation while the underlying problem is addressed.",
        bullets: [
          "Patients who decline blood transfusion, including for religious reasons",
          "Severe anemia where compatible blood is unavailable",
          "Bridging tissue oxygenation while red-cell production recovers",
        ],
      },
      {
        heading: "A carefully supervised, time-limited treatment",
        body: "Bridge therapy for severe anemia is an acute, closely monitored use of HBOT, not an outpatient program. Sessions and dosing are individualized to the patient's condition and coordinated with the treating hospital team. Your physician will explain exactly how HBOT fits into the broader plan to stabilize and recover.",
      },
    ],
    benefits: [
      "Oxygenates tissue directly through plasma, bypassing low red-cell counts",
      "Provides a temporary bridge when transfusion is unavailable or declined",
      "Supports patients who decline blood products on religious grounds",
      "FDA-approved indication, delivered under close physician supervision",
    ],
    faqIds: ["how-does-hbot-work", "is-hbot-safe"],
    relatedSlugs: ["non-healing-wounds", "radiation-tissue-damage"],
  },
];

/**
 * The wellness hub as a conditions-grid entry. Wellness uses are off-label and
 * self-pay, so they get a badge of their own and point at the existing
 * /wellness/ hub instead of a duplicate page under /condition/.
 */
export const wellnessListing: ConditionListing = {
  key: "wellness",
  name: "Wellness & Recovery",
  summary:
    "Athletic recovery, healthy aging, and everyday wellness — the non-medical reasons people use hyperbaric oxygen. Off-label, self-pay, and always explained with honest expectations.",
  href: "/wellness/",
  status: "wellness",
};

export function toConditionListing(c: Condition): ConditionListing {
  return {
    key: c.slug,
    name: c.name,
    summary: c.summary,
    href: `/condition/${c.slug}/`,
    status: c.fdaStatus,
  };
}

/** Every card shown in the conditions grid: the clinical pages, then wellness. */
export const conditionListings: ConditionListing[] = [
  ...conditions.map(toConditionListing),
  wellnessListing,
];

export function getCondition(slug: string): Condition | undefined {
  return conditions.find((c) => c.slug === slug);
}

export function relatedConditions(slug: string): Condition[] {
  const c = getCondition(slug);
  if (!c) return [];
  return c.relatedSlugs
    .map((s) => conditions.find((x) => x.slug === s))
    .filter((x): x is Condition => Boolean(x));
}
