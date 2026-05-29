import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/data/site";
import { GTM, GTMNoScript } from "@/components/analytics/gtm";
import { JsonLd } from "@/components/seo/json-ld";
import { medicalBusinessSchema, aggregateRatingSchema } from "@/lib/seo/schemas";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StickyCta } from "@/components/layout/sticky-cta";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.legalName}`,
    template: `%s | ${site.name}`,
  },
  description: site.shortDescription,
  applicationName: site.name,
  authors: [{ name: site.legalName }],
  generator: "Next.js",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    siteName: site.name,
    type: "website",
    locale: "en_US",
    url: site.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <head>
        <GTM gtmId={gtmId} />
        <JsonLd data={medicalBusinessSchema()} />
        <JsonLd data={aggregateRatingSchema()} />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-[var(--color-ink)]">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <GTMNoScript gtmId={gtmId} />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <StickyCta />
        <div className="h-16 lg:hidden" aria-hidden />
      </body>
    </html>
  );
}
