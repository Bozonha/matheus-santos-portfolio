import { describe, expect, it } from "vitest";
import { findBestMatch } from "./fieldMatcher";
import { SCENARIO_FIXTURES } from "./fixtures";

const services = SCENARIO_FIXTURES.pt.clinica.services;
const slots = SCENARIO_FIXTURES.pt.clinica.availableSlots;

describe("findBestMatch", () => {
  it("bate exato quando o texto e identico ao rotulo (clique em resposta rapida)", () => {
    expect(findBestMatch("Limpeza e profilaxia", services)?.id).toBe("limpeza");
  });

  it("acha por palavra-chave parcial do rotulo", () => {
    expect(findBestMatch("quero fazer uma limpeza", services)?.id).toBe("limpeza");
  });

  it("tolera erro de digitacao no texto livre", () => {
    expect(findBestMatch("quero uma limpesa", services)?.id).toBe("limpeza");
  });

  it("acha o servico certo entre varias opcoes parecidas", () => {
    expect(findBestMatch("quanto custa o canal", services)?.id).toBe("canal");
    expect(findBestMatch("queria um clareamento", services)?.id).toBe("clareamento");
  });

  it("retorna null quando nao ha nenhuma palavra em comum", () => {
    expect(findBestMatch("vocês vendem carro?", services)).toBeNull();
  });

  it("retorna null para texto vazio", () => {
    expect(findBestMatch("", services)).toBeNull();
    expect(findBestMatch("   ", services)).toBeNull();
  });

  it("acha o horario certo entre os slots disponiveis", () => {
    expect(findBestMatch("pode ser amanhã às 9h", slots)?.id).toBe("slot1");
    expect(findBestMatch("prefiro 14h", slots)?.id).toBe("slot3");
  });

  it("bate exato em um slot clicado via resposta rapida", () => {
    expect(findBestMatch("amanhã às 10h30", slots)?.id).toBe("slot2");
  });

  it("nao confunde dois slots parecidos quando so um bate", () => {
    const result = findBestMatch("pode ser as 10h30 mesmo", slots);
    expect(result?.id).toBe("slot2");
  });

  it("e insensivel a maiusculas/minusculas e acentuacao", () => {
    expect(findBestMatch("LIMPEZA", services)?.id).toBe("limpeza");
    expect(findBestMatch("CONSULTA DE AVALIAÇÃO", services)?.id).toBe("consulta");
  });

  it("prefere a opcao com mais palavras batendo quando ha ambiguidade parcial", () => {
    expect(findBestMatch("tratamento de canal", services)?.id).toBe("canal");
  });
});
