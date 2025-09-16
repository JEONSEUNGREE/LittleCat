import { create } from 'zustand'

export interface Person {
  id: string
  name: string
  amount: number
  isPaid: boolean
}

export interface BillItem {
  id: string
  name: string
  price: number
  quantity: number
  sharedBy: string[]
}

interface BillState {
  totalAmount: number
  tipPercent: number
  taxPercent: number
  people: Person[]
  items: BillItem[]
  splitMethod: 'equal' | 'custom' | 'items'
  
  // Actions
  setTotalAmount: (amount: number) => void
  setTipPercent: (percent: number) => void
  setTaxPercent: (percent: number) => void
  addPerson: (name: string) => void
  removePerson: (id: string) => void
  updatePersonAmount: (id: string, amount: number) => void
  togglePersonPaid: (id: string) => void
  addItem: (item: Omit<BillItem, 'id'>) => void
  removeItem: (id: string) => void
  updateItem: (id: string, updates: Partial<BillItem>) => void
  setSplitMethod: (method: 'equal' | 'custom' | 'items') => void
  calculateSplit: () => void
  reset: () => void
}

export const useBillStore = create<BillState>((set, get) => ({
  totalAmount: 0,
  tipPercent: 15,
  taxPercent: 10,
  people: [],
  items: [],
  splitMethod: 'equal',
  
  setTotalAmount: (amount) => set({ totalAmount: amount }),
  setTipPercent: (percent) => set({ tipPercent: percent }),
  setTaxPercent: (percent) => set({ taxPercent: percent }),
  
  addPerson: (name) => {
    const id = Date.now().toString()
    set((state) => ({
      people: [...state.people, { id, name, amount: 0, isPaid: false }]
    }))
  },
  
  removePerson: (id) => {
    set((state) => ({
      people: state.people.filter(p => p.id !== id),
      items: state.items.map(item => ({
        ...item,
        sharedBy: item.sharedBy.filter(personId => personId !== id)
      }))
    }))
  },
  
  updatePersonAmount: (id, amount) => {
    set((state) => ({
      people: state.people.map(p => 
        p.id === id ? { ...p, amount } : p
      )
    }))
  },
  
  togglePersonPaid: (id) => {
    set((state) => ({
      people: state.people.map(p => 
        p.id === id ? { ...p, isPaid: !p.isPaid } : p
      )
    }))
  },
  
  addItem: (item) => {
    const id = Date.now().toString()
    set((state) => ({
      items: [...state.items, { ...item, id }]
    }))
  },
  
  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter(item => item.id !== id)
    }))
  },
  
  updateItem: (id, updates) => {
    set((state) => ({
      items: state.items.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    }))
  },
  
  setSplitMethod: (method) => {
    set({ splitMethod: method })
    get().calculateSplit()
  },
  
  calculateSplit: () => {
    const state = get()
    const { totalAmount, tipPercent, taxPercent, people, splitMethod, items } = state
    
    if (people.length === 0) return
    
    const tipAmount = totalAmount * (tipPercent / 100)
    const taxAmount = totalAmount * (taxPercent / 100)
    const grandTotal = totalAmount + tipAmount + taxAmount
    
    if (splitMethod === 'equal') {
      const perPerson = grandTotal / people.length
      set({
        people: people.map(p => ({ ...p, amount: perPerson }))
      })
    } else if (splitMethod === 'items') {
      const personTotals: { [key: string]: number } = {}
      
      people.forEach(p => {
        personTotals[p.id] = 0
      })
      
      items.forEach(item => {
        if (item.sharedBy.length > 0) {
          const itemTotal = item.price * item.quantity
          const perPerson = itemTotal / item.sharedBy.length
          item.sharedBy.forEach(personId => {
            if (personTotals[personId] !== undefined) {
              personTotals[personId] += perPerson
            }
          })
        }
      })
      
      const subtotal = Object.values(personTotals).reduce((sum, val) => sum + val, 0)
      const multiplier = subtotal > 0 ? (1 + (tipPercent + taxPercent) / 100) : 0
      
      set({
        people: people.map(p => ({
          ...p,
          amount: (personTotals[p.id] || 0) * multiplier
        }))
      })
    }
  },
  
  reset: () => {
    set({
      totalAmount: 0,
      tipPercent: 15,
      taxPercent: 10,
      people: [],
      items: [],
      splitMethod: 'equal'
    })
  }
}))