import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { ConditionsGrid } from "@/components/sections/conditions-grid";
import { WhatIsHbot } from "@/components/sections/what-is-hbot";
import { WhatToExpect } from "@/components/sections/what-to-expect";
import { BenefitsGrid } from "@/components/sections/benefits-grid";
import { TestimonialCarousel } from "@/components/sections/testimonial-carousel";
import { RelaxBreathe } from "@/components/sections/relax-breathe";
import { PhysiciansSection } from "@/components/sections/physicians-section";
import { PhoneCta } from "@/components/sections/phone-cta";
import { ConsultationForm } from "@/components/forms/consultation-form";
import { CtaBanner } from "@/components/sections/cta-banner";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Hyperbaric Oxygen Therapy in Queens, NY",
  description:
    "HBOTQ in Woodside, Queens offers hyperbaric oxygen therapy for non-healing wounds, diabetic ulcers, radiation injury, sudden hearing loss, post-COVID, and chronic pain. Physician-led care, Medicare and most insurers accepted.",
  path: "/",
});

export const dynamic = "force-static";

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow="Hyperbaric Medicine in Queens"
        title="Healing that begins with oxygen."
        subtitle="HBOTQ is the Hyperbaric Medicine and Wound Treatment Center of Queens — physician-led hyperbaric oxygen therapy for patients across NYC."
        primaryCta={{ label: "Book a free consultation", href: "/contact-us/" }}
        secondaryCta={{ label: "See what HBOT treats", href: "/conditions/" }}
        image="/images/hero/patient-in-chamber.jpg"
        imageAlt="A patient relaxing inside a hard-shell hyperbaric oxygen chamber at HBOTQ"
        priority
      />
      <TrustBar />
      <ConditionsGrid />
      <WhatIsHbot />
      <WhatToExpect />
      <BenefitsGrid />
      <TestimonialCarousel />
      <RelaxBreathe />
      <PhysiciansSection />
      <PhoneCta />
      <section className="section bg-[var(--color-sand-100)]">
        <div className="container-page max-w-3xl">
          <ConsultationForm source="home" />
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
