import { Hero } from "@/components/sections/hero";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How HBOTQ collects, uses, and protects the information you share with us.",
  path: "/privacy-policy/",
});

export const dynamic = "force-static";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Hero
        variant="page"
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="Plain-language overview of how we handle your information."
      />
      <section className="section bg-white">
        <div className="container-page max-w-3xl prose prose-slate">
          <article className="space-y-6 text-[var(--color-ink-muted)] leading-relaxed">
            <p>
              <strong>Last updated:</strong> May 27, 2026
            </p>
            <p>
              This privacy policy describes how Hyperbaric Medicine and Wound
              Treatment Center of Queens (&quot;HBOTQ,&quot; &quot;we,&quot;
              &quot;us&quot;) collects, uses, and protects information you
              provide when you contact us through our website. This policy
              addresses website use only. Information you share once you
              become a patient is governed by our HIPAA Notice of Privacy
              Practices, which we provide at intake.
            </p>
            <h2 className="text-[var(--color-ink)] font-display text-2xl">
              Information we collect
            </h2>
            <p>
              When you submit our consultation form, we collect your name,
              email, phone number, the condition you described, your
              preferred contact method, and any message you wrote. We also
              collect standard request metadata (IP address, browser type)
              for security and rate-limiting.
            </p>
            <h2 className="text-[var(--color-ink)] font-display text-2xl">
              How we use it
            </h2>
            <p>
              We use the information you submit only to respond to you, to
              schedule a consultation, and to coordinate care. We do not sell
              or rent your information.
            </p>
            <h2 className="text-[var(--color-ink)] font-display text-2xl">
              Cookies and analytics
            </h2>
            <p>
              Our website uses Google Tag Manager to load standard analytics
              tools that help us understand how visitors use the site. You
              can opt out of analytics tracking through your browser
              settings.
            </p>
            <h2 className="text-[var(--color-ink)] font-display text-2xl">
              Your rights
            </h2>
            <p>
              You may request access to or deletion of information you’ve
              submitted. Email us at{" "}
              <a
                href="mailto:hello@hbotq.com"
                className="text-[var(--color-brand-500)] underline"
              >
                hello@hbotq.com
              </a>{" "}
              and we’ll respond promptly.
            </p>
            <h2 className="text-[var(--color-ink)] font-display text-2xl">
              Changes to this policy
            </h2>
            <p>
              We may update this policy from time to time. The &quot;last
              updated&quot; date at the top will reflect any changes.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
