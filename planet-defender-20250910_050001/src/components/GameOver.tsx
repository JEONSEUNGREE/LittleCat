
import { Trophy, RotateCcw, Home, Target, Coins } from 'lucide-react';
import useGameStore from '../store/gameStore';

const GameOver: React.FC = () => {
  const { score, wave, startGame } = useGameStore();
  
  // Calculate rating based on score
  const getRating = () => {
    if (score >= 1000) return { stars: 3, text: 'Legendary Defender!' };
    if (score >= 500) return { stars: 2, text: 'Great Commander!' };
    if (score >= 200) return { stars: 1, text: 'Good Effort!' };
    return { stars: 0, text: 'Keep Practicing!' };
  };
  
  const rating = getRating();

  return (
    <div className="absolute inset-0 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm z-20">
      <div className="max-w-sm w-full bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 border border-danger-red/50">
        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-danger-red mb-2">Game Over</h2>
          <p className="text-gray-400">Your planet has been destroyed!</p>
        </div>

        {/* Stats */}
        <div className="bg-black/50 rounded-lg p-4 mb-6 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="text-gray-400">Final Score</span>
            </div>
            <span className="text-white font-bold text-xl">{score}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-500" />
              <span className="text-gray-400">Waves Survived</span>
            </div>
            <span className="text-white font-bold text-xl">{wave - 1}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-green-500" />
              <span className="text-gray-400">Enemies Defeated</span>
            </div>
            <span className="text-white font-bold text-xl">{Math.floor(score / 10)}</span>
          </div>
        </div>

        {/* Rating */}
        <div className="text-center mb-6">
          <div className="flex justify-center gap-1 mb-2">
            {[1, 2, 3].map((star) => (
              <div
                key={star}
                className={`text-3xl ${
                  star <= rating.stars ? 'text-yellow-400' : 'text-gray-600'
                }`}
              >
                ★
              </div>
            ))}
          </div>
          <p className="text-neon-blue font-bold">{rating.text}</p>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={startGame}
            className="w-full py-3 px-6 bg-gradient-to-r from-neon-green to-green-600 text-black font-bold rounded-lg hover:from-green-400 hover:to-green-500 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 px-6 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Main Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOver;