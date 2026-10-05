import { getDictionary } from "@/content/dictionaries";
import { isLocale, type Locale } from "@/lib/routes";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "pt";
  const dictionary = getDictionary(locale);

  return (
    <div style={{ padding: "var(--space-16) var(--space-6)" }}>
      <h1>{dictionary.meta.title}</h1>
      <p>{dictionary.meta.description}</p>
    </div>
  );
}
