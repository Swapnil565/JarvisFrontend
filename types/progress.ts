// Types for progress tracking and trends

export type Dimension = 'physical' | 'mental' | 'spiritual';

export type TimeRange = 'week' | 'month' | 'all';

export interface DataPoint {
  date: string; // ISO date
  value: number; // 0-10 score
  dimension: Dimension;
}

export interface WeeklySummary {
  weekStart: string; // ISO date (Monday)
  weekEnd: string; // ISO date (Sunday)
  physical: {
    average: number;
    change: number; // +/- from previous week
    highlight?: string;
    lowlight?: string;
  };
  mental: {
    average: number;
    change: number;
    highlight?: string;
    lowlight?: string;
  };
  spiritual: {
    average: number;
    change: number;
    highlight?: string;
    lowlight?: string;
  };
  totalLogs: number;
  streakMaintained: boolean;
}

export interface TrendData {
  dimension: Dimension;
  dataPoints: DataPoint[];
  currentScore: number;
  weekChange: number; // % change from last week
  monthChange: number; // % change from last month
  trend: 'improving' | 'declining' | 'stable'; // Based on last 7 days
}

export interface HistoricalPattern {
  id: string;
  title: string;
  dimension: Dimension;
  discoveredDate: string; // ISO date
  wasActedOn: boolean;
  outcome?: string; // What happened after user acted on it
}
