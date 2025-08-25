import { create } from 'zustand'

export interface PostureSession {
  id: string
  startTime: Date
  endTime: Date | null
  goodPostureTime: number // seconds
  badPostureTime: number // seconds
  alerts: number
}

export interface Exercise {
  id: string
  name: string
  description: string
  duration: number // seconds
  icon: string
  category: 'neck' | 'back' | 'shoulder' | 'full'
}

interface PostureStore {
  // Current session
  currentSession: PostureSession | null
  isMonitoring: boolean
  postureStatus: 'good' | 'bad' | 'neutral'
  
  // History
  sessions: PostureSession[]
  dailyGoal: number // minutes
  streakDays: number
  
  // Settings
  alertInterval: number // minutes
  soundEnabled: boolean
  vibrationEnabled: boolean
  
  // Actions
  startMonitoring: () => void
  stopMonitoring: () => void
  updatePostureStatus: (status: 'good' | 'bad' | 'neutral') => void
  addAlert: () => void
  setDailyGoal: (minutes: number) => void
  setAlertInterval: (minutes: number) => void
  toggleSound: () => void
  toggleVibration: () => void
  getStatistics: () => {
    totalTime: number
    goodPosturePercentage: number
    averageSessionTime: number
    totalAlerts: number
  }
}

export const usePostureStore = create<PostureStore>((set, get) => ({
      // Initial state
      currentSession: null,
      isMonitoring: false,
      postureStatus: 'neutral',
      sessions: [],
      dailyGoal: 60,
      streakDays: 0,
      alertInterval: 30,
      soundEnabled: true,
      vibrationEnabled: true,
      
      // Actions
      startMonitoring: () => {
        const newSession: PostureSession = {
          id: Date.now().toString(),
          startTime: new Date(),
          endTime: null,
          goodPostureTime: 0,
          badPostureTime: 0,
          alerts: 0,
        }
        set({ currentSession: newSession, isMonitoring: true })
      },
      
      stopMonitoring: () => {
        const { currentSession } = get()
        if (currentSession) {
          const endedSession = {
            ...currentSession,
            endTime: new Date(),
          }
          set((state) => ({
            sessions: [...state.sessions, endedSession],
            currentSession: null,
            isMonitoring: false,
            postureStatus: 'neutral',
          }))
        }
      },
      
      updatePostureStatus: (status) => {
        set({ postureStatus: status })
        const { currentSession } = get()
        if (currentSession && get().isMonitoring) {
          const updateInterval = 1 // Update every second
          if (status === 'good') {
            set((state) => ({
              currentSession: state.currentSession ? {
                ...state.currentSession,
                goodPostureTime: state.currentSession.goodPostureTime + updateInterval,
              } : null,
            }))
          } else if (status === 'bad') {
            set((state) => ({
              currentSession: state.currentSession ? {
                ...state.currentSession,
                badPostureTime: state.currentSession.badPostureTime + updateInterval,
              } : null,
            }))
          }
        }
      },
      
      addAlert: () => {
        set((state) => ({
          currentSession: state.currentSession ? {
            ...state.currentSession,
            alerts: state.currentSession.alerts + 1,
          } : null,
        }))
      },
      
      setDailyGoal: (minutes) => set({ dailyGoal: minutes }),
      setAlertInterval: (minutes) => set({ alertInterval: minutes }),
      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
      toggleVibration: () => set((state) => ({ vibrationEnabled: !state.vibrationEnabled })),
      
      getStatistics: () => {
        const { sessions } = get()
        const totalTime = sessions.reduce((acc, session) => 
          acc + session.goodPostureTime + session.badPostureTime, 0
        )
        const goodTime = sessions.reduce((acc, session) => 
          acc + session.goodPostureTime, 0
        )
        const goodPosturePercentage = totalTime > 0 ? (goodTime / totalTime) * 100 : 0
        const averageSessionTime = sessions.length > 0 ? totalTime / sessions.length : 0
        const totalAlerts = sessions.reduce((acc, session) => acc + session.alerts, 0)
        
        return {
          totalTime,
          goodPosturePercentage,
          averageSessionTime,
          totalAlerts,
        }
      },
    }))

// Exercise data
export const exercises: Exercise[] = [
  {
    id: '1',
    name: '목 스트레칭',
    description: '천천히 목을 좌우로 돌려주세요',
    duration: 30,
    icon: '🔄',
    category: 'neck',
  },
  {
    id: '2',
    name: '어깨 돌리기',
    description: '어깨를 크게 원을 그리며 돌려주세요',
    duration: 45,
    icon: '🔁',
    category: 'shoulder',
  },
  {
    id: '3',
    name: '등 펴기',
    description: '의자에 앉아 등을 곧게 펴고 유지하세요',
    duration: 60,
    icon: '⬆️',
    category: 'back',
  },
  {
    id: '4',
    name: '전신 스트레칭',
    description: '일어나서 전신을 쭉 펴주세요',
    duration: 90,
    icon: '🙆',
    category: 'full',
  },
  {
    id: '5',
    name: '손목 운동',
    description: '손목을 천천히 돌려주세요',
    duration: 30,
    icon: '✋',
    category: 'shoulder',
  },
  {
    id: '6',
    name: '허리 비틀기',
    description: '앉은 자세에서 허리를 좌우로 비틀어주세요',
    duration: 45,
    icon: '🔀',
    category: 'back',
  },
]