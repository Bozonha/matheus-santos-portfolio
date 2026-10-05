"use client";

import { useMemo, useState } from "react";
import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/routes";
import { comparePeriods } from "@/lib/demos/c/compare";
import { detectAnomalies } from "@/lib/demos/c/anomaly";
import { movingAverageForecast } from "@/lib/demos/c/forecast";
import { generateFinancialDataset } from "@/lib/demos/c/generator";
import { RevenueChart } from "./RevenueChart";
import { ServicesRanking } from "./ServicesRanking";
import { MonthlyTable } from "./MonthlyTable";
import styles from "./FinancialDashboard.module.css";

const SEED = 42;

function average(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

export function FinancialDashboard({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const dictionaryC = dictionary.demoC;
  const dataset = useMemo(() => generateFinancialDataset(SEED, locale), [locale]);
  const [periodMonths, setPeriodMonths] = useState(12);
  const [showForecast, setShowForecast] = useState(false);

  const selectedMonths = useMemo(
    () => dataset.months.slice(-periodMonths),
    [dataset, periodMonths],
  );

  const comparison = useMemo(
    () =>
      comparePeriods(
        dataset.months,
        selectedMonths[0]!.index,
        selectedMonths[selectedMonths.length - 1]!.index,
      ),
    [dataset, selectedMonths],
  );

  const anomalies = useMemo(() => {
    const fullYearAnomalies = detectAnomalies(dataset.months);
    const selectedIndexes = new Set(selectedMonths.map((m) => m.index));
    return fullYearAnomalies.filter((a) => selectedIndexes.has(a.index));
  }, [dataset, selectedMonths]);

  const forecastPoints = useMemo(
    () => movingAverageForecast(selectedMonths, 3, 3),
    [selectedMonths],
  );

  const totalRevenue = selectedMonths.reduce((sum, m) => sum + m.revenue, 0);
  const totalCashFlow = selectedMonths.reduce((sum, m) => sum + m.cashFlow, 0);
  const avgDefaultRate = average(selectedMonths.map((m) => m.defaultRate));
  const avgTicket = average(selectedMonths.map((m) => m.averageTicket));

  return (
    <div className={styles.layout}>
      <p className={styles.disclaimer}>{dictionaryC.disclaimer}</p>

      <div className={styles.controls}>
        <div className={styles.periodGroup}>
          <span className={styles.periodLabel}>{dictionaryC.periodLabel}</span>
          <div className={styles.periodTabs} role="group" aria-label={dictionaryC.periodLabel}>
            {dictionaryC.periodPresets.map((preset) => (
              <button
                key={preset.months}
                type="button"
                className={`${styles.periodTab} ${preset.months === periodMonths ? styles.periodTabActive : ""}`}
                aria-pressed={preset.months === periodMonths}
                onClick={() => setPeriodMonths(preset.months)}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <p className={styles.comparison}>
          {dictionaryC.comparisonPrefix}
          {comparison.changePercent === null ? (
            dictionaryC.comparisonNoPrevious
          ) : (
            <span className={comparison.changePercent >= 0 ? styles.comparisonUp : styles.comparisonDown}>
              {Math.abs(Math.round(comparison.changePercent * 100))}%{" "}
              {comparison.changePercent >= 0
                ? dictionaryC.comparisonSuffixUp
                : dictionaryC.comparisonSuffixDown}
            </span>
          )}
        </p>
      </div>

      <div className={styles.statGrid}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>{dictionaryC.statCards.revenue}</span>
          <span className={styles.statValue}>R$ {totalRevenue.toLocaleString("pt-BR")}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>{dictionaryC.statCards.cashFlow}</span>
          <span className={styles.statValue}>R$ {totalCashFlow.toLocaleString("pt-BR")}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>{dictionaryC.statCards.defaultRate}</span>
          <span className={styles.statValue}>{avgDefaultRate.toFixed(1)}%</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>{dictionaryC.statCards.averageTicket}</span>
          <span className={styles.statValue}>R$ {Math.round(avgTicket)}</span>
        </div>
      </div>

      <RevenueChart
        months={selectedMonths}
        forecastPoints={forecastPoints}
        anomalies={anomalies}
        showForecast={showForecast}
        onToggleForecast={setShowForecast}
        dictionaryC={dictionaryC}
      />

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>{dictionaryC.anomalyTitle}</h2>
        {anomalies.length === 0 ? (
          <p className={styles.detailHint}>{dictionaryC.anomalyNone}</p>
        ) : (
          <ul className={styles.anomalyList}>
            {anomalies.map((a) => (
              <li key={a.index} className={styles.anomalyItem}>
                {a.monthLabel}: {Math.round(Math.abs(a.deviation) * 100)}%{" "}
                {a.direction === "acima" ? dictionaryC.anomalyAbove : dictionaryC.anomalyBelow}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>{dictionaryC.servicesTitle}</h2>
        <ServicesRanking services={dataset.services} dictionaryC={dictionaryC} />
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>{dictionaryC.tableTitle}</h2>
        <MonthlyTable months={selectedMonths} locale={locale} dictionaryC={dictionaryC} />
      </div>
    </div>
  );
}
