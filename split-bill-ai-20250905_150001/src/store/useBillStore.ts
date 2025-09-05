import { create } from 'zustand'

export interface Person {
  id: string
  name: string
  color: string
}

export interface BillItem {
  id: string
  name: string
  price: number
  quantity: number
  assignedTo: string[]
}

export interface Bill {
  id: string
  title: string
  totalAmount: number
  tax: number
  tip: number
  date: string
  people: Person[]
  items: BillItem[]
  settled: boolean
}

interface BillStore {
  bills: Bill[]
  currentBill: Bill | null
  addBill: (bill: Bill) => void
  updateBill: (id: string, bill: Partial<Bill>) => void
  deleteBill: (id: string) => void
  setCurrentBill: (bill: Bill | null) => void
  addPerson: (person: Person) => void
  removePerson: (personId: string) => void
  addItem: (item: BillItem) => void
  updateItem: (itemId: string, item: Partial<BillItem>) => void
  removeItem: (itemId: string) => void
  assignItemToPerson: (itemId: string, personId: string) => void
  unassignItemFromPerson: (itemId: string, personId: string) => void
  calculateSplit: () => Record<string, number>
}

const colors = [
  '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16',
  '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9',
  '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef',
  '#ec4899', '#f43f5e'
]

export const useBillStore = create<BillStore>((set, get) => ({
  bills: [],
  currentBill: null,
  
  addBill: (bill) => set((state) => ({
    bills: [...state.bills, bill]
  })),
  
  updateBill: (id, billUpdate) => set((state) => ({
    bills: state.bills.map(bill => 
      bill.id === id ? { ...bill, ...billUpdate } : bill
    )
  })),
  
  deleteBill: (id) => set((state) => ({
    bills: state.bills.filter(bill => bill.id !== id)
  })),
  
  setCurrentBill: (bill) => set({ currentBill: bill }),
  
  addPerson: (person) => set((state) => {
    if (!state.currentBill) return state
    return {
      currentBill: {
        ...state.currentBill,
        people: [...state.currentBill.people, person]
      }
    }
  }),
  
  removePerson: (personId) => set((state) => {
    if (!state.currentBill) return state
    return {
      currentBill: {
        ...state.currentBill,
        people: state.currentBill.people.filter(p => p.id !== personId),
        items: state.currentBill.items.map(item => ({
          ...item,
          assignedTo: item.assignedTo.filter(id => id !== personId)
        }))
      }
    }
  }),
  
  addItem: (item) => set((state) => {
    if (!state.currentBill) return state
    return {
      currentBill: {
        ...state.currentBill,
        items: [...state.currentBill.items, item]
      }
    }
  }),
  
  updateItem: (itemId, itemUpdate) => set((state) => {
    if (!state.currentBill) return state
    return {
      currentBill: {
        ...state.currentBill,
        items: state.currentBill.items.map(item =>
          item.id === itemId ? { ...item, ...itemUpdate } : item
        )
      }
    }
  }),
  
  removeItem: (itemId) => set((state) => {
    if (!state.currentBill) return state
    return {
      currentBill: {
        ...state.currentBill,
        items: state.currentBill.items.filter(item => item.id !== itemId)
      }
    }
  }),
  
  assignItemToPerson: (itemId, personId) => set((state) => {
    if (!state.currentBill) return state
    return {
      currentBill: {
        ...state.currentBill,
        items: state.currentBill.items.map(item => {
          if (item.id === itemId && !item.assignedTo.includes(personId)) {
            return { ...item, assignedTo: [...item.assignedTo, personId] }
          }
          return item
        })
      }
    }
  }),
  
  unassignItemFromPerson: (itemId, personId) => set((state) => {
    if (!state.currentBill) return state
    return {
      currentBill: {
        ...state.currentBill,
        items: state.currentBill.items.map(item => {
          if (item.id === itemId) {
            return { 
              ...item, 
              assignedTo: item.assignedTo.filter(id => id !== personId) 
            }
          }
          return item
        })
      }
    }
  }),
  
  calculateSplit: () => {
    const { currentBill } = get()
    if (!currentBill) return {}
    
    const splits: Record<string, number> = {}
    const subtotal = currentBill.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const taxRate = currentBill.tax / subtotal
    const tipRate = currentBill.tip / subtotal
    
    currentBill.people.forEach(person => {
      splits[person.id] = 0
    })
    
    currentBill.items.forEach(item => {
      if (item.assignedTo.length > 0) {
        const itemTotal = item.price * item.quantity
        const itemTax = itemTotal * taxRate
        const itemTip = itemTotal * tipRate
        const totalPerPerson = (itemTotal + itemTax + itemTip) / item.assignedTo.length
        
        item.assignedTo.forEach(personId => {
          if (splits[personId] !== undefined) {
            splits[personId] += totalPerPerson
          }
        })
      }
    })
    
    return splits
  }
}))