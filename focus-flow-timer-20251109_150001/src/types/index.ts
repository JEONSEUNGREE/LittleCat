export type TimerMode = 'focus' | 'break' | 'idle';

export type SessionType = 'short' | 'medium' | 'long' | 'ultra';

export interface Session {
  id: string;
  type: SessionType;
  duration: number; // in seconds
  completedAt: Date;
  focusScore: number; // 0-100
}

export interface TimerState {
  mode: TimerMode;
  sessionType: SessionType;
  timeRemaining: number; // in seconds
  isRunning: boolean;
  isPaused: boolean;
  sessions: Session[];
  currentFocusScore: number;
}

export interface BrainWaveRhythm {
  type: 'alpha' | 'beta' | 'gamma' | 'theta';
  frequency: number; // Hz
  description: string;
  recommendedDuration: number; // in minutes
}
