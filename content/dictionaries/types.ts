import type { Locale } from "@/lib/routes";
import type { CheckId, PlanStep, ReplyVoice, ReviewTone } from "@/lib/demos/b/types";

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
  demoA: {
    title: string;
    lede: string;
    scenarioPickerLabel: string;
    afterHoursToggleLabel: string;
    afterHoursActiveNote: string;
    inputLabel: string;
    inputPlaceholder: string;
    sendLabel: string;
    quickRepliesLabel: string;
    chatRegionLabel: string;
    resetLabel: string;
    panel: {
      title: string;
      logTitle: string;
      emptyLog: string;
      intentTitle: string;
      noIntentYet: string;
      intentLabels: Record<
        | "saudacao"
        | "horario"
        | "endereco"
        | "servicos"
        | "preco"
        | "agendar"
        | "remarcar"
        | "cancelar"
        | "falar_com_pessoa"
        | "desconhecido",
        string
      >;
      agendaTitle: string;
      noBooking: string;
      bookingStageLabels: Record<
        "idle" | "need_service" | "need_slot" | "need_name" | "confirmed",
        string
      >;
      handoffTitle: string;
      noHandoff: string;
      handoffReasonLabel: string;
      handoffSummaryLabel: string;
      responseTimeTitle: string;
      responseTimeNote: string;
    };
  };
  demoB: {
    title: string;
    lede: string;
    disclaimer: string;
    businessPickerLabel: string;
    scoreLabel: string;
    checksTitle: string;
    checkLabels: Record<CheckId, string>;
    checkPassedNote: string;
    checkFailedNote: string;
    reputationTitle: string;
    reputationAverageLabel: string;
    totalReviewsLabel: string;
    unansweredReviewsLabel: string;
    planTitle: string;
    planStepLabels: Record<PlanStep["checkId"], string>;
    planStepBodies: Record<PlanStep["checkId"], string>;
    reviewsListTitle: string;
    respondedLabel: string;
    unansweredLabel: string;
    responderTitle: string;
    responderLede: string;
    pasteLabel: string;
    pastePlaceholder: string;
    pickExampleLabel: string;
    useOwnTextLabel: string;
    voiceLabel: string;
    voiceOptions: Record<ReplyVoice, string>;
    generateReplyLabel: string;
    replyResultTitle: string;
    justificationTitle: string;
    toneDetectedLabel: string;
    toneLabels: Record<ReviewTone, string>;
    askReviewTitle: string;
    askReviewLede: string;
    askReviewGenerateLabel: string;
  };
  demoC: {
    title: string;
    lede: string;
    disclaimer: string;
    periodLabel: string;
    periodPresets: { label: string; months: number }[];
    comparisonPrefix: string;
    comparisonSuffixUp: string;
    comparisonSuffixDown: string;
    comparisonNoPrevious: string;
    statCards: {
      revenue: string;
      cashFlow: string;
      defaultRate: string;
      averageTicket: string;
    };
    revenueChartTitle: string;
    revenueChartDescription: string;
    forecastToggleLabel: string;
    forecastLegend: string;
    forecastNote: string;
    anomalyTitle: string;
    anomalyNone: string;
    anomalyAbove: string;
    anomalyBelow: string;
    servicesTitle: string;
    servicesHeaders: { service: string; revenue: string; share: string };
    tableTitle: string;
    tableHeaders: {
      month: string;
      revenue: string;
      expenses: string;
      receivables: string;
      cashFlow: string;
      defaultRate: string;
      averageTicket: string;
      transactions: string;
    };
    tableDetailHint: string;
    exportCsvLabel: string;
  };
}
