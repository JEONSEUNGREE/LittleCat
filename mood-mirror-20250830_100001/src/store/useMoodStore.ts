import { create } from 'zustand'

export interface Mood {
  id: string
  emotion: string
  color: string
  intensity: number
  timestamp: Date
  anonymous: boolean
}

export interface MoodConnection {
  id: string
  userMoodId: string
  connectedMoodId: string
  similarity: number
}

interface MoodState {
  currentMood: Mood | null
  moodHistory: Mood[]
  sharedMoods: Mood[]
  connections: MoodConnection[]
  isSharing: boolean
  setCurrentMood: (mood: Mood) => void
  addToHistory: (mood: Mood) => void
  toggleSharing: () => void
  addSharedMood: (mood: Mood) => void
  addConnection: (connection: MoodConnection) => void
  clearCurrentMood: () => void
}

const useMoodStore = create<MoodState>((set) => ({
  currentMood: null,
  moodHistory: [],
  sharedMoods: [],
  connections: [],
  isSharing: false,
  
  setCurrentMood: (mood) => set({ currentMood: mood }),
  
  addToHistory: (mood) => set((state) => ({
    moodHistory: [...state.moodHistory, mood].slice(-50)
  })),
  
  toggleSharing: () => set((state) => ({ isSharing: !state.isSharing })),
  
  addSharedMood: (mood) => set((state) => ({
    sharedMoods: [mood, ...state.sharedMoods].slice(0, 100)
  })),
  
  addConnection: (connection) => set((state) => ({
    connections: [...state.connections, connection].slice(-20)
  })),
  
  clearCurrentMood: () => set({ currentMood: null })
}))

export default useMoodStore