import type { Locale } from "@/lib/routes";
import type { ScenarioConfig, ScenarioId } from "./types";

/**
 * Negocios ficticios de demonstracao. Nomes inventados, sem relacao com
 * marcas reais. O motor de conversa NUNCA responde com um dado que nao
 * esteja aqui — e a unica fonte de fatos (horario, endereco, servicos,
 * preco, horarios livres) por cenario.
 */
export const SCENARIO_FIXTURES: Record<Locale, Record<ScenarioId, ScenarioConfig>> = {
  pt: {
    clinica: {
      id: "clinica",
      locale: "pt",
      businessName: "Sorriso Novo Odontologia",
      businessKind: "clínica odontológica",
      hoursLabel: "Seg a sex, 8h às 18h. Sáb, 8h às 12h.",
      address: "Rua das Acácias, 120 — Jardim Primavera",
      services: [
        { id: "limpeza", label: "Limpeza e profilaxia", price: "R$ 150" },
        { id: "consulta", label: "Consulta de avaliação", price: "R$ 120" },
        { id: "clareamento", label: "Clareamento dental", price: null },
        { id: "canal", label: "Tratamento de canal", price: null },
      ],
      availableSlots: [
        { id: "slot1", label: "amanhã às 9h" },
        { id: "slot2", label: "amanhã às 10h30" },
        { id: "slot3", label: "amanhã às 14h" },
      ],
      quickReplies: [
        "Qual o horário de vocês?",
        "Quero agendar uma consulta",
        "Quanto custa a limpeza?",
      ],
    },
    pousada: {
      id: "pousada",
      locale: "pt",
      businessName: "Pousada Vista do Vale",
      businessKind: "pousada",
      hoursLabel: "Recepção aberta das 7h à meia-noite, todos os dias.",
      address: "Estrada do Vale, km 4 — Zona Rural",
      services: [
        { id: "standard", label: "Diária quarto standard", price: "R$ 280" },
        { id: "luxo", label: "Diária quarto luxo com varanda", price: "R$ 380" },
        { id: "cafe", label: "Café da manhã", price: "Incluso na diária" },
        { id: "evento", label: "Aluguel de espaço para eventos", price: null },
      ],
      availableSlots: [
        { id: "slot1", label: "sexta a domingo (2 noites)" },
        { id: "slot2", label: "próxima terça a quinta (2 noites)" },
        { id: "slot3", label: "feriado prolongado do mês que vem" },
      ],
      quickReplies: [
        "Quais quartos vocês têm?",
        "Tem vaga para o fim de semana?",
        "Qual o endereço?",
      ],
    },
    oficina: {
      id: "oficina",
      locale: "pt",
      businessName: "Oficina Boa Marcha",
      businessKind: "oficina mecânica",
      hoursLabel: "Seg a sex, 8h às 18h. Sáb, 8h às 13h.",
      address: "Av. dos Mecânicos, 500 — Distrito Industrial",
      services: [
        { id: "revisao", label: "Revisão completa", price: "R$ 220" },
        { id: "troca_oleo", label: "Troca de óleo e filtro", price: "R$ 180" },
        { id: "freios", label: "Reparo no sistema de freios", price: null },
        { id: "eletrica", label: "Diagnóstico elétrico", price: "R$ 90" },
      ],
      availableSlots: [
        { id: "slot1", label: "amanhã às 8h" },
        { id: "slot2", label: "amanhã às 13h30" },
        { id: "slot3", label: "quinta-feira às 9h" },
      ],
      quickReplies: [
        "Quanto custa uma revisão?",
        "Tem horário amanhã?",
        "Qual o endereço da oficina?",
      ],
    },
  },
  en: {
    clinica: {
      id: "clinica",
      locale: "en",
      businessName: "New Smile Dental Care",
      businessKind: "dental clinic",
      hoursLabel: "Mon–Fri, 8am–6pm. Sat, 8am–12pm.",
      address: "120 Acacia Street — Jardim Primavera",
      services: [
        { id: "limpeza", label: "Cleaning", price: "R$ 150" },
        { id: "consulta", label: "Check-up", price: "R$ 120" },
        { id: "clareamento", label: "Teeth whitening", price: null },
        { id: "canal", label: "Root canal", price: null },
      ],
      availableSlots: [
        { id: "slot1", label: "tomorrow at 9am" },
        { id: "slot2", label: "tomorrow at 10:30am" },
        { id: "slot3", label: "tomorrow at 2pm" },
      ],
      quickReplies: [
        "What are your hours?",
        "I'd like to book an appointment",
        "How much is a cleaning?",
      ],
    },
    pousada: {
      id: "pousada",
      locale: "en",
      businessName: "Valley View Inn",
      businessKind: "inn",
      hoursLabel: "Front desk open 7am to midnight, every day.",
      address: "Valley Road, km 4 — Countryside",
      services: [
        { id: "standard", label: "Standard room / night", price: "R$ 280" },
        { id: "luxo", label: "Suite with balcony / night", price: "R$ 380" },
        { id: "cafe", label: "Breakfast", price: "Included" },
        { id: "evento", label: "Event space rental", price: null },
      ],
      availableSlots: [
        { id: "slot1", label: "Friday to Sunday (2 nights)" },
        { id: "slot2", label: "next Tuesday to Thursday (2 nights)" },
        { id: "slot3", label: "next month's long weekend" },
      ],
      quickReplies: [
        "What rooms do you have?",
        "Any openings this weekend?",
        "What's the address?",
      ],
    },
    oficina: {
      id: "oficina",
      locale: "en",
      businessName: "Good Mile Auto Shop",
      businessKind: "auto repair shop",
      hoursLabel: "Mon–Fri, 8am–6pm. Sat, 8am–1pm.",
      address: "500 Mechanics Ave — Industrial District",
      services: [
        { id: "revisao", label: "Full inspection", price: "R$ 220" },
        { id: "troca_oleo", label: "Oil and filter change", price: "R$ 180" },
        { id: "freios", label: "Brake repair", price: null },
        { id: "eletrica", label: "Electrical diagnostics", price: "R$ 90" },
      ],
      availableSlots: [
        { id: "slot1", label: "tomorrow at 8am" },
        { id: "slot2", label: "tomorrow at 1:30pm" },
        { id: "slot3", label: "Thursday at 9am" },
      ],
      quickReplies: [
        "How much is a full inspection?",
        "Any openings tomorrow?",
        "What's the shop's address?",
      ],
    },
  },
};

export function getScenario(locale: Locale, id: ScenarioId): ScenarioConfig {
  return SCENARIO_FIXTURES[locale][id];
}
