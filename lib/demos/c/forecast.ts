import type { ForecastPoint, MonthlyRecord } from "./types";

function average(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

function standardDeviation(values: number[]): number {
  if (values.length === 0) return 0;
  const mean = average(values);
  const variance = average(values.map((v) => (v - mean) ** 2));
  return Math.sqrt(variance);
}

/**
 * Previsao simples por media movel: usa a media das ultimas `windowSize`
 * receitas como projecao plana para os proximos `horizon` meses, com uma
 * faixa de incerteza baseada no desvio padrao da mesma janela — que
 * alarga um pouco a cada mes futuro, porque a incerteza cresce quanto
 * mais longe se projeta.
 */
export function movingAverageForecast(
  months: MonthlyRecord[],
  windowSize: number,
  horizon: number,
): ForecastPoint[] {
  if (months.length === 0 || windowSize <= 0 || horizon <= 0) return [];

  const window = months.slice(-windowSize);
  const revenues = window.map((m) => m.revenue);
  const mean = average(revenues);
  const stdDev = standardDeviation(revenues);

  const allLabels = months.map((m) => m.monthLabel);
  const lastIndex = months[months.length - 1]!.index;

  const points: ForecastPoint[] = [];
  for (let step = 1; step <= horizon; step++) {
    const spread = stdDev * (1 + (step - 1) * 0.5);
    const labelIndex = (lastIndex + step) % allLabels.length;
    points.push({
      monthLabel: allLabels[labelIndex]!,
      forecast: Math.round(mean),
      low: Math.round(Math.max(0, mean - spread)),
      high: Math.round(mean + spread),
    });
  }

  return points;
}
