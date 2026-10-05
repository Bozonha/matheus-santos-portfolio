import { describe, expect, it } from "vitest";
import { matchIntent } from "./intentMatcher";

describe("matchIntent — portugues", () => {
  it("reconhece saudacao", () => {
    expect(matchIntent("oi, bom dia", "pt")).toBe("saudacao");
  });

  it("reconhece pergunta de horario", () => {
    expect(matchIntent("vocês abrem que horas?", "pt")).toBe("horario");
  });

  it("reconhece pergunta de endereco", () => {
    expect(matchIntent("qual o endereço de vocês?", "pt")).toBe("endereco");
  });

  it("reconhece pergunta de servicos", () => {
    expect(matchIntent("quais serviços vocês oferecem?", "pt")).toBe("servicos");
  });

  it("reconhece pergunta de preco", () => {
    expect(matchIntent("quanto custa a limpeza?", "pt")).toBe("preco");
  });

  it("reconhece pedido de agendamento", () => {
    expect(matchIntent("quero marcar um horário", "pt")).toBe("agendar");
  });

  it("reconhece pedido de remarcacao", () => {
    expect(matchIntent("preciso remarcar meu horário", "pt")).toBe("remarcar");
  });

  it("reconhece pedido de cancelamento", () => {
    expect(matchIntent("quero cancelar", "pt")).toBe("cancelar");
  });

  it("reconhece pedido de falar com humano", () => {
    expect(matchIntent("quero falar com uma pessoa de verdade", "pt")).toBe(
      "falar_com_pessoa",
    );
  });

  it("tolera erro de digitacao", () => {
    expect(matchIntent("qual o horrario de vcs", "pt")).toBe("horario");
    expect(matchIntent("quero agendr uma consulta", "pt")).toBe("agendar");
  });

  it("retorna desconhecido para assunto fora de escopo", () => {
    expect(matchIntent("vocês vendem carro usado?", "pt")).toBe("desconhecido");
  });

  it("retorna desconhecido para texto vazio", () => {
    expect(matchIntent("", "pt")).toBe("desconhecido");
    expect(matchIntent("   ", "pt")).toBe("desconhecido");
  });

  it("falar_com_pessoa tem prioridade sobre agendar quando ambos aparecem", () => {
    expect(matchIntent("quero agendar mas prefiro falar com uma pessoa", "pt")).toBe(
      "falar_com_pessoa",
    );
  });
});

describe("matchIntent — ingles", () => {
  it("reconhece saudacao", () => {
    expect(matchIntent("hi there", "en")).toBe("saudacao");
  });

  it("reconhece pergunta de horario", () => {
    expect(matchIntent("what time do you open?", "en")).toBe("horario");
  });

  it("reconhece pedido de agendamento", () => {
    expect(matchIntent("can I book an appointment?", "en")).toBe("agendar");
  });

  it("reconhece pedido de falar com humano", () => {
    expect(matchIntent("I want to talk to a real person", "en")).toBe(
      "falar_com_pessoa",
    );
  });

  it("tolera erro de digitacao", () => {
    expect(matchIntent("whats the pryce for a checkup", "en")).toBe("preco");
  });

  it("retorna desconhecido para assunto fora de escopo", () => {
    expect(matchIntent("do you sell used cars?", "en")).toBe("desconhecido");
  });
});
