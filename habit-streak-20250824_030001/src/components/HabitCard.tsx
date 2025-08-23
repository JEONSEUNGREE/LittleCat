import React from 'react';
import { Check, Flame, Trophy, Calendar } from 'lucide-react';
import { Habit } from '../types/habit';
import { useHabitStore } from '../store/habitStore';

interface HabitCardProps {
  habit: Habit;
  date: string;
}

export const HabitCard: React.FC<HabitCardProps> = ({ habit, date }) => {
  const { toggleHabit } = useHabitStore();
  const isCompleted = habit.completedDates.includes(date);
  
  const handleToggle = () => {
    toggleHabit(habit.id, date);
  };
  
  const getStreakColor = (streak: number) => {
    if (streak === 0) return 'bg-gray-100 text-gray-600';
    if (streak < 7) return 'bg-orange-100 text-orange-600';
    if (streak < 30) return 'bg-yellow-100 text-yellow-600';
    return 'bg-green-100 text-green-600';
  };
  
  return (
    <div 
      className={`habit-card ${isCompleted ? 'bg-gradient-to-r from-primary-50 to-primary-100 border-primary-300' : ''}`}
      onClick={handleToggle}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{habit.emoji}</span>
            <h3 className="font-semibold text-gray-900">{habit.name}</h3>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-3">
            {habit.streak > 0 && (
              <div className={`streak-badge ${getStreakColor(habit.streak)}`}>
                <Flame className="w-3 h-3 mr-1" />
                {habit.streak} day streak
              </div>
            )}
            
            {habit.bestStreak > 0 && (
              <div className="streak-badge bg-purple-100 text-purple-600">
                <Trophy className="w-3 h-3 mr-1" />
                Best: {habit.bestStreak}
              </div>
            )}
            
            {habit.totalCompleted > 0 && (
              <div className="streak-badge bg-blue-100 text-blue-600">
                <Calendar className="w-3 h-3 mr-1" />
                Total: {habit.totalCompleted}
              </div>
            )}
          </div>
        </div>
        
        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
          isCompleted 
            ? 'bg-primary-500 text-white scale-110' 
            : 'bg-gray-100 text-gray-400 border-2 border-gray-300'
        }`}>
          {isCompleted && <Check className="w-5 h-5" />}
        </div>
      </div>
    </div>
  );
};