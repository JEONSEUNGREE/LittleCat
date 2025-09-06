import { create } from 'zustand'

export interface DrinkRecord {
  id: string
  amount: number
  timestamp: Date
  type: 'water' | 'tea' | 'coffee' | 'juice' | 'milk' | 'other'
}

interface HydrationState {
  dailyGoal: number
  currentIntake: number
  drinks: DrinkRecord[]
  streakDays: number
  lastLogDate: string | null
  reminderEnabled: boolean
  reminderInterval: number
  
  setDailyGoal: (goal: number) => void
  addDrink: (amount: number, type: DrinkRecord['type']) => void
  removeDrink: (id: string) => void
  resetDaily: () => void
  toggleReminder: () => void
  setReminderInterval: (minutes: number) => void
  checkAndUpdateStreak: () => void
}

const useHydrationStore = create<HydrationState>()((set, get) => ({
      dailyGoal: 2000,
      currentIntake: 0,
      drinks: [],
      streakDays: 0,
      lastLogDate: null,
      reminderEnabled: true,
      reminderInterval: 60,
      
      setDailyGoal: (goal) => set({ dailyGoal: goal }),
      
      addDrink: (amount, type) => {
        const newDrink: DrinkRecord = {
          id: Date.now().toString(),
          amount,
          timestamp: new Date(),
          type
        }
        
        set((state) => ({
          drinks: [...state.drinks, newDrink],
          currentIntake: state.currentIntake + amount,
          lastLogDate: new Date().toDateString()
        }))
        
        get().checkAndUpdateStreak()
      },
      
      removeDrink: (id) => {
        set((state) => {
          const drink = state.drinks.find(d => d.id === id)
          if (!drink) return state
          
          return {
            drinks: state.drinks.filter(d => d.id !== id),
            currentIntake: Math.max(0, state.currentIntake - drink.amount)
          }
        })
      },
      
      resetDaily: () => {
        const today = new Date().toDateString()
        const state = get()
        
        if (state.lastLogDate !== today) {
          set({
            currentIntake: 0,
            drinks: [],
            lastLogDate: today
          })
        }
      },
      
      toggleReminder: () => set((state) => ({ reminderEnabled: !state.reminderEnabled })),
      
      setReminderInterval: (minutes) => set({ reminderInterval: minutes }),
      
      checkAndUpdateStreak: () => {
        const today = new Date().toDateString()
        const yesterday = new Date(Date.now() - 86400000).toDateString()
        const state = get()
        
        if (state.lastLogDate === yesterday || state.lastLogDate === today) {
          if (state.currentIntake >= state.dailyGoal * 0.8) {
            set((state) => ({ streakDays: state.streakDays + 1 }))
          }
        } else if (state.lastLogDate !== today) {
          set({ streakDays: 0 })
        }
      }
    }
  }))

export default useHydrationStore