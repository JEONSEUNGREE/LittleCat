import { useState, useEffect } from 'react'
import Header from './components/Header'
import HabitList from './components/HabitList'
import AddHabitModal from './components/AddHabitModal'
import StatsPanel from './components/StatsPanel'
import { useHabitStore } from './store/habitStore'

function App() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const { loadHabits } = useHabitStore()

  useEffect(() => {
    loadHabits()
  }, [loadHabits])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAddClick={() => setIsAddModalOpen(true)} />
      
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <StatsPanel />
        <HabitList />
      </main>

      {isAddModalOpen && (
        <AddHabitModal onClose={() => setIsAddModalOpen(false)} />
      )}
    </div>
  )
}

export default App