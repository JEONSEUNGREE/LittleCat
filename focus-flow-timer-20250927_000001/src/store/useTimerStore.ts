import { create } from 'zustand';
import { TimerState, TimerSession, UserPreferences, FlowPattern } from '../types';

interface TimerStore {
  // Timer State
  timerState: TimerState;
  setTimerState: (state: Partial<TimerState>) => void;
  
  // Sessions
  sessions: TimerSession[];
  addSession: (session: TimerSession) => void;
  
  // User Preferences
  preferences: UserPreferences;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  
  // Flow Patterns
  flowPattern: FlowPattern;
  updateFlowPattern: (pattern: Partial<FlowPattern>) => void;
  
  // Actions
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  skipSession: () => void;
  tick: () => void;
}

const defaultPreferences: UserPreferences = {
  focusDuration: 25 * 60, // 25 minutes in seconds
  shortBreakDuration: 5 * 60,
  longBreakDuration: 15 * 60,
  sessionsBeforeLongBreak: 4,
  soundEnabled: true,
  vibrationEnabled: true,
  adaptiveMode: false,
};

const defaultFlowPattern: FlowPattern = {
  optimalFocusTime: 25,
  optimalBreakTime: 5,
  peakHours: [9, 10, 14, 15],
  dailyTarget: 8,
  currentStreak: 0,
};

const useTimerStore = create<TimerStore>((set, get) => ({
  timerState: {
    isRunning: false,
    currentTime: defaultPreferences.focusDuration,
    totalTime: defaultPreferences.focusDuration,
    sessionType: 'focus',
    sessionsCompleted: 0,
    dailyGoal: 8,
  },
  
  sessions: [],
  preferences: defaultPreferences,
  flowPattern: defaultFlowPattern,
  
  setTimerState: (newState) => 
    set((state) => ({
      timerState: { ...state.timerState, ...newState }
    })),
  
  addSession: (session) =>
    set((state) => ({
      sessions: [...state.sessions, session]
    })),
  
  updatePreferences: (prefs) =>
    set((state) => ({
      preferences: { ...state.preferences, ...prefs }
    })),
  
  updateFlowPattern: (pattern) =>
    set((state) => ({
      flowPattern: { ...state.flowPattern, ...pattern }
    })),
  
  startTimer: () => {
    const { timerState, preferences } = get();
    if (!timerState.isRunning) {
      set((state) => ({
        timerState: { 
          ...state.timerState, 
          isRunning: true,
          currentTime: state.timerState.currentTime || 
            (state.timerState.sessionType === 'focus' 
              ? preferences.focusDuration 
              : state.timerState.sessionType === 'break'
              ? preferences.shortBreakDuration
              : preferences.longBreakDuration)
        }
      }));
    }
  },
  
  pauseTimer: () =>
    set((state) => ({
      timerState: { ...state.timerState, isRunning: false }
    })),
  
  resetTimer: () => {
    const { preferences, timerState } = get();
    const duration = timerState.sessionType === 'focus'
      ? preferences.focusDuration
      : timerState.sessionType === 'break'
      ? preferences.shortBreakDuration
      : preferences.longBreakDuration;
      
    set((state) => ({
      timerState: {
        ...state.timerState,
        isRunning: false,
        currentTime: duration,
        totalTime: duration,
      }
    }));
  },
  
  skipSession: () => {
    const { timerState, preferences } = get();
    const nextType = timerState.sessionType === 'focus' 
      ? (timerState.sessionsCompleted + 1) % preferences.sessionsBeforeLongBreak === 0
        ? 'longBreak' 
        : 'break'
      : 'focus';
      
    const nextDuration = nextType === 'focus'
      ? preferences.focusDuration
      : nextType === 'break'
      ? preferences.shortBreakDuration
      : preferences.longBreakDuration;
      
    set((state) => ({
      timerState: {
        ...state.timerState,
        sessionType: nextType,
        currentTime: nextDuration,
        totalTime: nextDuration,
        sessionsCompleted: nextType === 'focus' 
          ? state.timerState.sessionsCompleted + 1 
          : state.timerState.sessionsCompleted,
        isRunning: false,
      }
    }));
  },
  
  tick: () => {
    const { timerState, preferences, addSession } = get();
    
    if (timerState.isRunning && timerState.currentTime > 0) {
      set((state) => ({
        timerState: {
          ...state.timerState,
          currentTime: state.timerState.currentTime - 1
        }
      }));
    } else if (timerState.isRunning && timerState.currentTime === 0) {
      // Session completed
      const session: TimerSession = {
        id: Date.now().toString(),
        type: timerState.sessionType,
        duration: timerState.totalTime,
        startedAt: new Date(Date.now() - timerState.totalTime * 1000),
        completedAt: new Date(),
        productivity: Math.floor(Math.random() * 30) + 70, // Mock productivity score
      };
      
      addSession(session);
      
      // Auto-start next session
      const nextType = timerState.sessionType === 'focus' 
        ? (timerState.sessionsCompleted + 1) % preferences.sessionsBeforeLongBreak === 0
          ? 'longBreak' 
          : 'break'
        : 'focus';
        
      const nextDuration = nextType === 'focus'
        ? preferences.focusDuration
        : nextType === 'break'
        ? preferences.shortBreakDuration
        : preferences.longBreakDuration;
        
      set((state) => ({
        timerState: {
          ...state.timerState,
          sessionType: nextType,
          currentTime: nextDuration,
          totalTime: nextDuration,
          sessionsCompleted: timerState.sessionType === 'focus' 
            ? state.timerState.sessionsCompleted + 1 
            : state.timerState.sessionsCompleted,
          isRunning: false, // Auto-pause between sessions
        }
      }));
      
      // Play notification sound
      if (preferences.soundEnabled) {
        const audio = new Audio('data:audio/wav;base64,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');
        audio.play().catch(() => {});
      }
      
      // Vibrate if enabled
      if (preferences.vibrationEnabled && 'vibrate' in navigator) {
        navigator.vibrate([200, 100, 200]);
      }
    }
  },
}));

export default useTimerStore;