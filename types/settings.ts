// Types for user settings and preferences

export interface NotificationSettings {
  morningCheckInEnabled: boolean;
  morningCheckInTime: string; // "HH:MM" format
  interventionsEnabled: boolean;
  insightsEnabled: boolean;
  weeklyReviewEnabled: boolean;
}

export interface PrivacySettings {
  dataRetentionDays: number; // How long to keep data (30, 90, 365, or -1 for forever)
  shareAnonymousUsage: boolean; // Share anonymous usage data for improving JARVIS
}

export interface UserProfile {
  name?: string;
  email?: string;
  joinedDate: string; // ISO date
  totalLogs: number;
  longestStreak: number;
  currentStreak: number;
}

export interface AppSettings {
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  profile: UserProfile;
}
