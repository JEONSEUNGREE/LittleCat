import React from 'react';
import { TrendingDown, Calendar, PiggyBank, Target } from 'lucide-react';
import { SnowballStats } from '../types/debt';

interface StatsCardProps {
  stats: SnowballStats;
}

export const StatsCard: React.FC<StatsCardProps> = ({ stats }) => {
  const progressPercentage = stats.totalDebt > 0 
    ? (stats.totalPaid / stats.totalDebt) * 100
    : 0;

  const formatDate = (date: Date | null) => {
    if (!date) return '계산 중...';
    return new Intl.DateTimeFormat('ko-KR', { 
      year: 'numeric', 
      month: 'long' 
    }).format(date);
  };

  return (
    <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-xl p-6 text-white">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <TrendingDown className="w-7 h-7" />
        눈덩이 진행 상황
      </h2>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span>진행률</span>
          <span className="font-bold">{progressPercentage.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-white bg-opacity-20 rounded-full h-4">
          <div
            className="bg-white h-4 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white bg-opacity-10 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <PiggyBank className="w-4 h-4 text-white/80" />
            <span className="text-xs text-white/80">총 부채</span>
          </div>
          <p className="text-lg font-bold">
            ₩{stats.totalDebt.toLocaleString()}
          </p>
        </div>

        <div className="bg-white bg-opacity-10 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Target className="w-4 h-4 text-white/80" />
            <span className="text-xs text-white/80">남은 부채</span>
          </div>
          <p className="text-lg font-bold">
            ₩{stats.remainingDebt.toLocaleString()}
          </p>
        </div>

        <div className="bg-white bg-opacity-10 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-4 h-4 text-white/80" />
            <span className="text-xs text-white/80">예상 완료</span>
          </div>
          <p className="text-lg font-bold">
            {formatDate(stats.estimatedPayoffDate)}
          </p>
        </div>

        <div className="bg-white bg-opacity-10 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <TrendingDown className="w-4 h-4 text-white/80" />
            <span className="text-xs text-white/80">절약된 이자</span>
          </div>
          <p className="text-lg font-bold">
            ₩{stats.totalInterestSaved.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Next Target */}
      {stats.nextTarget && (
        <div className="mt-4 pt-4 border-t border-white/20">
          <p className="text-sm text-white/80 mb-1">다음 목표</p>
          <div className="flex justify-between items-center">
            <span className="font-semibold">{stats.nextTarget.name}</span>
            <span className="text-lg font-bold">
              ₩{stats.nextTarget.balance.toLocaleString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};