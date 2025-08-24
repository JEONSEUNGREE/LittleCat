import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Habit, HabitStats } from '../types/habit'

interface HabitStore {
  habits: Habit[]
  stats: HabitStats
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'completions'>) => void
  deleteHabit: (id: string) => void
  toggleHabit: (id: string, date?: string) => void
  loadHabits: () => void
  calculateStats: () => void
}

const getDateString = (date = new Date()) => {
  return date.toISOString().split('T')[0]
}

export const useHabitStore = create<HabitStore>()(
  persist(
    (set, get) => ({
      habits: [],
      stats: {
        totalHabits: 0,
        completedToday: 0,
        currentStreak: 0,
        bestStreak: 0,
        completionRate: 0,
      },

      addHabit: (habitData) => {
        const newHabit: Habit = {
          ...habitData,
          id: Date.now().toString(),
          createdAt: new Date(),
          completions: [],
        }
        set((state) => ({
          habits: [...state.habits, newHabit],
        }))
        get().calculateStats()
      },

      deleteHabit: (id) => {
        set((state) => ({
          habits: state.habits.filter((h) => h.id !== id),
        }))
        get().calculateStats()
      },

      toggleHabit: (id, date = getDateString()) => {
        set((state) => ({
          habits: state.habits.map((habit) => {
            if (habit.id !== id) return habit

            const existingCompletion = habit.completions.find((c) => c.date === date)
            
            if (existingCompletion) {
              return {
                ...habit,
                completions: habit.completions.filter((c) => c.date !== date),
              }
            } else {
              return {
                ...habit,
                completions: [...habit.completions, { date, count: 1 }],
              }
            }
          }),
        }))
        get().calculateStats()
      },

      loadHabits: () => {
        get().calculateStats()
      },

      calculateStats: () => {
        const { habits } = get()
        const today = getDateString()
        
        const completedToday = habits.filter((habit) =>
          habit.completions.some((c) => c.date === today)
        ).length

        const totalHabits = habits.length
        const completionRate = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0

        let currentStreak = 0
        let bestStreak = 0
        
        habits.forEach((habit) => {
          let streak = 0
          const dates = habit.completions.map((c) => c.date).sort().reverse()
          const todayDate = new Date()
          
          for (let i = 0; i < 30; i++) {
            const checkDate = new Date(todayDate)
            checkDate.setDate(checkDate.getDate() - i)
            const dateStr = getDateString(checkDate)
            
            if (dates.includes(dateStr)) {
              streak++
            } else if (i > 0) {
              break
            }
          }
          
          currentStreak = Math.max(currentStreak, streak)
          bestStreak = Math.max(bestStreak, streak)
        })

        set({
          stats: {
            totalHabits,
            completedToday,
            currentStreak,
            bestStreak,
            completionRate,
          },
        })
      },
    }),
    {
      name: 'habit-tracker-storage',
    }
  )
)