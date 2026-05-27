import type { Physician } from "@/types/content";

export const physicians: Physician[] = [
  {
    slug: "owen-omeally-md",
    name: "Owen O'Meally, MD",
    title: "Medical Director",
    credentials: ["MD", "Board-Certified in Undersea & Hyperbaric Medicine"],
    specialties: [
      "Hyperbaric Medicine",
      "Wound Care",
      "Diabetic Limb Salvage",
    ],
    bio: "Dr. O'Meally leads clinical care at HBOTQ, overseeing every hyperbaric oxygen therapy plan and serving as principal physician for our advanced wound program. He has decades of experience treating complex non-healing wounds, diabetic foot ulcers, radiation injuries, and other oxygen-deficient conditions.",
    image: "/images/physicians/dr-sadhnani.webp",
  },
  {
    slug: "clinical-team",
    name: "HBOTQ Clinical Team",
    title: "Certified Hyperbaric Technicians & Wound Care Nurses",
    credentials: ["CHT", "RN"],
    specialties: [
      "Hyperbaric Chamber Operation",
      "Wound Assessment",
      "Patient Education",
    ],
    bio: "Our certified hyperbaric technicians and wound care nurses prepare patients for treatment, monitor every session in the chamber, and partner with the medical director on care planning. Many of our patients see the same care team across the full course of treatment.",
    image: "/images/physicians/nurse-regina.webp",
  },
];
