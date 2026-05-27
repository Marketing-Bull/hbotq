import Link from "next/link";
import { getCondition } from "@/lib/data/conditions";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/data/site";

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
      {/* MASTHEAD — replaces the standard hero with editorial framing */}
      <header className="border-b border-[#1A2424]/15">
        <div className="container-page py-3 flex items-center justify-between text-[11px] uppercase tracking-[0.2em]">
          <Link href="/condition/non-healing-wounds/" className="hover:underline">
            ← Back to live version
          </Link>
          <span className="opacity-60">Issue 01 · Sample direction</span>
        </div>
      </header>

      <section className="container-page py-20 lg:py-28">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 lg:col-span-8 lg:col-start-3">
            <p className="text-[12px] uppercase tracking-[0.28em] text-[#7A4A2E] mb-8">
              {c.fdaStatus === "on-label" ? "FDA-Approved Indication" : "Off-Label Use"}
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
          </div>
        </div>
      </section>

      {/* OPENER with drop cap + margin caption */}
      <section className="container-page pb-20">
        <div className="grid grid-cols-12 gap-x-6">
          <aside className="hidden lg:block lg:col-span-2 pt-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#7A4A2E]">
              I. Mechanism
            </p>
            <p className="mt-2 text-sm text-[#3A4A4A] italic">
              How pressurized oxygen reaches starved tissue
            </p>
          </aside>

          <div className="col-span-12 lg:col-span-7">
            <p className="text-[19px] lg:text-[20px] leading-[1.75] text-[#1A2424] first-letter:font-display first-letter:text-[78px] first-letter:leading-[0.85] first-letter:float-left first-letter:mr-3 first-letter:mt-2 first-letter:text-[#0E5C5E]">
              {c.howHbotHelps}
            </p>
          </div>

          <aside className="hidden lg:block lg:col-span-2 lg:col-start-11 pt-3">
            <figure className="text-xs text-[#3A4A4A]">
              <span className="block text-[10px] uppercase tracking-[0.2em] text-[#7A4A2E] mb-1">
                Fig. 1
              </span>
              <em className="not-italic">
                Plasma carries ~20× more dissolved O₂ at treatment pressure.
              </em>
            </figure>
          </aside>
        </div>
      </section>

      {/* ILLUSTRATED DIAGRAM — replaces stock photo */}
      <section className="border-y border-[#1A2424]/15 bg-[#F5EFE4]">
        <div className="container-page py-16 lg:py-20">
          <div className="grid grid-cols-12 gap-x-6 gap-y-8 items-center">
            <div className="col-span-12 lg:col-span-5">
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
            </div>
            <div className="col-span-12 lg:col-span-7">
              <OxygenDiagram />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION II — Who benefits */}
      {c.sections[0] ? (
        <section className="container-page py-20 lg:py-28">
          <div className="grid grid-cols-12 gap-x-6 gap-y-8">
            <aside className="hidden lg:block lg:col-span-2 pt-3">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#7A4A2E]">
                II. Candidates
              </p>
            </aside>
            <div className="col-span-12 lg:col-span-7">
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
            </div>
          </div>
        </section>
      ) : null}

      {/* PULL QUOTE — big editorial break */}
      <section className="container-page py-16 lg:py-24">
        <div className="grid grid-cols-12 gap-x-6">
          <blockquote className="col-span-12 lg:col-span-10 lg:col-start-2 text-center">
            <p className="font-display text-3xl sm:text-4xl lg:text-6xl leading-[1.1] tracking-tight text-[#0E5C5E]">
              <span className="text-[#E07856]">“</span>The wounds that respond
              best are ones where{" "}
              <em className="not-italic underline decoration-[#E07856]/60 underline-offset-[10px] decoration-[3px]">
                oxygen delivery
              </em>{" "}
              is the rate-limiting factor.<span className="text-[#E07856]">”</span>
            </p>
            <footer className="mt-8 text-xs uppercase tracking-[0.22em] text-[#7A4A2E]">
              From the clinical notes · HBOTQ Woodside
            </footer>
          </blockquote>
        </div>
      </section>

      {/* SECTION III — Treatment timeline with custom illustration */}
      {c.sections[1] ? (
        <section className="border-t border-[#1A2424]/15">
          <div className="container-page py-20 lg:py-28">
            <div className="grid grid-cols-12 gap-x-6 gap-y-10">
              <aside className="hidden lg:block lg:col-span-2 pt-3">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#7A4A2E]">
                  III. Protocol
                </p>
              </aside>
              <div className="col-span-12 lg:col-span-7">
                <h2 className="font-display text-3xl lg:text-5xl leading-[1.05]">
                  {c.sections[1].heading}
                </h2>
                <p className="mt-6 text-lg leading-[1.75] text-[#3A4A4A]">
                  {c.sections[1].body}
                </p>
              </div>
              <div className="col-span-12 lg:col-span-3">
                <SessionDiagram />
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* SECTION IV — What you can expect */}
      {c.sections[2] ? (
        <section className="bg-[#0E5C5E] text-[#F5EFE4]">
          <div className="container-page py-20 lg:py-28">
            <div className="grid grid-cols-12 gap-x-6 gap-y-10">
              <aside className="hidden lg:block lg:col-span-2 pt-3">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#E8DDC7]">
                  IV. Trajectory
                </p>
              </aside>
              <div className="col-span-12 lg:col-span-8">
                <h2 className="font-display text-3xl lg:text-5xl leading-[1.05] text-[#F5EFE4]">
                  {c.sections[2].heading}
                </h2>
                <p className="mt-6 text-lg leading-[1.75] text-[#E8DDC7] max-w-2xl">
                  {c.sections[2].body}
                </p>

                <HealingCurve />
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* OUTCOMES grid as letterpress numbered list */}
      <section className="container-page py-20 lg:py-28">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <aside className="hidden lg:block lg:col-span-2 pt-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#7A4A2E]">
              V. Outcomes
            </p>
          </aside>
          <div className="col-span-12 lg:col-span-9">
            <h2 className="font-display text-3xl lg:text-5xl leading-[1.05]">
              Why patients with chronic wounds
              <br />
              <em className="not-italic text-[#0E5C5E]">choose us.</em>
            </h2>
            <ol className="mt-10 space-y-8 max-w-3xl">
              {c.benefits.map((b, i) => (
                <li
                  key={b}
                  className="grid grid-cols-[auto_1fr] gap-6 items-baseline border-b border-[#1A2424]/15 pb-6 last:border-0"
                >
                  <span className="font-display text-4xl lg:text-5xl text-[#0E5C5E] tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-lg lg:text-xl leading-snug">{b}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Letter-style testimonial */}
      <section className="bg-[#F5EFE4] border-y border-[#1A2424]/15">
        <div className="container-page py-20 lg:py-28">
          <div className="grid grid-cols-12 gap-x-6">
            <div className="col-span-12 lg:col-span-8 lg:col-start-3">
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
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CALL */}
      <section className="container-page py-24 lg:py-32">
        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12 lg:col-span-8 lg:col-start-3 text-center">
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
            <p className="mt-8 text-lg text-[#3A4A4A] max-w-xl mx-auto">
              A free consultation with our medical team — in Woodside,
              Queens. No commitment. We’ll tell you honestly whether HBOT can
              help.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact-us/"
                className="inline-flex items-center justify-center bg-[#E07856] text-white px-8 py-4 text-sm tracking-[0.15em] uppercase font-semibold hover:bg-[#C8623F]"
              >
                Book a consultation
              </Link>
              <a
                href={`tel:${site.phoneE164}`}
                className="inline-flex items-center justify-center border border-[#1A2424]/40 px-8 py-4 text-sm tracking-[0.15em] uppercase font-semibold text-[#1A2424] hover:bg-[#1A2424] hover:text-[#FBF6EC]"
              >
                Call {site.phone}
              </a>
            </div>
          </div>
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

/* ───────── INLINE SVG DIAGRAMS ───────── */

function OxygenDiagram() {
  return (
    <svg
      viewBox="0 0 520 280"
      role="img"
      aria-label="Oxygen carried in plasma vs hemoglobin at sea level vs treatment pressure"
      className="w-full h-auto"
    >
      {/* Left column — at sea level */}
      <g transform="translate(30,20)">
        <text
          x="0"
          y="0"
          fontFamily="Inter, sans-serif"
          fontSize="11"
          letterSpacing="2"
          fill="#7A4A2E"
        >
          AT SEA LEVEL
        </text>
        <text
          x="0"
          y="22"
          fontFamily="Fraunces, serif"
          fontSize="22"
          fill="#1A2424"
        >
          1.0 ATA
        </text>

        {/* Blood vessel cross-section */}
        <g transform="translate(0,60)">
          <ellipse
            cx="100"
            cy="80"
            rx="100"
            ry="70"
            fill="none"
            stroke="#1A2424"
            strokeWidth="1.2"
          />
          {/* RBCs (red blood cells) - O2 on hemoglobin */}
          {[
            [50, 50],
            [110, 40],
            [165, 75],
            [70, 105],
            [130, 110],
            [40, 85],
          ].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="14" fill="#C53030" opacity="0.85" />
              <circle cx={x - 5} cy={y - 4} r="2" fill="#fff" />
            </g>
          ))}
          {/* sparse plasma O2 */}
          {[
            [85, 70],
            [140, 90],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="2.2" fill="#0E5C5E" />
          ))}
        </g>
      </g>

      {/* Arrow */}
      <g transform="translate(240,140)">
        <line
          x1="0"
          y1="0"
          x2="28"
          y2="0"
          stroke="#1A2424"
          strokeWidth="1.5"
        />
        <path d="M22 -5 L30 0 L22 5" fill="none" stroke="#1A2424" strokeWidth="1.5" />
      </g>

      {/* Right column — at treatment pressure */}
      <g transform="translate(290,20)">
        <text
          x="0"
          y="0"
          fontFamily="Inter, sans-serif"
          fontSize="11"
          letterSpacing="2"
          fill="#7A4A2E"
        >
          IN THE CHAMBER
        </text>
        <text
          x="0"
          y="22"
          fontFamily="Fraunces, serif"
          fontSize="22"
          fill="#1A2424"
        >
          2.4 ATA
        </text>

        <g transform="translate(0,60)">
          <ellipse
            cx="100"
            cy="80"
            rx="100"
            ry="70"
            fill="none"
            stroke="#1A2424"
            strokeWidth="1.2"
          />
          {[
            [50, 50],
            [110, 40],
            [165, 75],
            [70, 105],
            [130, 110],
            [40, 85],
          ].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="14" fill="#C53030" opacity="0.85" />
              <circle cx={x - 5} cy={y - 4} r="2" fill="#fff" />
            </g>
          ))}
          {/* dense plasma O2 dots */}
          {Array.from({ length: 28 }).map((_, i) => {
            const angle = (i / 28) * Math.PI * 2;
            const r = 30 + (i % 3) * 18;
            const x = 100 + Math.cos(angle * 1.3 + i) * r;
            const y = 80 + Math.sin(angle * 1.7 + i) * (r * 0.7);
            return (
              <circle key={i} cx={x} cy={y} r="2.2" fill="#0E5C5E" />
            );
          })}
        </g>
      </g>
    </svg>
  );
}

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
        {/* Phase rectangles */}
        <rect x="20" y="20" width="160" height="36" fill="#E8DDC7" />
        <rect x="20" y="60" width="160" height="100" fill="#0E5C5E" />
        <rect x="20" y="164" width="160" height="36" fill="#E8DDC7" />

        {/* Labels */}
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

