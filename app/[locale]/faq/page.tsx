import type { Metadata } from "next";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, locales, type Locale } from "@/lib/routes";
import { PageHeader } from "@/components/ui/PageHeader";
import { FaqAccordion } from "@/components/content/FaqAccordion";

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
    title: `${dictionary.faq.title} — ${dictionary.meta.siteName}`,
    description: dictionary.faq.lede,
  };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "pt";
  const dictionary = getDictionary(locale);

  return (
    <>
      <PageHeader title={dictionary.faq.title} lede={dictionary.faq.lede} />
      <FaqAccordion items={dictionary.faq.items} />
    </>
  );
}
