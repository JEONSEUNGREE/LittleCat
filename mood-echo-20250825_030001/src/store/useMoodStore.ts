import { create } from 'zustand'

export interface Mood {
  id: string
  emoji: string
  color: string
  name: string
  timestamp: Date
}

export interface Echo {
  id: string
  userId: string
  mood: Mood
  message?: string
  echoes: number
  timestamp: Date
}

interface MoodStore {
  currentMood: Mood | null
  moodHistory: Mood[]
  echoFeed: Echo[]
  connections: string[]
  setMood: (mood: Mood) => void
  addEcho: (echo: Echo) => void
  incrementEcho: (echoId: string) => void
  addConnection: (userId: string) => void
}

const useMoodStore = create<MoodStore>((set) => ({
  currentMood: null,
  moodHistory: [],
  echoFeed: [
    {
      id: '1',
      userId: 'user1',
      mood: { id: '1', emoji: '😊', color: '#FFD700', name: 'Happy', timestamp: new Date() },
      message: 'Feeling great today!',
      echoes: 5,
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: '2',
      userId: 'user2',
      mood: { id: '2', emoji: '😔', color: '#4A90E2', name: 'Sad', timestamp: new Date() },
      message: 'Need some support',
      echoes: 12,
      timestamp: new Date(Date.now() - 7200000)
    },
    {
      id: '3',
      userId: 'user3',
      mood: { id: '3', emoji: '😌', color: '#4ECDC4', name: 'Calm', timestamp: new Date() },
      echoes: 3,
      timestamp: new Date(Date.now() - 1800000)
    }
  ],
  connections: [],
  
  setMood: (mood) => set((state) => ({
    currentMood: mood,
    moodHistory: [...state.moodHistory, mood]
  })),
  
  addEcho: (echo) => set((state) => ({
    echoFeed: [echo, ...state.echoFeed]
  })),
  
  incrementEcho: (echoId) => set((state) => ({
    echoFeed: state.echoFeed.map(echo =>
      echo.id === echoId ? { ...echo, echoes: echo.echoes + 1 } : echo
    )
  })),
  
  addConnection: (userId) => set((state) => ({
    connections: [...state.connections, userId]
  }))
}))

export default useMoodStore