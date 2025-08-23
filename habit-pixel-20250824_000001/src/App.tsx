import React, { useEffect } from 'react'
import Header from './components/Header'
import HabitCard from './components/HabitCard'
import AddHabitForm from './components/AddHabitForm'
import useHabitStore from './store/habitStore'

function App() {
  const { habits, addHabit, toggleHabit, deleteHabit, calculateLevel } = useHabitStore()

  useEffect(() => {
    calculateLevel()
  }, [habits, calculateLevel])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pixel-light to-gray-100">
      <Header />
      
      <main className="px-4 py-8 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="font-pixel text-2xl mb-2">TODAY'S QUEST</h2>
            <p className="text-gray-600">Complete your daily habits to earn XP and level up!</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {habits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onToggle={toggleHabit}
                onDelete={deleteHabit}
              />
            ))}
          </div>

          <div className="max-w-md mx-auto">
            <AddHabitForm onAdd={addHabit} />
          </div>

          {habits.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4 animate-bounce">🎮</div>
              <h3 className="font-pixel text-xl mb-2">NO HABITS YET!</h3>
              <p className="text-gray-600">Start your pixel journey by adding your first habit above.</p>
            </div>
          )}

          {habits.length > 0 && habits.every(h => h.completed) && (
            <div className="text-center py-8 mt-8">
              <div className="text-6xl mb-4 animate-bounce">🏆</div>
              <h3 className="font-pixel text-2xl text-pixel-green mb-2">PERFECT DAY!</h3>
              <p className="text-gray-600">You've completed all your habits. Amazing work!</p>
            </div>
          )}
        </div>
      </main>

      <footer className="mt-auto py-6 text-center text-gray-500">
        <p className="font-pixel text-xs">
          HABIT PIXEL © 2024 | LEVEL UP YOUR LIFE
        </p>
      </footer>
    </div>
  )
}

export default App