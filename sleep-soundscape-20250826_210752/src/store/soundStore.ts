import { create } from 'zustand'

export type SoundType = 'rain' | 'ocean' | 'forest' | 'white-noise' | 'meditation' | 'space'
export type SleepPhase = 'preparing' | 'falling-asleep' | 'deep-sleep' | 'wake-up'

interface SoundLayer {
  id: string
  type: SoundType
  volume: number
  isActive: boolean
}

interface SleepSession {
  id: string
  date: string
  duration: number
  quality: number
  soundscape: SoundLayer[]
}

interface SoundStore {
  isPlaying: boolean
  currentPhase: SleepPhase
  masterVolume: number
  soundLayers: SoundLayer[]
  sleepTimer: number | null
  sessions: SleepSession[]
  
  togglePlay: () => void
  setPhase: (phase: SleepPhase) => void
  setMasterVolume: (volume: number) => void
  toggleLayer: (id: string) => void
  setLayerVolume: (id: string, volume: number) => void
  addLayer: (type: SoundType) => void
  removeLayer: (id: string) => void
  setSleepTimer: (minutes: number | null) => void
  saveSession: (duration: number, quality: number) => void
}

const defaultLayers: SoundLayer[] = [
  { id: '1', type: 'rain', volume: 50, isActive: true },
  { id: '2', type: 'meditation', volume: 30, isActive: false },
  { id: '3', type: 'white-noise', volume: 20, isActive: false }
]

export const useSoundStore = create<SoundStore>((set) => ({
  isPlaying: false,
  currentPhase: 'preparing',
  masterVolume: 70,
  soundLayers: defaultLayers,
  sleepTimer: null,
  sessions: [],
  
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  
  setPhase: (phase) => set({ currentPhase: phase }),
  
  setMasterVolume: (volume) => set({ masterVolume: volume }),
  
  toggleLayer: (id) => set((state) => ({
    soundLayers: state.soundLayers.map(layer =>
      layer.id === id ? { ...layer, isActive: !layer.isActive } : layer
    )
  })),
  
  setLayerVolume: (id, volume) => set((state) => ({
    soundLayers: state.soundLayers.map(layer =>
      layer.id === id ? { ...layer, volume } : layer
    )
  })),
  
  addLayer: (type) => set((state) => ({
    soundLayers: [...state.soundLayers, {
      id: Date.now().toString(),
      type,
      volume: 50,
      isActive: true
    }]
  })),
  
  removeLayer: (id) => set((state) => ({
    soundLayers: state.soundLayers.filter(layer => layer.id !== id)
  })),
  
  setSleepTimer: (minutes) => set({ sleepTimer: minutes }),
  
  saveSession: (duration, quality) => set((state) => ({
    sessions: [...state.sessions, {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      duration,
      quality,
      soundscape: state.soundLayers.filter(l => l.isActive)
    }]
  }))
}))