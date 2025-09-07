import { create } from 'zustand'

interface PostureSession {
  id: string
  startTime: Date
  endTime?: Date
  goodPostureTime: number
  badPostureTime: number
  breaks: number
}

interface PostureStore {
  isMonitoring: boolean
  currentSession: PostureSession | null
  sessions: PostureSession[]
  dailyGoal: number
  currentPosture: 'good' | 'bad' | 'neutral'
  breakReminder: boolean
  lastBreakTime: Date | null
  
  startMonitoring: () => void
  stopMonitoring: () => void
  updatePosture: (posture: 'good' | 'bad' | 'neutral') => void
  takeBreak: () => void
  setDailyGoal: (minutes: number) => void
  toggleBreakReminder: () => void
  getTodayStats: () => { totalTime: number; goodTime: number; badTime: number; breaks: number }
}

export const usePostureStore = create<PostureStore>((set, get) => ({
  isMonitoring: false,
  currentSession: null,
  sessions: [],
  dailyGoal: 480, // 8 hours in minutes
  currentPosture: 'neutral',
  breakReminder: true,
  lastBreakTime: null,

  startMonitoring: () => {
    const newSession: PostureSession = {
      id: Date.now().toString(),
      startTime: new Date(),
      goodPostureTime: 0,
      badPostureTime: 0,
      breaks: 0,
    }
    set({ isMonitoring: true, currentSession: newSession })
  },

  stopMonitoring: () => {
    const { currentSession, sessions } = get()
    if (currentSession) {
      const completedSession = {
        ...currentSession,
        endTime: new Date(),
      }
      set({
        isMonitoring: false,
        currentSession: null,
        sessions: [...sessions, completedSession],
        currentPosture: 'neutral',
      })
    }
  },

  updatePosture: (posture) => {
    set({ currentPosture: posture })
    const { currentSession } = get()
    if (currentSession && posture !== 'neutral') {
      const update = posture === 'good' 
        ? { goodPostureTime: currentSession.goodPostureTime + 1 }
        : { badPostureTime: currentSession.badPostureTime + 1 }
      
      set({
        currentSession: {
          ...currentSession,
          ...update,
        }
      })
    }
  },

  takeBreak: () => {
    const { currentSession } = get()
    if (currentSession) {
      set({
        currentSession: {
          ...currentSession,
          breaks: currentSession.breaks + 1,
        },
        lastBreakTime: new Date(),
      })
    }
  },

  setDailyGoal: (minutes) => {
    set({ dailyGoal: minutes })
  },

  toggleBreakReminder: () => {
    set((state) => ({ breakReminder: !state.breakReminder }))
  },

  getTodayStats: () => {
    const { sessions, currentSession } = get()
    const today = new Date().toDateString()
    
    const todaySessions = sessions.filter(
      (s) => s.startTime.toDateString() === today
    )
    
    let totalTime = 0
    let goodTime = 0
    let badTime = 0
    let breaks = 0

    todaySessions.forEach((session) => {
      if (session.endTime) {
        const duration = (session.endTime.getTime() - session.startTime.getTime()) / 60000
        totalTime += duration
      }
      goodTime += session.goodPostureTime
      badTime += session.badPostureTime
      breaks += session.breaks
    })

    if (currentSession) {
      const duration = (Date.now() - currentSession.startTime.getTime()) / 60000
      totalTime += duration
      goodTime += currentSession.goodPostureTime
      badTime += currentSession.badPostureTime
      breaks += currentSession.breaks
    }

    return { totalTime, goodTime, badTime, breaks }
  },
}))