import { describe, expect, it } from "vitest";
import { computeActivePhase, type PhaseSection } from "./progress";

const turno: PhaseSection[] = [
  { phase: "noite", top: 0 },
  { phase: "madrugada", top: 1000 },
  { phase: "dia", top: 2000 },
];

describe("computeActivePhase", () => {
  it("retorna string vazia quando nao ha secoes", () => {
    expect(computeActivePhase(0, 800, [])).toBe("");
  });

  it("com uma unica secao, sempre retorna essa fase", () => {
    const single: PhaseSection[] = [{ phase: "dia", top: 500 }];
    expect(computeActivePhase(0, 800, single)).toBe("dia");
    expect(computeActivePhase(10000, 800, single)).toBe("dia");
  });

  it("no topo do documento, a primeira fase esta ativa", () => {
    expect(computeActivePhase(0, 800, turno)).toBe("noite");
  });

  it("quando o centro da viewport cruza o topo de uma secao, ela vira ativa", () => {
    // centro = scrollY + altura/2 = 600 + 400 = 1000, exatamente o top de madrugada
    expect(computeActivePhase(600, 800, turno)).toBe("madrugada");
  });

  it("e inclusivo no limite exato (top === centerY)", () => {
    expect(computeActivePhase(1600, 800, turno)).toBe("dia");
  });

  it("um px antes do limite ainda conta como a fase anterior", () => {
    // centro = 1599, ainda abaixo de 1600 (top de dia - 1 a menos que o calculo acima)
    expect(computeActivePhase(1599, 800, turno)).toBe("madrugada");
  });

  it("entre duas secoes, retorna a secao anterior", () => {
    expect(computeActivePhase(900, 800, turno)).toBe("madrugada"); // centro = 1300
  });

  it("depois da ultima secao, mantem a ultima fase", () => {
    expect(computeActivePhase(5000, 800, turno)).toBe("dia");
  });

  it("aceita scrollY negativo (bounce de overscroll) sem quebrar", () => {
    expect(computeActivePhase(-50, 800, turno)).toBe("noite");
  });

  it("funciona com viewportHeight zero", () => {
    expect(computeActivePhase(1000, 0, turno)).toBe("madrugada");
  });

  it("com secoes de top duplicado, a ultima do array vence no empate", () => {
    const duped: PhaseSection[] = [
      { phase: "a", top: 0 },
      { phase: "b", top: 500 },
      { phase: "c", top: 500 },
    ];
    expect(computeActivePhase(500, 0, duped)).toBe("c");
  });

  it("viewport bem maior que todas as secoes retorna a ultima fase", () => {
    expect(computeActivePhase(0, 4000, turno)).toBe("dia");
  });

  it("cenario realista: scroll passando pelas tres fases do turno", () => {
    const results = [0, 300, 700, 1100, 1700, 2500].map((y) =>
      computeActivePhase(y, 600, turno),
    );
    expect(results).toEqual([
      "noite",
      "noite",
      "madrugada",
      "madrugada",
      "dia",
      "dia",
    ]);
  });
});
