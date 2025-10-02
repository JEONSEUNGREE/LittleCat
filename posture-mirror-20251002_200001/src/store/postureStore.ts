import { create } from 'zustand'

interface PosturePoint {
  x: number
  y: number
  confidence: number
}

interface PostureData {
  score: number
  neck: number
  shoulder: number
  spine: number
  timestamp: Date
}

interface Exercise {
  id: string
  name: string
  duration: number
  category: 'neck' | 'shoulder' | 'back' | 'core'
  completed: boolean
}

interface PostureStore {
  currentPosture: PostureData
  dailyHistory: PostureData[]
  weeklyStats: {
    average: number
    improvement: number
    totalTime: number
  }
  exercises: Exercise[]
  updatePosture: (data: Partial<PostureData>) => void
  updateScore: (score: number) => void
  completeExercise: (id: string) => void
  resetDaily: () => void
  addToHistory: (data: PostureData) => void
}

const defaultExercises: Exercise[] = [
  { id: '1', name: '목 스트레칭', duration: 30, category: 'neck', completed: false },
  { id: '2', name: '어깨 돌리기', duration: 45, category: 'shoulder', completed: false },
  { id: '3', name: '등 펴기', duration: 60, category: 'back', completed: false },
  { id: '4', name: '코어 강화', duration: 90, category: 'core', completed: false },
  { id: '5', name: '거북목 교정', duration: 45, category: 'neck', completed: false },
  { id: '6', name: '견갑골 운동', duration: 60, category: 'shoulder', completed: false },
]

export const usePostureStore = create<PostureStore>((set) => ({
  currentPosture: {
    score: 75,
    neck: 80,
    shoulder: 70,
    spine: 75,
    timestamp: new Date(),
  },
  dailyHistory: [],
  weeklyStats: {
    average: 75,
    improvement: 5,
    totalTime: 0,
  },
  exercises: defaultExercises,
  updatePosture: (data) =>
    set((state) => ({
      currentPosture: { ...state.currentPosture, ...data, timestamp: new Date() },
    })),
  updateScore: (score) =>
    set((state) => ({
      currentPosture: { ...state.currentPosture, score },
    })),
  completeExercise: (id) =>
    set((state) => ({
      exercises: state.exercises.map((ex) =>
        ex.id === id ? { ...ex, completed: true } : ex
      ),
    })),
  resetDaily: () =>
    set((state) => ({
      exercises: defaultExercises,
      dailyHistory: [],
      currentPosture: { ...state.currentPosture, score: 75 },
    })),
  addToHistory: (data) =>
    set((state) => ({
      dailyHistory: [...state.dailyHistory, data].slice(-100),
    })),
}))