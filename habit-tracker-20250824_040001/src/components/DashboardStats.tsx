import React from 'react';
import { TrendingUp, Calendar, Target, Award } from 'lucide-react';
import { useHabitStore } from '../store/habitStore';

export const DashboardStats: React.FC = () => {
  const habits = useHabitStore((state) => state.habits);
  const today = new Date().toISOString().split('T')[0];
  
  const todayHabits = habits.filter((habit) => {
    const dayOfWeek = new Date().getDay();
    return habit.targetDays.includes(dayOfWeek);
  });
  
  const completedToday = todayHabits.filter((habit) =>
    habit.completedDates.includes(today)
  ).length;
  
  const totalCompleted = habits.reduce(
    (sum, habit) => sum + habit.completedDates.length,
    0
  );
  
  const longestStreak = Math.max(0, ...habits.map((h) => h.streak));
  const completionRate = todayHabits.length > 0 
    ? Math.round((completedToday / todayHabits.length) * 100)
    : 0;
  
  const stats = [
    {
      icon: <Target className="w-5 h-5" />,
      label: '오늘 완료',
      value: `${completedToday}/${todayHabits.length}`,
      color: 'bg-blue-500',
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      label: '완료율',
      value: `${completionRate}%`,
      color: 'bg-green-500',
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: '총 완료',
      value: totalCompleted.toString(),
      color: 'bg-purple-500',
    },
    {
      icon: <Award className="w-5 h-5" />,
      label: '최장 연속',
      value: `${longestStreak}일`,
      color: 'bg-orange-500',
    },
  ];
  
  return (
    <div className="grid grid-cols-2 gap-3 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="glass-effect rounded-2xl p-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-xl text-white ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-xs text-gray-600">{stat.label}</p>
              <p className="text-xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};