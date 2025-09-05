import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Rocket, Shield, Zap, PlayCircle } from 'lucide-react';

export const MainMenu: React.FC = () => {
  const { startGame } = useGameStore();

  return (
    <div className="absolute inset-0 bg-gradient-to-b from-space-dark to-space-blue flex flex-col items-center justify-center p-8">
      {/* Stars background */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Title */}
      <div className="relative z-10 text-center mb-8">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-wider">
          PLANET
          <span className="block text-planet-green glow">DEFENDER</span>
        </h1>
        <p className="text-gray-300 text-lg">Save your planet from alien invasion!</p>
      </div>

      {/* Game icons */}
      <div className="relative z-10 flex gap-6 mb-8">
        <div className="text-center">
          <Rocket className="w-12 h-12 text-enemy-red mb-2 animate-float" />
          <span className="text-white text-xs">Enemies</span>
        </div>
        <div className="text-center">
          <Shield className="w-12 h-12 text-cyan-500 mb-2 animate-float" style={{ animationDelay: '1s' }} />
          <span className="text-white text-xs">Defend</span>
        </div>
        <div className="text-center">
          <Zap className="w-12 h-12 text-laser-yellow mb-2 animate-float" style={{ animationDelay: '2s' }} />
          <span className="text-white text-xs">Attack</span>
        </div>
      </div>

      {/* Play button */}
      <button
        onClick={startGame}
        className="relative z-10 bg-gradient-to-r from-planet-green to-emerald-600 text-white px-8 py-4 rounded-full font-bold text-xl hover:scale-105 transition-transform flex items-center gap-3 glow"
      >
        <PlayCircle className="w-8 h-8" />
        START GAME
      </button>

      {/* Instructions */}
      <div className="relative z-10 mt-8 text-center max-w-md">
        <h3 className="text-white font-bold mb-2">How to Play:</h3>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>• Tap around the planet to place defense towers</li>
          <li>• Towers automatically attack nearby enemies</li>
          <li>• Don't let enemies reach your planet!</li>
          <li>• Earn coins by destroying enemies</li>
          <li>• Survive as many waves as possible</li>
        </ul>
      </div>
    </div>
  );
};