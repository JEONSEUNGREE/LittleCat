import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Target, 
  Zap, 
  Calendar,
  Award,
  BarChart3
} from 'lucide-react';
import { useHabitStore } from '../store/habitStore';
import { format, subDays, startOfWeek, endOfWeek, eachDayOfInterval, isToday, parseISO } from 'date-fns';

const ProgressChart: React.FC = () => {
  const { getHabitsWithStats, getOverallStats, completions } = useHabitStore();
  const habits = getHabitsWithStats();
  const overallStats = getOverallStats();

  // Generate last 7 days data for chart
  const weekData = useMemo(() => {
    const today = new Date();
    const days = Array.from({ length: 7 }, (_, i) => subDays(today, 6 - i));
    
    return days.map(day => {
      const dayStr = format(day, 'yyyy-MM-dd');
      const dayCompletions = completions.filter(c => c.date === dayStr).length;
      const totalHabitsAtTime = habits.length; // Simplified - in reality would need historical data
      
      return {
        date: day,
        completions: dayCompletions,
        total: totalHabitsAtTime,
        percentage: totalHabitsAtTime > 0 ? Math.round((dayCompletions / totalHabitsAtTime) * 100) : 0,
      };
    });
  }, [habits, completions]);

  // Get best performing habits
  const topHabits = useMemo(() => {
    return habits
      .sort((a, b) => b.stats.currentStreak - a.stats.currentStreak)
      .slice(0, 3);
  }, [habits]);

  // Calculate streak insights
  const streakInsights = useMemo(() => {
    const allStreaks = habits.map(h => h.stats.currentStreak);
    const totalActiveStreaks = allStreaks.filter(s => s > 0).length;
    const averageStreak = allStreaks.length > 0 
      ? allStreaks.reduce((sum, streak) => sum + streak, 0) / allStreaks.length 
      : 0;
    const longestCurrentStreak = Math.max(...allStreaks, 0);
    
    return {
      totalActiveStreaks,
      averageStreak: Math.round(averageStreak * 10) / 10,
      longestCurrentStreak,
    };
  }, [habits]);

  const maxCompletions = Math.max(...weekData.map(d => d.completions), 1);

  if (habits.length === 0) {
    return (
      <div className="p-6 text-center">
        <BarChart3 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-600 mb-2">
          No Data Yet
        </h3>
        <p className="text-gray-500">
          Create some habits to see your progress statistics.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* Overall Stats Cards */}
      <div className="grid grid-cols-2 gap-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
        >
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Target className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-sm font-medium text-gray-600">Today</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {overallStats.completedToday}/{overallStats.totalHabits}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {overallStats.totalHabits > 0 
              ? Math.round((overallStats.completedToday / overallStats.totalHabits) * 100) 
              : 0}% complete
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
        >
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-600">Active Streaks</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {streakInsights.totalActiveStreaks}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Avg: {streakInsights.averageStreak} days
          </p>
        </motion.div>
      </div>

      {/* Weekly Progress Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
      >
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary-600" />
          <h3 className="text-lg font-semibold text-gray-900">Weekly Progress</h3>
        </div>

        <div className="space-y-4">
          {/* Chart */}
          <div className="flex items-end justify-between space-x-2 h-32">
            {weekData.map((day, index) => (
              <div key={day.date.toISOString()} className="flex-1 flex flex-col items-center">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(day.completions / maxCompletions) * 100}%` }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className={`w-full rounded-t-md transition-colors ${
                    isToday(day.date)
                      ? 'bg-primary-500'
                      : day.completions > 0
                      ? 'bg-green-400'
                      : 'bg-gray-200'
                  } min-h-[8px]`}
                />
                <div className="mt-2 text-center">
                  <p className="text-xs font-medium text-gray-700">
                    {day.completions}
                  </p>
                  <p className="text-xs text-gray-400">
                    {format(day.date, 'EEE')}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Week Summary */}
          <div className="flex items-center justify-between text-sm text-gray-600 pt-4 border-t border-gray-100">
            <span>This week</span>
            <span>
              {weekData.reduce((sum, day) => sum + day.completions, 0)} completions
            </span>
          </div>
        </div>
      </motion.div>

      {/* Top Performing Habits */}
      {topHabits.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Award className="w-5 h-5 text-yellow-600" />
            <h3 className="text-lg font-semibold text-gray-900">Top Performers</h3>
          </div>

          <div className="space-y-3">
            {topHabits.map((habit, index) => (
              <div key={habit.id} className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  index === 0 ? 'bg-yellow-100 text-yellow-700' :
                  index === 1 ? 'bg-gray-100 text-gray-700' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  {index + 1}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {habit.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {habit.stats.currentStreak} day streak • {habit.stats.completionRate}% rate
                  </p>
                </div>

                <div className={`w-3 h-3 rounded-full ${
                  habit.isCompletedToday ? 'bg-green-500' : 'bg-gray-300'
                }`} />
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Additional Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
      >
        <div className="flex items-center space-x-2 mb-4">
          <Calendar className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">Summary</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Habits</p>
            <p className="text-xl font-bold text-gray-900">
              {overallStats.totalHabits}
            </p>
          </div>
          
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Completions</p>
            <p className="text-xl font-bold text-gray-900">
              {overallStats.totalCompletions}
            </p>
          </div>
          
          <div>
            <p className="text-sm text-gray-600 mb-1">Longest Streak</p>
            <p className="text-xl font-bold text-gray-900">
              {streakInsights.longestCurrentStreak} days
            </p>
          </div>
          
          <div>
            <p className="text-sm text-gray-600 mb-1">Average Rate</p>
            <p className="text-xl font-bold text-gray-900">
              {habits.length > 0 
                ? Math.round(habits.reduce((sum, h) => sum + h.stats.completionRate, 0) / habits.length)
                : 0}%
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProgressChart;