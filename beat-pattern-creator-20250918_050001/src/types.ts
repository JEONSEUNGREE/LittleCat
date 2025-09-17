export interface Pattern {
  id: string;
  name: string;
  tracks: Track[];
  bpm: number;
  bars: number;
}

export interface Track {
  id: string;
  name: string;
  sound: SoundType;
  steps: boolean[];
  volume: number;
  muted: boolean;
}

export type SoundType = 'kick' | 'snare' | 'hihat' | 'openhat' | 'clap' | 'crash' | 'ride' | 'tom';

export interface AudioEngine {
  playSound: (sound: SoundType, volume: number) => void;
  setBPM: (bpm: number) => void;
  start: () => void;
  stop: () => void;
  isPlaying: boolean;
}