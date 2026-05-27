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
  },
];
