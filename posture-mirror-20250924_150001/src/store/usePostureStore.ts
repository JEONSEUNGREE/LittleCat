import { create } from 'zustand'

export interface PostureData {
  timestamp: Date
  score: number
  neck: number
  shoulder: number
  back: number
}

interface PostureStore {
  currentScore: number
  dailyGoal: number
  sessionActive: boolean
  todaysSessions: PostureData[]
  weeklyProgress: number[]
  darkMode: boolean
  notifications: boolean
  
  startSession: () => void
  endSession: () => void
  updateScore: (score: number) => void
  addPostureData: (data: Omit<PostureData, 'timestamp'>) => void
  setDailyGoal: (goal: number) => void
  toggleDarkMode: () => void
  toggleNotifications: () => void
  resetDaily: () => void
}

const usePostureStore = create<PostureStore>((set) => ({
  currentScore: 85,
  dailyGoal: 80,
  sessionActive: false,
  todaysSessions: [],
  weeklyProgress: [75, 78, 82, 79, 85, 83, 85],
  darkMode: false,
  notifications: true,

  startSession: () => set({ sessionActive: true }),
  
  endSession: () => set({ sessionActive: false }),
  
  updateScore: (score) => set({ currentScore: score }),
  
  addPostureData: (data) => set((state) => ({
    todaysSessions: [...state.todaysSessions, { ...data, timestamp: new Date() }],
    currentScore: data.score
  })),
  
  setDailyGoal: (goal) => set({ dailyGoal: goal }),
  
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  
  toggleNotifications: () => set((state) => ({ notifications: !state.notifications })),
  
  resetDaily: () => set({ todaysSessions: [], currentScore: 0 })
}))

export default usePostureStore