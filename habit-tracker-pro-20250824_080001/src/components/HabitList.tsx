import { useHabitStore } from '../store/habitStore'
import HabitCard from './HabitCard'
import { Coffee } from 'lucide-react'

const HabitList = () => {
  const { habits } = useHabitStore()

  if (habits.length === 0) {
    return (
      <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
        <Coffee className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No habits yet</h3>
        <p className="text-gray-500">Start building better habits by adding your first one!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Habits</h2>
      {habits.map((habit) => (
        <HabitCard key={habit.id} habit={habit} />
      ))}
    </div>
  )
}

export default HabitList