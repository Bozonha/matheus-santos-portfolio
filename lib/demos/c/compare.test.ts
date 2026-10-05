import { describe, expect, it } from "vitest";
import { comparePeriods } from "./compare";
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

const months = [100, 100, 100, 200, 200, 200, 300, 300, 300, 400, 400, 400].map((r, i) =>
  fakeMonth(i, r),
);

describe("comparePeriods", () => {
  it("compara um trimestre com o trimestre anterior", () => {
    const result = comparePeriods(months, 6, 8); // 300+300+300=900
    expect(result.currentTotal).toBe(900);
    expect(result.previousTotal).toBe(600); // meses 3,4,5 = 200*3
    expect(result.changePercent).toBeCloseTo(0.5);
  });

  it("calcula queda percentual corretamente", () => {
    const result = comparePeriods(months, 3, 5); // 200*3=600 vs 0,1,2=100*3=300
    expect(result.changePercent).toBeCloseTo(1);
  });

  it("usa um periodo parcial quando nao ha meses suficientes antes", () => {
    const result = comparePeriods(months, 1, 2); // pede 2 meses antes, so tem o mes 0
    expect(result.previousMonthsCount).toBe(1);
    expect(result.previousTotal).toBe(100);
  });

  it("retorna changePercent nulo quando nao ha periodo anterior (comeca no mes 0)", () => {
    const result = comparePeriods(months, 0, 2);
    expect(result.previousMonthsCount).toBe(0);
    expect(result.changePercent).toBeNull();
  });

  it("funciona com um unico mes selecionado", () => {
    const result = comparePeriods(months, 9, 9);
    expect(result.currentTotal).toBe(400);
    expect(result.previousTotal).toBe(300);
  });

  it("e deterministico", () => {
    expect(comparePeriods(months, 4, 7)).toEqual(comparePeriods(months, 4, 7));
  });
});
