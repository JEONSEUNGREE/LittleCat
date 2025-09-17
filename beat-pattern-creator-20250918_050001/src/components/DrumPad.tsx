import React from 'react';
import { SoundType } from '../types';
import { audioEngine } from '../utils/audioEngine';
import { Music } from 'lucide-react';

interface DrumPadProps {
  sound: SoundType;
  label: string;
  isActive?: boolean;
  volume?: number;
}

export const DrumPad: React.FC<DrumPadProps> = ({ 
  sound, 
  label, 
  isActive = false,
  volume = 0.7 
}) => {
  const [isPressed, setIsPressed] = React.useState(false);

  const handlePlay = () => {
    audioEngine.init();
    audioEngine.playSound(sound, volume);
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 100);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    handlePlay();
  };

  return (
    <button
      className={`drum-pad ${isPressed || isActive ? 'active' : ''} 
        flex flex-col items-center justify-center gap-2 p-4 min-h-[100px]`}
      onMouseDown={handlePlay}
      onTouchStart={handleTouchStart}
    >
      <Music className="w-6 h-6 text-white/80" />
      <span className="text-white font-bold text-sm uppercase tracking-wider">
        {label}
      </span>
    </button>
  );
};