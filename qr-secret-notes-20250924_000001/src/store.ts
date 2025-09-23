import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface SecretNote {
  id: string
  title: string
  content: string
  qrCode?: string
  createdAt: Date
  isLocked: boolean
  category: 'personal' | 'work' | 'secret' | 'temporary'
  expiryDate?: Date
}

interface NotesStore {
  notes: SecretNote[]
  activeCategory: string
  searchQuery: string
  addNote: (note: Omit<SecretNote, 'id' | 'createdAt'>) => void
  updateNote: (id: string, updates: Partial<SecretNote>) => void
  deleteNote: (id: string) => void
  toggleLock: (id: string) => void
  setActiveCategory: (category: string) => void
  setSearchQuery: (query: string) => void
  getFilteredNotes: () => SecretNote[]
}

const useNotesStore = create<NotesStore>()(
  persist(
    (set, get) => ({
      notes: [],
      activeCategory: 'all',
      searchQuery: '',
      
      addNote: (note) => set((state) => ({
        notes: [
          ...state.notes,
          {
            ...note,
            id: Date.now().toString(),
            createdAt: new Date(),
          }
        ]
      })),
      
      updateNote: (id, updates) => set((state) => ({
        notes: state.notes.map(note =>
          note.id === id ? { ...note, ...updates } : note
        )
      })),
      
      deleteNote: (id) => set((state) => ({
        notes: state.notes.filter(note => note.id !== id)
      })),
      
      toggleLock: (id) => set((state) => ({
        notes: state.notes.map(note =>
          note.id === id ? { ...note, isLocked: !note.isLocked } : note
        )
      })),
      
      setActiveCategory: (category) => set({ activeCategory: category }),
      
      setSearchQuery: (query) => set({ searchQuery: query }),
      
      getFilteredNotes: () => {
        const { notes, activeCategory, searchQuery } = get()
        
        let filtered = notes
        
        // Filter by category
        if (activeCategory !== 'all') {
          filtered = filtered.filter(note => note.category === activeCategory)
        }
        
        // Filter by search query
        if (searchQuery) {
          const query = searchQuery.toLowerCase()
          filtered = filtered.filter(note =>
            note.title.toLowerCase().includes(query) ||
            note.content.toLowerCase().includes(query)
          )
        }
        
        // Filter expired temporary notes
        const now = new Date()
        filtered = filtered.filter(note => {
          if (note.expiryDate && note.category === 'temporary') {
            return new Date(note.expiryDate) > now
          }
          return true
        })
        
        // Sort by creation date (newest first)
        return filtered.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      }
    }),
    {
      name: 'qr-secret-notes-storage'
    }
  )
)

export default useNotesStore