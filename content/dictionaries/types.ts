import type { Locale } from "@/lib/routes";

export interface NavLink {
  label: string;
  href: string;
}

export interface Dictionary {
  locale: Locale;
  meta: {
    siteName: string;
    title: string;
    description: string;
    ogAlt: string;
  };
  skipLink: string;
  header: {
    menuLabel: string;
    nav: {
      solucoes: string;
      demos: string;
      comoEuTrabalho: string;
      sobre: string;
      faq: string;
      contato: string;
    };
    localeSwitcherLabel: string;
    themeToggle: {
      toLight: string;
      toDark: string;
    };
  };
  footer: {
    tagline: string;
    demoDisclaimer: string;
    contactLabel: string;
    contactEmail: string;
    privacyLink: string;
    rights: string;
  };
}
