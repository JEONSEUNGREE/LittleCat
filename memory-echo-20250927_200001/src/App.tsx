import React from 'react';
import GameMenu from './components/GameMenu';
import GamePad from './components/GamePad';
import ScoreBoard from './components/ScoreBoard';
import { useGameStore } from './store/gameStore';

function App() {
  const gameState = useGameStore(state => state.gameState);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto">
        {/* Mobile Layout */}
        <div className="lg:hidden space-y-4">
          <GameMenu />
          {gameState !== 'idle' && (
            <>
              <ScoreBoard />
              <GamePad />
            </>
          )}
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="flex flex-col justify-center">
            <GameMenu />
          </div>
          
          <div className="flex flex-col justify-center">
            {gameState !== 'idle' && <GamePad />}
            {gameState === 'idle' && (
              <div className="text-center">
                <div className="bg-echo-dark bg-opacity-50 backdrop-blur-sm rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-echo-secondary mb-4">
                    Ready to test your memory?
                  </h2>
                  <p className="text-gray-400">
                    Press "Start Game" to begin your sonic journey!
                  </p>
                  <div className="mt-6">
                    <GamePad />
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    Try pressing the buttons to hear the sounds!
                  </p>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex flex-col justify-center">
            {gameState !== 'idle' && <ScoreBoard />}
            {gameState === 'idle' && (
              <div className="bg-echo-dark bg-opacity-50 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-xl font-bold text-echo-accent mb-4">Features</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-echo-primary rounded-full"></span>
                    8 unique musical notes
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-echo-secondary rounded-full"></span>
                    20 challenging levels
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-echo-accent rounded-full"></span>
                    Combo multipliers
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    High score tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                    Mobile-friendly design
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-gray-600 text-sm">
        <p>Memory Echo © 2025 | Sound-based Memory Game</p>
      </div>
    </div>
  );
}

export default App;