import { create } from 'zustand'

export interface MoodEntry {
  id: string
  mood: string
  emoji: string
  note: string
  timestamp: Date
  tags: string[]
}

interface MoodStore {
  entries: MoodEntry[]
  currentMood: string | null
  currentEmoji: string | null
  addEntry: (entry: Omit<MoodEntry, 'id' | 'timestamp'>) => void
  deleteEntry: (id: string) => void
  setCurrentMood: (mood: string, emoji: string) => void
  getEntriesByDate: (date: Date) => MoodEntry[]
  getMoodStats: () => { mood: string; count: number }[]
}

export const useMoodStore = create<MoodStore>((set, get) => ({
      entries: [],
      currentMood: null,
      currentEmoji: null,
      
      addEntry: (entry) => {
        const newEntry: MoodEntry = {
          ...entry,
          id: Date.now().toString(),
          timestamp: new Date(),
        }
        set((state) => ({
          entries: [newEntry, ...state.entries],
          currentMood: null,
          currentEmoji: null,
        }))
      },
      
      deleteEntry: (id) => {
        set((state) => ({
          entries: state.entries.filter((entry) => entry.id !== id),
        }))
      },
      
      setCurrentMood: (mood, emoji) => {
        set({ currentMood: mood, currentEmoji: emoji })
      },
      
      getEntriesByDate: (date) => {
        const { entries } = get()
        const targetDate = new Date(date).toDateString()
        return entries.filter(
          (entry) => new Date(entry.timestamp).toDateString() === targetDate
        )
      },
      
      getMoodStats: () => {
        const { entries } = get()
        const stats = entries.reduce((acc, entry) => {
          const existing = acc.find((s) => s.mood === entry.mood)
          if (existing) {
            existing.count++
          } else {
            acc.push({ mood: entry.mood, count: 1 })
          }
          return acc
        }, [] as { mood: string; count: number }[])
        return stats.sort((a, b) => b.count - a.count)
      },
    }))