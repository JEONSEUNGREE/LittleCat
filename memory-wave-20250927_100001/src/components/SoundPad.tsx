import { useState } from 'react'
import { Volume2 } from 'lucide-react'
import { audioEngine } from '../utils/audioEngine'
import useGameStore from '../store/gameStore'

interface SoundPadProps {
  frequency: number
  note: string
  color: string
  index: number
  disabled?: boolean
}

const SoundPad: React.FC<SoundPadProps> = ({ frequency, note, color, index, disabled }) => {
  const [isPressed, setIsPressed] = useState(false)
  const { addUserInput, isShowingPattern, userPattern } = useGameStore()
  
  const handlePress = () => {
    if (disabled || isShowingPattern) return
    
    setIsPressed(true)
    audioEngine.playTone(frequency, 300, 0)
    
    addUserInput({
      id: userPattern.length,
      frequency,
      duration: 300,
      delay: 0
    })
    
    setTimeout(() => setIsPressed(false), 150)
  }
  
  return (
    <button
      className={`
        relative aspect-square rounded-2xl transition-all duration-150
        ${isPressed ? 'scale-95' : 'scale-100'}
        ${disabled || isShowingPattern ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105 active:scale-95'}
        shadow-lg hover:shadow-xl
      `}
      style={{
        background: `linear-gradient(135deg, ${color}, ${color}dd)`,
        borderColor: color
      }}
      onMouseDown={handlePress}
      onTouchStart={handlePress}
      disabled={disabled || isShowingPattern}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <Volume2 className={`w-8 h-8 mb-2 ${isPressed ? 'animate-pulse' : ''}`} />
        <span className="text-lg font-bold">{note}</span>
        <span className="text-xs opacity-75">{Math.round(frequency)}Hz</span>
      </div>
      
      {isPressed && (
        <div className="absolute inset-0 rounded-2xl bg-white/30 animate-ping" />
      )}
    </button>
  )
}

export default SoundPad