import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaBanner } from "@/components/sections/cta-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { faqPageSchema } from "@/lib/seo/schemas";
import { groupFaqs, faqs } from "@/lib/data/faqs";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "HBOT FAQs — Your Questions Answered",
  description:
    "Frequently asked questions about hyperbaric oxygen therapy at HBOTQ in Woodside, Queens — treatment length, insurance coverage, what to wear, and more.",
  path: "/faqs/",
});

export const dynamic = "force-static";

export default function FaqsPage() {
  const groups = groupFaqs();
  return (
    <>
      <JsonLd data={faqPageSchema(faqs)} />
      <Hero
        variant="page"
        eyebrow="FAQ"
        title="The questions patients ask us most."
        subtitle="Don't see your question? Call us at the number below — we're glad to talk it through."
        primaryCta={{ label: "Book a consultation", href: "/contact-us/" }}
      />
      <TrustBar />
      <FaqSection
        heading="General questions"
        faqs={groups.general}
      />
      <FaqSection
        heading="About treatment"
        faqs={groups.treatment}
      />
      <FaqSection
        heading="Conditions we treat"
        faqs={groups.conditions}
      />
      <FaqSection
        heading="Logistics, insurance & cost"
        faqs={groups.logistics}
      />
      <CtaBanner />
    </>
  );
}
