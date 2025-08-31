import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Stretch {
  id: string
  name: string
  description: string
  duration: number
  imageUrl?: string
}

export interface Session {
  id: string
  startTime: Date
  endTime?: Date
  stretchesCompleted: number
  duration: number
}

interface PostureStore {
  isTimerActive: boolean
  currentSession: Session | null
  sessions: Session[]
  stretches: Stretch[]
  settings: {
    reminderInterval: number
    soundEnabled: boolean
    vibrationEnabled: boolean
    workDuration: number
    breakDuration: number
  }
  notification: string | null
  elapsedTime: number
  
  startTimer: () => void
  pauseTimer: () => void
  resetTimer: () => void
  updateElapsedTime: (time: number) => void
  completeStretch: (stretchId: string) => void
  updateSettings: (settings: Partial<PostureStore['settings']>) => void
  addSession: (session: Session) => void
  setNotification: (message: string) => void
  clearNotification: () => void
}

const defaultStretches: Stretch[] = [
  {
    id: '1',
    name: '목 스트레칭',
    description: '천천히 목을 좌우로 돌려주세요',
    duration: 30
  },
  {
    id: '2',
    name: '어깨 돌리기',
    description: '어깨를 앞뒤로 크게 돌려주세요',
    duration: 30
  },
  {
    id: '3',
    name: '허리 스트레칭',
    description: '의자에서 일어나 허리를 좌우로 돌려주세요',
    duration: 45
  },
  {
    id: '4',
    name: '손목 스트레칭',
    description: '손목을 천천히 돌리고 펴주세요',
    duration: 20
  },
  {
    id: '5',
    name: '등 펴기',
    description: '양팔을 뒤로 깍지끼고 가슴을 펴주세요',
    duration: 30
  }
]

const usePostureStore = create<PostureStore>()(
  persist(
    (set, get) => ({
      isTimerActive: false,
      currentSession: null,
      sessions: [],
      stretches: defaultStretches,
      settings: {
        reminderInterval: 30,
        soundEnabled: true,
        vibrationEnabled: true,
        workDuration: 25,
        breakDuration: 5
      },
      notification: null,
      elapsedTime: 0,

      startTimer: () => {
        const newSession: Session = {
          id: Date.now().toString(),
          startTime: new Date(),
          stretchesCompleted: 0,
          duration: 0
        }
        set({ 
          isTimerActive: true, 
          currentSession: newSession,
          elapsedTime: 0
        })
      },

      pauseTimer: () => {
        set({ isTimerActive: false })
      },

      resetTimer: () => {
        const { currentSession } = get()
        if (currentSession) {
          const completedSession = {
            ...currentSession,
            endTime: new Date(),
            duration: get().elapsedTime
          }
          set(state => ({
            isTimerActive: false,
            currentSession: null,
            sessions: [...state.sessions, completedSession],
            elapsedTime: 0
          }))
        } else {
          set({ isTimerActive: false, elapsedTime: 0 })
        }
      },

      updateElapsedTime: (time) => {
        set({ elapsedTime: time })
      },

      completeStretch: (stretchId) => {
        set(state => ({
          currentSession: state.currentSession ? {
            ...state.currentSession,
            stretchesCompleted: state.currentSession.stretchesCompleted + 1
          } : null
        }))
      },

      updateSettings: (newSettings) => {
        set(state => ({
          settings: {
            ...state.settings,
            ...newSettings
          }
        }))
      },

      addSession: (session) => {
        set(state => ({
          sessions: [...state.sessions, session]
        }))
      },

      setNotification: (message) => {
        set({ notification: message })
      },

      clearNotification: () => {
        set({ notification: null })
      }
    }),
    {
      name: 'posture-store',
      partialize: (state) => ({
        sessions: state.sessions,
        settings: state.settings
      })
    }
  )
)

export default usePostureStore