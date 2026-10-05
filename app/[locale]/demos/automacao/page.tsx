import type { Metadata } from "next";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, locales, type Locale } from "@/lib/routes";
import { PageHeader } from "@/components/ui/PageHeader";
import { PipelineDemo } from "@/components/demos/d/PipelineDemo";

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
    title: `${dictionary.demoD.title} — ${dictionary.meta.siteName}`,
    description: dictionary.demoD.lede,
  };
}

export default async function DemoDPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "pt";
  const dictionary = getDictionary(locale);

  return (
    <>
      <PageHeader title={dictionary.demoD.title} lede={dictionary.demoD.lede} />
      <PipelineDemo locale={locale} dictionary={dictionary} />
    </>
  );
}
