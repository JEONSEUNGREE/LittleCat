
import { useGameStore } from '../store/gameStore';
import { Play, Trophy, Zap, Target } from 'lucide-react';

const StartScreen: React.FC = () => {
  const { startGame, highScore } = useGameStore();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-4 animate-pulse">
            Word Cascade
          </h1>
          <p className="text-xl text-white/70">폭포처럼 떨어지는 단어를 잡아라!</p>
        </div>
        
        {/* High Score */}
        {highScore > 0 && (
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 mb-6 text-center">
            <div className="flex items-center justify-center gap-2">
              <Trophy className="text-yellow-400" size={24} />
              <span className="text-white text-lg">최고 점수: {highScore}</span>
            </div>
          </div>
        )}
        
        {/* Game Rules */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4 text-center">게임 방법</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Zap className="text-yellow-400 mt-1 flex-shrink-0" size={20} />
              <p className="text-white/80 text-sm">떨어지는 단어를 타이핑하여 제거하세요</p>
            </div>
            <div className="flex items-start gap-3">
              <Target className="text-blue-400 mt-1 flex-shrink-0" size={20} />
              <p className="text-white/80 text-sm">연속으로 단어를 맞추면 콤보 보너스!</p>
            </div>
            <div className="flex items-start gap-3">
              <Trophy className="text-green-400 mt-1 flex-shrink-0" size={20} />
              <p className="text-white/80 text-sm">10단어마다 레벨 업! 속도가 빨라집니다</p>
            </div>
          </div>
        </div>
        
        {/* Start Button */}
        <button
          onClick={startGame}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all transform hover:scale-105 shadow-lg"
        >
          <Play size={24} />
          <span className="text-xl">게임 시작</span>
        </button>
        
        {/* Footer */}
        <div className="mt-8 text-center text-white/50 text-sm">
          <p>Enter 또는 Space로 단어 입력</p>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;