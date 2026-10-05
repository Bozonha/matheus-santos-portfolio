import type { Intent } from "./types";
import type { Locale } from "@/lib/routes";

/**
 * Palavras-chave ja normalizadas (sem acento, minusculas) por intencao e
 * idioma. A ordem da lista de intencoes define a prioridade no empate de
 * pontuacao em intentMatcher.ts.
 */
export const INTENT_PRIORITY: Exclude<Intent, "desconhecido">[] = [
  "falar_com_pessoa",
  "cancelar",
  "remarcar",
  "agendar",
  "preco",
  "servicos",
  "horario",
  "endereco",
  "saudacao",
];

export const INTENT_KEYWORDS: Record<Locale, Record<Exclude<Intent, "desconhecido">, string[]>> = {
  pt: {
    saudacao: ["oi", "ola", "bom", "dia", "tarde", "noite", "eae", "opa"],
    horario: ["horario", "horarios", "abre", "fecha", "funciona", "aberto", "fechado", "atende"],
    endereco: ["endereco", "localizacao", "local", "fica", "onde", "rua", "mapa"],
    servicos: ["servico", "servicos", "fazem", "oferecem", "tem", "opcoes"],
    preco: ["preco", "precos", "valor", "valores", "quanto", "custa", "orcamento"],
    agendar: ["agendar", "agendamento", "marcar", "reservar", "vaga"],
    remarcar: ["remarcar", "remarcacao", "mudar", "trocar", "adiar"],
    cancelar: ["cancelar", "cancelamento"],
    falar_com_pessoa: [
      "pessoa",
      "humano",
      "atendente",
      "gerente",
      "falar",
      "alguem",
      "real",
    ],
  },
  en: {
    saudacao: ["hi", "hello", "hey", "good", "morning", "afternoon", "evening"],
    horario: ["hours", "hour", "open", "closed", "close", "opens", "closes"],
    endereco: ["address", "location", "located", "map", "street"],
    servicos: ["service", "services", "offer", "options", "provide"],
    preco: ["price", "prices", "cost", "costs", "quote", "much"],
    agendar: ["book", "booking", "schedule", "appointment", "reserve", "slot"],
    remarcar: ["reschedule", "change", "move", "postpone"],
    cancelar: ["cancel", "cancellation"],
    falar_com_pessoa: ["person", "human", "agent", "manager", "someone", "real"],
  },
};
