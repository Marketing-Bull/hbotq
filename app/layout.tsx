import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/data/site";
import { GTM, GTMNoScript } from "@/components/analytics/gtm";
import { AttributionCapture } from "@/components/analytics/attribution-capture";
import { CallRail } from "@/components/analytics/callrail";
import { ScrollDepth } from "@/components/analytics/scroll-depth";
import { JsonLd } from "@/components/seo/json-ld";
import { medicalBusinessSchema, webSiteSchema } from "@/lib/seo/schemas";
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
  // No `icons` key on purpose: the file conventions in app/ (favicon.ico,
  // icon.png, apple-icon.png) generate the <link> tags themselves. Setting
  // `icons` here suppressed them — the page shipped two identical favicon.ico
  // links and no apple-touch-icon at all.
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
  const callRailCompanyId = process.env.NEXT_PUBLIC_CALLRAIL_COMPANY_ID;
  const callRailScriptId = process.env.NEXT_PUBLIC_CALLRAIL_SCRIPT_ID;
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <head>
        <GTM gtmId={gtmId} />
        <JsonLd data={webSiteSchema()} />
        <JsonLd data={medicalBusinessSchema()} />
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
        <ScrollDepth />
        <AttributionCapture />
        <CallRail
          companyId={callRailCompanyId}
          scriptId={callRailScriptId}
        />
        <div className="h-16 lg:hidden" aria-hidden />
      </body>
    </html>
  );
}
