import React from 'react';
import GameBoard from './components/GameBoard';
import GravityControls from './components/GravityControls';
import LevelInfo from './components/LevelInfo';
import { Compass } from 'lucide-react';

function App() {
  return (
    <div className="w-full h-screen flex flex-col bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 overflow-hidden">
      {/* Header */}
      <header className="p-4 text-center bg-black/20 backdrop-blur-sm">
        <div className="flex items-center justify-center gap-2">
          <Compass className="w-8 h-8 text-white animate-rotate-slow" />
          <h1 className="text-3xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Gravity Flip Puzzle
          </h1>
        </div>
        <p className="text-white/70 text-sm mt-1">
          Manipulate gravity to reach the goal!
        </p>
      </header>

      {/* Main Game Area */}
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-4 p-4 overflow-auto">
        {/* Left Panel - Level Info (Desktop) / Top (Mobile) */}
        <div className="w-full lg:w-80 order-1 lg:order-1">
          <LevelInfo />
        </div>

        {/* Center - Game Board */}
        <div className="w-full max-w-lg aspect-square order-3 lg:order-2">
          <GameBoard />
        </div>

        {/* Right Panel - Controls (Desktop) / Bottom (Mobile) */}
        <div className="w-full lg:w-80 order-2 lg:order-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-lg">
            <h3 className="text-white font-semibold mb-3 text-center">
              Gravity Controls
            </h3>
            <GravityControls />
            
            <div className="mt-4 p-3 bg-white/5 rounded-lg">
              <h4 className="text-white/80 text-sm font-semibold mb-2">How to Play:</h4>
              <ul className="text-white/60 text-xs space-y-1">
                <li>• Use arrow buttons to change gravity direction</li>
                <li>• Guide the blue player to the green goal</li>
                <li>• Push boxes to clear paths</li>
                <li>• Avoid red spikes</li>
                <li>• Complete in minimum moves for more stars!</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-2 text-center bg-black/20 backdrop-blur-sm">
        <p className="text-white/50 text-xs">
          © 2025 Gravity Flip Puzzle - Physics-based puzzle game
        </p>
      </footer>
    </div>
  );
}

export default App;