
import { Trophy, Heart, Zap, Target } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

const ScoreBoard: React.FC = () => {
  const { score, level, highScore, lives, combo } = useGameStore();

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="bg-echo-dark bg-opacity-50 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
        {/* Main Score */}
        <div className="text-center mb-4">
          <div className="score-text text-echo-accent">
            {score.toLocaleString()}
          </div>
          <div className="text-sm text-gray-400 mt-1">Score</div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* High Score */}
          <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl p-3 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-white" />
            <div>
              <div className="text-white text-sm font-semibold">
                {highScore.toLocaleString()}
              </div>
              <div className="text-white text-opacity-80 text-xs">High Score</div>
            </div>
          </div>
          
          {/* Level */}
          <div className="bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl p-3 flex items-center gap-2">
            <Target className="w-5 h-5 text-white" />
            <div>
              <div className="text-white text-sm font-semibold">
                Level {level}
              </div>
              <div className="text-white text-opacity-80 text-xs">Current</div>
            </div>
          </div>
          
          {/* Lives */}
          <div className="bg-gradient-to-br from-red-500 to-pink-500 rounded-xl p-3 flex items-center gap-2">
            <Heart className="w-5 h-5 text-white" />
            <div>
              <div className="flex gap-1">
                {Array.from({ length: 3 }, (_, i) => (
                  <Heart
                    key={i}
                    className={`w-4 h-4 ${
                      i < lives ? 'text-white fill-white' : 'text-white text-opacity-30'
                    }`}
                  />
                ))}
              </div>
              <div className="text-white text-opacity-80 text-xs">Lives</div>
            </div>
          </div>
          
          {/* Combo */}
          <div className="bg-gradient-to-br from-green-500 to-teal-500 rounded-xl p-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-white" />
            <div>
              <div className="text-white text-sm font-semibold">
                {combo > 0 ? `x${combo}` : '-'}
              </div>
              <div className="text-white text-opacity-80 text-xs">Combo</div>
            </div>
          </div>
        </div>
        
        {/* Combo Indicator */}
        {combo > 3 && (
          <div className="mt-3 text-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-yellow-400 to-orange-400 text-white animate-bounce-in">
              <Zap className="w-3 h-3 mr-1" />
              COMBO x2 ACTIVE!
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScoreBoard;