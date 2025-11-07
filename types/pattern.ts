export interface Pattern {
  id: string;
  title: string;
  dimension: 'physical' | 'mental' | 'spiritual';
  type: 'positive' | 'warning' | 'alert';
  confidence: number; // 0-100
  discovered: string; // ISO date
  pattern: string; // The insight itself
  evidence: string[]; // Supporting data points
  whyItMatters: string; // Impact explanation
  suggestion?: string; // Optional action to take
}

export interface PatternFilters {
  dimension?: 'physical' | 'mental' | 'spiritual' | 'all';
  type?: 'positive' | 'warning' | 'alert' | 'all';
  timeframe?: 'week' | 'month' | 'all';
}
