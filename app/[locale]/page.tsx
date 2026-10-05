import { getDictionary } from "@/content/dictionaries";
import { isLocale, type Locale } from "@/lib/routes";
import { ScrollNarrative } from "@/components/sections/ScrollNarrative";
import { Hero } from "@/components/sections/Hero";
import { HomePillars } from "@/components/sections/HomePillars";
import { HomeClosing } from "@/components/sections/HomeClosing";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "pt";
  const dictionary = getDictionary(locale);

  return (
    <ScrollNarrative>
      <Hero hero={dictionary.hero} demoSealLabel={dictionary.hero.chat.seal} />
      <HomePillars home={dictionary.home} />
      <HomeClosing home={dictionary.home} />
    </ScrollNarrative>
  );
}
