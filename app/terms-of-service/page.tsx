import Link from "next/link";
import { LegalPage, LegalH2, LegalH3 } from "@/components/sections/legal-page";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/data/site";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description:
    "The terms that govern your use of the HBOTQ website, our consultation form, and the content we publish about hyperbaric oxygen therapy.",
  path: "/terms-of-service/",
  noIndex: true,
});

export const dynamic = "force-static";

export default function TermsOfServicePage() {
  return (
    <LegalPage
      title="Terms of Service"
      subtitle="The rules that govern how you may use this website and the content we publish."
      lastUpdated="May 27, 2026"
      draft
    >
      <p>
        These Terms of Service (the “Terms”) form a binding agreement
        between you and {site.legalName} (“HBOTQ,” “we,” “our,” or “us”)
        and govern your access to and use of this website at{" "}
        <a
          href={site.url}
          className="text-[var(--color-brand-500)] underline"
        >
          {site.url.replace(/^https?:\/\//, "")}
        </a>{" "}
        (the “Site”). By accessing the Site, submitting a form, or otherwise
        using any of the Site’s features, you agree to these Terms. If you
        do not agree, do not use the Site.
      </p>

      <div
        role="note"
        className="rounded-lg border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/5 p-4 text-[var(--color-ink)]"
      >
        <strong>Medical disclaimer (important).</strong> The Site provides
        general educational information about hyperbaric oxygen therapy and
        related topics. <strong>It is not medical advice</strong>, does not
        establish a physician-patient relationship, and is not a substitute
        for evaluation by a qualified healthcare professional. If you have
        a medical emergency, call 911 or go to the nearest emergency room.
        Always consult a licensed physician about your specific condition
        before starting, stopping, or changing any treatment.
      </div>

      <LegalH2>1. Eligibility</LegalH2>
      <p>
        You must be at least 18 years old (or have the consent of a parent
        or legal guardian) to use the Site or submit any form. By using
        the Site you represent that you meet this requirement.
      </p>

      <LegalH2>2. Not medical advice; no physician-patient relationship</LegalH2>
      <p>
        Content on the Site — including condition pages, FAQs,
        testimonials, and the descriptions of treatment protocols — is
        for general informational purposes only. It is{" "}
        <strong>not</strong> a diagnosis, prescription, treatment plan,
        recommendation, or warranty of any clinical outcome. Hyperbaric
        oxygen therapy is appropriate for some patients and conditions and
        not for others; whether it is right for you depends on your full
        clinical picture and must be determined by a qualified physician.
      </p>
      <p>
        Submitting the consultation form, calling our office, or otherwise
        contacting HBOTQ through the Site <strong>does not</strong> create
        a physician-patient relationship. A physician-patient relationship
        begins only after you are formally evaluated and accepted into care
        by an HBOTQ physician.
      </p>

      <LegalH2>3. Permitted use of the Site</LegalH2>
      <p>You agree to use the Site only for lawful purposes and not to:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          Use the Site in a way that could disable, overburden, damage, or
          impair it, or interfere with any other party’s use.
        </li>
        <li>
          Attempt to gain unauthorized access to any part of the Site, our
          servers, or any system connected to the Site.
        </li>
        <li>
          Use automated means (bots, scrapers, headless browsers) to access
          the Site or submit forms, except for well-known search-engine
          crawlers that obey our robots policy.
        </li>
        <li>
          Submit false, misleading, or harmful information through any form.
        </li>
        <li>
          Use the Site to harass, threaten, or impersonate any person.
        </li>
      </ul>

      <LegalH2>4. Your submissions</LegalH2>
      <p>
        When you submit information through the Site (for example through
        the consultation form), you represent that the information is
        accurate and that you have the right to share it. You grant HBOTQ
        a non-exclusive, royalty-free license to use that information for
        the purposes described in our{" "}
        <Link
          href="/privacy-policy/"
          className="text-[var(--color-brand-500)] underline"
        >
          Privacy Policy
        </Link>{" "}
        — primarily, to respond to you and coordinate care.
      </p>
      <p>
        Do not submit information about other people without their
        permission, and do not submit sensitive medical information you
        would not want sent over standard email.
      </p>

      <LegalH2>5. Intellectual property</LegalH2>
      <p>
        The Site and its content (text, images, design, code, illustrations,
        logos, and the HBOTQ name) are owned by HBOTQ or our licensors and
        are protected by United States and international intellectual
        property laws. You may view and print individual pages for your
        personal, non-commercial reference. Any other use — including
        copying, republishing, scraping for training data, framing, or
        commercial reuse — requires our prior written permission.
      </p>

      <LegalH2>6. Third-party links</LegalH2>
      <p>
        The Site may link to third-party websites for reference (for
        example, clinical studies or external organizations). We are not
        responsible for the content, accuracy, or practices of third-party
        sites, and a link does not imply endorsement.
      </p>

      <LegalH2>7. Disclaimers of warranty</LegalH2>
      <p>
        Except as expressly stated in writing by HBOTQ, the Site and its
        content are provided <strong>“as is” and “as available,”</strong>{" "}
        without warranties of any kind, whether express or implied,
        including warranties of merchantability, fitness for a particular
        purpose, non-infringement, accuracy, completeness, timeliness, or
        uninterrupted operation. We do not warrant that the Site will be
        secure or error-free, or that defects will be corrected.
      </p>

      <LegalH2>8. Limitation of liability</LegalH2>
      <p>
        To the maximum extent permitted by law, HBOTQ and its physicians,
        employees, contractors, and affiliates will not be liable for any
        indirect, incidental, special, consequential, exemplary, or
        punitive damages, or for lost profits or revenues, lost data, or
        loss of goodwill, arising out of or relating to your use of the
        Site — even if we have been advised of the possibility of such
        damages. Our aggregate liability arising out of these Terms or
        your use of the Site will not exceed one hundred U.S. dollars
        (US&nbsp;$100). Some jurisdictions do not allow the limitation of
        certain warranties or damages; in those jurisdictions, our
        liability is limited to the maximum extent permitted by law.
      </p>

      <LegalH2>9. Indemnification</LegalH2>
      <p>
        You agree to defend, indemnify, and hold harmless HBOTQ and our
        physicians, employees, contractors, and affiliates from any claim,
        loss, damage, or expense (including reasonable attorneys’ fees)
        arising out of your misuse of the Site, your violation of these
        Terms, or your violation of any rights of a third party.
      </p>

      <LegalH2>10. Termination</LegalH2>
      <p>
        We may suspend or terminate your access to the Site at any time,
        without notice, if we believe you have violated these Terms or if
        we need to protect the Site or our users. Sections that by their
        nature should survive termination (intellectual property,
        disclaimers, limitation of liability, indemnification, governing
        law, and dispute resolution) will survive.
      </p>

      <LegalH2>11. Governing law and venue</LegalH2>
      <p>
        These Terms are governed by the laws of the State of New York,
        without regard to its conflict-of-laws principles. You and HBOTQ
        agree that any dispute arising out of or relating to the Site or
        these Terms — to the extent not subject to arbitration as
        provided below — will be resolved exclusively in the state or
        federal courts located in Queens County, New York, and you consent
        to the personal jurisdiction of those courts.
      </p>

      <LegalH3>11.1 Informal resolution</LegalH3>
      <p>
        Before filing a claim, you agree to attempt to resolve the dispute
        informally by emailing us at{" "}
        <a
          href={`mailto:${site.email}`}
          className="text-[var(--color-brand-500)] underline"
        >
          {site.email}
        </a>
        . If we cannot resolve the dispute within 30 days, either party
        may proceed with the remedies available under these Terms.
      </p>

      <LegalH2>12. Changes to these Terms</LegalH2>
      <p>
        We may update these Terms from time to time. When we do, we will
        revise the “Last updated” date at the top of this page and, for
        material changes, post a notice on the Site for at least 30 days.
        Your continued use of the Site after a change takes effect means
        you accept the updated Terms.
      </p>

      <LegalH2>13. Miscellaneous</LegalH2>
      <p>
        If any part of these Terms is found unenforceable, the rest will
        remain in effect. Our failure to enforce a provision is not a
        waiver of our right to enforce it later. You may not assign these
        Terms; we may assign them in connection with a sale or
        reorganization of the business. These Terms, together with our{" "}
        <Link
          href="/privacy-policy/"
          className="text-[var(--color-brand-500)] underline"
        >
          Privacy Policy
        </Link>
        , are the entire agreement between you and HBOTQ regarding the
        Site.
      </p>

      <LegalH2>14. Contact</LegalH2>
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
    </LegalPage>
  );
}
