"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  consultationSchema,
  CONDITION_OPTIONS,
  type ConsultationInput,
} from "@/lib/validation/consultation";
import { site } from "@/lib/data/site";
import { trackEvent } from "@/lib/analytics/track";

interface Props {
  source?: string;
  defaultCondition?: ConsultationInput["condition"];
  compact?: boolean;
  heading?: string;
  subheading?: string;
}

// Fields we surface to the funnel-tracker. Excludes `consent`, `source`,
// and `website` (honeypot) — those are not user-authored content and
// tracking them would inflate the funnel or trip spam heuristics.
const TRACKED_FIELDS = [
  "name",
  "phone",
  "email",
  "condition",
  "message",
] as const;
type TrackedField = (typeof TRACKED_FIELDS)[number];

function isTrackedField(name: string): name is TrackedField {
  return (TRACKED_FIELDS as readonly string[]).includes(name);
}

export function ConsultationForm({
  source = "contact-page",
  defaultCondition,
  compact = false,
  heading = "Book a free consultation",
  subheading = "Tell us a little about your situation. Our team responds quickly during business hours.",
}: Props) {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const startedFiredRef = useRef(false);
  const completedFiredRef = useRef<Set<TrackedField>>(new Set());

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ConsultationInput>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      condition: defaultCondition,
      preferredContact: "phone",
      message: "",
      source,
      website: "",
    },
  });

  // T-11: form-funnel tracking.
  //
  // The consultation form already fires `form_submit` on success (T-02), but
  // GA4 funnels can only see the conversion if we also surface the
  // upstream steps. Three new dataLayer events make the funnel measurable:
  //
  //   - `form_view`        — fires once when the form scrolls into view
  //                          (or on mount, whichever is first). Captures
  //                          "user saw the form" — the top of the funnel.
  //   - `form_start`       — fires once on the first keystroke / change in
  //                          any tracked field. Captures "user started
  //                          filling it out" — the mid-funnel engagement.
  //   - `form_field_complete` — fires once per field, on blur, when the
  //                          field has a non-empty value. Captures
  //                          per-field drop-off (which fields users
  //                          complete vs. abandon).
  //
  // `form_submit` (T-02) remains the conversion event. GAs can build a
  // complete funnel view → start → field complete → submit from these
  // four events without any additional config.
  useEffect(() => {
    const el = formRef.current;
    if (!el) return;

    // `form_view` — fire-once when the form enters the viewport.
    // IntersectionObserver is supported in every browser we ship for and
    // has zero runtime cost when off-screen. If for any reason IO isn't
    // available (very old browser, jsdom in tests), fall back to firing
    // on mount.
    let viewFired = false;
    const fireView = () => {
      if (viewFired) return;
      viewFired = true;
      trackEvent("form_view", { form_name: source });
    };
    if (typeof IntersectionObserver === "undefined") {
      fireView();
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              fireView();
              io.disconnect();
              break;
            }
          }
        },
        { threshold: 0.1 },
      );
      io.observe(el);
      return () => io.disconnect();
    }
  }, [source]);

  // `form_start` — fire-once on the first interaction with a tracked
  // field. Listening on focusin (event bubbles, so the listener on the
  // form catches every field focus) is the cleanest way: it fires
  // exactly once regardless of how many times the user tabs through
  // the form, and it doesn't require a separate handler per field.
  useEffect(() => {
    const el = formRef.current;
    if (!el) return;
    const onFocusIn = () => {
      if (startedFiredRef.current) return;
      startedFiredRef.current = true;
      trackEvent("form_start", { form_name: source });
    };
    el.addEventListener("focusin", onFocusIn);
    return () => el.removeEventListener("focusin", onFocusIn);
  }, [source]);

  // `form_field_complete` — fire-once per tracked field, on blur, when
  // the field has a non-empty value. Listening on `blur` (capture phase
  // so we catch it before any per-field handler swallows it) gives us
  // the latest value directly from the DOM via `target.value`, which
  // is what react-hook-form has already committed to its uncontrolled
  // input via the `register()` onChange handler. We use the capture
  // phase (third arg `true`) so the event fires even if a per-field
  // handler stops propagation.
  useEffect(() => {
    const el = formRef.current;
    if (!el) return;
    const onBlur = (e: FocusEvent) => {
      const target = e.target;
      if (
        !(target instanceof HTMLInputElement) &&
        !(target instanceof HTMLTextAreaElement) &&
        !(target instanceof HTMLSelectElement)
      ) {
        return;
      }
      const name = target.name;
      if (!isTrackedField(name)) return;
      const value = target.value.trim();
      if (!value) return;
      if (completedFiredRef.current.has(name)) return;
      completedFiredRef.current.add(name);
      trackEvent("form_field_complete", {
        form_name: source,
        field_name: name,
      });
    };
    el.addEventListener("blur", onBlur, true);
    return () => el.removeEventListener("blur", onBlur, true);
  }, [source]);

  const onSubmit = handleSubmit(async (data) => {
    setFormError(null);
    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        fieldErrors?: Record<string, string>;
      };
      if (!res.ok || !body.ok) {
        if (body.fieldErrors) {
          for (const [k, v] of Object.entries(body.fieldErrors)) {
            setError(k as keyof ConsultationInput, { message: v });
          }
        }
        setFormError(
          body.error ??
            `Something went wrong. Please call us at ${site.phone}.`,
        );
        return;
      }
      // Fire GTM conversion event
      trackEvent("form_submit", {
        form_name: source,
        form_condition: data.condition ?? "",
      });
      router.push("/thank-you/");
    } catch {
      setFormError(`Something went wrong. Please call us at ${site.phone}.`);
    }
  });

  const fieldBase =
    "w-full rounded-lg border border-[var(--color-surface-border)] bg-white px-4 py-3 text-[var(--color-ink)] focus:border-[var(--color-brand-500)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-200)]";

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className={`bg-white rounded-2xl border border-[var(--color-surface-border)] p-6 lg:p-8 ${
        compact ? "" : "shadow-sm"
      }`}
      noValidate
    >
      {!compact ? (
        <div className="mb-6">
          <h2 className="font-display text-2xl lg:text-3xl font-semibold">
            {heading}
          </h2>
          <p className="mt-2 text-[var(--color-ink-muted)]">{subheading}</p>
        </div>
      ) : null}

      {/* honeypot — must remain empty for real users */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "-9999px",
          width: 1,
          height: 1,
          overflow: "hidden",
        }}
      >
        <label>
          Website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </label>
      </div>

      <input type="hidden" {...register("source")} value={source} />

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full name" error={errors.name?.message}>
          <input
            type="text"
            autoComplete="name"
            className={fieldBase}
            {...register("name")}
          />
        </Field>
        <Field label="Phone" error={errors.phone?.message}>
          <input
            type="tel"
            autoComplete="tel"
            className={fieldBase}
            {...register("phone")}
          />
        </Field>
      </div>

      <div className="mt-4 grid sm:grid-cols-2 gap-4">
        <Field label="Email" error={errors.email?.message}>
          <input
            type="email"
            autoComplete="email"
            className={fieldBase}
            {...register("email")}
          />
        </Field>
        <Field label="Condition" error={errors.condition?.message}>
          <select className={fieldBase} {...register("condition")}>
            <option value="">Select one…</option>
            {CONDITION_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <fieldset className="mt-4">
        <legend className="text-sm font-medium text-[var(--color-ink)] mb-2">
          Preferred contact method
        </legend>
        <div className="flex gap-6">
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="radio"
              value="phone"
              {...register("preferredContact")}
              defaultChecked
            />
            Phone
          </label>
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="radio"
              value="email"
              {...register("preferredContact")}
            />
            Email
          </label>
        </div>
      </fieldset>

      <Field
        label="Anything else we should know? (optional)"
        error={errors.message?.message}
        className="mt-4"
      >
        <textarea
          rows={4}
          className={fieldBase}
          {...register("message")}
        />
      </Field>

      <label className="mt-5 flex items-start gap-3 text-sm text-[var(--color-ink-muted)]">
        <input
          type="checkbox"
          {...register("consent")}
          className="mt-1"
          value="true"
        />
        <span>
          I’d like HBOTQ to contact me about my consultation. I understand
          this isn’t medical advice and that filing this form doesn’t create a
          physician-patient relationship.
        </span>
      </label>
      {errors.consent ? (
        <p className="mt-1 text-sm text-red-600">{errors.consent.message}</p>
      ) : null}

      {formError ? (
        <div
          role="alert"
          className="mt-4 rounded-lg border border-red-200 bg-red-50 text-red-800 p-3 text-sm"
        >
          {formError}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] text-white px-7 py-3.5 font-semibold hover:bg-[var(--color-accent-hover)] disabled:opacity-60"
      >
        {isSubmitting ? "Sending…" : "Request my free consultation"}
      </button>

      <p className="mt-4 flex items-start gap-2 text-xs text-[var(--color-ink-muted)]">
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          aria-hidden
          className="mt-px shrink-0 text-[var(--color-brand-500)]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="4" y="10" width="16" height="10" rx="2" />
          <path d="M8 10V7a4 4 0 1 1 8 0v3" strokeLinecap="round" />
        </svg>
        <span>
          We respond within one business day. Your information is kept private —
          no spam, ever — and there&apos;s no obligation.
        </span>
      </p>
    </form>
  );
}

function Field({
  label,
  children,
  error,
  className,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="block text-sm font-medium text-[var(--color-ink)] mb-1.5">
        {label}
      </span>
      {children}
      {error ? <p className="mt-1 text-sm text-red-600">{error}</p> : null}
    </label>
  );
}
