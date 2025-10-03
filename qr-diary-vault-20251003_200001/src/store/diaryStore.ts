import { create } from 'zustand'

export interface DiaryEntry {
  id: string
  title: string
  content: string
  mood: string
  tags: string[]
  createdAt: Date
  qrCode?: string
}

interface DiaryStore {
  entries: DiaryEntry[]
  addEntry: (entry: Omit<DiaryEntry, 'id' | 'createdAt'>) => string
  updateEntry: (id: string, entry: Partial<DiaryEntry>) => void
  deleteEntry: (id: string) => void
  getEntry: (id: string) => DiaryEntry | undefined
}

export const useDiaryStore = create<DiaryStore>((set, get) => ({
  entries: [],
  
  addEntry: (entry) => {
    const id = Date.now().toString()
    const newEntry: DiaryEntry = {
      ...entry,
      id,
      createdAt: new Date()
    }
    set((state) => ({
      entries: [newEntry, ...state.entries]
    }))
    return id
  },
  
  updateEntry: (id, updatedEntry) => {
    set((state) => ({
      entries: state.entries.map((entry) =>
        entry.id === id ? { ...entry, ...updatedEntry } : entry
      )
    }))
  },
  
  deleteEntry: (id) => {
    set((state) => ({
      entries: state.entries.filter((entry) => entry.id !== id)
    }))
  },
  
  getEntry: (id) => {
    return get().entries.find((entry) => entry.id === id)
  }
}))