import type { Metadata } from "next";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, locales, type Locale } from "@/lib/routes";
import { PageHeader } from "@/components/ui/PageHeader";
import { FinancialDashboard } from "@/components/demos/c/FinancialDashboard";

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
    title: `${dictionary.demoC.title} — ${dictionary.meta.siteName}`,
    description: dictionary.demoC.lede,
  };
}

export default async function DemoCPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "pt";
  const dictionary = getDictionary(locale);

  return (
    <>
      <PageHeader title={dictionary.demoC.title} lede={dictionary.demoC.lede} />
      <FinancialDashboard locale={locale} dictionary={dictionary} />
    </>
  );
}
