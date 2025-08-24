import { create } from 'zustand'

export interface Person {
  id: string
  name: string
  amount: number
  isPaid: boolean
}

export interface BillState {
  totalAmount: number
  tipPercentage: number
  people: Person[]
  splitMethod: 'equal' | 'custom'
  
  setTotalAmount: (amount: number) => void
  setTipPercentage: (percentage: number) => void
  addPerson: (name: string) => void
  removePerson: (id: string) => void
  updatePersonAmount: (id: string, amount: number) => void
  togglePersonPaid: (id: string) => void
  setSplitMethod: (method: 'equal' | 'custom') => void
  calculateSplit: () => void
  reset: () => void
}

const useBillStore = create<BillState>((set, get) => ({
  totalAmount: 0,
  tipPercentage: 15,
  people: [],
  splitMethod: 'equal',
  
  setTotalAmount: (amount) => {
    set({ totalAmount: amount })
    get().calculateSplit()
  },
  
  setTipPercentage: (percentage) => {
    set({ tipPercentage: percentage })
    get().calculateSplit()
  },
  
  addPerson: (name) => {
    const newPerson: Person = {
      id: Date.now().toString(),
      name: name.trim() || `Person ${get().people.length + 1}`,
      amount: 0,
      isPaid: false,
    }
    set((state) => ({ people: [...state.people, newPerson] }))
    get().calculateSplit()
  },
  
  removePerson: (id) => {
    set((state) => ({ people: state.people.filter(p => p.id !== id) }))
    get().calculateSplit()
  },
  
  updatePersonAmount: (id, amount) => {
    set((state) => ({
      people: state.people.map(p => p.id === id ? { ...p, amount } : p)
    }))
  },
  
  togglePersonPaid: (id) => {
    set((state) => ({
      people: state.people.map(p => p.id === id ? { ...p, isPaid: !p.isPaid } : p)
    }))
  },
  
  setSplitMethod: (method) => {
    set({ splitMethod: method })
    get().calculateSplit()
  },
  
  calculateSplit: () => {
    const { totalAmount, tipPercentage, people, splitMethod } = get()
    if (people.length === 0 || totalAmount === 0) return
    
    const totalWithTip = totalAmount * (1 + tipPercentage / 100)
    
    if (splitMethod === 'equal') {
      const amountPerPerson = totalWithTip / people.length
      set((state) => ({
        people: state.people.map(p => ({ ...p, amount: amountPerPerson }))
      }))
    }
  },
  
  reset: () => {
    set({
      totalAmount: 0,
      tipPercentage: 15,
      people: [],
      splitMethod: 'equal',
    })
  },
}))

export default useBillStore