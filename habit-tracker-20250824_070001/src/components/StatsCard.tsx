import React from 'react';
import { TrendingUp, Calendar, Award, Zap } from 'lucide-react';
import useHabitStore from '../store/useHabitStore';

const StatsCard: React.FC = () => {
  const { habits, logs } = useHabitStore();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayLogs = logs.filter(
    (log) =>
      new Date(log.date).toDateString() === today.toDateString() && log.completed
  );

  const totalHabits = habits.length;
  const completedToday = todayLogs.length;
  const completionRate = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;
  const totalStreak = habits.reduce((sum, habit) => sum + habit.streak, 0);

  const stats = [
    {
      icon: TrendingUp,
      label: '오늘 완료',
      value: `${completedToday}/${totalHabits}`,
      color: 'bg-blue-500',
    },
    {
      icon: Calendar,
      label: '완료율',
      value: `${completionRate}%`,
      color: 'bg-green-500',
    },
    {
      icon: Award,
      label: '총 연속일',
      value: totalStreak,
      color: 'bg-purple-500',
    },
    {
      icon: Zap,
      label: '활성 습관',
      value: totalHabits,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-xl">
      <h2 className="text-white text-xl font-bold mb-6">오늘의 통계</h2>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/20 transition-all"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-white/70">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {totalHabits === 0 && (
        <div className="mt-6 p-4 bg-white/10 rounded-xl">
          <p className="text-white/80 text-center text-sm">
            첫 번째 습관을 추가하고 여정을 시작하세요!
          </p>
        </div>
      )}

      {completionRate === 100 && totalHabits > 0 && (
        <div className="mt-6 p-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl">
          <p className="text-white font-semibold text-center">
            🎉 오늘의 모든 습관을 완료했어요!
          </p>
        </div>
      )}
    </div>
  );
};

export default StatsCard;