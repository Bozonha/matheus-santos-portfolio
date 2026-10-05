import { describe, expect, it } from "vitest";
import { createInitialState, processTurn } from "./engine";
import { getScenario } from "./fixtures";
import type { ConversationState, TurnContext } from "./types";

const scenarioPt = getScenario("pt", "clinica");
const scenarioEn = getScenario("en", "clinica");

function ctx(overrides: Partial<TurnContext> = {}): TurnContext {
  return {
    locale: "pt",
    isAfterHours: false,
    clock: "10:00",
    turnIndex: 0,
    ...overrides,
  };
}

function send(state: ConversationState, text: string, scenario = scenarioPt, context = ctx()) {
  return processTurn(state, text, scenario, context);
}

describe("processTurn — intencoes informativas", () => {
  it("responde saudacao", () => {
    const result = send(createInitialState("clinica"), "oi");
    expect(result.intent).toBe("saudacao");
    expect(result.reply).toContain(scenarioPt.businessName);
  });

  it("responde horario normal", () => {
    const result = send(createInitialState("clinica"), "qual o horário de vocês?");
    expect(result.intent).toBe("horario");
    expect(result.reply).toContain(scenarioPt.hoursLabel);
  });

  it("responde horario fora do expediente com nota de fora de horario", () => {
    const result = send(
      createInitialState("clinica"),
      "vocês estão abertos?",
      scenarioPt,
      ctx({ isAfterHours: true, clock: "23:47" }),
    );
    expect(result.reply.toLowerCase()).toMatch(/fechad/);
  });

  it("responde endereco", () => {
    const result = send(createInitialState("clinica"), "qual o endereço?");
    expect(result.intent).toBe("endereco");
    expect(result.reply).toContain(scenarioPt.address);
  });

  it("responde servicos listando so o que esta na fixture", () => {
    const result = send(createInitialState("clinica"), "quais serviços vocês têm?");
    expect(result.intent).toBe("servicos");
    for (const service of scenarioPt.services) {
      expect(result.reply).toContain(service.label);
    }
  });

  it("nunca inventa preco para servico sob avaliacao", () => {
    const result = send(createInitialState("clinica"), "quanto custa o clareamento?");
    expect(result.reply).toMatch(/sob avaliação/);
    expect(result.reply).not.toMatch(/clareamento.*R\$/);
  });

  it("retorna desconhecido e oferece humano para fora de escopo", () => {
    const result = send(createInitialState("clinica"), "vocês vendem carro usado?");
    expect(result.intent).toBe("desconhecido");
    expect(result.reply.length).toBeGreaterThan(0);
  });

  it("ignora envio vazio sem alterar o estado", () => {
    const state = createInitialState("clinica");
    const result = send(state, "   ");
    expect(result.reply).toBe("");
    expect(result.state.messages).toHaveLength(0);
  });
});

describe("processTurn — fluxo de agendamento", () => {
  it("completa o fluxo feliz: servico -> horario -> nome -> confirmado", () => {
    let state = createInitialState("clinica");

    let result = send(state, "quero agendar uma consulta");
    expect(result.intent).toBe("agendar");
    expect(result.state.booking.stage).toBe("need_service");
    state = result.state;

    result = send(state, "limpeza");
    expect(result.state.booking.stage).toBe("need_slot");
    expect(result.state.booking.draft.serviceId).toBe("limpeza");
    state = result.state;

    result = send(state, "amanhã às 9h");
    expect(result.state.booking.stage).toBe("need_name");
    expect(result.state.booking.draft.slotId).toBe("slot1");
    state = result.state;

    result = send(state, "Ana Paula");
    expect(result.state.booking.stage).toBe("confirmed");
    expect(result.state.booking.draft.name).toBe("Ana Paula");
    expect(result.reply).toContain("Ana Paula");
    expect(result.reply).toContain("Limpeza e profilaxia");
  });

  it("tolera erro de digitacao durante a coleta de campos", () => {
    let state = createInitialState("clinica");
    state = send(state, "quero marcar").state;
    const result = send(state, "limpesa"); // typo
    expect(result.state.booking.draft.serviceId).toBe("limpeza");
  });

  it("pede de novo quando o servico nao e reconhecido, sem travar o fluxo", () => {
    let state = createInitialState("clinica");
    state = send(state, "quero agendar").state;
    const result = send(state, "banana");
    expect(result.state.booking.stage).toBe("need_service");
    expect(result.reply).toMatch(/não achei/i);
  });

  it("pede de novo quando o horario nao e reconhecido", () => {
    let state = createInitialState("clinica");
    state = send(state, "quero agendar").state;
    state = send(state, "limpeza").state;
    const result = send(state, "ano que vem");
    expect(result.state.booking.stage).toBe("need_slot");
  });

  it("marca o agendamento como feito fora do horario quando simulado", () => {
    let state = createInitialState("clinica");
    const afterHours = ctx({ isAfterHours: true, clock: "23:47" });
    state = send(state, "quero agendar", scenarioPt, afterHours).state;
    state = send(state, "limpeza", scenarioPt, afterHours).state;
    state = send(state, "amanhã às 9h", scenarioPt, afterHours).state;
    const result = send(state, "Ana Paula", scenarioPt, afterHours);
    expect(result.state.booking.bookedAfterHours).toBe(true);
    expect(result.reply.toLowerCase()).toMatch(/fora do horário|equipe confirma/);
  });
});

