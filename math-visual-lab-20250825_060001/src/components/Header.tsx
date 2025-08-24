import React from 'react'
import { Calculator, Activity, Info } from 'lucide-react'

interface HeaderProps {
  onInfoClick: () => void
}

const Header: React.FC<HeaderProps> = ({ onInfoClick }) => {
  return (
    <header className="bg-gradient-to-r from-primary to-secondary text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Calculator className="w-8 h-8" />
              <Activity className="w-4 h-4 absolute -bottom-1 -right-1 text-accent animate-pulse-slow" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold">Math Visual Lab</h1>
              <p className="text-xs md:text-sm opacity-90">인터랙티브 수학 시각화</p>
            </div>
          </div>
          
          <button
            onClick={onInfoClick}
            className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
            aria-label="정보"
          >
            <Info className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header