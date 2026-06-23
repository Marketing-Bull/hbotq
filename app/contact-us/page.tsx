import { Hero } from "@/components/sections/hero";
import { MapHours } from "@/components/sections/map-hours";
import { ConsultationForm } from "@/components/forms/consultation-form";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo/schemas";
import { site } from "@/lib/data/site";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Contact HBOTQ — Book Your Consultation",
  description:
    "Book a free hyperbaric oxygen therapy consultation at HBOTQ in Woodside, Queens. Call 718-925-3322 or use the form — most messages get a same-day response.",
  path: "/contact-us/",
  image: "/images/og/contact.jpg",
  geo: {
    region: "NY-US",
    placename: "Woodside, Queens",
  },
});

export const dynamic = "force-static";

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${site.url}/` },
          { name: "Contact Us", url: `${site.url}/contact-us/` },
        ])}
      />
      <Hero
        variant="page"
        eyebrow="Contact"
        title="Tell us about your situation."
        subtitle="A short message is enough to start. We’ll review and follow up to schedule a free consultation with our medical team."
      />
      <section className="section bg-white">
        <div className="container-page">
          <div className="grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3">
              <ConsultationForm source="contact-us" />
            </div>
            <aside className="lg:col-span-2">
              <div className="rounded-2xl bg-[var(--color-sand-100)] p-6 lg:p-8">
                <h2 className="font-display text-xl font-semibold">
                  What happens next?
                </h2>
                <ol className="mt-4 space-y-4">
                  <Step
                    num={1}
                    title="We get back to you"
                    body="Usually the same business day. We'll answer questions and confirm whether a consultation makes sense."
                  />
                  <Step
                    num={2}
                    title="Free consultation"
                    body="An in-person visit with our medical team — bring records, your questions, and someone you trust if you’d like."
                  />
                  <Step
                    num={3}
                    title="Plan & coverage"
                    body="If HBOT is a fit, we lay out the protocol, work with your insurer on pre-authorization, and schedule your first treatment."
                  />
                </ol>
              </div>
            </aside>
          </div>
        </div>
      </section>
      <MapHours />
    </>
  );
}

function Step({
  num,
  title,
  body,
}: {
  num: number;
  title: string;
  body: string;
}) {
  return (
    <li className="flex gap-4">
      <span className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-brand-500)] text-white text-sm font-semibold">
        {num}
      </span>
      <div>
        <p className="font-semibold text-[var(--color-ink)]">{title}</p>
        <p className="text-sm text-[var(--color-ink-muted)]">{body}</p>
      </div>
    </li>
  );
}
