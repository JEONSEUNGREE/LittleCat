import React from 'react';
import { Check, Flame, Trophy, Target } from 'lucide-react';
import { Habit } from '../types/habit';
import useHabitStore from '../store/useHabitStore';

interface HabitCardProps {
  habit: Habit;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit }) => {
  const { toggleHabitToday, getTodayLog } = useHabitStore();
  const todayLog = getTodayLog(habit.id);
  const isCompleted = todayLog?.completed || false;

  const handleToggle = () => {
    toggleHabitToday(habit.id);
  };

  const getIconComponent = () => {
    switch (habit.icon) {
      case 'flame':
        return <Flame className="w-6 h-6" />;
      case 'trophy':
        return <Trophy className="w-6 h-6" />;
      case 'target':
        return <Target className="w-6 h-6" />;
      default:
        return <Check className="w-6 h-6" />;
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 ${
        isCompleted
          ? 'bg-gradient-to-br from-green-400 to-green-600'
          : 'bg-white'
      }`}
      onClick={handleToggle}
    >
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isCompleted ? 'bg-white/20' : `bg-${habit.color}-100`
            }`}
            style={!isCompleted ? { backgroundColor: `${habit.color}20` } : {}}
          >
            <div
              className={isCompleted ? 'text-white' : ''}
              style={!isCompleted ? { color: habit.color } : {}}
            >
              {getIconComponent()}
            </div>
          </div>
          {habit.streak > 0 && (
            <div
              className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                isCompleted
                  ? 'bg-white/20 text-white'
                  : 'bg-orange-100 text-orange-600'
              }`}
            >
              <Flame className="w-4 h-4" />
              <span className="text-sm font-bold">{habit.streak}</span>
            </div>
          )}
        </div>

        <h3
          className={`text-lg font-semibold mb-1 ${
            isCompleted ? 'text-white' : 'text-gray-800'
          }`}
        >
          {habit.title}
        </h3>
        {habit.description && (
          <p
            className={`text-sm ${
              isCompleted ? 'text-white/80' : 'text-gray-600'
            }`}
          >
            {habit.description}
          </p>
        )}

        <div className="mt-4 flex items-center justify-between">
          <div
            className={`text-xs ${
              isCompleted ? 'text-white/70' : 'text-gray-500'
            }`}
          >
            {habit.targetFrequency === 'daily' && '매일'}
            {habit.targetFrequency === 'weekly' && `주 ${habit.targetCount}회`}
            {habit.targetFrequency === 'monthly' && `월 ${habit.targetCount}회`}
          </div>
          <div
            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
              isCompleted
                ? 'bg-white border-white'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            {isCompleted && <Check className="w-5 h-5 text-green-500" />}
          </div>
        </div>
      </div>

      {isCompleted && (
        <div className="absolute inset-0 bg-white/10 pointer-events-none animate-pulse" />
      )}
    </div>
  );
};

export default HabitCard;