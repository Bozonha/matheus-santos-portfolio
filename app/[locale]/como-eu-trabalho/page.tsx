import type { Metadata } from "next";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, locales, type Locale } from "@/lib/routes";
import { PageHeader } from "@/components/ui/PageHeader";
import { ComoEuTrabalho } from "@/components/content/ComoEuTrabalho";

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
    title: `${dictionary.comoEuTrabalho.title} — ${dictionary.meta.siteName}`,
    description: dictionary.comoEuTrabalho.lede,
  };
}

export default async function ComoEuTrabalhoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "pt";
  const dictionary = getDictionary(locale);

  return (
    <>
      <PageHeader
        title={dictionary.comoEuTrabalho.title}
        lede={dictionary.comoEuTrabalho.lede}
      />
      <ComoEuTrabalho comoEuTrabalho={dictionary.comoEuTrabalho} />
    </>
  );
}