function HealingCurve() {
  return (
    <figure className="mt-12">
      <figcaption className="text-[10px] uppercase tracking-[0.22em] text-[#E8DDC7] mb-3">
        Fig. 3 · Wound closure trajectory · weeks 0–8
      </figcaption>
      <svg
        viewBox="0 0 600 200"
        role="img"
        aria-label="Wound closure curve over weeks of treatment"
        className="w-full h-auto"
      >
        {/* Axes */}
        <line x1="40" y1="20" x2="40" y2="170" stroke="#E8DDC7" strokeWidth="1" />
        <line x1="40" y1="170" x2="580" y2="170" stroke="#E8DDC7" strokeWidth="1" />

        {/* y-axis labels */}
        <text x="10" y="30" fontFamily="Inter" fontSize="9" fill="#E8DDC7">
          100%
        </text>
        <text x="10" y="173" fontFamily="Inter" fontSize="9" fill="#E8DDC7">
          0%
        </text>

        {/* x-axis week labels */}
        {[0, 2, 4, 6, 8].map((w, i) => (
          <g key={w}>
            <line
              x1={40 + i * 135}
              y1="170"
              x2={40 + i * 135}
              y2="175"
              stroke="#E8DDC7"
            />
            <text
              x={40 + i * 135}
              y="190"
              textAnchor="middle"
              fontFamily="Inter"
              fontSize="9"
              fill="#E8DDC7"
            >
              wk {w}
            </text>
          </g>
        ))}

        {/* HBOT curve (rising) */}
        <path
          d="M 40 160 Q 175 152, 310 100 T 580 30"
          fill="none"
          stroke="#F5EFE4"
          strokeWidth="3"
        />
        <text
          x="500"
          y="48"
          fontFamily="Fraunces"
          fontSize="13"
          fill="#F5EFE4"
        >
          With HBOT
        </text>

        {/* Standard care curve (flatter) */}
        <path
          d="M 40 160 Q 200 158, 360 145 T 580 130"
          fill="none"
          stroke="#E8DDC7"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        <text
          x="475"
          y="142"
          fontFamily="Inter"
          fontSize="10"
          fill="#E8DDC7"
        >
          Standard care
        </text>
      </svg>
      <p className="mt-3 text-xs text-[#E8DDC7]/70 leading-relaxed">
        Illustrative only · individual results vary based on wound type,
        comorbidities, and adherence to the full care plan.
      </p>
    </figure>
  );
}
