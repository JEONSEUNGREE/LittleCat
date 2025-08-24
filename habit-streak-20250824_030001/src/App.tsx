import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HabitCard } from './components/HabitCard';
import { AddHabitModal } from './components/AddHabitModal';
import { useHabitStore } from './store/habitStore';
import { Target, Sparkles } from 'lucide-react';

function App() {
  const { habits } = useHabitStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const today = new Date().toISOString().split('T')[0];
  
  const totalStreak = habits.reduce((max, habit) => Math.max(max, habit.streak), 0);
  const todayCompleted = habits.filter(h => h.completedDates.includes(today)).length;
  const completionRate = habits.length > 0 
    ? Math.round((todayCompleted / habits.length) * 100)
    : 0;
  
  useEffect(() => {
    if (habits.length === 0) {
      const defaultHabits = [
        { name: 'Morning Exercise', emoji: '💪', color: 'blue', frequency: 'daily' as const },
        { name: 'Read for 30 mins', emoji: '📚', color: 'green', frequency: 'daily' as const },
        { name: 'Drink Water', emoji: '💧', color: 'indigo', frequency: 'daily' as const },
      ];
      
      const store = useHabitStore.getState();
      defaultHabits.forEach(habit => store.addHabit(habit));
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header 
        onAddHabit={() => setIsModalOpen(true)}
        totalStreak={totalStreak}
        completionRate={completionRate}
      />
      
      <main className="px-4 py-6">
        {habits.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-in">
              <Target className="w-10 h-10 text-primary-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No habits yet!</h2>
            <p className="text-gray-600 mb-6">Start building your streak by adding your first habit</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors inline-flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Get Started
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Today's Habits</h2>
              <p className="text-sm text-gray-600">
                {todayCompleted} of {habits.length} completed
              </p>
            </div>
            
            <div className="space-y-3">
              {habits.map((habit) => (
                <HabitCard key={habit.id} habit={habit} date={today} />
              ))}
            </div>
            
            {completionRate === 100 && (
              <div className="mt-6 bg-gradient-to-r from-yellow-400 to-orange-400 text-white p-4 rounded-xl text-center animate-bounce-in">
                <Sparkles className="w-6 h-6 mx-auto mb-2" />
                <p className="font-bold">Perfect Day!</p>
                <p className="text-sm opacity-90">You've completed all your habits!</p>
              </div>
            )}
          </>
        )}
      </main>
      
      <AddHabitModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default App;