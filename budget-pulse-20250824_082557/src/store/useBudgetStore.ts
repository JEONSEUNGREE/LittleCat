import { create } from 'zustand'

export interface Transaction {
  id: string
  amount: number
  category: string
  description: string
  timestamp: Date
  type: 'income' | 'expense'
}

export interface BudgetHealth {
  pulse: number // 60-180 BPM metaphor
  status: 'excellent' | 'good' | 'warning' | 'critical'
  trend: 'improving' | 'stable' | 'declining'
}

interface BudgetStore {
  monthlyBudget: number
  currentSpent: number
  transactions: Transaction[]
  health: BudgetHealth
  
  setMonthlyBudget: (amount: number) => void
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void
  removeTransaction: (id: string) => void
  calculateHealth: () => void
}

export const useBudgetStore = create<BudgetStore>((set, get) => ({
  monthlyBudget: 3000,
  currentSpent: 0,
  transactions: [],
  health: {
    pulse: 80,
    status: 'excellent',
    trend: 'stable'
  },

  setMonthlyBudget: (amount) => {
    set({ monthlyBudget: amount })
    get().calculateHealth()
  },

  addTransaction: (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString()
    }
    
    set((state) => ({
      transactions: [newTransaction, ...state.transactions],
      currentSpent: transaction.type === 'expense' 
        ? state.currentSpent + transaction.amount
        : state.currentSpent - transaction.amount
    }))
    
    get().calculateHealth()
  },

  removeTransaction: (id) => {
    set((state) => {
      const transaction = state.transactions.find(t => t.id === id)
      if (!transaction) return state
      
      return {
        transactions: state.transactions.filter(t => t.id !== id),
        currentSpent: transaction.type === 'expense'
          ? state.currentSpent - transaction.amount
          : state.currentSpent + transaction.amount
      }
    })
    
    get().calculateHealth()
  },

  calculateHealth: () => {
    const { monthlyBudget, currentSpent, transactions } = get()
    const spentPercentage = (currentSpent / monthlyBudget) * 100
    
    let pulse = 80
    let status: BudgetHealth['status'] = 'excellent'
    let trend: BudgetHealth['trend'] = 'stable'
    
    // Calculate pulse based on spending rate
    if (spentPercentage < 50) {
      pulse = 60 + (spentPercentage * 0.4)
      status = 'excellent'
    } else if (spentPercentage < 75) {
      pulse = 80 + ((spentPercentage - 50) * 1.2)
      status = 'good'
    } else if (spentPercentage < 100) {
      pulse = 110 + ((spentPercentage - 75) * 2)
      status = 'warning'
    } else {
      pulse = 160 + Math.min((spentPercentage - 100) * 0.2, 20)
      status = 'critical'
    }
    
    // Calculate trend based on recent transactions
    const recentTransactions = transactions.slice(0, 5)
    const recentExpenses = recentTransactions.filter(t => t.type === 'expense')
    
    if (recentExpenses.length >= 3) {
      const avgRecent = recentExpenses.slice(0, 3).reduce((sum, t) => sum + t.amount, 0) / 3
      const dailyBudget = monthlyBudget / 30
      
      if (avgRecent > dailyBudget * 1.5) {
        trend = 'declining'
      } else if (avgRecent < dailyBudget * 0.7) {
        trend = 'improving'
      }
    }
    
    set({ health: { pulse, status, trend } })
  }
}))