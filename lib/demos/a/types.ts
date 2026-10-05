import type { Locale } from "@/lib/routes";

export type ScenarioId = "clinica" | "pousada" | "oficina";

export type Intent =
  | "saudacao"
  | "horario"
  | "endereco"
  | "servicos"
  | "preco"
  | "agendar"
  | "remarcar"
  | "cancelar"
  | "falar_com_pessoa"
  | "desconhecido";

export interface ServiceOption {
  id: string;
  label: string;
  /** null = sem preco fechado ("sob avaliacao") — o motor nunca inventa um numero aqui. */
  price: string | null;
}

export interface SlotOption {
  id: string;
  label: string;
}

export interface ScenarioConfig {
  id: ScenarioId;
  locale: Locale;
  businessName: string;
  businessKind: string;
  hoursLabel: string;
  address: string;
  services: ServiceOption[];
  availableSlots: SlotOption[];
  quickReplies: string[];
}

export interface ChatMessage {
  id: string;
  from: "cliente" | "atendente";
  text: string;
  time: string;
  intent?: Intent;
}

export type BookingStage = "idle" | "need_service" | "need_slot" | "need_name" | "confirmed";

export interface BookingDraft {
  serviceId: string | null;
  slotId: string | null;
  name: string | null;
}

export interface Booking {
  stage: BookingStage;
  draft: BookingDraft;
  confirmedAt: string | null;
  bookedAfterHours: boolean;
}

export interface HandoffCard {
  reason: string;
  summary: string;
  at: string;
}

export interface ConversationState {
  scenarioId: ScenarioId;
  messages: ChatMessage[];
  booking: Booking;
  handoff: HandoffCard | null;
}

export interface TurnContext {
  locale: Locale;
  isAfterHours: boolean;
  /** Relogio simulado em "HH:mm", usado nos timestamps das mensagens. */
  clock: string;
  /** Indice sequencial do turno, usado so para variar a redacao de forma deterministica. */
  turnIndex: number;
}

export interface TurnResult {
  state: ConversationState;
  reply: string;
  intent: Intent;
}
