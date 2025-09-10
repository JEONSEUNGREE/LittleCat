import { create } from 'zustand'

export interface Criterion {
  id: string
  name: string
  weight: number
  description?: string
}

export interface Option {
  id: string
  name: string
  description?: string
}

export interface Score {
  optionId: string
  criterionId: string
  value: number
}

export interface Decision {
  id: string
  title: string
  description?: string
  criteria: Criterion[]
  options: Option[]
  scores: Score[]
  createdAt: Date
  updatedAt: Date
}

interface DecisionStore {
  decisions: Decision[]
  currentDecision: Decision | null
  
  // Decision actions
  createDecision: (title: string, description?: string) => void
  updateDecision: (id: string, updates: Partial<Decision>) => void
  deleteDecision: (id: string) => void
  setCurrentDecision: (id: string) => void
  
  // Criterion actions
  addCriterion: (name: string, weight: number, description?: string) => void
  updateCriterion: (id: string, updates: Partial<Criterion>) => void
  deleteCriterion: (id: string) => void
  
  // Option actions
  addOption: (name: string, description?: string) => void
  updateOption: (id: string, updates: Partial<Option>) => void
  deleteOption: (id: string) => void
  
  // Score actions
  updateScore: (optionId: string, criterionId: string, value: number) => void
  
  // Calculations
  calculateWeightedScore: (optionId: string) => number
  getTopOption: () => { option: Option; score: number } | null
}

