import type { Metadata } from "next";
import { Geist, Geist_Mono, Source_Serif_4 } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { resolveSiteUrl, site } from "@/lib/site";

// AdSense publisher ID. Env var (NEXT_PUBLIC_ADSENSE_CLIENT on Vercel)
// takes precedence over the committed site.adsenseClient fallback, so a
// new fork can be approved + monetized without a code change. Google's
// verification crawler reads the <script> tag below from server-rendered
// HTML. Trim() defends against trailing whitespace in env vars.
const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim() || site.adsenseClient;

// Google Analytics 4 Measurement ID — set NEXT_PUBLIC_GA_ID in Vercel env
// after creating a GA4 property at https://analytics.google.com.
// Looks like "G-XXXXXXXXXX". When unset, GA scripts simply don't render.
// Trim() defends against accidental trailing whitespace in env vars —
// gtag silently drops events with whitespace-contaminated IDs.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID?.trim();

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
// Editorial serif for article headlines — paired with Geist sans body
// signals "thoughtful review content" rather than "SaaS landing page".
const sourceSerif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const siteUrl = resolveSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s — ${site.name}` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: siteUrl,
    siteName: site.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    ...(site.twitter ? { creator: site.twitter } : {}),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${sourceSerif.variable} h-full antialiased`}
      style={{ ["--accent-color" as string]: site.accentColor }}
    >
      {/*
       * AdSense verification: this script MUST appear in the
       * server-rendered HTML <head> so Google's verifier (which doesn't
       * execute JS reliably) can find it. Render <head> ONLY when
       * ADSENSE_CLIENT is set — Next.js App Router strips its own
       * auto-generated head content (CSS link, font preloads, metadata)
       * when JSX provides an explicit empty <head>. This is critical for
       * template instances that haven't applied for AdSense yet — without
       * the conditional they'd ship with no Tailwind CSS loaded.
       */}
      {ADSENSE_CLIENT && (
        <head>
          {/* eslint-disable-next-line @next/next/no-sync-scripts */}
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
          />
          <meta name="google-adsense-account" content={ADSENSE_CLIENT} />
        </head>
      )}
      <body className="flex min-h-full flex-col bg-stone-50 text-neutral-900 antialiased dark:bg-neutral-950 dark:text-neutral-50">
        <header className="sticky top-0 z-40 border-b border-neutral-200/80 bg-stone-50/90 backdrop-blur-md dark:border-neutral-800/80 dark:bg-neutral-950/90">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-3.5">
            <Link
              href="/"
              className="flex items-center gap-2 text-base font-semibold tracking-tight"
            >
              <span
                aria-hidden
                className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-emerald-700 text-sm font-bold text-white"
              >
                {site.name.charAt(0)}
              </span>
              <span className="hidden sm:inline">{site.name}</span>
            </Link>
            <nav className="flex items-center gap-5 text-sm">
              <Link
                href="/"
                className="text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
              >
                Reviews
              </Link>
              <Link
                href="/about"
                className="text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
              >
                About
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        {/* Google Analytics 4 — only renders when NEXT_PUBLIC_GA_ID is set */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { anonymize_ip: true });
              `}
            </Script>
          </>
        )}
        <footer className="mt-16 border-t border-neutral-200 px-6 py-12 dark:border-neutral-800">
          <div className="mx-auto max-w-3xl space-y-8">
            <AffiliateDisclosure />
            <div className="flex flex-col gap-4 border-t border-neutral-200 pt-6 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between dark:border-neutral-800">
              <p>
                © {new Date().getFullYear()} {site.name}. Independent reviews.
              </p>
              <nav className="flex flex-wrap gap-x-5 gap-y-2">
                <Link href="/about" className="hover:text-neutral-900 dark:hover:text-neutral-50">
                  About
                </Link>
                <Link href="/privacy" className="hover:text-neutral-900 dark:hover:text-neutral-50">
                  Privacy
                </Link>
                <Link href="/contact" className="hover:text-neutral-900 dark:hover:text-neutral-50">
                  Contact
                </Link>
              </nav>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
