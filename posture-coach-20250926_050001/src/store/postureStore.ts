import { create } from 'zustand'

interface PostureRecord {
  id: string
  timestamp: Date
  score: number
  issues: string[]
  recommendations: string[]
}

interface Exercise {
  id: string
  name: string
  duration: number
  completed: boolean
  category: 'neck' | 'back' | 'shoulders' | 'core'
}

interface PostureStore {
  activeView: 'analyze' | 'exercise' | 'progress'
  setActiveView: (view: 'analyze' | 'exercise' | 'progress') => void
  
  currentScore: number
  setCurrentScore: (score: number) => void
  
  streak: number
  incrementStreak: () => void
  resetStreak: () => void
  
  records: PostureRecord[]
  addRecord: (record: Omit<PostureRecord, 'id'>) => void
  
  exercises: Exercise[]
  completeExercise: (id: string) => void
  resetExercises: () => void
  
  isMonitoring: boolean
  setIsMonitoring: (monitoring: boolean) => void
}

const defaultExercises: Exercise[] = [
  { id: '1', name: 'Neck Stretch', duration: 30, completed: false, category: 'neck' },
  { id: '2', name: 'Shoulder Rolls', duration: 45, completed: false, category: 'shoulders' },
  { id: '3', name: 'Back Extension', duration: 60, completed: false, category: 'back' },
  { id: '4', name: 'Core Activation', duration: 90, completed: false, category: 'core' },
  { id: '5', name: 'Chin Tucks', duration: 30, completed: false, category: 'neck' },
  { id: '6', name: 'Wall Angels', duration: 60, completed: false, category: 'shoulders' },
]

export const usePostureStore = create<PostureStore>((set) => ({
  activeView: 'analyze',
  setActiveView: (view) => set({ activeView: view }),
  
  currentScore: 85,
  setCurrentScore: (score) => set({ currentScore: score }),
  
  streak: 7,
  incrementStreak: () => set((state) => ({ streak: state.streak + 1 })),
  resetStreak: () => set({ streak: 0 }),
  
  records: [],
  addRecord: (record) => set((state) => ({
    records: [...state.records, { ...record, id: Date.now().toString() }]
  })),
  
  exercises: defaultExercises,
  completeExercise: (id) => set((state) => ({
    exercises: state.exercises.map(ex => 
      ex.id === id ? { ...ex, completed: true } : ex
    )
  })),
  resetExercises: () => set({ exercises: defaultExercises }),
  
  isMonitoring: false,
  setIsMonitoring: (monitoring) => set({ isMonitoring: monitoring }),
}))