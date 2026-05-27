import Link from "next/link";
import { site } from "@/lib/data/site";

export default function NotFound() {
  return (
    <section className="section bg-[var(--color-sand-100)]">
      <div className="container-page max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-brand-500)]">
          404
        </p>
        <h1 className="mt-3 font-display text-4xl lg:text-5xl font-semibold">
          We can’t find that page.
        </h1>
        <p className="mt-4 text-[var(--color-ink-muted)] text-lg">
          The link may have changed, or the page may no longer exist. Try one
          of the links below — or give us a call.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-[var(--color-brand-500)] text-white px-6 py-3 font-semibold"
          >
            Back to home
          </Link>
          <Link
            href="/conditions/"
            className="inline-flex items-center justify-center rounded-full border border-[var(--color-brand-500)] text-[var(--color-brand-500)] px-6 py-3 font-semibold"
          >
            Conditions we treat
          </Link>
          <a
            href={`tel:${site.phoneE164}`}
            className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] text-white px-6 py-3 font-semibold"
          >
            Call {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
