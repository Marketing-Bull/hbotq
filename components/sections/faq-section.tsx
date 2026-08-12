"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import type { Faq } from "@/types/content";
import { trackEvent } from "@/lib/analytics/track";

export function FaqSection({
  faqs,
  heading = "Frequently asked questions",
  subtitle,
}: {
  faqs: Faq[];
  heading?: string;
  subtitle?: string;
}) {
  return (
    <section className="section bg-white">
      <div className="container-page max-w-4xl">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-brand-500)]">
            FAQ
          </p>
          <h2 className="mt-3 font-display text-3xl lg:text-4xl font-semibold">
            {heading}
          </h2>
          {subtitle ? (
            <p className="mt-4 text-lg text-[var(--color-ink-muted)]">
              {subtitle}
            </p>
          ) : null}
        </div>
        <ul className="divide-y divide-[var(--color-surface-border)] border-y border-[var(--color-surface-border)]">
          {faqs.map((f, idx) => (
            <FaqRow
              key={f.id}
              faq={f}
              defaultOpen={idx === 0}
              sectionHeading={heading}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

function FaqRow({
  faq,
  defaultOpen,
  sectionHeading,
}: {
  faq: Faq;
  defaultOpen?: boolean;
  sectionHeading: string;
}) {
  const [open, setOpen] = useState(Boolean(defaultOpen));
  const pathname = usePathname();
  return (
    <li>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => {
          const next = !open;
          setOpen(next);
          trackEvent(next ? "faq_expand" : "faq_collapse", {
            faq_id: faq.id,
            faq_category: faq.category,
            faq_question: faq.question,
            faq_section_heading: sectionHeading,
            page: pathname || "/",
          });
        }}
        className="w-full text-left flex items-center justify-between gap-4 py-5"
      >
        <span className="font-semibold text-[var(--color-ink)]">
          {faq.question}
        </span>
        <span
          aria-hidden
          className={`shrink-0 w-7 h-7 rounded-full border border-[var(--color-surface-border)] flex items-center justify-center transition-transform ${
            open ? "rotate-45 bg-[var(--color-brand-500)] text-white border-transparent" : "text-[var(--color-ink)]"
          }`}
        >
          +
        </span>
      </button>
      {open ? (
        <div className="pb-5 pr-10 text-[var(--color-ink-muted)] leading-relaxed">
          {faq.answer}
        </div>
      ) : null}
    </li>
  );
}
