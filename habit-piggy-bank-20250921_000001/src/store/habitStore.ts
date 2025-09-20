import { create } from 'zustand'

export interface Habit {
  id: string
  name: string
  icon: string
  dailySaving: number
  color: string
  streak: number
  totalSaved: number
  lastResisted: Date | null
  createdAt: Date
}

export interface SaveEntry {
  id: string
  habitId: string
  amount: number
  timestamp: Date
  note?: string
}

interface HabitStore {
  habits: Habit[]
  saveEntries: SaveEntry[]
  totalSavings: number
  todaysSavings: number
  addHabit: (habit: Omit<Habit, 'id' | 'streak' | 'totalSaved' | 'lastResisted' | 'createdAt'>) => void
  removeHabit: (id: string) => void
  recordSaving: (habitId: string, note?: string) => void
  getTodaysSavings: () => number
  getWeeklyStats: () => { day: string; amount: number }[]
  getHabitById: (id: string) => Habit | undefined
}

const useHabitStore = create<HabitStore>((set, get) => ({
      habits: [],
      saveEntries: [],
      totalSavings: 0,
      todaysSavings: 0,

      addHabit: (habitData) => {
        const newHabit: Habit = {
          ...habitData,
          id: Date.now().toString(),
          streak: 0,
          totalSaved: 0,
          lastResisted: null,
          createdAt: new Date()
        }
        set((state) => ({
          habits: [...state.habits, newHabit]
        }))
      },

      removeHabit: (id) => {
        set((state) => ({
          habits: state.habits.filter(h => h.id !== id),
          saveEntries: state.saveEntries.filter(e => e.habitId !== id)
        }))
      },

      recordSaving: (habitId, note) => {
        const habit = get().habits.find(h => h.id === habitId)
        if (!habit) return

        const today = new Date()
        const lastResisted = habit.lastResisted ? new Date(habit.lastResisted) : null
        const isToday = lastResisted && 
          lastResisted.toDateString() === today.toDateString()

        if (!isToday) {
          const newEntry: SaveEntry = {
            id: Date.now().toString(),
            habitId,
            amount: habit.dailySaving,
            timestamp: today,
            note
          }

          set((state) => {
            const updatedHabits = state.habits.map(h => {
              if (h.id === habitId) {
                const yesterday = new Date(today)
                yesterday.setDate(yesterday.getDate() - 1)
                const wasYesterday = lastResisted && 
                  lastResisted.toDateString() === yesterday.toDateString()
                
                return {
                  ...h,
                  streak: wasYesterday ? h.streak + 1 : 1,
                  totalSaved: h.totalSaved + habit.dailySaving,
                  lastResisted: today
                }
              }
              return h
            })

            return {
              habits: updatedHabits,
              saveEntries: [...state.saveEntries, newEntry],
              totalSavings: state.totalSavings + habit.dailySaving,
              todaysSavings: get().getTodaysSavings() + habit.dailySaving
            }
          })
        }
      },

      getTodaysSavings: () => {
        const today = new Date().toDateString()
        return get().saveEntries
          .filter(entry => new Date(entry.timestamp).toDateString() === today)
          .reduce((sum, entry) => sum + entry.amount, 0)
      },

      getWeeklyStats: () => {
        const days = ['일', '월', '화', '수', '목', '금', '토']
        const stats = []
        const today = new Date()

        for (let i = 6; i >= 0; i--) {
          const date = new Date(today)
          date.setDate(date.getDate() - i)
          const dateStr = date.toDateString()
          
          const dayAmount = get().saveEntries
            .filter(entry => new Date(entry.timestamp).toDateString() === dateStr)
            .reduce((sum, entry) => sum + entry.amount, 0)
          
          stats.push({
            day: days[date.getDay()],
            amount: dayAmount
          })
        }
        
        return stats
      },

      getHabitById: (id) => {
        return get().habits.find(h => h.id === id)
      }
  })
)

export default useHabitStore