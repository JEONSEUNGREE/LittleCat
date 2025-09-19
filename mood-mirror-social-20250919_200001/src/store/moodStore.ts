import { create } from 'zustand'

export interface Mood {
  id: string
  emoji: string
  label: string
  color: string
  timestamp: number
}

export interface MoodEntry {
  id: string
  userId: string
  userName: string
  mood: Mood
  message?: string
  timestamp: number
  empathyCount: number
}

interface MoodStore {
  currentUserMood: Mood | null
  moodHistory: MoodEntry[]
  globalMoodFeed: MoodEntry[]
  setUserMood: (mood: Mood) => void
  addMoodEntry: (entry: Omit<MoodEntry, 'id' | 'timestamp'>) => void
  addEmpathy: (entryId: string) => void
  getMoodStats: () => { mood: string; count: number; percentage: number }[]
}

const mockGlobalFeed: MoodEntry[] = [
  {
    id: '1',
    userId: 'user1',
    userName: '햇살이',
    mood: { id: 'happy', emoji: '😊', label: '행복해요', color: '#FFD700', timestamp: Date.now() },
    message: '오늘 날씨가 너무 좋아서 기분이 최고예요!',
    timestamp: Date.now() - 1000 * 60 * 5,
    empathyCount: 12
  },
  {
    id: '2',
    userId: 'user2',
    userName: '달빛',
    mood: { id: 'calm', emoji: '😌', label: '평온해요', color: '#87CEEB', timestamp: Date.now() },
    message: '명상하고 나니 마음이 차분해졌어요',
    timestamp: Date.now() - 1000 * 60 * 15,
    empathyCount: 8
  },
  {
    id: '3',
    userId: 'user3',
    userName: '별님',
    mood: { id: 'excited', emoji: '🤗', label: '신나요', color: '#FF6B6B', timestamp: Date.now() },
    message: '새로운 프로젝트를 시작해서 설레요!',
    timestamp: Date.now() - 1000 * 60 * 30,
    empathyCount: 15
  }
]

export const useMoodStore = create<MoodStore>((set, get) => ({
  currentUserMood: null,
  moodHistory: [],
  globalMoodFeed: mockGlobalFeed,

  setUserMood: (mood) => {
    set({ currentUserMood: mood })
    const entry: MoodEntry = {
      id: Date.now().toString(),
      userId: 'currentUser',
      userName: '나',
      mood,
      timestamp: Date.now(),
      empathyCount: 0
    }
    set((state) => ({
      moodHistory: [entry, ...state.moodHistory],
      globalMoodFeed: [entry, ...state.globalMoodFeed]
    }))
  },

  addMoodEntry: (entry) => {
    const newEntry: MoodEntry = {
      ...entry,
      id: Date.now().toString(),
      timestamp: Date.now()
    }
    set((state) => ({
      moodHistory: [newEntry, ...state.moodHistory],
      globalMoodFeed: [newEntry, ...state.globalMoodFeed]
    }))
  },

  addEmpathy: (entryId) => {
    set((state) => ({
      globalMoodFeed: state.globalMoodFeed.map((entry) =>
        entry.id === entryId
          ? { ...entry, empathyCount: entry.empathyCount + 1 }
          : entry
      )
    }))
  },

  getMoodStats: () => {
    const { globalMoodFeed } = get()
    const moodCounts = globalMoodFeed.reduce((acc, entry) => {
      const moodLabel = entry.mood.label
      acc[moodLabel] = (acc[moodLabel] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const total = Object.values(moodCounts).reduce((sum, count) => sum + count, 0)
    
    return Object.entries(moodCounts).map(([mood, count]) => ({
      mood,
      count,
      percentage: Math.round((count / total) * 100)
    })).sort((a, b) => b.count - a.count)
  }
}))