import type { Condition } from "@/types/content";

export const conditions: Condition[] = [
  {
    slug: "non-healing-wounds",
    name: "Non-Healing Wounds",
    shortName: "Non-Healing Wounds",
    summary:
      "Wounds that haven't closed after 30 days of standard care often respond to hyperbaric oxygen therapy when oxygen delivery to the tissue is the missing factor.",
    metaTitle: "Hyperbaric Oxygen Therapy for Non-Healing Wounds | Queens, NY",
    metaDescription:
      "HBOT in Woodside, Queens for chronic non-healing wounds. Our wound program combines hyperbaric oxygen, debridement, and advanced wound care for patients across NYC.",
    fdaStatus: "on-label",
    heroImage: "/images/conditions/service.webp",
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
        body: "Wounds rarely change visibly in the first week. By weeks two and three, granulation tissue and edge contraction become measurable. Most patients see meaningful closure progress by treatments 20–30, and your medical director will reassess regularly to confirm the wound is responding.",
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
      "Hyperbaric oxygen therapy for diabetic foot ulcers and lower-extremity wounds in Woodside, Queens. Limb-salvage focused program with experienced wound physicians.",
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
        body: "A standard protocol is typically 10–20 sessions, often combined with the oral or intratympanic steroids prescribed by your ENT physician. Your medical director will reassess hearing partway through to confirm response and decide on the full course.",
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
      "Hyperbaric oxygen therapy in Woodside, Queens for post-COVID fatigue, brain fog, and exercise intolerance. Off-label use; honest expectations from experienced physicians.",
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
        body: "Before recommending HBOT for post-COVID symptoms, our medical director reviews your full clinical picture and rules out other treatable causes. If we move forward, a typical protocol is 40 sessions, with reassessment at the midpoint. We don't make recovery promises — we use the chamber as one part of a broader recovery plan with honest expectations.",
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
      "Hyperbaric oxygen therapy in Woodside, Queens for chronic pain conditions including complex regional pain syndrome and fibromyalgia. Honest, physician-supervised care.",
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
