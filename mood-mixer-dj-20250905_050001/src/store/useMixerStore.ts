import { create } from 'zustand';
import { Mood, MixerState } from '../types';

interface MixerStore extends MixerState {
  addMood: (mood: Mood) => void;
  removeMood: (moodId: string) => void;
  clearMoods: () => void;
  setPlaying: (isPlaying: boolean) => void;
  setVolume: (volume: number) => void;
  setTempo: (tempo: number) => void;
  updateBeat: () => void;
}

export const useMixerStore = create<MixerStore>((set) => ({
  selectedMoods: [],
  isPlaying: false,
  currentBeat: 0,
  volume: 70,
  tempo: 120,

  addMood: (mood) =>
    set((state) => {
      if (state.selectedMoods.length >= 4) {
        return { selectedMoods: [...state.selectedMoods.slice(1), mood] };
      }
      return { selectedMoods: [...state.selectedMoods, mood] };
    }),

  removeMood: (moodId) =>
    set((state) => ({
      selectedMoods: state.selectedMoods.filter((m) => m.id !== moodId),
    })),

  clearMoods: () => set({ selectedMoods: [] }),

  setPlaying: (isPlaying) => set({ isPlaying }),

  setVolume: (volume) => set({ volume }),

  setTempo: (tempo) => set({ tempo }),

  updateBeat: () =>
    set((state) => ({
      currentBeat: (state.currentBeat + 1) % 16,
    })),
}))