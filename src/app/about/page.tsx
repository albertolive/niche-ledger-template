import type { Metadata } from "next";
import { contactEmail, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name} — who writes the reviews and how we stay independent.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      <header className="mb-10 border-b border-neutral-200 pb-8 dark:border-neutral-800">
        <h1 className="font-serif text-balance text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl dark:text-neutral-50">
          About {site.name}
        </h1>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
          Independent, research-driven reviews of software built for {site.audience}. Every ranking
          is checked against the vendor&apos;s live product and current pricing, not their marketing
          deck.
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
          {site.name} fixes that. Every comparison here starts from the vendor&apos;s live product
          and current pricing page, then gets cross-checked against what real {site.audience} say on
          Reddit and industry forums. If a tool gets a poor review, it&apos;s because the evidence
          earned it one.
        </p>

        <h2>How we make money</h2>
        <p>
          When you click an affiliate link on this site and sign up for a paid plan, we earn a
          commission. The commission is built into the vendor&apos;s acquisition cost — you don&apos;t
          pay extra. We disclose this on every article that contains affiliate links.
        </p>
        <p>
          Commission rates differ between vendors, but our editorial ranking is based on{" "}
          <strong>features, pricing, and documented user feedback</strong>, not commission size. The
          free tier of a better-fitting tool beats the paid tier of a worse one, every time.
        </p>

        <h2>How we research</h2>
        <p>For each tool we cover:</p>
        <ul>
          {site.testingChecklist.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
        <p>
          We re-verify pricing and feature lists {site.reviewCadence}. Last review cycle:{" "}
          {site.lastReviewCycle}.
        </p>

        <h2>How we write</h2>
        <p>
          We use software tools to help draft and structure articles, the same way a writer uses a
          word processor and research assistant. Every factual claim — pricing, feature
          availability, free-tier limits — is verified against the vendor&apos;s official source
          before publishing, and corrected when a vendor changes terms. We&apos;d rather ship a
          shorter accurate review than a long unverified one.
        </p>

        <h2>What we don&apos;t do</h2>
        <ul>
          <li>Accept payment for ranking — vendors cannot pay to be listed first</li>
          <li>Run sponsored content disguised as editorial reviews</li>
          <li>Let affiliate commission rates influence the order tools are ranked</li>
          <li>Publish a pricing or feature claim we haven&apos;t checked against the source</li>
        </ul>

        <h2>Contact</h2>
        <p>
          Questions, corrections, or want to suggest a tool we missed?{" "}
          <a href={`mailto:${contactEmail("general")}`}>Email us at {contactEmail("general")}</a>. We
          fix errors fast — accuracy is the whole point.
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
