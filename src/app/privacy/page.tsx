import type { Metadata } from "next";
import { contactEmail, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${site.name} — what data we collect and how we use it.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-2xl px-6 py-12 sm:py-16">
      <header className="mb-10 border-b border-neutral-200 pb-8 dark:border-neutral-800">
        <h1 className="font-serif text-balance text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl dark:text-neutral-50">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-neutral-500">Last updated: 24 May 2026</p>
      </header>

      <div className="prose prose-neutral max-w-none dark:prose-invert">
        <p>
          {site.name} (&quot;the Site&quot;) respects your privacy. This page explains what data we
          collect, how it&apos;s used, and your rights regarding it.
        </p>

        <h2>1. Information we collect</h2>
        <p>We collect minimal data needed to operate the Site and improve our content:</p>
        <ul>
          <li>
            <strong>Analytics:</strong> We use server-side analytics (provided by Vercel) and may
            use Google Analytics to understand which articles are read. This data is aggregated and
            does not personally identify you.
          </li>
          <li>
            <strong>Affiliate referrals:</strong> When you click an affiliate link, the destination
            site may log that the referral came from this Site for commission attribution. We do
            not receive your personal data from this referral.
          </li>
          <li>
            <strong>Advertising:</strong> If Google AdSense is active, Google may use cookies to
            personalize ads. See Google&apos;s{" "}
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer"
            >
              advertising privacy policy
            </a>{" "}
            for details.
          </li>
        </ul>

        <h2>2. Cookies</h2>
        <p>This Site uses the following cookie categories:</p>
        <ul>
          <li>
            <strong>Essential cookies:</strong> Required for the Site to function (currently none
            beyond browser defaults).
          </li>
          <li>
            <strong>Analytics cookies:</strong> Set by Google Analytics (if enabled) to measure
            site usage in aggregate.
          </li>
          <li>
            <strong>Advertising cookies:</strong> Set by Google AdSense (if active) to serve
            relevant ads. You can opt out via{" "}
            <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
              Google Ad Settings
            </a>
            .
          </li>
        </ul>

        <h2>3. Third-party services</h2>
        <p>This Site uses the following third-party services that may collect data:</p>
        <ul>
          <li>
            <strong>Vercel:</strong> Hosting infrastructure. See{" "}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vercel&apos;s privacy policy
            </a>
            .
          </li>
          <li>
            <strong>Google AdSense:</strong> Display advertising (if active). See{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              Google&apos;s privacy policy
            </a>
            .
          </li>
          <li>
            <strong>Affiliate networks:</strong> When you click an affiliate link, the destination
            network may set tracking cookies for commission attribution.
          </li>
        </ul>

        <h2>4. Your rights</h2>
        <p>If you are in the EU/EEA, UK, or California, you have the right to:</p>
        <ul>
          <li>Request information about what personal data we hold about you</li>
          <li>Request deletion of personal data we hold about you</li>
          <li>
            Opt out of analytics or advertising cookies via your browser settings or the links
            above
          </li>
        </ul>
        <p>
          To exercise these rights, contact us at{" "}
          <a href={`mailto:${contactEmail("privacy")}`}>{contactEmail("privacy")}</a>.
        </p>

        <h2>5. Affiliate disclosure</h2>
        <p>
          This Site participates in affiliate marketing programs. When you click a link and complete
          a qualifying action on a partner site, we may earn a commission at no extra cost to you.
          We disclose this within each article that contains affiliate links.
        </p>

        <h2>6. Changes to this policy</h2>
        <p>
          We may update this policy as services or laws change. The &quot;Last updated&quot; date at
          the top reflects the most recent revision.
        </p>

        <h2>7. Contact</h2>
        <p>
          For privacy questions:{" "}
          <a href={`mailto:${contactEmail("privacy")}`}>{contactEmail("privacy")}</a>
        </p>
      </div>
    </article>
  );
}
