"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  consultationSchema,
  CONDITION_OPTIONS,
  type ConsultationInput,
} from "@/lib/validation/consultation";
import { site } from "@/lib/data/site";

interface Props {
  source?: string;
  defaultCondition?: ConsultationInput["condition"];
  compact?: boolean;
  heading?: string;
  subheading?: string;
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

  const onSubmit = handleSubmit(async (data) => {
    setFormError(null);
    try {
      // Trailing slash matches trailingSlash:true, avoiding a 308 redirect on POST.
      const res = await fetch("/api/consultation/", {
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
      router.push("/thank-you/");
    } catch {
      setFormError(`Something went wrong. Please call us at ${site.phone}.`);
    }
  });

  const fieldBase =
    "w-full rounded-lg border border-[var(--color-surface-border)] bg-white px-4 py-3 text-[var(--color-ink)] focus:border-[var(--color-brand-500)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-200)]";

  return (
    <form
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
