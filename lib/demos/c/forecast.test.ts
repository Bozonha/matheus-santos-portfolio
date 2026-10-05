import { describe, expect, it } from "vitest";
import { movingAverageForecast } from "./forecast";
import { generateMonths } from "./generator";
import type { MonthlyRecord } from "./types";

function fakeMonth(index: number, monthLabel: string, revenue: number): MonthlyRecord {
  return {
    index,
    monthLabel,
    revenue,
    expenses: 0,
    receivables: 0,
    cashFlow: 0,
    defaultRate: 0,
    averageTicket: 100,
    transactionsCount: 0,
  };
}

describe("movingAverageForecast", () => {
  it("calcula a media e a faixa certas num caso simples conhecido", () => {
    const months = [fakeMonth(0, "Jan", 100), fakeMonth(1, "Fev", 200), fakeMonth(2, "Mar", 300)];
    const [point] = movingAverageForecast(months, 3, 1);
    expect(point!.forecast).toBe(200);
    expect(point!.low).toBe(118);
    expect(point!.high).toBe(282);
  });

  it("retorna o numero certo de pontos (horizon)", () => {
    const months = [fakeMonth(0, "Jan", 100), fakeMonth(1, "Fev", 200), fakeMonth(2, "Mar", 300)];
    expect(movingAverageForecast(months, 3, 4)).toHaveLength(4);
  });

  it("a faixa de incerteza alarga conforme o horizonte aumenta", () => {
    const months = [fakeMonth(0, "Jan", 100), fakeMonth(1, "Fev", 200), fakeMonth(2, "Mar", 300)];
    const points = movingAverageForecast(months, 3, 3);
    const widths = points.map((p) => p.high - p.low);
    expect(widths[1]!).toBeGreaterThan(widths[0]!);
    expect(widths[2]!).toBeGreaterThan(widths[1]!);
  });

  it("previsao fica achatada (sem faixa) quando a janela nao varia", () => {
    const months = [fakeMonth(0, "Jan", 500), fakeMonth(1, "Fev", 500), fakeMonth(2, "Mar", 500)];
    const [point] = movingAverageForecast(months, 3, 1);
    expect(point!.forecast).toBe(500);
    expect(point!.low).toBe(500);
    expect(point!.high).toBe(500);
  });

  it("usa so os ultimos N meses quando a janela e menor que o historico", () => {
    const months = [
      fakeMonth(0, "Jan", 1000),
      fakeMonth(1, "Fev", 1000),
      fakeMonth(2, "Mar", 100),
      fakeMonth(3, "Abr", 100),
    ];
    const [point] = movingAverageForecast(months, 2, 1);
    expect(point!.forecast).toBe(100);
  });

  it("retorna lista vazia sem meses", () => {
    expect(movingAverageForecast([], 3, 3)).toEqual([]);
  });

  it("retorna lista vazia com horizonte zero", () => {
    const months = [fakeMonth(0, "Jan", 100)];
    expect(movingAverageForecast(months, 1, 0)).toEqual([]);
  });

  it("a previsao nunca fica negativa mesmo com alta variancia", () => {
    const months = [fakeMonth(0, "Jan", 10), fakeMonth(1, "Fev", 5000), fakeMonth(2, "Mar", 10)];
    const points = movingAverageForecast(months, 3, 3);
    for (const point of points) {
      expect(point.low).toBeGreaterThanOrEqual(0);
    }
  });

  it("os rotulos continuam o ciclo de meses, inclusive virando o ano", () => {
    const months = generateMonths(42, "pt");
    const points = movingAverageForecast(months, 3, 2);
    expect(points[0]!.monthLabel).toBe("Jan");
    expect(points[1]!.monthLabel).toBe("Fev");
  });

  it("e deterministico para a mesma entrada", () => {
    const months = generateMonths(42, "pt");
    expect(movingAverageForecast(months, 3, 3)).toEqual(movingAverageForecast(months, 3, 3));
  });
});
