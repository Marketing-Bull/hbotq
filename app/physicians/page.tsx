import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { PhysiciansSection } from "@/components/sections/physicians-section";
import { CtaBanner } from "@/components/sections/cta-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { physicianSchema } from "@/lib/seo/schemas";
import { physicians } from "@/lib/data/physicians";
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
      {physicians.map((p) => (
        <JsonLd
          key={p.slug}
          data={physicianSchema({
            name: p.name,
            title: p.title,
            specialties: p.specialties,
            image: p.image,
          })}
        />
      ))}
      <Hero
        variant="page"
        eyebrow="Our Care Team"
        title="A medical team built around hyperbaric medicine."
        subtitle="Every HBOTQ patient is evaluated and supervised by board-certified physicians and wound-care specialists — not technicians or wellness consultants."
        primaryCta={{ label: "Book a consultation", href: "/contact-us/" }}
      />
      <TrustBar />
      <PhysiciansSection
        heading="Meet the team"
        subtitle="Continuity matters in hyperbaric medicine. Most of our patients see the same care team from the first consultation through the final treatment."
      />
      <CtaBanner />
    </>
  );
}
