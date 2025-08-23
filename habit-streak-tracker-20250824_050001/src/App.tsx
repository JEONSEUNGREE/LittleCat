import React, { useState, useEffect } from 'react';
import { Plus, Moon, Sun, Trophy, Calendar } from 'lucide-react';
import useHabitStore from './store/habitStore';
import HabitCard from './components/HabitCard';
import AddHabitModal from './components/AddHabitModal';
import StatsCard from './components/StatsCard';

function App() {
  const { habits } = useHabitStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const today = new Date().toISOString().split('T')[0];
  const activeHabits = habits.filter(h => !h.isArchived);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getGreeting = () => {
    const hour = currentDate.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getMotivationalQuote = () => {
    const quotes = [
      "Small daily improvements lead to staggering long-term results",
      "Success is the sum of small efforts repeated day in and day out",
      "The secret of getting ahead is getting started",
      "Excellence is not a destination; it is a continuous journey",
      "Progress, not perfection"
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <header className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg p-4 mb-6 animate-slide-up">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Habit Streak</h1>
                  <p className="text-sm text-gray-600">{getGreeting()}! 🌟</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="button-primary flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  <span className="hidden sm:inline">Add Habit</span>
                </button>
              </div>
            </div>
          </header>

          {/* Date and Quote */}
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg p-4 mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary-500" />
                <span className="text-lg font-semibold text-gray-800">{formatDate(currentDate)}</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 italic">"{getMotivationalQuote()}"</p>
          </div>

          {/* Stats Card */}
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <StatsCard />
          </div>

          {/* Habits Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {activeHabits.length === 0 ? (
              <div className="col-span-full bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg p-12 text-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <div className="max-w-md mx-auto">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Start Your Journey</h3>
                  <p className="text-gray-600 mb-6">
                    Create your first habit and begin building a better you, one day at a time.
                  </p>
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="button-primary mx-auto flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Create Your First Habit
                  </button>
                </div>
              </div>
            ) : (
              activeHabits.map((habit, index) => (
                <div 
                  key={habit.id} 
                  className="animate-slide-up" 
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <HabitCard
                    habit={habit}
                    isCompleted={habit.completedDates.includes(today)}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Add Habit Modal */}
      <AddHabitModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}

export default App;