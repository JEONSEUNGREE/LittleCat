import { create } from 'zustand'

export interface Mood {
  id: string
  emoji: string
  label: string
  color: string
  timestamp: number
  userId: string
  isAnonymous: boolean
  message?: string
}

interface MoodStore {
  currentMood: Mood | null
  moodHistory: Mood[]
  nearbyMoods: Mood[]
  setCurrentMood: (mood: Mood) => void
  addToHistory: (mood: Mood) => void
  setNearbyMoods: (moods: Mood[]) => void
  clearHistory: () => void
}

const useMoodStore = create<MoodStore>((set) => ({
  currentMood: null,
  moodHistory: [],
  nearbyMoods: [],
  
  setCurrentMood: (mood) => set({ currentMood: mood }),
  
  addToHistory: (mood) => set((state) => ({
    moodHistory: [mood, ...state.moodHistory].slice(0, 50)
  })),
  
  setNearbyMoods: (moods) => set({ nearbyMoods: moods }),
  
  clearHistory: () => set({ moodHistory: [] })
}))

export default useMoodStore