import { create } from 'zustand'

export interface Person {
  id: string
  name: string
  items: BillItem[]
  totalAmount: number
}

export interface BillItem {
  id: string
  name: string
  price: number
  quantity: number
  sharedBy: string[]
}

interface BillState {
  people: Person[]
  items: BillItem[]
  totalBill: number
  taxPercent: number
  tipPercent: number
  currency: string
  addPerson: (name: string) => void
  removePerson: (id: string) => void
  addItem: (item: Omit<BillItem, 'id'>) => void
  removeItem: (id: string) => void
  updateItem: (id: string, item: Partial<BillItem>) => void
  setTaxPercent: (percent: number) => void
  setTipPercent: (percent: number) => void
  setCurrency: (currency: string) => void
  calculateSplit: () => void
  reset: () => void
}

const useBillStore = create<BillState>((set, get) => ({
  people: [],
  items: [],
  totalBill: 0,
  taxPercent: 10,
  tipPercent: 15,
  currency: 'KRW',

  addPerson: (name) => {
    const id = Date.now().toString()
    set((state) => ({
      people: [...state.people, { id, name, items: [], totalAmount: 0 }]
    }))
  },

  removePerson: (id) => {
    set((state) => ({
      people: state.people.filter((p) => p.id !== id),
      items: state.items.map((item) => ({
        ...item,
        sharedBy: item.sharedBy.filter((pid) => pid !== id)
      }))
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
      items: state.items.filter((item) => item.id !== id)
    }))
  },

  updateItem: (id, updatedItem) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, ...updatedItem } : item
      )
    }))
  },

  setTaxPercent: (percent) => set({ taxPercent: percent }),
  setTipPercent: (percent) => set({ tipPercent: percent }),
  setCurrency: (currency) => set({ currency }),

  calculateSplit: () => {
    const { items, people, taxPercent, tipPercent } = get()
    
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const tax = subtotal * (taxPercent / 100)
    const tip = subtotal * (tipPercent / 100)
    const total = subtotal + tax + tip
    
    const updatedPeople = people.map((person) => {
      let personTotal = 0
      
      items.forEach((item) => {
        if (item.sharedBy.includes(person.id)) {
          const itemTotal = item.price * item.quantity
          const share = itemTotal / item.sharedBy.length
          const shareWithExtras = share * (1 + (taxPercent + tipPercent) / 100)
          personTotal += shareWithExtras
        }
      })
      
      return { ...person, totalAmount: personTotal }
    })
    
    set({ people: updatedPeople, totalBill: total })
  },

  reset: () => {
    set({
      people: [],
      items: [],
      totalBill: 0,
      taxPercent: 10,
      tipPercent: 15,
      currency: 'KRW'
    })
  }
}))

export default useBillStore