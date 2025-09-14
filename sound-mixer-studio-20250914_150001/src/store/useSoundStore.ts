import { create } from 'zustand'

export interface Track {
  id: string
  name: string
  volume: number
  isPlaying: boolean
  isMuted: boolean
  pattern: boolean[]
  sound: string
}

interface EffectSettings {
  reverb: number
  delay: number
  distortion: number
  lowPass: number
  highPass: number
}

interface SoundStore {
  tracks: Track[]
  isRecording: boolean
  bpm: number
  currentBeat: number
  isPlaying: boolean
  masterVolume: number
  effects: EffectSettings
  
  addTrack: () => void
  removeTrack: (id: string) => void
  updateTrack: (id: string, updates: Partial<Track>) => void
  togglePlay: () => void
  toggleRecord: () => void
  setBpm: (bpm: number) => void
  setMasterVolume: (volume: number) => void
  updateEffect: (effect: keyof EffectSettings, value: number) => void
  toggleTrackBeat: (trackId: string, beatIndex: number) => void
  clearPattern: (trackId: string) => void
}

const defaultSounds = ['kick', 'snare', 'hihat', 'clap', 'cymbal', 'tom', 'cowbell', 'shaker']

export const useSoundStore = create<SoundStore>((set) => ({
  tracks: [
    {
      id: '1',
      name: 'Kick',
      volume: 80,
      isPlaying: false,
      isMuted: false,
      pattern: new Array(16).fill(false),
      sound: 'kick'
    },
    {
      id: '2',
      name: 'Snare',
      volume: 70,
      isPlaying: false,
      isMuted: false,
      pattern: new Array(16).fill(false),
      sound: 'snare'
    },
    {
      id: '3',
      name: 'Hi-Hat',
      volume: 60,
      isPlaying: false,
      isMuted: false,
      pattern: new Array(16).fill(false),
      sound: 'hihat'
    }
  ],
  isRecording: false,
  bpm: 120,
  currentBeat: 0,
  isPlaying: false,
  masterVolume: 75,
  effects: {
    reverb: 0,
    delay: 0,
    distortion: 0,
    lowPass: 100,
    highPass: 0
  },

  addTrack: () => set((state) => ({
    tracks: [...state.tracks, {
      id: Date.now().toString(),
      name: `Track ${state.tracks.length + 1}`,
      volume: 70,
      isPlaying: false,
      isMuted: false,
      pattern: new Array(16).fill(false),
      sound: defaultSounds[state.tracks.length % defaultSounds.length]
    }]
  })),

  removeTrack: (id) => set((state) => ({
    tracks: state.tracks.filter(track => track.id !== id)
  })),

  updateTrack: (id, updates) => set((state) => ({
    tracks: state.tracks.map(track => 
      track.id === id ? { ...track, ...updates } : track
    )
  })),

  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  
  toggleRecord: () => set((state) => ({ isRecording: !state.isRecording })),

  setBpm: (bpm) => set({ bpm }),

  setMasterVolume: (masterVolume) => set({ masterVolume }),

  updateEffect: (effect, value) => set((state) => ({
    effects: { ...state.effects, [effect]: value }
  })),

  toggleTrackBeat: (trackId, beatIndex) => set((state) => ({
    tracks: state.tracks.map(track => {
      if (track.id === trackId) {
        const newPattern = [...track.pattern]
        newPattern[beatIndex] = !newPattern[beatIndex]
        return { ...track, pattern: newPattern }
      }
      return track
    })
  })),

  clearPattern: (trackId) => set((state) => ({
    tracks: state.tracks.map(track => 
      track.id === trackId 
        ? { ...track, pattern: new Array(16).fill(false) }
        : track
    )
  }))
}))