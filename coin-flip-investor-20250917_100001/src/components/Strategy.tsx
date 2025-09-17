import React from 'react';
import { Brain, Shield, Zap, TrendingUp, RefreshCw, Info } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { InvestmentStrategy } from '../types';

const strategies: {
  value: InvestmentStrategy;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}[] = [
  {
    value: 'conservative',
    name: '안정형',
    description: '낮은 리스크, 작은 베팅',
    icon: <Shield className="w-4 h-4" />,
    color: 'text-blue-600',
  },
  {
    value: 'moderate',
    name: '균형형',
    description: '중간 리스크, 적절한 베팅',
    icon: <Brain className="w-4 h-4" />,
    color: 'text-green-600',
  },
  {
    value: 'aggressive',
    name: '공격형',
    description: '높은 리스크, 큰 베팅',
    icon: <Zap className="w-4 h-4" />,
    color: 'text-red-600',
  },
  {
    value: 'martingale',
    name: '마틴게일',
    description: '패배 시 베팅 2배 증가',
    icon: <TrendingUp className="w-4 h-4" />,
    color: 'text-purple-600',
  },
  {
    value: 'anti-martingale',
    name: '역마틴게일',
    description: '승리 시 베팅 증가',
    icon: <RefreshCw className="w-4 h-4" />,
    color: 'text-orange-600',
  },
];

export const Strategy: React.FC = () => {
  const { strategy, setStrategy, resetGame, achievements } = useGameStore();
  
  const unlockedAchievements = achievements.filter(a => a.unlocked);

  return (
    <div className="space-y-4">
      <div className="card">
        <h3 className="text-lg font-bold text-gray-800 mb-4">투자 전략</h3>
        
        <div className="space-y-2 mb-4">
          {strategies.map((strat) => (
            <button
              key={strat.value}
              onClick={() => setStrategy(strat.value)}
              className={`w-full p-3 rounded-lg border-2 transition-all ${
                strategy === strat.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={strat.color}>{strat.icon}</span>
                  <span className="font-medium text-gray-800">{strat.name}</span>
                </div>
                <span className="text-xs text-gray-600">{strat.description}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-yellow-800">
              <p className="font-semibold mb-1">투자 교훈</p>
              <p>실제 투자에서는 확률이 50:50이 아닙니다. 리스크 관리가 핵심입니다!</p>
            </div>
          </div>
        </div>
      </div>

      {unlockedAchievements.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-bold text-gray-800 mb-4">달성한 업적</h3>
          <div className="grid grid-cols-2 gap-2">
            {unlockedAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className="p-2 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{achievement.icon}</span>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">
                      {achievement.title}
                    </p>
                    <p className="text-xs text-gray-600">{achievement.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={resetGame}
        className="w-full p-3 bg-gray-800 text-white rounded-xl font-medium hover:bg-gray-700 transition-colors"
      >
        게임 리셋
      </button>
    </div>
  );
};