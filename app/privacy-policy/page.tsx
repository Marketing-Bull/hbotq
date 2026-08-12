import Link from "next/link";
import { LegalPage, LegalH2, LegalH3 } from "@/components/sections/legal-page";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/data/site";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How HBOTQ collects, uses, and protects the information you share with us through this website.",
  path: "/privacy-policy/",
  noIndex: true,
});

export const dynamic = "force-static";

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      subtitle="Plain-language overview of how we handle the information you share with us through this website."
      lastUpdated="May 27, 2026"
      draft
    >
      <p>
        This Privacy Policy describes how {site.legalName} (“HBOTQ,” “we,”
        “our,” or “us”) collects, uses, shares, and protects the information
        you provide when you interact with our website at{" "}
        <a
          href={site.url}
          className="text-[var(--color-brand-500)] underline"
        >
          {site.url.replace(/^https?:\/\//, "")}
        </a>
        . By using this site, you agree to the practices described below.
      </p>

      <div
        role="note"
        className="rounded-lg border border-[var(--color-brand-200)] bg-[var(--color-brand-50)] p-4 text-[var(--color-ink)]"
      >
        <strong>HIPAA notice.</strong> This policy covers website use only.
        Once you become a patient, the protected health information (“PHI”)
        you share with us in clinical settings — diagnoses, treatment
        records, communications with our medical team — is governed by our
        separate <em>HIPAA Notice of Privacy Practices</em>, which we
        provide at intake. Where a conflict exists between this Privacy
        Policy and the HIPAA Notice with respect to PHI, the HIPAA Notice
        controls.
      </div>

      <LegalH2>1. Information we collect</LegalH2>

      <LegalH3>1.1 Information you give us</LegalH3>
      <p>
        When you submit our consultation form, we collect the information
        you choose to provide: your name, email address, phone number, the
        condition you described, your preferred method of contact, and any
        free-text message. If you email or call us, we receive whatever you
        choose to share in that communication.
      </p>

      <LegalH3>1.2 Information collected automatically</LegalH3>
      <p>
        When you visit this site, our servers and the analytics tools we
        use automatically collect technical information such as your IP
        address, browser type and version, device type, referring URL, the
        pages you view, and timestamps. We use this information for
        security, abuse prevention (including form rate-limiting), and to
        understand how the site is used.
      </p>

      <LegalH3>1.3 Cookies and similar technologies</LegalH3>
      <p>
        We use cookies and similar technologies through Google Tag Manager,
        which loads analytics tags such as Google Analytics. These cookies
        help us measure traffic and improve the site. You can control
        cookies through your browser settings, and you can install the{" "}
        <a
          href="https://tools.google.com/dlpage/gaoptout"
          className="text-[var(--color-brand-500)] underline"
          rel="noopener noreferrer"
          target="_blank"
        >
          Google Analytics opt-out browser add-on
        </a>{" "}
        to prevent Google Analytics from collecting data on you.
      </p>

      <LegalH2>2. How we use information</LegalH2>
      <p>We use the information described above to:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Respond to your inquiries and schedule consultations.</li>
        <li>Coordinate care with our medical team and your other providers.</li>
        <li>Improve and operate the website (analytics, debugging, security).</li>
        <li>
          Comply with legal obligations, enforce our terms, and protect the
          rights and safety of HBOTQ and others.
        </li>
      </ul>
      <p>
        We do <strong>not</strong> sell or rent your personal information,
        and we do not share it with third parties for their independent
        marketing purposes.
      </p>

      <LegalH2>3. Service providers we share information with</LegalH2>
      <p>
        We share limited information with vendors who help us operate the
        site, only to the extent they need it to perform their role and
        under written confidentiality / data-protection terms. These
        currently include:
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Vercel</strong> — site hosting and content delivery.
        </li>
        <li>
          <strong>Resend</strong> — transactional email delivery for
          consultation requests.
        </li>
        <li>
          <strong>Google</strong> — analytics and tag management (Google
          Tag Manager / Google Analytics) for aggregated usage measurement.
        </li>
      </ul>

      <LegalH2>4. How long we keep information</LegalH2>
      <p>
        We retain consultation-form submissions for as long as needed to
        respond to your request and, where you become a patient, to
        coordinate care. Analytics logs are retained per the default
        retention of the underlying service (typically 2–14 months). We
        delete or de-identify information when it is no longer needed for
        the purposes described in this policy, except where retention is
        required by law.
      </p>

      <LegalH2>5. Security</LegalH2>
      <p>
        We use industry-standard administrative, technical, and physical
        safeguards to protect the information you submit through this
        site, including TLS encryption in transit and access controls on
        our lead inbox. No method of transmission over the internet is
        100% secure, however, and we cannot guarantee absolute security.
      </p>

      <LegalH2>6. Your rights</LegalH2>
      <p>
        Depending on where you live, you may have the right to request
        access to, correction of, or deletion of personal information we
        hold about you; to object to or restrict certain processing; and
        to receive a copy of your data in a portable format. To exercise
        these rights, email us at{" "}
        <a
          href={`mailto:${site.email}`}
          className="text-[var(--color-brand-500)] underline"
        >
          {site.email}
        </a>
        . We respond within a reasonable time and will verify your identity
        before acting on substantive requests. We will not discriminate
        against you for exercising any of these rights.
      </p>

      <LegalH2>7. Children’s privacy</LegalH2>
      <p>
        This website is not directed at children under 13, and we do not
        knowingly collect personal information from children under 13. If
        you believe a child has provided us information, please email{" "}
        <a
          href={`mailto:${site.email}`}
          className="text-[var(--color-brand-500)] underline"
        >
          {site.email}
        </a>{" "}
        and we will delete it.
      </p>

      <LegalH2>8. Do Not Track</LegalH2>
      <p>
        Most browsers offer a “Do Not Track” signal. There is no industry
        consensus on how to respond to such signals, and our site does not
        currently change its behavior based on them.
      </p>

      <LegalH2>9. Changes to this policy</LegalH2>
      <p>
        We may update this Privacy Policy from time to time. When we do,
        we will revise the “Last updated” date at the top of this page.
        Material changes will be highlighted in a notice on this page for
        at least 30 days.
      </p>

      <LegalH2>10. Contact us</LegalH2>
      <p>
        Questions about this policy? Reach out:
      </p>
      <address className="not-italic">
        {site.legalName}
        <br />
        {site.address.street}
        <br />
        {site.address.city}, {site.address.region} {site.address.postalCode}
        <br />
        <a
          href={`mailto:${site.email}`}
          className="text-[var(--color-brand-500)] underline"
        >
          {site.email}
        </a>{" "}
        ·{" "}
        <a
          href={`tel:${site.phoneE164}`}
          className="text-[var(--color-brand-500)] underline"
        >
          {site.phone}
        </a>
      </address>

      <p className="text-sm">
        See also our{" "}
        <Link
          href="/terms-of-service/"
          className="text-[var(--color-brand-500)] underline"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/accessibility/"
          className="text-[var(--color-brand-500)] underline"
        >
          Accessibility Statement
        </Link>
        .
      </p>
    </LegalPage>
  );
}
