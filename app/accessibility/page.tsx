import Link from "next/link";
import { LegalPage, LegalH2 } from "@/components/sections/legal-page";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/data/site";

export const metadata = buildMetadata({
  title: "Accessibility Statement",
  description:
    "HBOTQ’s ongoing commitment to making this website usable by everyone, including patients using assistive technology.",
  path: "/accessibility/",
});

export const dynamic = "force-static";

export default function AccessibilityPage() {
  return (
    <LegalPage
      eyebrow="Accessibility"
      title="Accessibility Statement"
      subtitle="We want every patient — including those using assistive technology — to be able to learn about and request care at HBOTQ."
      lastUpdated="May 27, 2026"
    >
      <p>
        {site.legalName} is committed to making this website usable by the
        widest possible audience, including people with disabilities. This
        statement describes the standards we work toward, the features
        we’ve built in, what we’re still working on, and how to get help
        if you encounter a barrier.
      </p>

      <LegalH2>Standards we follow</LegalH2>
      <p>
        We aim to substantially conform with the{" "}
        <a
          href="https://www.w3.org/TR/WCAG21/"
          className="text-[var(--color-brand-500)] underline"
          rel="noopener noreferrer"
          target="_blank"
        >
          Web Content Accessibility Guidelines (WCAG) 2.1, Level AA
        </a>
        , published by the World Wide Web Consortium (W3C). WCAG 2.1 AA is
        the standard widely referenced by the Americans with Disabilities
        Act (ADA), Section 508 of the U.S. Rehabilitation Act, and similar
        regulations.
      </p>

      <LegalH2>What we’ve built in</LegalH2>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Keyboard navigation</strong> — every interactive element
          (links, buttons, the consultation form, the mobile menu, FAQ
          accordions) is reachable and operable with a keyboard alone.
        </li>
        <li>
          <strong>Visible focus indicators</strong> — focused elements show
          a brand-color outline so keyboard users can always see where
          they are.
        </li>
        <li>
          <strong>Skip-to-content link</strong> — a hidden link at the top
          of every page becomes visible on focus and lets keyboard and
          screen-reader users jump past the navigation.
        </li>
        <li>
          <strong>Semantic markup</strong> — headings, lists, landmarks,
          form labels, and ARIA attributes are used so assistive technology
          can describe the page accurately.
        </li>
        <li>
          <strong>Color contrast</strong> — body text and interactive
          elements are designed to meet or exceed WCAG 2.1 AA contrast
          ratios (4.5:1 for normal text, 3:1 for large text).
        </li>
        <li>
          <strong>Responsive layout</strong> — pages reflow cleanly down to
          320px width and up to large desktops, so you can zoom up to 200%
          (and beyond) without losing content.
        </li>
        <li>
          <strong>Respect for reduced motion</strong> — animations and
          transitions are suppressed when your device’s “reduce motion”
          setting is enabled.
        </li>
        <li>
          <strong>Image alternatives</strong> — meaningful images include
          descriptive alt text; decorative imagery is marked so screen
          readers can skip it.
        </li>
        <li>
          <strong>Form feedback</strong> — the consultation form announces
          field errors and shows clear, plain-language messages.
        </li>
      </ul>

      <LegalH2>Known limitations</LegalH2>
      <p>
        We are continually improving the Site. Areas we are actively
        working on:
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          Captions and transcripts for any video content we publish in
          the future.
        </li>
        <li>
          Further refinement of complex SVG diagrams (such as our oxygen
          and treatment-trajectory illustrations) with longer text
          descriptions for screen-reader users.
        </li>
        <li>
          Periodic third-party accessibility audits to catch issues we
          haven’t.
        </li>
      </ul>
      <p>
        If you discover something we’ve missed, please tell us — your
        feedback is the fastest way for us to improve.
      </p>

      <LegalH2>Compatibility</LegalH2>
      <p>
        This Site is designed to be compatible with recent versions of the
        following assistive technology combinations:
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>NVDA + Chrome / Firefox on Windows</li>
        <li>JAWS + Chrome / Edge on Windows</li>
        <li>VoiceOver + Safari on macOS and iOS</li>
        <li>TalkBack + Chrome on Android</li>
      </ul>
      <p>
        It works best on the latest two major versions of mainstream
        browsers. Older browsers may not render all features.
      </p>

      <LegalH2>Help requesting care</LegalH2>
      <p>
        If you’re having trouble using any part of this website to reach
        us, you can always call our office directly at{" "}
        <a
          href={`tel:${site.phoneE164}`}
          className="text-[var(--color-brand-500)] underline"
        >
          {site.phone}
        </a>{" "}
        during business hours, or email{" "}
        <a
          href={`mailto:${site.email}`}
          className="text-[var(--color-brand-500)] underline"
        >
          {site.email}
        </a>
        . A member of our team will help you request a consultation by
        whichever method works best for you, including over the phone.
      </p>

      <LegalH2>Report an accessibility issue</LegalH2>
      <p>
        If you encounter a barrier — anything from a missing label to a
        page you can’t navigate with a keyboard — please tell us. Include:
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>The page URL where the problem occurred.</li>
        <li>A short description of the problem.</li>
        <li>The assistive technology (if any) you were using.</li>
        <li>Your contact information, so we can follow up.</li>
      </ul>
      <p>
        Send the report to{" "}
        <a
          href={`mailto:${site.email}?subject=Accessibility%20issue`}
          className="text-[var(--color-brand-500)] underline"
        >
          {site.email}
        </a>{" "}
        or call{" "}
        <a
          href={`tel:${site.phoneE164}`}
          className="text-[var(--color-brand-500)] underline"
        >
          {site.phone}
        </a>
        . We aim to respond within five business days.
      </p>

      <LegalH2>Formal complaints</LegalH2>
      <p>
        If we’re unable to resolve your concern, you may file a complaint
        with the{" "}
        <a
          href="https://www.ada.gov/file-a-complaint/"
          className="text-[var(--color-brand-500)] underline"
          rel="noopener noreferrer"
          target="_blank"
        >
          U.S. Department of Justice ADA complaint program
        </a>
        .
      </p>

      <LegalH2>Continuous improvement</LegalH2>
      <p>
        Accessibility is an ongoing effort, not a checkbox. We re-test
        with each major release and incorporate feedback from patients
        and assistive-technology users. This statement will be updated
        whenever there’s a significant change to the Site or our
        accessibility commitments.
      </p>

      <p className="text-sm">
        See also our{" "}
        <Link
          href="/privacy-policy/"
          className="text-[var(--color-brand-500)] underline"
        >
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link
          href="/terms-of-service/"
          className="text-[var(--color-brand-500)] underline"
        >
          Terms of Service
        </Link>
        .
      </p>
    </LegalPage>
  );
}
