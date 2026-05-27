import Image from "next/image";

export function WhatIsHbot() {
  return (
    <section className="section bg-[var(--color-sand-100)]">
      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-brand-500)]">
              The Science
            </p>
            <h2 className="mt-3 font-display text-3xl lg:text-4xl font-semibold">
              What is hyperbaric oxygen therapy?
            </h2>
            <p className="mt-6 text-lg text-[var(--color-ink-muted)] leading-relaxed">
              Hyperbaric oxygen therapy (HBOT) is a medical treatment in which
              you breathe 100% oxygen inside a pressurized chamber. The
              increased atmospheric pressure dissolves dramatically more
              oxygen into your plasma than is possible at sea level, so oxygen
              can reach tissue that compromised blood vessels can no longer
              feed.
            </p>
            <p className="mt-4 text-lg text-[var(--color-ink-muted)] leading-relaxed">
              That additional oxygen drives the cellular processes behind
              wound closure, infection control, and tissue repair — and it
              powers the FDA-approved indications we treat every day.
            </p>
            <div className="mt-8 rounded-2xl bg-white border border-[var(--color-surface-border)] p-6">
              <h3 className="font-display text-lg font-semibold text-[var(--color-brand-500)]">
                Inside the chamber
              </h3>
              <ul className="mt-4 space-y-4">
                <Step
                  num="1"
                  label="Compression"
                  detail="Gentle, gradual increase to treatment pressure (10–15 minutes)."
                />
                <Step
                  num="2"
                  label="Treatment"
                  detail="~90 minutes breathing 100% medical-grade oxygen."
                />
                <Step
                  num="3"
                  label="Decompression"
                  detail="Gradual return to normal pressure, supervised by your technician."
                />
              </ul>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-[var(--color-surface-border)] shadow-sm">
            <Image
              src="/images/facility/chamber.jpg"
              alt="Hard-shell hyperbaric oxygen chamber at HBOTQ"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Step({
  num,
  label,
  detail,
}: {
  num: string;
  label: string;
  detail: string;
}) {
  return (
    <li className="flex gap-4">
      <span className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full bg-[var(--color-brand-500)] text-white font-semibold">
        {num}
      </span>
      <div>
        <p className="font-semibold text-[var(--color-ink)]">{label}</p>
        <p className="text-sm text-[var(--color-ink-muted)]">{detail}</p>
      </div>
    </li>
  );
}
