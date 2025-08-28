import React from 'react';
import { Trophy, Target, Zap, Clock, RotateCcw, Home, Star } from 'lucide-react';
import { GameStats } from '../types/game';

interface ResultScreenProps {
  stats: GameStats;
  onRestart: () => void;
  onHome: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ stats, onRestart, onHome }) => {
  const accuracy = stats.totalProblems > 0 
    ? Math.round((stats.correctAnswers / stats.totalProblems) * 100) 
    : 0;
  
  const getRating = () => {
    if (stats.score >= 1000) return { stars: 5, text: '천재적인 실력!', color: 'text-yellow-500' };
    if (stats.score >= 700) return { stars: 4, text: '뛰어난 실력!', color: 'text-yellow-400' };
    if (stats.score >= 400) return { stars: 3, text: '좋은 실력!', color: 'text-blue-500' };
    if (stats.score >= 200) return { stars: 2, text: '계속 연습해보세요!', color: 'text-green-500' };
    return { stars: 1, text: '포기하지 마세요!', color: 'text-gray-500' };
  };

  const rating = getRating();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-600 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-6 animate-slide-up">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg mb-4">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">게임 종료!</h1>
          
          {/* Stars Rating */}
          <div className="flex justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-8 h-8 ${i < rating.stars ? rating.color : 'text-gray-300'}`}
                fill={i < rating.stars ? 'currentColor' : 'none'}
              />
            ))}
          </div>
          <p className={`${rating.color} font-semibold`}>{rating.text}</p>
        </div>

        {/* Score Display */}
        <div className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl p-4 mb-4">
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-1">최종 점수</p>
            <p className="text-4xl font-bold text-purple-600">{stats.score}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Target className="w-4 h-4" />
              <span className="text-xs">정답률</span>
            </div>
            <p className="text-xl font-bold text-gray-800">{accuracy}%</p>
            <p className="text-xs text-gray-500">{stats.correctAnswers}/{stats.totalProblems}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Zap className="w-4 h-4" />
              <span className="text-xs">최고 연속</span>
            </div>
            <p className="text-xl font-bold text-gray-800">{stats.bestStreak}</p>
            <p className="text-xs text-gray-500">연속 정답</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Clock className="w-4 h-4" />
              <span className="text-xs">평균 시간</span>
            </div>
            <p className="text-xl font-bold text-gray-800">
              {stats.averageTime.toFixed(1)}초
            </p>
            <p className="text-xs text-gray-500">문제당</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Trophy className="w-4 h-4" />
              <span className="text-xs">도달 레벨</span>
            </div>
            <p className="text-xl font-bold text-gray-800">레벨 {stats.level}</p>
            <p className="text-xs text-gray-500">난이도</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onRestart}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-4 rounded-lg transform transition hover:scale-105 active:scale-95 shadow-lg"
          >
            <RotateCcw className="w-5 h-5" />
            <span>다시 하기</span>
          </button>

          <button
            onClick={onHome}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transform transition hover:scale-105 active:scale-95 shadow-lg"
          >
            <Home className="w-5 h-5" />
            <span>홈으로</span>
          </button>
        </div>

        {/* Motivational Message */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            {stats.score >= 500 
              ? '훌륭한 성과입니다! 계속해서 도전하세요!' 
              : '연습이 완벽을 만듭니다! 다시 도전해보세요!'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;