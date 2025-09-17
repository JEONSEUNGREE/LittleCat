import React, { useEffect, useRef } from 'react';
import { useBeatStore } from '../store/useBeatStore';
import { audioEngine } from '../utils/audioEngine';
import { Volume2, VolumeX, Trash2 } from 'lucide-react';

export const Sequencer: React.FC = () => {
  const { 
    pattern, 
    isPlaying, 
    currentStep, 
    bpm,
    toggleStep, 
    updateCurrentStep,
    toggleMute,
    setVolume,
    removeTrack
  } = useBeatStore();
  
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPlaying) {
      const stepDuration = (60 / bpm / 4) * 1000; // 16th notes
      let step = 0;
      
      const playStep = () => {
        updateCurrentStep(step);
        
        // Play sounds for active steps
        pattern.tracks.forEach(track => {
          if (!track.muted && track.steps[step]) {
            audioEngine.playSound(track.sound, track.volume);
          }
        });
        
        step = (step + 1) % 16;
      };
      
      playStep(); // Play first step immediately
      intervalRef.current = window.setInterval(playStep, stepDuration);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      updateCurrentStep(-1);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, bpm, pattern, updateCurrentStep]);

  return (
    <div className="w-full space-y-3">
      {/* Step numbers */}
      <div className="flex items-center gap-2 pl-[140px] pr-[60px]">
        {Array.from({ length: 16 }, (_, i) => (
          <div
            key={i}
            className="flex-1 text-center text-xs text-gray-400 font-mono"
          >
            {i + 1}
          </div>
        ))}
      </div>
      
      {/* Tracks */}
      {pattern.tracks.map((track) => (
        <div key={track.id} className="flex items-center gap-2">
          {/* Track controls */}
          <div className="w-[140px] flex items-center gap-2">
            <button
              onClick={() => toggleMute(track.id)}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              {track.muted ? (
                <VolumeX className="w-4 h-4 text-gray-500" />
              ) : (
                <Volume2 className="w-4 h-4 text-beat-secondary" />
              )}
            </button>
            
            <span className="text-sm text-white font-medium flex-1">
              {track.name}
            </span>
            
            <input
              type="range"
              min="0"
              max="100"
              value={track.volume * 100}
              onChange={(e) => setVolume(track.id, Number(e.target.value) / 100)}
              className="w-12 bpm-slider"
            />
            
            {pattern.tracks.length > 1 && (
              <button
                onClick={() => removeTrack(track.id)}
                className="p-1 rounded hover:bg-gray-700 transition-colors"
              >
                <Trash2 className="w-3 h-3 text-gray-500" />
              </button>
            )}
          </div>
          
          {/* Steps */}
          <div className="flex gap-2 flex-1">
            {track.steps.map((isActive, stepIndex) => (
              <button
                key={stepIndex}
                onClick={() => toggleStep(track.id, stepIndex)}
                className={`
                  sequencer-step flex-1 aspect-square
                  ${isActive ? 'active' : ''}
                  ${currentStep === stepIndex && isPlaying ? 'playing' : ''}
                  ${stepIndex % 4 === 0 ? 'border-yellow-600/50' : ''}
                `}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};