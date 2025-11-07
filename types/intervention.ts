export interface Intervention {
  id: string;
  title: string;
  message: string;
  reasoning: string; // Why JARVIS is suggesting this
  priority: 'low' | 'medium' | 'high';
  category: 'rest' | 'movement' | 'social' | 'work' | 'general';
  timestamp: string; // ISO date
  dismissed?: boolean;
  snoozedUntil?: string; // ISO date
  actionTaken?: string;
}

export interface InterventionAction {
  label: string;
  type: 'primary' | 'secondary';
  action: () => void;
}
