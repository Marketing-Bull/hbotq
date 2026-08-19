import Image from "next/image";
import { site } from "@/lib/data/site";
import { BlobsHero } from "@/components/ui/background-blobs";
import {
  TrackedAnchor,
  TrackedLink,
} from "@/components/analytics/tracked-link";

/**
 * Hero CTAs are data-driven, and several pages pass a `tel:` href as the
 * secondary CTA (condition, locations and wellness detail pages). Route those
 * through a plain tracked anchor with the `phone_call` category instead of
 * next/link + `cta_click`, so a call from the hero is reported as the phone
 * conversion it actually is.
 */
function HeroCta({
  cta,
  className,
}: {
  cta: { label: string; href: string };
  className: string;
}) {
  const scheme = cta.href.startsWith("tel:")
    ? "phone_call"
    : cta.href.startsWith("mailto:")
      ? "mailto"
      : null;

  if (scheme) {
    return (
      <TrackedAnchor
        href={cta.href}
        category={scheme}
        location="hero"
        ctaLabel={scheme === "phone_call" ? "call_cta" : "email_cta"}
        className={className}
      >
        {cta.label}
      </TrackedAnchor>
    );
  }

  return (
    <TrackedLink
      href={cta.href}
      location="hero"
      ctaLabel={cta.label}
      className={className}
    >
      {cta.label}
    </TrackedLink>
  );
}

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
  /** Short trust signals shown as chips beneath the CTAs */
  highlights?: string[];
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
  highlights,
}: HeroProps) {
  const isHome = variant === "home";
  const isLp = variant === "lp";
  const hasImage = Boolean(image);

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: isHome
          ? "linear-gradient(135deg, var(--color-brand-900) 0%, var(--color-brand-700) 45%, var(--color-brand-800) 100%)"
          : "linear-gradient(135deg, var(--color-brand-800) 0%, var(--color-brand-600) 100%)",
      }}
      aria-labelledby="hero-title"
    >
      <BlobsHero />

      {/* Light-ray sweep across top */}
      <div
        aria-hidden
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{
          background:
            "linear-gradient(105deg, rgba(255,255,255,0.04) 0%, transparent 40%, rgba(255,255,255,0.02) 60%, transparent 100%)",
        }}
      />
      <div
        className={`container-page relative z-10 py-16 md:py-24 lg:py-32 ${
          hasImage ? "lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center" : ""
        }`}
      >
        <div className={hasImage ? "max-w-xl" : "max-w-3xl"}>
          {eyebrow ? (
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-brand-200)] mb-4">
              {eyebrow}
            </p>
          ) : null}
          <h1
            id="hero-title"
            className={`font-display font-semibold text-white ${ 
              isHome
                ? "text-4xl sm:text-5xl lg:text-6xl"
                : "text-3xl sm:text-4xl lg:text-5xl"
            }`}
          >
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-6 text-lg lg:text-xl text-[var(--color-brand-100)] max-w-2xl opacity-90">
              {subtitle}
            </p>
          ) : null}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {primaryCta ? (
              <HeroCta
                cta={primaryCta}
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] text-white px-7 py-3.5 font-semibold hover:bg-[var(--color-accent-hover)] transition-colors shadow-lg shadow-[var(--color-accent)]/30"
              />
            ) : null}
            {secondaryCta ? (
              <HeroCta
                cta={secondaryCta}
                className="inline-flex items-center justify-center rounded-full border border-white/30 text-white px-7 py-3.5 font-semibold hover:bg-white/10 transition-colors backdrop-blur-sm"
              />
            ) : null}
          </div>

          {isHome || isLp ? (
            <p className="mt-6 text-sm text-[var(--color-brand-100)] opacity-75">
              Or call us directly:{" "}
              <TrackedAnchor
                href={`tel:${site.phoneE164}`}
                category="phone_call"
                location="hero"
                ctaLabel="call_cta"
                className="text-white font-semibold hover:underline opacity-100"
              >
                {site.phone}
              </TrackedAnchor>
            </p>
          ) : null}

          {highlights?.length ? (
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2.5">
              {highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-center gap-2 text-sm font-medium text-white/80"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    aria-hidden
                    className="shrink-0 text-[var(--color-brand-300)]"
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
        </div>

        {hasImage ? (
          <div className="mt-12 lg:mt-0 lg:justify-self-end w-full">
            <div className="relative aspect-[4/3] lg:aspect-[5/4] w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              <Image
                src={image!}
                alt={imageAlt}
                fill
                priority={priority}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              {/* Subtle inner glow overlay on image */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-2xl"
                style={{
                  boxShadow: "inset 0 0 60px rgba(0,0,0,0.3)",
                }}
              />
            </div>
          </div>
        ) : null}
      </div>

      {/* Wave divider — transitions hero into next section */}
      <div aria-hidden className="wave-divider -mb-px">
        <svg
          viewBox="0 0 1440 48"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-12 fill-white"
        >
          <path d="M0,32 C360,0 1080,64 1440,24 L1440,48 L0,48 Z" />
        </svg>
      </div>
    </section>
  );
}
