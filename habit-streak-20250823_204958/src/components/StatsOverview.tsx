import React from 'react';
import { TrendingUp, Target, Flame, Calendar } from 'lucide-react';
import { Habit } from '../types/habit';

interface StatsOverviewProps {
  habits: Habit[];
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ habits }) => {
  const totalHabits = habits.length;
  const totalCompletions = habits.reduce((sum, habit) => sum + habit.completedDates.length, 0);
  const activeStreaks = habits.filter(h => h.streak > 0).length;
  const bestStreak = Math.max(0, ...habits.map(h => h.bestStreak));

  const stats = [
    {
      icon: Target,
      label: 'Active Habits',
      value: totalHabits,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      icon: Calendar,
      label: 'Total Completions',
      value: totalCompletions,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      icon: Flame,
      label: 'Active Streaks',
      value: activeStreaks,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      icon: TrendingUp,
      label: 'Best Streak',
      value: `${bestStreak}d`,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow"
        >
          <div className={`${stat.bgColor} ${stat.color} w-10 h-10 rounded-lg flex items-center justify-center mb-3`}>
            <stat.icon className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
          <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;