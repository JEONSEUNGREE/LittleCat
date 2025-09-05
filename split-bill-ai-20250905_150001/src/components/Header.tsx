import React from 'react'
import { Receipt, Users, Menu } from 'lucide-react'

interface HeaderProps {
  onMenuToggle?: () => void
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  return (
    <header className="bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <button
              onClick={onMenuToggle}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <Receipt className="w-8 h-8" />
              <div>
                <h1 className="text-xl font-bold">Split Bill AI</h1>
                <p className="text-xs text-primary-100">Smart bill splitting</p>
              </div>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">New Split</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header