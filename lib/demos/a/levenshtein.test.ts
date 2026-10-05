import { describe, expect, it } from "vitest";
import { fuzzyWordMatch, levenshteinDistance, maxEditDistanceFor } from "./levenshtein";

describe("levenshteinDistance", () => {
  it("retorna 0 para strings identicas", () => {
    expect(levenshteinDistance("agendar", "agendar")).toBe(0);
  });

  it("retorna o tamanho da outra string quando uma e vazia", () => {
    expect(levenshteinDistance("", "preco")).toBe(5);
    expect(levenshteinDistance("preco", "")).toBe(5);
  });

  it("conta uma unica substituicao", () => {
    expect(levenshteinDistance("preco", "preca")).toBe(1);
  });

  it("conta uma unica insercao", () => {
    expect(levenshteinDistance("preco", "precos")).toBe(1);
  });

  it("conta uma unica remocao", () => {
    expect(levenshteinDistance("agendar", "agendr")).toBe(1);
  });

  it("calcula distancias maiores corretamente", () => {
    // "horario" -> remove o "h" -> "orario" -> remove um "r" -> "oraio": 2 operacoes
    expect(levenshteinDistance("horario", "oraio")).toBe(2);
  });

  it("e simetrica", () => {
    expect(levenshteinDistance("endereco", "enderco")).toBe(
      levenshteinDistance("enderco", "endereco"),
    );
  });
});

describe("maxEditDistanceFor", () => {
  it("nao tolera erro em palavras com ate 3 letras", () => {
    expect(maxEditDistanceFor("oi")).toBe(0);
    expect(maxEditDistanceFor("sim")).toBe(0);
  });

  it("tolera 1 erro em palavras medias", () => {
    expect(maxEditDistanceFor("preco")).toBe(1);
    expect(maxEditDistanceFor("agendr")).toBe(1);
  });

  it("tolera 2 erros em palavras longas", () => {
    expect(maxEditDistanceFor("agendamento")).toBe(2);
  });
});

describe("fuzzyWordMatch", () => {
  it("aceita palavras identicas", () => {
    expect(fuzzyWordMatch("agendar", "agendar")).toBe(true);
  });

  it("aceita erro de digitacao dentro da tolerancia", () => {
    expect(fuzzyWordMatch("agendr", "agendar")).toBe(true);
    expect(fuzzyWordMatch("orcamnto", "orcamento")).toBe(true);
  });

  it("rejeita palavras muito diferentes", () => {
    expect(fuzzyWordMatch("gato", "agendar")).toBe(false);
  });

  it("rejeita erro acima da tolerancia em palavra curta", () => {
    expect(fuzzyWordMatch("ja", "oi")).toBe(false);
  });

  it("nao da falso positivo entre palavras curtas distintas", () => {
    expect(fuzzyWordMatch("sim", "nao")).toBe(false);
  });
});
