import type { AnomalyPoint, MonthlyRecord } from "./types";

function average(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

function standardDeviation(values: number[]): number {
  if (values.length === 0) return 0;
  const mean = average(values);
  return Math.sqrt(average(values.map((v) => (v - mean) ** 2)));
}

/**
 * Marca meses cuja receita foge mais que `thresholdStdDevs` desvios padrao
 * da media do periodo. `deviation` e a diferenca percentual em relacao a
 * media (ex.: -0.4 = 40% abaixo), pensado para virar frase simples na UI.
 */
export function detectAnomalies(
  months: MonthlyRecord[],
  thresholdStdDevs = 1.5,
): AnomalyPoint[] {
  if (months.length === 0) return [];

  const revenues = months.map((m) => m.revenue);
  const mean = average(revenues);
  const stdDev = standardDeviation(revenues);
  if (stdDev === 0) return [];

  const anomalies: AnomalyPoint[] = [];
  for (const month of months) {
    const diffInStdDevs = (month.revenue - mean) / stdDev;
    if (Math.abs(diffInStdDevs) >= thresholdStdDevs) {
      anomalies.push({
        index: month.index,
        monthLabel: month.monthLabel,
        revenue: month.revenue,
        deviation: mean === 0 ? 0 : (month.revenue - mean) / mean,
        direction: month.revenue >= mean ? "acima" : "abaixo",
      });
    }
  }

  return anomalies;
}
