import Link from "next/link";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { CtaBanner } from "@/components/sections/cta-banner";
import { VideoEmbed } from "@/components/media/video-embed";
import { TikTokEmbed } from "@/components/media/tiktok-embed";
import { JsonLd } from "@/components/seo/json-ld";
import {
  conditionVideos,
  topicVideos,
  videos,
  tiktoks,
  TIKTOK_PROFILE_URL,
} from "@/lib/data/videos";
import { getCondition } from "@/lib/data/conditions";
import { medicalBusinessSchema, breadcrumbSchema, videoObjectSchema } from "@/lib/seo/schemas";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/data/site";

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
      <JsonLd data={medicalBusinessSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${site.url}/` },
          { name: "Video Library", url: `${site.url}/videos/` },
        ])}
      />
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

      <section className="section bg-white">
        <div className="container-page">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h2 className="font-display text-3xl lg:text-4xl font-semibold">
                From our TikTok
              </h2>
              <a
                href={TIKTOK_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-[var(--color-brand-500)] hover:underline"
              >
                @hyperbaricqueens →
              </a>
            </div>
            <p className="mt-4 text-lg text-[var(--color-ink-muted)]">
              Quick, everyday looks at how hyperbaric oxygen therapy supports
              healing, recovery, and wellness.
            </p>
          </div>
          <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {tiktoks.map((t) => (
              <TikTokEmbed key={t.id} id={t.id} label={t.label} />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
