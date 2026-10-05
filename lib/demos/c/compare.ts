import type { MonthlyRecord } from "./types";

export interface PeriodComparison {
  currentTotal: number;
  previousTotal: number;
  /** Variacao percentual (0.12 = +12%); null quando nao ha periodo anterior pra comparar. */
  changePercent: number | null;
  previousMonthsCount: number;
}

/**
 * Compara a soma de receita de [startIndex, endIndex] com a mesma
 * quantidade de meses imediatamente anteriores. Se nao houver meses
 * suficientes antes (ex.: comparando a partir de Jan), usa o que existir
 * — por isso `previousMonthsCount` fica exposto, pra UI avisar quando a
 * comparacao e parcial.
 */
export function comparePeriods(
  months: MonthlyRecord[],
  startIndex: number,
  endIndex: number,
): PeriodComparison {
  const current = months.filter((m) => m.index >= startIndex && m.index <= endIndex);
  const currentTotal = current.reduce((sum, m) => sum + m.revenue, 0);

  const periodLength = endIndex - startIndex + 1;
  const prevEnd = startIndex - 1;
  const prevStart = Math.max(0, prevEnd - periodLength + 1);

  const previous = prevEnd >= 0 ? months.filter((m) => m.index >= prevStart && m.index <= prevEnd) : [];
  const previousTotal = previous.reduce((sum, m) => sum + m.revenue, 0);

  const changePercent = previousTotal === 0 ? null : (currentTotal - previousTotal) / previousTotal;

  return { currentTotal, previousTotal, changePercent, previousMonthsCount: previous.length };
}
