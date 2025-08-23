import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface Habit {
  id: string
  name: string
  icon: string
  color: string
  frequency: 'daily' | 'weekly' | 'monthly'
  targetCount: number
  createdAt: Date
  streak: number
  lastCompletedDate: string | null
}

export interface HabitCompletion {
  habitId: string
  date: string
  completed: boolean
}

interface HabitStore {
  habits: Habit[]
  completions: HabitCompletion[]
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'streak' | 'lastCompletedDate'>) => void
  deleteHabit: (id: string) => void
  toggleHabitCompletion: (habitId: string, date: string) => void
  getHabitCompletionForDate: (habitId: string, date: string) => boolean
  getHabitStreak: (habitId: string) => number
  updateHabitStreak: (habitId: string) => void
}

const useHabitStore = create<HabitStore>()(
  persist(
    (set, get) => ({
      habits: [],
      completions: [],
      
      addHabit: (habitData) => {
        const newHabit: Habit = {
          ...habitData,
          id: Date.now().toString(),
          createdAt: new Date(),
          streak: 0,
          lastCompletedDate: null,
        }
        set((state) => ({
          habits: [...state.habits, newHabit],
        }))
      },
      
      deleteHabit: (id) => {
        set((state) => ({
          habits: state.habits.filter((h) => h.id !== id),
          completions: state.completions.filter((c) => c.habitId !== id),
        }))
      },
      
      toggleHabitCompletion: (habitId, date) => {
        const state = get()
        const existingCompletion = state.completions.find(
          (c) => c.habitId === habitId && c.date === date
        )
        
        if (existingCompletion) {
          set((state) => ({
            completions: state.completions.map((c) =>
              c.habitId === habitId && c.date === date
                ? { ...c, completed: !c.completed }
                : c
            ),
          }))
        } else {
          set((state) => ({
            completions: [
              ...state.completions,
              { habitId, date, completed: true },
            ],
          }))
        }
        
        get().updateHabitStreak(habitId)
      },
      
      getHabitCompletionForDate: (habitId, date) => {
        const state = get()
        const completion = state.completions.find(
          (c) => c.habitId === habitId && c.date === date && c.completed
        )
        return !!completion
      },
      
      getHabitStreak: (habitId) => {
        const state = get()
        const habit = state.habits.find((h) => h.id === habitId)
        return habit?.streak || 0
      },
      
      updateHabitStreak: (habitId) => {
        const state = get()
        const habitCompletions = state.completions
          .filter((c) => c.habitId === habitId && c.completed)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        
        let streak = 0
        const today = new Date().toISOString().split('T')[0]
        let currentDate = today
        
        for (const completion of habitCompletions) {
          if (completion.date === currentDate) {
            streak++
            const date = new Date(currentDate)
            date.setDate(date.getDate() - 1)
            currentDate = date.toISOString().split('T')[0]
          } else {
            break
          }
        }
        
        set((state) => ({
          habits: state.habits.map((h) =>
            h.id === habitId
              ? { ...h, streak, lastCompletedDate: habitCompletions[0]?.date || null }
              : h
          ),
        }))
      },
    }),
    {
      name: 'habit-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useHabitStore