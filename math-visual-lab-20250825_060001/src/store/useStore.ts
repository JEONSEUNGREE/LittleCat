import { create } from 'zustand'

export type MathConcept = 'linear' | 'quadratic' | 'trigonometric' | 'exponential'

interface GraphPoint {
  x: number
  y: number
}

interface MathStore {
  selectedConcept: MathConcept
  equation: string
  parameters: {
    a: number
    b: number
    c: number
  }
  graphPoints: GraphPoint[]
  animating: boolean
  setSelectedConcept: (concept: MathConcept) => void
  setParameter: (param: 'a' | 'b' | 'c', value: number) => void
  updateEquation: () => void
  calculatePoints: () => void
  toggleAnimation: () => void
  resetParameters: () => void
}

const useStore = create<MathStore>((set, get) => ({
  selectedConcept: 'linear',
  equation: 'y = x',
  parameters: {
    a: 1,
    b: 0,
    c: 0
  },
  graphPoints: [],
  animating: false,

  setSelectedConcept: (concept) => {
    set({ selectedConcept: concept })
    get().resetParameters()
    get().updateEquation()
    get().calculatePoints()
  },

  setParameter: (param, value) => {
    set((state) => ({
      parameters: {
        ...state.parameters,
        [param]: value
      }
    }))
    get().updateEquation()
    get().calculatePoints()
  },

  updateEquation: () => {
    const { selectedConcept, parameters } = get()
    const { a, b, c } = parameters
    
    let equation = ''
    switch (selectedConcept) {
      case 'linear':
        equation = `y = ${a}x ${b >= 0 ? '+' : ''} ${b}`
        break
      case 'quadratic':
        equation = `y = ${a}x² ${b >= 0 ? '+' : ''} ${b}x ${c >= 0 ? '+' : ''} ${c}`
        break
      case 'trigonometric':
        equation = `y = ${a} × sin(${b}x) ${c >= 0 ? '+' : ''} ${c}`
        break
      case 'exponential':
        equation = `y = ${a} × e^(${b}x) ${c >= 0 ? '+' : ''} ${c}`
        break
    }
    
    set({ equation })
  },

  calculatePoints: () => {
    const { selectedConcept, parameters } = get()
    const { a, b, c } = parameters
    const points: GraphPoint[] = []
    
    for (let x = -10; x <= 10; x += 0.5) {
      let y = 0
      
      switch (selectedConcept) {
        case 'linear':
          y = a * x + b
          break
        case 'quadratic':
          y = a * x * x + b * x + c
          break
        case 'trigonometric':
          y = a * Math.sin(b * x) + c
          break
        case 'exponential':
          y = a * Math.exp(b * x) + c
          break
      }
      
      points.push({ x, y })
    }
    
    set({ graphPoints: points })
  },

  toggleAnimation: () => {
    set((state) => ({ animating: !state.animating }))
  },

  resetParameters: () => {
    const { selectedConcept } = get()
    
    switch (selectedConcept) {
      case 'linear':
        set({ parameters: { a: 1, b: 0, c: 0 } })
        break
      case 'quadratic':
        set({ parameters: { a: 1, b: 0, c: 0 } })
        break
      case 'trigonometric':
        set({ parameters: { a: 1, b: 1, c: 0 } })
        break
      case 'exponential':
        set({ parameters: { a: 1, b: 1, c: 0 } })
        break
    }
  }
}))

export default useStore