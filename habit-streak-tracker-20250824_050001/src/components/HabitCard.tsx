import React from 'react';
import { Check, Flame, TrendingUp, Calendar } from 'lucide-react';
import { Habit } from '../types/habit';
import useHabitStore from '../store/habitStore';

interface HabitCardProps {
  habit: Habit;
  isCompleted: boolean;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, isCompleted }) => {
  const { toggleHabitCompletion } = useHabitStore();
  const today = new Date().toISOString().split('T')[0];

  const handleToggle = () => {
    toggleHabitCompletion(habit.id, today);
  };

  const getStreakColor = (streak: number) => {
    if (streak === 0) return 'bg-gray-100 text-gray-600';
    if (streak < 7) return 'bg-orange-100 text-orange-600';
    if (streak < 30) return 'bg-yellow-100 text-yellow-600';
    return 'bg-green-100 text-green-600';
  };

  return (
    <div className={`habit-card ${isCompleted ? 'border-2 border-green-400' : ''} relative overflow-hidden`}>
      {isCompleted && (
        <div className="absolute top-0 right-0 w-16 h-16 bg-green-400 transform rotate-45 translate-x-8 -translate-y-8"></div>
      )}
      
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{habit.title}</h3>
          {habit.description && (
            <p className="text-sm text-gray-600">{habit.description}</p>
          )}
        </div>
        
        <button
          onClick={handleToggle}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all transform ${
            isCompleted
              ? 'bg-green-500 text-white scale-110 shadow-lg'
              : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
          }`}
          aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
        >
          <Check className={`w-6 h-6 ${isCompleted ? 'animate-pulse' : ''}`} />
        </button>
      </div>

      <div className="flex items-center gap-4 mt-3">
        <div className="flex items-center gap-1">
          <Flame className="w-4 h-4 text-orange-500" />
          <span className={`streak-badge ${getStreakColor(habit.streak)}`}>
            {habit.streak} day{habit.streak !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="flex items-center gap-1 text-sm text-gray-500">
          <TrendingUp className="w-4 h-4" />
          <span>Best: {habit.longestStreak}</span>
        </div>

        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Calendar className="w-3 h-3" />
          <span className="capitalize">{habit.targetFrequency}</span>
        </div>
      </div>

      {isCompleted && (
        <div className="absolute top-1 right-1">
          <Check className="w-4 h-4 text-white z-10" />
        </div>
      )}
    </div>
  );
};

export default HabitCard;