describe("processTurn — cancelar e remarcar", () => {
  function bookAppointment(context = ctx()): ConversationState {
    let state = createInitialState("clinica");
    state = send(state, "quero agendar", scenarioPt, context).state;
    state = send(state, "limpeza", scenarioPt, context).state;
    state = send(state, "amanhã às 9h", scenarioPt, context).state;
    state = send(state, "Ana Paula", scenarioPt, context).state;
    return state;
  }

  it("cancela um agendamento confirmado", () => {
    const state = bookAppointment();
    const result = send(state, "quero cancelar");
    expect(result.state.booking.stage).toBe("idle");
    expect(result.state.booking.draft.name).toBeNull();
  });

  it("avisa quando nao ha nada para cancelar", () => {
    const result = send(createInitialState("clinica"), "quero cancelar");
    expect(result.reply).toMatch(/não encontrei/i);
  });

  it("remarcar sem agendamento existente oferece agendar", () => {
    const result = send(createInitialState("clinica"), "preciso remarcar");
    expect(result.intent).toBe("remarcar");
    expect(result.state.booking.stage).toBe("idle");
  });

  it("remarcar um agendamento confirmado pede novo horario e mantem o nome", () => {
    const state = bookAppointment();
    let result = send(state, "preciso remarcar");
    expect(result.state.booking.stage).toBe("need_slot");

    result = send(result.state, "amanhã às 14h");
    expect(result.state.booking.stage).toBe("confirmed");
    expect(result.state.booking.draft.slotId).toBe("slot3");
    expect(result.state.booking.draft.name).toBe("Ana Paula");
    expect(result.reply).toContain("Ana Paula");
  });
});

describe("processTurn — passagem para humano", () => {
  it("gera um cartao de handoff com resumo da conversa", () => {
    let state = createInitialState("clinica");
    state = send(state, "quero agendar").state;
    state = send(state, "limpeza").state;

    const result = send(state, "quero falar com uma pessoa");
    expect(result.intent).toBe("falar_com_pessoa");
    expect(result.state.handoff).not.toBeNull();
    expect(result.state.handoff?.summary).toMatch(/limpeza/i);
  });

  it("falar com pessoa interrompe um fluxo de agendamento em andamento", () => {
    let state = createInitialState("clinica");
    state = send(state, "quero agendar").state;
    const result = send(state, "prefiro falar com um humano");
    expect(result.intent).toBe("falar_com_pessoa");
    expect(result.state.booking.stage).toBe("need_service");
  });
});

describe("processTurn — ingles", () => {
  it("funciona o fluxo completo em ingles", () => {
    let state = createInitialState("clinica");
    const englishCtx = ctx({ locale: "en" });

    let result = send(state, "I'd like to book an appointment", scenarioEn, englishCtx);
    expect(result.intent).toBe("agendar");
    state = result.state;

    result = send(state, "cleaning", scenarioEn, englishCtx);
    expect(result.state.booking.draft.serviceId).toBe("limpeza");
    state = result.state;

    result = send(state, "tomorrow at 9am", scenarioEn, englishCtx);
    expect(result.state.booking.draft.slotId).toBe("slot1");
    state = result.state;

    result = send(state, "Ana Paula", scenarioEn, englishCtx);
    expect(result.state.booking.stage).toBe("confirmed");
    expect(result.reply).toContain("Ana Paula");
  });
});
