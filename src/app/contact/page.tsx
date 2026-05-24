import type { Metadata } from "next";
import { contactEmail, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name} — questions, corrections, or partnership inquiries.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <article className="mx-auto max-w-2xl px-6 py-12 sm:py-16">
      <header className="mb-10 border-b border-neutral-200 pb-8 dark:border-neutral-800">
        <h1 className="font-serif text-balance text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl dark:text-neutral-50">
          Contact
        </h1>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
          Reach out for corrections, suggestions, or partnership inquiries.
        </p>
      </header>

      <div className="prose prose-neutral max-w-none dark:prose-invert">
        <h2>General inquiries</h2>
        <p>For questions about reviews, suggestions for tools to cover, or general feedback:</p>
        <p>
          <a href={`mailto:${contactEmail("general")}`}>{contactEmail("general")}</a>
        </p>

        <h2>Corrections + factual updates</h2>
        <p>
          Spot something inaccurate? Software pricing changed? A feature got removed? Let us know
          and we&apos;ll update the article:
        </p>
        <p>
          <a href={`mailto:${contactEmail("corrections")}`}>{contactEmail("corrections")}</a>
        </p>
        <p>
          Please include the article URL and the specific correction. We aim to update within 7
          days.
        </p>

        <h2>Privacy + data requests</h2>
        <p>For GDPR / CCPA / data access or deletion requests:</p>
        <p>
          <a href={`mailto:${contactEmail("privacy")}`}>{contactEmail("privacy")}</a>
        </p>

        <h2>Press + partnerships</h2>
        <p>For SaaS vendors wanting to be reviewed, advertisers, or media inquiries:</p>
        <p>
          <a href={`mailto:${contactEmail("partnerships")}`}>{contactEmail("partnerships")}</a>
        </p>
        <p>
          <strong>Note:</strong> We don&apos;t accept payment for ranking or sponsored content. Vendor
          inquiries about review consideration are welcome, but commission rate doesn&apos;t affect
          editorial position. See our <a href="/about">about page</a> for more on how we work.
        </p>

        <h2>Response time</h2>
        <p>
          Solo-run site. Most emails get a reply within 48 hours on weekdays. Corrections take
          priority over general inquiries.
        </p>
      </div>
    </article>
  );
}
