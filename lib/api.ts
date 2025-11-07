// API client for JARVIS backend
// Base URL should be set via environment variable in production

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new APIError(
        errorData.message || `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        errorData.code
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    
    // Network errors, timeouts, etc.
    throw new APIError(
      'Unable to connect to JARVIS. Check your connection.',
      0,
      'NETWORK_ERROR'
    );
  }
}

// ============================================================================
// ONBOARDING API
// ============================================================================

export interface OnboardingData {
  liftingFrequency: string;
  stressLevel: string;
  sleepQuality: string;
  workIntensity: string;
  morningCheckInTime?: string;
}

export const onboardingAPI = {
  async complete(data: OnboardingData): Promise<{ userId: string; hypothesis: string }> {
    return fetchAPI('/api/onboarding/complete', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// ============================================================================
// LOGGING API
// ============================================================================

export interface LogEntry {
  type: 'morning_mood' | 'quick_log' | 'end_of_day';
  timestamp: string;
  data: Record<string, any>;
}

export const loggingAPI = {
  async submitLog(entry: LogEntry): Promise<{ id: string; success: boolean }> {
    return fetchAPI('/api/logs', {
      method: 'POST',
      body: JSON.stringify(entry),
    });
  },

  async getLogs(
    startDate?: string,
    endDate?: string
  ): Promise<LogEntry[]> {
    const params = new URLSearchParams();
    if (startDate) params.append('start_date', startDate);
    if (endDate) params.append('end_date', endDate);
    
    return fetchAPI(`/api/logs?${params.toString()}`);
  },
};

// ============================================================================
// DASHBOARD API
// ============================================================================

export interface DimensionStatus {
  dimension: 'physical' | 'mental' | 'spiritual';
  status: 'great' | 'good' | 'warning' | 'alert';
  score: number;
  insight: string;
}

export interface DashboardData {
  dimensions: DimensionStatus[];
  currentStreak: number;
  longestStreak: number;
  hasNewInsights: boolean;
  hasActiveInterventions: boolean;
}

export const dashboardAPI = {
  async getDashboardData(): Promise<DashboardData> {
    return fetchAPI('/api/dashboard');
  },
};

// ============================================================================
// INSIGHTS API
// ============================================================================

export interface Pattern {
  id: string;
  title: string;
  dimension: 'physical' | 'mental' | 'spiritual';
  type: 'strength' | 'watch' | 'alert';
  confidence: number;
  discovered: string;
  pattern: string;
  evidence: string[];
  whyItMatters: string;
  suggestion: string;
}

export const insightsAPI = {
  async getPatterns(
    dimension?: string,
    type?: string
  ): Promise<Pattern[]> {
    const params = new URLSearchParams();
    if (dimension) params.append('dimension', dimension);
    if (type) params.append('type', type);
    
    return fetchAPI(`/api/insights/patterns?${params.toString()}`);
  },

  async markPatternActedOn(patternId: string): Promise<{ success: boolean }> {
    return fetchAPI(`/api/insights/patterns/${patternId}/acted`, {
      method: 'POST',
    });
  },
};

// ============================================================================
// INTERVENTIONS API
// ============================================================================

export interface Intervention {
  id: string;
  title: string;
  message: string;
  reasoning: string;
  priority: 'low' | 'medium' | 'high';
  category: 'rest' | 'movement' | 'social' | 'work' | 'general';
  timestamp: string;
  dismissed: boolean;
  snoozedUntil?: string;
  actionTaken?: string;
}

export const interventionsAPI = {
  async getActiveInterventions(): Promise<Intervention[]> {
    return fetchAPI('/api/interventions/active');
  },

  async dismissIntervention(
    interventionId: string,
    action?: string
  ): Promise<{ success: boolean }> {
    return fetchAPI(`/api/interventions/${interventionId}/dismiss`, {
      method: 'POST',
      body: JSON.stringify({ action }),
    });
  },

  async snoozeIntervention(
    interventionId: string,
    until: string
  ): Promise<{ success: boolean }> {
    return fetchAPI(`/api/interventions/${interventionId}/snooze`, {
      method: 'POST',
      body: JSON.stringify({ until }),
    });
  },
};

// ============================================================================
// PROGRESS API
// ============================================================================

export interface DataPoint {
  date: string;
  value: number;
  dimension: 'physical' | 'mental' | 'spiritual';
}

export interface WeeklySummary {
  weekStart: string;
  weekEnd: string;
  physical: {
    average: number;
    change: number;
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

export const progressAPI = {
  async getTrendData(
    dimension: string,
    timeRange: 'week' | 'month' | 'all'
  ): Promise<DataPoint[]> {
    return fetchAPI(`/api/progress/trends/${dimension}?range=${timeRange}`);
  },

  async getWeeklySummaries(limit?: number): Promise<WeeklySummary[]> {
    const params = limit ? `?limit=${limit}` : '';
    return fetchAPI(`/api/progress/summaries${params}`);
  },

  async getHistoricalPatterns(): Promise<Pattern[]> {
    return fetchAPI('/api/progress/patterns/historical');
  },
};

// ============================================================================
// SETTINGS API
// ============================================================================

export interface UserSettings {
  notifications: {
    morningCheckInEnabled: boolean;
    morningCheckInTime: string;
    interventionsEnabled: boolean;
    insightsEnabled: boolean;
    weeklyReviewEnabled: boolean;
  };
  privacy: {
    dataRetentionDays: number;
    shareAnonymousUsage: boolean;
  };
}

export interface UserProfile {
  name?: string;
  email?: string;
  joinedDate: string;
  totalLogs: number;
  longestStreak: number;
  currentStreak: number;
}

export const settingsAPI = {
  async getSettings(): Promise<UserSettings> {
    return fetchAPI('/api/settings');
  },

  async updateSettings(settings: Partial<UserSettings>): Promise<{ success: boolean }> {
    return fetchAPI('/api/settings', {
      method: 'PATCH',
      body: JSON.stringify(settings),
    });
  },

  async getProfile(): Promise<UserProfile> {
    return fetchAPI('/api/profile');
  },

  async exportData(): Promise<Blob> {
    const response = await fetch(`${API_BASE_URL}/api/data/export`);
    if (!response.ok) {
      throw new APIError('Failed to export data', response.status);
    }
    return await response.blob();
  },

  async clearData(): Promise<{ success: boolean }> {
    return fetchAPI('/api/data/clear', {
      method: 'POST',
    });
  },

  async deleteAccount(): Promise<{ success: boolean }> {
    return fetchAPI('/api/account/delete', {
      method: 'DELETE',
    });
  },
};

// ============================================================================
// HEALTH CHECK
// ============================================================================

export const healthAPI = {
  async check(): Promise<{ status: string; version: string }> {
    return fetchAPI('/health');
  },
};
