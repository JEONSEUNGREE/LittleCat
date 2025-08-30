import { Link2, TrendingUp, Award } from 'lucide-react';
import { Habit } from '../types';

interface ChainVisualizationProps {
  habits: Habit[];
}

const ChainVisualization: React.FC<ChainVisualizationProps> = ({ habits }) => {
  const getChainStrength = (habit: Habit) => {
    const streak = habit.streakData.currentStreak;
    if (streak === 0) return 'broken';
    if (streak < 7) return 'weak';
    if (streak < 21) return 'growing';
    if (streak < 66) return 'strong';
    return 'unbreakable';
  };

  const getChainColor = (strength: string) => {
    switch (strength) {
      case 'broken':
        return 'from-gray-300 to-gray-400';
      case 'weak':
        return 'from-yellow-300 to-yellow-400';
      case 'growing':
        return 'from-blue-300 to-blue-500';
      case 'strong':
        return 'from-green-400 to-green-600';
      case 'unbreakable':
        return 'from-purple-400 to-purple-600';
      default:
        return 'from-gray-300 to-gray-400';
    }
  };

  const getMilestone = (days: number) => {
    if (days >= 365) return { label: '1 Year!', icon: '🏆' };
    if (days >= 100) return { label: '100 Days!', icon: '💯' };
    if (days >= 66) return { label: 'Habit Formed!', icon: '🎯' };
    if (days >= 30) return { label: '1 Month!', icon: '🌟' };
    if (days >= 21) return { label: '3 Weeks!', icon: '⭐' };
    if (days >= 7) return { label: '1 Week!', icon: '✨' };
    return null;
  };

  if (habits.length === 0) {
    return (
      <div className="glass-card p-8 text-center">
        <Link2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">No chains yet!</h3>
        <p className="text-sm text-gray-500">
          Start building your habit chains by creating and completing habits daily
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Chain Legend */}
      <div className="glass-card p-4">
        <h3 className="font-semibold text-gray-800 mb-3">Chain Strength Legend</h3>
        <div className="flex flex-wrap gap-2">
          {[
            { strength: 'weak', label: '1-6 days', color: 'from-yellow-300 to-yellow-400' },
            { strength: 'growing', label: '7-20 days', color: 'from-blue-300 to-blue-500' },
            { strength: 'strong', label: '21-65 days', color: 'from-green-400 to-green-600' },
            { strength: 'unbreakable', label: '66+ days', color: 'from-purple-400 to-purple-600' },
          ].map((item) => (
            <div key={item.strength} className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${item.color}`} />
              <span className="text-xs text-gray-600">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Habit Chains */}
      {habits.map((habit) => {
        const strength = getChainStrength(habit);
        const chainColor = getChainColor(strength);
        const milestone = getMilestone(habit.streakData.currentStreak);
        const last30Days = Array.from({ length: 30 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (29 - i));
          return date;
        });

        return (
          <div key={habit.id} className="glass-card p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{habit.icon}</span>
                  <h3 className="font-semibold text-gray-800">{habit.name}</h3>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-sm text-gray-600">
                    Current: <strong>{habit.streakData.currentStreak} days</strong>
                  </span>
                  <span className="text-sm text-gray-600">
                    Best: <strong>{habit.streakData.longestStreak} days</strong>
                  </span>
                </div>
              </div>
              {milestone && (
                <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full">
                  <span className="text-lg">{milestone.icon}</span>
                  <span className="text-xs font-bold text-orange-700">{milestone.label}</span>
                </div>
              )}
            </div>

            {/* Chain Visualization */}
            <div className="relative">
              {/* Chain Links */}
              <div className="flex gap-1 overflow-x-auto no-scrollbar pb-2">
                {last30Days.map((date, index) => {
                  const dateStr = date.toDateString();
                  const isCompleted = habit.completions.some(
                    (c) => new Date(c.date).toDateString() === dateStr && c.completed
                  );
                  const isToday = dateStr === new Date().toDateString();

                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center gap-1"
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                          isCompleted
                            ? `bg-gradient-to-br ${chainColor} text-white shadow-lg`
                            : isToday
                            ? 'bg-gray-200 ring-2 ring-primary-400 ring-offset-1'
                            : 'bg-gray-100'
                        } ${isCompleted && index > 0 ? 'habit-chain' : ''}`}
                      >
                        {date.getDate()}
                      </div>
                      <div className="text-[10px] text-gray-400">
                        {date.toLocaleDateString('en', { month: 'short' }).slice(0, 3)}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chain Strength Indicator */}
              <div className="mt-4 pt-4 border-t border-gray-200/50">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Chain Strength</span>
                  <span className={`text-sm font-bold capitalize ${
                    strength === 'unbreakable' ? 'text-purple-600' :
                    strength === 'strong' ? 'text-green-600' :
                    strength === 'growing' ? 'text-blue-600' :
                    strength === 'weak' ? 'text-yellow-600' :
                    'text-gray-600'
                  }`}>
                    {strength}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${chainColor} rounded-full transition-all duration-500`}
                    style={{
                      width: `${Math.min(100, (habit.streakData.currentStreak / 66) * 100)}%`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChainVisualization;