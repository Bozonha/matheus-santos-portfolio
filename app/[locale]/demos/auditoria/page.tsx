import type { Metadata } from "next";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, locales, type Locale } from "@/lib/routes";
import { PageHeader } from "@/components/ui/PageHeader";
import { AuditDemo } from "@/components/demos/b/AuditDemo";

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
    title: `${dictionary.demoB.title} — ${dictionary.meta.siteName}`,
    description: dictionary.demoB.lede,
  };
}

export default async function DemoBPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "pt";
  const dictionary = getDictionary(locale);

  return (
    <>
      <PageHeader title={dictionary.demoB.title} lede={dictionary.demoB.lede} />
      <AuditDemo locale={locale} dictionary={dictionary} />
    </>
  );
}
