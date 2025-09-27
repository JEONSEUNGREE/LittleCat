import { create } from 'zustand'

export type TimerMode = 'focus' | 'shortBreak' | 'longBreak'
export type FlowState = 'warmup' | 'flow' | 'peak' | 'cooldown'

interface TimerState {
  mode: TimerMode
  flowState: FlowState
  minutes: number
  seconds: number
  isRunning: boolean
  totalSessions: number
  currentStreak: number
  flowIntensity: number
  adaptiveDuration: number
  
  setMode: (mode: TimerMode) => void
  setTime: (minutes: number, seconds: number) => void
  toggleTimer: () => void
  resetTimer: () => void
  incrementSession: () => void
  updateFlowState: (state: FlowState) => void
  adjustAdaptiveDuration: (intensity: number) => void
}

const getInitialDuration = (mode: TimerMode): number => {
  switch (mode) {
    case 'focus': return 25
    case 'shortBreak': return 5
    case 'longBreak': return 15
    default: return 25
  }
}

export const useTimerStore = create<TimerState>((set, get) => ({
  mode: 'focus',
  flowState: 'warmup',
  minutes: 25,
  seconds: 0,
  isRunning: false,
  totalSessions: 0,
  currentStreak: 0,
  flowIntensity: 0,
  adaptiveDuration: 25,
  
  setMode: (mode) => {
    const duration = getInitialDuration(mode)
    set({ 
      mode, 
      minutes: duration,
      seconds: 0,
      isRunning: false,
      flowState: mode === 'focus' ? 'warmup' : 'cooldown'
    })
  },
  
  setTime: (minutes, seconds) => set({ minutes, seconds }),
  
  toggleTimer: () => set((state) => ({ isRunning: !state.isRunning })),
  
  resetTimer: () => {
    const { mode } = get()
    const duration = get().adaptiveDuration
    set({ 
      minutes: mode === 'focus' ? duration : getInitialDuration(mode),
      seconds: 0,
      isRunning: false,
      flowState: 'warmup'
    })
  },
  
  incrementSession: () => set((state) => ({ 
    totalSessions: state.totalSessions + 1,
    currentStreak: state.currentStreak + 1
  })),
  
  updateFlowState: (flowState) => set({ flowState }),
  
  adjustAdaptiveDuration: (intensity) => {
    const baseDuration = 25
    const adjustment = Math.floor(intensity * 10)
    const newDuration = Math.min(45, Math.max(15, baseDuration + adjustment))
    set({ 
      flowIntensity: intensity,
      adaptiveDuration: newDuration
    })
  }
}))