import { create } from 'zustand';
import type { TimerState, SessionType, Session } from '../types';

const SESSION_DURATIONS: Record<SessionType, number> = {
  short: 25 * 60,    // 25 minutes
  medium: 45 * 60,   // 45 minutes
  long: 60 * 60,     // 60 minutes
  ultra: 90 * 60,    // 90 minutes
};

interface TimerStore extends TimerState {
  setSessionType: (type: SessionType) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  tick: () => void;
  completeSession: () => void;
  updateFocusScore: (score: number) => void;
}

export const useTimerStore = create<TimerStore>((set, get) => ({
  mode: 'idle',
  sessionType: 'short',
  timeRemaining: SESSION_DURATIONS.short,
  isRunning: false,
  isPaused: false,
  sessions: [],
  currentFocusScore: 0,

  setSessionType: (type) => {
    const state = get();
    if (!state.isRunning) {
      set({
        sessionType: type,
        timeRemaining: SESSION_DURATIONS[type],
        mode: 'idle',
      });
    }
  },

  startTimer: () => {
    set({ isRunning: true, isPaused: false, mode: 'focus' });
  },

  pauseTimer: () => {
    set({ isPaused: true, isRunning: false });
  },

  resetTimer: () => {
    const state = get();
    set({
      timeRemaining: SESSION_DURATIONS[state.sessionType],
      isRunning: false,
      isPaused: false,
      mode: 'idle',
      currentFocusScore: 0,
    });
  },

  tick: () => {
    const state = get();
    if (state.isRunning && state.timeRemaining > 0) {
      const newTime = state.timeRemaining - 1;
      set({ timeRemaining: newTime });

      if (newTime === 0) {
        get().completeSession();
      }
    }
  },

  completeSession: () => {
    const state = get();
    const newSession: Session = {
      id: `session-${Date.now()}`,
      type: state.sessionType,
      duration: SESSION_DURATIONS[state.sessionType],
      completedAt: new Date(),
      focusScore: state.currentFocusScore,
    };

    set({
      sessions: [newSession, ...state.sessions].slice(0, 10),
      mode: 'break',
      isRunning: false,
      timeRemaining: SESSION_DURATIONS[state.sessionType],
    });
  },

  updateFocusScore: (score) => {
    set({ currentFocusScore: Math.min(100, Math.max(0, score)) });
  },
}));
