import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/routes";

const baseUrl = "https://matheussantos.example";

export function buildPersonJsonLd(locale: Locale, dictionary: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Matheus Santos",
    jobTitle: dictionary.meta.title.split("—")[1]?.trim() ?? dictionary.meta.title,
    email: "mailto:pjmatheussantos@gmail.com",
    url: `${baseUrl}/${locale}/`,
    knowsLanguage: ["pt-BR", "en"],
  };
}

export function buildProfessionalServiceJsonLd(locale: Locale, dictionary: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: dictionary.meta.siteName,
    description: dictionary.meta.description,
    url: `${baseUrl}/${locale}/`,
    email: "mailto:pjmatheussantos@gmail.com",
    areaServed: "BR",
    founder: {
      "@type": "Person",
      name: "Matheus Santos",
    },
  };
}
