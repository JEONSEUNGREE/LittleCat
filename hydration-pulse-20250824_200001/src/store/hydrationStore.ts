import { create } from 'zustand'

interface DrinkEntry {
  id: string
  amount: number
  type: 'water' | 'tea' | 'coffee' | 'juice' | 'other'
  timestamp: Date
}

interface HydrationStore {
  dailyGoal: number
  todayIntake: number
  drinkHistory: DrinkEntry[]
  reminders: boolean
  reminderInterval: number
  lastReminderTime: Date | null
  hydrationLevel: number
  
  setDailyGoal: (goal: number) => void
  addDrink: (amount: number, type: DrinkEntry['type']) => void
  clearTodayIntake: () => void
  toggleReminders: () => void
  setReminderInterval: (minutes: number) => void
  updateHydrationLevel: () => void
  getTodayHistory: () => DrinkEntry[]
}

export const useHydrationStore = create<HydrationStore>((set, get) => ({
      dailyGoal: 2000,
      todayIntake: 0,
      drinkHistory: [],
      reminders: true,
      reminderInterval: 60,
      lastReminderTime: null,
      hydrationLevel: 0,
      
      setDailyGoal: (goal) => {
        set({ dailyGoal: goal })
        get().updateHydrationLevel()
      },
      
      addDrink: (amount, type) => {
        const newEntry: DrinkEntry = {
          id: Date.now().toString(),
          amount,
          type,
          timestamp: new Date()
        }
        
        set((state) => ({
          todayIntake: state.todayIntake + amount,
          drinkHistory: [...state.drinkHistory, newEntry],
          lastReminderTime: new Date()
        }))
        
        get().updateHydrationLevel()
      },
      
      clearTodayIntake: () => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        
        set((state) => ({
          todayIntake: 0,
          drinkHistory: state.drinkHistory.filter(
            entry => new Date(entry.timestamp) < today
          )
        }))
        
        get().updateHydrationLevel()
      },
      
      toggleReminders: () => set((state) => ({ reminders: !state.reminders })),
      
      setReminderInterval: (minutes) => set({ reminderInterval: minutes }),
      
      updateHydrationLevel: () => {
        const { todayIntake, dailyGoal } = get()
        const level = Math.min(100, Math.round((todayIntake / dailyGoal) * 100))
        set({ hydrationLevel: level })
      },
      
      getTodayHistory: () => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        
        return get().drinkHistory.filter(
          entry => new Date(entry.timestamp) >= today
        )
      }
    }))