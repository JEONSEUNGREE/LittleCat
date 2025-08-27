import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface PostureSession {
  id: string
  date: string
  checks: number
  stretches: number
  rating: number
}

interface PostureStore {
  // Timer settings
  interval: number
  isActive: boolean
  timeRemaining: number
  notificationsEnabled: boolean
  soundEnabled: boolean
  
  // Statistics
  todayChecks: number
  totalChecks: number
  currentStreak: number
  bestStreak: number
  sessions: PostureSession[]
  
  // Actions
  startTimer: () => void
  pauseTimer: () => void
  resetTimer: () => void
  updateInterval: (minutes: number) => void
  toggleNotifications: () => void
  toggleSound: () => void
  recordCheck: () => void
  recordStretch: () => void
  rateSession: (rating: number) => void
  tick: () => void
}

export const usePostureStore = create<PostureStore>()(
  persist(
    (set, get) => ({
      // Initial state
      interval: 30,
      isActive: false,
      timeRemaining: 30 * 60,
      notificationsEnabled: true,
      soundEnabled: true,
      todayChecks: 0,
      totalChecks: 0,
      currentStreak: 0,
      bestStreak: 0,
      sessions: [],

      // Timer actions
      startTimer: () => set((state) => ({ 
        isActive: true,
        timeRemaining: state.interval * 60 
      })),
      
      pauseTimer: () => set({ isActive: false }),
      
      resetTimer: () => set((state) => ({ 
        timeRemaining: state.interval * 60,
        isActive: false 
      })),
      
      updateInterval: (minutes) => set({ 
        interval: minutes,
        timeRemaining: minutes * 60,
        isActive: false 
      }),
      
      toggleNotifications: () => set((state) => ({ 
        notificationsEnabled: !state.notificationsEnabled 
      })),
      
      toggleSound: () => set((state) => ({ 
        soundEnabled: !state.soundEnabled 
      })),
      
      recordCheck: () => set((state) => ({
        todayChecks: state.todayChecks + 1,
        totalChecks: state.totalChecks + 1,
        timeRemaining: state.interval * 60
      })),
      
      recordStretch: () => {
        const today = new Date().toISOString().split('T')[0]
        const existingSession = get().sessions.find(s => s.date === today)
        
        if (existingSession) {
          set((state) => ({
            sessions: state.sessions.map(s => 
              s.date === today 
                ? { ...s, stretches: s.stretches + 1 }
                : s
            )
          }))
        } else {
          set((state) => ({
            sessions: [...state.sessions, {
              id: Date.now().toString(),
              date: today,
              checks: 1,
              stretches: 1,
              rating: 0
            }]
          }))
        }
      },
      
      rateSession: (rating) => {
        const today = new Date().toISOString().split('T')[0]
        set((state) => ({
          sessions: state.sessions.map(s => 
            s.date === today 
              ? { ...s, rating }
              : s
          )
        }))
      },
      
      tick: () => set((state) => {
        if (state.timeRemaining <= 0) {
          if (state.soundEnabled) {
            // Play notification sound
            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGHzO3Zmi4FH2zG7+OJQAAZVazn7q1cFApEm9zw0nkqBSl+zOzajDQIGmW56+CwVBQKPZLW8NqGMAYrb8nq3rJWGAlAkNPu3o48CRVlq+njtm0wCTKCwOTJjS0OGHm99+ePMRUJZK7p6LZYCBM+j9HozJM0Cx550fDMeiYJMni26N+MOQoZaLzv5IshCBdmsuDp1s3sw5kxBgeE1/XOin0tF37A3r9eIQ0qbt3ywpU6Cx13v9m6VhMOnNbwzIMsBTGO3PDQdTMBH2a68d2bOAoVYqzk5KVNEwxPqNPm0LVoMgwfadDrvGMNDkWh1OWlSkgEFVu76OmzWygCKHPG5+CrbhUMTJvY9cN8HwUoksPu3os0CRlmredqTQwKYrvt3VAJGWu86dGWNwcaZLjs2pkusOG1ciscBDiS0+/LfB0FNXbP9L1aGwU8oN/vsVUSCGbC4uuyWxsITJvZ4MJ1KgUgjNjxymkUCEaFv+OuRRkCGWyx7OGdOA0VbLvp35Q2ByR7y+bas00GHnDD6+RsCB1wrOjkrVYUEDyaxOvHchoHO47PwJctDROmz+TYky0EH3PG69KJMQkZZ7zql0EIG2u67NlMEBxwseGpQAwScL7guU4cEGai6OihUQwFXKzc6L9mGBQ7j8XqylQfCCuAyNzJmTkHIHO847RIDAdwsuLqpzsLDGTE48p8GwUvcsnZx34kBRduyej');
            audio.play()
          }
          
          if (state.notificationsEnabled && 'Notification' in window) {
            new Notification('자세 확인 시간!', {
              body: '잠시 자세를 확인하고 스트레칭해보세요',
              icon: '/posture.svg'
            })
          }
          
          return { timeRemaining: 0 }
        }
        return { timeRemaining: state.timeRemaining - 1 }
      })
    }),
    {
      name: 'posture-store',
      partialize: (state) => ({
        interval: state.interval,
        notificationsEnabled: state.notificationsEnabled,
        soundEnabled: state.soundEnabled,
        totalChecks: state.totalChecks,
        currentStreak: state.currentStreak,
        bestStreak: state.bestStreak,
        sessions: state.sessions
      })
    }
  )
)