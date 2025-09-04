export interface Mood {
  id: string;
  name: string;
  color: string;
  emoji: string;
  intensity: number;
  beats: number[];
}

export interface MusicPattern {
  tempo: number;
  energy: number;
  harmony: number;
  rhythm: string;
}

export interface MixerState {
  selectedMoods: Mood[];
  isPlaying: boolean;
  currentBeat: number;
  volume: number;
  tempo: number;
}