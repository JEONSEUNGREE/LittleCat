import { create } from 'zustand'

interface WaterRecord {
  id: string
  amount: number
  time: Date
  type: string
}

interface DailyRecord {
  date: string
  total: number
  goal: number
  records: WaterRecord[]
}

interface WaterStore {
  dailyGoal: number
  currentIntake: number
  records: WaterRecord[]
  history: DailyRecord[]
  lastReminder: Date | null
  
  setDailyGoal: (goal: number) => void
  addWater: (amount: number, type?: string) => void
  removeRecord: (id: string) => void
  initializeDay: () => void
  getProgress: () => number
  getTodayRecords: () => WaterRecord[]
  getWeeklyStats: () => { date: string; total: number; goal: number }[]
}

export const useWaterStore = create<WaterStore>((set, get) => ({
      dailyGoal: 2000,
      currentIntake: 0,
      records: [],
      history: [],
      lastReminder: null,

      setDailyGoal: (goal) => set({ dailyGoal: goal }),

      addWater: (amount, type = 'water') => {
        const newRecord: WaterRecord = {
          id: Date.now().toString(),
          amount,
          time: new Date(),
          type,
        }
        
        set((state) => ({
          currentIntake: state.currentIntake + amount,
          records: [...state.records, newRecord],
        }))
      },

      removeRecord: (id) => {
        set((state) => {
          const record = state.records.find((r) => r.id === id)
          if (!record) return state
          
          return {
            currentIntake: Math.max(0, state.currentIntake - record.amount),
            records: state.records.filter((r) => r.id !== id),
          }
        })
      },

      initializeDay: () => {
        const today = new Date().toDateString()
        const state = get()
        const lastRecord = state.history[0]
        
        if (!lastRecord || lastRecord.date !== today) {
          // Save yesterday's data if exists
          if (state.records.length > 0) {
            const yesterday: DailyRecord = {
              date: new Date(Date.now() - 86400000).toDateString(),
              total: state.currentIntake,
              goal: state.dailyGoal,
              records: state.records,
            }
            
            set((state) => ({
              history: [yesterday, ...state.history].slice(0, 30), // Keep 30 days
              currentIntake: 0,
              records: [],
            }))
          }
        }
      },

      getProgress: () => {
        const state = get()
        return Math.min(100, (state.currentIntake / state.dailyGoal) * 100)
      },

      getTodayRecords: () => {
        return get().records
      },

      getWeeklyStats: () => {
        const state = get()
        const stats = []
        
        for (let i = 6; i >= 0; i--) {
          const date = new Date(Date.now() - i * 86400000)
          const dateStr = date.toDateString()
          
          if (i === 0) {
            stats.push({
              date: dateStr,
              total: state.currentIntake,
              goal: state.dailyGoal,
            })
          } else {
            const record = state.history.find((h) => h.date === dateStr)
            stats.push({
              date: dateStr,
              total: record?.total || 0,
              goal: record?.goal || state.dailyGoal,
            })
          }
        }
        
        return stats
      },
}))