import Link from "next/link";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { CtaBanner } from "@/components/sections/cta-banner";
import { VideoEmbed } from "@/components/media/video-embed";
import { JsonLd } from "@/components/seo/json-ld";
import { conditionVideos, topicVideos, videos } from "@/lib/data/videos";
import { getCondition } from "@/lib/data/conditions";
import { videoObjectSchema } from "@/lib/seo/schemas";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Video Library — Hyperbaric Oxygen Therapy Explained",
  description:
    "Short videos from the HBOTQ team explaining how hyperbaric oxygen therapy helps with non-healing wounds, diabetic ulcers, radiation injury, sudden hearing loss, and more.",
  path: "/videos/",
});

export const dynamic = "force-static";

export default function VideosPage() {
  return (
    <>
      {videos.map((v) => (
        <JsonLd key={v.id} data={videoObjectSchema(v)} />
      ))}
      <Hero
        variant="page"
        eyebrow="Video Library"
        title="Hyperbaric oxygen therapy, explained."
        subtitle="Short explainers from our team on how HBOT works and the conditions we treat — straight from the physicians who deliver the care."
        primaryCta={{ label: "Book a consultation", href: "/contact-us/" }}
      />
      <TrustBar />

      <section className="section bg-white">
        <div className="container-page">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl lg:text-4xl font-semibold">
              Conditions we treat
            </h2>
            <p className="mt-4 text-lg text-[var(--color-ink-muted)]">
              Each video pairs with a deeper look at the condition and how we
              approach it.
            </p>
          </div>
          <div className="mt-12 grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {conditionVideos.map((v) => {
              const condition = v.conditionSlug
                ? getCondition(v.conditionSlug)
                : undefined;
              return (
                <div key={v.id}>
                  <VideoEmbed id={v.id} title={v.title} />
                  <h3 className="mt-4 font-display text-lg font-semibold text-[var(--color-ink)]">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-[var(--color-ink-muted)]">
                    {v.description}
                  </p>
                  {condition ? (
                    <Link
                      href={`/condition/${condition.slug}/`}
                      className="mt-3 inline-block text-sm font-semibold text-[var(--color-brand-500)] hover:underline"
                    >
                      More on {condition.shortName.toLowerCase()} →
                    </Link>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section bg-[var(--color-sand-100)]">
        <div className="container-page">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl lg:text-4xl font-semibold">
              More topics
            </h2>
            <p className="mt-4 text-lg text-[var(--color-ink-muted)]">
              Other ways patients across NYC use hyperbaric oxygen therapy.
            </p>
          </div>
          <div className="mt-12 grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {topicVideos.map((v) => (
              <div key={v.id}>
                <VideoEmbed id={v.id} title={v.title} />
                <h3 className="mt-4 font-display text-lg font-semibold text-[var(--color-ink)]">
                  {v.title}
                </h3>
                <p className="mt-2 text-[var(--color-ink-muted)]">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
