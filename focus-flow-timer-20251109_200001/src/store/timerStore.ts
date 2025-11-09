import { create } from 'zustand'

export type TimerMode = 'focus' | 'shortBreak' | 'longBreak'
export type TimerStatus = 'idle' | 'running' | 'paused'

interface TimerState {
  mode: TimerMode
  status: TimerStatus
  timeLeft: number
  totalTime: number
  sessionsCompleted: number
  flowIntensity: number

  setMode: (mode: TimerMode) => void
  setStatus: (status: TimerStatus) => void
  setTimeLeft: (time: number) => void
  decrementTime: () => void
  incrementSessions: () => void
  setFlowIntensity: (intensity: number) => void
  reset: () => void
}

const FOCUS_TIME = 25 * 60
const SHORT_BREAK = 5 * 60
const LONG_BREAK = 15 * 60

export const useTimerStore = create<TimerState>((set) => ({
  mode: 'focus',
  status: 'idle',
  timeLeft: FOCUS_TIME,
  totalTime: FOCUS_TIME,
  sessionsCompleted: 0,
  flowIntensity: 0,

  setMode: (mode) => {
    const timeMap = {
      focus: FOCUS_TIME,
      shortBreak: SHORT_BREAK,
      longBreak: LONG_BREAK,
    }
    set({
      mode,
      timeLeft: timeMap[mode],
      totalTime: timeMap[mode],
      status: 'idle',
      flowIntensity: 0
    })
  },

  setStatus: (status) => set({ status }),

  setTimeLeft: (time) => set({ timeLeft: time }),

  decrementTime: () => set((state) => {
    const newTime = Math.max(0, state.timeLeft - 1)
    const progress = 1 - (newTime / state.totalTime)
    const newIntensity = Math.min(100, progress * 120)

    return {
      timeLeft: newTime,
      flowIntensity: newIntensity
    }
  }),

  incrementSessions: () => set((state) => ({
    sessionsCompleted: state.sessionsCompleted + 1
  })),

  setFlowIntensity: (intensity) => set({ flowIntensity: intensity }),

  reset: () => set({
    mode: 'focus',
    status: 'idle',
    timeLeft: FOCUS_TIME,
    totalTime: FOCUS_TIME,
    flowIntensity: 0
  }),
}))
