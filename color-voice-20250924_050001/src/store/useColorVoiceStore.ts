import { create } from 'zustand'

export interface ColorData {
  hex: string
  rgb: { r: number; g: number; b: number }
  frequency: number
  note: string
  octave: number
}

export interface SoundData {
  frequency: number
  note: string
  color: string
  waveform: 'sine' | 'square' | 'triangle' | 'sawtooth'
}

interface ColorVoiceState {
  mode: 'colorToSound' | 'soundToColor'
  currentColor: ColorData | null
  currentSound: SoundData | null
  isPlaying: boolean
  volume: number
  history: Array<{ type: 'color' | 'sound'; data: ColorData | SoundData; timestamp: Date }>
  setMode: (mode: 'colorToSound' | 'soundToColor') => void
  setCurrentColor: (color: ColorData | null) => void
  setCurrentSound: (sound: SoundData | null) => void
  setIsPlaying: (playing: boolean) => void
  setVolume: (volume: number) => void
  addToHistory: (type: 'color' | 'sound', data: ColorData | SoundData) => void
  clearHistory: () => void
}

const useColorVoiceStore = create<ColorVoiceState>((set) => ({
  mode: 'colorToSound',
  currentColor: null,
  currentSound: null,
  isPlaying: false,
  volume: 0.5,
  history: [],
  setMode: (mode) => set({ mode }),
  setCurrentColor: (currentColor) => set({ currentColor }),
  setCurrentSound: (currentSound) => set({ currentSound }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setVolume: (volume) => set({ volume }),
  addToHistory: (type, data) =>
    set((state) => ({
      history: [...state.history, { type, data, timestamp: new Date() }].slice(-10),
    })),
  clearHistory: () => set({ history: [] }),
}))

export default useColorVoiceStore