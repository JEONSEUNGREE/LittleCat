import React from 'react';
import { Play, Pause, RotateCcw, Mic, MicOff } from 'lucide-react';
import { useRhythmStore } from '../store/useRhythmStore';

interface ControlPanelProps {
  onPlay: () => void;
  onStop: () => void;
  onReset: () => void;
  onToggleListening: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  onPlay,
  onStop,
  onReset,
  onToggleListening
}) => {
  const { isPlaying, isListening, currentPattern } = useRhythmStore();

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <button
          onClick={isPlaying ? onStop : onPlay}
          disabled={!currentPattern}
          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl
            font-medium transition-all duration-200 ${
            !currentPattern 
              ? 'bg-gray-500/30 text-gray-400 cursor-not-allowed'
              : isPlaying
              ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg'
              : 'bg-green-500 hover:bg-green-600 text-white shadow-lg'
          }`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-5 h-5" />
              <span className="hidden sm:inline">Pause</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              <span className="hidden sm:inline">Play</span>
            </>
          )}
        </button>

        <button
          onClick={onToggleListening}
          disabled={!currentPattern}
          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl
            font-medium transition-all duration-200 ${
            !currentPattern
              ? 'bg-gray-500/30 text-gray-400 cursor-not-allowed'
              : isListening
              ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg animate-pulse'
              : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg'
          }`}
        >
          {isListening ? (
            <>
              <MicOff className="w-5 h-5" />
              <span className="hidden sm:inline">Stop</span>
            </>
          ) : (
            <>
              <Mic className="w-5 h-5" />
              <span className="hidden sm:inline">Listen</span>
            </>
          )}
        </button>

        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl
            bg-purple-500 hover:bg-purple-600 text-white font-medium
            transition-all duration-200 shadow-lg col-span-2 sm:col-span-2"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
};