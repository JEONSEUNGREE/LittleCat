import React from 'react'
import { Wind, Info, Settings } from 'lucide-react'
import { useBreathStore } from '../store/breathStore'

const Header: React.FC = () => {
  const { totalCycles } = useBreathStore()

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/10 backdrop-blur-lg p-4 z-10">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Wind className="w-6 h-6 md:w-8 md:h-8 text-white" />
          <h1 className="text-white text-lg md:text-2xl font-bold">
            호흡 리듬 트레이너
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-white text-sm md:text-base">
            <span className="hidden md:inline">총 사이클: </span>
            <span className="font-bold">{totalCycles}</span>
          </div>

          <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all">
            <Info className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </button>

          <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all">
            <Settings className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </button>
        </div>
      </div>
    </header>
  )
}