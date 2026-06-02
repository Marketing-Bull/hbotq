export const site = {
  name: "HBOTQ",
  legalName: "Hyperbaric Medicine and Wound Treatment Center of Queens",
  shortDescription:
    "Hyperbaric oxygen therapy and advanced wound care in Woodside, Queens.",
  url: "https://hbotq.com",
  email: "hello@hbotq.com",
  leadEmail: "hello@hbotq.com",
  fromEmail: "HBOTQ Website <leads@hbotq.com>",
  phone: "718-925-3322",
  phoneE164: "+17189253322",
  address: {
    street: "65-35 Queens Blvd, Suite #100",
    city: "Woodside",
    region: "NY",
    postalCode: "11377",
    country: "US",
  },
  geo: {
    latitude: 40.7361,
    longitude: -73.8961,
  },
  hours: [
    { day: "Monday", open: "08:00", close: "18:00" },
    { day: "Tuesday", open: "08:00", close: "18:00" },
    { day: "Wednesday", open: "08:00", close: "18:00" },
    { day: "Thursday", open: "08:00", close: "18:00" },
    { day: "Friday", open: "08:00", close: "18:00" },
    { day: "Saturday", open: "09:00", close: "14:00" },
    { day: "Sunday", open: null, close: null },
  ],
  social: {
    facebook: "https://www.facebook.com/hbotq",
    instagram: "https://www.instagram.com/hbotq",
    googleBusinessProfile:
      "https://www.google.com/maps/place/?api=1&query=Hyperbaric+Medicine+and+Wound+Treatment+Center+of+Queens+Woodside+NY",
  },
  ctas: {
    book: "Book a free consultation",
    call: "Call 718-925-3322",
  },
} as const;

export type Site = typeof site;
