import { useMemo } from 'react';
import type { TimeSlot } from '../types';

interface HeatmapChartProps {
  slots: TimeSlot[];
  bestHours: number[];
}

export function HeatmapChart({ slots, bestHours }: HeatmapChartProps) {
  const maxMinutes = useMemo(
    () => Math.max(...slots.map((s) => s.totalMinutes), 1),
    [slots]
  );

  const getIntensityClass = (minutes: number, avgFocus: number) => {
    if (minutes === 0) return 'bg-slate-100 dark:bg-slate-800';

    const intensity = minutes / maxMinutes;
    const focusBonus = avgFocus / 3;
    const combined = (intensity + focusBonus) / 2;

    if (combined > 0.7) return 'bg-primary-500';
    if (combined > 0.5) return 'bg-primary-400';
    if (combined > 0.3) return 'bg-primary-300';
    return 'bg-primary-200';
  };

  const formatHour = (hour: number) => {
    if (hour === 0) return '12AM';
    if (hour === 12) return '12PM';
    if (hour < 12) return `${hour}AM`;
    return `${hour - 12}PM`;
  };

  return (
    <div className="focus-card">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
        시간대별 집중 패턴
      </h3>

      <div className="grid grid-cols-6 gap-2 mb-4">
        {slots.map((slot) => (
          <div key={slot.hour} className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-lg transition-all duration-300 flex items-center justify-center ${getIntensityClass(
                slot.totalMinutes,
                slot.avgFocusLevel
              )} ${bestHours.includes(slot.hour) ? 'ring-2 ring-focus-high ring-offset-2' : ''}`}
              title={`${formatHour(slot.hour)}: ${slot.totalMinutes}분, 집중도 ${Math.round(
                (slot.avgFocusLevel / 3) * 100
              )}%`}
            >
              {bestHours.includes(slot.hour) && (
                <span className="text-white text-xs font-bold">★</span>
              )}
            </div>
            <span className="text-xs text-slate-500 mt-1">
              {slot.hour}시
            </span>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between text-xs text-slate-500 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
        <span>낮은 활동</span>
        <div className="flex gap-1">
          <div className="w-4 h-4 rounded bg-slate-100 dark:bg-slate-800" />
          <div className="w-4 h-4 rounded bg-primary-200" />
          <div className="w-4 h-4 rounded bg-primary-300" />
          <div className="w-4 h-4 rounded bg-primary-400" />
          <div className="w-4 h-4 rounded bg-primary-500" />
        </div>
        <span>높은 활동</span>
      </div>

      {/* Best hours recommendation */}
      {bestHours.length > 0 && (
        <div className="mt-4 p-3 bg-focus-high/10 rounded-xl">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            <span className="font-medium">🎯 최고 집중 시간대:</span>{' '}
            {bestHours.map((h) => formatHour(h)).join(', ')}
          </p>
        </div>
      )}
    </div>
  );
}
