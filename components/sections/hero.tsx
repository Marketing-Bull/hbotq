import Link from "next/link";
import { site } from "@/lib/data/site";

type HeroVariant = "home" | "condition" | "lp" | "page";

interface HeroProps {
  variant?: HeroVariant;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  image?: string;
}

export function Hero({
  variant = "home",
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
}: HeroProps) {
  const isHome = variant === "home";
  const isLp = variant === "lp";

  return (
    <section
      className="relative bg-[var(--color-sand-100)] overflow-hidden"
      aria-labelledby="hero-title"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, var(--color-brand-500) 0, transparent 40%), radial-gradient(circle at 80% 60%, var(--color-accent) 0, transparent 35%)",
        }}
      />
      <div className="container-page relative z-10 py-16 md:py-24 lg:py-32">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-brand-500)] mb-4">
              {eyebrow}
            </p>
          ) : null}
          <h1
            id="hero-title"
            className={`font-display font-semibold text-[var(--color-ink)] ${
              isHome
                ? "text-4xl sm:text-5xl lg:text-6xl"
                : "text-3xl sm:text-4xl lg:text-5xl"
            }`}
          >
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-6 text-lg lg:text-xl text-[var(--color-ink-muted)] max-w-2xl">
              {subtitle}
            </p>
          ) : null}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {primaryCta ? (
              <Link
                href={primaryCta.href}
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] text-white px-7 py-3.5 font-semibold hover:bg-[var(--color-accent-hover)] transition-colors"
              >
                {primaryCta.label}
              </Link>
            ) : null}
            {secondaryCta ? (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center justify-center rounded-full border border-[var(--color-brand-500)] text-[var(--color-brand-500)] px-7 py-3.5 font-semibold hover:bg-[var(--color-brand-50)] transition-colors"
              >
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>

          {isHome || isLp ? (
            <p className="mt-6 text-sm text-[var(--color-ink-muted)]">
              Or call us directly:{" "}
              <a
                href={`tel:${site.phoneE164}`}
                className="text-[var(--color-brand-500)] font-semibold hover:underline"
              >
                {site.phone}
              </a>
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
