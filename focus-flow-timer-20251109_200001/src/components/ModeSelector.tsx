import { Coffee, Brain, Clock } from 'lucide-react'
import { useTimerStore, TimerMode } from '../store/timerStore'

export const ModeSelector = () => {
  const { mode, setMode, status } = useTimerStore()

  const modes: { id: TimerMode; label: string; icon: typeof Brain }[] = [
    { id: 'focus', label: '집중', icon: Brain },
    { id: 'shortBreak', label: '짧은 휴식', icon: Coffee },
    { id: 'longBreak', label: '긴 휴식', icon: Clock },
  ]

  return (
    <div className="flex gap-2 md:gap-4 mb-8">
      {modes.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => status === 'idle' && setMode(id)}
          disabled={status !== 'idle'}
          className={`
            px-4 py-2 md:px-6 md:py-3 rounded-lg font-medium transition-all duration-300
            flex items-center gap-2
            ${mode === id
              ? 'bg-gradient-to-r from-flow-500 to-flow-600 text-white shadow-lg scale-105'
              : 'bg-white/10 text-white/70 hover:bg-white/20'
            }
            ${status !== 'idle' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-95'}
          `}
        >
          <Icon className="w-4 h-4 md:w-5 md:h-5" />
          <span className="text-sm md:text-base">{label}</span>
        </button>
      ))}
    </div>
  )
}
