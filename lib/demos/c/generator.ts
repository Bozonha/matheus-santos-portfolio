import type { Locale } from "@/lib/routes";
import { mulberry32, randomInRange } from "./mulberry32";
import type { FinancialDataset, MonthlyRecord, ServiceRevenue } from "./types";

const MONTH_LABELS: Record<Locale, string[]> = {
  pt: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};

const SEASONAL_FACTORS = [1.0, 0.92, 0.97, 1.0, 1.02, 1.0, 1.0, 0.98, 1.0, 1.03, 1.15, 1.25];

/** Mes (indice 0-based) com uma queda forte e deliberada, para o detector de anomalia sempre ter algo real pra achar. */
const ANOMALY_MONTH_INDEX = 6;
const ANOMALY_FACTOR = 0.6;

const SERVICE_NAMES: Record<Locale, { id: string; label: string }[]> = {
  pt: [
    { id: "mercearia", label: "Mercearia" },
    { id: "hortifruti", label: "Hortifrúti" },
    { id: "padaria", label: "Padaria própria" },
    { id: "bebidas", label: "Bebidas" },
    { id: "limpeza", label: "Limpeza e higiene" },
  ],
  en: [
    { id: "mercearia", label: "Grocery" },
    { id: "hortifruti", label: "Produce" },
    { id: "padaria", label: "In-house bakery" },
    { id: "bebidas", label: "Beverages" },
    { id: "limpeza", label: "Cleaning & hygiene" },
  ],
};

const BUSINESS_NAME: Record<Locale, string> = {
  pt: "Empório Vista Alegre",
  en: "Empório Vista Alegre",
};

export function generateMonths(seed: number, locale: Locale): MonthlyRecord[] {
  const rng = mulberry32(seed);
  const labels = MONTH_LABELS[locale];
  const baseRevenue = 45000;

  return labels.map((monthLabel, index) => {
    const noise = randomInRange(rng, -0.06, 0.06);
    let revenue = baseRevenue * SEASONAL_FACTORS[index]! * (1 + noise);
    if (index === ANOMALY_MONTH_INDEX) revenue *= ANOMALY_FACTOR;
    revenue = Math.round(revenue);

    const expenseRatio = randomInRange(rng, 0.55, 0.68);
    const expenses = Math.round(revenue * expenseRatio);
    const receivables = Math.round(revenue * randomInRange(rng, 0.08, 0.18));
    const defaultRate = Math.round(randomInRange(rng, 2, 7) * 10) / 10;
    const averageTicket = Math.round(randomInRange(rng, 80, 180));
    const transactionsCount = Math.max(1, Math.round(revenue / averageTicket));

    return {
      index,
      monthLabel,
      revenue,
      expenses,
      receivables,
      cashFlow: revenue - expenses,
      defaultRate,
      averageTicket,
      transactionsCount,
    };
  });
}

export function generateServices(
  seed: number,
  locale: Locale,
  totalRevenue: number,
): ServiceRevenue[] {
  const rng = mulberry32(seed + 1000);
  const names = SERVICE_NAMES[locale];
  const weights = names.map(() => randomInRange(rng, 0.5, 1.5));
  const weightSum = weights.reduce((sum, w) => sum + w, 0);

  const services = names.map((service, i) => {
    const share = weights[i]! / weightSum;
    return {
      id: service.id,
      label: service.label,
      revenue: Math.round(totalRevenue * share),
      share,
    };
  });

  return services.sort((a, b) => b.revenue - a.revenue);
}

export function generateFinancialDataset(seed: number, locale: Locale): FinancialDataset {
  const months = generateMonths(seed, locale);
  const totalRevenue = months.reduce((sum, m) => sum + m.revenue, 0);
  const services = generateServices(seed, locale, totalRevenue);

  return {
    businessName: BUSINESS_NAME[locale],
    months,
    services,
  };
}
