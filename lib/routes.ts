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

/**
 * Slugs de pagina e de demo sao os mesmos nos dois idiomas (derivados do
 * portugues, mercado principal) — so o conteudo e o prefixo de locale mudam.
 * Isso evita precisar de uma camada extra de rota dinamica so para traduzir
 * segmentos de URL por idioma.
 */
export const pagePaths = {
  home: "",
  solucoes: "solucoes",
  demos: "demos",
  comoEuTrabalho: "como-eu-trabalho",
  sobre: "sobre",
  faq: "faq",
  contato: "contato",
  privacidade: "privacidade",
} as const;

export function localePath(locale: Locale, segment: string): string {
  return segment ? `/${locale}/${segment}/` : `/${locale}/`;
}

export const demoSlugs = {
  a: "atendente",
  b: "auditoria",
  c: "painel",
  d: "automacao",
} as const;

export type DemoKey = keyof typeof demoSlugs;

export function demoPath(locale: Locale, demo: DemoKey): string {
  return `/${locale}/${pagePaths.demos}/${demoSlugs[demo]}/`;
}

/**
 * Traduz um caminho trocando so o prefixo de locale — os slugs sao
 * compartilhados entre os idiomas, entao o resto do caminho nao muda.
 * Usado pelo LocaleSwitcher para nao jogar o visitante sempre na home.
 */
export function translatePath(pathname: string, toLocale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  const [, ...rest] = segments;
  return rest.length ? `/${toLocale}/${rest.join("/")}/` : `/${toLocale}/`;
}
