import { create } from 'zustand'

export interface Track {
  id: string
  name: string
  bpm: number
  genre: string
  duration: number
  color: string
}

interface PetState {
  name: string
  mood: 'happy' | 'excited' | 'calm' | 'dancing'
  energy: number
  experience: number
  level: number
  isPlaying: boolean
  currentBPM: number
  effects: string[]
}

interface MusicState {
  tracks: Track[]
  activeTrack: Track | null
  volume: number
  crossfaderPosition: number
  isLooping: boolean
  activeEffects: string[]
  mixHistory: string[]
}

interface AppStore {
  pet: PetState
  music: MusicState
  updatePetMood: (mood: PetState['mood']) => void
  updateEnergy: (delta: number) => void
  gainExperience: (points: number) => void
  setActiveTrack: (track: Track | null) => void
  setVolume: (volume: number) => void
  setCrossfader: (position: number) => void
  toggleLoop: () => void
  toggleEffect: (effect: string) => void
  startMixing: () => void
  stopMixing: () => void
  saveMix: (mixName: string) => void
}

const defaultTracks: Track[] = [
  { id: '1', name: 'Neon Dreams', bpm: 128, genre: 'Electronic', duration: 180, color: '#9333EA' },
  { id: '2', name: 'Pet Paradise', bpm: 120, genre: 'House', duration: 210, color: '#EC4899' },
  { id: '3', name: 'Digital Love', bpm: 140, genre: 'Trance', duration: 240, color: '#3B82F6' },
  { id: '4', name: 'Pixel Party', bpm: 115, genre: 'Chill', duration: 195, color: '#10B981' },
  { id: '5', name: 'Virtual Vibes', bpm: 95, genre: 'Lo-Fi', duration: 165, color: '#F59E0B' },
  { id: '6', name: 'Beat Quest', bpm: 175, genre: 'Drum & Bass', duration: 225, color: '#EF4444' },
]

const availableEffects = ['Echo', 'Reverb', 'Filter', 'Flanger', 'Delay', 'Distortion']

export const usePetDJStore = create<AppStore>((set) => ({
  pet: {
    name: 'DJ Paws',
    mood: 'happy',
    energy: 100,
    experience: 0,
    level: 1,
    isPlaying: false,
    currentBPM: 120,
    effects: availableEffects,
  },
  music: {
    tracks: defaultTracks,
    activeTrack: null,
    volume: 75,
    crossfaderPosition: 50,
    isLooping: false,
    activeEffects: [],
    mixHistory: [],
  },
  updatePetMood: (mood) => set((state) => ({
    pet: { ...state.pet, mood }
  })),
  updateEnergy: (delta) => set((state) => ({
    pet: { ...state.pet, energy: Math.max(0, Math.min(100, state.pet.energy + delta)) }
  })),
  gainExperience: (points) => set((state) => {
    const newExp = state.pet.experience + points
    const newLevel = Math.floor(newExp / 100) + 1
    return {
      pet: {
        ...state.pet,
        experience: newExp,
        level: newLevel,
        mood: newLevel > state.pet.level ? 'excited' : state.pet.mood
      }
    }
  }),
  setActiveTrack: (track) => set((state) => ({
    music: { ...state.music, activeTrack: track },
    pet: { ...state.pet, currentBPM: track?.bpm || 120 }
  })),
  setVolume: (volume) => set((state) => ({
    music: { ...state.music, volume }
  })),
  setCrossfader: (position) => set((state) => ({
    music: { ...state.music, crossfaderPosition: position }
  })),
  toggleLoop: () => set((state) => ({
    music: { ...state.music, isLooping: !state.music.isLooping }
  })),
  toggleEffect: (effect) => set((state) => {
    const effects = state.music.activeEffects.includes(effect)
      ? state.music.activeEffects.filter(e => e !== effect)
      : [...state.music.activeEffects, effect]
    return {
      music: { ...state.music, activeEffects: effects }
    }
  }),
  startMixing: () => set((state) => ({
    pet: { ...state.pet, isPlaying: true, mood: 'dancing' }
  })),
  stopMixing: () => set((state) => ({
    pet: { ...state.pet, isPlaying: false, mood: 'calm' }
  })),
  saveMix: (mixName) => set((state) => ({
    music: { ...state.music, mixHistory: [...state.music.mixHistory, mixName] },
    pet: { ...state.pet, mood: 'happy' }
  })),
}))