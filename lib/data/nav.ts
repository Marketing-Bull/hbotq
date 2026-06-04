export const primaryNav = [
  { label: "Treatment", href: "/treatment/" },
  { label: "Conditions", href: "/conditions/" },
  { label: "Locations", href: "/locations/" },
  { label: "Physicians", href: "/physicians/" },
  { label: "FAQs", href: "/faqs/" },
  { label: "Contact", href: "/contact-us/" },
] as const;

export const footerNav = {
  explore: [
    { label: "Treatment", href: "/treatment/" },
    { label: "Hyperbaric Therapy", href: "/lp/hyperbaric-therapy/" },
    { label: "Conditions", href: "/conditions/" },
    { label: "Areas We Serve", href: "/locations/" },
    { label: "Wellness & Recovery", href: "/wellness/" },
    { label: "Resources & Guides", href: "/resources/" },
    { label: "Video Library", href: "/videos/" },
    { label: "Physicians", href: "/physicians/" },
    { label: "FAQs", href: "/faqs/" },
  ],
  conditions: [
    { label: "Chronic Pain", href: "/condition/chronic-pain/" },
    {
      label: "Diabetic Lower-Extremity Wounds",
      href: "/condition/diabetic-lower-extremity-wounds/",
    },
    { label: "Non-Healing Wounds", href: "/condition/non-healing-wounds/" },
    { label: "Post-COVID", href: "/condition/post-covid/" },
    {
      label: "Radiation Tissue Damage",
      href: "/condition/radiation-tissue-damage/",
    },
    {
      label: "Refractory Osteomyelitis",
      href: "/condition/refractory-osteomyelitis/",
    },
    { label: "Severe Anemia", href: "/condition/severe-anemia/" },
    { label: "Sudden Hearing Loss", href: "/condition/sudden-hearing-loss/" },
  ],
  legal: [
    { label: "Contact", href: "/contact-us/" },
    { label: "Privacy Policy", href: "/privacy-policy/" },
    { label: "Terms of Service", href: "/terms-of-service/" },
    { label: "Accessibility", href: "/accessibility/" },
  ],
} as const;
