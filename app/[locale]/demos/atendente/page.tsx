import type { Metadata } from "next";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, locales, type Locale } from "@/lib/routes";
import { PageHeader } from "@/components/ui/PageHeader";
import { ChatDemo } from "@/components/demos/a/ChatDemo";

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
    title: `${dictionary.demoA.title} — ${dictionary.meta.siteName}`,
    description: dictionary.demoA.lede,
  };
}

export default async function DemoAPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "pt";
  const dictionary = getDictionary(locale);

  return (
    <>
      <PageHeader title={dictionary.demoA.title} lede={dictionary.demoA.lede} />
      <ChatDemo locale={locale} dictionary={dictionary} />
    </>
  );
}
