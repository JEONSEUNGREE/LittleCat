import React from 'react';

import { TrendingUp, TrendingDown, Activity, Award, BarChart3, Target } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

export const Stats: React.FC = () => {
  const { 
    balance, 
    totalRounds, 
    maxBalance, 
    minBalance,
    history,
    getStats,
  } = useGameStore();

  const stats = getStats();
  const recentHistory = history.slice(-10).reverse();

  return (
    <div className="space-y-4">
      <div className="card">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          통계
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">총 라운드</p>
            <p className="text-xl font-bold text-gray-800">{totalRounds}</p>
          </div>
          
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">승률</p>
            <p className="text-xl font-bold text-blue-600">
              {stats.winRate.toFixed(1)}%
            </p>
          </div>
          
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">총 수익</p>
            <p className={`text-xl font-bold ${stats.totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stats.totalProfit >= 0 ? '+' : ''}₩{stats.totalProfit.toLocaleString()}
            </p>
          </div>
          
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">평균 수익</p>
            <p className={`text-xl font-bold ${stats.averageReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stats.averageReturn >= 0 ? '+' : ''}₩{Math.round(stats.averageReturn).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-green-600" />
                최고 잔액
              </span>
              <span className="text-sm font-semibold text-green-600">
                ₩{maxBalance.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 flex items-center gap-1">
                <TrendingDown className="w-4 h-4 text-red-600" />
                최저 잔액
              </span>
              <span className="text-sm font-semibold text-red-600">
                ₩{minBalance.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 flex items-center gap-1">
                <Activity className="w-4 h-4 text-blue-600" />
                현재 잔액
              </span>
              <span className="text-sm font-semibold text-blue-600">
                ₩{balance.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {recentHistory.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-purple-600" />
            최근 기록
          </h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {recentHistory.map((flip, index) => (
              <div
                key={`${flip.round}-${flip.timestamp}`}
                className={`flex justify-between items-center p-2 rounded-lg ${
                  flip.won ? 'bg-green-50' : 'bg-red-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">#{flip.round}</span>
                  <span className={`text-sm font-medium ${
                    flip.won ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {flip.choice === 'heads' ? 'H' : 'T'} → {flip.result === 'heads' ? 'H' : 'T'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-semibold ${
                    flip.won ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {flip.won ? '+' : '-'}₩{flip.betAmount.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-600">
                    (₩{flip.balanceAfter.toLocaleString()})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};