import { create } from 'zustand'

interface Session {
  id: string
  duration: number
  completedAt: Date
  type: 'work' | 'break'
  focusLevel: number
}

interface TimerState {
  isRunning: boolean
  isPaused: boolean
  currentTime: number
  targetTime: number
  sessionType: 'work' | 'break'
  sessions: Session[]
  dailyGoal: number
  completedToday: number
  focusScore: number
  
  // Actions
  startTimer: (duration: number, type: 'work' | 'break') => void
  pauseTimer: () => void
  resumeTimer: () => void
  stopTimer: () => void
  tick: () => void
  completeSession: () => void
  setDailyGoal: (goal: number) => void
  calculateOptimalBreak: () => number
}

export const useTimerStore = create<TimerState>((set, get) => ({
  isRunning: false,
  isPaused: false,
  currentTime: 0,
  targetTime: 25 * 60, // Default 25 minutes
  sessionType: 'work',
  sessions: [],
  dailyGoal: 4,
  completedToday: 0,
  focusScore: 0,

  startTimer: (duration, type) => {
    set({
      isRunning: true,
      isPaused: false,
      currentTime: 0,
      targetTime: duration,
      sessionType: type,
    })
  },

  pauseTimer: () => {
    set({ isPaused: true })
  },

  resumeTimer: () => {
    set({ isPaused: false })
  },

  stopTimer: () => {
    set({
      isRunning: false,
      isPaused: false,
      currentTime: 0,
    })
  },

  tick: () => {
    const state = get()
    if (state.isRunning && !state.isPaused) {
      if (state.currentTime >= state.targetTime) {
        get().completeSession()
      } else {
        set({ currentTime: state.currentTime + 1 })
      }
    }
  },

  completeSession: () => {
    const state = get()
    const focusLevel = Math.min(100, (state.currentTime / state.targetTime) * 100)
    
    const newSession: Session = {
      id: Date.now().toString(),
      duration: state.currentTime,
      completedAt: new Date(),
      type: state.sessionType,
      focusLevel,
    }

    const updatedSessions = [...state.sessions, newSession]
    const todaySessions = updatedSessions.filter(s => {
      const today = new Date()
      const sessionDate = new Date(s.completedAt)
      return sessionDate.toDateString() === today.toDateString() && s.type === 'work'
    })

    const avgFocusScore = todaySessions.reduce((acc, s) => acc + s.focusLevel, 0) / todaySessions.length || 0

    set({
      isRunning: false,
      isPaused: false,
      currentTime: 0,
      sessions: updatedSessions,
      completedToday: todaySessions.length,
      focusScore: Math.round(avgFocusScore),
    })
  },

  setDailyGoal: (goal) => {
    set({ dailyGoal: goal })
  },

  calculateOptimalBreak: () => {
    const state = get()
    const recentSessions = state.sessions.slice(-3).filter(s => s.type === 'work')
    
    if (recentSessions.length === 0) return 5 * 60 // Default 5 minutes
    
    const avgFocus = recentSessions.reduce((acc, s) => acc + s.focusLevel, 0) / recentSessions.length
    
    // Lower focus = longer break needed
    if (avgFocus < 70) return 10 * 60 // 10 minutes
    if (avgFocus < 85) return 7 * 60  // 7 minutes
    return 5 * 60 // 5 minutes
  },
}))