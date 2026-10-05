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
  hero: {
    turnLabel: string;
    time: string;
    eyebrow: string;
    title: string;
    lede: string;
    chat: {
      scenarioLabel: string;
      messages: { from: "cliente" | "atendente"; text: string }[];
      statusLine: string;
      seal: string;
    };
    ctaPrimary: NavLink;
    ctaSecondary: NavLink;
  };
  home: {
    pillarsTurnLabel: string;
    pillarsTitle: string;
    pillarsLede: string;
    pillars: { title: string; body: string; href: string; linkLabel: string }[];
    closingTurnLabel: string;
    closingTitle: string;
    closingBody: string[];
    closingCta: NavLink;
  };
  solucoes: {
    title: string;
    lede: string;
    pillars: {
      title: string;
      summary: string;
      body: string[];
      demoLabel: string;
      demoHref: string;
    }[];
  };
  demosIndex: {
    title: string;
    lede: string;
    demos: { title: string; summary: string; href: string; badge: string }[];
  };
  comoEuTrabalho: {
    title: string;
    lede: string;
    steps: { title: string; body: string }[];
    aiBoundary: {
      title: string;
      lede: string;
      items: string[];
    };
  };
  sobre: {
    title: string;
    bio: string[];
    focus: { title: string; body: string }[];
  };
  faq: {
    title: string;
    lede: string;
    items: { question: string; answer: string }[];
  };
  contato: {
    title: string;
    lede: string;
    emailCta: string;
    emailSubject: string;
    whatsappCta: string;
    whatsappNote: string;
    responseNote: string;
  };
  privacidade: {
    title: string;
    lede: string;
    sections: { title: string; body: string[] }[];
  };
}
