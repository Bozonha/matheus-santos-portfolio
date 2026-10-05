import type { Locale } from "@/lib/routes";
import { matchIntent } from "./intentMatcher";
import { findBestMatch } from "./fieldMatcher";
import {
  addressReply,
  askNameReply,
  askServiceReply,
  askSlotReply,
  bookingConfirmReply,
  cancelConfirmReply,
  cancelNothingReply,
  greetingReply,
  handoffAckReply,
  hoursReply,
  priceReply,
  rescheduleAskSlotReply,
  rescheduleNoBookingReply,
  serviceNotFoundReply,
  servicesReply,
  slotNotFoundReply,
  unknownReply,
} from "./replies";
import type {
  Booking,
  ChatMessage,
  ConversationState,
  HandoffCard,
  Intent,
  ScenarioConfig,
  ScenarioId,
  TurnContext,
  TurnResult,
} from "./types";

export function createInitialBooking(): Booking {
  return {
    stage: "idle",
    draft: { serviceId: null, slotId: null, name: null },
    confirmedAt: null,
    bookedAfterHours: false,
  };
}

export function createInitialState(scenarioId: ScenarioId): ConversationState {
  return {
    scenarioId,
    messages: [],
    booking: createInitialBooking(),
    handoff: null,
  };
}

function summarizeForHandoff(
  state: ConversationState,
  scenario: ScenarioConfig,
  locale: Locale,
  lastClientText: string,
): string {
  const { draft } = state.booking;
  const service = draft.serviceId
    ? scenario.services.find((s) => s.id === draft.serviceId)
    : null;
  const slot = draft.slotId
    ? scenario.availableSlots.find((s) => s.id === draft.slotId)
    : null;

  const parts: string[] = [];
  if (service) {
    parts.push(locale === "pt" ? `serviço: ${service.label}` : `service: ${service.label}`);
  }
  if (slot) {
    parts.push(locale === "pt" ? `horário: ${slot.label}` : `time: ${slot.label}`);
  }
  if (draft.name) {
    parts.push(locale === "pt" ? `nome: ${draft.name}` : `name: ${draft.name}`);
  }

  const draftLine = parts.length
    ? locale === "pt"
      ? `Agendamento em andamento (${parts.join(", ")}).`
      : `Booking in progress (${parts.join(", ")}).`
    : "";

  const lastLine =
    locale === "pt"
      ? `Última mensagem do cliente: "${lastClientText}".`
      : `Customer's last message: "${lastClientText}".`;

  return [draftLine, lastLine].filter(Boolean).join(" ");
}

function appendMessage(state: ConversationState, message: ChatMessage): ConversationState {
  return { ...state, messages: [...state.messages, message] };
}

interface StatePatch {
  booking?: Booking;
  handoff?: HandoffCard | null;
}

function finish(
  state: ConversationState,
  clientMessage: ChatMessage,
  intent: Intent,
  text: string,
  patch: StatePatch = {},
): TurnResult {
  let next = appendMessage(state, { ...clientMessage, intent });
  const atendenteMessage: ChatMessage = {
    id: `m${next.messages.length}`,
    from: "atendente",
    text,
    time: clientMessage.time,
  };
  next = appendMessage(next, atendenteMessage);
  if (patch.booking) next = { ...next, booking: patch.booking };
  if ("handoff" in patch) next = { ...next, handoff: patch.handoff ?? null };
  return { state: next, reply: text, intent };
}

