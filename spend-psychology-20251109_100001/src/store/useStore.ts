import { create } from 'zustand'

export type Emotion = 'happy' | 'neutral' | 'sad' | 'angry' | 'stressed'

export interface Transaction {
  id: string
  amount: number
  category: string
  emotion: Emotion
  description: string
  timestamp: number
}

interface StoreState {
  transactions: Transaction[]
  addTransaction: (transaction: Omit<Transaction, 'id' | 'timestamp'>) => void
  deleteTransaction: (id: string) => void
  getEmotionTotal: (emotion: Emotion) => number
  getCategoryTotal: (category: string) => number
}

export const useStore = create<StoreState>((set, get) => ({
  transactions: [],

  addTransaction: (transaction) => set((state) => ({
    transactions: [
      ...state.transactions,
      {
        ...transaction,
        id: Date.now().toString(),
        timestamp: Date.now(),
      },
    ],
  })),

  deleteTransaction: (id) => set((state) => ({
    transactions: state.transactions.filter((t) => t.id !== id),
  })),

  getEmotionTotal: (emotion) => {
    const state = get()
    return state.transactions
      .filter((t) => t.emotion === emotion)
      .reduce((sum, t) => sum + t.amount, 0)
  },

  getCategoryTotal: (category) => {
    const state = get()
    return state.transactions
      .filter((t) => t.category === category)
      .reduce((sum, t) => sum + t.amount, 0)
  },
}))
