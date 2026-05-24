import type { Metadata } from "next";
import { contactEmail, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name} — who writes the reviews and how we stay independent.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-2xl px-6 py-12 sm:py-16">
      <header className="mb-10 border-b border-neutral-200 pb-8 dark:border-neutral-800">
        <h1 className="font-serif text-balance text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl dark:text-neutral-50">
          About {site.name}
        </h1>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
          Independent reviews of software built for {site.audience} — tested on real {site.niche},
          not marketing decks.
        </p>
      </header>

      <div className="prose prose-neutral max-w-none dark:prose-invert">
        <h2>Why this site exists</h2>
        <p>
          Most software reviews in this category are written by SaaS marketing teams ranking their
          own product first. The same handful of tools get shuffled into different orders depending
          on who paid the writer.
        </p>
        <p>
          {site.name} fixes that. Every comparison on this site is based on actually using the tool
          on real {site.niche} — connecting a bank account, entering real data, generating real
          reports. If a tool gets a poor review, it&apos;s because it deserved one.
        </p>

        <h2>How we make money</h2>
        <p>
          When you click an affiliate link on this site and sign up for a paid plan, we earn a
          commission. The commission is built into the vendor&apos;s acquisition cost — you don&apos;t
          pay extra. We disclose this on every article that contains affiliate links.
        </p>
        <p>
          Commission rates differ between vendors, but our editorial ranking is based on{" "}
          <strong>what we&apos;d actually recommend to a friend</strong>, not commission size. The
          free tier of a tool we love beats the paid tier of a tool we wouldn&apos;t use.
        </p>

        <h2>How we test</h2>
        <p>For each tool we review:</p>
        <ul>
          {site.testingChecklist.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
        <p>
          We re-verify pricing and feature lists {site.reviewCadence}. Last review cycle:{" "}
          {site.lastReviewCycle}.
        </p>

        <h2>What we don&apos;t do</h2>
        <ul>
          <li>Accept payment for ranking — vendors cannot pay to be listed first</li>
          <li>Sponsored content disguised as reviews</li>
          <li>Recommend tools we wouldn&apos;t use ourselves</li>
          <li>Generate articles with AI without human fact-checking</li>
        </ul>

        <h2>Contact</h2>
        <p>
          Questions, corrections, or want to suggest a tool we missed?{" "}
          <a href={`mailto:${contactEmail("general")}`}>Email us at {contactEmail("general")}</a>.
        </p>

        <h2>Affiliate disclosure (full)</h2>
        <p>
          {site.name} participates in multiple vendor affiliate programs. When you click a link on
          this site and complete a qualifying action (signup, purchase), we may receive a
          commission. This is at no additional cost to you.
        </p>
        <p>
          Affiliate relationships do not influence editorial rankings. We disclose affiliate links
          inline within each article and at the article&apos;s top-of-page disclosure.
        </p>
      </div>
    </article>
  );
}
