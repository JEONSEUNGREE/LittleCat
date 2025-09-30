export interface PostureData {
  timestamp: Date;
  score: number;
  neckAngle: number;
  shoulderLevel: number;
  backCurvature: number;
  headPosition: number;
}

export interface UserSettings {
  alertsEnabled: boolean;
  alertFrequency: number; // minutes
  workHours: {
    start: string;
    end: string;
  };
  breakReminders: boolean;
  breakInterval: number; // minutes
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  targetScore: number;
  sensitivity: 'low' | 'medium' | 'high';
}

export interface CalibrationData {
  baseline: {
    neckAngle: number;
    shoulderLevel: number;
    backCurvature: number;
    headPosition: number;
  };
  isCalibrated: boolean;
  calibratedAt?: Date;
}

export interface SessionData {
  id: string;
  startTime: Date;
  endTime?: Date;
  averageScore: number;
  duration: number; // minutes
  alerts: number;
  improvements: number;
}

export interface DailyStats {
  date: Date;
  sessions: SessionData[];
  totalTime: number; // minutes
  averageScore: number;
  alerts: number;
  improvements: number;
  bestScore: number;
  worstScore: number;
}

export interface WeeklyProgress {
  weekStarting: Date;
  dailyStats: DailyStats[];
  weeklyAverage: number;
  totalSessions: number;
  totalTime: number;
  improvement: number; // percentage
}

export type AlertType = 'posture' | 'break' | 'improvement' | 'achievement';

export interface Alert {
  id: string;
  type: AlertType;
  message: string;
  severity: 'info' | 'warning' | 'success' | 'danger';
  timestamp: Date;
  seen: boolean;
}