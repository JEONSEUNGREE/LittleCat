export interface FocusSession {
  id: string;
  startTime: Date;
  endTime: Date | null;
  focusLevel: 'high' | 'medium' | 'low';
  duration: number; // in minutes
  notes?: string;
}

export interface TimeSlot {
  hour: number;
  avgFocusLevel: number;
  totalSessions: number;
  totalMinutes: number;
}

export interface DailyStats {
  date: string;
  totalFocusTime: number;
  peakHours: number[];
  avgFocusLevel: number;
  sessionsCount: number;
}

export interface FocusPattern {
  bestHours: number[];
  worstHours: number[];
  recommendation: string;
}
