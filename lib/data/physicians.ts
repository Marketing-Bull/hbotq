import type { Physician } from "@/types/content";

export const physicians: Physician[] = [
  {
    slug: "dr-manoj-sadhnani",
    name: "Dr. Manoj Sadhnani",
    title: "Board-Certified Podiatric Physician & Surgeon",
    credentials: ["DPM", "Board-Certified"],
    specialties: [
      "Podiatric Surgery",
      "Wound Care",
      "Diabetic Limb Salvage",
      "Hyperbaric Medicine",
    ],
    bio: "Dr. Sadhnani is a multi-faceted, board-certified podiatric physician and surgeon with nearly two decades of clinical practice. A graduate with honors of the New York College of Podiatric Medicine and a residency-trained alumnus of New York Methodist Hospital, he combines advanced endoscopic and arthroscopic techniques with hyperbaric medicine to treat the full range of podiatric and wound conditions. He holds affiliations with Long Island Jewish Medical Center and New York Methodist Hospital, accepts most major insurance plans, and consults with patients in English, Spanish, and Hindi.",
    image: "/images/physicians/dr-sadhnani.webp",
    education: [
      "New York College of Podiatric Medicine (graduated with honors)",
      "Residency — New York Methodist Hospital",
    ],
    affiliations: [
      "Long Island Jewish Medical Center",
      "New York Methodist Hospital",
    ],
    languages: ["English", "Spanish", "Hindi"],
    sameAs: [
      "https://data.cms.gov/tools/medicare-revalidation-list/provider/I20050215000786",
      "https://www.zocdoc.com/doctor/manoj-sadhnani-dpm-470942",
      "https://www.healthgrades.com/physician/dr-manoj-sadhnani-32d6x",
    ],
  },
  {
    slug: "regina-matatova",
    name: "Regina Matatova, MSN, APRN, AGPCNP-BC",
    title: "Adult-Gerontology Primary Care Nurse Practitioner",
    credentials: ["MSN", "APRN", "AGPCNP-BC"],
    specialties: [
      "Wound Care",
      "Diabetic Foot Ulcers",
      "Venous Stasis Ulcers",
      "Pressure Injuries",
    ],
    bio: "Regina Matatova is a board-certified Adult-Gerontology Primary Care Nurse Practitioner specializing in wound care. She brings extensive experience treating complex wounds — diabetic foot ulcers, venous stasis ulcers, pressure injuries, and more — and partners with HBOTQ to use hyperbaric oxygen therapy as part of her patients' recovery plans. She holds a Master of Science in Nursing from CUNY Hunter College and consults with patients in English, Hebrew, and Russian.",
    image: "/images/physicians/nurse-regina.webp",
    education: ["Master of Science in Nursing — CUNY Hunter College"],
    languages: ["English", "Hebrew", "Russian"],
    sameAs: [
      "https://www.doximity.com/pub/rigina-matatova-np",
      "https://www.vitals.com/doctors/rigina-matatova-n02ve5",
    ],
  },
];
