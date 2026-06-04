import { Hero } from "@/components/sections/hero";
import { PhysiciansSection } from "@/components/sections/physicians-section";
import { CtaBanner } from "@/components/sections/cta-banner";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Our Physicians",
  description:
    "Meet the HBOTQ medical team — board-certified hyperbaric medicine and wound care physicians serving Woodside, Queens, and the greater NYC area.",
  path: "/physicians/",
  image: "/images/og/physicians.jpg",
});

export const dynamic = "force-static";

export default function PhysiciansPage() {
  return (
    <>
      <Hero
        variant="page"
        eyebrow="Our Care Team"
        title="A medical team built around hyperbaric medicine."
        subtitle="Every HBOTQ patient is evaluated and supervised by board-certified physicians and wound-care specialists — not technicians or wellness consultants."
        primaryCta={{ label: "Book a consultation", href: "/contact-us/" }}
      />
      <PhysiciansSection
        heading="Meet the team"
        subtitle="Continuity matters in hyperbaric medicine. Most of our patients see the same care team from the first consultation through the final treatment."
      />
      <CtaBanner />
    </>
  );
}
