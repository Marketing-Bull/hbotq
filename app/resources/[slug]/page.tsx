import Link from "next/link";
import { notFound } from "next/navigation";
import { TrustBar } from "@/components/sections/trust-bar";
import { CtaBanner } from "@/components/sections/cta-banner";
import { ConditionCard } from "@/components/cards/condition-card";
import { MedicalReviewer } from "@/components/seo/medical-reviewer";
import { JsonLd } from "@/components/seo/json-ld";
import { articles, getArticle } from "@/lib/data/articles";
import { physicians } from "@/lib/data/physicians";
import { getCondition, toConditionListing } from "@/lib/data/conditions";
import { medicalBusinessSchema, articleSchema, breadcrumbSchema } from "@/lib/seo/schemas";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/data/site";

type Params = { slug: string };

export const dynamicParams = false;
export const dynamic = "force-static";

export function generateStaticParams(): Params[] {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(props: { params: Promise<Params> }) {
  const { slug } = await props.params;
  const a = getArticle(slug);
  if (!a) {
    return buildMetadata({
      title: "Article not found",
      description: "This article could not be found.",
      path: `/resources/${slug}/`,
      noIndex: true,
    });
  }
  return buildMetadata({
    title: a.metaTitle,
    description: a.metaDescription,
    path: `/resources/${a.slug}/`,
  });
}

export default async function ArticlePage(props: {
  params: Promise<Params>;
}) {
  const { slug } = await props.params;
  const a = getArticle(slug);
  if (!a) notFound();

  const author =
    physicians.find((p) => p.slug === a.authorSlug) ?? physicians[0];
  const related = (a.relatedConditionSlugs ?? [])
    .map((s) => getCondition(s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <>
      <JsonLd data={medicalBusinessSchema()} />
      <JsonLd
        data={articleSchema({
          title: a.title,
          description: a.metaDescription,
          path: `/resources/${a.slug}/`,
          datePublished: a.datePublished,
          dateModified: a.dateModified,
          author: { name: author.name, title: author.title },
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${site.url}/` },
          { name: "Resources", url: `${site.url}/resources/` },
          { name: a.title, url: `${site.url}/resources/${a.slug}/` },
        ])}
      />

      <article>
        <header className="bg-[var(--color-sand-100)]">
          <div className="container-page max-w-3xl py-16 lg:py-20">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-brand-500)]">
              Resources · {a.readMinutes} min read
            </p>
            <h1 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold">
              {a.title}
            </h1>
            <p className="mt-6 text-lg text-[var(--color-ink-muted)] leading-relaxed">
              {a.excerpt}
            </p>
            <div className="mt-8">
              <MedicalReviewer reviewerSlug={a.authorSlug} />
            </div>
          </div>
        </header>
        <TrustBar />

        <div className="container-page max-w-3xl py-14 lg:py-20">
          {/* Key takeaways */}
          <aside className="rounded-2xl border border-[var(--color-surface-border)] bg-[var(--color-brand-50)] p-6 lg:p-7">
            <h2 className="font-display text-lg font-semibold text-[var(--color-brand-600)]">
              Key takeaways
            </h2>
            <ul className="mt-4 space-y-3">
              {a.keyTakeaways.map((k) => (
                <li
                  key={k}
                  className="flex items-start gap-3 text-[var(--color-ink)]"
                >
                  <svg
                    width="20"
                    height="20"
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
                  {k}
                </li>
              ))}
            </ul>
          </aside>

          {/* Body */}
          <div className="mt-12 space-y-10">
            {a.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="font-display text-2xl font-semibold">
                  {s.heading}
                </h2>
                <p className="mt-4 text-lg text-[var(--color-ink-muted)] leading-relaxed">
                  {s.body}
                </p>
                {s.bullets?.length ? (
                  <ul className="mt-5 space-y-3">
                    {s.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-3 text-[var(--color-ink-muted)]"
                      >
                        <svg
                          width="22"
                          height="22"
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
                        {b}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          {related.length ? (
            <div className="mt-14 border-t border-[var(--color-surface-border)] pt-10">
              <h2 className="font-display text-xl font-semibold">
                Related conditions
              </h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {related.map((c) => (
                  <ConditionCard key={c.slug} listing={toConditionListing(c)} />
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-12 text-sm text-[var(--color-ink-muted)]">
            <Link href="/resources/" className="hover:underline">
              ← All resources
            </Link>
          </div>
        </div>
      </article>

      <CtaBanner />
    </>
  );
}
