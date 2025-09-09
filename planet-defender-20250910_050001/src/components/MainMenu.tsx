import React from 'react';
import { Play, Info, Shield, Zap, Rocket } from 'lucide-react';
import useGameStore from '../store/gameStore';

const MainMenu: React.FC = () => {
  const { startGame } = useGameStore();
  const [showInstructions, setShowInstructions] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-space-dark to-space-purple">
      <div className="max-w-md w-full">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2 animate-pulse-slow">
            Planet Defender
          </h1>
          <p className="text-neon-blue text-lg">Save Your World from Invasion</p>
        </div>

        {/* Main content */}
        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-neon-blue/30">
          {!showInstructions ? (
            <>
              {/* Game preview */}
              <div className="mb-6 relative h-48 bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Shield className="w-16 h-16 text-neon-blue animate-pulse" />
                </div>
                <Rocket className="absolute top-4 left-4 w-8 h-8 text-purple-500 animate-bounce-slow" />
                <Zap className="absolute bottom-4 right-4 w-8 h-8 text-neon-green" />
                <div className="absolute top-4 right-4 w-6 h-6 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full animate-spin-slow" />
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <button
                  onClick={startGame}
                  className="w-full py-3 px-6 bg-gradient-to-r from-neon-green to-green-600 text-black font-bold rounded-lg hover:from-green-400 hover:to-green-500 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Start Game
                </button>
                
                <button
                  onClick={() => setShowInstructions(true)}
                  className="w-full py-3 px-6 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Info className="w-5 h-5" />
                  How to Play
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Instructions */}
              <div className="text-white space-y-4">
                <h2 className="text-2xl font-bold text-neon-green mb-4">How to Play</h2>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-neon-blue mt-0.5 flex-shrink-0" />
                    <p>Protect your planet (blue center) from incoming enemies</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-neon-green mt-0.5 flex-shrink-0" />
                    <p>Tap empty cells to place turrets (costs $50)</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Rocket className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <p>Tap turrets to upgrade them for better damage and range</p>
                  </div>
                  
                  <div className="bg-gray-800/50 rounded-lg p-3 mt-4">
                    <p className="font-bold text-yellow-400 mb-1">Enemy Types:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• <span className="text-gray-400">Asteroids</span> - Slow but steady</li>
                      <li>• <span className="text-purple-400">Aliens</span> - Fast and dangerous</li>
                      <li>• <span className="text-red-400">Bosses</span> - High health threats</li>
                    </ul>
                  </div>
                  
                  <p className="text-center text-neon-blue font-bold mt-4">
                    Survive as many waves as possible!
                  </p>
                </div>
                
                <button
                  onClick={() => setShowInstructions(false)}
                  className="w-full py-3 px-6 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors mt-6"
                >
                  Back
                </button>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-gray-400 text-xs">
          <p>Touch/Click to play • Mobile optimized</p>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;