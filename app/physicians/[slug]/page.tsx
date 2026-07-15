import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { TrustBar } from "@/components/sections/trust-bar";
import { CtaBanner } from "@/components/sections/cta-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { PhysicianCtaButtons } from "@/components/cards/physician-cta-buttons";
import { PhysicianProfileLinks } from "@/components/cards/physician-profile-links";
import { physicians } from "@/lib/data/physicians";
import { medicalBusinessSchema, physicianSchema, breadcrumbSchema } from "@/lib/seo/schemas";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/data/site";

type Params = { slug: string };

export const dynamicParams = false;
export const dynamic = "force-static";

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
      <JsonLd data={medicalBusinessSchema()} />
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
              <PhysicianCtaButtons />
            </div>
          </div>
        </div>
      </section>
      <TrustBar />

      <section className="section bg-white">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_320px]">
          <div className="max-w-2xl">
            {p.highlights?.length ? (
              <ul className="mb-10 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {p.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2.5 text-sm font-medium text-[var(--color-ink)]"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      aria-hidden
                      className="mt-0.5 shrink-0 text-[var(--color-brand-500)]"
                    >
                      <path
                        d="M5 12l4 4L19 7"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                    {h}
                  </li>
                ))}
              </ul>
            ) : null}

            <h2 className="font-display text-2xl lg:text-3xl font-semibold">
              About {p.name.split(",")[0].split(" ").slice(0, 2).join(" ")}
            </h2>
            <div className="mt-5 space-y-4 text-lg text-[var(--color-ink-muted)] leading-relaxed">
              {(p.bioLong ?? [p.bio]).map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>

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
              <PhysicianProfileLinks sameAs={p.sameAs} />
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
