export interface ChartPoint {
  x: number;
  y: number;
}

export interface LineChartGeometry {
  points: ChartPoint[];
  path: string;
  minValue: number;
  maxValue: number;
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * Converte uma serie numerica em coordenadas e um path SVG ("M x,y L x,y
 * ..."), sem nenhum DOM envolvido — o componente React so desenha o que
 * essa funcao calcula. Serie "achatada" (todos os valores iguais) fica
 * centralizada verticalmente em vez de ir parar no fundo do grafico.
 */
export function buildLineChartGeometry(
  values: number[],
  width: number,
  height: number,
  padding = 8,
): LineChartGeometry {
  if (values.length === 0) {
    return { points: [], path: "", minValue: 0, maxValue: 0 };
  }

  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const flat = maxValue === minValue;
  const range = flat ? 1 : maxValue - minValue;

  const innerWidth = width - padding * 2;
  const innerHeight = height - padding * 2;
  const stepX = values.length > 1 ? innerWidth / (values.length - 1) : 0;

  const points = values.map((value, index) => {
    const x = padding + stepX * index;
    const normalized = flat ? 0.5 : (value - minValue) / range;
    const y = padding + (1 - normalized) * innerHeight;
    return { x: round2(x), y: round2(y) };
  });

  const path = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");

  return { points, path, minValue, maxValue };
}

/** Valores igualmente espacados entre min e max, para rotular o eixo Y. */
export function buildYAxisTicks(minValue: number, maxValue: number, count = 4): number[] {
  if (count <= 1) return [minValue];
  if (minValue === maxValue) return Array.from({ length: count }, () => minValue);

  const step = (maxValue - minValue) / (count - 1);
  return Array.from({ length: count }, (_, i) => Math.round(minValue + step * i));
}
