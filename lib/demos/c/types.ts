export interface MonthlyRecord {
  index: number;
  monthLabel: string;
  revenue: number;
  expenses: number;
  receivables: number;
  cashFlow: number;
  defaultRate: number;
  averageTicket: number;
  transactionsCount: number;
}

export interface ServiceRevenue {
  id: string;
  label: string;
  revenue: number;
  share: number;
}

export interface FinancialDataset {
  businessName: string;
  months: MonthlyRecord[];
  services: ServiceRevenue[];
}

export interface ForecastPoint {
  monthLabel: string;
  forecast: number;
  low: number;
  high: number;
}

export interface AnomalyPoint {
  index: number;
  monthLabel: string;
  revenue: number;
  deviation: number;
  direction: "acima" | "abaixo";
}
