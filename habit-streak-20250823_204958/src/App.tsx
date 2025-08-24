import { useState, useEffect } from 'react';
import { Plus, Sparkles } from 'lucide-react';
import useHabitStore from './store/habitStore';
import HabitCard from './components/HabitCard';
import AddHabitModal from './components/AddHabitModal';
import StatsOverview from './components/StatsOverview';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { habits, addHabit, deleteHabit, toggleHabitCompletion } = useHabitStore();

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    habits.forEach(habit => {
      const lastCompleted = habit.completedDates[habit.completedDates.length - 1];
      if (lastCompleted && lastCompleted !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        if (lastCompleted !== yesterdayStr && habit.streak > 0) {
          useHabitStore.getState().updateStreak(habit.id);
        }
      }
    });
  }, [habits]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getMotivationalQuote = () => {
    const quotes = [
      "Small steps daily lead to big changes",
      "Consistency is the key to success",
      "Every day is a fresh start",
      "Build habits, build your future",
      "Progress, not perfection"
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-orange-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 flex items-center gap-2">
                <Sparkles className="w-8 h-8 text-primary-500" />
                Habit Streak
              </h1>
              <p className="text-gray-600 mt-2">{getGreeting()}! {getMotivationalQuote()}</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-primary-500 text-white p-3 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl hover:bg-primary-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 font-semibold"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Add Habit</span>
            </button>
          </div>
        </header>

        <StatsOverview habits={habits} />

        {habits.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">🎯</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Start Your Journey</h2>
            <p className="text-gray-600 mb-6">
              Create your first habit and begin building a better you!
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-primary-500 text-white px-8 py-3 rounded-xl hover:bg-primary-600 transition-colors font-semibold"
            >
              Create First Habit
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {habits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onToggle={toggleHabitCompletion}
                onDelete={deleteHabit}
              />
            ))}
          </div>
        )}

        <AddHabitModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={addHabit}
        />
      </div>
    </div>
  );
}

export default App;