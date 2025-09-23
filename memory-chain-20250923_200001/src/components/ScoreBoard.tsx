import { Trophy, Heart, Zap } from 'lucide-react';
import useGameStore from '../store/gameStore';

const ScoreBoard = () => {
  const { level, score, highScore, lives, maxLives } = useGameStore();
  
  return (
    <div className="w-full max-w-md mx-auto px-4 py-4">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-xl">
        <div className="grid grid-cols-3 gap-4 text-white">
          {/* Level */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Zap className="w-5 h-5 mr-1" />
              <span className="text-sm font-medium opacity-90">Level</span>
            </div>
            <p className="text-2xl font-bold">{level}</p>
          </div>
          
          {/* Score */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Trophy className="w-5 h-5 mr-1" />
              <span className="text-sm font-medium opacity-90">Score</span>
            </div>
            <p className="text-2xl font-bold">{score}</p>
          </div>
          
          {/* Lives */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <span className="text-sm font-medium opacity-90">Lives</span>
            </div>
            <div className="flex justify-center gap-1">
              {Array.from({ length: maxLives }, (_, i) => (
                <Heart
                  key={i}
                  className={`w-6 h-6 transition-all duration-300 ${
                    i < lives 
                      ? 'fill-red-500 text-red-500' 
                      : 'text-gray-400 opacity-30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* High Score */}
        <div className="mt-3 pt-3 border-t border-white/20">
          <div className="flex items-center justify-center text-white/80">
            <Trophy className="w-4 h-4 mr-2 text-yellow-400" />
            <span className="text-sm">High Score: </span>
            <span className="text-sm font-bold ml-1">{highScore}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;