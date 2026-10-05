"use client";

import type { Dictionary } from "@/content/dictionaries";
import { buildLineChartGeometry, buildYAxisTicks } from "@/lib/demos/c/svgPath";
import type { AnomalyPoint, ForecastPoint, MonthlyRecord } from "@/lib/demos/c/types";
import styles from "./RevenueChart.module.css";

const WIDTH = 640;
const HEIGHT = 220;
const PADDING = 28;

function formatCompact(value: number): string {
  if (Math.abs(value) >= 1000) return `${Math.round(value / 1000)}k`;
  return String(Math.round(value));
}

export function RevenueChart({
  months,
  forecastPoints,
  anomalies,
  showForecast,
  onToggleForecast,
  dictionaryC,
}: {
  months: MonthlyRecord[];
  forecastPoints: ForecastPoint[];
  anomalies: AnomalyPoint[];
  showForecast: boolean;
  onToggleForecast: (value: boolean) => void;
  dictionaryC: Dictionary["demoC"];
}) {
  const revenues = months.map((m) => m.revenue);
  const forecastValues = showForecast ? forecastPoints.map((f) => f.forecast) : [];
  const combined = [...revenues, ...forecastValues];

  const geometry = buildLineChartGeometry(combined, WIDTH, HEIGHT, PADDING);
  const actualPoints = geometry.points.slice(0, revenues.length);
  const forecastLinePoints = geometry.points.slice(revenues.length);

  const innerHeight = HEIGHT - PADDING * 2;
  const range = geometry.maxValue - geometry.minValue || 1;
  const scaleY = (value: number) =>
    PADDING + (1 - (value - geometry.minValue) / range) * innerHeight;

  const actualPath = actualPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");

  const forecastPath =
    showForecast && actualPoints.length > 0
      ? [actualPoints[actualPoints.length - 1]!, ...forecastLinePoints]
          .map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`)
          .join(" ")
      : "";

  const bandPath =
    showForecast && actualPoints.length > 0 && forecastPoints.length > 0
      ? (() => {
          const startX = actualPoints[actualPoints.length - 1]!.x;
          const startY = actualPoints[actualPoints.length - 1]!.y;
          const topPoints = [
            { x: startX, y: startY },
            ...forecastLinePoints.map((p, i) => ({ x: p.x, y: scaleY(forecastPoints[i]!.high) })),
          ];
          const bottomPoints = [
            { x: startX, y: startY },
            ...forecastLinePoints.map((p, i) => ({ x: p.x, y: scaleY(forecastPoints[i]!.low) })),
          ].reverse();
          const all = [...topPoints, ...bottomPoints];
          return all.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + " Z";
        })()
      : "";

  const ticks = buildYAxisTicks(geometry.minValue, geometry.maxValue, 4);

  const anomalyByIndex = new Map(anomalies.map((a) => [a.index, a]));

  return (
    <div className={styles.wrap}>
      <div className={styles.titleRow}>
        <h3 className={styles.title}>{dictionaryC.revenueChartTitle}</h3>
        <label className={styles.toggle}>
          <input
            type="checkbox"
            checked={showForecast}
            onChange={(event) => onToggleForecast(event.target.checked)}
          />
          {dictionaryC.forecastToggleLabel}
        </label>
      </div>

      <div className={styles.chartBox}>
        <svg
          className={styles.svg}
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          role="img"
          aria-label={dictionaryC.revenueChartDescription}
        >
          <title>{dictionaryC.revenueChartDescription}</title>

          {ticks.map((tick) => {
            const y = scaleY(tick);
            return (
              <g key={tick}>
                <line x1={PADDING} y1={y} x2={WIDTH - PADDING} y2={y} className={styles.gridLine} />
                <text x={2} y={y + 3} className={styles.axisLabel}>
                  {formatCompact(tick)}
                </text>
              </g>
            );
          })}

          {bandPath ? <path d={bandPath} className={styles.forecastBand} /> : null}
          {forecastPath ? <path d={forecastPath} className={styles.forecastLine} /> : null}
          <path d={actualPath} className={styles.actualLine} />

          {actualPoints.map((p, i) => {
            const month = months[i]!;
            const anomaly = anomalyByIndex.get(month.index);
            if (anomaly) {
              const direction =
                anomaly.direction === "acima" ? dictionaryC.anomalyAbove : dictionaryC.anomalyBelow;
              const pct = Math.round(Math.abs(anomaly.deviation) * 100);
              return (
                <circle
                  key={month.index}
                  cx={p.x}
                  cy={p.y}
                  r={5}
                  className={styles.anomalyPoint}
                  tabIndex={0}
                  role="img"
                  aria-label={`${month.monthLabel}: ${pct}% ${direction}`}
                >
                  <title>{`${month.monthLabel}: ${pct}% ${direction}`}</title>
                </circle>
              );
            }
            return <circle key={month.index} cx={p.x} cy={p.y} r={3} className={styles.point} />;
          })}
        </svg>
      </div>

      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={styles.legendSwatch} style={{ color: "var(--color-accent)" }} />
          {dictionaryC.tableHeaders.revenue}
        </span>
        {showForecast ? (
          <span className={styles.legendItem}>
            <span className={styles.legendSwatch} style={{ color: "var(--color-fg-muted)" }} />
            {dictionaryC.forecastLegend}
          </span>
        ) : null}
      </div>

      {showForecast ? <p className={styles.forecastNote}>{dictionaryC.forecastNote}</p> : null}
    </div>
  );
}
