import { create } from 'zustand';

interface AudioState {
  isRecording: boolean;
  isPaused: boolean;
  audioContext: AudioContext | null;
  analyser: AnalyserNode | null;
  source: MediaStreamAudioSourceNode | null;
  stream: MediaStream | null;
  visualizationType: 'waveform' | 'bars' | 'circular' | 'particles';
  sensitivity: number;
  colorScheme: 'neon' | 'sunset' | 'ocean' | 'forest';
  setRecording: (value: boolean) => void;
  setPaused: (value: boolean) => void;
  setAudioContext: (context: AudioContext | null) => void;
  setAnalyser: (analyser: AnalyserNode | null) => void;
  setSource: (source: MediaStreamAudioSourceNode | null) => void;
  setStream: (stream: MediaStream | null) => void;
  setVisualizationType: (type: 'waveform' | 'bars' | 'circular' | 'particles') => void;
  setSensitivity: (value: number) => void;
  setColorScheme: (scheme: 'neon' | 'sunset' | 'ocean' | 'forest') => void;
  cleanup: () => void;
}

const useAudioStore = create<AudioState>((set) => ({
  isRecording: false,
  isPaused: false,
  audioContext: null,
  analyser: null,
  source: null,
  stream: null,
  visualizationType: 'waveform',
  sensitivity: 50,
  colorScheme: 'neon',
  setRecording: (value) => set({ isRecording: value }),
  setPaused: (value) => set({ isPaused: value }),
  setAudioContext: (context) => set({ audioContext: context }),
  setAnalyser: (analyser) => set({ analyser: analyser }),
  setSource: (source) => set({ source: source }),
  setStream: (stream) => set({ stream: stream }),
  setVisualizationType: (type) => set({ visualizationType: type }),
  setSensitivity: (value) => set({ sensitivity: value }),
  setColorScheme: (scheme) => set({ colorScheme: scheme }),
  cleanup: () => set({ 
    audioContext: null, 
    analyser: null, 
    source: null, 
    stream: null,
    isRecording: false,
    isPaused: false
  }),
}));

export default useAudioStore;