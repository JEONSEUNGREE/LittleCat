import { create } from 'zustand'

export type FormulaCategory = 'math' | 'physics' | 'chemistry'

export interface Formula {
  id: string
  name: string
  expression: string
  description: string
  category: FormulaCategory
  parameters: Parameter[]
  graphType: 'linear' | 'quadratic' | 'trigonometric' | 'exponential'
}

export interface Parameter {
  symbol: string
  name: string
  value: number
  min: number
  max: number
  step: number
}

interface FormulaStore {
  selectedFormula: Formula | null
  parameters: Record<string, number>
  history: Formula[]
  setSelectedFormula: (formula: Formula) => void
  updateParameter: (symbol: string, value: number) => void
  addToHistory: (formula: Formula) => void
  clearHistory: () => void
}

export const useFormulaStore = create<FormulaStore>((set) => ({
  selectedFormula: null,
  parameters: {},
  history: [],
  
  setSelectedFormula: (formula) => {
    const initialParams: Record<string, number> = {}
    formula.parameters.forEach(param => {
      initialParams[param.symbol] = param.value
    })
    set({ 
      selectedFormula: formula, 
      parameters: initialParams 
    })
  },
  
  updateParameter: (symbol, value) => 
    set((state) => ({
      parameters: { ...state.parameters, [symbol]: value }
    })),
    
  addToHistory: (formula) =>
    set((state) => ({
      history: [formula, ...state.history.filter(f => f.id !== formula.id)].slice(0, 10)
    })),
    
  clearHistory: () => set({ history: [] })
}))