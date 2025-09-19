import { create } from 'zustand'

interface PostureSession {
  startTime: Date
  endTime?: Date
  goodPostureTime: number
  badPostureTime: number
  breaks: number
}

interface PostureStore {
  isMonitoring: boolean
  currentPosture: 'good' | 'bad' | 'neutral'
  sessions: PostureSession[]
  currentSession: PostureSession | null
  reminderInterval: number
  soundEnabled: boolean
  vibrationEnabled: boolean
  
  startMonitoring: () => void
  stopMonitoring: () => void
  updatePosture: (posture: 'good' | 'bad' | 'neutral') => void
  recordBreak: () => void
  setReminderInterval: (minutes: number) => void
  toggleSound: () => void
  toggleVibration: () => void
  getTodayStats: () => {
    totalTime: number
    goodPosturePercentage: number
    breaks: number
  }
}

export const usePostureStore = create<PostureStore>((set, get) => ({
  isMonitoring: false,
  currentPosture: 'neutral',
  sessions: [],
  currentSession: null,
  reminderInterval: 30,
  soundEnabled: true,
  vibrationEnabled: true,

  startMonitoring: () => {
    const newSession: PostureSession = {
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
    const { currentSession } = get()
    if (currentSession) {
      const updatedSession = { ...currentSession }
      if (posture === 'good') {
        updatedSession.goodPostureTime += 1
      } else if (posture === 'bad') {
        updatedSession.badPostureTime += 1
      }
      set({ currentPosture: posture, currentSession: updatedSession })
    } else {
      set({ currentPosture: posture })
    }
  },

  recordBreak: () => {
    const { currentSession } = get()
    if (currentSession) {
      set({
        currentSession: {
          ...currentSession,
          breaks: currentSession.breaks + 1,
        },
      })
    }
  },

  setReminderInterval: (minutes) => {
    set({ reminderInterval: minutes })
  },

  toggleSound: () => {
    set((state) => ({ soundEnabled: !state.soundEnabled }))
  },

  toggleVibration: () => {
    set((state) => ({ vibrationEnabled: !state.vibrationEnabled }))
  },

  getTodayStats: () => {
    const { sessions, currentSession } = get()
    const today = new Date().toDateString()
    
    const todaySessions = sessions.filter(
      (session) => session.startTime.toDateString() === today
    )
    
    if (currentSession) {
      todaySessions.push(currentSession)
    }
    
    const totalTime = todaySessions.reduce(
      (acc, session) => acc + session.goodPostureTime + session.badPostureTime,
      0
    )
    
    const goodTime = todaySessions.reduce(
      (acc, session) => acc + session.goodPostureTime,
      0
    )
    
    const breaks = todaySessions.reduce(
      (acc, session) => acc + session.breaks,
      0
    )
    
    return {
      totalTime,
      goodPosturePercentage: totalTime > 0 ? (goodTime / totalTime) * 100 : 0,
      breaks,
    }
  },
}))