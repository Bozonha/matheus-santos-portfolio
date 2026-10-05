export const locales = ["pt", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Picks the best-matching locale from a browser's navigator.language value. */
export function matchLocale(navigatorLanguage: string | undefined): Locale {
  if (!navigatorLanguage) return defaultLocale;
  const lower = navigatorLanguage.toLowerCase();
  for (const locale of locales) {
    if (lower === locale || lower.startsWith(`${locale}-`)) return locale;
  }
  return defaultLocale;
}

export const pagePaths = {
  home: "",
  solucoes: { pt: "solucoes", en: "solutions" },
  demos: { pt: "demos", en: "demos" },
  comoEuTrabalho: { pt: "como-eu-trabalho", en: "how-i-work" },
  sobre: { pt: "sobre", en: "about" },
  faq: { pt: "faq", en: "faq" },
  contato: { pt: "contato", en: "contact" },
  privacidade: { pt: "privacidade", en: "privacy" },
} as const;

export function localePath(locale: Locale, segment: string): string {
  return segment ? `/${locale}/${segment}/` : `/${locale}/`;
}

export const demoSlugs = {
  a: { pt: "atendente", en: "assistant" },
  b: { pt: "auditoria", en: "audit" },
  c: { pt: "painel", en: "dashboard" },
  d: { pt: "automacao", en: "automation" },
} as const;

export type DemoKey = keyof typeof demoSlugs;

export function demoPath(locale: Locale, demo: DemoKey): string {
  return `/${locale}/${pagePaths.demos[locale]}/${demoSlugs[demo][locale]}/`;
}

type SlugKey = Exclude<keyof typeof pagePaths, "home">;

const pageSlugEntries = Object.entries(pagePaths).filter(
  ([key]) => key !== "home",
) as [SlugKey, { pt: string; en: string }][];

/**
 * Traduz um caminho de um idioma para outro, trocando slugs conhecidos
 * (paginas e demos) em vez de so trocar o prefixo de locale. Usado pelo
 * LocaleSwitcher para nao jogar o visitante sempre na home ao trocar idioma.
 */
export function translatePath(pathname: string, toLocale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  const [, first, second] = segments;

  if (!first) return `/${toLocale}/`;

  const page = pageSlugEntries.find(([, slugs]) =>
    locales.some((l) => slugs[l] === first),
  );

  if (!page) return `/${toLocale}/`;

  const [pageKey, pageSlugs] = page;
  const translatedPage = pageSlugs[toLocale];

  if (pageKey === "demos" && second) {
    const demoEntry = (Object.entries(demoSlugs) as [DemoKey, { pt: string; en: string }][]).find(
      ([, slugs]) => locales.some((l) => slugs[l] === second),
    );
    if (demoEntry) {
      const [, demoLocaleSlugs] = demoEntry;
      return `/${toLocale}/${translatedPage}/${demoLocaleSlugs[toLocale]}/`;
    }
  }

  return `/${toLocale}/${translatedPage}/`;
}
