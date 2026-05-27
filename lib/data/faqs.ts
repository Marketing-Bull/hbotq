import type { Faq } from "@/types/content";

export const faqs: Faq[] = [
  {
    id: "what-is-hbot",
    category: "general",
    question: "What is hyperbaric oxygen therapy (HBOT)?",
    answer:
      "Hyperbaric oxygen therapy is a medical treatment in which you breathe 100% oxygen inside a pressurized chamber. The increased atmospheric pressure dissolves significantly more oxygen into your plasma than is possible at sea level, allowing oxygen to reach tissue that compromised blood vessels can no longer feed.",
  },
  {
    id: "how-does-hbot-work",
    category: "general",
    question: "How does HBOT actually work?",
    answer:
      "At rest, oxygen is carried almost entirely on hemoglobin in your red blood cells. In the chamber, the pressure and 100% oxygen environment cause oxygen to dissolve directly into your blood plasma. That plasma-borne oxygen can reach injured or oxygen-starved tissue regardless of red-cell flow — which is the foundation for HBOT's effects on wound healing, infection control, and tissue repair.",
  },
  {
    id: "soft-vs-hard-chamber",
    category: "general",
    question: "What's the difference between a soft and a hard chamber?",
    answer:
      "HBOTQ uses hard-shelled, medical-grade hyperbaric chambers operating at the pressures (2.0–2.5 ATA) supported by clinical evidence and required for FDA-approved indications. Soft-sided chambers used in some wellness settings operate at lower pressures and do not meet the medical standard for the conditions we treat.",
  },
  {
    id: "how-many-treatments",
    category: "treatment",
    question: "How many treatments will I need?",
    answer:
      "Course length depends on your condition. Sudden hearing loss is typically 10–20 sessions. Most wound and radiation injury protocols run 20–40 sessions. Off-label protocols are often 30–40 sessions. Your medical director will lay out an exact plan after evaluating you and will reassess regularly.",
  },
  {
    id: "is-hbot-painful",
    category: "treatment",
    question: "Is hyperbaric oxygen therapy painful?",
    answer:
      "No. The most common sensation is mild ear pressure during compression and decompression, similar to descending in an airplane. Our team teaches you simple ear-clearing techniques and adjusts pressure changes for your comfort. Most patients read, watch a movie, or nap during their 90-minute session.",
  },
  {
    id: "what-to-wear",
    category: "treatment",
    question: "What do I wear inside the chamber?",
    answer:
      "We provide 100% cotton scrubs for every patient — no synthetic fabrics, perfumes, hair products, or lotions are allowed inside the chamber for safety reasons. Locker space and changing rooms are available on-site.",
  },
  {
    id: "covered-by-insurance",
    category: "logistics",
    question: "Is HBOT covered by insurance?",
    answer:
      "For FDA-approved indications — including non-healing wounds, diabetic lower-extremity wounds, radiation tissue damage, sudden sensorineural hearing loss, and others — Medicare, Medicaid, and most major commercial insurers cover treatment when medical necessity is documented. We handle pre-authorization. Off-label uses are typically self-pay, and we'll be upfront about cost on your consultation call.",
  },
  {
    id: "how-long-is-a-session",
    category: "logistics",
    question: "How long does a session take?",
    answer:
      "Plan on about two hours from arrival to departure. You'll spend roughly 90 minutes at treatment pressure, plus 15 minutes each for compression and decompression, plus check-in and recovery.",
  },
  {
    id: "where-are-you-located",
    category: "logistics",
    question: "Where are you located?",
    answer:
      "We're at 65-35 Queens Blvd, Suite #100, Woodside, NY 11377. Free patient parking is available, and we're a short walk from the 7 train.",
  },
  {
    id: "do-i-need-a-referral",
    category: "logistics",
    question: "Do I need a referral?",
    answer:
      "A physician referral is not required to come in for a consultation. For insurance-covered indications, we will work with your referring physician or coordinate one to support medical necessity documentation.",
  },
  {
    id: "what-conditions-do-you-treat",
    category: "conditions",
    question: "What conditions do you treat?",
    answer:
      "FDA-approved indications we treat include non-healing wounds, diabetic lower-extremity wounds, radiation tissue damage, sudden sensorineural hearing loss, crush injury, compromised skin grafts and flaps, severe anemia, and others. We also see patients for off-label uses including post-COVID symptoms and chronic pain — always after an honest discussion of evidence and expectations.",
  },
  {
    id: "is-hbot-safe",
    category: "general",
    question: "Is HBOT safe?",
    answer:
      "HBOT is generally very safe in the hands of an experienced team. The most common side effects are mild ear pressure and temporary changes in vision that resolve after treatment. Serious complications are rare. Your medical director reviews your full medical history before starting treatment to identify any contraindications.",
  },
];

export function getFaqsByIds(ids: string[]): Faq[] {
  return ids
    .map((id) => faqs.find((f) => f.id === id))
    .filter((x): x is Faq => Boolean(x));
}

export function groupFaqs() {
  return {
    general: faqs.filter((f) => f.category === "general"),
    treatment: faqs.filter((f) => f.category === "treatment"),
    conditions: faqs.filter((f) => f.category === "conditions"),
    logistics: faqs.filter((f) => f.category === "logistics"),
  };
}
