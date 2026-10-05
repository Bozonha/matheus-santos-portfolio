import type { Dictionary } from "./types";

const pt = {
  locale: "pt",
  meta: {
    siteName: "Matheus Santos",
    title: "Matheus Santos — Consultor em Tecnologia e Melhoria Contínua",
    description:
      "Dados, automação e atendimento por mensagem com IA para pequenos negócios. Converse com um atendente de demonstração, rode uma auditoria e mexa num painel — tudo ao vivo nesta página.",
    ogAlt: "Matheus Santos, consultor em tecnologia e melhoria contínua",
  },
  skipLink: "Pular para o conteúdo principal",
  header: {
    menuLabel: "Menu",
    nav: {
      solucoes: "Soluções",
      demos: "Demos",
      comoEuTrabalho: "Como eu trabalho",
      sobre: "Sobre",
      faq: "Perguntas frequentes",
      contato: "Contato",
    },
    localeSwitcherLabel: "English",
    themeToggle: {
      toLight: "Mudar para tema claro",
      toDark: "Mudar para tema escuro",
    },
  },
  footer: {
    tagline: "O negócio fecha. A conversa continua.",
    demoDisclaimer:
      "Todo caso, negócio, avaliação, número e gráfico mostrado neste site é fictício e serve só de demonstração. Nenhum resultado aqui é garantia de resultado real.",
    contactLabel: "E-mail",
    contactEmail: "pjmatheussantos@gmail.com",
    privacyLink: "Privacidade e LGPD",
    rights: "Matheus Santos — Consultor em Tecnologia e Melhoria Contínua.",
  },
  hero: {
    turnLabel: "Turno 01 — Noite",
    time: "23h47",
    eyebrow: "A loja fechou há quase quatro horas",
    title: "O negócio fecha. O atendimento, não.",
    lede: "O que você vai ver abaixo é a primeira demonstração do site: uma conversa chegando fora do horário, sendo respondida na hora, sem ninguém acordado para isso.",
    chat: {
      scenarioLabel: "Clínica odontológica — demonstração",
      messages: [
        { from: "cliente", text: "Vocês têm horário amanhã?" },
        {
          from: "atendente",
          text: "Temos sim. Amanhã tem às 9h, 10h30 e 14h. Quer que eu reserve um horário?",
        },
        { from: "cliente", text: "Pode ser 10h30" },
        { from: "atendente", text: "Fechado. Seu nome, por favor?" },
        { from: "cliente", text: "Ana Paula" },
        {
          from: "atendente",
          text: "Obrigada, Ana! Horário reservado para amanhã às 10h30. Qualquer coisa, é só responder por aqui.",
        },
      ],
      statusLine: "Agendamento registrado às 23h48 — ninguém precisou acordar para isso.",
      seal: "Demonstração",
    },
    ctaPrimary: { label: "Conversar com o atendente", href: "/pt/demos/atendente/" },
    ctaSecondary: { label: "Ver como eu trabalho", href: "/pt/como-eu-trabalho/" },
  },
  home: {
    pillarsTurnLabel: "Turno 02 — Madrugada",
    pillarsTitle: "Três coisas que eu arrumo no seu negócio",
    pillarsLede:
      "Nenhuma delas é mágica. São rotina, dados e uma conversa bem configurada — e dá para experimentar as três agora, nesta página.",
    pillars: [
      {
        title: "Atendimento por mensagem com IA",
        body: "Perguntas de horário, endereço, serviço e preço respondidas na hora, de dia ou de madrugada. Casos fora do comum passam para uma pessoa, com resumo pronto.",
        href: "/pt/demos/atendente/",
        linkLabel: "Testar o atendente",
      },
      {
        title: "Auditoria de presença e reputação",
        body: "Um raio-x do que um cliente encontra ao procurar seu negócio: site, mapa, avaliações sem resposta — com um plano de 3 passos para arrumar primeiro.",
        href: "/pt/demos/auditoria/",
        linkLabel: "Rodar uma auditoria",
      },
      {
        title: "Painéis e automação de dados",
        body: "Planilha vira painel que atualiza sozinho. Relatório que alguém montava toda semana passa a chegar pronto por e-mail.",
        href: "/pt/demos/painel/",
        linkLabel: "Abrir o painel",
      },
    ],
    closingTurnLabel: "Turno 03 — Dia",
    closingTitle: "Converse comigo antes de contratar qualquer coisa",
    closingBody: [
      "Eu sou o Matheus. Trabalho com dados, automação e atendimento para pequenos negócios — troco planilha e processo manual por painéis, rotinas que rodam sozinhas e atendimento que não para quando a loja fecha.",
      "Uso IA como parte do método de trabalho. Eu configuro, acompanho e respondo pelo resultado — não é um robô solto na sua operação.",
      "Não cobro nada para entender o seu caso. A conversa inicial é de 20 minutos, sem compromisso, e o orçamento só vem depois disso.",
    ],
    closingCta: { label: "Pedir diagnóstico gratuito de 20 minutos", href: "/pt/contato/" },
  },
  solucoes: {
    title: "Soluções",
    lede: "Três frentes de trabalho. Cada uma tem uma demonstração ao vivo nesta página — não é só descrição, é para você mexer.",
    pillars: [
      {
        title: "Atendimento por mensagem com IA",
        summary:
          "Alguém pergunta, alguém responde — mesmo às 23h47, mesmo num feriado.",
        body: [
          "O atendente entende horário, endereço, serviços, preço e pedidos de agendamento, remarcação e cancelamento. Erros de digitação não travam a conversa.",
          "Quando o assunto sai do script — reclamação, caso sensível, pergunta fora do escopo — ele admite o limite e passa para uma pessoa, com um resumo pronto da conversa.",
          "No seu negócio, isso roda sobre o canal oficial de mensagens da empresa. Sem automatizar número pessoal, sem driblar política de uso.",
        ],
        demoLabel: "Conversar com o atendente de demonstração",
        demoHref: "/pt/demos/atendente/",
      },
      {
        title: "Auditoria de presença e reputação",
        summary: "O que um cliente novo encontra quando procura o seu negócio?",
        body: [
          "A auditoria real usa dados públicos — site, mapa, avaliações — com as fontes citadas. A demonstração abaixo usa 3 negócios fictícios para você ver o formato do relatório.",
          "O relatório sai com nota geral, achados específicos (site sem HTTPS, sem botão de mensagem, avaliações sem resposta) e um plano priorizado em 3 passos — não uma lista genérica.",
          "Tem também uma ferramenta para rascunhar resposta a avaliação por tom (elogio, nota média, reclamação) e um gerador de mensagem para pedir avaliação a cliente satisfeito.",
        ],
        demoLabel: "Rodar a auditoria de demonstração",
        demoHref: "/pt/demos/auditoria/",
      },
      {
        title: "Painéis e automação de dados",
        summary: "A planilha que ninguém atualiza vira painel que atualiza sozinho.",
        body: [
          "Dados de ERPs com API, planilhas e sistemas de gestão alimentando um painel com faturamento, fluxo de caixa, inadimplência e ranking de serviços — com filtro por período, comparação e previsão simples.",
          "Do outro lado, automação: rotina que busca dados paginados, valida, carrega de forma incremental e manda relatório por e-mail sozinha, inclusive quando algo dá errado (com nova tentativa e registro do erro).",
          "As duas demonstrações abaixo mostram o formato: um painel financeiro fictício e um pipeline de automação que você pode executar, pausar e até quebrar de propósito.",
        ],
        demoLabel: "Ver as duas demonstrações de dados",
        demoHref: "/pt/demos/",
      },
    ],
  },
  demosIndex: {
    title: "Demos",
    lede: "Quatro demonstrações, cada uma com um selo \"Demonstração\" visível. Todo dado, negócio e número aqui é fictício.",
    demos: [
      {
        title: "Atendente de mensagens com IA",
        summary: "Converse com o atendente de uma clínica, pousada ou oficina fictícia.",
        href: "/pt/demos/atendente/",
        badge: "Demonstração",
      },
      {
        title: "Auditoria de presença e reputação",
        summary: "Escolha um negócio fictício e veja o relatório e as ferramentas de resposta.",
        href: "/pt/demos/auditoria/",
        badge: "Demonstração",
      },
      {
        title: "Painel financeiro e operacional",
        summary: "Doze meses de dados fictícios, com filtro, previsão e alerta de anomalia.",
        href: "/pt/demos/painel/",
        badge: "Demonstração",
      },
      {
        title: "Automação de dados",
        summary: "Um pipeline que você executa, pausa e pode fazer falhar de propósito.",
        href: "/pt/demos/automacao/",
        badge: "Demonstração",
      },
    ],
  },
  comoEuTrabalho: {
    title: "Como eu trabalho",
    lede: "Quatro passos, sem letra miúda. E uma lista clara do que a IA que eu configuro nunca faz sozinha.",
    steps: [
      {
        title: "1. Diagnóstico gratuito de 20 minutos",
        body: "Uma conversa para entender o seu negócio: onde o tempo se perde, o que já existe (planilha, sistema, WhatsApp) e o que dói mais hoje. Sem compromisso.",
      },
      {
        title: "2. Proposta e orçamento",
        body: "Com base no diagnóstico, eu monto uma proposta e um orçamento — depois de entender o caso, nunca antes. Não existe tabela de preço fixa porque cada negócio parte de um ponto diferente.",
      },
      {
        title: "3. Implementação",
        body: "Eu configuro o atendimento, o painel ou a automação combinados, testando com dados reais do seu negócio antes de colocar no ar.",
      },
      {
        title: "4. Acompanhamento",
        body: "Depois de no ar, eu acompanho o funcionamento e ajusto o que precisar. Se a IA errar ou travar em algum caso, a responsabilidade do ajuste é minha — eu configuro, acompanho e respondo pelo resultado.",
      },
    ],
    aiBoundary: {
      title: "O que a IA que eu configuro não faz",
      lede: "Isso vale para qualquer atendimento que eu monte — inclusive o da demonstração acima.",
      items: [
        "Não inventa preço. Quando não há uma tabela definida, ela diz isso e passa para uma pessoa.",
        "Não faz diagnóstico médico, jurídico ou técnico por conta própria.",
        "Não decide sozinha casos sensíveis — reclamação grave, pedido de cancelamento fora do padrão, qualquer coisa fora do script vai para um humano.",
        "Sempre oferece passar a conversa para uma pessoa, a qualquer momento que pedirem.",
        "Avisa que é um assistente virtual — não finge ser uma pessoa.",
      ],
    },
  },
  sobre: {
    title: "Sobre",
    bio: [
      "Sou Matheus Santos, consultor em tecnologia e melhoria contínua. Trabalho com dados, automação e atendimento para pequenos negócios: troco planilha e processo manual por painéis, rotinas que rodam sozinhas e atendimento por mensagem que não para quando a loja fecha.",
      "Uso IA como parte do método. Eu configuro, acompanho e respondo pelo resultado.",
    ],
    focus: [
      {
        title: "Dados",
        body: "Power BI, planilhas e integração com ERPs por API — transformando números espalhados em um painel que alguém realmente olha.",
      },
      {
        title: "Automação",
        body: "Rotinas que buscam, validam e carregam dados sozinhas, e mandam o relatório pronto em vez de alguém montar na mão toda semana.",
      },
      {
        title: "Atendimento",
        body: "Atendimento por mensagem com IA configurado para o seu negócio, respondendo pelo canal oficial, com limites claros e passagem para humano quando precisa.",
      },
    ],
  },
  faq: {
    title: "Perguntas frequentes",
    lede: "As perguntas que mais fazem sentido antes de marcar o diagnóstico.",
    items: [
      {
        question: "Quanto custa?",
        answer:
          "Não existe tabela de preço fixa publicada. O orçamento vem depois de um diagnóstico gratuito de 20 minutos, porque cada negócio parte de um ponto diferente.",
      },
      {
        question: "Os casos e números deste site são reais?",
        answer:
          "Não. Todo negócio, avaliação, número e gráfico mostrado nas demonstrações é fictício, inventado para este site, e está marcado com o selo \"Demonstração\". Eu ainda não tenho clientes publicados.",
      },
      {
        question: "A IA responde sozinha no meu negócio, sem controle nenhum?",
        answer:
          "Não. Ela segue um escopo que eu configuro, nunca inventa preço ou decide casos sensíveis sozinha, sempre pode passar para uma pessoa, e avisa que é um assistente virtual. Veja a lista completa em \"Como eu trabalho\".",
      },
      {
        question: "Vocês usam o meu número de WhatsApp pessoal para automatizar?",
        answer:
          "Não. O atendimento roda sobre o canal oficial de mensagens do negócio, seguindo a política de uso da plataforma — nunca automatizando um número pessoal.",
      },
      {
        question: "Como funciona o diagnóstico gratuito?",
        answer:
          "Uma conversa de 20 minutos para entender o seu negócio e onde dói mais. Sem compromisso, sem proposta fechada na hora.",
      },
      {
        question: "Por que você usa IA (Claude) no seu método de trabalho?",
        answer:
          "Porque acelera o que já faço — configurar atendimento, organizar dados, montar automação. A IA não substitui o meu trabalho: eu configuro, acompanho e respondo pelo resultado final.",
      },
    ],
  },
  contato: {
    title: "Contato",
    lede: "O primeiro passo é um diagnóstico gratuito de 20 minutos, sem compromisso.",
    emailCta: "Mandar e-mail",
    emailSubject: "Diagnóstico gratuito de 20 minutos",
    whatsappCta: "Chamar no WhatsApp",
    whatsappNote:
      "O WhatsApp de negócio ainda está sendo configurado. Por enquanto, o e-mail é o canal mais rápido.",
    responseNote: "Conte em poucas linhas o que está acontecendo no seu negócio hoje.",
  },
  privacidade: {
    title: "Privacidade e LGPD",
    lede: "Este site não usa cookies nem rastreadores. O que acontece nas demonstrações fica no seu navegador.",
    sections: [
      {
        title: "Sem cookies, sem rastreamento",
        body: [
          "Este site não usa cookies de analytics, pixels de publicidade ou qualquer rastreador de terceiros. Não existe perfil de navegação sendo montado sobre quem visita.",
        ],
      },
      {
        title: "As demonstrações rodam no seu navegador",
        body: [
          "A conversa com o atendente, a auditoria, o painel e o pipeline de automação são processados localmente, no seu navegador. Nada do que você digita nas demonstrações é enviado para um servidor ou guardado por mim.",
          "A única informação salva localmente é a sua preferência de tema (claro ou escuro), guardada no seu próprio navegador — nunca compartilhada.",
        ],
      },
      {
        title: "Dados de um diagnóstico ou contrato real",
        body: [
          "Se você me procurar para um diagnóstico ou contratar um serviço, os dados trocados por e-mail ou pelo canal oficial de mensagens são usados só para aquele atendimento, conforme a LGPD. Você pode pedir a exclusão a qualquer momento pelo e-mail de contato.",
        ],
      },
      {
        title: "Canal oficial de mensagens",
        body: [
          "Quando o atendimento por mensagem é implementado num negócio real, ele roda sobre o canal oficial da plataforma usada — nunca automatizando um número pessoal nem contornando a política de uso dela.",
        ],
      },
    ],
  },
  demoA: {
    title: "Atendente de mensagens com IA",
    lede: "Escolha um negócio fictício e converse de verdade. O motor roda no seu navegador, sem IA paga por trás.",
    scenarioPickerLabel: "Cenário",
    afterHoursToggleLabel: "Simular fora do horário (23h47)",
    afterHoursActiveNote: "Relógio simulado em 23h47 — o negócio está fechado, mas o atendente continua respondendo.",
    inputLabel: "Mensagem",
    inputPlaceholder: "Digite sua mensagem…",
    sendLabel: "Enviar",
    quickRepliesLabel: "Ou comece com:",
    chatRegionLabel: "Conversa com o atendente de demonstração",
    resetLabel: "Reiniciar conversa",
    panel: {
      title: "O que o negócio vê",
      logTitle: "Registro da conversa",
      emptyLog: "Nenhuma mensagem ainda. Mande um \"oi\" para começar.",
      intentTitle: "Última intenção detectada",
      noIntentYet: "—",
      intentLabels: {
        saudacao: "Saudação",
        horario: "Pergunta sobre horário",
        endereco: "Pergunta sobre endereço",
        servicos: "Pergunta sobre serviços",
        preco: "Pergunta sobre preço",
        agendar: "Agendamento",
        remarcar: "Remarcação",
        cancelar: "Cancelamento",
        falar_com_pessoa: "Pedido de atendimento humano",
        desconhecido: "Fora de escopo",
      },
      agendaTitle: "Agenda",
      noBooking: "Nenhum horário reservado nesta conversa ainda.",
      bookingStageLabels: {
        idle: "Sem agendamento em andamento",
        need_service: "Aguardando escolha de serviço",
        need_slot: "Aguardando escolha de horário",
        need_name: "Aguardando nome do cliente",
        confirmed: "Confirmado",
      },
      handoffTitle: "Passagem para humano",
      noHandoff: "Nenhuma passagem para humano foi pedida nesta conversa.",
      handoffReasonLabel: "Motivo",
      handoffSummaryLabel: "Resumo gerado para a equipe",
      responseTimeTitle: "Tempo de resposta",
      responseTimeNote: "Cada resposta sai no mesmo minuto em que a mensagem chega — de dia ou de madrugada.",
    },
  },
  demoB: {
    title: "Auditoria de presença e reputação",
    lede: "Escolha um negócio fictício e veja o relatório. A auditoria real usa dados públicos com fonte citada — esta aqui é uma demonstração do formato.",
    disclaimer: "Nota, achados e avaliações abaixo são fictícios, gerados para esta demonstração a partir de regras fixas — não são uma auditoria real.",
    businessPickerLabel: "Negócio",
    scoreLabel: "Nota geral",
    checksTitle: "Checagens do site",
    checkLabels: {
      https: "Site com HTTPS",
      mobile: "Site adaptado para celular",
      messageButton: "Botão de mensagem visível",
      map: "Endereço no mapa",
      structuredData: "Dados estruturados (schema.org)",
      reviewLink: "Link direto para avaliar",
    },
    checkPassedNote: "Ok",
    checkFailedNote: "A resolver",
    reputationTitle: "Reputação",
    reputationAverageLabel: "Nota média das avaliações",
    totalReviewsLabel: "Total de avaliações",
    unansweredReviewsLabel: "Sem resposta do negócio",
    planTitle: "Plano priorizado (3 passos)",
    planStepLabels: {
      https: "Ativar HTTPS no site",
      mobile: "Adaptar o site para celular",
      messageButton: "Colocar um botão de mensagem visível",
      map: "Cadastrar o endereço no mapa",
      structuredData: "Adicionar dados estruturados ao site",
      reviewLink: "Criar um link direto para avaliar",
      respond_reviews: "Responder as avaliações pendentes",
      ask_reviews: "Pedir avaliação a clientes satisfeitos",
    },
    planStepBodies: {
      https: "Sem certificado de segurança, o navegador avisa o visitante e isso afasta cliente novo. É o ajuste técnico mais urgente.",
      mobile: "A maioria pesquisa pelo celular — um site que não se ajusta à tela perde o cliente antes do primeiro contato.",
      messageButton: "Se o visitante precisa procurar como falar com vocês, muita gente desiste no caminho. Um botão visível resolve isso.",
      map: "Sem o endereço indexado, o cliente não sabe se vale a pena ir até lá nem calcula a distância.",
      structuredData: "São informações que ajudam o buscador a mostrar horário, endereço e nota direto no resultado da busca.",
      reviewLink: "Sem um link fácil, pedir avaliação a cliente satisfeito vira fricção e a maioria não completa o pedido.",
      respond_reviews: "Avaliação sem resposta passa impressão de descaso — mesmo uma resposta curta muda isso.",
      ask_reviews: "Poucas avaliações pesam menos na busca. Pedir no momento certo é o jeito mais simples de aumentar o número.",
    },
    reviewsListTitle: "Avaliações (demonstração)",
    respondedLabel: "Respondida",
    unansweredLabel: "Sem resposta",
    responderTitle: "Ferramenta de resposta a avaliações",
    responderLede: "Cole uma avaliação ou escolha uma de exemplo do negócio selecionado acima.",
    pasteLabel: "Avaliação do cliente",
    pastePlaceholder: "Cole aqui o texto da avaliação…",
    pickExampleLabel: "Ou escolha um exemplo:",
    useOwnTextLabel: "Escrever o meu próprio texto",
    voiceLabel: "Tom da resposta",
    voiceOptions: {
      formal: "Formal",
      caloroso: "Caloroso",
      direto: "Direto",
    },
    generateReplyLabel: "Gerar resposta",
    replyResultTitle: "Resposta sugerida",
    justificationTitle: "Por que essa resposta",
    toneDetectedLabel: "Tom identificado na avaliação",
    toneLabels: {
      elogio: "Elogio",
      neutro: "Neutro",
      reclamacao: "Reclamação",
    },
    askReviewTitle: "Pedir avaliação a um cliente satisfeito",
    askReviewLede: "Uma mensagem pronta para mandar depois de um bom atendimento.",
    askReviewGenerateLabel: "Gerar mensagem",
  },
} satisfies Dictionary;

export default pt;
