import type { Dictionary } from "./types";

const en = {
  locale: "en",
  meta: {
    siteName: "Matheus Santos",
    title: "Matheus Santos — Technology & Continuous Improvement Consultant",
    description:
      "Data, automation, and AI message support for small businesses. Chat with a demo assistant, run an audit, and use a live dashboard — all on this page.",
    ogAlt: "Matheus Santos, technology and continuous improvement consultant",
  },
  skipLink: "Skip to main content",
  header: {
    menuLabel: "Menu",
    nav: {
      solucoes: "Solutions",
      demos: "Demos",
      comoEuTrabalho: "How I work",
      sobre: "About",
      faq: "FAQ",
      contato: "Contact",
    },
    localeSwitcherLabel: "Português",
    themeToggle: {
      toLight: "Switch to light theme",
      toDark: "Switch to dark theme",
    },
  },
  footer: {
    tagline: "The shop closes. The conversation keeps going.",
    demoDisclaimer:
      "Every case, business, review, number, and chart shown on this site is fictional and for demonstration only. Nothing here is a promise of real results.",
    contactLabel: "Email",
    contactEmail: "pjmatheussantos@gmail.com",
    privacyLink: "Privacy & data protection",
    rights: "Matheus Santos — Technology & Continuous Improvement Consultant.",
  },
  hero: {
    turnLabel: "Shift 01 — Night",
    time: "11:47 PM",
    eyebrow: "The shop closed almost four hours ago",
    title: "The shop closes. The support doesn't.",
    lede: "What you're about to see is the first demo on this site: a message arriving after hours, answered right away, with nobody awake to do it.",
    chat: {
      scenarioLabel: "Dental clinic — demo",
      messages: [
        { from: "cliente", text: "Do you have an opening tomorrow?" },
        {
          from: "atendente",
          text: "We do. Tomorrow we have 9am, 10:30am, and 2pm. Want me to book one for you?",
        },
        { from: "cliente", text: "10:30 works" },
        { from: "atendente", text: "Done. Can I get your name?" },
        { from: "cliente", text: "Ana Paula" },
        {
          from: "atendente",
          text: "Thanks, Ana! You're booked for tomorrow at 10:30am. Just reply here if anything changes.",
        },
      ],
      statusLine: "Booking logged at 11:48 PM — nobody had to wake up for it.",
      seal: "Demo",
    },
    ctaPrimary: { label: "Talk to the assistant", href: "/en/demos/atendente/" },
    ctaSecondary: { label: "See how I work", href: "/en/como-eu-trabalho/" },
  },
  home: {
    pillarsTurnLabel: "Shift 02 — Dawn",
    pillarsTitle: "Three things I fix in your business",
    pillarsLede:
      "None of it is magic. It's routine, data, and a well-configured conversation — and you can try all three right now, on this page.",
    pillars: [
      {
        title: "AI message support",
        body: "Questions about hours, address, services, and price answered right away, day or night. Anything out of the ordinary goes to a person, with a summary ready.",
        href: "/en/demos/atendente/",
        linkLabel: "Try the assistant",
      },
      {
        title: "Online presence & reputation audit",
        body: "An X-ray of what a customer finds when they look your business up: website, map, unanswered reviews — with a 3-step plan for what to fix first.",
        href: "/en/demos/auditoria/",
        linkLabel: "Run an audit",
      },
      {
        title: "Dashboards & data automation",
        body: "The spreadsheet nobody updates becomes a dashboard that updates itself. The report someone built by hand every week starts arriving ready-made.",
        href: "/en/demos/painel/",
        linkLabel: "Open the dashboard",
      },
    ],
    closingTurnLabel: "Shift 03 — Day",
    closingTitle: "Talk to me before you hire anything",
    closingBody: [
      "I'm Matheus. I work with data, automation, and support for small businesses — trading spreadsheets and manual steps for dashboards, routines that run on their own, and message support that doesn't stop when the shop closes.",
      "I use AI as part of how I work. I configure it, watch it, and I'm the one accountable for the result — it's not a bot left loose in your operation.",
      "Understanding your situation costs nothing. The first conversation is 20 minutes, no commitment, and the quote only comes after that.",
    ],
    closingCta: { label: "Book a free 20-minute diagnosis", href: "/en/contato/" },
  },
  solucoes: {
    title: "Solutions",
    lede: "Three lines of work. Each one has a live demo on this page — not just a description, something you can actually use.",
    pillars: [
      {
        title: "AI message support",
        summary: "Someone asks, someone answers — even at 11:47pm, even on a holiday.",
        body: [
          "The assistant understands hours, address, services, price, and requests to book, reschedule, or cancel. Typos don't stop the conversation.",
          "When the topic moves past the script — a complaint, a sensitive case, a question out of scope — it admits the limit and hands off to a person, with a ready summary of the conversation.",
          "In a real business, this runs on the company's official messaging channel. No automating a personal number, no working around the platform's usage policy.",
        ],
        demoLabel: "Talk to the demo assistant",
        demoHref: "/en/demos/atendente/",
      },
      {
        title: "Online presence & reputation audit",
        summary: "What does a new customer find when they look your business up?",
        body: [
          "A real audit uses public data — website, map, reviews — with sources cited. The demo below uses 3 fictional businesses so you can see the shape of the report.",
          "The report comes with an overall score, specific findings (no HTTPS, no message button, unanswered reviews), and a prioritized 3-step plan — not a generic checklist.",
          "There's also a tool for drafting a review reply by tone (praise, average, complaint), and a generator for messages asking happy customers to leave a review.",
        ],
        demoLabel: "Run the demo audit",
        demoHref: "/en/demos/auditoria/",
      },
      {
        title: "Dashboards & data automation",
        summary: "The spreadsheet nobody updates becomes a dashboard that updates itself.",
        body: [
          "Data from management-system APIs, spreadsheets, and other tools feeding a dashboard with revenue, cash flow, overdue payments, and service rankings — with period filters, comparisons, and a simple forecast.",
          "On the other side, automation: a routine that fetches paginated data, validates it, loads it incrementally, and emails the report on its own — including when something fails (with a retry and an error log).",
          "The two demos below show the shape of it: a fictional financial dashboard and an automation pipeline you can run, pause, and even break on purpose.",
        ],
        demoLabel: "See both data demos",
        demoHref: "/en/demos/",
      },
    ],
  },
  demosIndex: {
    title: "Demos",
    lede: "Four demos, each with a visible \"Demo\" seal. Every business, number, and chart here is fictional.",
    demos: [
      {
        title: "AI message assistant",
        summary: "Chat with the assistant for a fictional clinic, inn, or auto shop.",
        href: "/en/demos/atendente/",
        badge: "Demo",
      },
      {
        title: "Presence & reputation audit",
        summary: "Pick a fictional business and see the report and reply tools.",
        href: "/en/demos/auditoria/",
        badge: "Demo",
      },
      {
        title: "Financial & operations dashboard",
        summary: "Twelve months of fictional data, with filters, forecast, and anomaly alerts.",
        href: "/en/demos/painel/",
        badge: "Demo",
      },
      {
        title: "Data automation",
        summary: "A pipeline you can run, pause, and make fail on purpose.",
        href: "/en/demos/automacao/",
        badge: "Demo",
      },
    ],
  },
  comoEuTrabalho: {
    title: "How I work",
    lede: "Four steps, no fine print. And a clear list of what the AI I configure never does on its own.",
    steps: [
      {
        title: "1. Free 20-minute diagnosis",
        body: "A conversation to understand your business: where time gets lost, what already exists (spreadsheet, system, WhatsApp), and what hurts most today. No commitment.",
      },
      {
        title: "2. Proposal and quote",
        body: "Based on the diagnosis, I put together a proposal and a quote — after understanding the case, never before. There's no fixed price list, because every business starts from a different point.",
      },
      {
        title: "3. Implementation",
        body: "I configure the agreed support, dashboard, or automation, testing it with your business's real data before it goes live.",
      },
      {
        title: "4. Follow-up",
        body: "Once it's live, I keep watching how it runs and adjust what needs it. If the AI gets something wrong or gets stuck, fixing it is on me — I configure it, watch it, and I'm accountable for the result.",
      },
    ],
    aiBoundary: {
      title: "What the AI I configure doesn't do",
      lede: "This applies to any support I build — including the one in the demo above.",
      items: [
        "It doesn't make up a price. When there's no set price list, it says so and hands off to a person.",
        "It doesn't make medical, legal, or technical calls on its own.",
        "It doesn't decide sensitive cases alone — a serious complaint, an unusual cancellation request, anything outside the script goes to a human.",
        "It always offers to hand the conversation to a person, whenever that's asked for.",
        "It discloses that it's a virtual assistant — it doesn't pretend to be a person.",
      ],
    },
  },
  sobre: {
    title: "About",
    bio: [
      "I'm Matheus Santos, a technology and continuous improvement consultant. I work with data, automation, and support for small businesses: trading spreadsheets and manual steps for dashboards, routines that run on their own, and message support that doesn't stop when the shop closes.",
      "I use AI as part of how I work. I configure it, watch it, and I'm the one accountable for the result.",
    ],
    focus: [
      {
        title: "Data",
        body: "Power BI, spreadsheets, and API integrations with management systems — turning scattered numbers into a dashboard someone actually looks at.",
      },
      {
        title: "Automation",
        body: "Routines that fetch, validate, and load data on their own, and deliver the report ready-made instead of someone building it by hand every week.",
      },
      {
        title: "Support",
        body: "AI message support configured for your business, answering through the official channel, with clear limits and a handoff to a person when it's needed.",
      },
    ],
  },
  faq: {
    title: "FAQ",
    lede: "The questions that come up most before booking a diagnosis.",
    items: [
      {
        question: "How much does it cost?",
        answer:
          "There's no published price list. The quote comes after a free 20-minute diagnosis, because every business starts from a different point.",
      },
      {
        question: "Are the cases and numbers on this site real?",
        answer:
          "No. Every business, review, number, and chart shown in the demos is fictional, made up for this site, and marked with a \"Demo\" seal. I don't have published clients yet.",
      },
      {
        question: "Does the AI respond on its own in my business, with no oversight?",
        answer:
          "No. It follows a scope I configure, never makes up a price or decides sensitive cases on its own, can always hand off to a person, and discloses that it's a virtual assistant. See the full list in \"How I work\".",
      },
      {
        question: "Do you automate my personal WhatsApp number?",
        answer:
          "No. Support runs on the business's official messaging channel, following the platform's usage policy — never automating a personal number.",
      },
      {
        question: "How does the free diagnosis work?",
        answer:
          "A 20-minute conversation to understand your business and where it hurts most. No commitment, no proposal closed on the spot.",
      },
      {
        question: "Why do you use AI (Claude) in your way of working?",
        answer:
          "Because it speeds up what I already do — configuring support, organizing data, building automation. The AI doesn't replace my work: I configure it, watch it, and I'm accountable for the final result.",
      },
    ],
  },
  contato: {
    title: "Contact",
    lede: "The first step is a free 20-minute diagnosis, no commitment.",
    emailCta: "Send an email",
    emailSubject: "Free 20-minute diagnosis",
    whatsappCta: "Message on WhatsApp",
    whatsappNote:
      "The business WhatsApp is still being set up. For now, email is the fastest channel.",
    responseNote: "Tell me in a few lines what's going on in your business today.",
  },
  privacidade: {
    title: "Privacy & data protection",
    lede: "This site doesn't use cookies or trackers. Whatever happens in the demos stays in your browser.",
    sections: [
      {
        title: "No cookies, no tracking",
        body: [
          "This site doesn't use analytics cookies, ad pixels, or any third-party tracker. There's no browsing profile being built on visitors.",
        ],
      },
      {
        title: "The demos run in your browser",
        body: [
          "The chat with the assistant, the audit, the dashboard, and the automation pipeline are all processed locally, in your browser. Nothing you type into the demos is sent to a server or stored by me.",
          "The only thing saved locally is your theme preference (light or dark), stored in your own browser — never shared.",
        ],
      },
      {
        title: "Data from a real diagnosis or engagement",
        body: [
          "If you reach out for a diagnosis or hire a service, the information exchanged by email or the official messaging channel is used only for that engagement, in line with Brazil's LGPD. You can request deletion at any time through the contact email.",
        ],
      },
      {
        title: "Official messaging channel",
        body: [
          "When message support is implemented for a real business, it runs on the platform's official channel — never automating a personal number or working around the platform's usage policy.",
        ],
      },
    ],
  },
  demoA: {
    title: "AI message assistant",
    lede: "Pick a fictional business and chat for real. The engine runs in your browser, with no paid AI behind it.",
    scenarioPickerLabel: "Scenario",
    afterHoursToggleLabel: "Simulate after hours (11:47 PM)",
    afterHoursActiveNote: "Clock simulated at 11:47 PM — the business is closed, but the assistant keeps answering.",
    inputLabel: "Message",
    inputPlaceholder: "Type your message…",
    sendLabel: "Send",
    quickRepliesLabel: "Or start with:",
    chatRegionLabel: "Conversation with the demo assistant",
    resetLabel: "Reset conversation",
    panel: {
      title: "What the business sees",
      logTitle: "Conversation log",
      emptyLog: "No messages yet. Send a \"hi\" to get started.",
      intentTitle: "Last detected intent",
      noIntentYet: "—",
      intentLabels: {
        saudacao: "Greeting",
        horario: "Hours question",
        endereco: "Address question",
        servicos: "Services question",
        preco: "Price question",
        agendar: "Booking",
        remarcar: "Reschedule",
        cancelar: "Cancellation",
        falar_com_pessoa: "Human handoff request",
        desconhecido: "Out of scope",
      },
      agendaTitle: "Schedule",
      noBooking: "No time slot booked in this conversation yet.",
      bookingStageLabels: {
        idle: "No booking in progress",
        need_service: "Waiting for service choice",
        need_slot: "Waiting for time choice",
        need_name: "Waiting for customer's name",
        confirmed: "Confirmed",
      },
      handoffTitle: "Human handoff",
      noHandoff: "No handoff to a person has been requested in this conversation.",
      handoffReasonLabel: "Reason",
      handoffSummaryLabel: "Summary generated for the team",
      responseTimeTitle: "Response time",
      responseTimeNote: "Every reply goes out the same minute the message arrives — day or night.",
    },
  },
  demoB: {
    title: "Presence & reputation audit",
    lede: "Pick a fictional business and see the report. A real audit uses public data with sources cited — this is a demo of the format.",
    disclaimer: "The score, findings, and reviews below are fictional, generated for this demo from fixed rules — not a real audit.",
    businessPickerLabel: "Business",
    scoreLabel: "Overall score",
    checksTitle: "Website checks",
    checkLabels: {
      https: "Website has HTTPS",
      mobile: "Mobile-friendly website",
      messageButton: "Visible message button",
      map: "Address on the map",
      structuredData: "Structured data (schema.org)",
      reviewLink: "Direct review link",
    },
    checkPassedNote: "Ok",
    checkFailedNote: "To fix",
    reputationTitle: "Reputation",
    reputationAverageLabel: "Average review rating",
    totalReviewsLabel: "Total reviews",
    unansweredReviewsLabel: "Unanswered by the business",
    planTitle: "Prioritized plan (3 steps)",
    planStepLabels: {
      https: "Turn on HTTPS",
      mobile: "Make the site mobile-friendly",
      messageButton: "Add a visible message button",
      map: "List the address on the map",
      structuredData: "Add structured data to the site",
      reviewLink: "Create a direct review link",
      respond_reviews: "Reply to pending reviews",
      ask_reviews: "Ask happy customers for a review",
    },
    planStepBodies: {
      https: "Without a security certificate, the browser warns visitors — that turns away new customers. It's the most urgent technical fix.",
      mobile: "Most people search on their phone — a site that doesn't adapt loses the customer before the first contact.",
      messageButton: "If visitors have to hunt for how to reach you, many give up. A visible button fixes that.",
      map: "Without an indexed address, customers can't tell if it's worth the trip or gauge the distance.",
      structuredData: "This is the information that lets search engines show hours, address, and rating right in the results.",
      reviewLink: "Without an easy link, asking a happy customer for a review becomes friction and most never finish it.",
      respond_reviews: "An unanswered review reads as indifference — even a short reply changes that.",
      ask_reviews: "Few reviews carry less weight in search. Asking at the right moment is the simplest way to grow that number.",
    },
    reviewsListTitle: "Reviews (demo)",
    respondedLabel: "Replied",
    unansweredLabel: "No reply",
    responderTitle: "Review reply tool",
    responderLede: "Paste a review or pick an example from the business selected above.",
    pasteLabel: "Customer review",
    pastePlaceholder: "Paste the review text here…",
    pickExampleLabel: "Or pick an example:",
    useOwnTextLabel: "Write my own text",
    voiceLabel: "Reply tone",
    voiceOptions: {
      formal: "Formal",
      caloroso: "Warm",
      direto: "Direct",
    },
    generateReplyLabel: "Generate reply",
    replyResultTitle: "Suggested reply",
    justificationTitle: "Why this reply",
    toneDetectedLabel: "Tone detected in the review",
    toneLabels: {
      elogio: "Praise",
      neutro: "Neutral",
      reclamacao: "Complaint",
    },
    askReviewTitle: "Ask a happy customer for a review",
    askReviewLede: "A ready-to-send message for right after a good interaction.",
    askReviewGenerateLabel: "Generate message",
  },
  demoC: {
    title: "Financial & operations dashboard",
    lede: "Twelve months of fictional data, generated by code with a fixed seed — always the same numbers, so you can explore freely.",
    disclaimer: "Every number, chart, and alert below is fictional, generated by fixed rules for this demo.",
    periodLabel: "Period",
    periodPresets: [
      { label: "Last 3 months", months: 3 },
      { label: "Last 6 months", months: 6 },
      { label: "Full year", months: 12 },
    ],
    comparisonPrefix: "Revenue for the period: ",
    comparisonSuffixUp: "above the previous period",
    comparisonSuffixDown: "below the previous period",
    comparisonNoPrevious: "No full previous period to compare against.",
    statCards: {
      revenue: "Revenue for the period",
      cashFlow: "Cash flow for the period",
      defaultRate: "Average default rate",
      averageTicket: "Average ticket",
    },
    revenueChartTitle: "Monthly revenue",
    revenueChartDescription: "Line chart showing month-by-month revenue for the selected period, with out-of-pattern months marked.",
    forecastToggleLabel: "Show forecast for next months",
    forecastLegend: "Forecast (illustrative projection)",
    forecastNote: "Illustrative projection: moving average of the period's last 3 months, with an uncertainty band based on recent variation. Not a guarantee of future revenue.",
    anomalyTitle: "Anomaly alerts",
    anomalyNone: "No out-of-pattern months in this period.",
    anomalyAbove: "above the yearly average",
    anomalyBelow: "below the yearly average",
    servicesTitle: "Service ranking",
    servicesHeaders: { service: "Service", revenue: "Yearly revenue", share: "Share" },
    tableTitle: "Monthly breakdown",
    tableHeaders: {
      month: "Month",
      revenue: "Revenue",
      expenses: "Expenses",
      receivables: "Receivables",
      cashFlow: "Cash flow",
      defaultRate: "Default rate",
      averageTicket: "Average ticket",
      transactions: "Transactions",
    },
    tableDetailHint: "Click a row to see that month's detail.",
    exportCsvLabel: "Export CSV",
  },
} satisfies Dictionary;

export default en;
