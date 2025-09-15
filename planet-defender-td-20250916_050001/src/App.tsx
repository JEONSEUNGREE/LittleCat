import React, { useEffect } from 'react';
import { GameBoard } from './components/GameBoard';
import { GameControls } from './components/GameControls';
import { TowerPanel } from './components/TowerPanel';
import { GameStats } from './components/GameStats';
import { useGameLoop } from './hooks/useGameLoop';
import { useGameStore } from './store/gameStore';

function App() {
  useGameLoop();
  
  const { health, isPlaying } = useGameStore();
  
  useEffect(() => {
    if (health <= 0 && isPlaying) {
      alert(`게임 오버! 점수: ${useGameStore.getState().score}`);
    }
  }, [health, isPlaying]);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-space-dark to-space-blue flex flex-col">
      {/* Header */}
      <header className="bg-space-dark bg-opacity-90 p-4 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          🚀 Planet Defender TD 🛸
        </h1>
        <p className="text-gray-400 text-sm mt-1">행성을 지켜라!</p>
      </header>
      
      {/* Main Game Area */}
      <div className="flex-1 container mx-auto px-4 py-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full">
          {/* Game Stats */}
          <div className="lg:col-span-12">
            <GameStats />
          </div>
          
          {/* Game Board */}
          <div className="lg:col-span-8 min-h-[400px] lg:min-h-[500px]">
            <GameBoard />
          </div>
          
          {/* Tower Panel */}
          <div className="lg:col-span-4">
            <TowerPanel />
          </div>
          
          {/* Game Controls */}
          <div className="lg:col-span-12">
            <GameControls />
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-space-dark bg-opacity-90 p-3 text-center text-gray-500 text-xs">
        <p>© 2024 Planet Defender TD - Tower Defense Game</p>
      </footer>
    </div>
  );
}

export default App;