const useStore = create<DecisionStore>((set, get) => ({
      decisions: [],
      currentDecision: null,
      
      createDecision: (title, description) => {
        const newDecision: Decision = {
          id: Date.now().toString(),
          title,
          description,
          criteria: [],
          options: [],
          scores: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        
        set((state) => ({
          decisions: [...state.decisions, newDecision],
          currentDecision: newDecision,
        }))
      },
      
      updateDecision: (id, updates) => {
        set((state) => ({
          decisions: state.decisions.map((d) =>
            d.id === id ? { ...d, ...updates, updatedAt: new Date() } : d
          ),
          currentDecision:
            state.currentDecision?.id === id
              ? { ...state.currentDecision, ...updates, updatedAt: new Date() }
              : state.currentDecision,
        }))
      },
      
      deleteDecision: (id) => {
        set((state) => ({
          decisions: state.decisions.filter((d) => d.id !== id),
          currentDecision:
            state.currentDecision?.id === id ? null : state.currentDecision,
        }))
      },
      
      setCurrentDecision: (id) => {
        const decision = get().decisions.find((d) => d.id === id)
        set({ currentDecision: decision || null })
      },
      
      addCriterion: (name, weight, description) => {
        const { currentDecision } = get()
        if (!currentDecision) return
        
        const newCriterion: Criterion = {
          id: Date.now().toString(),
          name,
          weight,
          description,
        }
        
        const updatedDecision = {
          ...currentDecision,
          criteria: [...currentDecision.criteria, newCriterion],
          updatedAt: new Date(),
        }
        
        set((state) => ({
          currentDecision: updatedDecision,
          decisions: state.decisions.map((d) =>
            d.id === currentDecision.id ? updatedDecision : d
          ),
        }))
      },
      
      updateCriterion: (id, updates) => {
        const { currentDecision } = get()
        if (!currentDecision) return
        
        const updatedDecision = {
          ...currentDecision,
          criteria: currentDecision.criteria.map((c) =>
            c.id === id ? { ...c, ...updates } : c
          ),
          updatedAt: new Date(),
        }
        
        set((state) => ({
          currentDecision: updatedDecision,
          decisions: state.decisions.map((d) =>
            d.id === currentDecision.id ? updatedDecision : d
          ),
        }))
      },
      
      deleteCriterion: (id) => {
        const { currentDecision } = get()
        if (!currentDecision) return
        
        const updatedDecision = {
          ...currentDecision,
          criteria: currentDecision.criteria.filter((c) => c.id !== id),
          scores: currentDecision.scores.filter((s) => s.criterionId !== id),
          updatedAt: new Date(),
        }
        
        set((state) => ({
          currentDecision: updatedDecision,
          decisions: state.decisions.map((d) =>
            d.id === currentDecision.id ? updatedDecision : d
          ),
        }))
      },
      
      addOption: (name, description) => {
        const { currentDecision } = get()
        if (!currentDecision) return
        
        const newOption: Option = {
          id: Date.now().toString(),
          name,
          description,
        }
        
        const updatedDecision = {
          ...currentDecision,
          options: [...currentDecision.options, newOption],
          updatedAt: new Date(),
        }
        
        set((state) => ({
          currentDecision: updatedDecision,
          decisions: state.decisions.map((d) =>
            d.id === currentDecision.id ? updatedDecision : d
          ),
        }))
      },
      
      updateOption: (id, updates) => {
        const { currentDecision } = get()
        if (!currentDecision) return
        
        const updatedDecision = {
          ...currentDecision,
          options: currentDecision.options.map((o) =>
            o.id === id ? { ...o, ...updates } : o
          ),
          updatedAt: new Date(),
        }
        
        set((state) => ({
          currentDecision: updatedDecision,
          decisions: state.decisions.map((d) =>
            d.id === currentDecision.id ? updatedDecision : d
          ),
        }))
      },
      
      deleteOption: (id) => {
        const { currentDecision } = get()
        if (!currentDecision) return
        
        const updatedDecision = {
          ...currentDecision,
          options: currentDecision.options.filter((o) => o.id !== id),
          scores: currentDecision.scores.filter((s) => s.optionId !== id),
          updatedAt: new Date(),
        }
        
        set((state) => ({
          currentDecision: updatedDecision,
          decisions: state.decisions.map((d) =>
            d.id === currentDecision.id ? updatedDecision : d
          ),
        }))
      },
      
      updateScore: (optionId, criterionId, value) => {
        const { currentDecision } = get()
        if (!currentDecision) return
        
        const existingScoreIndex = currentDecision.scores.findIndex(
          (s) => s.optionId === optionId && s.criterionId === criterionId
        )
        
        let updatedScores: Score[]
        
        if (existingScoreIndex >= 0) {
          updatedScores = [...currentDecision.scores]
          updatedScores[existingScoreIndex] = { optionId, criterionId, value }
        } else {
          updatedScores = [
            ...currentDecision.scores,
            { optionId, criterionId, value },
          ]
        }
        
        const updatedDecision = {
          ...currentDecision,
          scores: updatedScores,
          updatedAt: new Date(),
        }
        
        set((state) => ({
          currentDecision: updatedDecision,
          decisions: state.decisions.map((d) =>
            d.id === currentDecision.id ? updatedDecision : d
          ),
        }))
      },
      
      calculateWeightedScore: (optionId) => {
        const { currentDecision } = get()
        if (!currentDecision) return 0
        
        const optionScores = currentDecision.scores.filter(
          (s) => s.optionId === optionId
        )
        
        let totalWeightedScore = 0
        let totalWeight = 0
        
        currentDecision.criteria.forEach((criterion) => {
          const score = optionScores.find((s) => s.criterionId === criterion.id)
          if (score) {
            totalWeightedScore += score.value * criterion.weight
            totalWeight += criterion.weight
          }
        })
        
        return totalWeight > 0 ? totalWeightedScore / totalWeight : 0
      },
      
      getTopOption: () => {
        const { currentDecision, calculateWeightedScore } = get()
        if (!currentDecision || currentDecision.options.length === 0) return null
        
        let topOption = currentDecision.options[0]
        let topScore = calculateWeightedScore(topOption.id)
        
        currentDecision.options.forEach((option) => {
          const score = calculateWeightedScore(option.id)
          if (score > topScore) {
            topOption = option
            topScore = score
          }
        })
        
        return { option: topOption, score: topScore }
      },
    }))

export default useStore