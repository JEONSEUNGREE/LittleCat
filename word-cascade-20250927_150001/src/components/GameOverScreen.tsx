
import { useGameStore } from '../store/gameStore';
import { Trophy, Star, Target, RefreshCw, Home } from 'lucide-react';

const GameOverScreen: React.FC = () => {
  const { score, highScore, completedWords, level, startGame } = useGameStore();
  const isNewHighScore = score === highScore && score > 0;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900/20 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Game Over Title */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-red-500 mb-4">
            GAME OVER
          </h1>
          {isNewHighScore && (
            <div className="text-yellow-400 text-xl font-bold animate-bounce">
              🎉 새로운 최고 기록! 🎉
            </div>
          )}
        </div>
        
        {/* Score Summary */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-6 space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Star className="text-yellow-400" size={24} />
              <span className="text-white text-lg">점수</span>
            </div>
            <span className="text-2xl font-bold text-white">{score}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Trophy className="text-orange-400" size={24} />
              <span className="text-white text-lg">최고 점수</span>
            </div>
            <span className="text-2xl font-bold text-white">{highScore}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Target className="text-blue-400" size={24} />
              <span className="text-white text-lg">완료한 단어</span>
            </div>
            <span className="text-2xl font-bold text-white">{completedWords}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-slate-900">{level}</span>
              </div>
              <span className="text-white text-lg">도달 레벨</span>
            </div>
            <span className="text-2xl font-bold text-white">LV.{level}</span>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={startGame}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all transform hover:scale-105 shadow-lg"
          >
            <RefreshCw size={24} />
            <span className="text-xl">다시 플레이</span>
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all"
          >
            <Home size={24} />
            <span className="text-xl">메인으로</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverScreen;