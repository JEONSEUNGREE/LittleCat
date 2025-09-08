import { create } from 'zustand'

export interface Loop {
  id: string
  name: string
  sound: string
  isActive: boolean
  volume: number
  color: string
  icon: string
}

export interface Track {
  id: string
  name: string
  loops: string[]
  volume: number
  isMuted: boolean
}

interface SoundStore {
  isPlaying: boolean
  bpm: number
  masterVolume: number
  loops: Loop[]
  tracks: Track[]
  activeLoops: string[]
  recordingTrack: string | null
  
  // Actions
  togglePlay: () => void
  setBpm: (bpm: number) => void
  setMasterVolume: (volume: number) => void
  toggleLoop: (loopId: string) => void
  setLoopVolume: (loopId: string, volume: number) => void
  addTrack: () => void
  removeTrack: (trackId: string) => void
  toggleTrackMute: (trackId: string) => void
  setTrackVolume: (trackId: string, volume: number) => void
  startRecording: (trackId: string) => void
  stopRecording: () => void
  clearAll: () => void
}

const defaultLoops: Loop[] = [
  { id: '1', name: 'Kick', sound: 'kick', isActive: false, volume: 0.8, color: 'bg-red-500', icon: '🥁' },
  { id: '2', name: 'Snare', sound: 'snare', isActive: false, volume: 0.8, color: 'bg-blue-500', icon: '🎵' },
  { id: '3', name: 'Hi-Hat', sound: 'hihat', isActive: false, volume: 0.7, color: 'bg-green-500', icon: '🎶' },
  { id: '4', name: 'Bass', sound: 'bass', isActive: false, volume: 0.9, color: 'bg-purple-500', icon: '🎸' },
  { id: '5', name: 'Clap', sound: 'clap', isActive: false, volume: 0.7, color: 'bg-yellow-500', icon: '👏' },
  { id: '6', name: 'Cymbal', sound: 'cymbal', isActive: false, volume: 0.6, color: 'bg-pink-500', icon: '🔔' },
  { id: '7', name: 'Synth', sound: 'synth', isActive: false, volume: 0.8, color: 'bg-indigo-500', icon: '🎹' },
  { id: '8', name: 'Vocal', sound: 'vocal', isActive: false, volume: 0.9, color: 'bg-orange-500', icon: '🎤' },
  { id: '9', name: 'FX', sound: 'fx', isActive: false, volume: 0.5, color: 'bg-teal-500', icon: '✨' },
]

const defaultTracks: Track[] = [
  { id: 't1', name: 'Track 1', loops: [], volume: 1, isMuted: false },
  { id: 't2', name: 'Track 2', loops: [], volume: 1, isMuted: false },
  { id: 't3', name: 'Track 3', loops: [], volume: 1, isMuted: false },
  { id: 't4', name: 'Track 4', loops: [], volume: 1, isMuted: false },
]

export const useSoundStore = create<SoundStore>((set) => ({
  isPlaying: false,
  bpm: 120,
  masterVolume: 0.8,
  loops: defaultLoops,
  tracks: defaultTracks,
  activeLoops: [],
  recordingTrack: null,

  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  
  setBpm: (bpm) => set({ bpm: Math.max(60, Math.min(200, bpm)) }),
  
  setMasterVolume: (volume) => set({ masterVolume: Math.max(0, Math.min(1, volume)) }),
  
  toggleLoop: (loopId) => set((state) => {
    const loops = state.loops.map(loop =>
      loop.id === loopId ? { ...loop, isActive: !loop.isActive } : loop
    )
    const activeLoops = loops.filter(l => l.isActive).map(l => l.id)
    return { loops, activeLoops }
  }),
  
  setLoopVolume: (loopId, volume) => set((state) => ({
    loops: state.loops.map(loop =>
      loop.id === loopId ? { ...loop, volume: Math.max(0, Math.min(1, volume)) } : loop
    )
  })),
  
  addTrack: () => set((state) => {
    const newTrack: Track = {
      id: `t${Date.now()}`,
      name: `Track ${state.tracks.length + 1}`,
      loops: [],
      volume: 1,
      isMuted: false
    }
    return { tracks: [...state.tracks, newTrack] }
  }),
  
  removeTrack: (trackId) => set((state) => ({
    tracks: state.tracks.filter(t => t.id !== trackId)
  })),
  
  toggleTrackMute: (trackId) => set((state) => ({
    tracks: state.tracks.map(track =>
      track.id === trackId ? { ...track, isMuted: !track.isMuted } : track
    )
  })),
  
  setTrackVolume: (trackId, volume) => set((state) => ({
    tracks: state.tracks.map(track =>
      track.id === trackId ? { ...track, volume: Math.max(0, Math.min(1, volume)) } : track
    )
  })),
  
  startRecording: (trackId) => set({ recordingTrack: trackId }),
  
  stopRecording: () => set({ recordingTrack: null }),
  
  clearAll: () => set({
    isPlaying: false,
    loops: defaultLoops,
    tracks: defaultTracks,
    activeLoops: [],
    recordingTrack: null
  })
}))