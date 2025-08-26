import { create } from 'zustand'

interface EyeCareState {
  isRunning: boolean
  timeRemaining: number
  breakTimeRemaining: number
  totalSessions: number
  todaySessions: number
  isOnBreak: boolean
  notificationsEnabled: boolean
  workDuration: number
  breakDuration: number
  setIsRunning: (running: boolean) => void
  setTimeRemaining: (time: number) => void
  setBreakTimeRemaining: (time: number) => void
  incrementSessions: () => void
  resetDaily: () => void
  setIsOnBreak: (onBreak: boolean) => void
  toggleNotifications: () => void
  setWorkDuration: (duration: number) => void
  setBreakDuration: (duration: number) => void
  reset: () => void
}

const DEFAULT_WORK_DURATION = 20 * 60 // 20 minutes in seconds
const DEFAULT_BREAK_DURATION = 20 // 20 seconds

export const useEyeCareStore = create<EyeCareState>((set) => ({
  isRunning: false,
  timeRemaining: DEFAULT_WORK_DURATION,
  breakTimeRemaining: DEFAULT_BREAK_DURATION,
  totalSessions: parseInt(localStorage.getItem('totalSessions') || '0'),
  todaySessions: parseInt(localStorage.getItem('todaySessions') || '0'),
  isOnBreak: false,
  notificationsEnabled: true,
  workDuration: DEFAULT_WORK_DURATION,
  breakDuration: DEFAULT_BREAK_DURATION,
  
  setIsRunning: (running) => set({ isRunning: running }),
  setTimeRemaining: (time) => set({ timeRemaining: time }),
  setBreakTimeRemaining: (time) => set({ breakTimeRemaining: time }),
  
  incrementSessions: () => set((state) => {
    const newTotal = state.totalSessions + 1
    const newToday = state.todaySessions + 1
    localStorage.setItem('totalSessions', newTotal.toString())
    localStorage.setItem('todaySessions', newToday.toString())
    localStorage.setItem('lastSessionDate', new Date().toDateString())
    return { totalSessions: newTotal, todaySessions: newToday }
  }),
  
  resetDaily: () => set(() => {
    localStorage.setItem('todaySessions', '0')
    return { todaySessions: 0 }
  }),
  
  setIsOnBreak: (onBreak) => set({ isOnBreak: onBreak }),
  toggleNotifications: () => set((state) => ({ notificationsEnabled: !state.notificationsEnabled })),
  setWorkDuration: (duration) => set({ workDuration: duration, timeRemaining: duration }),
  setBreakDuration: (duration) => set({ breakDuration: duration, breakTimeRemaining: duration }),
  
  reset: () => set((state) => ({
    isRunning: false,
    timeRemaining: state.workDuration,
    breakTimeRemaining: state.breakDuration,
    isOnBreak: false
  }))
}))