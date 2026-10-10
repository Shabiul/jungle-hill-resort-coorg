import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { Intro } from "@/components/animations/Intro";
import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { NavProgress } from "@/components/layout/NavProgress";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/shared/JsonLd";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { siteConfig } from "@/config/site.config";
import { SITE_DEFAULT_TITLE, SITE_TITLE_TEMPLATE } from "@/lib/constants";
import { resortJsonLd } from "@/lib/structured-data";
import "./globals.css";

// Type: Cormorant Garamond (display, light, one italic emphasis) and Jost (body and small uppercase labels).
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
const jost = Jost({ subsets: ["latin"], variable: "--font-jost", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${SITE_DEFAULT_TITLE} | ${siteConfig.tagline}`,
    template: SITE_TITLE_TEMPLATE,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    // TODO: add a 1200x630 image at public/images/og/og-default.jpg and reference it here
  },
};

export const viewport: Viewport = {
  themeColor: "#151e27",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        <noscript>
          <style>{`[data-reveal]{transform:none!important;opacity:1!important}[data-reveal-img]{clip-path:none!important;opacity:1!important}`}</style>
        </noscript>
        <a
          href="#main"
          className="label-mono fixed top-2 left-2 z-[100] -translate-y-20 bg-pearl px-4 py-3 text-night focus:translate-y-0"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <Intro />
          <NavProgress />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppButton />
        </SmoothScroll>
        <JsonLd data={resortJsonLd()} />
      </body>
    </html>
  );
}
