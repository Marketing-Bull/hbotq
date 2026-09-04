"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import {
  consultationSchema,
  CONDITION_OPTIONS,
  type ConsultationInput,
} from "@/lib/validation/consultation";
import { site } from "@/lib/data/site";
import { trackEvent } from "@/lib/analytics/track";
import {
  getAttribution,
  markConversionPending,
} from "@/lib/analytics/attribution";

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

// Order the error summary reads in, matching the visual order of the fields
// so the list a screen reader announces matches the list a sighted user scans.
const SUMMARY_ORDER = [
  "name",
  "phone",
  "email",
  "condition",
  "message",
  "consent",
] as const satisfies readonly (keyof ConsultationInput)[];

/**
 * Best-effort E.164 for Enhanced Conversions. Callers are effectively all US,
 * and the form accepts "718-925-3322", "(718) 925 3322" and similar. A 10-digit
 * number gains +1; an 11-digit number already starting 1 gains the plus. Any
 * other shape is returned digits-only rather than guessed at — a wrong country
 * code matches nothing and is worse than an unmatched value.
 */
function toE164(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return digits;
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
    formState: { errors, isSubmitting, submitCount },
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
      // Trailing slash matches trailingSlash:true, avoiding a 308 redirect on POST.
      const res = await fetch("/api/consultation/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Read attribution at submit time rather than at mount: the visitor
        // may have landed on an ad URL in another tab of the same session.
        body: JSON.stringify({ ...data, attribution: getAttribution() }),
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
      const attribution = getAttribution();
      // Google Ads Enhanced Conversions. GTM hashes these with SHA-256 before
      // anything leaves the browser — the dataLayer carries them in the clear,
      // which is why this is opt-in rather than on by default. Google expects
      // email lowercased and trimmed, and phone in E.164.
      const userData = {
        email_address: data.email.trim().toLowerCase(),
        phone_number: toE164(data.phone),
      };
      trackEvent("form_submit", {
        user_data: userData,
        form_name: source,
        form_condition: data.condition ?? "",
        utm_source: attribution.utm_source ?? "",
        utm_medium: attribution.utm_medium ?? "",
        utm_campaign: attribution.utm_campaign ?? "",
        has_gclid: Boolean(attribution.gclid),
      });
      markConversionPending();
      router.push("/thank-you/");
    } catch {
      setFormError(`Something went wrong. Please call us at ${site.phone}.`);
    }
  });

  const fieldBase =
    "w-full rounded-lg border border-[var(--color-surface-border)] bg-white px-4 py-3 text-[var(--color-ink)] focus:border-[var(--color-brand-500)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-200)]";

  // Every field gets a stable, form-scoped id so the error text can be wired
  // to its input with aria-describedby. `useId` keeps two forms on the same
  // page (e.g. an inline hero form plus the page form) from colliding.
  const uid = useId();
  const fieldId = (name: string) => `${uid}-${name}`;
  const errorId = (name: string) => `${uid}-${name}-error`;

  // aria-invalid + aria-describedby for a field, applied only while it is in
  // error so we never point at an element that isn't rendered.
  const errorAria = (name: string, message?: string) =>
    message
      ? { "aria-invalid": true as const, "aria-describedby": errorId(name) }
      : {};

  // The error summary. Zod reports every failure at once, so a screen-reader
  // user needs one announcement listing them rather than five separate live
  // regions firing together. react-hook-form focuses the first invalid field
  // for us; this block is what gets read out.
  const summary = SUMMARY_ORDER.flatMap((name) => {
    const message = errors[name]?.message;
    return message ? [{ name, message }] : [];
  });

  const focusField = (name: string) => {
    const el = document.getElementById(fieldId(name));
    if (el instanceof HTMLElement) {
      el.focus();
      el.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className={`bg-white rounded-2xl border border-[var(--color-surface-border)] p-6 lg:p-8 ${
        compact ? "" : "shadow-sm"
      }`}
      // Kept intentionally: validation is Zod's, so the browser must not
      // pre-empt it with native bubbles that would suppress our own messages.
      // The `required` attributes below still carry the semantics to
      // assistive tech.
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

      {summary.length > 0 ? (
        <div
          // Keyed on submitCount so a second submit with the same errors
          // remounts the live region and is announced again — an unchanged
          // role="alert" node is silent on re-render.
          key={submitCount}
          role="alert"
          className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800"
        >
          <p className="font-semibold">
            {summary.length === 1
              ? "There is 1 problem with this form:"
              : `There are ${summary.length} problems with this form:`}
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {summary.map(({ name, message }) => (
              <li key={name}>
                <button
                  type="button"
                  onClick={() => focusField(name)}
                  className="underline underline-offset-2 hover:no-underline"
                >
                  {message}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="grid sm:grid-cols-2 gap-4">
        <Field
          id={fieldId("name")}
          errorId={errorId("name")}
          label="Full name"
          error={errors.name?.message}
        >
          <input
            id={fieldId("name")}
            type="text"
            autoComplete="name"
            required
            className={fieldBase}
            {...errorAria("name", errors.name?.message)}
            {...register("name")}
          />
        </Field>
        <Field
          id={fieldId("phone")}
          errorId={errorId("phone")}
          label="Phone"
          error={errors.phone?.message}
        >
          <input
            id={fieldId("phone")}
            type="tel"
            autoComplete="tel"
            required
            className={fieldBase}
            {...errorAria("phone", errors.phone?.message)}
            {...register("phone")}
          />
        </Field>
      </div>

      <div className="mt-4 grid sm:grid-cols-2 gap-4">
        <Field
          id={fieldId("email")}
          errorId={errorId("email")}
          label="Email"
          error={errors.email?.message}
        >
          <input
            id={fieldId("email")}
            type="email"
            autoComplete="email"
            required
            className={fieldBase}
            {...errorAria("email", errors.email?.message)}
            {...register("email")}
          />
        </Field>
        <Field
          id={fieldId("condition")}
          errorId={errorId("condition")}
          label="Condition"
          error={errors.condition?.message}
        >
          <select
            id={fieldId("condition")}
            required
            className={fieldBase}
            {...errorAria("condition", errors.condition?.message)}
            {...register("condition")}
          >
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
        id={fieldId("message")}
        errorId={errorId("message")}
        label="Anything else we should know? (optional)"
        error={errors.message?.message}
        className="mt-4"
      >
        <textarea
          id={fieldId("message")}
          rows={4}
          className={fieldBase}
          {...errorAria("message", errors.message?.message)}
          {...register("message")}
        />
      </Field>

      <div className="mt-5">
        <label
          htmlFor={fieldId("consent")}
          className="flex items-start gap-3 text-sm text-[var(--color-ink-muted)]"
        >
          <input
            id={fieldId("consent")}
            type="checkbox"
            required
            className="mt-1"
            {...errorAria("consent", errors.consent?.message)}
            {...register("consent")}
          />
          <span>
            I’d like HBOTQ to contact me about my consultation. I understand
            this isn’t medical advice and that filing this form doesn’t create
            a physician-patient relationship.
          </span>
        </label>
        {errors.consent ? (
          <p id={errorId("consent")} className="mt-1 text-sm text-red-600">
            {errors.consent.message}
          </p>
        ) : null}
      </div>

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
  id,
  errorId,
  label,
  children,
  error,
  className,
}: {
  id: string;
  errorId: string;
  label: string;
  children: React.ReactNode;
  error?: string;
  className?: string;
}) {
  return (
    <div className={`block ${className ?? ""}`}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-[var(--color-ink)] mb-1.5"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p id={errorId} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
