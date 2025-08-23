import React from 'react';
import { Check, Flame, Trophy } from 'lucide-react';
import { Habit } from '../types/habit';
import { useHabitStore } from '../store/habitStore';

interface HabitCardProps {
  habit: Habit;
  date: string;
}

export const HabitCard: React.FC<HabitCardProps> = ({ habit, date }) => {
  const toggleHabitCompletion = useHabitStore((state) => state.toggleHabitCompletion);
  const isCompleted = habit.completedDates.includes(date);
  
  const handleToggle = () => {
    toggleHabitCompletion(habit.id, date);
  };
  
  const getIconComponent = () => {
    switch (habit.icon) {
      case 'flame':
        return <Flame className="w-6 h-6" />;
      case 'trophy':
        return <Trophy className="w-6 h-6" />;
      default:
        return <Check className="w-6 h-6" />;
    }
  };
  
  return (
    <div
      onClick={handleToggle}
      className={`habit-card cursor-pointer select-none ${
        isCompleted ? 'bg-gradient-to-r from-green-400/20 to-blue-400/20' : ''
      }`}
      style={{
        borderColor: isCompleted ? habit.color : 'transparent',
        borderWidth: isCompleted ? '2px' : '1px',
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div
            className={`p-2 rounded-xl ${
              isCompleted ? 'bg-white/90' : 'bg-gray-100/50'
            }`}
            style={{ color: habit.color }}
          >
            {getIconComponent()}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{habit.title}</h3>
            {habit.description && (
              <p className="text-sm text-gray-600 mt-1">{habit.description}</p>
            )}
            {habit.streak > 0 && (
              <div className="flex items-center mt-2 space-x-1">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium text-orange-600">
                  {habit.streak}일 연속
                </span>
              </div>
            )}
          </div>
        </div>
        <div
          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
            isCompleted
              ? 'bg-gradient-to-r from-green-400 to-blue-400 border-transparent'
              : 'border-gray-300 bg-white/50'
          }`}
        >
          {isCompleted && <Check className="w-5 h-5 text-white" />}
        </div>
      </div>
    </div>
  );
};