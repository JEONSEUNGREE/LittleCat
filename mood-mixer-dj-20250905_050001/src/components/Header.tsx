import React from 'react';
import { Music, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="w-full p-4 md:p-6 bg-white/10 backdrop-blur-md">
      <div className="max-w-4xl mx-auto flex items-center justify-center gap-3">
        <div className="relative">
          <Music className="w-8 h-8 md:w-10 md:h-10 text-white animate-bounce-slow" />
          <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl md:text-4xl font-bold text-white">
            Mood Mixer DJ
          </h1>
          <p className="text-xs md:text-sm text-white/70 mt-1">
            Transform your emotions into music
          </p>
        </div>
      </div>
    </header>
  );
};