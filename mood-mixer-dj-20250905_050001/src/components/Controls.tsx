import React, { useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, Gauge } from 'lucide-react';
import { useMixerStore } from '../store/useMixerStore';
import { soundGenerator } from '../utils/soundGenerator';

export const Controls: React.FC = () => {
  const { 
    isPlaying, 
    selectedMoods, 
    volume, 
    tempo,
    currentBeat,
    setPlaying, 
    setVolume, 
    setTempo,
    clearMoods,
    updateBeat
  } = useMixerStore();
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying && selectedMoods.length > 0) {
      const beatDuration = 60000 / (tempo * 4); // Quarter note duration in ms
      
      intervalRef.current = setInterval(() => {
        updateBeat();
        
        // Generate sound for current beat
        selectedMoods.forEach(mood => {
          if (mood.beats[currentBeat] === 1) {
            const frequency = soundGenerator.generateMoodFrequency(mood.intensity);
            soundGenerator.playBeat(frequency, 0.1, volume * mood.intensity);
          }
        });
      }, beatDuration);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      soundGenerator.stop();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      soundGenerator.stop();
    };
  }, [isPlaying, selectedMoods, tempo, volume, currentBeat, updateBeat]);

  const handlePlayPause = () => {
    if (selectedMoods.length === 0) return;
    setPlaying(!isPlaying);
  };

  const handleReset = () => {
    setPlaying(false);
    clearMoods();
    soundGenerator.stop();
  };

  return (
    <div className="w-full p-4 md:p-6 space-y-4">
      {/* Play Controls */}
      <div className="flex justify-center gap-4">
        <button
          onClick={handlePlayPause}
          disabled={selectedMoods.length === 0}
          className={`
            p-4 md:p-5 rounded-full transition-all duration-300
            ${selectedMoods.length === 0 
              ? 'bg-gray-600 cursor-not-allowed opacity-50' 
              : isPlaying
                ? 'bg-red-500 hover:bg-red-600 shadow-lg transform hover:scale-105'
                : 'bg-green-500 hover:bg-green-600 shadow-lg transform hover:scale-105'
            }
          `}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 md:w-8 md:h-8 text-white" />
          ) : (
            <Play className="w-6 h-6 md:w-8 md:h-8 text-white" />
          )}
        </button>
        
        <button
          onClick={handleReset}
          className="p-4 md:p-5 rounded-full bg-purple-500 hover:bg-purple-600 
                   transition-all duration-300 shadow-lg transform hover:scale-105"
        >
          <RotateCcw className="w-6 h-6 md:w-8 md:h-8 text-white" />
        </button>
      </div>

      {/* Volume Control */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-white/80">
          <Volume2 className="w-4 h-4 md:w-5 md:h-5" />
          <span className="text-sm md:text-base">Volume: {volume}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer
                   [&::-webkit-slider-thumb]:appearance-none
                   [&::-webkit-slider-thumb]:w-4
                   [&::-webkit-slider-thumb]:h-4
                   [&::-webkit-slider-thumb]:rounded-full
                   [&::-webkit-slider-thumb]:bg-white
                   [&::-webkit-slider-thumb]:cursor-pointer
                   [&::-webkit-slider-thumb]:shadow-lg"
        />
      </div>

      {/* Tempo Control */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-white/80">
          <Gauge className="w-4 h-4 md:w-5 md:h-5" />
          <span className="text-sm md:text-base">Tempo: {tempo} BPM</span>
        </div>
        <input
          type="range"
          min="60"
          max="180"
          value={tempo}
          onChange={(e) => setTempo(Number(e.target.value))}
          className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer
                   [&::-webkit-slider-thumb]:appearance-none
                   [&::-webkit-slider-thumb]:w-4
                   [&::-webkit-slider-thumb]:h-4
                   [&::-webkit-slider-thumb]:rounded-full
                   [&::-webkit-slider-thumb]:bg-white
                   [&::-webkit-slider-thumb]:cursor-pointer
                   [&::-webkit-slider-thumb]:shadow-lg"
        />
      </div>

      {/* Status Display */}
      {isPlaying && (
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-white/80">Playing Beat {currentBeat + 1}/16</span>
          </div>
        </div>
      )}
    </div>
  );
};