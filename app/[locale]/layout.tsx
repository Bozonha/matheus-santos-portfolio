import type { Metadata } from "next";
import { Bricolage_Grotesque, Schibsted_Grotesk, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import { locales, isLocale, type Locale } from "@/lib/routes";
import { getDictionary } from "@/content/dictionaries";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { PersonJsonLd } from "@/components/seo/PersonJsonLd";
import { ProfessionalServiceJsonLd } from "@/components/seo/ProfessionalServiceJsonLd";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display-src",
  display: "swap",
});

const body = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-body-src",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono-src",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "pt";
  const dictionary = getDictionary(locale);

  return {
    metadataBase: new URL("https://matheussantos.example"),
    title: dictionary.meta.title,
    description: dictionary.meta.description,
    icons: {
      icon: "/favicon.svg",
    },
    alternates: {
      canonical: `/${locale}/`,
      languages: {
        pt: "/pt/",
        en: "/en/",
        "x-default": "/pt/",
      },
    },
    openGraph: {
      title: dictionary.meta.title,
      description: dictionary.meta.description,
      locale: locale === "pt" ? "pt_BR" : "en_US",
      type: "website",
      images: [`/og/og-${locale}.png`],
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.meta.title,
      description: dictionary.meta.description,
      images: [`/og/og-${locale}.png`],
    },
  };
}

const themeInitScript = `
(function () {
  try {
    var stored = window.localStorage.getItem('theme');
    var theme = stored === 'light' || stored === 'dark'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "pt";
  const dictionary = getDictionary(locale);

  return (
    <html
      lang={locale}
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <PersonJsonLd locale={locale} dictionary={dictionary} />
        <ProfessionalServiceJsonLd locale={locale} dictionary={dictionary} />
      </head>
      <body>
        <SkipLink label={dictionary.skipLink} />
        <Header locale={locale} dictionary={dictionary} />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer locale={locale} dictionary={dictionary} />
      </body>
    </html>
  );
}
