import { Hand, Sparkles, Moon } from 'lucide-react'

interface InteractionPanelProps {
  onTouch: () => void
  onMeditate: () => void
  onRest: () => void
}

const InteractionPanel = ({ onTouch, onMeditate, onRest }: InteractionPanelProps) => {
  return (
    <div className="bg-zen-800/30 backdrop-blur-sm rounded-2xl p-6 border border-zen-700">
      <h3 className="text-lg font-light text-zen-200 mb-4 text-center">
        Interaction
      </h3>

      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={onTouch}
          className="flex flex-col items-center justify-center p-4 bg-zen-700/50 hover:bg-zen-600/50 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 border border-zen-600"
        >
          <Hand className="w-6 h-6 text-zen-300 mb-2" />
          <span className="text-xs text-zen-300">Touch</span>
        </button>

        <button
          onClick={onMeditate}
          className="flex flex-col items-center justify-center p-4 bg-purple-900/30 hover:bg-purple-800/40 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 border border-purple-700/50"
        >
          <Sparkles className="w-6 h-6 text-purple-300 mb-2" />
          <span className="text-xs text-purple-300">Meditate</span>
        </button>

        <button
          onClick={onRest}
          className="flex flex-col items-center justify-center p-4 bg-blue-900/30 hover:bg-blue-800/40 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 border border-blue-700/50"
        >
          <Moon className="w-6 h-6 text-blue-300 mb-2" />
          <span className="text-xs text-blue-300">Rest</span>
        </button>
      </div>
    </div>
  )
}

export default InteractionPanel
