import { create } from 'zustand'

export interface Formula {
  id: string
  expression: string
  color: string
  visible: boolean
  name: string
}

interface FormulaStore {
  formulas: Formula[]
  activeFormulaId: string | null
  graphRange: {
    xMin: number
    xMax: number
    yMin: number
    yMax: number
  }
  addFormula: (expression: string) => void
  updateFormula: (id: string, expression: string) => void
  removeFormula: (id: string) => void
  toggleFormulaVisibility: (id: string) => void
  setActiveFormula: (id: string | null) => void
  updateGraphRange: (range: Partial<FormulaStore['graphRange']>) => void
  clearAll: () => void
}

const COLORS = [
  '#0ea5e9', // sky-500
  '#8b5cf6', // violet-500
  '#10b981', // emerald-500
  '#f59e0b', // amber-500
  '#ef4444', // red-500
  '#ec4899', // pink-500
  '#6366f1', // indigo-500
  '#14b8a6', // teal-500
]

const useFormulaStore = create<FormulaStore>((set, get) => ({
  formulas: [
    {
      id: '1',
      expression: 'x^2',
      color: COLORS[0],
      visible: true,
      name: 'y = x²'
    }
  ],
  activeFormulaId: '1',
  graphRange: {
    xMin: -10,
    xMax: 10,
    yMin: -10,
    yMax: 10
  },
  
  addFormula: (expression) => {
    const { formulas } = get()
    const newFormula: Formula = {
      id: Date.now().toString(),
      expression,
      color: COLORS[formulas.length % COLORS.length],
      visible: true,
      name: `y = ${expression}`
    }
    set({ 
      formulas: [...formulas, newFormula],
      activeFormulaId: newFormula.id
    })
  },
  
  updateFormula: (id, expression) => {
    set((state) => ({
      formulas: state.formulas.map(f => 
        f.id === id ? { ...f, expression, name: `y = ${expression}` } : f
      )
    }))
  },
  
  removeFormula: (id) => {
    set((state) => {
      const newFormulas = state.formulas.filter(f => f.id !== id)
      const newActiveId = state.activeFormulaId === id 
        ? (newFormulas.length > 0 ? newFormulas[0].id : null)
        : state.activeFormulaId
      return {
        formulas: newFormulas,
        activeFormulaId: newActiveId
      }
    })
  },
  
  toggleFormulaVisibility: (id) => {
    set((state) => ({
      formulas: state.formulas.map(f => 
        f.id === id ? { ...f, visible: !f.visible } : f
      )
    }))
  },
  
  setActiveFormula: (id) => {
    set({ activeFormulaId: id })
  },
  
  updateGraphRange: (range) => {
    set((state) => ({
      graphRange: { ...state.graphRange, ...range }
    }))
  },
  
  clearAll: () => {
    set({
      formulas: [],
      activeFormulaId: null
    })
  }
}))

export default useFormulaStore