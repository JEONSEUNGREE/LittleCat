import { create } from 'zustand'

export type Mood = 'happy' | 'sad' | 'excited' | 'calm' | 'angry' | 'romantic' | 'mysterious' | 'peaceful'

interface MoodStore {
  selectedMood: Mood | null
  selectedColors: string[]
  storyElements: string[]
  setMood: (mood: Mood) => void
  addColor: (color: string) => void
  removeColor: (color: string) => void
  clearColors: () => void
  addStoryElement: (element: string) => void
  reset: () => void
}

export const useMoodStore = create<MoodStore>((set) => ({
  selectedMood: null,
  selectedColors: [],
  storyElements: [],
  
  setMood: (mood) => set({ selectedMood: mood }),
  
  addColor: (color) => set((state) => ({
    selectedColors: state.selectedColors.includes(color) 
      ? state.selectedColors 
      : [...state.selectedColors, color].slice(0, 5) // Max 5 colors
  })),
  
  removeColor: (color) => set((state) => ({
    selectedColors: state.selectedColors.filter(c => c !== color)
  })),
  
  clearColors: () => set({ selectedColors: [] }),
  
  addStoryElement: (element) => set((state) => ({
    storyElements: [...state.storyElements, element]
  })),
  
  reset: () => set({
    selectedMood: null,
    selectedColors: [],
    storyElements: []
  })
}))