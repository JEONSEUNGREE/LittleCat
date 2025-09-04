import { create } from 'zustand'

export type Mood = 'happy' | 'calm' | 'energetic' | 'sad' | 'neutral'
export type MusicGenre = 'electronic' | 'ambient' | 'jazz' | 'classical' | 'pop'

interface MoodState {
  currentMood: Mood
  intensity: number
  tempo: number
  genre: MusicGenre
  isPlaying: boolean
  volume: number
  waveData: number[]
  setMood: (mood: Mood) => void
  setIntensity: (intensity: number) => void
  setTempo: (tempo: number) => void
  setGenre: (genre: MusicGenre) => void
  togglePlayPause: () => void
  setVolume: (volume: number) => void
  updateWaveData: () => void
}

const useMoodStore = create<MoodState>((set, get) => ({
  currentMood: 'neutral',
  intensity: 50,
  tempo: 120,
  genre: 'electronic',
  isPlaying: false,
  volume: 70,
  waveData: Array(20).fill(0).map(() => Math.random() * 100),
  
  setMood: (mood) => set({ currentMood: mood }),
  setIntensity: (intensity) => set({ intensity }),
  setTempo: (tempo) => set({ tempo }),
  setGenre: (genre) => set({ genre }),
  togglePlayPause: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setVolume: (volume) => set({ volume }),
  updateWaveData: () => {
    const { intensity, tempo, currentMood } = get()
    const moodMultiplier = {
      happy: 1.2,
      energetic: 1.5,
      calm: 0.7,
      sad: 0.5,
      neutral: 1
    }
    const baseValue = (intensity / 100) * moodMultiplier[currentMood] * (tempo / 120)
    const newWaveData = Array(20).fill(0).map(() => 
      Math.min(100, Math.random() * baseValue * 100)
    )
    set({ waveData: newWaveData })
  }
}))

export default useMoodStore