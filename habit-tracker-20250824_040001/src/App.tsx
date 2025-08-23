import React, { useState, useEffect } from 'react';
import { Plus, Calendar, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useHabitStore } from './store/habitStore';
import { HabitCard } from './components/HabitCard';
import { AddHabitModal } from './components/AddHabitModal';
import { DashboardStats } from './components/DashboardStats';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const habits = useHabitStore((state) => state.habits);
  const getHabitsByDate = useHabitStore((state) => state.getHabitsByDate);
  
  const dateString = selectedDate.toISOString().split('T')[0];
  const todayHabits = getHabitsByDate(dateString);
  
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('ko-KR', options);
  };
  
  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };
  
  const isToday = dateString === new Date().toISOString().split('T')[0];
  
  // Add sample habits on first load
  useEffect(() => {
    if (habits.length === 0) {
      const sampleHabits = [
        {
          title: '아침 운동',
          description: '30분 운동하기',
          icon: 'flame',
          color: '#ef4444',
          targetDays: [1, 2, 3, 4, 5],
        },
        {
          title: '독서',
          description: '20페이지 읽기',
          icon: 'trophy',
          color: '#3b82f6',
          targetDays: [0, 1, 2, 3, 4, 5, 6],
        },
        {
          title: '물 마시기',
          description: '하루 8잔',
          icon: 'check',
          color: '#10b981',
          targetDays: [0, 1, 2, 3, 4, 5, 6],
        },
      ];
      
      const addHabit = useHabitStore.getState().addHabit;
      sampleHabits.forEach(habit => addHabit(habit));
    }
  }, [habits.length]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-md mx-auto px-4 py-6 pb-20">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-8 h-8 text-primary-500" />
              <h1 className="text-2xl font-bold text-gray-800">Habit Tracker</h1>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="p-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>
          
          {/* Date Navigation */}
          <div className="glass-effect rounded-2xl p-4 flex items-center justify-between">
            <button
              onClick={() => changeDate(-1)}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="text-center">
              <p className="text-sm text-gray-600">
                {isToday ? '오늘' : ''}
              </p>
              <p className="font-semibold text-gray-800">{formatDate(selectedDate)}</p>
            </div>
            <button
              onClick={() => changeDate(1)}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Dashboard Stats */}
        <DashboardStats />
        
        {/* Habits List */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            오늘의 습관
          </h2>
          
          {todayHabits.length === 0 ? (
            <div className="text-center py-12">
              <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">오늘 진행할 습관이 없습니다</p>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="mt-4 text-primary-500 font-medium hover:text-primary-600"
              >
                첫 습관 추가하기
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {todayHabits.map((habit) => (
                <HabitCard key={habit.id} habit={habit} date={dateString} />
              ))}
            </div>
          )}
        </div>
        
        {/* Floating Action Button for Mobile */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full shadow-lg hover:shadow-xl transform transition-all duration-200 active:scale-95 flex items-center justify-center md:hidden"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
      
      {/* Add Habit Modal */}
      <AddHabitModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  );
}

export default App;