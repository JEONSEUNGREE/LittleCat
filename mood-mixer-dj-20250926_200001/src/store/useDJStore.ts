import { create } from 'zustand'

export interface Mood {
  name: string
  color: string
  intensity: number
  bpm: number
  sound: string
}

interface DJState {
  isPlaying: boolean
  currentMood: Mood | null
  moodHistory: Mood[]
  mixIntensity: number
  crossfaderPosition: number
  leftDeck: Mood | null
  rightDeck: Mood | null
  bpm: number
  effects: {
    reverb: boolean
    echo: boolean
    filter: boolean
  }
  setPlaying: (playing: boolean) => void
  setCurrentMood: (mood: Mood) => void
  addToHistory: (mood: Mood) => void
  setMixIntensity: (intensity: number) => void
  setCrossfaderPosition: (position: number) => void
  setLeftDeck: (mood: Mood | null) => void
  setRightDeck: (mood: Mood | null) => void
  setBpm: (bpm: number) => void
  toggleEffect: (effect: 'reverb' | 'echo' | 'filter') => void
  clearHistory: () => void
}

export const useDJStore = create<DJState>((set) => ({
  isPlaying: false,
  currentMood: null,
  moodHistory: [],
  mixIntensity: 50,
  crossfaderPosition: 50,
  leftDeck: null,
  rightDeck: null,
  bpm: 120,
  effects: {
    reverb: false,
    echo: false,
    filter: false,
  },
  setPlaying: (playing) => set({ isPlaying: playing }),
  setCurrentMood: (mood) => set({ currentMood: mood }),
  addToHistory: (mood) => set((state) => ({ 
    moodHistory: [...state.moodHistory.slice(-9), mood] 
  })),
  setMixIntensity: (intensity) => set({ mixIntensity: intensity }),
  setCrossfaderPosition: (position) => set({ crossfaderPosition: position }),
  setLeftDeck: (mood) => set({ leftDeck: mood }),
  setRightDeck: (mood) => set({ rightDeck: mood }),
  setBpm: (bpm) => set({ bpm: bpm }),
  toggleEffect: (effect) => set((state) => ({
    effects: {
      ...state.effects,
      [effect]: !state.effects[effect]
    }
  })),
  clearHistory: () => set({ moodHistory: [] })
}))