export function processTurn(
  state: ConversationState,
  rawInput: string,
  scenario: ScenarioConfig,
  ctx: TurnContext,
): TurnResult {
  const input = rawInput.trim();
  if (!input) {
    return { state, reply: "", intent: "desconhecido" };
  }

  const seed = state.messages.length;
  const clientMessage: ChatMessage = {
    id: `m${state.messages.length}`,
    from: "cliente",
    text: input,
    time: ctx.clock,
  };

  const intent = matchIntent(input, ctx.locale);

  // Pedir uma pessoa ou cancelar interrompe qualquer fluxo em andamento.
  if (intent === "falar_com_pessoa") {
    const summary = summarizeForHandoff(state, scenario, ctx.locale, input);
    const handoff: HandoffCard = {
      reason: ctx.locale === "pt" ? "Pedido direto do cliente" : "Direct customer request",
      summary,
      at: ctx.clock,
    };
    return finish(state, clientMessage, intent, handoffAckReply(ctx.locale, seed), { handoff });
  }

  if (intent === "cancelar") {
    if (state.booking.stage === "confirmed") {
      return finish(state, clientMessage, intent, cancelConfirmReply(ctx.locale, seed), {
        booking: createInitialBooking(),
      });
    }
    return finish(state, clientMessage, intent, cancelNothingReply(ctx.locale, seed));
  }

  // Campo pendente de um agendamento em andamento tem prioridade sobre
  // o reconhecimento geral de intencao, senao "Ana Paula" vira "desconhecido".
  if (state.booking.stage === "need_service") {
    const match = findBestMatch(input, scenario.services);
    if (!match) {
      return finish(
        state,
        clientMessage,
        "agendar",
        serviceNotFoundReply(scenario, ctx.locale, seed),
      );
    }
    const booking: Booking = {
      ...state.booking,
      stage: "need_slot",
      draft: { ...state.booking.draft, serviceId: match.id },
    };
    return finish(state, clientMessage, "agendar", askSlotReply(scenario, ctx.locale, seed), {
      booking,
    });
  }

  if (state.booking.stage === "need_slot") {
    const match = findBestMatch(input, scenario.availableSlots);
    if (!match) {
      return finish(
        state,
        clientMessage,
        "agendar",
        slotNotFoundReply(scenario, ctx.locale, seed),
      );
    }

    const draft = { ...state.booking.draft, slotId: match.id };

    // Remarcacao: o nome ja existia de um agendamento confirmado antes —
    // so atualiza o horario e confirma de novo, sem perguntar o nome outra vez.
    if (draft.name) {
      const service = scenario.services.find((s) => s.id === draft.serviceId)!;
      const booking: Booking = {
        stage: "confirmed",
        draft,
        confirmedAt: ctx.clock,
        bookedAfterHours: ctx.isAfterHours,
      };
      const text = bookingConfirmReply(scenario, ctx.locale, seed, {
        service,
        slot: match,
        name: draft.name,
        isAfterHours: ctx.isAfterHours,
      });
      return finish(state, clientMessage, "remarcar", text, { booking });
    }

    const booking: Booking = { ...state.booking, stage: "need_name", draft };
    return finish(state, clientMessage, "agendar", askNameReply(ctx.locale, seed), { booking });
  }

  if (state.booking.stage === "need_name") {
    const name = input;
    const draft = { ...state.booking.draft, name };
    const service = scenario.services.find((s) => s.id === draft.serviceId)!;
    const slot = scenario.availableSlots.find((s) => s.id === draft.slotId)!;
    const booking: Booking = {
      stage: "confirmed",
      draft,
      confirmedAt: ctx.clock,
      bookedAfterHours: ctx.isAfterHours,
    };
    const text = bookingConfirmReply(scenario, ctx.locale, seed, {
      service,
      slot,
      name,
      isAfterHours: ctx.isAfterHours,
    });
    return finish(state, clientMessage, "agendar", text, { booking });
  }

  // Sem campo pendente: despacha pela intencao geral.
  switch (intent) {
    case "saudacao":
      return finish(state, clientMessage, intent, greetingReply(scenario, ctx.locale, seed));
    case "horario":
      return finish(
        state,
        clientMessage,
        intent,
        hoursReply(scenario, ctx.locale, seed, ctx.isAfterHours),
      );
    case "endereco":
      return finish(state, clientMessage, intent, addressReply(scenario, ctx.locale, seed));
    case "servicos":
      return finish(state, clientMessage, intent, servicesReply(scenario, ctx.locale, seed));
    case "preco":
      return finish(state, clientMessage, intent, priceReply(scenario, ctx.locale, seed));
    case "agendar": {
      const booking: Booking = { ...createInitialBooking(), stage: "need_service" };
      return finish(state, clientMessage, intent, askServiceReply(scenario, ctx.locale, seed), {
        booking,
      });
    }
    case "remarcar": {
      if (state.booking.stage !== "confirmed") {
        return finish(state, clientMessage, intent, rescheduleNoBookingReply(ctx.locale, seed));
      }
      const booking: Booking = {
        ...state.booking,
        stage: "need_slot",
        draft: { ...state.booking.draft, slotId: null },
      };
      return finish(
        state,
        clientMessage,
        intent,
        rescheduleAskSlotReply(scenario, ctx.locale, seed),
        { booking },
      );
    }
    default:
      return finish(state, clientMessage, "desconhecido", unknownReply(ctx.locale, seed));
  }
}
