import React from 'react';
import { Trophy, Calendar, Zap, TrendingUp } from 'lucide-react';
import useHabitStore from '../store/habitStore';

const ProgressHeader: React.FC = () => {
  const { habits, getTodayProgress } = useHabitStore();
  const progress = getTodayProgress();
  
  const getTotalStreak = () => {
    if (habits.length === 0) return 0;
    return Math.max(...habits.map(h => h.currentStreak));
  };

  const getWeeklyCompletion = () => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekAgoStr = weekAgo.toISOString().split('T')[0];
    
    let totalPossible = 0;
    let totalCompleted = 0;
    
    habits.forEach(habit => {
      totalPossible += 7;
      totalCompleted += habit.completedDates.filter(date => date >= weekAgoStr).length;
    });
    
    return totalPossible > 0 ? Math.round((totalCompleted / totalPossible) * 100) : 0;
  };

  const getDayOfWeek = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date().getDay()];
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white p-6 rounded-b-3xl shadow-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">{getGreeting()}! 👋</h1>
        <p className="text-primary-100">Happy {getDayOfWeek()}, let's build great habits!</p>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary-200" />
            <span className="font-medium">Today's Progress</span>
          </div>
          <span className="text-2xl font-bold">{progress.percentage}%</span>
        </div>
        
        <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-white h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress.percentage}%` }}
          />
        </div>
        
        <div className="mt-2 text-sm text-primary-100">
          {progress.completed} of {progress.total} habits completed
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
          <Trophy className="w-6 h-6 mx-auto mb-1 text-yellow-300" />
          <div className="text-xl font-bold">{getTotalStreak()}</div>
          <div className="text-xs text-primary-100">Best Streak</div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
          <Zap className="w-6 h-6 mx-auto mb-1 text-orange-300" />
          <div className="text-xl font-bold">{habits.length}</div>
          <div className="text-xs text-primary-100">Active Habits</div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
          <TrendingUp className="w-6 h-6 mx-auto mb-1 text-green-300" />
          <div className="text-xl font-bold">{getWeeklyCompletion()}%</div>
          <div className="text-xs text-primary-100">Week Rate</div>
        </div>
      </div>
    </div>
  );
};

export default ProgressHeader;