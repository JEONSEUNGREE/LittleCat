import { create } from 'zustand'

interface TipCalculation {
  id: string
  billAmount: number
  tipPercentage: number
  tipAmount: number
  totalAmount: number
  splitCount: number
  perPersonAmount: number
  serviceQuality: string
  country: string
  createdAt: Date
}

interface TipStore {
  currentBill: number
  tipPercentage: number
  splitCount: number
  serviceQuality: string
  selectedCountry: string
  history: TipCalculation[]
  
  setBillAmount: (amount: number) => void
  setTipPercentage: (percentage: number) => void
  setSplitCount: (count: number) => void
  setServiceQuality: (quality: string) => void
  setCountry: (country: string) => void
  calculateTip: () => void
  clearHistory: () => void
}

const countryTipDefaults: Record<string, number> = {
  'USA': 20,
  'Canada': 18,
  'UK': 12,
  'Japan': 0,
  'Korea': 0,
  'France': 10,
  'Germany': 10,
  'Italy': 10,
  'Australia': 10,
  'China': 0,
}

const serviceQualityMultipliers: Record<string, number> = {
  'Poor': 0.5,
  'Fair': 0.75,
  'Good': 1,
  'Excellent': 1.25,
  'Outstanding': 1.5,
}

export const useTipStore = create<TipStore>((set, get) => ({
  currentBill: 0,
  tipPercentage: 15,
  splitCount: 1,
  serviceQuality: 'Good',
  selectedCountry: 'USA',
  history: [],
  
  setBillAmount: (amount) => set({ currentBill: amount }),
  
  setTipPercentage: (percentage) => set({ tipPercentage: percentage }),
  
  setSplitCount: (count) => set({ splitCount: Math.max(1, count) }),
  
  setServiceQuality: (quality) => {
    const { selectedCountry } = get()
    const basePercentage = countryTipDefaults[selectedCountry] || 15
    const multiplier = serviceQualityMultipliers[quality] || 1
    set({ 
      serviceQuality: quality,
      tipPercentage: Math.round(basePercentage * multiplier)
    })
  },
  
  setCountry: (country) => {
    const basePercentage = countryTipDefaults[country] || 15
    set({ 
      selectedCountry: country,
      tipPercentage: basePercentage
    })
  },
  
  calculateTip: () => {
    const { currentBill, tipPercentage, splitCount, serviceQuality, selectedCountry } = get()
    
    if (currentBill <= 0) return
    
    const tipAmount = (currentBill * tipPercentage) / 100
    const totalAmount = currentBill + tipAmount
    const perPersonAmount = totalAmount / splitCount
    
    const calculation: TipCalculation = {
      id: Date.now().toString(),
      billAmount: currentBill,
      tipPercentage,
      tipAmount,
      totalAmount,
      splitCount,
      perPersonAmount,
      serviceQuality,
      country: selectedCountry,
      createdAt: new Date()
    }
    
    set((state) => ({
      history: [calculation, ...state.history].slice(0, 10)
    }))
  },
  
  clearHistory: () => set({ history: [] })
}))