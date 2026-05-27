import Link from "next/link";
import Image from "next/image";
import { getCondition } from "@/lib/data/conditions";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/data/site";
import { Reveal } from "./reveal";
import {
  PulsingOxygenDiagram,
  AnimatedHealingCurve,
} from "./animated-diagrams";

export const metadata = buildMetadata({
  title: "Sample — Editorial Design Direction",
  description:
    "Design sandbox: editorial / longform direction applied to the non-healing-wounds condition page.",
  path: "/sample/non-healing-wounds/",
  noIndex: true,
});

export const dynamic = "force-static";

const SLUG = "non-healing-wounds";

export default function SamplePage() {
  const c = getCondition(SLUG);
  if (!c) return null;

  return (
    <article className="bg-[#FBF6EC] text-[#1A2424]">
      {/* MASTHEAD STRIP */}
      <header className="border-b border-[#1A2424]/15">
        <div className="container-page py-3 flex items-center justify-between text-[11px] uppercase tracking-[0.2em]">
          <Link
            href="/condition/non-healing-wounds/"
            className="hover:underline"
          >
            ← Back to live version
          </Link>
          <span className="opacity-60">Issue 01 · Sample direction</span>
        </div>
      </header>

      {/* HERO — text + cinematic portrait strip */}
      <section className="container-page py-16 lg:py-24">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <Reveal className="col-span-12 lg:col-span-7" variant="up">
            <p className="text-[12px] uppercase tracking-[0.28em] text-[#7A4A2E] mb-8">
              {c.fdaStatus === "on-label"
                ? "FDA-Approved Indication"
                : "Off-Label Use"}
              {" · "}Volume 1 · The Wound Series
            </p>
            <h1 className="font-display text-[44px] sm:text-6xl lg:text-[88px] xl:text-[104px] leading-[0.95] tracking-[-0.025em] font-medium">
              The wound that
              <br />
              wouldn’t heal,
              <br />
              <span className="italic text-[#0E5C5E]">until it could.</span>
            </h1>
            <p className="mt-10 text-lg lg:text-xl leading-[1.7] max-w-2xl text-[#3A4A4A]">
              {c.summary}
            </p>
          </Reveal>

          <Reveal
            className="col-span-12 lg:col-span-5 lg:pt-16"
            variant="up"
            delay={150}
          >
            <figure className="relative aspect-[3/4] w-full overflow-hidden border border-[#1A2424]/15">
              <Image
                src="/images/hero/patient-in-chamber.jpg"
                alt="A patient resting inside a hard-shell hyperbaric chamber at HBOTQ"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover hero-zoom"
                style={{ objectPosition: "center" }}
              />
              <style
                dangerouslySetInnerHTML={{
                  __html: `
                    @keyframes heroZoom { from { transform: scale(1.08); } to { transform: scale(1); } }
                    .hero-zoom { animation: heroZoom 1600ms cubic-bezier(0.22, 0.61, 0.36, 1) both; }
                    @media (prefers-reduced-motion: reduce) {
                      .hero-zoom { animation: none !important; }
                    }
                  `,
                }}
              />
            </figure>
            <figcaption className="mt-3 text-[11px] uppercase tracking-[0.22em] text-[#7A4A2E]">
              In the chamber · HBOTQ Woodside
            </figcaption>
          </Reveal>
        </div>
      </section>

      {/* OPENER with drop cap + margin caption */}
      <section className="container-page pb-20">
        <div className="grid grid-cols-12 gap-x-6">
          <Reveal
            className="hidden lg:block lg:col-span-2 pt-3"

          >
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#7A4A2E]">
              I. Mechanism
            </p>
            <p className="mt-2 text-sm text-[#3A4A4A] italic">
              How pressurized oxygen reaches starved tissue
            </p>
          </Reveal>

          <Reveal className="col-span-12 lg:col-span-7" delay={120}>
            <p className="text-[19px] lg:text-[20px] leading-[1.75] text-[#1A2424] first-letter:font-display first-letter:text-[78px] first-letter:leading-[0.85] first-letter:float-left first-letter:mr-3 first-letter:mt-2 first-letter:text-[#0E5C5E]">
              {c.howHbotHelps}
            </p>
          </Reveal>

          <Reveal
            className="hidden lg:block lg:col-span-2 lg:col-start-11 pt-3"

            delay={240}
          >
            <figure className="text-xs text-[#3A4A4A]">
              <span className="block text-[10px] uppercase tracking-[0.2em] text-[#7A4A2E] mb-1">
                Fig. 1
              </span>
              <em className="not-italic">
                Plasma carries ~20× more dissolved O₂ at treatment pressure.
              </em>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* DIAGRAM SECTION — animated O2 dots */}
      <section className="border-y border-[#1A2424]/15 bg-[#F5EFE4]">
        <div className="container-page py-16 lg:py-20">
          <div className="grid grid-cols-12 gap-x-6 gap-y-8 items-center">
            <Reveal className="col-span-12 lg:col-span-5">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#7A4A2E] mb-3">
                Diagram · How HBOT delivers oxygen
              </p>
              <h2 className="font-display text-3xl lg:text-4xl leading-tight">
                The same blood,
                <br />
                <span className="italic">carrying more oxygen.</span>
              </h2>
              <p className="mt-5 text-base lg:text-lg leading-relaxed text-[#3A4A4A] max-w-md">
                At sea level, oxygen is almost entirely bound to hemoglobin. In
                the chamber, it dissolves directly into your plasma — and
                reaches tissue that compromised vessels can no longer feed.
              </p>
            </Reveal>
            <Reveal
              className="col-span-12 lg:col-span-7"
              variant="scale"
              delay={150}
            >
              <PulsingOxygenDiagram />
            </Reveal>
          </div>
        </div>
      </section>

      {/* FULL-BLEED PHOTO BREAK — chamber as quiet section divider */}
      <section className="relative w-full">
        <div className="relative h-[50vh] min-h-[420px] max-h-[640px] w-full overflow-hidden">
          <Image
            src="/images/facility/chamber.jpg"
            alt="Hard-shell hyperbaric oxygen chamber at HBOTQ"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-[#0E5C5E]/60 via-transparent to-[#0E5C5E]/30"
          />
          <Reveal
            className="absolute inset-0 flex items-end"
            delay={200}
          >
            <div className="container-page pb-10 lg:pb-14">
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#F5EFE4]/80 mb-2">
                Figure · The chamber, 65-35 Queens Blvd
              </p>
              <p className="font-display italic text-2xl sm:text-3xl lg:text-4xl text-white max-w-2xl">
                A pressurized room, a quiet ninety minutes, and biology
                doing its work.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION II — Who benefits */}
      {c.sections[0] ? (
        <section className="container-page py-20 lg:py-28">
          <div className="grid grid-cols-12 gap-x-6 gap-y-8">
            <Reveal
              className="hidden lg:block lg:col-span-2 pt-3"

            >
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#7A4A2E]">
                II. Candidates
              </p>
            </Reveal>
            <Reveal className="col-span-12 lg:col-span-7" delay={100}>
              <h2 className="font-display text-3xl lg:text-5xl leading-[1.05] tracking-tight">
                {c.sections[0].heading}
              </h2>
              <p className="mt-6 text-lg leading-[1.75] text-[#3A4A4A]">
                {c.sections[0].body}
              </p>
              {c.sections[0].bullets?.length ? (
                <ul className="mt-8 divide-y divide-[#1A2424]/15 border-y border-[#1A2424]/15">
                  {c.sections[0].bullets.map((b, idx) => (
                    <li
                      key={b}
                      className="flex gap-6 py-4 text-[#1A2424]"
                    >
                      <span className="font-display text-2xl text-[#0E5C5E] tabular-nums w-8">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="text-base lg:text-lg leading-snug pt-1">
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* PULL QUOTE — scale-in */}
      <section className="container-page py-16 lg:py-24">
        <div className="grid grid-cols-12 gap-x-6">
          <Reveal
            className="col-span-12 lg:col-span-10 lg:col-start-2 text-center"
            variant="scale"
          >
            <blockquote>
              <p className="font-display text-3xl sm:text-4xl lg:text-6xl leading-[1.1] tracking-tight text-[#0E5C5E]">
                <span className="text-[#E07856]">“</span>The wounds that
                respond best are ones where{" "}
                <em className="not-italic underline decoration-[#E07856]/60 underline-offset-[10px] decoration-[3px]">
                  oxygen delivery
                </em>{" "}
                is the rate-limiting factor.
                <span className="text-[#E07856]">”</span>
              </p>
              <footer className="mt-8 text-xs uppercase tracking-[0.22em] text-[#7A4A2E]">
                From the clinical notes · HBOTQ Woodside
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* SECTION III — Protocol with physician inset + session diagram */}
      {c.sections[1] ? (
        <section className="border-t border-[#1A2424]/15">
          <div className="container-page py-20 lg:py-28">
            <div className="grid grid-cols-12 gap-x-6 gap-y-10">
              <Reveal
                className="hidden lg:block lg:col-span-2 pt-3"

              >
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#7A4A2E]">
                  III. Protocol
                </p>
              </Reveal>
              <Reveal className="col-span-12 lg:col-span-6" delay={80}>
                <h2 className="font-display text-3xl lg:text-5xl leading-[1.05]">
                  {c.sections[1].heading}
                </h2>
                <p className="mt-6 text-lg leading-[1.75] text-[#3A4A4A]">
                  {c.sections[1].body}
                </p>

                {/* Physician inset */}
                <figure className="mt-10 flex items-center gap-5 border-t border-[#1A2424]/15 pt-6">
                  <div className="relative w-20 h-20 overflow-hidden rounded-full ring-1 ring-[#1A2424]/15 shrink-0">
                    <Image
                      src="/images/physicians/dr-sadhnani.webp"
                      alt="Dr. Manoj Sadhnani"
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="text-sm leading-snug">
                    <span className="block text-[10px] uppercase tracking-[0.22em] text-[#7A4A2E] mb-1">
                      Treating physician
                    </span>
                    <span className="font-display text-xl text-[#1A2424]">
                      Dr. Manoj Sadhnani
                    </span>
                    <span className="block text-[#3A4A4A] mt-1 italic">
                      Board-certified podiatric physician &amp; surgeon
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
              <Reveal
                className="col-span-12 lg:col-span-4"
                delay={200}
                variant="scale"
              >
                <SessionDiagram />
              </Reveal>
            </div>
          </div>
        </section>
      ) : null}

      {/* SECTION IV — Trajectory with animated curve */}
      {c.sections[2] ? (
        <section className="bg-[#0E5C5E] text-[#F5EFE4]">
          <div className="container-page py-20 lg:py-28">
            <div className="grid grid-cols-12 gap-x-6 gap-y-10">
              <Reveal
                className="hidden lg:block lg:col-span-2 pt-3"

              >
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#E8DDC7]">
                  IV. Trajectory
                </p>
              </Reveal>
              <Reveal className="col-span-12 lg:col-span-8" delay={80}>
                <h2 className="font-display text-3xl lg:text-5xl leading-[1.05] text-[#F5EFE4]">
                  {c.sections[2].heading}
                </h2>
                <p className="mt-6 text-lg leading-[1.75] text-[#E8DDC7] max-w-2xl">
                  {c.sections[2].body}
                </p>
                <AnimatedHealingCurve />
              </Reveal>
            </div>
          </div>
        </section>
      ) : null}

      {/* OUTCOMES */}
      <section className="container-page py-20 lg:py-28">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <Reveal className="hidden lg:block lg:col-span-2 pt-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#7A4A2E]">
              V. Outcomes
            </p>
          </Reveal>
          <Reveal className="col-span-12 lg:col-span-9" delay={80}>
            <h2 className="font-display text-3xl lg:text-5xl leading-[1.05]">
              Why patients with chronic wounds
              <br />
              <em className="not-italic text-[#0E5C5E]">choose us.</em>
            </h2>
            <ol className="mt-10 space-y-8 max-w-3xl">
              {c.benefits.map((b, i) => (
                <Reveal

                  key={b}
                  delay={i * 60}
                  className="grid grid-cols-[auto_1fr] gap-6 items-baseline border-b border-[#1A2424]/15 pb-6 last:border-0"
                >
                  <span className="font-display text-4xl lg:text-5xl text-[#0E5C5E] tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-lg lg:text-xl leading-snug">{b}</p>
                </Reveal>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Letter-style testimonial */}
      <section className="bg-[#F5EFE4] border-y border-[#1A2424]/15">
        <div className="container-page py-20 lg:py-28">
          <div className="grid grid-cols-12 gap-x-6">
            <Reveal className="col-span-12 lg:col-span-8 lg:col-start-3">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#7A4A2E] mb-6">
                From a patient · Diabetic foot ulcer
              </p>
              <figure className="bg-[#FBF6EC] border border-[#1A2424]/15 p-8 lg:p-12 rounded-[2px]">
                <p className="font-display text-2xl lg:text-3xl italic leading-snug text-[#1A2424]">
                  “After a year of failed wound treatments, my foot finally
                  closed after a few weeks at HBOTQ. The team explained
                  every step and I never felt rushed.”
                </p>
                <figcaption className="mt-8 flex items-center gap-4">
                  <span className="w-10 h-px bg-[#1A2424]/40" />
                  <span className="text-sm uppercase tracking-[0.18em] text-[#3A4A4A]">
                    Patricia L., Woodside
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CLOSING with quiet image */}
      <section className="container-page py-24 lg:py-32">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12 items-center">
          <Reveal className="col-span-12 lg:col-span-7">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#7A4A2E] mb-8">
              VI. Next step
            </p>
            <h2 className="font-display text-4xl lg:text-6xl leading-[1.05] tracking-tight">
              If your wound has waited
              <br />
              <em className="not-italic text-[#0E5C5E]">long enough,</em>
              <br />
              we are right here.
            </h2>
            <p className="mt-8 text-lg text-[#3A4A4A] max-w-xl">
              A free consultation with our medical team — in Woodside,
              Queens. No commitment. We’ll tell you honestly whether HBOT can
              help.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/contact-us/"
                className="inline-flex items-center justify-center bg-[#E07856] text-white px-8 py-4 text-sm tracking-[0.15em] uppercase font-semibold hover:bg-[#C8623F] transition-colors"
              >
                Book a consultation
              </Link>
              <a
                href={`tel:${site.phoneE164}`}
                className="inline-flex items-center justify-center border border-[#1A2424]/40 px-8 py-4 text-sm tracking-[0.15em] uppercase font-semibold text-[#1A2424] hover:bg-[#1A2424] hover:text-[#FBF6EC] transition-colors"
              >
                Call {site.phone}
              </a>
            </div>
          </Reveal>
          <Reveal className="col-span-12 lg:col-span-5" delay={150} variant="up">
            <figure className="relative aspect-[4/5] w-full overflow-hidden border border-[#1A2424]/15">
              <Image
                src="/images/conditions/service.webp"
                alt="HBOTQ wound-care visit"
                fill
                sizes="(min-width: 1024px) 36vw, 100vw"
                className="object-cover"
              />
            </figure>
            <figcaption className="mt-3 text-[11px] uppercase tracking-[0.22em] text-[#7A4A2E]">
              Wound consult · HBOTQ Woodside
            </figcaption>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-[#1A2424]/15">
        <div className="container-page py-8 flex flex-col sm:flex-row justify-between gap-3 text-[11px] uppercase tracking-[0.22em] text-[#3A4A4A]">
          <span>HBOTQ · Woodside, Queens</span>
          <Link
            href="/condition/non-healing-wounds/"
            className="hover:text-[#1A2424]"
          >
            View the live version →
          </Link>
        </div>
      </footer>
    </article>
  );
}

/* SessionDiagram is still server-rendered SVG (no motion needed) */
function SessionDiagram() {
  return (
    <figure className="border border-[#1A2424]/15 p-5">
      <figcaption className="text-[10px] uppercase tracking-[0.22em] text-[#7A4A2E] mb-3">
        Fig. 2 · A single session
      </figcaption>
      <svg
        viewBox="0 0 200 220"
        role="img"
        aria-label="Session timeline: compression, treatment, decompression"
        className="w-full h-auto"
      >
        <rect x="20" y="20" width="160" height="36" fill="#E8DDC7" />
        <rect x="20" y="60" width="160" height="100" fill="#0E5C5E" />
        <rect x="20" y="164" width="160" height="36" fill="#E8DDC7" />

        <text x="30" y="42" fontFamily="Fraunces" fontSize="13" fill="#1A2424">
          Compression
        </text>
        <text x="30" y="54" fontFamily="Inter" fontSize="9" fill="#3A4A4A">
          ~15 min
        </text>

        <text x="30" y="90" fontFamily="Fraunces" fontSize="15" fill="#F5EFE4">
          Treatment
        </text>
        <text x="30" y="105" fontFamily="Inter" fontSize="9" fill="#E8DDC7">
          ~90 min · 100% O₂
        </text>

        <text x="30" y="186" fontFamily="Fraunces" fontSize="13" fill="#1A2424">
          Decompression
        </text>
        <text x="30" y="198" fontFamily="Inter" fontSize="9" fill="#3A4A4A">
          ~15 min
        </text>
      </svg>
    </figure>
  );
}
