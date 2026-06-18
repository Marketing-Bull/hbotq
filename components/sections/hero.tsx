"use client";

import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/data/site";
import { trackClick } from "@/lib/analytics/track";

type HeroVariant = "home" | "condition" | "lp" | "page";

interface HeroProps {
  variant?: HeroVariant;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  image?: string;
  imageAlt?: string;
  priority?: boolean;
}

/**
 * `tel:` and `mailto:` CTAs render as plain `<a>` (not `<Link>`) and fire the
 * right outbound-conversion event. Internal routes get `<Link>` + `cta_click`.
 * T-07: the previous version always rendered `<Link>` and always fired
 * `cta_click`, so the "Call ..." secondary CTA on every `/condition/[slug]/`
 * page was miscategorized in GTM.
 */
function ctaElement(opts: {
  cta: { label: string; href: string };
  variant: HeroVariant;
  variantKey: "primary" | "secondary";
  className: string;
}) {
  const { cta, variant, variantKey, className } = opts;
  const location = `hero_${variant}`;
  const href = cta.href;
  if (href.startsWith("tel:")) {
    return (
      <a
        href={href}
        onClick={trackClick("phone_call", {
          location,
          cta_label: cta.label,
          hero_slot: variantKey,
        })}
        className={className}
      >
        {cta.label}
      </a>
    );
  }
  if (href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        onClick={trackClick("mailto", {
          location,
          cta_label: cta.label,
          hero_slot: variantKey,
        })}
        className={className}
      >
        {cta.label}
      </a>
    );
  }
  return (
    <Link
      href={href}
      onClick={trackClick("cta_click", {
        location,
        cta_label: cta.label,
        hero_slot: variantKey,
      })}
      className={className}
    >
      {cta.label}
    </Link>
  );
}

export function Hero({
  variant = "home",
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  image,
  imageAlt = "",
  priority = false,
}: HeroProps) {
  const isHome = variant === "home";
  const isLp = variant === "lp";
  const hasImage = Boolean(image);

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
      <div
        className={`container-page relative z-10 py-16 md:py-24 lg:py-32 ${
          hasImage ? "lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center" : ""
        }`}
      >
        <div className={hasImage ? "max-w-xl" : "max-w-3xl"}>
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
              ctaElement({
                cta: primaryCta,
                variant,
                variantKey: "primary",
                className:
                  "inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] text-white px-7 py-3.5 font-semibold hover:bg-[var(--color-accent-hover)] transition-colors",
              })
            ) : null}
            {secondaryCta ? (
              ctaElement({
                cta: secondaryCta,
                variant,
                variantKey: "secondary",
                className:
                  "inline-flex items-center justify-center rounded-full border border-[var(--color-brand-500)] text-[var(--color-brand-500)] px-7 py-3.5 font-semibold hover:bg-[var(--color-brand-50)] transition-colors",
              })
            ) : null}
          </div>

          {isHome || isLp ? (
            <p className="mt-6 text-sm text-[var(--color-ink-muted)]">
              Or call us directly:{" "}
              <a
                href={`tel:${site.phoneE164}`}
                onClick={trackClick("phone_call", { location: "hero" })}
                className="text-[var(--color-brand-500)] font-semibold hover:underline"
              >
                {site.phone}
              </a>
            </p>
          ) : null}
        </div>

        {hasImage ? (
          <div className="mt-12 lg:mt-0 lg:justify-self-end w-full">
            <div className="relative aspect-[4/3] lg:aspect-[5/4] w-full max-w-xl rounded-2xl overflow-hidden shadow-lg ring-1 ring-[var(--color-surface-border)]">
              <Image
                src={image!}
                alt={imageAlt}
                fill
                priority={priority}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
