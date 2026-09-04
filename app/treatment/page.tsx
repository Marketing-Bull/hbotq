import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { WhatIsHbot } from "@/components/sections/what-is-hbot";
import { WhatToExpect } from "@/components/sections/what-to-expect";
import { BenefitsGrid } from "@/components/sections/benefits-grid";
import { RelaxBreathe } from "@/components/sections/relax-breathe";
import { ConsultationForm } from "@/components/forms/consultation-form";
import { CtaBanner } from "@/components/sections/cta-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo/schemas";
import { site } from "@/lib/data/site";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "HBOT Treatment in NYC — How It Works",
  description:
    "How hyperbaric oxygen therapy works at HBOTQ in Woodside, Queens — the science of pressurized oxygen and what a session actually looks like.",
  path: "/treatment/",
  image: "/images/og/treatment.jpg",
});

export const dynamic = "force-static";

export default function TreatmentPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${site.url}/` },
          { name: "Treatment", url: `${site.url}/treatment/` },
        ])}
      />
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
