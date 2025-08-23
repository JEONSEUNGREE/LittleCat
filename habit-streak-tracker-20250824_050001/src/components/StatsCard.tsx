import React from 'react';
import { TrendingUp, Award, Target, Calendar } from 'lucide-react';
import useHabitStore from '../store/habitStore';

const StatsCard: React.FC = () => {
  const { habits, getTodayProgress } = useHabitStore();
  const todayProgress = getTodayProgress();
  
  const activeHabits = habits.filter(h => !h.isArchived);
  const totalStreakDays = activeHabits.reduce((sum, h) => sum + h.streak, 0);
  const bestStreak = Math.max(0, ...activeHabits.map(h => h.longestStreak));

  const stats = [
    {
      icon: Target,
      label: "Today's Progress",
      value: `${todayProgress.completed}/${todayProgress.total}`,
      subtext: `${todayProgress.percentage}% complete`,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      icon: TrendingUp,
      label: 'Active Habits',
      value: activeHabits.length,
      subtext: 'habits tracked',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      icon: Calendar,
      label: 'Total Streak Days',
      value: totalStreakDays,
      subtext: 'days combined',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      icon: Award,
      label: 'Best Streak',
      value: bestStreak,
      subtext: 'days record',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Your Progress</h2>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="text-center">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${stat.bgColor} ${stat.color} mb-2`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-1">{stat.subtext}</div>
              <div className="text-xs font-medium text-gray-600 mt-1">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {todayProgress.total > 0 && (
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Daily Goal</span>
            <span>{todayProgress.percentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-400 to-primary-600 transition-all duration-500 ease-out"
              style={{ width: `${todayProgress.percentage}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsCard;