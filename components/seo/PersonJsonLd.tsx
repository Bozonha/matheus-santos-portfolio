import { buildPersonJsonLd } from "@/content/seo/jsonld";
import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/routes";

export function PersonJsonLd({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const data = buildPersonJsonLd(locale, dictionary);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
