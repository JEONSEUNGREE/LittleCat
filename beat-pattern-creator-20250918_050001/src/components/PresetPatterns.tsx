import React from 'react';
import { useBeatStore } from '../store/useBeatStore';
import { Sparkles } from 'lucide-react';

interface Preset {
  name: string;
  emoji: string;
  patterns: {
    kick: boolean[];
    snare: boolean[];
    hihat: boolean[];
    openhat: boolean[];
  };
  bpm: number;
}

const presets: Preset[] = [
  {
    name: 'Basic Beat',
    emoji: '🥁',
    bpm: 120,
    patterns: {
      kick: [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false],
      snare: [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
      hihat: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
      openhat: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    },
  },
  {
    name: 'Hip Hop',
    emoji: '🎤',
    bpm: 90,
    patterns: {
      kick: [true, false, false, false, false, false, true, false, false, false, true, false, false, false, false, false],
      snare: [false, false, false, false, true, false, false, false, false, true, false, false, true, false, false, false],
      hihat: [true, true, false, true, true, false, true, true, false, true, true, false, true, false, true, false],
      openhat: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false],
    },
  },
  {
    name: 'House',
    emoji: '🏠',
    bpm: 128,
    patterns: {
      kick: [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false],
      snare: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      hihat: [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],
      openhat: [false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false],
    },
  },
  {
    name: 'Trap',
    emoji: '🔥',
    bpm: 140,
    patterns: {
      kick: [true, false, false, false, false, false, false, true, false, false, true, false, false, false, false, false],
      snare: [false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],
      hihat: [true, true, true, false, true, true, false, true, true, true, false, true, false, true, true, true],
      openhat: [false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false],
    },
  },
];

export const PresetPatterns: React.FC = () => {
  const { pattern, setBPM } = useBeatStore();
  const store = useBeatStore();

  const applyPreset = (preset: Preset) => {
    setBPM(preset.bpm);
    
    // Update each track with the preset pattern
    pattern.tracks.forEach(track => {
      if (track.sound in preset.patterns) {
        const presetSteps = preset.patterns[track.sound as keyof typeof preset.patterns];
        presetSteps.forEach((isActive, index) => {
          if (track.steps[index] !== isActive) {
            store.toggleStep(track.id, index);
          }
        });
      }
    });
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-3 justify-center">
        <Sparkles className="w-5 h-5 text-beat-accent" />
        <h3 className="text-white font-bold">Preset Patterns</h3>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {presets.map((preset) => (
          <button
            key={preset.name}
            onClick={() => applyPreset(preset)}
            className="p-3 rounded-lg bg-gray-800 hover:bg-gray-700 
              transition-all duration-200 hover:scale-105 active:scale-95
              flex flex-col items-center gap-1"
          >
            <span className="text-2xl">{preset.emoji}</span>
            <span className="text-xs text-white font-medium">{preset.name}</span>
            <span className="text-xs text-gray-400">{preset.bpm} BPM</span>
          </button>
        ))}
      </div>
    </div>
  );
};