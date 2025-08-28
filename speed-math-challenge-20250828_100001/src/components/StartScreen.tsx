
import { Brain, Trophy, Zap, Target } from 'lucide-react';
import { Difficulty } from '../types/game';

interface StartScreenProps {
  onStart: (difficulty: Difficulty) => void;
  highScore: number;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart, highScore }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full animate-slide-up">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-4">
            <Brain className="w-10 h-10 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Speed Math Challenge</h1>
          <p className="text-purple-100">빠른 계산으로 뇌를 단련하세요!</p>
        </div>

        {highScore > 0 && (
          <div className="bg-white/20 backdrop-blur rounded-lg p-4 mb-6 text-center">
            <div className="flex items-center justify-center gap-2 text-yellow-300">
              <Trophy className="w-5 h-5" />
              <span className="font-semibold">최고 점수: {highScore}</span>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={() => onStart('easy')}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg transform transition hover:scale-105 active:scale-95 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span>쉬움</span>
              <span className="text-sm opacity-75">1~10 더하기/빼기</span>
            </div>
          </button>

          <button
            onClick={() => onStart('medium')}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-6 rounded-lg transform transition hover:scale-105 active:scale-95 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span>보통</span>
              <span className="text-sm opacity-75">곱하기 포함</span>
            </div>
          </button>

          <button
            onClick={() => onStart('hard')}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-lg transform transition hover:scale-105 active:scale-95 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span>어려움</span>
              <span className="text-sm opacity-75">나누기 포함</span>
            </div>
          </button>

          <button
            onClick={() => onStart('expert')}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-lg transform transition hover:scale-105 active:scale-95 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span>전문가</span>
              <span className="text-sm opacity-75">큰 숫자 계산</span>
            </div>
          </button>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4 text-center text-white">
          <div className="bg-white/10 backdrop-blur rounded-lg p-3">
            <Zap className="w-6 h-6 mx-auto mb-1 text-yellow-300" />
            <p className="text-xs">빠른 반응</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-3">
            <Target className="w-6 h-6 mx-auto mb-1 text-green-300" />
            <p className="text-xs">정확한 계산</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-3">
            <Trophy className="w-6 h-6 mx-auto mb-1 text-orange-300" />
            <p className="text-xs">연속 정답</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;