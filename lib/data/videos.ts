import type { ConditionSlug } from "@/types/content";

export interface Video {
  id: string;
  title: string;
  description: string;
  /** Actual YouTube publish date (ISO yyyy-mm-dd) for VideoObject schema */
  uploadDate: string;
  conditionSlug?: ConditionSlug;
}

/**
 * Videos from the practice's YouTube channel:
 * https://www.youtube.com/@hyperbaricoxygentherapyque5418
 * Those with a conditionSlug are embedded on the matching condition page.
 */
export const videos: Video[] = [
  {
    id: "yNwKh_JdSKQ",
    uploadDate: "2024-10-22",
    title: "Non-Healing Wounds and Hyperbaric Oxygen Therapy",
    description:
      "How HBOT restores oxygen to stalled wounds to support closure.",
    conditionSlug: "non-healing-wounds",
  },
  {
    id: "bvhlX3ya4e0",
    uploadDate: "2024-10-22",
    title: "Diabetic Lower-Extremity Wounds and Hyperbaric Oxygen Therapy",
    description:
      "Why diabetic foot ulcers stall and how HBOT supports limb salvage.",
    conditionSlug: "diabetic-lower-extremity-wounds",
  },
  {
    id: "ui8Z9hLyQT8",
    uploadDate: "2024-10-22",
    title: "Radiation Tissue Damage and Hyperbaric Oxygen Therapy",
    description:
      "Treating late-effect radiation injury and osteoradionecrosis with HBOT.",
    conditionSlug: "radiation-tissue-damage",
  },
  {
    id: "9lKjrU0E1jk",
    uploadDate: "2024-10-23",
    title: "Sudden Hearing Loss and Hyperbaric Oxygen Therapy",
    description:
      "Why timing matters and how HBOT supports recovery from sudden hearing loss.",
    conditionSlug: "sudden-hearing-loss",
  },
  {
    id: "1jjSu8I2bQY",
    uploadDate: "2024-10-23",
    title: "Long-Haul COVID-19 and Hyperbaric Oxygen Therapy",
    description:
      "How HBOT is being used for persistent post-COVID symptoms.",
    conditionSlug: "post-covid",
  },
  {
    id: "y8HQEK6a924",
    uploadDate: "2024-10-23",
    title: "Chronic Pain and Hyperbaric Oxygen Therapy",
    description:
      "HBOT's anti-inflammatory and tissue-repair role in chronic pain.",
    conditionSlug: "chronic-pain",
  },
  {
    id: "OT9LzvA8DM0",
    uploadDate: "2021-02-07",
    title: "Hyperbaric Oxygen Therapy for Diabetic Wound and Ulcer Care",
    description: "A closer look at HBOT in diabetic wound and ulcer care.",
  },
  {
    id: "uyEBwWFiwWo",
    uploadDate: "2021-02-07",
    title: "Hyperbaric Oxygen Therapy for COVID-19 Recovery",
    description: "Using HBOT to support recovery after COVID-19.",
  },
  {
    id: "KIoanDGWiQc",
    uploadDate: "2021-02-07",
    title: "Hyperbaric Oxygen Therapy After Plastic Surgery (NYC)",
    description: "How HBOT can support healing and reduce recovery time after plastic surgery.",
  },
  {
    id: "1GW-rf7d818",
    uploadDate: "2021-01-02",
    title: "Hyperbaric Oxygen Therapy After Sports Injury",
    description: "HBOT for faster recovery from sports and soft-tissue injuries.",
  },
  {
    id: "gdaryvEI1jw",
    uploadDate: "2021-01-02",
    title: "Hyperbaric Oxygen Therapy After a Car Accident",
    description: "How HBOT supports healing after traumatic injury.",
  },
  {
    id: "9P3ZCT_EoMY",
    uploadDate: "2021-01-02",
    title: "Hyperbaric Oxygen Therapy for Cancer Patients",
    description: "HBOT's supportive role for patients during and after cancer care.",
  },
  {
    id: "-dTe7UB8TDA",
    uploadDate: "2021-01-02",
    title: "Hyperbaric Oxygen Therapy for Alzheimer's",
    description: "An overview of HBOT being explored for Alzheimer's and cognition.",
  },
  {
    id: "j98AfoPkjL8",
    uploadDate: "2021-01-02",
    title: "Hyperbaric Oxygen Therapy for Autism",
    description: "An overview of HBOT being explored in autism care.",
  },
  {
    id: "P981AQmVzhc",
    uploadDate: "2021-01-02",
    title: "Hyperbaric Oxygen Therapy in Queens — en Español",
    description: "Una introducción a la oxigenoterapia hiperbárica en Queens.",
  },
];

export function getConditionVideo(slug: string): Video | undefined {
  return videos.find((v) => v.conditionSlug === slug);
}

export const conditionVideos = videos.filter((v) => v.conditionSlug);
export const topicVideos = videos.filter((v) => !v.conditionSlug);
