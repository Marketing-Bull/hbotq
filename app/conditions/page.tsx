import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { ConditionsGrid } from "@/components/sections/conditions-grid";
import { PhysiciansSection } from "@/components/sections/physicians-section";
import { CtaBanner } from "@/components/sections/cta-banner";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Conditions We Treat",
  description:
    "Conditions treated with hyperbaric oxygen therapy at HBOTQ in Queens — FDA-approved wound, radiation and hearing-loss indications, plus wellness sessions.",
  path: "/conditions/",
  image: "/images/og/conditions.jpg",
});

export const dynamic = "force-static";

export default function ConditionsPage() {
  return (
    <>
      <Hero
        variant="page"
        eyebrow="What We Treat"
        title="Conditions hyperbaric oxygen therapy can help."
        subtitle="From FDA-approved wound and radiation indications to carefully evaluated off-label uses and wellness sessions, here are the patients we see most often — and the honest evidence behind each."
        primaryCta={{ label: "Book a consultation", href: "/contact-us/" }}
      />
      <TrustBar />
      <ConditionsGrid
        heading="Eight conditions plus wellness, one care team"
        subtitle="Click any card for a deeper look at how HBOT helps, what to expect, and how we coordinate with the rest of your care team — including the wellness and recovery uses people come to us for outside a diagnosis."
      />
      <PhysiciansSection />
      <CtaBanner />
    </>
  );
}
