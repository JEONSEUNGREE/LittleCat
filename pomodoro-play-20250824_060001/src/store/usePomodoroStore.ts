import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Session {
  id: string
  startTime: number
  endTime: number | null
  type: 'work' | 'break'
  completed: boolean
}

interface PomodoroState {
  // Timer state
  isRunning: boolean
  isPaused: boolean
  timeLeft: number
  currentSession: 'work' | 'shortBreak' | 'longBreak'
  sessionCount: number
  
  // Settings
  workDuration: number
  shortBreakDuration: number
  longBreakDuration: number
  sessionsUntilLongBreak: number
  soundEnabled: boolean
  vibrationEnabled: boolean
  musicUrl: string | null
  
  // History
  sessions: Session[]
  totalFocusTime: number
  todayFocusTime: number
  currentStreak: number
  bestStreak: number
  
  // Actions
  startTimer: () => void
  pauseTimer: () => void
  resumeTimer: () => void
  resetTimer: () => void
  skipSession: () => void
  completeSession: () => void
  updateSettings: (settings: Partial<PomodoroState>) => void
  tick: () => void
  setMusicUrl: (url: string | null) => void
}

const DEFAULT_WORK_DURATION = 25 * 60 // 25 minutes
const DEFAULT_SHORT_BREAK = 5 * 60 // 5 minutes
const DEFAULT_LONG_BREAK = 15 * 60 // 15 minutes

export const usePomodoroStore = create<PomodoroState>()(
  persist(
    (set, get) => ({
      // Initial state
      isRunning: false,
      isPaused: false,
      timeLeft: DEFAULT_WORK_DURATION,
      currentSession: 'work',
      sessionCount: 0,
      
      // Settings
      workDuration: DEFAULT_WORK_DURATION,
      shortBreakDuration: DEFAULT_SHORT_BREAK,
      longBreakDuration: DEFAULT_LONG_BREAK,
      sessionsUntilLongBreak: 4,
      soundEnabled: true,
      vibrationEnabled: true,
      musicUrl: null,
      
      // History
      sessions: [],
      totalFocusTime: 0,
      todayFocusTime: 0,
      currentStreak: 0,
      bestStreak: 0,
      
      // Actions
      startTimer: () => {
        const state = get()
        const newSession: Session = {
          id: Date.now().toString(),
          startTime: Date.now(),
          endTime: null,
          type: state.currentSession === 'work' ? 'work' : 'break',
          completed: false
        }
        
        set({
          isRunning: true,
          isPaused: false,
          sessions: [...state.sessions, newSession]
        })
      },
      
      pauseTimer: () => {
        set({ isPaused: true, isRunning: false })
      },
      
      resumeTimer: () => {
        set({ isPaused: false, isRunning: true })
      },
      
      resetTimer: () => {
        const state = get()
        let timeLeft = state.workDuration
        
        if (state.currentSession === 'shortBreak') {
          timeLeft = state.shortBreakDuration
        } else if (state.currentSession === 'longBreak') {
          timeLeft = state.longBreakDuration
        }
        
        set({
          isRunning: false,
          isPaused: false,
          timeLeft
        })
      },
      
      skipSession: () => {
        const state = get()
        get().completeSession()
      },
      
      completeSession: () => {
        const state = get()
        const currentSessionData = state.sessions[state.sessions.length - 1]
        
        if (currentSessionData) {
          currentSessionData.endTime = Date.now()
          currentSessionData.completed = true
        }
        
        // Update stats
        if (state.currentSession === 'work') {
          const sessionTime = state.workDuration
          set({
            totalFocusTime: state.totalFocusTime + sessionTime,
            todayFocusTime: state.todayFocusTime + sessionTime,
            currentStreak: state.currentStreak + 1,
            bestStreak: Math.max(state.bestStreak, state.currentStreak + 1)
          })
        }
        
        // Determine next session
        let nextSession: 'work' | 'shortBreak' | 'longBreak' = 'work'
        let nextDuration = state.workDuration
        let newSessionCount = state.sessionCount
        
        if (state.currentSession === 'work') {
          newSessionCount++
          if (newSessionCount % state.sessionsUntilLongBreak === 0) {
            nextSession = 'longBreak'
            nextDuration = state.longBreakDuration
          } else {
            nextSession = 'shortBreak'
            nextDuration = state.shortBreakDuration
          }
        } else {
          nextSession = 'work'
          nextDuration = state.workDuration
        }
        
        set({
          currentSession: nextSession,
          timeLeft: nextDuration,
          sessionCount: newSessionCount,
          isRunning: false,
          isPaused: false
        })
        
        // Play notification sound
        if (state.soundEnabled) {
          const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhCSyBzvLZiTYIG2m98OScTgwOUant759NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N+RQAoUXrTp66hVFApGn+DyvmwhCSyBzvLZiTYIG2m98OScTgwOUant759NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N+RQAoUXrTp66hVFApGn+DyvmwhCSyBzvLZiTYIG2m98OScTgwOUant759NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N+RQAoUXrTp66hVFApGn+DyvmwhCSyBzvLZiTYIG2m98OScTgwOUant759NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N+RQAoUXrTp66hVFApGn+DyvmwhCSyBzvLZiTYIG2m98OScTgwOUant759NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N+RQAoUXrTp66hVFApGn+DyvmwhCSyBzvLZiTYIG2m98OScTgwOUant759NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N+RQAoUXrTp66hVFApGn+DyvmwhCSyBzvLZiTYIG2m98OScTgwOUant759NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N+RQAoUXrTp66hVFApGn+DyvmwhCSyBzvLZiTYIG2m98OScTgwOUant759NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N+RQAoUXrTp66hVFApGn+DyvmwhCSyBzvLZiTYIG2m98OScTgwOUant759NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N+RQAoUXrTp66hVFApGn+DyvmwhCSyBzvLZiTYIG2m98OScTgwOUant759NEAxQp+PvdcT6fGzcwKAVqboAAA==')
          audio.play().catch(() => {})
        }
        
        // Vibrate if enabled
        if (state.vibrationEnabled && 'vibrate' in navigator) {
          navigator.vibrate([200, 100, 200])
        }
      },
      
      updateSettings: (settings) => {
        set(settings)
      },
      
      tick: () => {
        const state = get()
        if (state.isRunning && !state.isPaused && state.timeLeft > 0) {
          const newTimeLeft = state.timeLeft - 1
          set({ timeLeft: newTimeLeft })
          
          if (newTimeLeft === 0) {
            get().completeSession()
          }
        }
      },
      
      setMusicUrl: (url) => {
        set({ musicUrl: url })
      }
    }),
    {
      name: 'pomodoro-storage',
      partialize: (state) => ({
        workDuration: state.workDuration,
        shortBreakDuration: state.shortBreakDuration,
        longBreakDuration: state.longBreakDuration,
        sessionsUntilLongBreak: state.sessionsUntilLongBreak,
        soundEnabled: state.soundEnabled,
        vibrationEnabled: state.vibrationEnabled,
        totalFocusTime: state.totalFocusTime,
        bestStreak: state.bestStreak,
        sessions: state.sessions.slice(-100) // Keep last 100 sessions
      })
    }
  )
)