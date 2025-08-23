import { Plus, TrendingUp } from 'lucide-react'

interface HeaderProps {
  onAddClick: () => void
}

const Header = ({ onAddClick }: HeaderProps) => {
  return (
    <header className="bg-gradient-to-r from-primary-500 to-primary-600 text-white sticky top-0 z-40 shadow-lg">
      <div className="container mx-auto px-4 py-4 max-w-4xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">Habit Tracker Pro</h1>
              <p className="text-primary-100 text-sm">Build better habits, one day at a time</p>
            </div>
          </div>
          
          <button
            onClick={onAddClick}
            className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-medium transition-all hover:bg-white/30 active:scale-95 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Add Habit</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header