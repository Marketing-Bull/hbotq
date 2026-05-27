import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { WhatIsHbot } from "@/components/sections/what-is-hbot";
import { WhatToExpect } from "@/components/sections/what-to-expect";
import { BenefitsGrid } from "@/components/sections/benefits-grid";
import { RelaxBreathe } from "@/components/sections/relax-breathe";
import { ConsultationForm } from "@/components/forms/consultation-form";
import { CtaBanner } from "@/components/sections/cta-banner";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "HBOT Treatment — How It Works",
  description:
    "How hyperbaric oxygen therapy works at HBOTQ in Woodside, Queens — from the science of pressurized oxygen to what a session actually looks like.",
  path: "/treatment/",
});

export const dynamic = "force-static";

export default function TreatmentPage() {
  return (
    <>
      <Hero
        variant="page"
        eyebrow="The Treatment"
        title="How hyperbaric oxygen therapy works."
        subtitle="The science behind HBOT, what a session feels like, and how the treatment fits into your broader care plan."
        primaryCta={{ label: "Book a consultation", href: "/contact-us/" }}
        secondaryCta={{ label: "See conditions we treat", href: "/conditions/" }}
        image="/images/facility/chamber.jpg"
        imageAlt="Hard-shell hyperbaric oxygen chamber at HBOTQ in Woodside, Queens"
        priority
      />
      <TrustBar />
      <WhatIsHbot />
      <BenefitsGrid />
      <WhatToExpect />
      <RelaxBreathe />
      <section className="section bg-[var(--color-sand-100)]">
        <div className="container-page max-w-3xl">
          <ConsultationForm source="treatment" />
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
