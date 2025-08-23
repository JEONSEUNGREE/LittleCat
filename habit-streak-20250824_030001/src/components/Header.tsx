import React from 'react';
import { Plus, TrendingUp, Award } from 'lucide-react';

interface HeaderProps {
  onAddHabit: () => void;
  totalStreak: number;
  completionRate: number;
}

export const Header: React.FC<HeaderProps> = ({ onAddHabit, totalStreak, completionRate }) => {
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });
  
  return (
    <header className="bg-gradient-to-br from-primary-500 to-primary-600 text-white px-4 pt-12 pb-6 rounded-b-3xl shadow-lg">
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-1">Habit Streak</h1>
        <p className="text-primary-100 text-sm">{today}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white/20 backdrop-blur rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs text-primary-100">Total Streak</span>
          </div>
          <div className="text-2xl font-bold">{totalStreak} days</div>
        </div>
        
        <div className="bg-white/20 backdrop-blur rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <Award className="w-4 h-4" />
            <span className="text-xs text-primary-100">Completion</span>
          </div>
          <div className="text-2xl font-bold">{completionRate}%</div>
        </div>
      </div>
      
      <button
        onClick={onAddHabit}
        className="w-full bg-white text-primary-600 font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-primary-50 transition-colors"
      >
        <Plus className="w-5 h-5" />
        Add New Habit
      </button>
    </header>
  );
};