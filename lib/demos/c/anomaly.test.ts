import { describe, expect, it } from "vitest";
import { detectAnomalies } from "./anomaly";
import { generateMonths } from "./generator";
import type { MonthlyRecord } from "./types";

function fakeMonth(index: number, revenue: number): MonthlyRecord {
  return {
    index,
    monthLabel: `M${index}`,
    revenue,
    expenses: 0,
    receivables: 0,
    cashFlow: 0,
    defaultRate: 0,
    averageTicket: 100,
    transactionsCount: 0,
  };
}

describe("detectAnomalies", () => {
  it("acha um unico mes bem fora do padrao", () => {
    const months = [
      ...Array.from({ length: 11 }, (_, i) => fakeMonth(i, 100)),
      fakeMonth(11, 10),
    ];
    const anomalies = detectAnomalies(months, 1.5);
    expect(anomalies).toHaveLength(1);
    expect(anomalies[0]!.index).toBe(11);
    expect(anomalies[0]!.direction).toBe("abaixo");
    expect(anomalies[0]!.deviation).toBeCloseTo(-0.8919, 3);
  });

  it("nao acha nada quando todos os valores sao iguais", () => {
    const months = Array.from({ length: 12 }, (_, i) => fakeMonth(i, 500));
    expect(detectAnomalies(months)).toEqual([]);
  });

  it("retorna lista vazia para entrada vazia", () => {
    expect(detectAnomalies([])).toEqual([]);
  });

  it("marca direcao acima quando o valor e maior que a media", () => {
    const months = [
      ...Array.from({ length: 11 }, (_, i) => fakeMonth(i, 100)),
      fakeMonth(11, 1000),
    ];
    const anomalies = detectAnomalies(months, 1.5);
    expect(anomalies[0]!.direction).toBe("acima");
  });

  it("um limiar mais alto exige um desvio maior pra marcar", () => {
    const months = [
      ...Array.from({ length: 10 }, (_, i) => fakeMonth(i, 100)),
      fakeMonth(10, 130),
      fakeMonth(11, 70),
    ];
    const lenient = detectAnomalies(months, 1);
    const strict = detectAnomalies(months, 3);
    expect(lenient.length).toBeGreaterThanOrEqual(strict.length);
  });

  it("acha a queda deliberada injetada pelo gerador (mes de indice 6)", () => {
    const months = generateMonths(42, "pt");
    const anomalies = detectAnomalies(months, 1.5);
    expect(anomalies.some((a) => a.index === 6 && a.direction === "abaixo")).toBe(true);
  });

  it("e deterministico para a mesma entrada", () => {
    const months = generateMonths(7, "pt");
    expect(detectAnomalies(months)).toEqual(detectAnomalies(months));
  });

  it("nao marca nenhum mes quando o limiar e absurdamente alto", () => {
    const months = generateMonths(42, "pt");
    expect(detectAnomalies(months, 50)).toEqual([]);
  });
});
