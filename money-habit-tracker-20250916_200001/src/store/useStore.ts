import { create } from 'zustand'

export interface Expense {
  id: string
  amount: number
  category: string
  description: string
  date: Date
  isImpulse: boolean
}

export interface DailyHabit {
  date: string
  totalSpent: number
  expenseCount: number
  impulseCount: number
  savingsMet: boolean
}

interface HabitStore {
  expenses: Expense[]
  dailyHabits: Record<string, DailyHabit>
  savingsGoal: number
  categories: string[]
  
  addExpense: (expense: Omit<Expense, 'id'>) => void
  removeExpense: (id: string) => void
  updateSavingsGoal: (goal: number) => void
  getDailyHabit: (date: string) => DailyHabit | undefined
  getWeeklyStats: () => {
    totalSpent: number
    avgDaily: number
    impulseRate: number
  }
  getMonthlyHeatmap: (year: number, month: number) => DailyHabit[]
}

const defaultCategories = ['식비', '교통', '쇼핑', '문화', '카페', '기타']

export const useStore = create<HabitStore>((set, get) => ({
      expenses: [],
      dailyHabits: {},
      savingsGoal: 50000,
      categories: defaultCategories,
      
      addExpense: (expense) => {
        const id = Date.now().toString()
        const newExpense = { ...expense, id }
        const dateStr = expense.date.toISOString().split('T')[0]
        
        set((state) => {
          const updatedExpenses = [...state.expenses, newExpense]
          const dayExpenses = updatedExpenses.filter(
            e => e.date.toISOString().split('T')[0] === dateStr
          )
          
          const dailyHabit: DailyHabit = {
            date: dateStr,
            totalSpent: dayExpenses.reduce((sum, e) => sum + e.amount, 0),
            expenseCount: dayExpenses.length,
            impulseCount: dayExpenses.filter(e => e.isImpulse).length,
            savingsMet: dayExpenses.reduce((sum, e) => sum + e.amount, 0) <= state.savingsGoal
          }
          
          return {
            expenses: updatedExpenses,
            dailyHabits: {
              ...state.dailyHabits,
              [dateStr]: dailyHabit
            }
          }
        })
      },
      
      removeExpense: (id) => {
        set((state) => ({
          expenses: state.expenses.filter(e => e.id !== id)
        }))
      },
      
      updateSavingsGoal: (goal) => {
        set({ savingsGoal: goal })
      },
      
      getDailyHabit: (date) => {
        return get().dailyHabits[date]
      },
      
      getWeeklyStats: () => {
        const expenses = get().expenses
        const weekAgo = new Date()
        weekAgo.setDate(weekAgo.getDate() - 7)
        
        const weekExpenses = expenses.filter(e => e.date >= weekAgo)
        const totalSpent = weekExpenses.reduce((sum, e) => sum + e.amount, 0)
        const impulseCount = weekExpenses.filter(e => e.isImpulse).length
        
        return {
          totalSpent,
          avgDaily: totalSpent / 7,
          impulseRate: weekExpenses.length > 0 ? (impulseCount / weekExpenses.length) * 100 : 0
        }
      },
      
      getMonthlyHeatmap: (year, month) => {
        const habits = get().dailyHabits
        const daysInMonth = new Date(year, month + 1, 0).getDate()
        const monthHabits: DailyHabit[] = []
        
        for (let day = 1; day <= daysInMonth; day++) {
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          const habit = habits[dateStr] || {
            date: dateStr,
            totalSpent: 0,
            expenseCount: 0,
            impulseCount: 0,
            savingsMet: true
          }
          monthHabits.push(habit)
        }
        
        return monthHabits
      }
}))