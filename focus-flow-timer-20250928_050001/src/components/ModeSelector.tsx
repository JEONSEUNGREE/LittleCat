import React from 'react'
import { Brain, Coffee, Moon } from 'lucide-react'
import { useTimerStore, TimerMode } from '../store/timerStore'

export const ModeSelector: React.FC = () => {
  const { mode, setMode } = useTimerStore()

  const modes: { value: TimerMode; label: string; icon: React.ReactNode; color: string }[] = [
    { value: 'focus', label: 'Focus', icon: <Brain className="w-5 h-5" />, color: 'from-purple-500 to-pink-500' },
    { value: 'shortBreak', label: 'Short Break', icon: <Coffee className="w-5 h-5" />, color: 'from-blue-500 to-cyan-500' },
    { value: 'longBreak', label: 'Long Break', icon: <Moon className="w-5 h-5" />, color: 'from-indigo-500 to-purple-500' }
  ]

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
      {modes.map((modeOption) => (
        <button
          key={modeOption.value}
          onClick={() => setMode(modeOption.value)}
          className={`
            relative px-6 py-3 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 active:scale-95
            ${mode === modeOption.value 
              ? 'bg-white text-gray-800 shadow-lg scale-105' 
              : 'bg-white/10 text-white hover:bg-white/20'
            }
          `}
        >
          <div className="flex items-center space-x-2">
            {modeOption.icon}
            <span>{modeOption.label}</span>
          </div>
          {mode === modeOption.value && (
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${modeOption.color} opacity-20 animate-pulse`} />
          )}
        </button>
      ))}
    </div>
  )
}