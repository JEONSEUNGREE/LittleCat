import { create } from 'zustand';
import { Pattern, Track, SoundType } from '../types';

interface BeatStore {
  pattern: Pattern;
  isPlaying: boolean;
  currentStep: number;
  bpm: number;
  
  // Actions
  toggleStep: (trackId: string, stepIndex: number) => void;
  togglePlay: () => void;
  setBPM: (bpm: number) => void;
  clearPattern: () => void;
  toggleMute: (trackId: string) => void;
  setVolume: (trackId: string, volume: number) => void;
  updateCurrentStep: (step: number) => void;
  addTrack: (sound: SoundType) => void;
  removeTrack: (trackId: string) => void;
}

const createInitialPattern = (): Pattern => ({
  id: Date.now().toString(),
  name: 'New Pattern',
  bpm: 120,
  bars: 1,
  tracks: [
    {
      id: 'kick',
      name: 'Kick',
      sound: 'kick',
      steps: new Array(16).fill(false),
      volume: 0.8,
      muted: false,
    },
    {
      id: 'snare',
      name: 'Snare',
      sound: 'snare',
      steps: new Array(16).fill(false),
      volume: 0.7,
      muted: false,
    },
    {
      id: 'hihat',
      name: 'Hi-Hat',
      sound: 'hihat',
      steps: new Array(16).fill(false),
      volume: 0.5,
      muted: false,
    },
    {
      id: 'openhat',
      name: 'Open Hat',
      sound: 'openhat',
      steps: new Array(16).fill(false),
      volume: 0.6,
      muted: false,
    },
  ],
});

export const useBeatStore = create<BeatStore>((set) => ({
  pattern: createInitialPattern(),
  isPlaying: false,
  currentStep: -1,
  bpm: 120,
  
  toggleStep: (trackId, stepIndex) =>
    set((state) => ({
      pattern: {
        ...state.pattern,
        tracks: state.pattern.tracks.map((track) =>
          track.id === trackId
            ? { ...track, steps: track.steps.map((step, i) => (i === stepIndex ? !step : step)) }
            : track
        ),
      },
    })),
  
  togglePlay: () =>
    set((state) => ({ 
      isPlaying: !state.isPlaying,
      currentStep: !state.isPlaying ? -1 : state.currentStep 
    })),
  
  setBPM: (bpm) =>
    set((state) => ({
      bpm,
      pattern: { ...state.pattern, bpm },
    })),
  
  clearPattern: () =>
    set((state) => ({
      pattern: {
        ...state.pattern,
        tracks: state.pattern.tracks.map((track) => ({
          ...track,
          steps: new Array(16).fill(false),
        })),
      },
    })),
  
  toggleMute: (trackId) =>
    set((state) => ({
      pattern: {
        ...state.pattern,
        tracks: state.pattern.tracks.map((track) =>
          track.id === trackId ? { ...track, muted: !track.muted } : track
        ),
      },
    })),
  
  setVolume: (trackId, volume) =>
    set((state) => ({
      pattern: {
        ...state.pattern,
        tracks: state.pattern.tracks.map((track) =>
          track.id === trackId ? { ...track, volume } : track
        ),
      },
    })),
  
  updateCurrentStep: (step) =>
    set(() => ({ currentStep: step })),
    
  addTrack: (sound) =>
    set((state) => {
      if (state.pattern.tracks.length >= 8) return state;
      const newTrack: Track = {
        id: `${sound}-${Date.now()}`,
        name: sound.charAt(0).toUpperCase() + sound.slice(1),
        sound,
        steps: new Array(16).fill(false),
        volume: 0.7,
        muted: false,
      };
      return {
        pattern: {
          ...state.pattern,
          tracks: [...state.pattern.tracks, newTrack],
        },
      };
    }),
    
  removeTrack: (trackId) =>
    set((state) => ({
      pattern: {
        ...state.pattern,
        tracks: state.pattern.tracks.filter((track) => track.id !== trackId),
      },
    })),
}))