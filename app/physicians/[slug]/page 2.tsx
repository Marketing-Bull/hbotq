import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { TrustBar } from "@/components/sections/trust-bar";
import { CtaBanner } from "@/components/sections/cta-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { physicians } from "@/lib/data/physicians";
import { physicianSchema, breadcrumbSchema } from "@/lib/seo/schemas";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/data/site";

type Params = { slug: string };

export const dynamicParams = false;
export const dynamic = "force-static";

const PROFILE_LABELS: { match: string; label: string }[] = [
  { match: "healthgrades.com", label: "Healthgrades" },
  { match: "zocdoc.com", label: "Zocdoc" },
  { match: "doximity.com", label: "Doximity" },
  { match: "vitals.com", label: "Vitals" },
  { match: "cms.gov", label: "Medicare (CMS)" },
];

function profileLabel(url: string): string {
  return PROFILE_LABELS.find((p) => url.includes(p.match))?.label ?? "Profile";
}

function getPhysician(slug: string) {
  return physicians.find((p) => p.slug === slug);
}

export function generateStaticParams(): Params[] {
  return physicians.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: { params: Promise<Params> }) {
  const { slug } = await props.params;
  const p = getPhysician(slug);
  if (!p) {
    return buildMetadata({
      title: "Physician not found",
      description: "This profile could not be found.",
      path: `/physicians/${slug}/`,
      noIndex: true,
    });
  }
  return buildMetadata({
    title: `${p.name} — ${p.title}`,
    description: `${p.name}, ${p.title} at HBOTQ in Woodside, Queens. ${p.specialties.join(", ")}.`,
    path: `/physicians/${p.slug}/`,
    image: p.image,
  });
}

export default async function PhysicianDetailPage(props: {
  params: Promise<Params>;
}) {
  const { slug } = await props.params;
  const p = getPhysician(slug);
  if (!p) notFound();

  const facts: { label: string; items: string[] }[] = [];
  if (p.education?.length) facts.push({ label: "Education & Training", items: p.education });
  if (p.affiliations?.length)
    facts.push({ label: "Hospital Affiliations", items: p.affiliations });
  if (p.languages?.length) facts.push({ label: "Languages", items: p.languages });

  return (
    <>
      <JsonLd data={physicianSchema(p)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${site.url}/` },
          { name: "Physicians", url: `${site.url}/physicians/` },
          { name: p.name, url: `${site.url}/physicians/${p.slug}/` },
        ])}
      />

      <section className="bg-[var(--color-sand-100)]">
        <div className="container-page py-14 lg:py-20">
          <p className="text-sm text-[var(--color-ink-muted)]">
            <Link href="/physicians/" className="hover:underline">
              Physicians
            </Link>{" "}
            / <span className="text-[var(--color-ink)]">{p.name}</span>
          </p>
          <div className="mt-8 grid gap-8 lg:grid-cols-[auto_1fr] lg:items-center">
            {p.image ? (
              <div className="relative w-32 h-32 lg:w-44 lg:h-44 rounded-2xl overflow-hidden ring-1 ring-[var(--color-surface-border)]">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  priority
                  sizes="(min-width: 1024px) 176px, 128px"
                  className="object-cover"
                />
              </div>
            ) : null}
            <div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold">
                {p.name}
              </h1>
              <p className="mt-2 text-lg font-semibold text-[var(--color-brand-500)]">
                {p.title}
              </p>
              <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
                {p.credentials.join(" · ")}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/contact-us/"
                  className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] text-white px-6 py-3 font-semibold hover:bg-[var(--color-accent-hover)]"
                >
                  Book a consultation
                </Link>
                <a
                  href={`tel:${site.phoneE164}`}
                  className="inline-flex items-center justify-center rounded-full border border-[var(--color-brand-500)] text-[var(--color-brand-500)] px-6 py-3 font-semibold hover:bg-[var(--color-brand-50)]"
                >
                  Call {site.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <TrustBar />

      <section className="section bg-white">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_320px]">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl lg:text-3xl font-semibold">
              About {p.name.split(",")[0].split(" ").slice(0, 2).join(" ")}
            </h2>
            <p className="mt-5 text-lg text-[var(--color-ink-muted)] leading-relaxed">
              {p.bio}
            </p>

            {p.specialties.length ? (
              <>
                <h3 className="mt-10 font-display text-lg font-semibold">
                  Areas of focus
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.specialties.map((s) => (
                    <span
                      key={s}
                      className="text-sm font-medium px-3 py-1.5 rounded-full bg-[var(--color-sand-200)] text-[var(--color-ink)]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </>
            ) : null}

            <p className="mt-10 text-[var(--color-ink-muted)]">
              See the{" "}
              <Link
                href="/conditions/"
                className="font-semibold text-[var(--color-brand-500)] hover:underline"
              >
                conditions we treat
              </Link>{" "}
              with hyperbaric oxygen therapy.
            </p>
          </div>

          <aside className="space-y-6">
            {facts.map((f) => (
              <div
                key={f.label}
                className="rounded-2xl border border-[var(--color-surface-border)] bg-[var(--color-sand-100)] p-6"
              >
                <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-ink-muted)]">
                  {f.label}
                </h3>
                <ul className="mt-3 space-y-2 text-[var(--color-ink)]">
                  {f.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
            {p.sameAs?.length ? (
              <div className="rounded-2xl border border-[var(--color-surface-border)] bg-white p-6">
                <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-ink-muted)]">
                  Verified profiles
                </h3>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                  {p.sameAs.map((url) => (
                    <a
                      key={url}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-[var(--color-brand-500)] hover:underline"
                    >
                      {profileLabel(url)}
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </aside>
        </div>
      </section>

      <div className="container-page pb-10 text-sm text-[var(--color-ink-muted)]">
        <Link href="/physicians/" className="hover:underline">
          ← All physicians
        </Link>
      </div>

      <CtaBanner />
    </>
  );
}
