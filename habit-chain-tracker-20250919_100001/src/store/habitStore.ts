import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Habit {
  id: string
  name: string
  color: string
  streak: number
  lastCompletedDate: string | null
  createdAt: string
  completedDates: string[]
  targetDays: number
  description?: string
}

interface HabitStore {
  habits: Habit[]
  addHabit: (habit: Omit<Habit, 'id' | 'streak' | 'lastCompletedDate' | 'createdAt' | 'completedDates'>) => void
  deleteHabit: (id: string) => void
  toggleHabitCompletion: (id: string, date: string) => void
  updateStreak: (id: string) => void
  getHabitById: (id: string) => Habit | undefined
}

const useHabitStore = create<HabitStore>()(
  persist(
    (set, get) => ({
      habits: [],
      
      addHabit: (habitData) => {
        const newHabit: Habit = {
          ...habitData,
          id: Date.now().toString(),
          streak: 0,
          lastCompletedDate: null,
          createdAt: new Date().toISOString(),
          completedDates: []
        }
        set((state) => ({
          habits: [...state.habits, newHabit]
        }))
      },
      
      deleteHabit: (id) => {
        set((state) => ({
          habits: state.habits.filter((h) => h.id !== id)
        }))
      },
      
      toggleHabitCompletion: (id, date) => {
        set((state) => {
          const habit = state.habits.find((h) => h.id === id)
          if (!habit) return state
          
          const isCompleted = habit.completedDates.includes(date)
          let newCompletedDates: string[]
          
          if (isCompleted) {
            newCompletedDates = habit.completedDates.filter((d) => d !== date)
          } else {
            newCompletedDates = [...habit.completedDates, date].sort()
          }
          
          const updatedHabit = {
            ...habit,
            completedDates: newCompletedDates,
            lastCompletedDate: newCompletedDates.length > 0 
              ? newCompletedDates[newCompletedDates.length - 1]
              : null
          }
          
          return {
            habits: state.habits.map((h) => 
              h.id === id ? updatedHabit : h
            )
          }
        })
        
        get().updateStreak(id)
      },
      
      updateStreak: (id) => {
        set((state) => {
          const habit = state.habits.find((h) => h.id === id)
          if (!habit) return state
          
          let currentStreak = 0
          const today = new Date()
          const sortedDates = [...habit.completedDates].sort().reverse()
          
          for (let i = 0; i < sortedDates.length; i++) {
            const checkDate = new Date(today)
            checkDate.setDate(checkDate.getDate() - i)
            const checkDateString = checkDate.toISOString().split('T')[0]
            
            if (sortedDates.includes(checkDateString)) {
              currentStreak++
            } else if (i > 0) {
              break
            }
          }
          
          return {
            habits: state.habits.map((h) => 
              h.id === id ? { ...h, streak: currentStreak } : h
            )
          }
        })
      },
      
      getHabitById: (id) => {
        return get().habits.find((h) => h.id === id)
      }
    }),
    {
      name: 'habit-chain-storage'
    }
  )
)

export default useHabitStore