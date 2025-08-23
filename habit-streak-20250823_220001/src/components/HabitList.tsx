import HabitCard from './HabitCard'
import useHabitStore from '../store/habitStore'
import { Coffee } from 'lucide-react'

const HabitList = () => {
  const habits = useHabitStore((state) => state.habits)

  if (habits.length === 0) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <Coffee className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          아직 습관이 없어요
        </h3>
        <p className="text-gray-500 mb-6">
          새로운 습관을 추가하고 스트릭을 쌓아보세요!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {habits.map((habit) => (
        <HabitCard key={habit.id} habit={habit} />
      ))}
    </div>
  )
}

export default HabitList