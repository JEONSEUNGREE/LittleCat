import React from 'react';
import { Flame, Trash2, Check } from 'lucide-react';
import { Habit } from '../types/habit';

interface HabitCardProps {
  habit: Habit;
  onToggle: (id: string, date: string) => void;
  onDelete: (id: string) => void;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, onToggle, onDelete }) => {
  const today = new Date().toISOString().split('T')[0];
  const isCompletedToday = habit.completedDates.includes(today);
  
  const completionRate = habit.targetDays > 0 
    ? Math.round((habit.completedDates.length / habit.targetDays) * 100)
    : 0;

  return (
    <div className={`relative bg-white rounded-2xl shadow-lg p-5 border-2 transition-all duration-300 ${
      isCompletedToday ? 'border-green-400 shadow-green-200' : 'border-gray-200'
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{habit.emoji}</span>
          <div>
            <h3 className="font-bold text-gray-800 text-lg">{habit.title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Flame className={`w-4 h-4 ${habit.streak > 0 ? 'text-orange-500' : 'text-gray-300'}`} />
              <span className={`text-sm font-semibold ${habit.streak > 0 ? 'text-orange-500' : 'text-gray-400'}`}>
                {habit.streak} day streak
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={() => onDelete(habit.id)}
          className="text-gray-400 hover:text-red-500 transition-colors p-1"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Progress</span>
          <span className="text-sm font-semibold text-gray-800">{completionRate}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-primary-400 to-primary-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${completionRate}%` }}
          />
        </div>
        
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>Best: {habit.bestStreak} days</span>
          <span>Goal: {habit.targetDays} days</span>
        </div>
      </div>

      <button
        onClick={() => onToggle(habit.id, today)}
        className={`mt-4 w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
          isCompletedToday
            ? 'bg-green-500 text-white hover:bg-green-600'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        <Check className="w-4 h-4" />
        {isCompletedToday ? 'Completed!' : 'Mark Complete'}
      </button>
    </div>
  );
};

export default HabitCard;