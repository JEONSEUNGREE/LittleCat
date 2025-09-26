export interface TimerSession {
  id: string;
  type: 'focus' | 'break' | 'longBreak';
  duration: number; // in seconds
  startedAt: Date;
  completedAt?: Date;
  productivity: number; // 0-100 scale
}

export interface FlowPattern {
  optimalFocusTime: number;
  optimalBreakTime: number;
  peakHours: number[];
  dailyTarget: number;
  currentStreak: number;
}

export interface TimerState {
  isRunning: boolean;
  currentTime: number;
  totalTime: number;
  sessionType: 'focus' | 'break' | 'longBreak';
  sessionsCompleted: number;
  dailyGoal: number;
}

export interface UserPreferences {
  focusDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  sessionsBeforeLongBreak: number;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  adaptiveMode: boolean;
}