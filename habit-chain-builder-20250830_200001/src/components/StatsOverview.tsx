import { TrendingUp, Target, Award, Zap, Calendar, Brain } from 'lucide-react';
import { UserStats, Habit } from '../types';

interface StatsOverviewProps {
  stats: UserStats;
  habits: Habit[];
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ stats, habits }) => {
  const getBestStreak = () => {
    return Math.max(0, ...habits.map(h => h.streakData.longestStreak));
  };

  const getAverageCompletion = () => {
    if (habits.length === 0) return 0;
    const total = habits.reduce((sum, h) => sum + h.streakData.totalCompletions, 0);
    return Math.round(total / habits.length);
  };

  const getMostConsistentHabit = () => {
    return habits.reduce((best, habit) => {
      if (!best || habit.streakData.currentStreak > best.streakData.currentStreak) {
        return habit;
      }
      return best;
    }, null as Habit | null);
  };

  const mostConsistent = getMostConsistentHabit();

  const statCards = [
    {
      icon: TrendingUp,
      label: 'Active Chains',
      value: stats.activeChains,
      color: 'from-blue-500 to-blue-600',
      shadowColor: 'shadow-blue-500/25',
    },
    {
      icon: Target,
      label: 'Total Habits',
      value: stats.totalHabits,
      color: 'from-purple-500 to-purple-600',
      shadowColor: 'shadow-purple-500/25',
    },
    {
      icon: Award,
      label: 'Best Streak',
      value: `${getBestStreak()} days`,
      color: 'from-orange-500 to-red-500',
      shadowColor: 'shadow-orange-500/25',
    },
    {
      icon: Zap,
      label: 'Completions',
      value: stats.totalCompletions,
      color: 'from-yellow-500 to-yellow-600',
      shadowColor: 'shadow-yellow-500/25',
    },
    {
      icon: Calendar,
      label: 'Avg. per Habit',
      value: getAverageCompletion(),
      color: 'from-green-500 to-green-600',
      shadowColor: 'shadow-green-500/25',
    },
    {
      icon: Brain,
      label: 'Your Level',
      value: `Lvl ${stats.level}`,
      color: 'from-pink-500 to-pink-600',
      shadowColor: 'shadow-pink-500/25',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`glass-card p-4 ${
                index === statCards.length - 1 && statCards.length % 2 !== 0
                  ? 'col-span-2'
                  : ''
              }`}
            >
              <div
                className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} ${stat.shadowColor} shadow-lg flex items-center justify-center mb-3`}
              >
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Experience Bar */}
      <div className="glass-card p-5">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-gray-800">Experience Progress</h3>
          <span className="text-sm font-bold text-primary-600">
            {stats.experience}/{stats.nextLevelXP} XP
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full transition-all duration-500 ease-out relative"
            style={{ width: `${(stats.experience / stats.nextLevelXP) * 100}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Complete habits to earn XP and level up!
        </p>
      </div>

      {/* Most Consistent Habit */}
      {mostConsistent && (
        <div className="glass-card p-5">
          <h3 className="font-semibold text-gray-800 mb-3">Most Consistent Habit</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{mostConsistent.icon}</div>
              <div>
                <div className="font-medium text-gray-800">{mostConsistent.name}</div>
                <div className="text-sm text-gray-600">
                  {mostConsistent.streakData.currentStreak} day streak
                </div>
              </div>
            </div>
            <div className="text-2xl">🔥</div>
          </div>
        </div>
      )}

      {/* Motivational Quote */}
      <div className="glass-card p-5 bg-gradient-to-br from-primary-50 to-primary-100/50">
        <p className="text-center text-gray-700 font-medium italic">
          "Success is the sum of small efforts repeated day in and day out."
        </p>
        <p className="text-center text-sm text-gray-500 mt-2">- Robert Collier</p>
      </div>
    </div>
  );
};

export default StatsOverview;