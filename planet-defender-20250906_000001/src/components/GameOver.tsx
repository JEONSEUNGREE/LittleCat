
import { useGameStore } from '../store/gameStore';
import { Trophy, RotateCcw, Home } from 'lucide-react';

export const GameOver: React.FC = () => {
  const { score, wave, reset, startGame } = useGameStore();

  const handleRestart = () => {
    reset();
    startGame();
  };

  const handleMenu = () => {
    reset();
  };

  return (
    <div className="absolute inset-0 bg-gradient-to-b from-space-dark/90 to-space-blue/90 backdrop-blur flex flex-col items-center justify-center p-8 z-20">
      <div className="bg-black/50 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h2 className="text-4xl font-bold text-enemy-red mb-4">GAME OVER</h2>
        
        <div className="mb-6 space-y-4">
          <div className="bg-white/10 rounded-lg p-4">
            <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-2" />
            <p className="text-white text-sm mb-1">Final Score</p>
            <p className="text-3xl font-bold text-yellow-400">{score}</p>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-white text-sm mb-1">Waves Survived</p>
            <p className="text-2xl font-bold text-cyan-400">{wave - 1}</p>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleRestart}
            className="w-full bg-gradient-to-r from-planet-green to-emerald-600 text-white py-3 px-6 rounded-lg font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            PLAY AGAIN
          </button>
          
          <button
            onClick={handleMenu}
            className="w-full bg-gray-700 text-white py-3 px-6 rounded-lg font-bold hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            MAIN MENU
          </button>
        </div>
      </div>
    </div>
  );
};