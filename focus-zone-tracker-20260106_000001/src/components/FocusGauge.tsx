import { useMemo } from 'react';
import { Target, TrendingUp, Clock } from 'lucide-react';

interface FocusGaugeProps {
  focusLevel: number; // 0-3 scale
  totalMinutes: number;
  isActive: boolean;
}

export function FocusGauge({ focusLevel, totalMinutes, isActive }: FocusGaugeProps) {
  const percentage = useMemo(() => Math.round((focusLevel / 3) * 100), [focusLevel]);

  const strokeDasharray = 2 * Math.PI * 45;
  const strokeDashoffset = strokeDasharray - (strokeDasharray * percentage) / 100;

  const getColorClass = () => {
    if (percentage >= 70) return 'text-focus-high';
    if (percentage >= 40) return 'text-focus-medium';
    return 'text-focus-low';
  };

  const getGradientId = () => {
    if (percentage >= 70) return 'gaugeGradientHigh';
    if (percentage >= 40) return 'gaugeGradientMedium';
    return 'gaugeGradientLow';
  };

  return (
    <div className="focus-card text-center">
      <div className="relative inline-flex items-center justify-center">
        <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="gaugeGradientHigh" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#16a34a" />
            </linearGradient>
            <linearGradient id="gaugeGradientMedium" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>
            <linearGradient id="gaugeGradientLow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
          </defs>

          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-slate-200 dark:text-slate-700"
          />

          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={`url(#${getGradientId()})`}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-bold ${getColorClass()}`}>
            {percentage}%
          </span>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            집중도
          </span>
          {isActive && (
            <div className="mt-1 flex items-center gap-1 text-primary-500">
              <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
              <span className="text-xs">추적 중</span>
            </div>
          )}
        </div>
      </div>

      {/* Stats below gauge */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-primary-500">
            <Target size={16} />
          </div>
          <span className="text-lg font-semibold text-slate-800 dark:text-slate-200">
            {percentage}%
          </span>
          <span className="text-xs text-slate-500">평균 집중</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-focus-high">
            <TrendingUp size={16} />
          </div>
          <span className="text-lg font-semibold text-slate-800 dark:text-slate-200">
            {Math.round(totalMinutes / 60)}h
          </span>
          <span className="text-xs text-slate-500">총 집중</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-focus-medium">
            <Clock size={16} />
          </div>
          <span className="text-lg font-semibold text-slate-800 dark:text-slate-200">
            {totalMinutes}m
          </span>
          <span className="text-xs text-slate-500">오늘</span>
        </div>
      </div>
    </div>
  );
}
