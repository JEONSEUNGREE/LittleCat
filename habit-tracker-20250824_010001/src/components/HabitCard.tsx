import React from 'react';
import { Check, Flame, Target, TrendingUp } from 'lucide-react';
import { Habit } from '../types/habit';
import useHabitStore from '../store/habitStore';

interface HabitCardProps {
  habit: Habit;
  onEdit?: () => void;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, onEdit }) => {
  const { toggleHabitCompletion } = useHabitStore();
  const today = new Date().toISOString().split('T')[0];
  const isCompletedToday = habit.completedDates.includes(today);

  const handleToggle = () => {
    toggleHabitCompletion(habit.id, today);
  };

  const getStreakColor = (streak: number) => {
    if (streak === 0) return 'text-gray-400';
    if (streak < 7) return 'text-orange-500';
    if (streak < 30) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div 
      className={`card transition-all duration-300 ${
        isCompletedToday ? 'ring-2 ring-green-500 bg-green-50' : ''
      }`}
      onClick={onEdit}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white`}
              style={{ backgroundColor: habit.color }}
            >
              <span className="text-xl">{habit.icon}</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{habit.name}</h3>
              {habit.description && (
                <p className="text-sm text-gray-500 mt-0.5">{habit.description}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <Flame className={`w-4 h-4 ${getStreakColor(habit.currentStreak)} streak-flame`} />
              <span className="font-medium">{habit.currentStreak} day streak</span>
            </div>
            
            <div className="flex items-center gap-1.5 text-gray-500">
              <TrendingUp className="w-4 h-4" />
              <span>Best: {habit.bestStreak}</span>
            </div>

            <div className="flex items-center gap-1.5 text-gray-500">
              <Target className="w-4 h-4" />
              <span>{habit.targetCount}x/{habit.frequency}</span>
            </div>
          </div>

          <div className="mt-3 flex gap-1">
            {[...Array(7)].map((_, index) => {
              const date = new Date();
              date.setDate(date.getDate() - (6 - index));
              const dateStr = date.toISOString().split('T')[0];
              const isCompleted = habit.completedDates.includes(dateStr);
              const isToday = dateStr === today;

              return (
                <div
                  key={index}
                  className={`w-8 h-8 rounded-md flex items-center justify-center text-xs transition-all ${
                    isToday
                      ? 'ring-2 ring-primary-500'
                      : ''
                  } ${
                    isCompleted
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {isCompleted ? '✓' : date.getDate()}
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleToggle();
          }}
          className={`ml-4 w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-90 ${
            isCompletedToday
              ? 'bg-green-500 text-white'
              : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
          }`}
        >
          <Check className={`w-6 h-6 ${isCompletedToday ? 'animate-fade-in' : ''}`} />
        </button>
      </div>
    </div>
  );
};

export default HabitCard;