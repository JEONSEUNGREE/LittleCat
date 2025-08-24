import { create } from 'zustand'

export interface Participant {
  id: string
  name: string
  amount: number
  paid?: number
}

export interface Bill {
  id: string
  title: string
  totalAmount: number
  participants: Participant[]
  createdAt: Date
  splitType: 'equal' | 'custom' | 'percentage'
}

interface BillStore {
  bills: Bill[]
  currentBill: Bill | null
  addBill: (bill: Bill) => void
  updateBill: (id: string, bill: Partial<Bill>) => void
  deleteBill: (id: string) => void
  setCurrentBill: (bill: Bill | null) => void
  calculateSplit: (billId: string) => void
  getBalance: (billId: string) => { from: string; to: string; amount: number }[]
}

const useBillStore = create<BillStore>((set, get) => ({
  bills: [],
  currentBill: null,

  addBill: (bill) => {
    set((state) => ({
      bills: [...state.bills, bill],
    }))
  },

  updateBill: (id, updatedBill) => {
    set((state) => ({
      bills: state.bills.map((bill) =>
        bill.id === id ? { ...bill, ...updatedBill } : bill
      ),
    }))
  },

  deleteBill: (id) => {
    set((state) => ({
      bills: state.bills.filter((bill) => bill.id !== id),
    }))
  },

  setCurrentBill: (bill) => {
    set({ currentBill: bill })
  },

  calculateSplit: (billId) => {
    const bill = get().bills.find((b) => b.id === billId)
    if (!bill) return

    if (bill.splitType === 'equal') {
      const splitAmount = bill.totalAmount / bill.participants.length
      const updatedParticipants = bill.participants.map((p) => ({
        ...p,
        amount: splitAmount,
      }))
      
      get().updateBill(billId, { participants: updatedParticipants })
    }
  },

  getBalance: (billId) => {
    const bill = get().bills.find((b) => b.id === billId)
    if (!bill) return []

    const balances: { from: string; to: string; amount: number }[] = []
    const participants = [...bill.participants]
    
    // Calculate who owes what
    const debtors = participants.filter(p => (p.paid || 0) < p.amount)
    const creditors = participants.filter(p => (p.paid || 0) > p.amount)

    debtors.forEach(debtor => {
      let owes = debtor.amount - (debtor.paid || 0)
      
      creditors.forEach(creditor => {
        if (owes <= 0) return
        
        const credit = (creditor.paid || 0) - creditor.amount
        if (credit <= 0) return
        
        const payment = Math.min(owes, credit)
        if (payment > 0) {
          balances.push({
            from: debtor.name,
            to: creditor.name,
            amount: payment
          })
          owes -= payment
        }
      })
    })

    return balances
  }
}))

export default useBillStore