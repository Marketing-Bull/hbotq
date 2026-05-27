import { Hero } from "@/components/sections/hero";

interface LegalPageProps {
  eyebrow?: string;
  title: string;
  subtitle: string;
  lastUpdated: string;
  draft?: boolean;
  children: React.ReactNode;
}

export function LegalPage({
  eyebrow = "Legal",
  title,
  subtitle,
  lastUpdated,
  draft = false,
  children,
}: LegalPageProps) {
  return (
    <>
      <Hero
        variant="page"
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
      />
      <section className="section bg-white">
        <div className="container-page max-w-3xl">
          <p className="text-sm text-[var(--color-ink-muted)] mb-8">
            <strong className="text-[var(--color-ink)]">Last updated:</strong>{" "}
            {lastUpdated}
          </p>
          {draft ? (
            <div
              role="note"
              className="mb-8 rounded-lg border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/5 p-4 text-sm text-[var(--color-ink)]"
            >
              <strong className="text-[var(--color-accent)]">Draft.</strong>{" "}
              This document is a working draft prepared for review by HBOTQ’s
              counsel. It does not constitute legal advice and may change
              before it becomes the binding version of this policy.
            </div>
          ) : null}
          <article className="space-y-8 text-[var(--color-ink-muted)] leading-relaxed legal-prose">
            {children}
          </article>
        </div>
      </section>
    </>
  );
}

export function LegalH2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[var(--color-ink)] font-display text-2xl mt-2 mb-3 scroll-mt-24">
      {children}
    </h2>
  );
}

export function LegalH3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[var(--color-ink)] font-display text-xl mt-6 mb-2">
      {children}
    </h3>
  );
}
