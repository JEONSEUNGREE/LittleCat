import { Check, Flame, Link2, Zap } from 'lucide-react';
import { Habit } from '../types';
import useHabitStore from '../store/habitStore';

interface HabitListProps {
  habits: Habit[];
}

const categoryIcons = {
  health: '💊',
  productivity: '📈',
  learning: '📚',
  fitness: '💪',
  mindfulness: '🧘',
  social: '👥',
  creative: '🎨',
  financial: '💰',
  custom: '⭐',
};

const HabitList: React.FC<HabitListProps> = ({ habits }) => {
  const { toggleHabitCompletion } = useHabitStore();
  const today = new Date();
  const todayStr = today.toDateString();

  const getHabitCompletionStatus = (habit: Habit) => {
    return habit.completions.find(
      (c) => new Date(c.date).toDateString() === todayStr
    )?.completed || false;
  };

  if (habits.length === 0) {
    return (
      <div className="glass-card p-8 text-center">
        <div className="text-6xl mb-4">🎯</div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">No habits yet!</h3>
        <p className="text-sm text-gray-500">
          Tap the + button to create your first habit chain
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {habits.map((habit) => {
        const isCompleted = getHabitCompletionStatus(habit);
        const streak = habit.streakData.currentStreak;

        return (
          <div
            key={habit.id}
            className={`glass-card p-4 transition-all duration-300 ${
              isCompleted ? 'ring-2 ring-success-400 shadow-success-400/20' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{categoryIcons[habit.category]}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{habit.name}</h3>
                    {habit.description && (
                      <p className="text-xs text-gray-500 mt-0.5">{habit.description}</p>
                    )}
                  </div>
                </div>

                {/* Streak & Stats */}
                <div className="flex items-center gap-4 mt-3">
                  {streak > 0 && (
                    <div className="flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span className="text-sm font-bold text-orange-600">{streak} days</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <Link2 className="w-4 h-4 text-primary-500" />
                    <span className="text-sm text-gray-600">
                      {habit.chainLinks.length} links
                    </span>
                  </div>
                  {habit.streakData.totalCompletions > 0 && (
                    <div className="flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-gray-600">
                        {habit.streakData.totalCompletions} total
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Completion Button */}
              <button
                onClick={() => toggleHabitCompletion(habit.id, today)}
                className={`ml-4 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCompleted
                    ? 'bg-gradient-to-br from-success-500 to-success-600 shadow-lg shadow-success-500/30 scale-110'
                    : 'bg-gray-200 hover:bg-gray-300 active:scale-95'
                }`}
              >
                {isCompleted && <Check className="w-6 h-6 text-white" />}
              </button>
            </div>

            {/* Chain Visualization Mini */}
            {habit.chainLinks.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-200/50">
                <div className="flex gap-1 overflow-x-auto no-scrollbar">
                  {habit.chainLinks.slice(-7).map((link, index) => (
                    <div
                      key={link.id}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                        index === habit.chainLinks.slice(-7).length - 1
                          ? 'bg-gradient-to-br from-primary-400 to-primary-600 text-white animate-pulse-slow'
                          : 'bg-primary-100 text-primary-600'
                      }`}
                    >
                      {index + 1}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default HabitList;